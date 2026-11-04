/**
 * Diário guiado: propostas curtas de escrita, uma ou duas por lição, para
 * produzir frases próprias com o que a lição ensinou. Sem correção
 * automática (texto livre exigiria IA externa — ver docs/roadmap.md §4): o
 * aluno se avalia por um checklist. Os exemplos seguem as regras das lições
 * (só kana, com romaji).
 */
export interface ExemploDiario {
  jp: string;
  romaji: string;
  pt: string;
}

export interface PromptDiario {
  id: string;
  licaoId: string;
  titulo: string;
  instrucao: string;
  exemplo: ExemploDiario[];
  checklist: string[];
}

export const PROMPTS_DIARIO: PromptDiario[] = [
  {
    id: 'kana-nome',
    licaoId: 'kana',
    titulo: 'Meu nome em katakana',
    instrucao:
      'Escreva o seu nome em katakana e mais três palavras estrangeiras que você usa no dia a dia (comidas, lugares, marcas).',
    exemplo: [
      { jp: 'マリア', romaji: 'maria', pt: 'Maria' },
      { jp: 'コーヒー、パン、サッカー', romaji: 'koohii, pan, sakkaa', pt: 'café, pão, futebol' },
    ],
    checklist: [
      'Escrevi meu nome em katakana',
      'Usei ー para as vogais longas',
      'Usei o っ pequeno onde a consoante dobra',
      'Escrevi três palavras estrangeiras',
    ],
  },
  {
    id: 'aisatsu-dia',
    licaoId: 'aisatsu',
    titulo: 'Meu dia em cumprimentos',
    instrucao:
      'Escreva, na ordem do seu dia, o que você diria em cada momento: ao acordar, ao sair de casa, antes e depois de comer, ao voltar e antes de dormir.',
    exemplo: [
      { jp: 'おはようございます。', romaji: 'ohayou gozaimasu.', pt: 'Bom dia.' },
      { jp: 'いってきます。', romaji: 'ittekimasu.', pt: 'Estou saindo (e volto).' },
    ],
    checklist: [
      'Comecei com o cumprimento da manhã',
      'Escrevi o que se diz ao sair e ao voltar para casa',
      'Incluí いただきます e ごちそうさまでした',
      'Terminei com o cumprimento da noite',
    ],
  },
  {
    id: 'desu-eu',
    licaoId: 'desu',
    titulo: 'Quem eu sou (e quem não sou)',
    instrucao:
      'Escreva quatro frases sobre você com です: nome, nacionalidade, profissão ou estudo — e uma coisa que você não é.',
    exemplo: [
      { jp: 'わたしは ブラジルじんです。', romaji: 'watashi wa burajirujin desu.', pt: 'Eu sou brasileiro.' },
      { jp: 'がくせいじゃないです。', romaji: 'gakusei janai desu.', pt: 'Não sou estudante.' },
    ],
    checklist: [
      'Terminei as frases afirmativas com です',
      'Escrevi uma negativa com じゃないです',
      'Não usei さん no meu próprio nome',
      'Usei わたしは só na primeira frase',
    ],
  },
  {
    id: 'desu-ontem',
    licaoId: 'desu',
    titulo: 'Ontem e hoje',
    instrucao:
      'Compare ontem com hoje em três ou quatro frases: o dia da semana, o tempo, como foi algo. Use o passado onde for de ontem.',
    exemplo: [
      { jp: 'きのうは にちようびでした。', romaji: 'kinou wa nichiyoubi deshita.', pt: 'Ontem foi domingo.' },
      { jp: 'きのうは さむかったです。', romaji: 'kinou wa samukatta desu.', pt: 'Ontem estava frio.' },
    ],
    checklist: [
      'Usei でした para algo de ontem',
      'Usei um adjetivo -い no passado (〜かったです)',
      'Não escrevi 〜いでした',
      'Escrevi pelo menos uma frase no presente sobre hoje',
    ],
  },
  {
    id: 'apresentacao-jikoshoukai',
    licaoId: 'apresentacao',
    titulo: 'Minha じこしょうかい',
    instrucao:
      'Escreva a sua apresentação completa, como se fosse falar numa aula ou no primeiro dia de trabalho: abertura, nome, de onde é, o que faz, um gosto e o fechamento.',
    exemplo: [
      { jp: 'はじめまして。', romaji: 'hajimemashite.', pt: 'Muito prazer.' },
      { jp: 'どうぞ よろしく おねがいします。', romaji: 'douzo yoroshiku onegai shimasu.', pt: 'Conto com você.' },
    ],
    checklist: [
      'Comecei com はじめまして',
      'Disse meu nome e de onde sou',
      'Contei o que faço ou estudo',
      'Fechei com よろしく おねがいします',
    ],
  },
  {
    id: 'sufixos-pessoas',
    licaoId: 'sufixos',
    titulo: 'Pessoas da minha vida',
    instrucao:
      'Escreva três ou quatro frases sobre pessoas que você conhece — um colega, um professor, uma criança da família —, cada uma com o sufixo certo.',
    exemplo: [
      { jp: 'やまださんは かいしゃいんです。', romaji: 'yamada-san wa kaishain desu.', pt: 'O Yamada é funcionário de empresa.' },
      { jp: 'すずきせんせいは やさしいです。', romaji: 'suzuki-sensei wa yasashii desu.', pt: 'A professora Suzuki é gentil.' },
    ],
    checklist: [
      'Usei さん para adultos',
      'Usei せんせい para professor ou médico',
      'Usei ちゃん ou くん só para crianças ou pessoas próximas',
      'Não pus sufixo em mim mesmo',
    ],
  },
  {
    id: 'kosoado-redor',
    licaoId: 'kosoado',
    titulo: 'O que está ao meu redor',
    instrucao:
      'Olhe em volta e escreva quatro frases sobre coisas e lugares perto de você, perto de outra pessoa e longe dos dois.',
    exemplo: [
      { jp: 'これは わたしの ペンです。', romaji: 'kore wa watashi no pen desu.', pt: 'Esta é a minha caneta.' },
      { jp: 'あそこに ねこが います。', romaji: 'asoko ni neko ga imasu.', pt: 'Tem um gato ali.' },
    ],
    checklist: [
      'Usei これ/それ/あれ sozinho, sem substantivo depois',
      'Usei この/その/あの antes de um substantivo',
      'Usei ここ/そこ/あそこ para um lugar',
      'Escolhi こ, そ ou あ pela distância certa',
    ],
  },
  {
    id: 'pronomes-sem',
    licaoId: 'pronomes',
    titulo: 'Falar de mim sem dizer "eu"',
    instrucao:
      'Escreva cinco frases sobre a sua semana. Diga わたし só uma vez — nas outras, deixe o sujeito implícito, como um japonês faria.',
    exemplo: [
      { jp: 'わたしは まいにち はたらきます。', romaji: 'watashi wa mainichi hatarakimasu.', pt: 'Eu trabalho todos os dias.' },
      { jp: 'どようびは やすみです。', romaji: 'doyoubi wa yasumi desu.', pt: 'No sábado é folga.' },
    ],
    checklist: [
      'Usei わたし no máximo uma vez',
      'As frases sem sujeito continuam claras',
      'Não usei あなた',
    ],
  },
  {
    id: 'familia-minha',
    licaoId: 'familia',
    titulo: 'Minha família',
    instrucao:
      'Apresente a sua família para alguém de fora: quantas pessoas são, quem são e uma coisa sobre cada um.',
    exemplo: [
      { jp: 'かぞくは よにんです。', romaji: 'kazoku wa yonin desu.', pt: 'Minha família tem quatro pessoas.' },
      { jp: 'ちちは かいしゃいんです。', romaji: 'chichi wa kaishain desu.', pt: 'Meu pai é funcionário de empresa.' },
    ],
    checklist: [
      'Usei a forma simples para a minha família (ちち, はは, あに…)',
      'Disse quantas pessoas são',
      'Escrevi uma frase sobre cada pessoa',
    ],
  },
  {
    id: 'particulas-dia',
    licaoId: 'particulas',
    titulo: 'Um dia com partículas',
    instrucao:
      'Conte o que você faz num dia comum em quatro ou cinco frases. Tente usar を, に, で e と pelo menos uma vez cada.',
    exemplo: [
      { jp: 'としょかんで ほんを よみます。', romaji: 'toshokan de hon o yomimasu.', pt: 'Leio livros na biblioteca.' },
      { jp: 'ともだちと ひるごはんを たべます。', romaji: 'tomodachi to hirugohan o tabemasu.', pt: 'Almoço com um amigo.' },
    ],
    checklist: [
      'Usei を para o objeto da ação',
      'Usei に para horário ou destino',
      'Usei で para o lugar onde faço algo',
      'Usei と para "com alguém"',
    ],
  },
  {
    id: 'verbos-ontem',
    licaoId: 'verbos',
    titulo: 'O que eu fiz ontem',
    instrucao:
      'Escreva quatro ou cinco frases sobre ontem: o que você fez e o que não fez. Use a forma educada (〜ました / 〜ませんでした).',
    exemplo: [
      { jp: 'きのう テレビを みました。', romaji: 'kinou terebi o mimashita.', pt: 'Ontem vi TV.' },
      { jp: 'しゅくだいを しませんでした。', romaji: 'shukudai o shimasen deshita.', pt: 'Não fiz a lição de casa.' },
    ],
    checklist: [
      'Usei 〜ました pelo menos duas vezes',
      'Usei 〜ませんでした pelo menos uma vez',
      'Usei um verbo do grupo 3 (します ou きます)',
      'Todas as frases ficaram no passado',
    ],
  },
  {
    id: 'seikatsu-rotina',
    licaoId: 'seikatsu',
    titulo: 'Minha rotina',
    instrucao:
      'Descreva a sua rotina de um dia útil, do acordar ao dormir, com horários e frequência.',
    exemplo: [
      { jp: 'まいあさ しちじはんに おきます。', romaji: 'maiasa shichiji-han ni okimasu.', pt: 'Toda manhã acordo às sete e meia.' },
      { jp: 'あまり テレビを みません。', romaji: 'amari terebi o mimasen.', pt: 'Não vejo muita TV.' },
    ],
    checklist: [
      'Disse pelo menos duas horas com 〜じ に',
      'Usei いつも, よく ou ときどき',
      'Usei あまり ou ぜんぜん com o verbo na negativa',
      'Encadeei com それから',
    ],
  },
  {
    id: 'onomatope-sentimentos',
    licaoId: 'onomatopeias',
    titulo: 'Como me senti hoje',
    instrucao:
      'Conte três momentos do seu dia e como você se sentiu em cada um, usando onomatopeia + する. Diga também o que causou o sentimento.',
    exemplo: [
      { jp: 'バスが きませんでした。いらいらしました。', romaji: 'basu ga kimasen deshita. iraira shimashita.', pt: 'O ônibus não veio. Fiquei irritado(a).' },
      { jp: 'しごとが おわって、ほっとしました。', romaji: 'shigoto ga owatte, hotto shimashita.', pt: 'O trabalho acabou e fiquei aliviado(a).' },
    ],
    checklist: [
      'Usei pelo menos três onomatopeias de sentimento diferentes',
      'Usei 〜しました para o que já aconteceu',
      'Usei 〜しています para o que sinto agora',
      'Disse a causa com に, で ou a forma て',
    ],
  },
  {
    id: 'onomatope-consulta',
    licaoId: 'onomatopeias',
    titulo: 'No consultório',
    instrucao:
      'Imagine uma ida ao médico. Escreva o que você diria sobre duas dores ou incômodos, e como responderia a どんな いたみですか.',
    exemplo: [
      { jp: 'あたまが ずきずきします。', romaji: 'atama ga zukizuki shimasu.', pt: 'Minha cabeça está latejando.' },
      { jp: 'のどが ひりひりします。', romaji: 'nodo ga hirihiri shimasu.', pt: 'Minha garganta está ardendo.' },
    ],
    checklist: [
      'Disse a parte do corpo com が',
      'Usei uma onomatopeia de dor em cada frase',
      'Terminei com します',
    ],
  },
  {
    id: 'kanji-numeros',
    licaoId: 'kanji',
    titulo: 'Números do meu dia',
    instrucao:
      'Escreva quatro informações com números: a hora em que acorda, o preço de algo que comprou, o dia da semana de hoje e um número de telefone inventado. Pode usar os kanji que aprendeu.',
    exemplo: [
      { jp: 'しちじに おきます。', romaji: 'shichiji ni okimasu.', pt: 'Acordo às sete.' },
      { jp: 'コーヒーは ごひゃくえんでした。', romaji: 'koohii wa gohyaku-en deshita.', pt: 'O café custou quinhentos ienes.' },
    ],
    checklist: [
      'Escrevi uma hora',
      'Escrevi um preço com えん',
      'Escrevi o dia da semana',
      'Li o telefone dígito por dígito',
    ],
  },
];

export function promptsDaLicao(licaoId: string): PromptDiario[] {
  return PROMPTS_DIARIO.filter((p) => p.licaoId === licaoId);
}

export function getPrompt(id: string): PromptDiario | undefined {
  return PROMPTS_DIARIO.find((p) => p.id === id);
}
