import React from 'react';
import { Flame, BookOpen, Clock, Award, RotateCcw } from 'lucide-react';
import { StudyStats } from '../types';

interface StatsSectionProps {
  stats: StudyStats;
  onReset: () => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats, onReset }) => {
  const percentage = stats.totalStudyCount > 0 
    ? Math.round((stats.completedCount / stats.totalStudyCount) * 100) 
    : 0;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Progresso de Estudos</h2>
          <p className="text-xs text-slate-400 mt-1">Dados persistidos localmente para acompanhar o seu desempenho rumo à SEDES-DF</p>
        </div>
        <button 
          onClick={onReset}
          className="cursor-pointer text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950/40 hover:text-red-400 border border-slate-700 hover:border-red-900 transition-all text-slate-300 font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Limpar Progresso</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Bloco 1: Concluídos */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Blocos Feitos</span>
            <span className="text-lg font-bold text-slate-100">{stats.completedCount} / {stats.totalStudyCount}</span>
          </div>
        </div>

        {/* Bloco 2: Horas Estudadas */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Carga Horária</span>
            <span className="text-lg font-bold text-slate-100">{stats.hoursStudied.toFixed(1)}h</span>
          </div>
        </div>

        {/* Bloco 3: Streak */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-400">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sequência</span>
            <span className="text-lg font-bold text-slate-100">{stats.streak} {stats.streak === 1 ? 'Dia' : 'Dias'}</span>
          </div>
        </div>

        {/* Bloco 4: Meta Conclusão */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-400">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex-grow">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Aproveitamento</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-100">{percentage}%</span>
              <div className="flex-grow h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
