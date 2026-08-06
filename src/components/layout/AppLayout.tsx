import React, { useState } from 'react';
import { TopNav } from './TopNav';
import { PromptLabPage } from '@/pages/PromptLabPage';
import { DictionaryPage } from '@/pages/DictionaryPage';
import { StylesPage } from '@/pages/StylesPage';
import { HomePage } from '@/pages/HomePage';

export function AppLayout() {
  const [currentPath, setCurrentPath] = useState('home');

  const renderContent = () => {
    if (currentPath === 'home') {
      return <HomePage onNavigate={setCurrentPath} />;
    }
    if (currentPath === 'prompt-lab') {
      return <PromptLabPage />;
    }
    if (currentPath === 'styles') {
      return <StylesPage />;
    }
    return <DictionaryPage categoryId={currentPath} />;
  };

  return (
    <div className="min-h-screen bg-v-bg text-v-ink font-sans selection:bg-v-yellow selection:text-v-ink flex flex-col">
      <TopNav currentPath={currentPath} onNavigate={setCurrentPath} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        {renderContent()}
      </main>
    </div>
  );
}
