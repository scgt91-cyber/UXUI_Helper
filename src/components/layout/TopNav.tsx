import React from 'react';
import { cn } from '@/lib/utils';

interface TopNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const navItems = [
  { id: 'foundations', label: 'Fundamentos', color: 'hover:text-v-red' },
  { id: 'ui-components', label: 'Componentes UI', color: 'hover:text-v-ink' },
  { id: 'communication', label: 'Prompting', color: 'hover:text-v-blue' },
  { id: 'ai-assisted', label: 'IA en UX', color: 'hover:text-v-yellow' },
  { id: 'frontend', label: 'Frontend', color: 'hover:text-v-green' },
  { id: 'integration', label: 'Integración', color: 'hover:text-v-red' },
];

export function TopNav({ currentPath, onNavigate }: TopNavProps) {
  return (
    <header className="w-full border-b-2 border-v-ink bg-v-bg sticky top-0 z-50">
      <div className="flex flex-col xl:flex-row items-center justify-between px-4 md:px-8 py-4 w-full">
        <div 
          className="flex items-center gap-2 cursor-pointer group mb-4 xl:mb-0 w-full xl:w-auto justify-start"
          onClick={() => onNavigate('home')}
        >
          <div className="w-6 h-6 bg-v-ink flex items-center justify-center group-hover:bg-v-blue transition-colors">
            <span className="text-v-bg font-bold text-[10px] leading-none">ST</span>
          </div>
          <h1 className="text-xl font-bold tracking-tighter uppercase group-hover:text-v-blue transition-colors leading-none">
            System Thinking
          </h1>
        </div>
        
        <nav className="flex items-center gap-6 overflow-x-auto max-w-full hide-scrollbar w-full xl:w-auto justify-start xl:justify-end">
          <button
            onClick={() => onNavigate('prompt-lab')}
            className={cn(
              "text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors px-4 py-2 border-2 border-v-ink",
              currentPath === 'prompt-lab' 
                ? "bg-v-blue text-white border-v-blue" 
                : "bg-v-ink text-v-bg hover:bg-v-blue hover:border-v-blue"
            )}
          >
            Prompt Lab
          </button>
          
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors",
                currentPath === item.id 
                  ? "text-v-ink border-b-2 border-v-ink pb-1" 
                  : `text-gray-500 ${item.color} pb-1 border-b-2 border-transparent`
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
