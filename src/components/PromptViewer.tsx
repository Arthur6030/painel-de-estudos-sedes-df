import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Play, Pause, RotateCcw, Sliders, AlertCircle, Clock, Volume2, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react';
import { ScheduleItem, TweakOptions } from '../types';

interface PromptViewerProps {
  item: ScheduleItem | null;
}

export const PromptViewer: React.FC<PromptViewerProps> = ({ item }) => {
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
    if (item) {
      const defaultDuration = item.type === 'estudo' ? 90 * 60 : 45 * 60;
      setSecondsLeft(defaultDuration);
      setTotalSeconds(defaultDuration);
      setIsRunning(false);
    }
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

  if (!item) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center h-full">
        <Sliders className="w-12 h-12 text-slate-300 mb-4 stroke-[1.5]" />
        <h3 className="text-lg font-bold text-slate-700">Nenhum Bloco Selecionado</h3>
        <p className="text-sm text-slate-500 max-w-xs mt-2">
          Selecione um bloco de estudo ou pausa na tabela para ver os detalhes e copiar o prompt.
        </p>
      </div>
    );
  }

  // Play synthetic study completion sound using Web Audio API (No files needed)
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

  // Adjust timer value manually
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

  // Format time (e.g. 01:30:00)
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

  // Compute tuned prompt dynamically
  const getTunedPrompt = () => {
    if (item.type !== 'estudo') return item.prompt;

    let prompt = item.prompt;

    // 1. Style
    if (options.style === 'certo_errado') {
      prompt += "\n\n⚠️ INSTRUÇÃO ADICIONAL DE FORMATO: Como a banca Instituto Quadrix organiza muitos de seus certames no formato de julgamento de itens, formule as questões preferencialmente no modelo de 'Certo ou Errado' (itens para julgar) em vez de múltipla escolha clássica. Quero testar minha capacidade de identificar assertivas falsas baseadas em pegadinhas literais da lei seca.";
    } else {
      prompt += "\n\n⚠️ INSTRUÇÃO ADICIONAL DE FORMATO: Formule as questões rigorosamente no formato de Múltipla Escolha com 5 alternativas (A, B, C, D, E) padrão oficial da banca Quadrix, mantendo distratores plausíveis baseados nas trocas comuns de prazos e conceitos que a banca aplica.";
    }

    // 2. Difficulty
    if (options.difficulty === 'avancado') {
      prompt += "\n\n⚠️ INSTRUÇÃO DE DIFICULDADE EXTREMA: Aumente o nível de complexidade das questões. Insira as famosas cascas de banana da banca Quadrix, as contradições doutrinárias comuns, trechos literais de artigos de leis secas (como a LODF e a LC 840) com palavras alteradas sutilmente e, sempre que possível, traga jurisprudências ou resoluções aplicáveis no âmbito do Distrito Federal.";
    }

    // 3. Focus
    if (options.focus === 'resumo') {
      prompt += "\n\n⚠️ INSTRUÇÃO DE FOCO EM RECONSTRUÇÃO TEÓRICA: O meu foco principal nesta sessão é memorizar a teoria de forma rápida. Crie um resumo ultra esquematizado usando tabelas estruturadas em markdown, tópicos limpos, mnemônicas engenhosas e mapas mentais em formato texto. Coloque apenas 1 questão de fixação no final.";
    } else if (options.focus === 'questoes') {
      prompt += "\n\n⚠️ INSTRUÇÃO DE FOCO EM QUESTÕES (ENGENHARIA REVERSA): Quero testar meus conhecimentos de forma prática e imediata. Reduza a introdução teórica ao mínimo necessário (apenas um resumo de 1 ou 2 parágrafos) e dedique todo o restante do espaço para formular uma bateria robusta de questões desafiadoras com gabarito comentado detalhado no final.";
    }

    return prompt;
  };

  const tunedPrompt = getTunedPrompt();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tunedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
      const textarea = document.getElementById('prompt-text-area') as HTMLTextAreaElement;
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
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-6 sticky top-6">
      
      {/* Header do Bloco Selecionado */}
      <div>
        <div className="flex justify-between items-center gap-2 mb-2">
          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider ${
            item.type === 'estudo' 
              ? 'bg-blue-50 text-blue-700 border border-blue-100' 
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}>
            {item.block}
          </span>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md">
            {item.time}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 leading-tight">
          {item.subject}
        </h3>
      </div>

      {/* Seção Cronômetro (Foco e Disciplina) */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col items-center">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-blue-500" />
          <span>Cronômetro do Bloco</span>
        </div>
        
        {/* Timer Display */}
        <div className="font-mono text-3xl font-extrabold text-slate-800 tracking-tight mb-2.5">
          {formatTime(secondsLeft)}
        </div>

        {/* Progresso de tempo */}
        <div className="w-full h-1 bg-slate-200 rounded-full mb-3.5 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              item.type === 'estudo' ? 'bg-blue-600' : 'bg-emerald-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Controles do Timer */}
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={() => adjustTime(-5)}
            disabled={secondsLeft <= 300}
            className="cursor-pointer p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Remover 5 minutos"
          >
            <Minus className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-grow cursor-pointer flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-sm ${
              isRunning 
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/10' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/10'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Iniciar Bloco</span>
              </>
            )}
          </button>

          <button
            onClick={() => adjustTime(5)}
            className="cursor-pointer p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
            title="Adicionar 5 minutos"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setSecondsLeft(item.type === 'estudo' ? 90 * 60 : 45 * 60);
              setTotalSeconds(item.type === 'estudo' ? 90 * 60 : 45 * 60);
            }}
            className="cursor-pointer p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
            title="Reiniciar tempo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ajustadores do Prompt (Somente para blocos de estudo) */}
      {item.type === 'estudo' && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col gap-3">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-blue-500" />
            <span>Tunar Prompt com IA</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Estilo de Questões */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Formato de Questões</label>
              <select
                value={options.style}
                onChange={(e) => setOptions(prev => ({ ...prev, style: e.target.value as any }))}
                className="cursor-pointer bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="multipla">Múltipla Escolha (A-E)</option>
                <option value="certo_errado">Certo / Errado (Quadrix)</option>
              </select>
            </div>

            {/* Dificuldade */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Nível de Rigor</label>
              <select
                value={options.difficulty}
                onChange={(e) => setOptions(prev => ({ ...prev, difficulty: e.target.value as any }))}
                className="cursor-pointer bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="normal">Padrão do Edital</option>
                <option value="avancado">Foco em Rasteiras / Alta Complexidade</option>
              </select>
            </div>

            {/* Foco de Conteúdo */}
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Foco do Conteúdo</label>
              <div className="grid grid-cols-3 gap-1.5 mt-0.5">
                {(['completo', 'resumo', 'questoes'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setOptions(prev => ({ ...prev, focus: f }))}
                    className={`cursor-pointer py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center border transition-all ${
                      options.focus === f
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {f === 'completo' ? 'Teoria+Quest' : f === 'resumo' ? 'Só Resumo' : 'Só Questões'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Caixa de Exibição do Prompt */}
      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Prompt Direcionado</span>
          </span>
          {item.type === 'estudo' && (
            <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Especialista Quadrix
            </span>
          )}
        </div>

        <div className="relative group flex-grow">
          <textarea
            id="prompt-text-area"
            readOnly
            value={tunedPrompt}
            placeholder="O prompt será gerado aqui..."
            className="w-full h-56 p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed resize-none border border-slate-800 focus:outline-none focus:ring-0 custom-scrollbar shadow-inner"
          />
          
          {/* Alerta de Cópia Sucesso */}
          {copied && (
            <div className="absolute inset-0 bg-slate-950/80 rounded-xl flex items-center justify-center backdrop-blur-xs transition-all duration-300">
              <div className="flex flex-col items-center gap-2 scale-95 animate-in fade-in zoom-in duration-200">
                <div className="p-3 bg-emerald-500 text-white rounded-full shadow-lg">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide uppercase">Copiado com sucesso!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Botão de Cópia Principal */}
      {item.type === 'estudo' ? (
        <button
          onClick={handleCopy}
          className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl transition-all flex justify-center items-center gap-2 shadow-md shadow-blue-600/15 group"
        >
          <Copy className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span>Copiar Prompt para a IA</span>
        </button>
      ) : (
        <div className="p-3.5 bg-amber-50 rounded-xl flex items-start gap-3 border border-amber-100">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
            Você está em um bloco de pausa. Levante-se, beba água, estique as pernas e evite telas para absorver melhor o que estudou!
          </p>
        </div>
      )}
    </div>
  );
};
