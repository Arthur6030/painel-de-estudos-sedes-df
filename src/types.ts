export type BlockType = 'estudo' | 'pausa';

export interface ScheduleItem {
  id: string;
  time: string;
  type: BlockType;
  block: string;
  subject: string;
  prompt: string;
}

export interface DaySchedule {
  dayNum: number;
  day: string;
  schedule: ScheduleItem[];
}

export interface TweakOptions {
  style: 'multipla' | 'certo_errado';
  difficulty: 'normal' | 'avancado';
  focus: 'completo' | 'questoes' | 'resumo';
}

export interface StudyStats {
  completedCount: number;
  totalStudyCount: number;
  hoursStudied: number;
  streak: number;
}
