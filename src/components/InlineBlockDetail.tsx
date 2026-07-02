import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Play, Pause, RotateCcw, Sliders, AlertCircle, Clock, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react';
import { ScheduleItem, TweakOptions } from '../types';

interface InlineBlockDetailProps {
  item: ScheduleItem;
}

export const InlineBlockDetail: React.FC<InlineBlockDetailProps> = ({ item }) => {
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<TweakOptions>({
    style: 'multipla',
    difficulty: 'normal',
    focus: 'completo',
  });

  // Timer states
  const [secondsLeft, setSecondsLeft] = useState(5400); // 90 min default
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(5400);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize timer when item changes
  useEffect(() => {
    const defaultDuration = item.type === 'estudo' ? 90 * 60 : 45 * 60;
    setSecondsLeft(defaultDuration);
    setTotalSeconds(defaultDuration);
    setIsRunning(false);
  }, [item]);

  // Timer countdown logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            playAlertSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const playAlertSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      const now = audioCtx.currentTime;
      playTone(523.25, now, 0.25); // C5
      playTone(659.25, now + 0.25, 0.25); // E5
      playTone(783.99, now + 0.5, 0.4); // G5
    } catch (err) {
      console.warn("Audio Context blocked or unsupported:", err);
    }
  };

  const adjustTime = (minutes: number) => {
    setSecondsLeft((prev) => {
      const newVal = prev + minutes * 60;
      return newVal < 0 ? 0 : newVal;
    });
    setTotalSeconds((prev) => {
      const newVal = prev + minutes * 60;
      return newVal < 0 ? 0 : newVal;
    });
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [
      h > 0 ? String(h).padStart(2, '0') : null,
      String(m).padStart(2, '0'),
      String(s).padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  const getTunedPrompt = () => {
    if (item.type !== 'estudo') return item.prompt;

    let prompt = item.prompt;

    if (options.style === 'certo_errado') {
      prompt += "\n\n⚠️ INSTRUÇÃO ADICIONAL DE FORMATO: Como a banca Instituto Quadrix organiza muitos de seus certames no formato de julgamento de itens, formule as questões preferencialmente no modelo de 'Certo ou Errado' (itens para julgar) em vez de múltipla escolha clássica. Quero testar minha capacidade de identificar assertivas falsas baseadas em pegadinhas literais da lei seca.";
    } else {
      prompt += "\n\n⚠️ INSTRUÇÃO ADICIONAL DE FORMATO: Formule as questões rigorosamente no formato de Múltipla Escolha com 5 alternativas (A, B, C, D, E) padrão oficial da banca Quadrix, mantendo distratores plausíveis baseados nas trocas comuns de prazos e conceitos que a banca aplica.";
    }

    if (options.difficulty === 'avancado') {
      prompt += "\n\n⚠️ INSTRUÇÃO DE DIFICULDADE EXTREMA: Aumente o nível de complexidade das questões. Insira as famosas cascas de banana da banca Quadrix, as contradições doutrinárias comuns, trechos literais de artigos de leis secas (como a LODF e a LC 840) com palavras alteradas sutilmente e, sempre que possível, traga jurisprudências ou resoluções aplicáveis no âmbito do Distrito Federal.";
    }

    if (options.focus === 'resumo') {
      prompt += "\n\n⚠️ INSTRUÇÃO DE FOCO EM RECONSTRUÇÃO TEÓRICA: O meu foco principal nesta sessão é memorizar a teoria de forma rápida. Crie um resumo ultra esquematizado usando tabelas estruturadas in markdown, tópicos limpos, mnemônicas engenhosas e mapas mentais em formato texto. Coloque apenas 1 questão de fixação no final.";
    } else if (options.focus === 'questoes') {
      prompt += "\n\n⚠️ INSTRUÇÃO DE FOCO EM QUESTÕES (ENGENHARIA REVERSA): Quero testar meus conhecimentos de forma prática e imediata. Reduza a introdução teórica ao mínimo necessário (apenas um resumo de 1 ou 2 parágrafos) e dedique todo o restante do espaço para formular uma bateria robusta de questões desafiadoras com gabarito comentado detalhado no final.";
    }

    return prompt;
  };

  const tunedPrompt = getTunedPrompt();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(tunedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textarea = document.getElementById(`inline-prompt-${item.id}`) as HTMLTextAreaElement;
      if (textarea) {
        textarea.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <div className="mt-3 p-4 bg-slate-950 text-slate-100 rounded-xl flex flex-col gap-4 text-left shadow-inner border border-slate-850" onClick={(e) => e.stopPropagation()}>
      
      {/* Timer inline */}
      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-blue-400" />
          <span>Cronômetro do Bloco</span>
        </div>
        <div className="font-mono text-xl font-black text-slate-100 tracking-tight mb-1">
          {formatTime(secondsLeft)}
        </div>
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="flex gap-2 w-full justify-center">
          <button onClick={() => adjustTime(-5)} disabled={secondsLeft <= 300} className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 cursor-pointer">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setIsRunning(!isRunning)} className={`px-4 py-1 rounded text-[10px] font-bold text-white transition-all cursor-pointer ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {isRunning ? 'Pausar' : 'Iniciar'}
          </button>
          <button onClick={() => adjustTime(5)} className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => { setIsRunning(false); setSecondsLeft(item.type === 'estudo' ? 90*60 : 45*60); }} className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Opções de customização se for estudo */}
      {item.type === 'estudo' && (
        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex flex-col gap-2.5">
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3 h-3 text-blue-400" />
            <span>Tunar Prompt com IA</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] text-slate-400 font-bold uppercase">Formato</span>
              <select value={options.style} onChange={(e) => setOptions(prev => ({ ...prev, style: e.target.value as any }))} className="bg-slate-950 border border-slate-800 rounded p-1 text-[10px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="multipla">Múltipla Escolha</option>
                <option value="certo_errado">Certo / Errado</option>
              </select>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] text-slate-400 font-bold uppercase">Dificuldade</span>
              <select value={options.difficulty} onChange={(e) => setOptions(prev => ({ ...prev, difficulty: e.target.value as any }))} className="bg-slate-950 border border-slate-800 rounded p-1 text-[10px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="normal">Padrão</option>
                <option value="avancado">Rigor Máximo</option>
              </select>
            </div>
            <div className="col-span-2 flex flex-col gap-0.5">
              <span className="text-[8px] text-slate-400 font-bold uppercase">Foco do Estudo</span>
              <div className="grid grid-cols-3 gap-1 mt-0.5">
                {(['completo', 'resumo', 'questoes'] as const).map(f => (
                  <button key={f} onClick={() => setOptions(prev => ({ ...prev, focus: f }))} className={`py-1 rounded text-[9px] font-bold uppercase tracking-wide border cursor-pointer transition-all ${options.focus === f ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'}`}>
                    {f === 'completo' ? 'Misto' : f === 'resumo' ? 'Resumo' : 'Questões'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompt */}
      <div className="flex flex-col gap-1.5">
        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Prompt Direcionado</span>
          </span>
          {item.type === 'estudo' && <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Especialista Quadrix</span>}
        </div>
        <div className="relative">
          <textarea
            id={`inline-prompt-${item.id}`}
            readOnly
            value={tunedPrompt}
            className="w-full h-32 p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[10px] leading-relaxed resize-none border border-slate-800 focus:outline-none focus:ring-0 custom-scrollbar shadow-inner"
          />
          {copied && (
            <div className="absolute inset-0 bg-slate-950/90 rounded-lg flex flex-col items-center justify-center backdrop-blur-xs transition-all duration-200">
              <Check className="w-5 h-5 text-emerald-400 stroke-[3] mb-1" />
              <span className="text-[9px] font-bold text-white tracking-wider uppercase">Copiado!</span>
            </div>
          )}
        </div>
      </div>

      {/* Botão Copiar */}
      {item.type === 'estudo' ? (
        <button
          onClick={handleCopy}
          className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs transition-all flex justify-center items-center gap-1.5 shadow-sm shadow-blue-600/10"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copiar Prompt para a IA</span>
        </button>
      ) : (
        <div className="p-2.5 bg-amber-500/5 rounded-lg border border-amber-500/10 flex items-start gap-2 text-[10px] text-amber-300 leading-relaxed font-semibold">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>Sem prompt. Use este intervalo para descansar o cérebro sem olhar para telas!</span>
        </div>
      )}
    </div>
  );
};
