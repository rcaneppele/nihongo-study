# Padrão de conteúdo das lições

Referência detalhada para criar ou revisar uma lição em `src/licoes/*.tsx`.
As lições devem funcionar como uma apostila de estudo completa — não um resumo
rápido. O resumo operacional (seção 0) vai para `CLAUDE.md` na seção Convenções;
este documento é a referência longa, no mesmo espírito de `regras-negocio.md`.

---

## 0. Resumo operacional (bloco para o CLAUDE.md)

> **Lições (`src/licoes/*.tsx`)** são a fonte primária de aprendizado novo do app,
> não material de revisão. Escreva como um professor de japonês que também conhece
> cultura japonesa, a vida real no Japão e as dificuldades específicas de um falante
> de português. Extensão é consequência de profundidade, nunca meta: antes de manter
> um parágrafo ou exemplo, verifique se cortá-lo faria o leitor perder informação nova.
>
> Toda lição abre com "Como ler esta lição" e fecha com tabela-resumo. Cada seção
> abre explicando o quê, o porquê e o quando — não só a mecânica antes dos exemplos.
> Todo ponto central tem 3+ exemplos que diferem em **uso, registro ou contexto**
> (não só no vocabulário), sendo ao menos um em situação real. Formas parecidas que o aluno
> vai confundir são contrastadas lado a lado. Há pelo menos uma nota cultural
> amarrada ao tema e uma seção de erros comuns. Kanji nunca aparece dentro de
> `<Ex />`.
>
> Pesquisar fontes abertas é recomendado para **verificar** naturalidade, registro
> e uso real — nunca para compilar: nenhuma frase, tabela ou explicação é copiada
> ou traduzida de terceiros. Detalhes em `docs/padrao-licoes.md`.

---

## 1. O papel das lições no app

O app existe para treinar, reforçar e relembrar — mas as lições cumprem um papel
diferente das outras duas funcionalidades (flash cards e treino de kana): elas são
a fonte primária de **aprendizado novo**. Uma lição rasa empurra o usuário a
procurar material fora do app; uma lição completa faz o app bastar por si.

Existem duas formas de falhar, e ambas são inaceitáveis:

- **Rasa**: só o caso canônico do livro didático, sem nuance, sem contexto de uso,
  sem as armadilhas. O usuário termina a lição achando que sabe e erra na primeira
  frase real.
- **Inchada**: extensão que não é profundidade — parágrafos que repetem a mesma
  ideia com outras palavras, exemplos que só trocam o substantivo, notas culturais
  genéricas. O usuário se cansa antes do fim e não aprende mais por isso.

O critério nunca é contar linhas; é contar quantas coisas novas e úteis o usuário
aprende ao ler do início ao fim.

---

## 2. As perspectivas a assumir ao escrever

Ao gerar ou expandir conteúdo de lição, assumir simultaneamente cinco perspectivas:

- **Professor de língua japonesa** — progressão pedagógica correta (do simples ao
  complexo), antecipa onde o aluno vai confundir, explica o *porquê* da regra, não
  só o *como*.
- **Especialista em cultura japonesa** — toda regra gramatical ou de vocabulário
  carrega contexto social: grau de formalidade, quando usar e quando evitar, o que
  a escolha comunica sobre a relação entre os falantes.
- **Morador/turista no Japão** — liga o conteúdo a situações concretas (konbini,
  izakaya, trabalho, estação de trem, visita à casa de alguém), não a frases
  artificiais descoladas da vida real.
- **Pedagogo** — estrutura a informação para reter, não só para expor: chunking,
  contraste explícito, tabelas de consulta, resumo ao final.
- **Conhecedor do aluno brasileiro** — sabe onde a língua portuguesa ajuda e onde
  atrapalha (seção 3), e trata isso explicitamente em vez de ensinar japonês "no
  vácuo".

---

## 3. O aluno de referência

Escrever para uma pessoa adulta, falante nativa de português brasileiro, que já lê
hiragana com algum esforço, ainda não estuda kanji, e aprende japonês por interesse
próprio ou por causa de uma viagem/mudança. Não é aluno de sala de aula com professor
para tirar dúvida: o texto precisa se explicar sozinho.

Pontos de interferência do português que valem menção explícita quando o tema tocar
neles (não force, mas não ignore quando aparecer):

- **ser/estar** — o português divide onde o japonês não divide (です) e o japonês
  divide onde o português não divide (います/あります).
- **Ordem das palavras** — verbo no fim, complemento antes; a tentação é traduzir
  na ordem do português.
- **Partículas** — não existe equivalente direto; a analogia com preposições
  funciona só até certo ponto e depois atrapalha.
- **Ausência de gênero, número e artigo** — frases japonesas corretas parecem
  "incompletas" para quem vem do português.
- **Sujeito omitido** — em japonês é o normal, não uma elipse estilística.
- **Pronúncia** — as vogais são fáceis para brasileiros, mas atenção a: ら-linha
  (não é o "r" carioca nem o caipira), つ, ふ, ん antes de b/p, e o hábito de
  colocar acento tônico forte onde o japonês tem acento de altura.
- **Falsos amigos de registro** — traduzir "você" por あなた, "eu" por わたし em
  toda frase, "obrigado" por ありがとう em qualquer situação.

---

## 4. Arquétipos de lição

Nem toda lição tem a mesma forma. Antes de escrever, identifique o arquétipo — ele
define quais seções fazem sentido e onde está o peso do conteúdo.

| Arquétipo | Exemplos atuais | Peso do conteúdo | Cuidado principal |
| --- | --- | --- | --- |
| **Gramatical** | `desu`, `particulas`, `verbos` | Regra + conjugação + contraste entre formas | Cobrir registros (educado/casual) e as exceções, não só o padrão |
| **Vocabulário temático** | `familia`, `aisatsu`, `sufixos` | Blocos de palavras + quando usar cada uma | O que diferencia palavras próximas; regra social de uso |
| **Sistema de escrita** | `kana` | Tabelas + ordem de aprendizado + confusões visuais | Não virar só tabela: precisa de estratégia de memorização e leitura |
| **Referência de uso** | `kosoado`, `pronomes` | Sistema fechado + mapa mental | Mostrar o sistema como sistema, não como lista de itens soltos |

Uma lição gramatical densa naturalmente fica mais longa que uma de vocabulário
temático — isso é esperado e não é problema. O que não pode acontecer é uma lição
ficar curta porque o tema foi tratado superficialmente.

---

## 5. Estrutura esperada

O inventário abaixo é o que considerar. Itens marcados como obrigatórios valem para
toda lição; os demais entram quando o tema comportar.

1. **Como ler esta lição** *(obrigatória)* — formato usado (`ReadingKey`),
   pronúncias especiais e convenções daquela lição específica.
2. **Objetivos** *(recomendada)* — 3 a 5 linhas do tipo "ao final você vai saber
   fazer X". Serve ao leitor e, principalmente, delimita o escopo de quem escreve.
   Se um trecho não serve a nenhum objetivo declarado, ele provavelmente é
   enchimento ou pertence a outra lição.
3. **Contextualização** — por que isso importa e em que situação real aparece.
   1–2 parágrafos, não uma lista solta.
4. **Desenvolvimento central** — o tema em si, com progressão do caso simples ao
   caso com nuance. Cada subseção segue o critério de profundidade da seção 6.
5. **Nuances e contrastes** — pares que se confundem (は/が, に/で, だけ/しか,
   います/あります) tratados lado a lado, com regra prática de decisão. Bom
   exemplo atual: `particulas.tsx`.
6. **Nota cultural** *(pelo menos uma por lição, salvo justificativa)* — o que essa
   regra ou vocabulário revela sobre etiqueta, hierarquia ou hábito do dia a dia.
   Critério de qualidade: a nota precisa **mudar uma escolha do aluno**. Se ela é
   só curiosidade sobre o Japão, não é nota cultural de lição — é enfeite.
7. **Erros comuns** *(obrigatória)* — confusões típicas de falante de português,
   em `GrammarTable` com erro / forma correta / porquê.
8. **Resumo e tabela de referência** *(obrigatória)* — consulta rápida para quem já
   estudou e volta só para lembrar.

### 5.1 Escopo explícito

Toda lição precisa dizer o que **não** cobre quando o aluno pode razoavelmente
esperar que cobrisse. `desu.tsx` faz isso bem ("adjetivos -い seguem regra própria,
fora do escopo desta lição"). Isso evita duas coisas: o aluno generalizar uma regra
indevidamente, e a lição crescer para os lados absorvendo tema de outra lição.

### 5.2 Material de aprofundamento

Numa lição longa, conteúdo avançado que um iniciante pode pular deve estar marcado
como tal — em `<Note>` iniciada por "**Aprofundamento:**" — e sempre depois do
conteúdo básico da seção, nunca no meio. Assim a lição serve tanto na primeira
leitura quanto na revisão, sem afogar quem está começando.

---

## 6. Critério de profundidade

O critério é calibrado por importância do ponto — aplicar o mesmo piso a tudo
produz enchimento nos pontos periféricos.

**Ponto central** (a regra que dá título à seção, a partícula principal, o bloco de
vocabulário que o aluno vai usar toda hora):

- **3 ou mais exemplos** (`<Ex />`), e cada um precisa diferir dos outros em **uso,
  registro ou contexto** — não apenas no vocabulário.
- **Ao menos um em situação de vida real** nomeada: konbini, restaurante, trabalho,
  estação, casa de alguém, consulta médica, imobiliária. "Frase de manual" e
  "frase de vida real" ensinam coisas diferentes; as duas precisam existir.
- **Armadilha explícita**: se a regra tem exceção, verbo que exige partícula
  específica, ou caso em que ela não vale, isso aparece escrito — não implícito nos
  exemplos.
- **Contraste explícito**: se existe forma parecida que o aluno vai confundir, ela
  é tratada lado a lado, não deixada para o usuário perceber sozinho.

**Ponto periférico** (variação menor, forma rara, observação lateral): 1–2 exemplos
bastam. Forçar um terceiro aqui é exatamente o enchimento que a seção 7 proíbe.

### 6.1 Teste do exemplo

Antes de manter um `<Ex />`, responda em até três palavras: *o que este exemplo
acrescenta?* ("registro casual", "な-adjetivo", "no konbini", "verbo irregular").
Se não houver resposta, o exemplo é redundante — corte. Se houver, ela normalmente
vira o `notes=` do próprio exemplo, que é para isso que serve: dizer o que **este**
exemplo mostra, não repetir a tradução.

### 6.2 Abertura de seção

Um parágrafo de abertura que só enuncia a mecânica e emenda nos exemplos ensina a
regra sem ensinar a intuição. Toda seção do desenvolvimento central abre
respondendo, nesta ordem:

1. **O que muda** — a mecânica em si.
2. **Por que essa peça existe** — o raciocínio: o que o japonês está resolvendo
   ali, o que a escolha comunica, ou onde ela diverge do português.
3. **Quando isso aparece** — a situação que dispara o uso.

Pular um dos três é permitido — e às vezes obrigatório — quando ele já foi
respondido antes na lição ou é óbvio a essa altura. Repetir por simetria é
enchimento.

**O contraste com o português entra no item 2 só onde há divergência real.** Onde
as duas línguas fazem a mesma coisa (marcar passado, por exemplo), forçar a
comparação produz parágrafo vazio; nesses casos, gaste a abertura no que é
específico do japonês — a nuance que a forma carrega, o registro, a restrição de
uso. Divergências que rendem: polidez embutida na terminação, ausência de palavra
avulsa para negar, sujeito omitido, ser/estar, era/foi sem distinção.

O teste é o mesmo da §7: o parágrafo adicional precisa trazer **informação nova
sobre o mesmo conteúdo**, não reformular o que a primeira frase já disse.

### 6.3 Ritmo do texto

No máximo dois parágrafos de prosa corrida sem um `<Ex />`, `<Note>` ou
`<GrammarTable>` no meio. Parágrafos curtos (3–5 linhas), porque a leitura é em
tela de celular. Bloco longo de texto puro é sinal de explicação que deveria estar
em exemplo ou tabela.

---

## 7. Como não virar prolixo

Extensão é consequência de profundidade, nunca meta. Antes de manter um parágrafo
ou exemplo, aplicar o teste: **"se eu cortar isso, o leitor perde alguma informação
nova?"** Se a resposta é não, cortar.

Sinais de que o conteúdo virou enchimento:

- Duas frases seguidas dizendo a mesma coisa com outras palavras.
- Exemplo adicional que só troca o vocabulário, sem introduzir nuance, registro ou
  contexto novo.
- Nota cultural genérica, que caberia igual em qualquer outra lição.
- Introdução ou conclusão de seção que resume o que acabou de ser dito.
- Frase que só anuncia o que vem a seguir ("agora vamos ver como...").
- Reexplicação de conteúdo que já é de outra lição (ver seção 8.3).

Teste positivo, complementar: percorra a lição lendo só os títulos de seção e os
`notes` dos exemplos. Deve dar para reconstruir a progressão do raciocínio. Se
duas seções seguidas parecem a mesma coisa nesse resumo, elas provavelmente são.

---

## 8. Precisão e consistência entre lições

### 8.1 Honestidade didática

Sendo a fonte primária de estudo, a lição não pode ensinar algo que o aluno terá de
desaprender depois sem avisar. Simplificação pedagógica é bem-vinda; simplificação
disfarçada de regra completa, não. Quando simplificar, marque:
"por enquanto, trate como...", "há um caso a mais, que fica para a lição X".

Também: não inventar uso. Se uma forma é rara, regional, datada ou típica de um
grupo (fala feminina, kansai, gíria jovem, japonês de anime), dizer isso. O padrão
do app é japonês de Tóquio, contemporâneo, neutro.

### 8.2 Vocabulário metalinguístico fixo

Os mesmos conceitos precisam ter sempre o mesmo nome entre lições. Termos já em uso,
a manter:

| Termo | Significado |
| --- | --- |
| trilha educada / trilha casual | os dois registros (です・ます vs forma simples) |
| cópula | です e suas formas |
| adjetivo -い / adjetivo -な | as duas classes de adjetivo |
| partícula | は, が, を, に, で… |
| Grupo 1 / Grupo 2 / Irregulares | classes de conjugação verbal |

Ao introduzir um termo novo, acrescente-o a esta tabela na mesma alteração.

### 8.3 Romanização

Padrão extraído das lições atuais, a seguir consistentemente:

- Hepburn, com **vogais longas escritas como se soletram**: `kinou`, `arigatou`,
  `toukyou` — nunca `kinō` nem `tokyo`.
- Partículas romanizadas pelo som: は → `wa`, を → `o`, へ → `e`.
- ではありません → `dewa arimasen` (junto, como se pronuncia).
- ん → `n` sempre, inclusive antes de b/p/m: `nihonjin`, `konbini`, `sanpo`.
- っ → consoante dobrada: `kitte`, `gakkou`.
- Sufixos e prefixos ligados por hífen: `tanaka-san`, `o-namae`.
- Romaji todo em minúsculas, separado por palavra, com ponto final `.`
  correspondendo ao `。` do japonês.

### 8.4 Fronteiras entre lições

Cada lição depende de outras e é dependida por outras. Antes de explicar algo do
zero, verifique se já é tema de outra lição: nesse caso, faça uma menção de uma
linha e siga ("は marca o tema da frase — detalhes na lição de partículas").
Reexplicar por completo incha a lição e cria duas versões da mesma explicação que
vão divergir com o tempo.

Sugestão (opcional, exige alteração no tipo de `meta`): um campo
`prereqs: ['kana', 'desu']` deixa essa relação explícita no código, e não só na
cabeça de quem escreve.

---

## 9. Uso de fontes externas

Pesquisar material aberto na internet é permitido e recomendado — mas o objetivo é
**verificar e ancorar**, nunca compilar. A lição continua sendo escrita a partir do
zero, com a pedagogia e o vocabulário deste app; a fonte externa resolve dúvida
específica e liga o conteúdo à realidade.

### 9.1 Quando vale a pena pesquisar

- **Frequência e naturalidade** — a forma é mesmo usada, ou é correta mas ninguém
  fala assim?
- **Registro e variação** — a forma é neutra, feminina, kansai, datada, de anime?
  (Cruza com a seção 8.1.)
- **Uso concreto no dia a dia** — a fórmula exata dita no caixa do konbini, o texto
  de uma placa de estação, o campo de um formulário, o aviso do trem.
- **Erros documentados de aprendizes** — o que de fato confunde, para as seções de
  contraste e erros comuns (aqui fórum e Q&A são úteis, ver 9.2).
- **Temas que mudam com o tempo** — etiqueta prática, pagamento, transporte,
  tecnologia do dia a dia.
- **Cobertura** — conferir se a lição deixou de fora um uso comum do tema.

Não vale a pena pesquisar gramática básica bem estabelecida só por rotina, nem
pesquisar com o objetivo de "achar mais coisa para colocar". Se a pesquisa não
responde a uma pergunta que você conseguiria formular antes de buscar, ela vai
produzir enchimento.

### 9.2 Hierarquia de fontes

1. **Fontes japonesas e institucionais** — Japan Foundation (Marugoto, e
   especialmente **Irodori**, gratuito e todo construído em situações de vida real
   no Japão), NHK World "Easy Japanese", materiais de prefeitura para residentes
   estrangeiros, dicionários (Jisho, Weblio) e corpora.
2. **Referências consolidadas para aprendizes** — Imabi, Tae Kim, Tofugu, Wasabi,
   Maggie Sensei. Boas para conferir explicação e nuance.
3. **Fórum, Reddit, HiNative, StackExchange** — úteis apenas como **pista do que
   confunde o aprendiz**, e como resposta de nativo sobre naturalidade. Nunca como
   autoridade gramatical isolada.
4. **Evitar** — blog sem autor identificável, conteúdo claramente gerado por IA
   para SEO, material que ensina japonês de anime/gíria como se fosse neutro, e
   qualquer fonte que faça afirmação categórica sem exemplo.

Regra de conflito: se duas fontes confiáveis discordam, isso quase sempre significa
uma de duas coisas — variação real (então mencione as duas) ou simplificação
didática de uma delas (então siga a seção 8.1 e diga que está simplificando). Não
escolher a versão mais conveniente e seguir em frente.

### 9.3 Originalidade (regra dura)

- **Nenhum trecho de texto é copiado ou traduzido literalmente** de material de
  terceiros — nem explicação, nem tabela, nem lista de vocabulário.
- **Frases de exemplo são sempre escritas do zero**, com o vocabulário já usado no
  app. Reaproveitar as frases de exemplo de uma apostila é o erro mais provável
  aqui, e o mais fácil de cometer sem perceber.
- **Não imitar a estrutura de seções** de uma apostila específica. A estrutura da
  lição é a da seção 5 deste documento.
- **Exceção legítima**: fórmulas fixas de uso público — o que o atendente diz no
  konbini, o texto de uma placa, o aviso automático do trem, uma saudação
  padronizada. Isso é fato linguístico, não autoria, e deve aparecer **exatamente**
  como é dito na vida real.
- Links de fonte **não entram no corpo da lição** (o aluno não quer bibliografia, e
  a seção 1 diz que o app deve bastar por si). Se valer registrar de onde veio uma
  informação delicada, use comentário no topo do arquivo `.tsx`.

---

## 10. Convenções técnicas

- Exemplos de frase (`<Ex jp="..." romaji="..." pt="..." />`) **nunca usam kanji** —
  só hiragana/katakana com romaji. Kanji só como coluna de referência opcional em
  tabelas de vocabulário, sempre explicado em "Como ler esta lição" como algo que
  pode ser ignorado por enquanto.
- Reusar os componentes de `src/components/Licao.tsx` (`Section`, `Ex`, `Note`,
  `GrammarTable`, `ReadingKey`). Não introduzir padrões visuais novos sem
  necessidade; se um tema realmente pedir um componente novo, ele entra em
  `Licao.tsx` para ficar disponível a todas as lições, não inline numa lição só.
- `notes=` do `<Ex />` é uma linha, e diz o que **aquele** exemplo mostra.
- Tom calmo, cores pelos tokens do projeto (sem hex solto, sem `dark:` espalhado —
  ver `CLAUDE.md`).
- Textos, comentários e nomes de seção em português (pt-BR).

---

## 11. Revisão de lição existente

As dez lições atuais (`aisatsu`, `apresentacao`, `desu`, `familia`, `kana`,
`kosoado`, `particulas`, `pronomes`, `sufixos`, `verbos`) têm base sólida. Aplicar
este padrão a elas é expansão pontual, não reescrita. Procedimento:

1. Rodar o checklist (seção 12) sobre a lição e listar só o que falta.
2. Expandir os pontos faltantes, preservando o texto que já passa no critério.
3. **Não renumerar nem remover ids existentes** (`desu-f1`, `desu-sig2`, …) — eles
   podem estar referenciados em progresso do usuário. Conteúdo novo entra com id
   novo, na sequência.
4. Se a expansão introduziu um conceito central novo, registrar que o `quiz`
   daquela lição precisa de item correspondente. O quiz é escopo separado, mas não
   pode ficar cobrindo metade do conteúdo.
5. Revisar a tabela-resumo final: ela precisa refletir o conteúdo expandido.

Para lições longas, escrever ou revisar **por seção**, não a lição inteira de uma
vez — a qualidade cai no fim de gerações muito longas, e é justamente no fim que
ficam as seções de contraste, erros comuns e resumo, que são as mais valiosas.

---

## 12. Checklist antes de considerar uma lição pronta

Estrutura:

- [ ] Abre com "Como ler esta lição".
- [ ] Objetivos declarados, e todo o conteúdo serve a algum deles.
- [ ] Tem contextualização ligada a uma situação real.
- [ ] Termina com tabela-resumo de consulta rápida.
- [ ] Existe seção de erros comuns cobrindo as armadilhas do tema.
- [ ] Há pelo menos uma nota cultural amarrada ao tema, que muda alguma escolha do
      aluno (ou justificativa explícita de por que o tema não comporta).
- [ ] O que está fora do escopo da lição está dito.

Profundidade:

- [ ] Cada ponto central tem 3+ exemplos diferindo em uso, registro ou contexto.
- [ ] Cada ponto central tem ao menos um exemplo em situação de vida real nomeada.
- [ ] Confusões previsíveis entre formas parecidas foram tratadas lado a lado.
- [ ] Armadilhas e exceções estão explícitas, não implícitas nos exemplos.
- [ ] Interferências do português relevantes ao tema foram tratadas.

Enxugamento:

- [ ] Cada seção do desenvolvimento abre respondendo o quê / por quê / quando
      (§6.2), sem forçar contraste com o português onde não há divergência.
- [ ] Todo `<Ex />` passa no teste da seção 6.1 (dá para dizer o que acrescenta).
- [ ] Nenhum parágrafo sobreviveu ao teste de corte da seção 7 sem acrescentar algo.
- [ ] Nenhum trecho reexplica conteúdo que é tema de outra lição.
- [ ] Nenhum bloco de mais de dois parágrafos sem exemplo, nota ou tabela.

Fontes:

- [ ] Afirmações sobre frequência, registro ou variação foram verificadas, não
      supostas.
- [ ] Nenhuma frase de exemplo, tabela ou explicação veio de material de terceiros —
      tudo escrito do zero (exceto fórmulas fixas de uso público).
- [ ] Fórmulas do dia a dia (konbini, placa, trem) estão exatamente como são ditas.

Técnico:

- [ ] Kanji nunca aparece dentro de uma frase de exemplo.
- [ ] Romanização segue a seção 8.3.
- [ ] Termos metalinguísticos seguem a tabela da seção 8.2.
- [ ] Só componentes de `Licao.tsx`, tokens de cor do projeto, textos em pt-BR.
- [ ] Ids existentes preservados; quiz coerente com o conteúdo final.
