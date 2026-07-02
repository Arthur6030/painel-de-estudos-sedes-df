import React, { useState } from 'react';
import { Search, Calendar, Clock, X } from 'lucide-react';
import { scheduleData } from '../data/scheduleData';
import { ScheduleItem } from '../types';

interface GlobalSearchProps {
  onSelectBlock: (dayNum: number, blockId: string) => void;
}

interface SearchResult extends ScheduleItem {
  dayNum: number;
  dayName: string;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ onSelectBlock }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Search across all days and blocks
  const getResults = (): SearchResult[] => {
    if (!query.trim()) return [];
    
    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    Object.values(scheduleData).forEach(daySchedule => {
      daySchedule.schedule.forEach(block => {
        const matchesSubject = block.subject.toLowerCase().includes(lowerQuery);
        const matchesPrompt = block.prompt.toLowerCase().includes(lowerQuery);
        const matchesBlock = block.block.toLowerCase().includes(lowerQuery);

        if (matchesSubject || matchesPrompt || matchesBlock) {
          results.push({
            ...block,
            dayNum: daySchedule.dayNum,
            dayName: daySchedule.day,
          });
        }
      });
    });

    return results;
  };

  const results = getResults();

  const handleSelect = (dayNum: number, blockId: string) => {
    onSelectBlock(dayNum, blockId);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Pesquise por temas (ex: SUAS, Maria da Penha, Crase, RIDE)..."
          className="w-full pl-10 pr-10 py-3 bg-white text-slate-800 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all placeholder:text-slate-400"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="absolute z-30 mt-2 w-full bg-white rounded-xl border border-slate-200 shadow-xl max-h-80 overflow-y-auto divide-y divide-slate-100">
          <div className="p-3 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between items-center">
            <span>Resultados Encontrados ({results.length})</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer">
              Fechar
            </button>
          </div>
          
          {results.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500">
              Nenhum bloco ou tema encontrado para "{query}".
            </div>
          ) : (
            results.map(item => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.dayNum, item.id)}
                className="p-4 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`text-[10px] px-2 py-0.5 font-bold rounded uppercase tracking-wide ${
                    item.type === 'estudo' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.type === 'estudo' ? item.block : 'Pausa'}
                  </span>
                  
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.dayName}
                  </span>

                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1 ml-auto">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-800">{item.subject}</h4>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1 font-sans">{item.prompt}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
