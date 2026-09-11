import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';
import type { ItemKakitoriFonte, GrupoKakitori } from '../data/kakitori/types';

export const meta = {
  id: 'kanji',
  title: 'Kanji — Primeiros Passos',
  subtitle:
    'O terceiro sistema de escrita: como ele funciona, os kanji dos números (até 10.000), os dias da semana, as horas, preços, números de telefone, perguntas e os kanji que viram sobrenome',
  emoji: '🔢',
  tags: ['escrita', 'kanji', 'n5', 'tempo', 'calendario', 'telefone', 'dinheiro', 'sobrenomes'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'kanji-f1',
      tokens: [
        { texto: 'りんご', romaji: 'ringo' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'ひとつ', romaji: 'hitotsu' },
        { texto: 'ください', romaji: 'kudasai' },
      ],
      pt: 'Me dá uma maçã, por favor.',
    },
    {
      id: 'kanji-f2',
      tokens: [
        { texto: 'コーヒー', romaji: 'koohii' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'ふたつ', romaji: 'futatsu' },
        { texto: 'おねがいします', romaji: 'onegaishimasu' },
      ],
      pt: 'Dois cafés, por favor.',
    },
    {
      id: 'kanji-f3',
      tokens: [
        { texto: 'なんばん', romaji: 'nanban' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'バス', romaji: 'basu' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Qual é o número do ônibus?',
    },
    {
      id: 'kanji-f4',
      tokens: [
        { texto: 'ろくばん', romaji: 'rokuban' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'バス', romaji: 'basu' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'É o ônibus número 6.',
    },
    {
      id: 'kanji-f5',
      tokens: [
        { texto: 'おいくつ', romaji: 'oikutsu' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Quantos anos você tem? (educado)',
    },
    {
      id: 'kanji-f6',
      tokens: [
        { texto: 'じゅういっさい', romaji: 'juuissai' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Tenho onze anos.',
    },
    {
      id: 'kanji-f7',
      tokens: [
        { texto: 'なんじ', romaji: 'nanji' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Que horas são?',
    },
    {
      id: 'kanji-f8',
      tokens: [
        { texto: 'かいぎ', romaji: 'kaigi' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'さんじ', romaji: 'sanji' },
        { texto: 'から', romaji: 'kara', particula: true },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'A reunião é a partir das 3 horas.',
    },
    {
      id: 'kanji-f9',
      tokens: [
        { texto: 'しちじ', romaji: 'shichiji' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'おきます', romaji: 'okimasu' },
      ],
      pt: 'Acordo às 7 horas.',
    },
    {
      id: 'kanji-f10',
      tokens: [
        { texto: 'くじ', romaji: 'kuji' },
        { texto: 'はん', romaji: 'han' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'ねます', romaji: 'nemasu' },
      ],
      pt: 'Durmo às 9h30.',
    },
    {
      id: 'kanji-f11',
      tokens: [
        { texto: 'よじ', romaji: 'yoji' },
        { texto: 'じゅっぷん', romaji: 'juppun' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'でかけます', romaji: 'dekakemasu' },
      ],
      pt: 'Saio às 4h10.',
    },
    {
      id: 'kanji-f12',
      tokens: [
        { texto: 'ピザ', romaji: 'piza' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'はんぶん', romaji: 'hanbun' },
        { texto: 'たべました', romaji: 'tabemashita' },
      ],
      pt: 'Comi metade da pizza.',
    },
    {
      id: 'kanji-f13',
      tokens: [
        { texto: 'げつようび', romaji: 'getsuyoubi' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'やすみ', romaji: 'yasumi' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Segunda-feira é folga.',
    },
    {
      id: 'kanji-f14',
      tokens: [
        { texto: 'すいようび', romaji: 'suiyoubi' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'よる', romaji: 'yoru' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'ジム', romaji: 'jimu' },
        { texto: 'へ', romaji: 'e', particula: true },
        { texto: 'いきます', romaji: 'ikimasu' },
      ],
      pt: 'Vou à academia na quarta à noite.',
    },
    {
      id: 'kanji-f15',
      tokens: [
        { texto: 'きんようび', romaji: "kin'youbi" },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'よる', romaji: 'yoru' },
        { texto: 'ともだち', romaji: 'tomodachi' },
        { texto: 'と', romaji: 'to', particula: true },
        { texto: 'のみます', romaji: 'nomimasu' },
      ],
      pt: 'Sexta à noite, bebo com amigos.',
    },
    {
      id: 'kanji-f16',
      tokens: [
        { texto: 'どようび', romaji: 'doyoubi' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'かいもの', romaji: 'kaimono' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'いきます', romaji: 'ikimasu' },
      ],
      pt: 'Sábado vou às compras.',
    },
    {
      id: 'kanji-f17',
      tokens: [
        { texto: 'にちようび', romaji: 'nichiyoubi' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'かぞく', romaji: 'kazoku' },
        { texto: 'と', romaji: 'to', particula: true },
        { texto: 'すごします', romaji: 'sugoshimasu' },
      ],
      pt: 'Domingo passo com a família.',
    },
    {
      id: 'kanji-f18',
      tokens: [
        { texto: 'でんわばんごう', romaji: 'denwa bangou' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'なんばん', romaji: 'nanban' },
        { texto: 'ですか', romaji: 'desu ka' },
      ],
      pt: 'Qual é o número de telefone?',
    },
    {
      id: 'kanji-f19',
      tokens: [
        { texto: 'わたしの', romaji: 'watashi no' },
        { texto: 'けいたいばんごう', romaji: 'keitai bangou' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'ぜろきゅうぜろの', romaji: 'zero kyuu zero no' },
        { texto: 'いちにさんよんです', romaji: 'ichi ni san yon desu' },
      ],
      pt: 'Meu número de celular é 090-1234.',
    },
    {
      id: 'kanji-f20',
      tokens: [
        { texto: 'くじ', romaji: 'kuji' },
        { texto: 'じゅっぷん', romaji: 'juppun' },
        { texto: 'まえです', romaji: 'mae desu' },
      ],
      pt: 'Faltam dez minutos para as nove (8h50).',
    },
    {
      id: 'kanji-f21',
      tokens: [
        { texto: 'かいぎ', romaji: 'kaigi' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'くじ', romaji: 'kuji' },
        { texto: 'ごふん', romaji: 'gofun' },
        { texto: 'まえに', romaji: 'mae ni' },
        { texto: 'はじまります', romaji: 'hajimarimasu' },
      ],
      pt: 'A reunião começa cinco para as nove.',
    },
    {
      id: 'kanji-f22',
      tokens: [
        { texto: 'かくにんします', romaji: 'kakunin shimasu' },
        { texto: 'ぜろさんの', romaji: 'zero san no' },
        { texto: 'きゅうにいさんよんです', romaji: 'kyuu nii san yon desu' },
      ],
      pt: 'Vou confirmar: 03-9234.',
    },
    {
      id: 'kanji-f23',
      tokens: [
        { texto: 'これは', romaji: 'kore wa', particula: true },
        { texto: 'ひゃくえん', romaji: 'hyakuen' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Isto custa cem ienes.',
    },
    {
      id: 'kanji-f24',
      tokens: [
        { texto: 'すみません', romaji: 'sumimasen' },
        { texto: 'これは', romaji: 'kore wa', particula: true },
        { texto: 'いくら', romaji: 'ikura' },
        { texto: 'ですか', romaji: 'desu ka' },
      ],
      pt: 'Com licença, quanto custa isto?',
    },
    {
      id: 'kanji-f25',
      tokens: [
        { texto: 'このほんは', romaji: 'kono hon wa', particula: true },
        { texto: 'さんぜんえん', romaji: "sanzen'en" },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Este livro custa três mil ienes.',
    },
    {
      id: 'kanji-f26',
      tokens: [
        { texto: 'あたらしいじてんしゃは', romaji: 'atarashii jitensha wa', particula: true },
        { texto: 'いちまんえん', romaji: "ichiman'en" },
        { texto: 'でした', romaji: 'deshita' },
      ],
      pt: 'A bicicleta nova custou dez mil ienes.',
    },
    {
      id: 'kanji-f27',
      tokens: [
        { texto: 'ひゃくえんショップは', romaji: 'hyakuen shoppu wa', particula: true },
        { texto: 'べんり', romaji: 'benri' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'A loja de 100 ienes é conveniente.',
    },
    {
      id: 'kanji-f28',
      tokens: [
        { texto: 'なにを', romaji: 'nani o', particula: true },
        { texto: 'たべますか', romaji: 'tabemasu ka' },
      ],
      pt: 'O que você vai comer?',
    },
    {
      id: 'kanji-f29',
      tokens: [
        { texto: 'いま', romaji: 'ima' },
        { texto: 'なんじですか', romaji: 'nanji desu ka' },
      ],
      pt: 'Que horas são agora?',
    },
    {
      id: 'kanji-f30',
      tokens: [
        { texto: 'きょうは', romaji: 'kyou wa', particula: true },
        { texto: 'なんようびですか', romaji: "nan'youbi desu ka" },
      ],
      pt: 'Que dia da semana é hoje?',
    },
    {
      id: 'kanji-f31',
      tokens: [
        { texto: 'にちようびに', romaji: 'nichiyoubi ni', particula: true },
        { texto: 'やまへ', romaji: 'yama e', particula: true },
        { texto: 'いきます', romaji: 'ikimasu' },
      ],
      pt: 'Domingo eu vou à montanha.',
    },
    {
      id: 'kanji-f32',
      tokens: [
        { texto: 'ふじさんの', romaji: 'fujisan no', particula: true },
        { texto: 'しゃしんを', romaji: 'shashin o', particula: true },
        { texto: 'とりました', romaji: 'torimashita' },
      ],
      pt: 'Tirei uma foto do Monte Fuji.',
    },
    {
      id: 'kanji-f33',
      tokens: [
        { texto: 'たなかさんと', romaji: 'tanaka-san to', particula: true },
        { texto: 'なかたさんは', romaji: 'nakata-san wa', particula: true },
        { texto: 'どうりょうです', romaji: 'douryou desu' },
      ],
      pt: 'Tanaka e Nakata são colegas de trabalho.',
    },
  ],
  perguntas: [
    {
      id: 'kanji-sig1',
      tipo: 'significado',
      pergunta: 'O que é a leitura くんよみ (kun\'yomi) de um kanji?',
      alternativas: [
        'a leitura japonesa nativa, que já existia antes do kanji chegar da China',
        'a leitura que se aproxima da pronúncia chinesa original',
        'o nome do radical do kanji',
        'a forma cursiva do kanji',
      ],
      correta: 0,
    },
    {
      id: 'kanji-sig2',
      tipo: 'significado',
      pergunta: 'Qual leitura de 四 (4) é mais usada no dia a dia, para evitar confusão com a palavra "morte" (し)?',
      alternativas: ['よん (yon)', 'し (shi)', 'なな (nana)', 'く (ku)'],
      correta: 0,
    },
    {
      id: 'kanji-sig3',
      tipo: 'significado',
      pergunta: 'Qual leitura de 七 (7) é mais usada ao ditar números em voz alta, para não confundir com いち (1)?',
      alternativas: ['なな (nana)', 'しち (shichi)', 'よん (yon)', 'きゅう (kyuu)'],
      correta: 0,
    },
    {
      id: 'kanji-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'O kanji de 10 (十) se lê "とおつ" ao contar objetos um por um.',
      correta: false,
      explicacao: 'É exceção: lê-se só とお, sem o sufixo つ. Todos os outros números de 1 a 9 levam つ nessa contagem.',
    },
    {
      id: 'kanji-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Escrever kun\'yomi em hiragana e on\'yomi em katakana é como o kanji normalmente aparece em textos japoneses do dia a dia.',
      correta: false,
      explicacao: 'É uma convenção de dicionário e material de estudo, para diferenciar as duas leituras. No dia a dia, kanji aparece sozinho ou com furigana pequeno ao lado, não em katakana.',
    },
    {
      id: 'kanji-sig4',
      tipo: 'significado',
      pergunta: 'Por que alguns hotéis e hospitais no Japão evitam o quarto ou andar número 4?',
      alternativas: [
        'porque し, a leitura de 4, soa igual à palavra "morte" (死)',
        'por uma lei nacional que proíbe o número 4 em prédios',
        'porque o kanji de 4 é considerado incompleto',
        'não há motivo, é só coincidência sem relação com a língua',
      ],
      correta: 0,
    },
    {
      id: 'kanji-sig5',
      tipo: 'significado',
      pergunta: 'Como se forma o número 11 (十一) a partir dos kanji de 10 e 1?',
      alternativas: [
        'じゅう (10) + いち (1) = じゅういち',
        'いち (1) + じゅう (10) = いちじゅう',
        'とお (10) + ひとつ (1) = とおひとつ',
        'じゅう sozinho já significa 11',
      ],
      correta: 0,
    },
    {
      id: 'kanji-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'A contagem genérica com つ (ひとつ, ふたつ...) funciona para qualquer quantidade, inclusive acima de 20.',
      correta: false,
      explicacao: 'Esse sistema só vai até とお (10). Para contar acima disso, usa-se a leitura on\'yomi combinada com um contador específico — assunto de uma lição futura.',
    },
    {
      id: 'kanji-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: '九 (9) tem duas leituras comuns de origem chinesa, く e きゅう, e きゅう é a mais usada hoje em dia para contar idade, por exemplo.',
      correta: true,
    },
    {
      id: 'kanji-sig6',
      tipo: 'significado',
      pergunta: 'Qual é a leitura de 七時 (7 horas)?',
      alternativas: ['しちじ (shichiji)', 'ななじ (nanaji)', 'なのじ (nanoji)', 'しちどき (shichidoki)'],
      correta: 0,
    },
    {
      id: 'kanji-sig7',
      tipo: 'significado',
      pergunta: 'O que 半 sozinho significa depois de uma hora, como em 三時半 (さんじはん)?',
      alternativas: [
        '"e meia" — 30 minutos depois da hora cheia',
        'metade de qualquer quantidade, como uma fruta ou um bolo',
        'meio-dia, independente da hora dita antes',
        'meia-noite, independente da hora dita antes',
      ],
      correta: 0,
    },
    {
      id: 'kanji-sig8',
      tipo: 'significado',
      pergunta: 'Por que 火 (fogo) e 日 (dia/sol) podem confundir quem está começando?',
      alternativas: [
        'os dois têm a mesma leitura kun\'yomi ひ, embora signifiquem coisas diferentes',
        'os dois têm exatamente o mesmo traço (ひつじゅん)',
        'os dois significam a mesma coisa em contextos formais',
        'não têm nenhuma relação — a pergunta não faz sentido',
      ],
      correta: 0,
    },
    {
      id: 'kanji-vf5',
      tipo: 'verdadeiro-falso',
      afirmacao: '4時 (4 horas) se lê よんじ, seguindo a mesma preferência por よん explicada na seção dos números.',
      correta: false,
      explicacao: 'Ao dizer a hora, 4 é uma exceção nova: lê-se よじ, não よんじ. O mesmo acontece com 7時 (しちじ, não ななじ) e 9時 (くじ, não きゅうじ) — dizer a hora tem suas próprias irregularidades, diferentes das da contagem genérica.',
    },
    {
      id: 'kanji-vf6',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Os dias da semana em japonês (月・火・水・木・金・土・日) seguem uma lógica de nomeação parecida com a de muitos dias da semana em português e inglês, ligada a corpos celestes ou elementos.',
      correta: true,
    },
    {
      id: 'kanji-vf7',
      tipo: 'verdadeiro-falso',
      afirmacao: '半分 (metade) e o 半 usado depois da hora (como em 三時半) significam exatamente a mesma coisa e podem substituir um ao outro em qualquer frase.',
      correta: false,
      explicacao: '半 depois da hora indica "e meia" (30 minutos daquela hora); 半分 é a palavra para "metade" de algo em geral (comida, tempo, quantidade). Não são intercambiáveis — não existe "三時半分" com o sentido de 3h30.',
    },
    {
      id: 'kanji-sig9',
      tipo: 'significado',
      pergunta: 'O que significa 九時十分前 (くじじゅっぷんまえ)?',
      alternativas: [
        '8h50 — faltam dez minutos para as nove',
        '9h10 — dez minutos depois das nove',
        '9h50, uma hora depois das nove',
        '8h10, uma hora antes das nove',
      ],
      correta: 0,
    },
    {
      id: 'kanji-vf8',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Sem o 前 no final, 九時十分 muda de sentido e passa a significar "dez minutos depois das nove".',
      correta: true,
    },
    {
      id: 'kanji-sig10',
      tipo: 'significado',
      pergunta: 'Por que um número de telefone em japonês é lido dígito a dígito (さん・に・ぜろ...) em vez de como um número composto?',
      alternativas: [
        'para evitar erro de quem ouve — repetir um dígito solto é mais confiável do que calcular uma dezena de cabeça',
        'porque números compostos não existem em japonês',
        'só por tradição, sem nenhuma vantagem prática',
        'porque dígitos de telefone não têm leitura em kanji',
      ],
      correta: 0,
    },
    {
      id: 'kanji-vf9',
      tipo: 'verdadeiro-falso',
      afirmacao: 'ゼロ e れい são a mesma coisa (o dígito 0) e diferem só em registro — れい soa mais formal.',
      correta: true,
    },
    {
      id: 'kanji-sig11',
      tipo: 'significado',
      pergunta: 'O que substitui o hífen ao ditar um número de telefone em japonês?',
      alternativas: ['の', 'と', 'に', 'nada — o hífen simplesmente é ignorado'],
      correta: 0,
    },
    {
      id: 'kanji-sig12',
      tipo: 'significado',
      pergunta: 'Como se lê 三百 (300)?',
      alternativas: ['さんびゃく (sanbyaku)', 'さんひゃく (sanhyaku)', 'みひゃく (mihyaku)', 'さんぴゃく (sanpyaku)'],
      correta: 0,
      explicacao: '百 muda de ひゃく para びゃく depois de さん (300), ろく (600) e はち (800) — leitura irregular fixa, não segue o padrão dos outros múltiplos.',
    },
    {
      id: 'kanji-sig13',
      tipo: 'significado',
      pergunta: 'Como se lê 八千 (8.000)?',
      alternativas: ['はっせん (hassen)', 'はちせん (hachisen)', 'やっせん (yassen)', 'はちぜん (hachizen)'],
      correta: 0,
    },
    {
      id: 'kanji-vf10',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Para dizer "dez mil" (10.000), basta dizer 万 sozinho, sem nenhum número na frente.',
      correta: false,
      explicacao: '万 precisa do 一 na frente (一万, いちまん) — diferente de 百 e 千, que ficam sozinhos para dizer "cem" e "mil".',
    },
    {
      id: 'kanji-vf11',
      tipo: 'verdadeiro-falso',
      afirmacao: '百円ショップ é um tipo de loja popular no Japão onde a maior parte dos produtos custa 100 ienes.',
      correta: true,
    },
    {
      id: 'kanji-sig14',
      tipo: 'significado',
      pergunta: 'Qual é a leitura de 何 na frase 何を食べますか (o que você vai comer)?',
      alternativas: ['なに (nani)', 'なん (nan)', 'だれ (dare)', 'どこ (doko)'],
      correta: 0,
      explicacao: '何 antes da partícula を (ou sozinho) costuma se ler なに.',
    },
    {
      id: 'kanji-sig15',
      tipo: 'significado',
      pergunta: 'Qual é a leitura de 何 na frase 何時ですか (que horas são)?',
      alternativas: ['なん (nan)', 'なに (nani)', 'いつ (itsu)', 'どこ (doko)'],
      correta: 0,
      explicacao: '何 antes de です ou de um contador como 時、人、分 costuma se ler なん.',
    },
    {
      id: 'kanji-vf12',
      tipo: 'verdadeiro-falso',
      afirmacao: '今日 (hoje) se lê こんにち, juntando as leituras separadas de 今 (いま) e 日 (ひ).',
      correta: false,
      explicacao: '今日 tem leitura irregular, きょう — não é a soma das leituras separadas de 今 e 日.',
    },
    {
      id: 'kanji-sig16',
      tipo: 'significado',
      pergunta: 'Por que 富士山 (Monte Fuji) usa a leitura さん em vez de やま para 山?',
      alternativas: [
        'nomes de montanhas famosas geralmente usam a leitura on\'yomi さん',
        'やま está errado e nunca deveria ser usado',
        'さん é uma exceção usada só para o Monte Fuji',
        'não existe regra, é aleatório',
      ],
      correta: 0,
    },
    {
      id: 'kanji-vf13',
      tipo: 'verdadeiro-falso',
      afirmacao: 'O さん no final de 田中さん (Tanaka-san) é o mesmo さん do kanji 山 (montanha), lido em 富士山.',
      correta: false,
      explicacao: 'São coisas diferentes que soam igual por coincidência: さん depois de um nome de pessoa é o sufixo honorífico, sempre em hiragana; さん como leitura de 山 é on\'yomi do próprio kanji, usado em nomes de montanha.',
    },
    {
      id: 'kanji-sig17',
      tipo: 'significado',
      pergunta: 'Por que 川 pode se ler がわ em vez de かわ, como em nomes de rio (ex.: チエテ川)?',
      alternativas: [
        'é rendaku: a leitura "sonoriza" quando o kanji vem depois de outra palavra, formando um nome composto',
        'がわ é a leitura formal e かわ a informal, sem relação com composição',
        'depende só do tamanho do rio',
        'é um erro comum; o correto é sempre かわ',
      ],
      correta: 0,
    },
    {
      id: 'kanji-vf14',
      tipo: 'verdadeiro-falso',
      afirmacao: '田 também sofre essa mudança de som: sozinho é た, mas como segundo elemento de um sobrenome, como em 中田 (Nakata), vira だ.',
      correta: true,
    },
  ],
};

const DIGITO_KANJI = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const DIGITO_HIRAGANA = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
const DIGITO_ROMAJI = ['', 'ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyuu'];

/** Formação padrão dos números de 1 a 99 em kanji: dezena (十, com o dígito na frente a partir de
 * 20) + unidade — mesmo padrão da tabela de 1-10 desta lição, só estendido. */
function numeroKanji(n: number): { texto: string; hiragana: string; romaji: string } {
  if (n < 10) {
    return { texto: DIGITO_KANJI[n], hiragana: DIGITO_HIRAGANA[n], romaji: DIGITO_ROMAJI[n] };
  }
  if (n === 10) {
    return { texto: '十', hiragana: 'じゅう', romaji: 'juu' };
  }

  const dezena = Math.floor(n / 10);
  const unidade = n % 10;
  const prefixo = dezena === 1 ? ['', '', ''] : [DIGITO_KANJI[dezena], DIGITO_HIRAGANA[dezena], DIGITO_ROMAJI[dezena]];
  const sufixo = unidade === 0 ? ['', '', ''] : [DIGITO_KANJI[unidade], DIGITO_HIRAGANA[unidade], DIGITO_ROMAJI[unidade]];

  return {
    texto: `${prefixo[0]}十${sufixo[0]}`,
    hiragana: `${prefixo[1]}じゅう${sufixo[1]}`,
    romaji: `${prefixo[2]}juu${sufixo[2]}`,
  };
}

const NUMEROS_1_99: ItemKakitoriFonte[] = Array.from({ length: 99 }, (_, i) => i + 1).map((n) => {
  const { texto, hiragana, romaji } = numeroKanji(n);
  return { id: `kanji-num-${n}`, jp: texto, kana: hiragana, romaji, pt: String(n) };
});

const DIAS_SEMANA: ItemKakitoriFonte[] = [
  { id: 'kanji-dia-seg', jp: '月曜日', kana: 'げつようび', romaji: 'getsuyoubi', pt: 'segunda-feira' },
  { id: 'kanji-dia-ter', jp: '火曜日', kana: 'かようび', romaji: 'kayoubi', pt: 'terça-feira' },
  { id: 'kanji-dia-qua', jp: '水曜日', kana: 'すいようび', romaji: 'suiyoubi', pt: 'quarta-feira' },
  { id: 'kanji-dia-qui', jp: '木曜日', kana: 'もくようび', romaji: 'mokuyoubi', pt: 'quinta-feira' },
  { id: 'kanji-dia-sex', jp: '金曜日', kana: 'きんようび', romaji: "kin'youbi", pt: 'sexta-feira' },
  { id: 'kanji-dia-sab', jp: '土曜日', kana: 'どようび', romaji: 'doyoubi', pt: 'sábado' },
  { id: 'kanji-dia-dom', jp: '日曜日', kana: 'にちようび', romaji: 'nichiyoubi', pt: 'domingo' },
];

const NUMEROS_GRANDES: ItemKakitoriFonte[] = [
  { id: 'kanji-grande-100', jp: '百', kana: 'ひゃく', romaji: 'hyaku', pt: '100' },
  { id: 'kanji-grande-200', jp: '二百', kana: 'にひゃく', romaji: 'nihyaku', pt: '200' },
  { id: 'kanji-grande-300', jp: '三百', kana: 'さんびゃく', romaji: 'sanbyaku', pt: '300' },
  { id: 'kanji-grande-600', jp: '六百', kana: 'ろっぴゃく', romaji: 'roppyaku', pt: '600' },
  { id: 'kanji-grande-800', jp: '八百', kana: 'はっぴゃく', romaji: 'happyaku', pt: '800' },
  { id: 'kanji-grande-1000', jp: '千', kana: 'せん', romaji: 'sen', pt: '1.000' },
  { id: 'kanji-grande-3000', jp: '三千', kana: 'さんぜん', romaji: 'sanzen', pt: '3.000' },
  { id: 'kanji-grande-8000', jp: '八千', kana: 'はっせん', romaji: 'hassen', pt: '8.000' },
  { id: 'kanji-grande-10000', jp: '一万', kana: 'いちまん', romaji: 'ichiman', pt: '10.000' },
  { id: 'kanji-grande-50000', jp: '五万', kana: 'ごまん', romaji: 'goman', pt: '50.000' },
  { id: 'kanji-ien-100', jp: '百円', kana: 'ひゃくえん', romaji: 'hyakuen', pt: '100 ienes' },
  { id: 'kanji-ien-1000', jp: '千円', kana: 'せんえん', romaji: "sen'en", pt: '1.000 ienes' },
  { id: 'kanji-ien-10000', jp: '一万円', kana: 'いちまんえん', romaji: "ichiman'en", pt: '10.000 ienes' },
];

const PERGUNTAS_E_LUGARES: ItemKakitoriFonte[] = [
  { id: 'kanji-nani', jp: '何', kana: 'なに', romaji: 'nani', pt: 'o quê' },
  { id: 'kanji-nan', jp: '何', kana: 'なん', romaji: 'nan', pt: 'o quê (antes de です/contador)' },
  { id: 'kanji-ima', jp: '今', kana: 'いま', romaji: 'ima', pt: 'agora' },
  { id: 'kanji-kyou', jp: '今日', kana: 'きょう', romaji: 'kyou', pt: 'hoje' },
  { id: 'kanji-yama', jp: '山', kana: 'やま', romaji: 'yama', pt: 'montanha' },
  { id: 'kanji-fujisan', jp: '富士山', kana: 'ふじさん', romaji: 'fujisan', pt: 'Monte Fuji' },
  { id: 'kanji-kawa', jp: '川', kana: 'かわ', romaji: 'kawa', pt: 'rio' },
  { id: 'kanji-ta', jp: '田', kana: 'た', romaji: 'ta', pt: 'arrozal' },
  { id: 'kanji-tanaka', jp: '田中', kana: 'たなか', romaji: 'tanaka', pt: 'Tanaka (sobrenome)' },
  { id: 'kanji-nakata', jp: '中田', kana: 'なかた', romaji: 'nakata', pt: 'Nakata (sobrenome)' },
];

// As frases do quiz acima são só kana (regra do projeto) e não treinam a escrita dos kanji
// ensinados aqui — por isso o ditado desta lição usa só os kanji isolados (números, dias da
// semana, números grandes/preços e perguntas/lugares), não as frases.
export const kakitori: GrupoKakitori[] = [
  { id: 'kanji-numeros', label: 'Kanji - Números', itens: NUMEROS_1_99 },
  { id: 'kanji-dias', label: 'Kanji - Dias da semana', itens: DIAS_SEMANA },
  { id: 'kanji-numeros-grandes', label: 'Kanji - Números grandes e preços', itens: NUMEROS_GRANDES },
  { id: 'kanji-perguntas-lugares', label: 'Kanji - Perguntas e lugares', itens: PERGUNTAS_E_LUGARES },
];

export default function Kanji() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">Cada kanji aparece assim:</p>
        <ReadingKey
          lines={[
            { text: '一', desc: 'o kanji' },
            { text: 'ひとつ', desc: 'leitura kun\'yomi — japonesa, escrita em hiragana' },
            { text: 'イチ', desc: 'leitura on\'yomi — de origem chinesa, escrita em katakana' },
            { text: 'ichi', desc: 'romaji (da leitura on\'yomi, quando houver mais de uma)' },
            { text: 'um', desc: 'significado' },
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Separar kun'yomi em hiragana e on'yomi em katakana é só uma convenção de estudo — no
          texto japonês real, o kanji aparece sozinho ou com um furigana pequeno do lado, nunca em
          katakana. Aqui essa separação existe só para deixar claro, enquanto você estuda, qual
          leitura é qual.
        </p>
        <Note>
          Diferente das outras lições deste app, aqui o <strong>kanji é o que você está aprendendo
          ativamente</strong> — vale prestar atenção nele, não ignorá-lo. Ainda assim, as frases de
          exemplo (<span className="font-jp">Ex</span>) continuam só em hiragana/katakana com
          romaji: você está vendo o kanji isolado, nas tabelas, antes de vê-lo dentro de frases
          corridas.
        </Note>
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">Ao final, você deve saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>Explicar o que é kanji e por que ele tem duas famílias de leitura, kun'yomi e on'yomi.</li>
          <li>Reconhecer de vista os kanji dos números de 1 a 10.</li>
          <li>
            Diferenciar contar objetos genericamente (<span className="font-jp">ひとつ</span>,{' '}
            <span className="font-jp">ふたつ</span>...) de ler números como dígitos (
            <span className="font-jp">いち</span>, <span className="font-jp">に</span>...).
          </li>
          <li>Saber quais leituras alternativas (4, 7, 9) são as mais naturais no dia a dia.</li>
          <li>Entender por que japoneses evitam certos números em determinadas situações.</li>
          <li>Reconhecer de vista os sete kanji usados nos dias da semana (月火水木金土日) e montar
            月曜日 a 日曜日.</li>
          <li>
            Dizer as horas com <span className="font-jp">時</span>, <span className="font-jp">分</span>{' '}
            e <span className="font-jp">半</span>, incluindo as leituras irregulares de 4, 7 e 9
            horas.
          </li>
          <li>
            Diferenciar <span className="font-jp">半</span> (e meia, depois de uma hora) de{' '}
            <span className="font-jp">半分</span> (metade de algo em geral).
          </li>
          <li>
            Dizer quantos minutos faltam para a próxima hora com{' '}
            <span className="font-jp">前</span> (三時十分前, "dez para as três").
          </li>
          <li>
            Ler um número de telefone dígito a dígito, usando{' '}
            <span className="font-jp">の</span> para o hífen e reconhecendo as duas leituras de 0
            (<span className="font-jp">ゼロ</span>／<span className="font-jp">れい</span>).
          </li>
          <li>
            Ler e formar números até <span className="font-jp">万</span> (10.000), incluindo as
            leituras irregulares de 300, 600, 800, 3.000 e 8.000.
          </li>
          <li>
            Dizer e perguntar preços em ienes com <span className="font-jp">円</span> e{' '}
            <span className="font-jp">いくらですか</span>.
          </li>
          <li>
            Diferenciar as leituras <span className="font-jp">なに</span> e{' '}
            <span className="font-jp">なん</span> de <span className="font-jp">何</span>, e usar{' '}
            <span className="font-jp">今</span> — incluindo a leitura irregular de{' '}
            <span className="font-jp">今日</span>.
          </li>
          <li>
            Reconhecer <span className="font-jp">山</span>, <span className="font-jp">川</span> e{' '}
            <span className="font-jp">田</span> como palavra comum e como parte de sobrenomes
            japoneses comuns, incluindo a mudança de som que{' '}
            <span className="font-jp">川</span> e <span className="font-jp">田</span> sofrem em
            alguns nomes compostos.
          </li>
        </ul>
        <Note>
          Fora do escopo desta lição: o sistema completo de radicais para consulta em dicionário,
          prática detalhada de ordem de traço, contadores específicos (para objetos compridos,
          chatos, animais...), como ler datas do calendário (dia do mês, mês do ano), números
          acima de 10.000 e o sistema completo de leitura de nomes próprios japoneses (que tem
          muito mais exceções do que os poucos sobrenomes citados aqui). Esses temas ficam para
          lições futuras, conforme o curso avança.
        </Note>
      </Section>

      <Section title="O que é kanji, afinal?">
        <p className="text-sm leading-relaxed text-ink">
          Hiragana e katakana (lição Kana) são <strong>fonéticos</strong>: cada caractere representa
          só um som, sem significado próprio. Kanji é diferente — é um{' '}
          <strong>ideograma</strong>, importado da China junto com a escrita: cada caractere carrega
          um significado inteiro, além de um ou mais sons. O kanji{' '}
          <span className="font-jp text-base">一</span>, por exemplo, não é só o som "ichi" — ele
          já significa "um".
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Na escrita japonesa, os três sistemas trabalham juntos, cada um com seu papel: kanji entra
          nas partes de conteúdo da frase (substantivos, a raiz de verbos e adjetivos); hiragana
          entra nas partículas e terminações gramaticais; katakana entra em palavras estrangeiras.
          Um texto japonês real mistura os três na mesma frase — não é "ou kanji ou kana", é sempre
          os dois juntos.
        </p>
        <Note>
          Kanji também é organizado, em dicionários, por peças menores chamadas{' '}
          <strong>radicais</strong> (<span className="font-jp">ぶしゅ</span>, <em>bushu</em>) — um
          radical se repete em vários kanji diferentes e ajuda a procurar um kanji desconhecido pela
          forma. <span className="font-jp text-base">一</span> é, ele mesmo, o radical número 1 da
          lista tradicional. Não precisa decorar o sistema de radicais agora — só vale saber que ele
          existe, porque um material de estudo pode citar "radical nº X" ao lado de um kanji.
        </Note>
        <Note>
          <strong>Aprofundamento:</strong> a ordem em que se traça um kanji (
          <span className="font-jp">ひつじゅん</span>, <em>hitsujun</em>) segue algumas regras
          gerais: de cima para baixo, da esquerda para a direita, e o traço horizontal antes do
          vertical quando os dois se cruzam. Isso importa para escrever com legibilidade e rapidez à
          mão — mas nesta lição o foco é reconhecer o kanji, não treinar o traço.
        </Note>
      </Section>

      <Section title="As duas leituras: kun'yomi e on'yomi">
        <p className="text-sm leading-relaxed text-ink">
          Quase todo kanji tem pelo menos duas leituras possíveis, e escolher a errada muda a
          palavra inteira.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>Kun'yomi</strong> (<span className="font-jp">くんよみ</span>) é a leitura
          japonesa: a palavra que os japoneses já falavam antes do kanji chegar da China, e que
          passou a ser escrita com aquele caractere por causa do significado.{' '}
          <strong>On'yomi</strong> (<span className="font-jp">おんよみ</span>) é uma aproximação da
          pronúncia chinesa da época em que aquele kanji foi importado — por isso costuma soar mais
          curta e "diferente" do resto do vocabulário japonês nativo.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Existe uma regra prática, útil no começo mas com exceções: um kanji <strong>sozinho</strong>{' '}
          (às vezes com hiragana grudado depois) tende a puxar o kun'yomi; um kanji dentro de uma{' '}
          <strong>palavra composta de dois ou mais kanji</strong> tende a puxar o on'yomi. É esse
          segundo caso que faz{' '}
          <span className="font-jp text-base">十</span> (10) e{' '}
          <span className="font-jp text-base">一</span> (1) se combinarem como{' '}
          <span className="font-jp text-base">十一</span>,{' '}
          <span className="font-jp">じゅういち</span> (11) — dois on'yomi grudados formando um
          número novo.
        </p>
        <Note>
          <strong>Armadilha:</strong> a regra acima não é absoluta, e os próprios números têm uma
          exceção conhecida: no dia a dia, prefere-se{' '}
          <span className="font-jp">よん</span> a <span className="font-jp">し</span> para 4, e{' '}
          <span className="font-jp">なな</span> a <span className="font-jp">しち</span> para 7 —
          isso vale mesmo lendo dígitos soltos, situação em que normalmente se esperaria on'yomi. O
          motivo está na próxima seção.
        </Note>
      </Section>

      <Section title="Os kanji dos números de 1 a 10">
        <p className="text-sm leading-relaxed text-ink">
          Esses são os primeiros dez kanji que a maioria dos cursos ensina, porque aparecem em toda
          parte — preço, hora, endereço, quantidade — e porque o próprio traço deles é simples.
        </p>
        <GrammarTable
          headers={['Nº', 'Kanji', 'On\'yomi', 'Romaji', 'Contagem (kun\'yomi + つ)', 'Romaji']}
          jpCols={[1, 2, 4]}
          rows={[
            ['1', '一', 'いち', 'ichi', 'ひとつ', 'hitotsu'],
            ['2', '二', 'に', 'ni', 'ふたつ', 'futatsu'],
            ['3', '三', 'さん', 'san', 'みっつ', 'mittsu'],
            ['4', '四', 'し・よん', 'shi / yon', 'よっつ', 'yottsu'],
            ['5', '五', 'ご', 'go', 'いつつ', 'itsutsu'],
            ['6', '六', 'ろく', 'roku', 'むっつ', 'muttsu'],
            ['7', '七', 'しち・なな', 'shichi / nana', 'ななつ', 'nanatsu'],
            ['8', '八', 'はち', 'hachi', 'やっつ', 'yattsu'],
            ['9', '九', 'く・きゅう', 'ku / kyuu', 'ここのつ', 'kokonotsu'],
            ['10', '十', 'じゅう', 'juu', 'とお', 'too'],
          ]}
        />
        <Note>
          Repare em três irregularidades que valem menção explícita, porque são as que mais confundem
          quem está começando:
        </Note>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">四</strong> tem duas leituras concorrentes:{' '}
            <span className="font-jp">し</span> (shi) e <span className="font-jp">よん</span> (yon).
            No dia a dia, japoneses preferem <span className="font-jp">よん</span>, porque{' '}
            <span className="font-jp">し</span> tem o mesmo som da palavra "morte" (
            <span className="font-jp">死</span>).
          </li>
          <li>
            <strong className="font-jp">七</strong> também tem duas:{' '}
            <span className="font-jp">しち</span> (shichi) e{' '}
            <span className="font-jp">なな</span> (nana). Ao ditar números em voz alta,{' '}
            <span className="font-jp">なな</span> é a preferida, porque{' '}
            <span className="font-jp">しち</span> se confunde facilmente com{' '}
            <span className="font-jp">いち</span> (1) ao telefone.
          </li>
          <li>
            <strong className="font-jp">十</strong>, na coluna de contagem, é{' '}
            <span className="font-jp">とお</span> — sem o sufixo{' '}
            <span className="font-jp">つ</span> que todos os outros números de 1 a 9 levam. É a
            única exceção da tabela, e é irregular mesmo: não tem explicação além de "decore assim".
          </li>
        </ul>
        <Note>
          <strong>Aprofundamento:</strong> a contagem com{' '}
          <span className="font-jp">つ</span> só existe de 1 a 10 — não há{' '}
          <span className="font-jp">じゅういちつ</span> para "11 objetos". A partir de 11, conta-se
          com a leitura on'yomi combinada a um contador específico (
          <span className="font-jp">こ</span>, <span className="font-jp">ほん</span>,{' '}
          <span className="font-jp">まい</span>...), que muda conforme o formato do objeto — assunto
          de uma lição futura, quando o curso chegar lá.
        </Note>
      </Section>

      <Section title="Contar objetos vs. ler números">
        <p className="text-sm leading-relaxed text-ink">
          Na prática, essa escolha de leitura vira uma decisão o tempo todo: você está contando
          quantas coisas tem na mão, ou está lendo um número como identificador (idade, número de
          ônibus, código)? A primeira situação pede kun'yomi com{' '}
          <span className="font-jp">つ</span>; a segunda pede on'yomi puro, muitas vezes combinando
          dois números como você acabou de ver em 11.
        </p>
        <Ex
          jp="りんごをひとつください。"
          romaji="ringo o hitotsu kudasai."
          pt="Me dá uma maçã, por favor."
          notes="contando um item físico — kun'yomi + つ. Situação real: quitanda, feira, conbini."
        />
        <Ex
          jp="コーヒーをふたつおねがいします。"
          romaji="koohii o futatsu onegaishimasu."
          pt="Dois cafés, por favor."
          notes="mesmo padrão de contagem, registro um pouco mais educado (おねがいします em vez de ください) — comum em cafeteria."
        />
        <Ex jp="なんばんのバスですか？" romaji="nanban no basu desu ka?" pt="Qual é o número do ônibus?" notes="pergunta sobre um número-identificador." />
        <Ex
          jp="ろくばんのバスです。"
          romaji="rokuban no basu desu."
          pt="É o ônibus número 6."
          notes="resposta com on'yomi puro (ろく) — não é quantidade, é um rótulo. Situação real: ponto de ônibus, estação."
        />
        <Ex
          jp="おいくつですか？"
          romaji="oikutsu desu ka?"
          pt="Quantos anos você tem? (educado)"
          notes="pergunta comum ao conhecer alguém."
        />
        <Ex
          jp="じゅういっさいです。"
          romaji="juuissai desu."
          pt="Tenho onze anos."
          notes="十一 (じゅういち) + さい (idade) vira じゅういっさい — on'yomi combinado, exatamente como em 十一 sozinho."
        />
      </Section>

      <Section title="Números grandes e preços: 百・千・万・円">
        <p className="text-sm leading-relaxed text-ink">
          Os números de 1 a 10 bastam para contar objetos na mão, mas não para dizer um preço, uma
          distância ou uma população — para isso, o japonês usa três kanji de{' '}
          <strong>unidade</strong>, do mesmo jeito que <span className="font-jp">十</span> vira
          unidade de dezena: <span className="font-jp text-base">百</span> (centena),{' '}
          <span className="font-jp text-base">千</span> (milhar) e{' '}
          <span className="font-jp text-base">万</span> (dezena de milhar). É o uso mais imediato
          deles que faz valer a pena aprender agora: ler o preço de qualquer coisa numa loja,
          cardápio ou recibo japonês.
        </p>
        <GrammarTable
          headers={['Unidade', 'Kanji', "On'yomi", 'Romaji', 'Valor']}
          jpCols={[1, 2]}
          rows={[
            ['centena', '百', 'ひゃく', 'hyaku', '100'],
            ['milhar', '千', 'せん', 'sen', '1.000'],
            ['dezena de milhar', '万', 'まん', 'man', '10.000'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          A formação segue o mesmo padrão de <span className="font-jp">十</span>: dígito
          multiplicador na frente da unidade. <span className="font-jp">二百</span> (
          <span className="font-jp">にひゃく</span>) é 200, <span className="font-jp">五千</span>{' '}
          (<span className="font-jp">ごせん</span>) é 5.000 — regular, sem surpresa. A armadilha
          aparece em alguns múltiplos específicos, onde o som do início da unidade muda:
        </p>
        <GrammarTable
          headers={['Múltiplo', 'Kanji', 'Leitura', 'Romaji', 'Padrão regular (para comparar)']}
          jpCols={[1, 2]}
          rows={[
            ['3 ×', '三百', 'さんびゃく', 'sanbyaku', 'não é さんひゃく'],
            ['6 ×', '六百', 'ろっぴゃく', 'roppyaku', 'não é ろくひゃく'],
            ['8 ×', '八百', 'はっぴゃく', 'happyaku', 'não é はちひゃく'],
            ['3 ×', '三千', 'さんぜん', 'sanzen', 'não é さんせん'],
            ['8 ×', '八千', 'はっせん', 'hassen', 'não é はちせん'],
          ]}
        />
        <Note>
          <strong>Armadilha:</strong> <span className="font-jp">万</span> se comporta diferente de{' '}
          <span className="font-jp">百</span> e <span className="font-jp">千</span> num ponto
          importante: para dizer só "cem" ou "mil", o kanji fica sozinho (
          <span className="font-jp">百</span>, <span className="font-jp">千</span> — nunca{' '}
          <span className="font-jp">一百</span> ou <span className="font-jp">一千</span> no dia a
          dia); mas para dizer "dez mil", <span className="font-jp">万</span> sozinho não basta —
          precisa do <span className="font-jp">一</span> na frente:{' '}
          <span className="font-jp">一万</span> (<span className="font-jp">いちまん</span>).
          Aprender esse contraste evita os dois erros mais comuns aqui.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp text-base">円</span> (<span className="font-jp">えん</span>,{' '}
          <em>en</em>) é o kanji do iene, a moeda japonesa — funciona como um contador que gruda
          direto depois do número, sem partícula no meio: número + 円. Para perguntar um preço que
          você ainda não sabe, usa-se <span className="font-jp">いくらですか</span> ("quanto
          custa?"), não um número — é uma palavra de pergunta própria, assim como{' '}
          <span className="font-jp">なんばん</span> pergunta por um número-identificador.
        </p>
        <Ex
          jp="これはひゃくえんです。"
          romaji="kore wa hyakuen desu."
          pt="Isto custa cem ienes."
          notes="preço simples e redondo — situação real de balcão de loja ou conbini."
        />
        <Ex
          jp="すみません、これはいくらですか。"
          romaji="sumimasen, kore wa ikura desu ka."
          pt="Com licença, quanto custa isto?"
          notes="pergunta de preço, uma das frases mais úteis em qualquer loja no Japão."
        />
        <Ex
          jp="このほんはさんぜんえんです。"
          romaji="kono hon wa sanzen'en desu."
          pt="Este livro custa três mil ienes."
          notes="さんぜん é a leitura irregular de 3.000 — não さんせん."
        />
        <Ex
          jp="あたらしいじてんしゃはいちまんえんでした。"
          romaji="atarashii jitensha wa ichiman'en deshita."
          pt="A bicicleta nova custou dez mil ienes."
          notes="いちまん confirma a regra: diferente de 百 e 千, 万 nunca fica sozinho."
        />
        <Note>
          <strong>Nota cultural:</strong> <span className="font-jp">百円ショップ</span> (
          <span className="font-jp">ひゃくえんショップ</span>, "loja de 100 ienes") é um tipo de
          loja extremamente comum no Japão — de utensílios domésticos a papelaria e cozinha, quase
          tudo ali custa exatamente 100 ienes (mais imposto). Redes como Daiso, Seria e Can Do têm
          milhares de lojas pelo país; é parecida com as lojas de "tudo por um preço" no Brasil,
          mas muito mais comum e com produtos de qualidade surpreendentemente boa — vale de
          referência de "preço barato" no dia a dia japonês, útil para calibrar se um preço que
          você ouve é caro ou barato.
        </Note>
        <Ex
          jp="ひゃくえんショップはべんりです。"
          romaji="hyakuen shoppu wa benri desu."
          pt="A loja de 100 ienes é conveniente."
          notes="vocabulário cultural acima numa frase real, registro neutro do dia a dia."
        />
      </Section>

      <Section title="Os sete elementos e os dias da semana">
        <p className="text-sm leading-relaxed text-ink">
          A segunda aula do sensei trouxe sete kanji que, sozinhos, são coisas do dia a dia — lua,
          fogo, água, árvore, dinheiro, terra, sol — mas que juntos formam algo mais útil ainda: os
          sete dias da semana. Cada dia é um desses kanji seguido de{' '}
          <span className="font-jp">曜日</span> (<span className="font-jp">ようび</span>,{' '}
          <em>youbi</em>, "dia da semana"), sempre lido pelo on'yomi do kanji.
        </p>
        <GrammarTable
          headers={['Kanji', 'Kun\'yomi', 'On\'yomi', 'Romaji', 'Significado']}
          jpCols={[0, 1, 2]}
          rows={[
            ['月', 'つき', 'ゲツ', 'getsu', 'lua, mês'],
            ['火', 'ひ', 'カ', 'ka', 'fogo'],
            ['水', 'みず', 'スイ', 'sui', 'água'],
            ['木', 'き', 'モク', 'moku', 'árvore, madeira'],
            ['金', 'かね', 'キン', 'kin', 'ouro, dinheiro'],
            ['土', 'つち', 'ド', 'do', 'terra, solo'],
            ['日', 'ひ', 'ニチ', 'nichi', 'dia, sol'],
          ]}
        />
        <Note>
          <strong className="font-jp">火</strong> e <strong className="font-jp">日</strong> têm a
          mesma leitura kun'yomi, <span className="font-jp">ひ</span> — mas significam coisas
          diferentes (fogo vs. dia/sol) e só o contexto separa uma da outra. Isso não atrapalha nos
          nomes dos dias da semana, porque ali as duas usam a leitura on'yomi (
          <span className="font-jp">か</span> e <span className="font-jp">にち</span>) — a
          confusão só existe quando os kanji aparecem sozinhos.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          Juntando cada elemento a <span className="font-jp">曜日</span>, chega-se aos sete dias:
        </p>
        <GrammarTable
          headers={['Dia', 'Kanji', 'Romaji']}
          jpCols={[1]}
          rows={[
            ['segunda', '月曜日', 'getsuyoubi'],
            ['terça', '火曜日', 'kayoubi'],
            ['quarta', '水曜日', 'suiyoubi'],
            ['quinta', '木曜日', 'mokuyoubi'],
            ['sexta', '金曜日', "kin'youbi"],
            ['sábado', '土曜日', 'doyoubi'],
            ['domingo', '日曜日', 'nichiyoubi'],
          ]}
        />
        <Ex
          jp="げつようびはやすみです。"
          romaji="getsuyoubi wa yasumi desu."
          pt="Segunda-feira é folga."
          notes="dia da semana como tema da frase, registro neutro do dia a dia."
        />
        <Ex
          jp="すいようびのよるにジムへいきます。"
          romaji="suiyoubi no yoru ni jimu e ikimasu."
          pt="Vou à academia na quarta à noite."
          notes="rotina fixa semanal; の liga o dia ao período do dia (よる, noite)."
        />
        <Ex
          jp="きんようびのよる、ともだちとのみます。"
          romaji="kin'youbi no yoru, tomodachi to nomimasu."
          pt="Sexta à noite, bebo com amigos."
          notes="situação real: sexta à noite é quando muita gente sai para o izakaya no Japão."
        />
        <Ex
          jp="にちようびはかぞくとすごします。"
          romaji="nichiyoubi wa kazoku to sugoshimasu."
          pt="Domingo passo com a família."
          notes="domingo como dia de família — contraste de uso com sexta (social) e quarta (rotina pessoal)."
        />
        <Note>
          <strong>Nota cultural:</strong> nomear dias da semana por astros e elementos não é
          exclusividade japonesa — em português, sábado e domingo têm origem religiosa e os dias
          úteis são só numerados, mas em inglês <em>Sunday</em> (sol), <em>Monday</em> (lua) e{' '}
          <em>Saturday</em> (Saturno) vêm da mesma tradição astrológica antiga que gerou o sistema
          japonês (herdado da China). É uma ponte de memorização útil para quem já associa esses
          nomes em inglês. Na prática, isso também aparece em calendários, agendas e documentos
          japoneses: a data costuma vir com o dia da semana abreviado só pelo kanji entre parênteses,
          como <span className="font-jp">8/25（火）</span> — vale reconhecer os sete kanji sozinhos,
          não só dentro de <span className="font-jp">曜日</span>.
        </Note>
      </Section>

      <Section title="As horas: 時、分、半">
        <p className="text-sm leading-relaxed text-ink">
          Três kanji resolvem praticamente toda frase sobre horário: <span className="font-jp text-base">時</span>{' '}
          marca a hora cheia, <span className="font-jp text-base">分</span> marca os minutos e{' '}
          <span className="font-jp text-base">半</span> marca a meia hora. Diferente dos kanji
          anteriores, o sensei ensinou os três só pela leitura on'yomi — é essa a leitura usada para
          dizer as horas no dia a dia.
        </p>
        <GrammarTable
          headers={['Kanji', "On'yomi", 'Romaji', 'Uso']}
          jpCols={[0, 1]}
          rows={[
            ['時', 'ジ', 'ji', 'sufixo de hora: 三時 (さんじ, 3 horas)'],
            ['分', 'フン/プン', 'fun/pun', 'sufixo de minuto: 三分 (さんぷん, 3 minutos)'],
            ['半', 'ハン', 'han', '"e meia": 三時半 (さんじはん, 3h30)'],
          ]}
        />
        <Note>
          <strong>Aprofundamento:</strong> <span className="font-jp">時</span> e{' '}
          <span className="font-jp">半</span> também têm leitura kun'yomi (
          <span className="font-jp">とき</span> e <span className="font-jp">なかば</span>,
          respectivamente), usadas em palavras como "aquele momento" ou "no meio de" — fora do
          escopo desta lição, que trata só do uso para dizer horas. A leitura de{' '}
          <span className="font-jp">分</span> também muda entre ふん, ぷん e ぶん conforme o número
          anterior (一分 いっぷん, 二分 にふん, 三分 さんぷん...), por uma regra de eufonia —
          assunto de uma lição futura; por ora, reconhecer フン/プン já basta.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          A maior armadilha aqui não é o kanji, é a leitura do número junto de{' '}
          <span className="font-jp">時</span>: 4, 7 e 9 horas quebram a preferência por{' '}
          <span className="font-jp">よん</span> e <span className="font-jp">なな</span> que você
          acabou de aprender na seção dos números.
        </p>
        <GrammarTable
          headers={['Hora', 'Leitura correta', 'Errado (mas tentador)']}
          jpCols={[1, 2]}
          rows={[
            ['4時', 'よじ', 'よんじ'],
            ['7時', 'しちじ', 'ななじ'],
            ['9時', 'くじ', 'きゅうじ'],
          ]}
        />
        <Ex jp="なんじですか。" romaji="nanji desu ka." pt="Que horas são?" notes="pergunta básica de horário, cabe em qualquer registro." />
        <Ex
          jp="かいぎはさんじからです。"
          romaji="kaigi wa sanji kara desu."
          pt="A reunião é a partir das 3 horas."
          notes="situação real de trabalho; から marca o ponto de início."
        />
        <Ex
          jp="しちじにおきます。"
          romaji="shichiji ni okimasu."
          pt="Acordo às 7 horas."
          notes="7時 é しちじ, não ななじ — exceção específica de dizer a hora."
        />
        <Ex
          jp="くじはんにねます。"
          romaji="kuji han ni nemasu."
          pt="Durmo às 9h30."
          notes="9時 é くじ, não きゅうじ; はん acrescenta a meia hora depois da hora cheia."
        />
        <Ex
          jp="ピザをはんぶんたべました。"
          romaji="piza o hanbun tabemashita."
          pt="Comi metade da pizza."
          notes="contraste: 半分 (metade de algo) não é o mesmo 半 usado depois da hora — não existe '三時半分' para 3h30."
        />
        <p className="text-sm leading-relaxed text-ink">
          Até aqui, toda hora foi contada "para a frente" a partir da hora cheia — de{' '}
          <span className="font-jp">三時</span> até <span className="font-jp">三時五十九分</span>.
          Mas faltando poucos minutos para a próxima hora, é mais natural dizer quanto falta do que
          somar os minutos da hora anterior — como em português "dez para as três" em vez de "duas
          e cinquenta". É para isso que serve{' '}
          <span className="font-jp text-base">前</span> depois de uma hora com minutos.
        </p>
        <GrammarTable
          headers={['Kanji', 'Leitura aqui', 'Romaji', 'Uso']}
          jpCols={[0, 1]}
          rows={[
            [
              '前',
              'まえ',
              'mae',
              '"faltam ... para ...": X時Y分前 = faltam Y minutos para X horas',
            ],
          ]}
        />
        <Note>
          Diferente de <span className="font-jp">時</span>, <span className="font-jp">分</span> e{' '}
          <span className="font-jp">半</span> (todos on'yomi nesta lição),{' '}
          <span className="font-jp">前</span> aqui usa o kun'yomi{' '}
          <span className="font-jp">まえ</span> — o mesmo padrão da seção sobre kun'yomi/on'yomi:
          um kanji sozinho no fim da expressão tende a puxar a leitura japonesa nativa.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          A armadilha é que a mesma combinação de hora e minuto muda de sentido com e sem{' '}
          <span className="font-jp">前</span>: <span className="font-jp">九時十分</span> (
          <span className="font-jp">くじじゅっぷん</span>) são 9h10 — dez minutos{' '}
          <strong>depois</strong> das nove; <span className="font-jp">九時十分前</span> (
          <span className="font-jp">くじじゅっぷんまえ</span>) é 8h50 — dez minutos{' '}
          <strong>antes</strong> das nove. O número de minutos é o mesmo; só{' '}
          <span className="font-jp">前</span> no fim inverte a direção.
        </p>
        <Ex
          jp="はちじごじゅっぷんに、いえをでます。"
          romaji="hachiji gojuppun ni, ie o demasu."
          pt="Saio de casa às 8h50."
          notes="contando adiante da hora anterior (8) — uma forma tão válida quanto a de baixo, para o mesmo horário."
        />
        <Ex
          jp="くじじゅっぷんまえに、いえをでます。"
          romaji="kuji juppun mae ni, ie o demasu."
          pt="Saio de casa dez para as nove."
          notes="mesmo horário (8h50), agora contado para trás a partir da próxima hora — mais natural quando faltam poucos minutos."
        />
        <Ex
          jp="かいぎはくじごふんまえにはじまります。"
          romaji="kaigi wa kuji gofun mae ni hajimarimasu."
          pt="A reunião começa cinco para as nove."
          notes="situação real de trabalho, horário apertado — contexto típico onde 前 aparece na fala do dia a dia."
        />
      </Section>

      <Section title="Números de telefone: dígito por dígito">
        <p className="text-sm leading-relaxed text-ink">
          Até aqui, todo número apareceu inteiro: <span className="font-jp">十一</span> é "onze",
          uma unidade só. Telefone quebra esse padrão — assim como em português, um número de
          telefone não é lido como quantidade, e sim como uma sequência de dígitos separados, um a
          um. <span className="font-jp">三二〇九</span> não vira "trezentos e vinte e nove"; vira{' '}
          <span className="font-jp">さん・に・ぜろ・きゅう</span>, quatro sons distintos.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Essa separação existe para evitar erro de quem ouve: um número composto ("trinta e
          dois"?) obriga quem escuta a calcular a dezena de cabeça, enquanto dígitos soltos só
          exigem repetir o que se ouviu — essencial ao telefone, onde não dá para checar
          visualmente, ou ao ditar um número que a outra pessoa vai anotar. A mesma lógica vale
          para qualquer sequência que funciona como código, não como quantidade: CEP, placa de
          carro, número de quarto de hotel.
        </p>
        <Note>
          Isso não contradiz o <span className="font-jp">なんばん</span>/
          <span className="font-jp">ろくばん</span> da seção anterior: um identificador{' '}
          <strong>curto</strong>, como o número de um ônibus, continua lido como número composto
          (<span className="font-jp">ろくばん</span>, não{' '}
          <span className="font-jp">ろく・ばん</span>). A leitura dígito a dígito entra quando a
          sequência é <strong>longa</strong> — telefone, CEP, código — e separar em números
          compostos ficaria confuso demais para quem ouve.
        </Note>
        <GrammarTable
          headers={['Dígito', 'Leitura', 'Romaji']}
          jpCols={[1]}
          rows={[
            ['0', 'ゼロ・れい', 'zero / rei'],
            ['1', 'いち', 'ichi'],
            ['2', 'に', 'ni'],
            ['3', 'さん', 'san'],
            ['4', 'よん', 'yon'],
            ['5', 'ご', 'go'],
            ['6', 'ろく', 'roku'],
            ['7', 'なな', 'nana'],
            ['8', 'はち', 'hachi'],
            ['9', 'きゅう', 'kyuu'],
            ['- (hífen)', 'の', 'no'],
          ]}
        />
        <Note>
          4 e 7 aqui são <span className="font-jp">よん</span> e <span className="font-jp">なな</span>,
          nunca <span className="font-jp">し</span> ou <span className="font-jp">しち</span> — a
          mesma preferência da seção de números, e é justamente ao telefone que ela mais importa:{' '}
          <span className="font-jp">しち</span> (7) se confunde com{' '}
          <span className="font-jp">いち</span> (1) do outro lado da linha.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          O 0 tem duas leituras: <span className="font-jp">ゼロ</span> é a mais comum no dia a dia;{' '}
          <span className="font-jp">れい</span> soa mais formal, comum em atendimento telefônico de
          empresa e ao confirmar um número de volta para o cliente. As duas estão corretas — a
          diferença é só de registro, não de significado.
        </p>
        <Ex
          jp="すみません、としょかんのでんわばんごうはなんばんですか。"
          romaji="sumimasen, toshokan no denwa bangou wa nanban desu ka."
          pt="Com licença, qual é o telefone da biblioteca?"
          notes="なんばん você já viu perguntando o número do ônibus — aqui é a mesma pergunta, sobre telefone."
        />
        <Ex
          jp="わたしのけいたいばんごうは、ぜろきゅうぜろの、いちにさんよんの、ごろくななはちです。"
          romaji="watashi no keitai bangou wa, zero kyuu zero no, ichi ni san yon no, go roku nana hachi desu."
          pt="Meu número de celular é 090-1234-5678."
          notes="dígito a dígito, com の marcando cada hífen — pausa natural a cada bloco, como no português."
        />
        <Note>
          <strong>Aprofundamento:</strong> ao ditar um número em voz alta (não só escrever), é
          comum alongar levemente <span className="font-jp">に</span> (2) para{' '}
          <span className="font-jp">にー</span> e <span className="font-jp">ご</span> (5) para{' '}
          <span className="font-jp">ごー</span> — puro recurso de clareza na fala, sem mudar a
          escrita nem o significado. Não é obrigatório; é só um hábito comum de quem dita números
          por telefone.
        </Note>
        <Ex
          jp="かくにんします。れいさんの、きゅう、にー、さん、よんですね。"
          romaji="kakunin shimasu. rei san no, kyuu, nii, san, yon desu ne."
          pt="Vou confirmar: 03-9234, certo?"
          notes="atendente confirmando o número em voz alta — れい para o 0 e にー alongado são mais comuns nesse registro cuidadoso do que na fala casual do dia a dia."
        />
      </Section>

      <Section title={'何 e 今: perguntar "o quê" e falar de "agora"'}>
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp text-base">何</span> é o kanji da pergunta "o quê" — igual
          a "quem" e "onde" em português, é uma palavra que você vai usar toda hora. A armadilha é
          que ele tem duas leituras, <span className="font-jp">なに</span> e{' '}
          <span className="font-jp">なん</span>, e a escolha entre elas segue um padrão bem
          definido pelo que vem <strong>depois</strong> do kanji, não é livre nem aleatória.
        </p>
        <GrammarTable
          headers={['O que vem depois', 'Leitura', 'Exemplo', 'Romaji']}
          jpCols={[2]}
          rows={[
            ['partícula を／が, ou sozinho', 'なに', '何を、何が、何？', 'nani o, nani ga, nani?'],
            ['です／だ, ou contador (時、人、分...)', 'なん', '何ですか、何時、何人', 'nan desu ka, nanji, nannin'],
          ]}
        />
        <Note>
          <strong>Aprofundamento:</strong> essa regra cobre a grande maioria dos casos do dia a
          dia, mas não é absoluta — há contadores e combinações que fogem desse padrão simples.
          Por ora, essas duas situações (antes de を／が／sozinho → なに; antes de です／contador →
          なん) resolvem quase toda frase comum.
        </Note>
        <Ex
          jp="なにをたべますか。"
          romaji="nani o tabemasu ka."
          pt="O que você vai comer?"
          notes="なに antes da partícula を — situação real: pedindo comida num restaurante."
        />
        <Ex
          jp="いま、なんじですか。"
          romaji="ima, nanji desu ka."
          pt="Que horas são agora?"
          notes="なん antes do contador de hora 時, já visto na seção de horas."
        />
        <Ex
          jp="きょうはなんようびですか。"
          romaji="kyou wa nan'youbi desu ka."
          pt="Que dia da semana é hoje?"
          notes="なん antes de 曜日 — combina 今 (via きょう) e 何 na mesma pergunta cotidiana."
        />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp text-base">今</span> (<span className="font-jp">いま</span>,{' '}
          <em>ima</em>, "agora") é mais simples: uma leitura só, geralmente sozinho no início da
          frase, descrevendo o momento presente. A complicação aparece só quando ele entra numa
          palavra composta.
        </p>
        <Ex
          jp="いま、くじです。"
          romaji="ima, kuji desu."
          pt="Agora são nove horas."
          notes="今 sozinho, abrindo a frase — o uso mais comum do kanji."
        />
        <Note>
          <strong>Aprofundamento:</strong> <span className="font-jp">今日</span> ("hoje") combina{' '}
          <span className="font-jp">今</span> + <span className="font-jp">日</span>, mas não se lê{' '}
          <span className="font-jp">こんにち</span> (a soma das duas leituras separadas) — a
          leitura correta é <span className="font-jp">きょう</span>, totalmente irregular. É uma
          das palavras mais usadas do idioma, então vale reconhecer de vista mesmo sem seguir a
          lógica normal de composição que o resto da lição ensinou.
        </Note>
      </Section>

      <Section title="山・川・田: natureza que virou sobrenome">
        <p className="text-sm leading-relaxed text-ink">
          Três kanji de elementos da paisagem — montanha, rio, arrozal — que aparecem tanto como
          palavra comum quanto, combinados entre si ou com outros kanji, em alguns dos sobrenomes
          mais comuns do Japão. É por isso que vale aprendê-los juntos: reconhecer esses três
          abre a porta para "decodificar" um nome próprio japonês de vista, mesmo sem saber ler o
          nome inteiro — útil ao ler um crachá, um cartão de visita ou uma placa de rua.
        </p>
        <GrammarTable
          headers={['Kanji', "Kun'yomi", "On'yomi", 'Romaji', 'Significado']}
          jpCols={[0, 1, 2]}
          rows={[
            ['山', 'やま', 'サン', 'yama / san', 'montanha'],
            ['川', 'かわ（がわ）', '—', 'kawa (gawa)', 'rio'],
            ['田', 'た（だ）', '—', 'ta (da)', 'arrozal, campo de arroz'],
          ]}
        />
        <Note>
          <span className="font-jp">川</span> e <span className="font-jp">田</span> mudam de som
          quando vêm depois de outra palavra formando um nome composto (sobrenome ou lugar):{' '}
          <span className="font-jp">かわ</span>→<span className="font-jp">がわ</span>,{' '}
          <span className="font-jp">た</span>→<span className="font-jp">だ</span>. Esse fenômeno
          se chama <em>rendaku</em> ("sonorização sequencial") e aparece em muitas palavras
          compostas do japonês, não só nesses dois kanji — repare em{' '}
          <span className="font-jp">チエテがわ</span> (rio Tietê) e{' '}
          <span className="font-jp">なかた</span> (Nakata, sobrenome), comparados com{' '}
          <span className="font-jp">かわ</span> e <span className="font-jp">た</span> sozinhos.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp text-base">山</span> tem ainda uma segunda leitura, on'yomi{' '}
          <span className="font-jp">サン</span>, usada especialmente em nomes de montanhas
          famosas — a mais conhecida sendo <span className="font-jp">富士山</span> (
          <span className="font-jp">ふじさん</span>, Monte Fuji).
        </p>
        <Note>
          <strong>Armadilha:</strong> <span className="font-jp">さん</span> como leitura de{' '}
          <span className="font-jp">山</span> (em <span className="font-jp">富士山</span>) soa
          idêntico ao <span className="font-jp">さん</span> que vem depois de um nome de pessoa (
          <span className="font-jp">田中さん</span>, Tanaka-san) — mas são coisas completamente
          diferentes. O <span className="font-jp">さん</span> de{' '}
          <span className="font-jp">田中さん</span> é um sufixo honorífico, sempre escrito em
          hiragana, sem nenhuma relação com o kanji <span className="font-jp">山</span>; o{' '}
          <span className="font-jp">さん</span> de <span className="font-jp">富士山</span> é a
          leitura on'yomi do próprio kanji montanha. Só o contexto — depois de um nome de pessoa
          ou depois de um nome de lugar — separa os dois.
        </Note>
        <Ex
          jp="にちようびにやまへいきます。"
          romaji="nichiyoubi ni yama e ikimasu."
          pt="Domingo eu vou à montanha."
          notes="山 como palavra comum, kun'yomi やま — situação real de lazer de fim de semana."
        />
        <Ex
          jp="ふじさんのしゃしんをとりました。"
          romaji="fujisan no shashin o torimashita."
          pt="Tirei uma foto do Monte Fuji."
          notes="山 como on'yomi さん, dentro do nome próprio de uma montanha famosa."
        />
        <Ex
          jp="これはかわのしゃしんです。"
          romaji="kore wa kawa no shashin desu."
          pt="Esta é a foto de um rio."
          notes="川 sozinho, leitura kun'yomi かわ, sem a sonorização de がわ."
        />
        <Ex
          jp="たなかさんとなかたさんはどうりょうです。"
          romaji="tanaka-san to nakata-san wa douryou desu."
          pt="Tanaka e Nakata são colegas de trabalho."
          notes="dois sobrenomes com 田: た em 田中 (primeiro elemento) vs. だ em 中田 (segundo elemento) — mesma regra da nota acima."
        />
        <Note>
          <strong>Nota cultural:</strong> sobrenomes formados por esses três kanji — sozinhos ou
          combinados — estão entre os mais comuns do Japão:{' '}
          <span className="font-jp">山田</span> (Yamada), <span className="font-jp">田中</span>{' '}
          (Tanaka), <span className="font-jp">中川</span> (Nakagawa),{' '}
          <span className="font-jp">川田</span> (Kawada). Isso remonta ao século 19, quando o
          governo da era Meiji passou a exigir que todo cidadão japonês tivesse um sobrenome —
          muitas famílias que até então não tinham um escolheram algo que descrevia onde moravam:
          perto de uma montanha, de um rio, de um arrozal. Não é preciso decorar sobrenomes agora —
          só vale saber por que esses três kanji específicos aparecem tanto em nomes próprios.
        </Note>
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            [
              'Ditar 4 ou 7 com a leitura "de dicionário"',
              'し, しち (ao falar um número de telefone ou código)',
              'よん, なな',
              'し soa igual a "morte"; しち se confunde com いち ao telefone. よん/なな evitam os dois problemas.',
            ],
            [
              'Colocar つ em todos os números da contagem',
              'とおつ (para 10 objetos)',
              'とお',
              '十 é a única exceção: na contagem de 1 a 10, só ele não leva つ.',
            ],
            [
              'Misturar kun\'yomi e on\'yomi dentro da mesma palavra',
              '"ichi-tsu" para "um objeto"',
              'ひとつ (hitotsu)',
              'A contagem com つ usa kun\'yomi do início ao fim; misturar com on\'yomi não existe em japonês.',
            ],
            [
              'Achar que く é sempre a leitura de 9',
              'く-さい (tentando dizer "9 anos")',
              'きゅうさい',
              'きゅう é a leitura mais usada hoje para idade, preço e contagem em geral; く aparece mais em palavras fixas.',
            ],
            [
              'Aplicar よん/なな/きゅう ao dizer a hora',
              'よんじ, ななじ, きゅうじ',
              'よじ, しちじ, くじ',
              '4, 7 e 9 horas têm leitura própria, diferente da preferência usada ao contar objetos ou ler números soltos.',
            ],
            [
              'Confundir 半 (depois da hora) com 半分',
              '"三時半分" para dizer 3h30',
              '三時半 (さんじはん)',
              '半 sozinho depois de uma hora já significa "e meia"; 半分 é a palavra separada para "metade" de algo em geral.',
            ],
            [
              'Ler 火 e 日 sozinhos sem prestar atenção ao contexto',
              'confundir 火 (fogo) com 日 (dia/sol) porque os dois soam ひ',
              'カ/ひ para fogo, ニチ/ひ・にち para dia — o contexto ou o on\'yomi desfazem a ambiguidade',
              'Dois kanji diferentes podem compartilhar kun\'yomi; dentro de 曜日 o problema some, porque aí se usa o on\'yomi.',
            ],
            [
              'Esquecer o 前 e inverter o sentido da hora',
              'くじじゅっぷん para dizer "dez para as nove" (8h50)',
              'くじじゅっぷんまえ',
              'Sem 前, くじじゅっぷん significa 9h10 — dez minutos depois das nove, o oposto do pretendido.',
            ],
            [
              'Combinar dígitos de telefone como se fossem um número composto',
              'さんじゅうに (para o trecho "32" de um telefone)',
              'さん、に (dois dígitos separados)',
              'Telefone e outros códigos (CEP, placa) sempre leem um dígito de cada vez — mesmo quando dois dígitos juntos formariam um número "normal" como 32.',
            ],
            [
              'Esquecer o 一 antes de 万',
              '万円 sozinho para "10 mil ienes" (まんえん)',
              '一万円 (いちまんえん)',
              '万 nunca fica sozinho como 百 e 千 ficam — sempre precisa de um número (geralmente 一) na frente.',
            ],
            [
              'Não aplicar a mudança de som em múltiplos de 百/千 com 3, 6 ou 8',
              'さんひゃく, はちせん (como se não houvesse mudança)',
              'さんびゃく, はっせん',
              '300, 600, 800, 3.000 e 8.000 têm leitura irregular fixa — não seguem o padrão regular dos outros múltiplos.',
            ],
            [
              'Trocar なに por なん (ou vice-versa)',
              'なんを食べますか, なにじですか',
              'なにを食べますか, なんじですか',
              'なに antes de partícula (を、が) ou sozinho; なん antes de です／だ e de contadores como 時、人、分.',
            ],
            [
              'Confundir o さん honorífico com o さん de 山',
              'achar que 田中さん usa o kanji 山, ou que 富士山 tem um "Sr. Fuji" escondido',
              'さん em 田中さん é sufixo em hiragana; さん em 富士山 é on\'yomi do kanji 山',
              'Os dois sons são idênticos por coincidência — vêm de origens completamente diferentes.',
            ],
          ]}
        />
      </Section>

      <Section title="Nota cultural: números que se evita">
        <p className="text-sm leading-relaxed text-ink">
          A preferência por <span className="font-jp">よん</span> e{' '}
          <span className="font-jp">なな</span> não é só uma questão de clareza ao telefone — ela
          também é superstição. Como <span className="font-jp">し</span> (4) soa igual a "morte" (
          <span className="font-jp">死</span>) e <span className="font-jp">く</span> (9) soa igual a
          "sofrimento" (<span className="font-jp">苦</span>), muitos hospitais e hotéis no Japão
          pulam o quarto ou andar de número 4 e 9 — do mesmo jeito que prédios ocidentais às vezes
          pulam o 13º andar. Presentes também costumam evitar vir em conjuntos de 4 ou 9 peças.
        </p>
        <Note>
          Isso muda uma escolha prática: se você for escolher a quantidade de algo para presentear
          alguém no Japão (doces, toalhas, copos), evite conjuntos de 4 ou 9 — prefira 3, 5 ou um
          número par "neutro" como 6 ou 8.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          A mesma superstição aparece nas placas de carro: no sistema de sorteio de placas do
          Japão, números considerados "de sorte" — como 8, associado a prosperidade crescente pela
          forma do kanji <span className="font-jp">八</span>, que se abre para baixo — são
          disputados, enquanto 4 e 9 raramente aparecem por escolha própria. Empresas às vezes
          buscam um número de telefone comercial "bonito" pelo mesmo motivo: sem 4 nem 9, e
          terminando em número redondo.
        </p>
      </Section>

      <Section title="Resumo rápido">
        <GrammarTable
          headers={['Nº', 'Kanji', 'On\'yomi mais usado', 'Contagem (つ)']}
          jpCols={[1, 2, 3]}
          rows={[
            ['1', '一', 'いち', 'ひとつ'],
            ['2', '二', 'に', 'ふたつ'],
            ['3', '三', 'さん', 'みっつ'],
            ['4', '四', 'よん', 'よっつ'],
            ['5', '五', 'ご', 'いつつ'],
            ['6', '六', 'ろく', 'むっつ'],
            ['7', '七', 'なな', 'ななつ'],
            ['8', '八', 'はち', 'やっつ'],
            ['9', '九', 'きゅう', 'ここのつ'],
            ['10', '十', 'じゅう', 'とお'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Regra prática para o dia a dia: contando objetos genericamente (até 10), use kun'yomi +{' '}
          <span className="font-jp">つ</span>. Lendo números como identificador (idade, código,
          número de algo), use on'yomi — preferindo{' '}
          <span className="font-jp">よん</span> e <span className="font-jp">なな</span> a{' '}
          <span className="font-jp">し</span> e <span className="font-jp">しち</span>.
        </p>
        <GrammarTable
          headers={['Dia', 'Kanji', 'Romaji']}
          jpCols={[1]}
          rows={[
            ['segunda', '月曜日', 'getsuyoubi'],
            ['terça', '火曜日', 'kayoubi'],
            ['quarta', '水曜日', 'suiyoubi'],
            ['quinta', '木曜日', 'mokuyoubi'],
            ['sexta', '金曜日', "kin'youbi"],
            ['sábado', '土曜日', 'doyoubi'],
            ['domingo', '日曜日', 'nichiyoubi'],
          ]}
        />
        <GrammarTable
          headers={['Kanji', "On'yomi", 'Uso']}
          jpCols={[0, 1]}
          rows={[
            ['時', 'ジ', 'hora cheia (よじ・しちじ・くじ são exceções)'],
            ['分', 'フン/プン', 'minuto'],
            ['半', 'ハン', '"e meia", só depois de uma hora — não confundir com 半分 (metade)'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">X時Y分前</span> = faltam Y minutos para X horas (ex.:{' '}
          <span className="font-jp">九時十分前</span> = 8h50). Para telefone e outros códigos, cada
          dígito é lido separado — nunca combinado — com <span className="font-jp">の</span> no
          lugar do hífen e <span className="font-jp">ゼロ</span>／<span className="font-jp">れい</span>{' '}
          para 0.
        </p>
        <GrammarTable
          headers={['Kanji', "On'yomi", 'Romaji', 'Valor / uso']}
          jpCols={[0]}
          rows={[
            ['百', 'ひゃく', 'hyaku', '100 (300/600/800 mudam de som: さんびゃく／ろっぴゃく／はっぴゃく)'],
            ['千', 'せん', 'sen', '1.000 (3.000/8.000 mudam de som: さんぜん／はっせん)'],
            ['万', 'まん', 'man', '10.000 — nunca fica sozinho, sempre 一万 (いちまん)'],
            ['円', 'えん', 'en', 'iene — número + 円, sem partícula; pergunta-se com いくらですか'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">何</span> = なに antes de partícula (を／が) ou sozinho; なん
          antes de です／だ ou de um contador (時、人、分...). <span className="font-jp">今</span>{' '}
          (いま) é "agora", mas <span className="font-jp">今日</span> se lê{' '}
          <span className="font-jp">きょう</span> — irregular.
        </p>
        <GrammarTable
          headers={['Kanji', "Kun'yomi", "On'yomi", 'Significado']}
          jpCols={[0, 1, 2]}
          rows={[
            ['山', 'やま', 'サン (ex.: 富士山)', 'montanha'],
            ['川', 'かわ（がわ em composto）', '—', 'rio'],
            ['田', 'た（だ em composto）', '—', 'arrozal'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Combinados, <span className="font-jp">山・川・田</span> formam alguns dos sobrenomes mais
          comuns do Japão (<span className="font-jp">山田</span>, <span className="font-jp">田中</span>
          , <span className="font-jp">中川</span>...) — e o <span className="font-jp">さん</span>{' '}
          depois de um nome de pessoa nunca é o kanji <span className="font-jp">山</span>, mesmo
          soando igual.
        </p>
      </Section>
    </div>
  );
}
