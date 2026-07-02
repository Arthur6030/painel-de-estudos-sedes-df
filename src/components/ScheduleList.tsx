import React from 'react';
import { Calendar, CheckCircle2, ChevronRight, Coffee } from 'lucide-react';
import { DaySchedule } from '../types';
import { InlineBlockDetail } from './InlineBlockDetail';

interface ScheduleListProps {
  daySchedule: DaySchedule;
  selectedDay: number;
  selectedBlockId: string;
  completedBlocks: Record<string, boolean>;
  onSelectDay: (dayNum: number) => void;
  onSelectBlock: (blockId: string) => void;
  onToggleComplete: (blockId: string, event: React.MouseEvent) => void;
}

export const ScheduleList: React.FC<ScheduleListProps> = ({
  daySchedule,
  selectedDay,
  selectedBlockId,
  completedBlocks,
  onSelectDay,
  onSelectBlock,
  onToggleComplete,
}) => {
  const dayOrder = [1, 2, 3, 4, 5, 6, 0];
  const dayNames: Record<number, string> = {
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado",
    0: "Domingo"
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Abas de dias da semana */}
      <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-1">
        {dayOrder.map((dayNum) => {
          const isActive = dayNum === selectedDay;
          return (
            <button
              key={dayNum}
              onClick={() => onSelectDay(dayNum)}
              className={`flex-grow cursor-pointer text-xs md:text-sm font-bold py-2 px-3 rounded-lg border transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-white border-transparent text-slate-600 hover:bg-slate-50'
              }`}
            >
              {dayNames[dayNum]}
            </button>
          );
        })}
      </div>

      {/* Título do Dia Ativo */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm md:text-base">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Cronograma:</span>
            <span className="text-blue-600 font-extrabold">{daySchedule.day}</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium font-mono">
            {daySchedule.schedule.length} blocos hoje
          </span>
        </div>

        {/* Lista de Blocos */}
        <div className="divide-y divide-slate-100 max-h-[520px] overflow-y-auto custom-scrollbar">
          {daySchedule.schedule.map((item) => {
            const isPausa = item.type === 'pausa';
            const isSelected = item.id === selectedBlockId;
            const isCompleted = completedBlocks[item.id] || false;

            if (isPausa) {
              return (
                <div key={item.id} className="flex flex-col">
                  <div
                    onClick={() => onSelectBlock(item.id)}
                    className={`p-4 flex items-center justify-between bg-slate-50/50 text-slate-500 border-l-4 border-slate-300 cursor-pointer hover:bg-slate-100/80 transition-colors ${
                      isSelected ? 'bg-slate-100/90' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded text-[10px] font-bold">
                        {item.time}
                      </span>
                      <span className="italic text-xs md:text-sm font-semibold flex items-center gap-1.5 text-slate-500">
                        <Coffee className="w-3.5 h-3.5" />
                        {item.subject}
                      </span>
                    </div>
                    <Coffee className="w-4 h-4 text-slate-400" />
                  </div>
                  {isSelected && (
                    <div className="px-4 pb-4 bg-slate-100/30 border-l-4 border-slate-300">
                      <InlineBlockDetail item={item} />
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={item.id} className="flex flex-col">
                <div
                  onClick={() => onSelectBlock(item.id)}
                  className={`p-4 flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer border-l-4 ${
                    isSelected
                      ? 'bg-blue-50/60 border-blue-600'
                      : 'bg-white border-transparent hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-grow min-w-0">
                    {/* Checkbox customizado */}
                    <button
                      onClick={(e) => onToggleComplete(item.id, e)}
                      className={`cursor-pointer flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300 hover:border-blue-500 bg-white'
                      }`}
                      title={isCompleted ? "Marcar como não feito" : "Marcar como concluído"}
                    >
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>

                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-slate-400">{item.time}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-600 font-bold rounded uppercase">
                          {item.block}
                        </span>
                      </div>
                      <h4
                        className={`font-bold text-sm text-slate-800 mt-0.5 truncate ${
                          isCompleted ? 'line-through text-slate-400 font-medium' : ''
                        }`}
                      >
                        {item.subject}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted && (
                      <span className="hidden sm:inline-block text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded">
                        Concluído
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isSelected ? 'text-blue-600 rotate-90' : 'text-slate-300'}`} />
                  </div>
                </div>
                {isSelected && (
                  <div className="px-4 pb-4 bg-blue-50/30 border-l-4 border-blue-600">
                    <InlineBlockDetail item={item} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
