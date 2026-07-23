import { dictionaryData, Term } from '@/data/dictionary';
import { cn } from '@/lib/utils';
import { VisualExample } from '@/components/VisualExample';

interface DictionaryPageProps {
  categoryId: string;
}

const categoryColors: Record<string, string> = {
  'foundations': 'text-v-red border-v-red',
  'communication': 'text-v-blue border-v-blue',
  'ai-assisted': 'text-v-yellow border-v-yellow',
  'frontend': 'text-v-green border-v-green',
  'integration': 'text-v-red border-v-red',
  'ui-components': 'text-v-ink border-v-ink'
};

export function DictionaryPage({ categoryId }: DictionaryPageProps) {
  const data = dictionaryData[categoryId];
  const colorClass = categoryColors[categoryId] || 'text-v-ink border-v-ink';

  if (!data) {
    return (
      <div className="p-8 w-full px-4 md:px-8 mt-20">
        <h1 className="text-6xl font-bold tracking-tighter uppercase mb-4">404</h1>
        <p className="text-xl font-medium">Sección no encontrada.</p>
      </div>
    );
  }

  const groupedTerms: { type: 'group' | 'single', name?: string, items?: Term[], item?: Term }[] = [];
  let currentGroup: string | null = null;
  let currentGroupItems: Term[] = [];

  data.terms.forEach(term => {
    if (term.group) {
      if (currentGroup === term.group) {
        currentGroupItems.push(term);
      } else {
        if (currentGroupItems.length > 0) {
          groupedTerms.push({ type: 'group', name: currentGroup!, items: currentGroupItems });
        }
        currentGroup = term.group;
        currentGroupItems = [term];
      }
    } else {
      if (currentGroupItems.length > 0) {
        groupedTerms.push({ type: 'group', name: currentGroup!, items: currentGroupItems });
        currentGroup = null;
        currentGroupItems = [];
      }
      groupedTerms.push({ type: 'single', item: term });
    }
  });
  if (currentGroupItems.length > 0) {
    groupedTerms.push({ type: 'group', name: currentGroup!, items: currentGroupItems });
  }

  return (
    <div className="w-full animate-in fade-in duration-500 pb-20">
      <div className="mb-12 border-b-4 border-v-ink pb-6 px-4 md:px-8 pt-8">
        <h1 className={cn("text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none mb-4", colorClass.split(' ')[0])}>
          {data.title}
        </h1>
        <p className="text-lg md:text-xl font-medium max-w-3xl">
          {data.description}
        </p>
      </div>

      <div className="flex flex-col px-4 md:px-8">
        {groupedTerms.map((block, index) => {
          if (block.type === 'group') {
            return (
              <div key={index} className="my-8 p-6 md:p-10 border-4 border-v-ink bg-v-ink/5 relative">
                <div className="absolute -top-4 left-6 md:left-10 bg-v-ink text-white px-4 py-1 font-bold uppercase tracking-widest text-sm">
                  {block.name}
                </div>
                <div className="flex flex-col gap-10 pt-4">
                  {block.items!.map((item, i) => (
                    <div key={i} className={cn("grid grid-cols-1 lg:grid-cols-12 gap-6", i !== block.items!.length - 1 ? "pb-10 border-b-2 border-v-ink/10" : "")}>
                      <div className="lg:col-span-3">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tighter uppercase sticky top-24">
                          {item.term}
                        </h2>
                      </div>
                      <div className="lg:col-span-9">
                        <p className={cn("text-lg font-medium leading-relaxed", item.badPrompt && item.proPrompt ? "mb-6" : "")}>
                          {item.definition}
                        </p>
                        
                        <VisualExample term={item.term} />

                        {item.badPrompt && item.proPrompt && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border-l-4 border-v-red pl-4">
                              <h3 className="text-xs font-bold uppercase tracking-widest text-v-red mb-2">
                                Generalización (Evitar)
                              </h3>
                              <p className="font-mono text-sm text-gray-600 leading-relaxed">
                                {item.badPrompt}
                              </p>
                            </div>
                            <div className="border-l-4 border-v-green pl-4">
                              <h3 className="text-xs font-bold uppercase tracking-widest text-v-green mb-2">
                                Con Propiedad (Usar)
                              </h3>
                              <p className="font-mono text-sm font-medium text-v-ink leading-relaxed">
                                {item.proPrompt}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          const item = block.item!;
          return (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 border-b-2 border-v-ink/20">
              <div className="lg:col-span-3">
                <h2 className="text-xl md:text-2xl font-bold tracking-tighter uppercase sticky top-24">
                  {item.term}
                </h2>
              </div>
              
              <div className="lg:col-span-9">
                <p className={cn("text-lg font-medium leading-relaxed", item.badPrompt && item.proPrompt ? "mb-6" : "")}>
                  {item.definition}
                </p>

                <VisualExample term={item.term} />

                {item.badPrompt && item.proPrompt && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-l-4 border-v-red pl-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-v-red mb-2">
                        Generalización (Evitar)
                      </h3>
                      <p className="font-mono text-sm text-gray-600 leading-relaxed">
                        {item.badPrompt}
                      </p>
                    </div>
                    <div className="border-l-4 border-v-green pl-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-v-green mb-2">
                        Con Propiedad (Usar)
                      </h3>
                      <p className="font-mono text-sm font-medium text-v-ink leading-relaxed">
                        {item.proPrompt}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
