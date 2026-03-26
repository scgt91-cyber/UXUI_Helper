import React from 'react';
import { LayoutGrid, MessageSquare, BookOpen, PenTool, Code, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const navItems = [
  { id: 'foundations', label: 'Fundamentos UX/UI', icon: BookOpen, color: 'bg-v-red' },
  { id: 'communication', label: 'Prompting para Diseño', icon: MessageSquare, color: 'bg-v-blue' },
  { id: 'ai-assisted', label: 'IA en el Proceso UX', icon: PenTool, color: 'bg-v-yellow' },
  { id: 'frontend', label: 'Frontend para Diseñadores', icon: Code, color: 'bg-v-green' },
  { id: 'integration', label: 'De Diseño a Código', icon: Cpu, color: 'bg-v-red' },
  { id: 'prompt-lab', label: 'Laboratorio de Prompts', icon: LayoutGrid, color: 'bg-v-ink' },
];

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-v-ink bg-v-bg flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-v-ink">
        <h1 className="text-xl font-bold tracking-tighter uppercase">System<br/>Thinking</h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">AI Interaction</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors text-left border-l-4",
                    isActive 
                      ? `border-v-ink bg-white text-v-ink shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]` 
                      : "border-transparent text-gray-600 hover:bg-white hover:text-v-ink hover:border-gray-300"
                  )}
                >
                  <div className={cn("p-1.5 rounded-sm text-white", item.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-v-ink">
        <div className="text-xs text-gray-500 uppercase tracking-wider">
          v1.1.0 - Español
        </div>
      </div>
    </aside>
  );
}
