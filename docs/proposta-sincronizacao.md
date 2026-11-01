# Proposta — sincronização automática entre aparelhos (Google Drive)

> **Status: em implementação** (branch `feature/sync-google-drive`).
> Registrada em nov/2026. **Fases 1 (base de dados), 2 (sincronização
> manual melhorada) e 4 (Google Drive) feitas** — ver `regras-negocio.md` §6.
> Falta: configurar o projeto no Google Cloud e o manual do usuário. Decisões tomadas na implementação:
> - além do previsto na §3: contadores por aparelho (`kanaProgress`,
>   `activity`, `wordKnowledge`, `readingProgress` — antes um lado
>   sobrescrevia o outro), carimbo por grupo de campos no card (editar a
>   nota não desfaz uma revisão do outro aparelho), duplicatas por `front`
>   juntadas na mesclagem e época dos dados (`meta.dataEpoch`) pra
>   Substituir/Apagar tudo não serem desfeitos pela mesclagem;
> - a prova de conceito no iPhone (Fase 3) foi dispensada: a maioria dos
>   usuários usa Android. A tela de configurar a sincronização avisa que no
>   iPhone ela pode não funcionar bem (login que não volta ao app instalado,
>   renovação do token exigindo um toque);
> - o login será por redirecionamento, implementado à mão (sem o script do
>   Google Identity Services, que viria de CDN).

Objetivo: quem estuda em mais de um aparelho (ex.: notebook e celular) não
precisar exportar e importar o backup à mão. Os dados passam a ser
sincronizados sozinhos por um arquivo guardado no **Google Drive do próprio
usuário**, sem servidor nosso e sem custo de manutenção.

---

## 1. Situação atual

- Os dados ficam só no IndexedDB de cada aparelho (`src/db/schema.ts`).
- A sincronização é manual: Exportar backup num aparelho, Importar no modo
  **Mesclar** no outro (`src/db/backup.ts`).
- A base para sincronizar já existe: chaves UUID, `updatedAt` na maioria
  das tabelas e uma mesclagem em que vence o registro mais recente.
- O incômodo é depender de lembrar de fazer isso nos dois sentidos.

---

## 2. Decisão de princípio

O `CLAUDE.md` diz "sem backend" e "não introduza servidor, API remota nem
banco externo". Esta proposta **não cria backend próprio**, mas faz o app
conversar com uma API externa (Google Drive). Para não ferir o espírito do
projeto, a sincronização deve ser:

- **opcional** — desligada por padrão, ligada pelo usuário em Configurações;
- **dispensável** — o app funciona 100% sem ela, inclusive offline;
- **do usuário** — os dados ficam no Drive da pessoa, numa pasta que só o
  app enxerga; nenhum dado passa por servidor nosso;
- **gratuita** — sem servidor, sem banco, sem plano pago.

Ao implementar, atualizar os princípios do `CLAUDE.md` e a §1 do
`docs/roadmap.md` com essa exceção.

---

## 3. Pré-requisitos (valem para qualquer forma de sincronizar)

A mesclagem atual (`importData`, modo `merge`) só acrescenta ou atualiza —
nunca apaga. Na sincronização manual isso já é um defeito; na automática
vira regra. Antes da integração com o Drive:

1. **Registro de exclusões (tombstones).** Hoje, apagar algo num aparelho
   não se propaga, e o item "ressuscita" na próxima mesclagem. Casos atuais:
   - excluir card (`Flashcards.tsx`);
   - desfazer uma revisão, que apaga o review (`StudySession.tsx`);
   - desmarcar "Já sei" (`vocabulary.ts`, apaga de `wordKnowledge`).

   Solução: tabela nova `deleted` (`{ table, key, deletedAt }`) gravada em
   toda exclusão. Na mesclagem, a exclusão vence se `deletedAt` for mais
   recente que o `updatedAt` do registro. Tombstones antigos (ex.: > 180
   dias) podem ser limpos.
2. **Data de alteração nas preferências.** A tabela `meta` (tema, meta
   diária, modo de revisão) é gravada por cima no merge, sem critério. Ela
   precisa de `updatedAt` por chave, para vencer a mudança mais recente.
3. **Revisar o merge de `kanaProgress`**, que usa `lastPracticed` em vez de
   `updatedAt` — conferir se cobre todos os casos de alteração.

Isso entra como migração aditiva de schema (`schemaVersion` 6, com
`migrateV5ToV6` em `backup.ts`) e já melhora o modo Mesclar de hoje.

---

## 4. Desenho da sincronização com o Google Drive

### 4.1 Autorização
- Login com o Google feito inteiro no navegador (Google Identity Services,
  modelo de token), sem servidor.
- Projeto gratuito no Google Cloud com um OAuth Client ID do tipo "Web",
  com as origens autorizadas: o domínio do GitHub Pages e `localhost`.
- Escopo mínimo: **`drive.appdata`** — a pasta oculta do app
  (`appDataFolder`). Ela não aparece no Drive do usuário, o app não enxerga
  nenhum outro arquivo, e o espaço conta na cota do usuário.
- O token dura cerca de 1 hora. A renovação é silenciosa se a pessoa ainda
  estiver logada no Google; senão, a janela de login aparece de novo.

### 4.2 O arquivo
- Um arquivo só, `nihongo-study-sync.json`, no mesmo formato do backup
  (`BackupFile`), opcionalmente comprimido (gzip via `CompressionStream`).
- Tamanho esperado: alguns MB por ano de uso diário (o que mais cresce é o
  histórico de revisões).

### 4.3 Fluxo de um ciclo
1. Baixar o arquivo do Drive (se não existir, pular para o passo 3).
2. Mesclar no IndexedDB local (o mesmo `importData` em modo `merge`, já com
   os pré-requisitos da §3).
3. Exportar o estado local mesclado e subir para o Drive, sobrescrevendo.
4. Guardar a data do último sync e a versão do arquivo remoto em `meta`
   (só deste aparelho — não entra no backup).

Como a mesclagem é idempotente, uma colisão (dois aparelhos sincronizando ao
mesmo tempo) se resolve na próxima sincronização. Para reduzir a chance,
conferir a versão do arquivo remoto (revisão/`modifiedTime`) antes de
gravar e, se mudou, repetir o ciclo.

### 4.4 Quando sincronizar
- Ao abrir o app e ao voltar o foco para ele (o mesmo gatilho do
  `pwaUpdate.ts`).
- Ao terminar uma sessão (revisão, treino, leitura), com debounce.
- Botão manual "Sincronizar agora".
- Sem internet: não tenta; marca como pendente e sincroniza quando voltar.

### 4.5 Interface (Configurações › Dados)
- Cartão "Sincronizar com o Google Drive": conectar, desconectar, status
  ("Sincronizado há 3 min", "Pendente — sem internet", erro), e o botão
  "Sincronizar agora".
- Ao conectar um aparelho que já tem dados, explicar que os dados dos dois
  lados serão **juntados** (nada é apagado).
- "Desconectar" não apaga nada, nem local nem no Drive; uma opção separada
  "Apagar dados do Drive" remove o arquivo remoto.
- Exportar/Importar backup manual continuam existindo.

### 4.6 Código
- Uma interface de "destino de sincronização" (`baixar`, `subir`,
  `versao`) em `src/features/sync/`, com o Google Drive como primeira
  implementação. Isso deixa barato acrescentar outro destino depois
  (Dropbox, OneDrive).
- Sem SDK pesado: a API REST do Drive via `fetch` basta para os três
  métodos.

---

## 5. Riscos e pontos a validar

| Risco | O que fazer |
|---|---|
| Login com Google em app instalado no iPhone (tela de início) pode falhar ou abrir fora do app | **Testar primeiro**, antes de investir no resto (uma prova de conceito só com login + upload). |
| Aprovação do Google para a tela de consentimento | `drive.appdata` está entre os escopos que, até onde se sabe, dispensam a auditoria de segurança. Para mostrar nome e ícone sem aviso de "app não verificado", deve bastar a verificação de marca (página inicial + política de privacidade). Conferir as regras vigentes no Google Cloud ao configurar. |
| Mesmo card editado em dois aparelhos offline | Vence o mais recente (`updatedAt`). O histórico de revisões não se perde. Aceitável para uso pessoal. |
| Relógio errado num aparelho | Pode fazer uma alteração antiga vencer. Risco baixo; documentar. |
| Dependência de serviço externo | Sincronização é opcional e o app funciona sem ela (§2). |

---

## 6. Alternativas consideradas

| Opção | Automática? | Esforço | Por que não é a principal |
|---|---|---|---|
| **A. Sincronização manual melhorada** — botão que mescla e já exporta; no celular, compartilhar o arquivo direto para o Drive/WhatsApp; aviso de "último backup há X dias" | Não | Baixo | Continua dependendo de lembrar. **Boa como primeiro passo**, sem integração nenhuma. |
| **B. Pasta sincronizada** — no notebook, o app lê/grava um arquivo fixo numa pasta do Drive para computador (File System Access API) | Só no notebook | Baixo/médio | O Chrome no celular não tem essa API, então lá segue manual. |
| **C. Google Drive** (esta proposta) | Sim | Médio | — |
| **D. Dropbox** (pasta do app, login PKCE) | Sim | Médio | Menos gente tem conta; modo de desenvolvimento limita o número de usuários. Pode virar um segundo destino (§4.6). |
| **E. OneDrive** (MSAL) | Sim | Médio/alto | Cadastro do app na Microsoft mais burocrático. |
| **F. Direto entre aparelhos** (WebRTC + QR code) | Não | Alto | Os dois aparelhos precisam estar abertos ao mesmo tempo; o mais complexo. |

Descartados: Firebase/Supabase (é backend, com plano grátis que pode mudar
e contas de usuário para manter) e GitHub Gist (exige que o usuário gere um
token — inviável para leigos).

---

## 7. Plano de implementação

| Fase | O quê | Esforço |
|---|---|---|
| **1. Base de dados** | Tombstones + `updatedAt` em `meta` + revisão do merge de `kanaProgress`; schemaVersion 6 | Médio |
| **2. Manual melhorada (opção A)** | Botão "Sincronizar com arquivo" (mesclar + exportar), compartilhar no celular, aviso do último backup | Baixo |
| **3. Prova de conceito** | Login Google + upload/download de um arquivo no `appDataFolder`, testado no notebook, Android e iPhone instalado | Baixo |
| **4. Sincronização com o Drive** | Fluxo da §4.3, gatilhos da §4.4, interface da §4.5 | Médio |
| **5. Documentação** | `CLAUDE.md` (princípios + mapa do código), `regras-negocio.md` (regras de sync e exclusão), roadmap, manual do usuário (capítulo 9) | Baixo |

As fases 1 e 2 valem por si mesmas, mesmo que a 4 nunca seja feita.
Versão: cada fase com funcionalidade nova é **minor** (as migrações são
aditivas, nenhum dado salvo é perdido).
