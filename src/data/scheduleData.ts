import { DaySchedule } from '../types';

export const scheduleData: Record<number, DaySchedule> = {
  1: {
    dayNum: 1,
    day: "Segunda-feira",
    schedule: [
      { 
        id: "seg_b1", time: "10:00 às 11:30", type: "estudo", block: "Bloco 1", subject: "Português (Gramática)",
        prompt: "Aja como um professor de Língua Portuguesa especialista na banca Instituto Quadrix (concursos de nível médio). O meu foco neste bloco de 1h30 é Gramática Normativa. 1) Explique-me, de forma esquematizada e direta, as regras essenciais de CRASE (casos proibidos, obrigatórios e facultativos) e de CONCORDÂNCIA VERBAL que a Quadrix mais gosta de explorar. 2) No final da explicação, crie 4 questões inéditas de múltipla escolha (A, B, C, D, E) com o perfil exato da banca, incluindo as 'rasteiras' comuns. Forneça o gabarito comentado apenas no fim."
      },
      { id: "seg_i1", time: "11:30 às 12:15", type: "pausa", block: "Intervalo 1", subject: "Pausa (45 min)", prompt: "Neste momento você está em intervalo. Levante-se, beba água, estique as pernas e afaste os olhos dos ecrãs. O seu cérebro precisa de consolidar a informação." },
      { 
        id: "seg_b2", time: "12:15 às 13:45", type: "estudo", block: "Bloco 2", subject: "Português (Interpretação)",
        prompt: "Aja como um professor de Língua Portuguesa especialista na banca Quadrix. Neste bloco, o meu foco é Interpretação de Textos e Coesão. A banca Quadrix adora pedir a substituição de conectivos interparágrafos e a reescrita de frases sem alterar o sentido original. 1) Resuma os principais conectivos lógicos (adversativos, conclusivos, explicativos e concessivos) que eu devo memorizar. 2) Elabore 3 questões difíceis (A-E) de reescrita de frases baseadas no estilo da banca. Inclua o gabarito detalhado no final."
      },
      { id: "seg_i2", time: "13:45 às 14:30", type: "pausa", block: "Intervalo 2", subject: "Almoço (45 min)", prompt: "Hora de almoçar. Faça uma refeição leve para não ter sono no período da tarde." },
      { 
        id: "seg_b3", time: "14:30 às 16:00", type: "estudo", block: "Bloco 3", subject: "RIDE-DF (Teoria)",
        prompt: "Aja como um professor especialista em Realidade do Distrito Federal e Entorno (RIDE-DF). O edital da SEDES DF exige este conhecimento. 1) Faça um resumo em tópicos sobre a legislação de criação da RIDE, quais os municípios que a compõem atualmente (focando nos goianos e mineiros, que totalizam 33 municípios de Goiás e Minas Gerais que integram a RIDE junto ao Distrito Federal) e qual é o contexto da integração económica e dos problemas de infraestrutura urbana da região. 2) Crie 3 questões de múltipla escolha (A-E) focadas nos indicadores de vulnerabilidade social da RIDE."
      },
      { id: "seg_i3", time: "16:00 às 16:45", type: "pausa", block: "Intervalo 3", subject: "Pausa (45 min)", prompt: "Pausa da tarde. Respire fundo, faça um pequeno lanche e prepare-se para o último esforço do dia." },
      { 
        id: "seg_b4", time: "16:45 às 18:15", type: "estudo", block: "Bloco 4", subject: "RIDE-DF (Questões)",
        prompt: "Aja como um simulador de provas rigoroso da banca Quadrix. Neste bloco vou fazer treino ativo (engenharia reversa) sobre RIDE-DF. Crie um miniteste com 6 questões inéditas e complexas de múltipla escolha (A-E) sobre a demografia, economia e expansão urbana do DF e Entorno. IMPORTANTE: Não me dê o gabarito imediatamente. Mostre apenas as questões. Aguarde que eu envie as minhas respostas e, só depois, faça a correção detalhando a rasteira escondida em cada alternativa errada."
      }
    ]
  },
  2: {
    dayNum: 2,
    day: "Terça-feira",
    schedule: [
      { 
        id: "ter_b1", time: "10:00 às 11:30", type: "estudo", block: "Bloco 1", subject: "LC 840/2011 e LODF",
        prompt: "Aja como um auditor de controlo interno do Distrito Federal especialista na banca Quadrix. O meu cargo é Técnico Administrativo. 1) Explique didaticamente a Lei Complementar 840/2011, focando estritamente nas regras e prazos de Provimento, Vacância, Remoção, Redistribuição e Substituição. 2) Destaque os 3 artigos da Lei Orgânica do DF (LODF) mais cobrados para a área administrativa. 3) Crie 4 questões de múltipla escolha (A-E) envolvendo trocas de palavras e prazos que a Quadrix costuma utilizar para confundir o candidato."
      },
      { id: "ter_i1", time: "11:30 às 12:15", type: "pausa", block: "Intervalo 1", subject: "Pausa (45 min)", prompt: "A legislação pode ser cansativa. Descanse os olhos, caminhe um pouco." },
      { 
        id: "ter_b2", time: "12:15 às 13:45", type: "estudo", block: "Bloco 2", subject: "Direito Constitucional",
        prompt: "Aja como um professor de Direito Constitucional. O edital da SEDES DF exige noções desta matéria. Forneça um resumo esquematizado e fácil de memorizar sobre os Direitos e Garantias Fundamentais (Art. 5º da CF/88), focando nas jurisprudências recentes e na aplicabilidade desses direitos às populações vulneráveis. Em seguida, crie 4 questões de múltipla escolha (A-E) padrão Quadrix com o respetivo gabarito comentado no final."
      },
      { id: "ter_i2", time: "13:45 às 14:30", type: "pausa", block: "Intervalo 2", subject: "Almoço (45 min)", prompt: "Hora do almoço. Desligue-se dos estudos por completo durante estes 45 minutos." },
      { 
        id: "ter_b3", time: "14:30 às 16:00", type: "estudo", block: "Bloco 3", subject: "Direito Administrativo",
        prompt: "Aja como um professor de Direito Administrativo. Neste bloco preciso de dominar os Poderes da Administração Pública (Hierárquico, Disciplinar, Regulamentar e Poder de Polícia). Explique a diferença crucial entre 'excesso de poder' e 'desvio de finalidade' no abuso de poder. Resuma também os atributos dos Atos Administrativos (PATI - Presunção de Legitimidade, Autoexecutoriedade, Tipicidade, Imperatividade). Crie 3 questões Quadrix sobre isso com gabarito."
      },
      { id: "ter_i3", time: "16:00 às 16:45", type: "pausa", block: "Intervalo 3", subject: "Pausa (45 min)", prompt: "Última pausa do dia. Já concluiu grande parte da meta diária!" },
      { 
        id: "ter_b4", time: "16:45 às 18:15", type: "estudo", block: "Bloco 4", subject: "D. Administrativo (Questões)",
        prompt: "Aja como um gerador de simulados avançados. O foco agora é resolução massiva de questões de Direito Administrativo. Elabore 6 questões inéditas de múltipla escolha (A-E) focadas em Atos Administrativos (anulação vs revogação) e Organização Administrativa (Administração Direta vs Indireta). Não apresente o gabarito. Espere que eu envie as minhas opções e depois faça a correção, explicando o erro de cada alínea."
      }
    ]
  },
  3: {
    dayNum: 3,
    day: "Quarta-feira",
    schedule: [
      { 
        id: "qua_b1", time: "10:00 às 11:30", type: "estudo", block: "Bloco 1", subject: "Lei Maria da Penha",
        prompt: "Aja como especialista em Direitos Humanos e Legislação Social. Hoje vou estudar a Lei Maria da Penha (Lei 11.340/2006). Apresente uma análise didática e focada em concurso sobre os 5 tipos de violência doméstica (física, psicológica, sexual, patrimonial e moral). Dê exemplos práticos de como a banca Quadrix tenta confundir violência moral com psicológica nas suas provas. Crie 3 questões (A-E) para testar este conhecimento."
      },
      { id: "qua_i1", time: "11:30 às 12:15", type: "pausa", block: "Intervalo 1", subject: "Pausa (45 min)", prompt: "Pausa para café e hidratação. Mantenha a mente fresca." },
      { 
        id: "qua_b2", time: "12:15 às 13:45", type: "estudo", block: "Bloco 2", subject: "PDPM e Socorros",
        prompt: "Aja como um instrutor do Governo do Distrito Federal. O meu edital exige o Plano Distrital de Políticas para Mulheres (PDPM) e Noções de Primeiros Socorros. 1) Cite e explique brevemente os eixos fundamentais do PDPM aplicados à área de assistência social. 2) Explique as condutas corretas e as contraindicações absolutas em casos de engasgamento (Manobra de Heimlich), queimaduras e crises convulsivas. Crie 3 questões mistas sobre estes dois temas."
      },
      { id: "qua_i2", time: "13:45 às 14:30", type: "pausa", block: "Intervalo 2", subject: "Almoço (45 min)", prompt: "Pausa para refeição. Aproveite." },
      { 
        id: "qua_b3", time: "14:30 às 16:00", type: "estudo", block: "Bloco 3", subject: "SUAS (Fundamentos)",
        prompt: "Aja como um Assistente Social coordenador do CRAS. Serei Técnico Administrativo na SEDES DF e preciso de entender a Lei Orgânica da Assistência Social (LOAS) e o SUAS. Explique, de forma extremamente clara e com exemplos do dia a dia, a diferença entre a Proteção Social Básica (atendida nos CRAS) e a Proteção Social Especial de Média e Alta Complexidade (atendida nos CREAS e abrigos). Crie 4 questões de múltipla escolha (A-E) estilo Quadrix sobre o funcionamento do SUAS."
      },
      { id: "qua_i3", time: "16:00 às 16:45", type: "pausa", block: "Intervalo 3", subject: "Pausa (45 min)", prompt: "Pausa da tarde. Beba água." },
      { 
        id: "qua_b4", time: "16:45 às 18:15", type: "estudo", block: "Bloco 4", subject: "Programas Sociais DF",
        prompt: "Aja como um gestor de políticas públicas do Governo do Distrito Federal. Explique as regras de elegibilidade, os objetivos e o funcionamento prático dos seguintes benefícios sociais distritais: DF Social, Cartão Prato Cheio e Cartão Gás. A Quadrix adora cobrar os requisitos de acesso a estes programas. Após o resumo, formule 4 questões inéditas de múltipla escolha (A-E) com casos práticos (ex: 'Maria, moradora de Ceilândia, tem renda X... tem direito a qual benefício?'). Dê o gabarito no final."
      }
    ]
  },
  4: {
    dayNum: 4,
    day: "Quinta-feira",
    schedule: [
      { 
        id: "qui_b1", time: "10:00 às 11:30", type: "estudo", block: "Bloco 1", subject: "Arquivologia e Atendimento",
        prompt: "Aja como um arquivista e especialista em Administração Pública focado na banca Quadrix. 1) Explique a 'Teoria das Três Idades' dos arquivos (corrente, intermédio e permanente), focando nos valores primário e secundário dos documentos. 2) Enumere os princípios da excelência no atendimento ao público (empatia, clareza, ética profissional). 3) Crie 4 questões (A-E) baseadas no cargo de Técnico Administrativo abordando gestão de arquivos."
      },
      { id: "qui_i1", time: "11:30 às 12:15", type: "pausa", block: "Intervalo 1", subject: "Pausa (45 min)", prompt: "Intervalo. Afaste-se da mesa de estudo." },
      { 
        id: "qui_b2", time: "12:15 às 13:45", type: "estudo", block: "Bloco 2", subject: "Recursos Materiais e Compras",
        prompt: "Aja como um gestor de logística do setor público. Explique os conceitos base da Administração de Recursos Materiais: classificação de materiais (curva ABC), gestão de estoques (just in time, ponto de pedido) e noções de património (tombamento e alienação). Apresente também uma breve introdução aos objetivos da nova Lei de Licitações (Lei 14.133/2021). Termine com 4 questões Quadrix de múltipla escolha (A-E) com gabarito."
      },
      { id: "qui_i2", time: "13:45 às 14:30", type: "pausa", block: "Intervalo 2", subject: "Almoço (45 min)", prompt: "Hora de almoçar. Bom apetite." },
      { 
        id: "qui_b3", time: "14:30 às 16:00", type: "estudo", block: "Bloco 3", subject: "Lei da Carreira (Lei 7.484/24)",
        prompt: "Aja como um especialista no estatuto dos servidores do DF. Analise detalhadamente a Lei Distrital nº 7.484/2024, que reestruturou a carreira de Desenvolvimento e Assistência Social. Focando no cargo de Técnico (Nível Médio), explique: a estrutura de remuneração, os requisitos para progressão e promoção funcional, e a carga horária de trabalho. Formule 3 questões de múltipla escolha rigorosas sobre esta lei específica."
      },
      { id: "qui_i3", time: "16:00 às 16:45", type: "pausa", block: "Intervalo 3", subject: "Pausa (45 min)", prompt: "O fim de semana aproxima-se. Mantenha o foco!" },
      { 
        id: "qui_b4", time: "16:45 às 18:15", type: "estudo", block: "Bloco 4", subject: "Revisão Geral Semanal",
        prompt: "Aja como um mentor de alta performance em concursos. Este é o meu bloco de revisão ativa da semana para a SEDES DF. Não me dê nenhum texto longo. Faça-me, uma de cada vez, 10 perguntas diretas e curtas (estilo 'flashcard' ou preenchimento de lacunas) sobre as matérias que estudei: prazos da LC 840, idades da Arquivologia, tipos de violência da Maria da Penha e divisões do SUAS. Espere que eu responda à primeira para passar à segunda, corrigindo os meus erros."
      }
    ]
  },
  5: {
    dayNum: 5,
    day: "Sexta-feira",
    schedule: [
      { 
        id: "sex_b1", time: "10:00 às 11:30", type: "estudo", block: "Bloco 1", subject: "Revisão (Conhecimentos Gerais)",
        prompt: "Aja como um especialista em resumos para véspera de prova. Produza um material ultra-sintético em 'bullet points' (tópicos diretos) com as 10 maiores decorebas que a Quadrix costuma exigir em: Língua Portuguesa (Crase e Pontuação) e Realidade do DF (Integração RIDE e economia local). Em seguida, aplique um teste rápido de 5 questões mistas e comente o gabarito."
      },
      { id: "sex_i1", time: "11:30 às 12:15", type: "pausa", block: "Intervalo 1", subject: "Pausa (45 min)", prompt: "Descanse os olhos." },
      { 
        id: "sex_b2", time: "12:15 às 13:45", type: "estudo", block: "Bloco 2", subject: "Revisão (Conh. Específicos)",
        prompt: "Aja como um professor orientador. Produza um mapa mental em formato de texto estruturado resumindo os pilares dos Conhecimentos Específicos para Técnico Administrativo: Diferença entre CRAS e CREAS (SUAS), os 4 Poderes Administrativos, o ciclo de vida dos arquivos e os conceitos de Licitação. Aplique 5 questões de nível difícil no formato Quadrix (A-E) para testar a minha revisão."
      },
      { id: "sex_i2", time: "13:45 às 14:30", type: "pausa", block: "Intervalo 2", subject: "Almoço (45 min)", prompt: "Hora da refeição." },
      { 
        id: "sex_b3", time: "14:30 às 16:00", type: "estudo", block: "Bloco 3", subject: "Redação Discursiva (Planeamento)",
        prompt: "Aja como o examinador oficial da prova discursiva da banca Instituto Quadrix. O edital para Técnico Administrativo (TDAS) exige uma redação dissertativo-argumentativa de 20 a 30 linhas valendo 100 pontos. Forneça: 1) Um tema inédito, desafiador e atual sobre a atuação da Assistência Social no combate à pobreza extrema ou sobre gestão pública eficiente no GDF. 2) O esqueleto ideal de como estruturar os 4 parágrafos (Introdução, 2 Argumentos, Conclusão com intervenção), indicando quais as leis e programas do GDF que eu deveria citar."
      },
      { id: "sex_i3", time: "16:00 às 16:45", type: "pausa", block: "Intervalo 3", subject: "Pausa (45 min)", prompt: "Relaxe antes de escrever o seu texto final." },
      { 
        id: "sex_b4", time: "16:45 às 18:15", type: "estudo", block: "Bloco 4", subject: "Redação Discursiva (Correção)",
        prompt: "Aja como um corretor extremamente rigoroso do Instituto Quadrix. A redação vale 100 pontos. Os critérios de avaliação oficiais são: Conteúdo e Atendimento ao Comando (CAC) - Peso 7 (até 70 pontos); Organização Textual (OT) - Peso 1.5 (até 15 pontos); Domínio da Língua Portuguesa (DLP) - Peso 1.5 (até 15 pontos). Eu vou colar a minha redação abaixo. Quero que leia, aponte todos os erros gramaticais e de coesão, avalie a consistência dos meus argumentos e atribua uma nota final de 0 a 100 baseada nestes critérios exatos. Aqui está o meu texto: [COLE AQUI A SUA REDAÇÃO]"
      }
    ]
  },
  6: {
    dayNum: 6,
    day: "Sábado",
    schedule: [
      { 
        id: "sab_b1", time: "10:00 às 11:30", type: "estudo", block: "Bloco 1", subject: "Bateria de Questões (Gerais I)",
        prompt: "Aja como um simulador focado estritamente no estilo Instituto Quadrix. Prepare uma bateria de 8 questões complexas de múltipla escolha (A a E): 4 de Língua Portuguesa (foco em sintaxe e interpretação) e 4 de RIDE-DF. Apresente apenas as questões. Aguarde que eu responda. Depois, corrija indicando a justificação legal ou gramatical e mostrando a 'rasteira' que a banca tentou aplicar nas opções incorretas."
      },
      { id: "sab_i1", time: "11:30 às 12:15", type: "pausa", block: "Intervalo 1", subject: "Pausa (45 min)", prompt: "Dia de treino intenso. Aproveite bem a pausa." },
      { 
        id: "sab_b2", time: "12:15 às 13:45", type: "estudo", block: "Bloco 2", subject: "Bateria de Questões (Gerais II)",
        prompt: "Aja como um simulador Quadrix. Prepare uma bateria de 8 questões complexas de múltipla escolha (A a E) distribuídas entre: LODF, Lei Complementar 840/2011, Lei Maria da Penha e Noções de Primeiros Socorros. Não mostre o gabarito. Deixe-me tentar responder primeiro e, a seguir, forneça uma correção pedagógica de cada item, ensinando-me a não cair nas armadilhas da banca."
      },
      { id: "sab_i2", time: "13:45 às 14:30", type: "pausa", block: "Intervalo 2", subject: "Almoço (45 min)", prompt: "Hora de recarregar as energias." },
      { 
        id: "sab_b3", time: "14:30 às 16:00", type: "estudo", block: "Bloco 3", subject: "Bateria de Questões (Específicas I)",
        prompt: "Aja como um gerador de questões cirúrgicas para o cargo de Técnico Administrativo da SEDES DF. Elabore 8 questões inéditas e de nível alto (A-E) focadas exclusivamente em: Direito Constitucional, Direito Administrativo (Atos e Poderes) e Arquivologia. Aguarde que eu introduza as minhas respostas no chat antes de fornecer o gabarito comentado e a explicação teórica dos meus erros."
      },
      { id: "sab_i3", time: "16:00 às 16:45", type: "pausa", block: "Intervalo 3", subject: "Pausa (45 min)", prompt: "Falta muito pouco para encerrar a semana." },
      { 
        id: "sab_b4", time: "16:45 às 18:15", type: "estudo", block: "Bloco 4", subject: "Bateria de Questões (Específicas II)",
        prompt: "Aja como um examinador de conhecimentos específicos da Quadrix. Crie a última bateria da semana: 8 questões de múltipla escolha (A-E) abordando Administração de Recursos Materiais, Fundamentos do SUAS/LOAS e a Lei da Carreira (7.484/2024) do DF. Não forneça as respostas imediatamente. Assim que eu responder, corrija de forma encorajadora, apontando em qual assunto eu devo focar mais no domingo."
      }
    ]
  },
  0: {
    dayNum: 0,
    day: "Domingo",
    schedule: [
      { 
        id: "dom_b1", time: "10:00 às 11:30", type: "estudo", block: "Bloco 1", subject: "Simulado de Verificação",
        prompt: "Aja como o coordenador geral do concurso da SEDES DF. Hoje é domingo, dia de simulação rápida. Elabore um mini-simulado misto de 15 questões de múltipla escolha (A-E) retiradas dos temas mais prováveis do edital de Técnico Administrativo (Código 202): Português, LC 840, SUAS, Arquivologia e Direito Administrativo. Apresente as 15 perguntas de uma vez e espere o meu gabarito completo para calcular a minha percentagem de acertos."
      },
      { id: "dom_i1", time: "11:30 às 12:15", type: "pausa", block: "Intervalo Único", subject: "Pausa (45 min)", prompt: "Descanse antes de corrigir os seus erros." },
      { 
        id: "dom_b2", time: "12:15 às 13:45", type: "estudo", block: "Bloco 2", subject: "Correção de Lacunas",
        prompt: "Aja como o meu mentor pessoal de estudos. Acabei de realizar o meu simulado da semana. Vou listar agora em que matérias ou tipos de perguntas eu errei ou me senti mais inseguro. Com base nisso, quero que me explique esses conceitos pontuais de forma que uma criança de 12 anos entenderia, fornecendo macetes ou mnemónicas para eu não voltar a errar na próxima semana."
      }
    ]
  }
};
