# Fixtures de backup — congeladas

Um arquivo de backup por versão de schema (`backup-vN.json`), no formato
exato que o app exportava naquela versão. O teste `src/db/migracoes.test.ts`
importa cada um e confere que chega ao schema atual sem perder dado.

**Nunca edite uma fixture existente** — ela representa um arquivo que já
existe no mundo (backups antigos do usuário, cópia no Google Drive). Ao
subir `SCHEMA_VERSION`, adicione `backup-v{nova}.json` e os testes da
migração nova.
