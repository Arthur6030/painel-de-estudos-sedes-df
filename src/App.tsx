import React, { useState, useEffect } from 'react';
import { GraduationCap, ShieldAlert, Award, Lightbulb, Check, BookOpen, Clock } from 'lucide-react';
import { scheduleData } from './data/scheduleData';
import { StatsSection } from './components/StatsSection';
import { ScheduleList } from './components/ScheduleList';
import { PromptViewer } from './components/PromptViewer';
import { GlobalSearch } from './components/GlobalSearch';
import { StudyStats } from './types';

export default function App() {
  const [selectedDay, setSelectedDay] = useState<number>(() => {
    return new Date().getDay();
  });
  const [selectedBlockId, setSelectedBlockId] = useState<string>(() => {
    const today = new Date().getDay();
    const dayData = scheduleData[today] || scheduleData[1];
    const firstStudyBlock = dayData.schedule.find(item => item.type === 'estudo');
    return firstStudyBlock ? firstStudyBlock.id : (dayData.schedule[0]?.id || '');
  });
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, boolean>>({});
  const [completedDates, setCompletedDates] = useState<string[]>([]);

  // Load state from LocalStorage on mount
  useEffect(() => {
    // Load completed blocks
    const storedCompleted = localStorage.getItem('sedes_completed_blocks_v2');
    if (storedCompleted) {
      try {
        setCompletedBlocks(JSON.parse(storedCompleted));
      } catch (e) {
        console.error("Error loading completed blocks:", e);
      }
    }

    // Load completed dates (for streak calculation)
    const storedDates = localStorage.getItem('sedes_completed_dates_v2');
    if (storedDates) {
      try {
        setCompletedDates(JSON.parse(storedDates));
      } catch (e) {
        console.error("Error loading completed dates:", e);
      }
    }
  }, []);

  // Compute stats
  const getStats = (): StudyStats => {
    // Total study blocks across all days
    let totalStudyCount = 0;
    Object.values(scheduleData).forEach(dayData => {
      totalStudyCount += dayData.schedule.filter(item => item.type === 'estudo').length;
    });

    // Completed study blocks
    let completedCount = 0;
    Object.keys(completedBlocks).forEach(key => {
      // Find block in scheduleData to ensure it is of type 'estudo'
      let isStudy = false;
      Object.values(scheduleData).forEach(dayData => {
        if (dayData.schedule.some(item => item.id === key && item.type === 'estudo')) {
          isStudy = true;
        }
      });
      if (isStudy && completedBlocks[key]) {
        completedCount++;
      }
    });

    // Carga horária studied (1.5h per block)
    const hoursStudied = completedCount * 1.5;

    // Calculate streak
    const streak = calculateStreak(completedDates);

    return {
      completedCount,
      totalStudyCount,
      hoursStudied,
      streak,
    };
  };

  // Calculate consecutive study days streak
  const calculateStreak = (dates: string[]): number => {
    if (dates.length === 0) return 0;
    
    // Sort and remove duplicates
    const uniqueSortedDates = Array.from(new Set(dates)).sort().reverse();
    const todayStr = new Date().toISOString().split('T')[0];
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // If the most recent study date is neither today nor yesterday, streak is broken
    if (uniqueSortedDates[0] !== todayStr && uniqueSortedDates[0] !== yesterdayStr) {
      return 0;
    }

    let streak = 0;
    let currentCheck = new Date();
    
    // If most recent is yesterday, start checking from yesterday
    if (uniqueSortedDates[0] === yesterdayStr) {
      currentCheck.setDate(currentCheck.getDate() - 1);
    }

    while (true) {
      const checkStr = currentCheck.toISOString().split('T')[0];
      if (uniqueSortedDates.includes(checkStr)) {
        streak++;
        currentCheck.setDate(currentCheck.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  // Toggle block completion status
  const handleToggleComplete = (blockId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Avoid selecting the block when clicking checkmark
    
    const isNowCompleted = !completedBlocks[blockId];
    const updated = { ...completedBlocks, [blockId]: isNowCompleted };
    
    setCompletedBlocks(updated);
    localStorage.setItem('sedes_completed_blocks_v2', JSON.stringify(updated));

    // Update study dates if completed is true
    if (isNowCompleted) {
      const todayStr = new Date().toISOString().split('T')[0];
      if (!completedDates.includes(todayStr)) {
        const updatedDates = [...completedDates, todayStr];
        setCompletedDates(updatedDates);
        localStorage.setItem('sedes_completed_dates_v2', JSON.stringify(updatedDates));
      }
    }
  };

  // Select day
  const handleSelectDay = (dayNum: number) => {
    setSelectedDay(dayNum);
    
    // Auto-select first study block of that day
    const dayData = scheduleData[dayNum];
    if (dayData) {
      const firstStudy = dayData.schedule.find(item => item.type === 'estudo');
      if (firstStudy) {
        setSelectedBlockId(firstStudy.id);
      } else {
        setSelectedBlockId(dayData.schedule[0]?.id || '');
      }
    }
  };

  // Select specific block (from schedule or search results)
  const handleSelectBlock = (dayNum: number, blockId: string) => {
    setSelectedDay(dayNum);
    setSelectedBlockId(blockId);
  };

  // Reset progress
  const handleReset = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o seu progresso de estudos da semana?")) {
      setCompletedBlocks({});
      localStorage.removeItem('sedes_completed_blocks_v2');
      // Keep dates/streaks to avoid discouraging user, or clear them conditionally
    }
  };

  // Get active item
  const activeDaySchedule = scheduleData[selectedDay] || scheduleData[1];
  const activeItem = activeDaySchedule.schedule.find(item => item.id === selectedBlockId) || null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased pb-12">
      
      {/* Cabeçalho principal */}
      <header className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-md border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 shrink-0">
              <GraduationCap className="w-8 h-8 text-blue-200" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center justify-center sm:justify-start gap-2">
                Expediente SEDES DF 2026
              </h1>
              <p className="text-blue-200 text-xs md:text-sm font-medium mt-0.5">
                Técnico Administrativo (Cód. 202) • Banca Quadrix • Assistente de Estudos Integrado
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs bg-blue-950/50 px-3.5 py-1.5 rounded-lg border border-blue-400/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-blue-100">Meta: 6h Diárias (4 blocos de 1.5h)</span>
          </div>
        </div>
      </header>

      {/* Conteúdo Central */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-6">
        
        {/* Seção de Pesquisa Global */}
        <div className="w-full">
          <GlobalSearch onSelectBlock={handleSelectBlock} />
        </div>

        {/* Seção de Progresso e Métricas */}
        <StatsSection stats={getStats()} onReset={handleReset} />

        {/* Grade de Layout: Esquerda (Cronograma) e Direita (Detalhes/Prompt) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Lado Esquerdo: Agenda de Estudos (7 de 12 colunas) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <ScheduleList
              daySchedule={activeDaySchedule}
              selectedDay={selectedDay}
              selectedBlockId={selectedBlockId}
              completedBlocks={completedBlocks}
              onSelectDay={handleSelectDay}
              onSelectBlock={(blockId) => setSelectedBlockId(blockId)}
              onToggleComplete={handleToggleComplete}
            />

            {/* Alerta de encerramento do dia de estudos */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4 shadow-xs">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-600 shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Foco no Descanso Mental</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedDay === 0 
                    ? "Aos Domingos, o expediente encerra-se às 13h45. O resto do dia é seu para desligar e recuperar as energias!"
                    : "Nos dias de semana, a jornada de estudos é concluída às 18h15. Lembre-se que o descanso faz parte do aprendizado estratégico."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Editor de Prompts & IA (5 de 12 colunas) */}
          <div className="lg:col-span-5">
            <PromptViewer item={activeItem} />
          </div>

        </div>

        {/* Painel Informativo sobre o Edital SEDES DF (Anti-Erro nos Estudos) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
            <h3 className="font-extrabold text-slate-800 text-base">
              Painel de Validação e Dicas de Estudos (Gabarito do Edital)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100">
              <span className="text-xs font-black text-blue-700 tracking-wider uppercase">1. Diferenças do SUAS (Core SEDES)</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Proteção Social Básica:</strong> Executada no <strong>CRAS</strong>. Previne situações de risco por vulnerabilidade. Benefícios assistenciais e serviços familiares.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                <strong>Proteção Social Especial:</strong> Executada no <strong>CREAS</strong> e centros de acolhimento. Atende famílias com direitos já violados (violência, abuso, rua).
              </p>
            </div>

            <div className="flex flex-col gap-1.5 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100">
              <span className="text-xs font-black text-amber-700 tracking-wider uppercase">2. Prazos da LC 840/2011 (Servidores DF)</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Posse:</strong> Prazo de <strong>30 dias</strong> contados da publicação do ato de nomeação (prorrogável por mais 30).
              </p>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                <strong>Exercício:</strong> Prazo de <strong>5 dias</strong> contados da posse ou da publicação (se dispensada posse). É o efetivo desempenho das atribuições.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100">
              <span className="text-xs font-black text-purple-700 tracking-wider uppercase">3. A RIDE-DF Atualizada</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                A Região Integrada de Desenvolvimento do DF e Entorno foi criada pela LC Federal nº 94/1998. 
              </p>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                <strong>Composição atualizada:</strong> Distrito Federal + <strong>33 municípios</strong> (sendo 29 do Estado de Goiás e 4 do Estado de Minas Gerais). Atenção: Arinos, Cabeceiras, Unaí e Buritis pertencem a Minas Gerais!
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-[11px] text-amber-800 leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Alerta contra erros:</strong> Este plano foi calibrado com base nos conteúdos oficiais da banca <strong>Quadrix</strong> para o certame da SEDES-DF. Ao interagir com a IA (ChatGPT, Gemini ou Claude) utilizando os prompts, o prompt força o modelo a agir como professor rigoroso focado na literalidade das leis distritais.
            </span>
          </div>
        </section>

      </main>
    </div>
  );
}
