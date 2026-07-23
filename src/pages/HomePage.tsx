import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const categories = [
    { id: 'foundations', title: 'Fundamentos', desc: 'Conceptos base de diseño', color: 'hover:bg-v-red' },
    { id: 'ui-components', title: 'Componentes UI', desc: 'Diccionario de elementos de interfaz', color: 'hover:bg-v-ink' },
    { id: 'communication', title: 'Prompting', desc: 'Cómo hablarle a la IA', color: 'hover:bg-v-yellow' },
    { id: 'ai-assisted', title: 'IA en UX', desc: 'Herramientas y procesos', color: 'hover:bg-v-green' },
    { id: 'frontend', title: 'Frontend', desc: 'Términos de código', color: 'hover:bg-v-blue' },
    { id: 'integration', title: 'Integración', desc: 'De diseño a código', color: 'hover:bg-v-red' },
  ];

  return (
    <div className="w-full animate-in fade-in duration-700 pb-20">
      {/* Hero Section - Asymmetrical & Oversized with Graphics */}
      <div className="px-4 md:px-8 pt-12 pb-12 border-b-2 border-v-ink mb-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Typography & CTA */}
          <div className="lg:col-span-7 relative z-10">
            <div className="inline-block border-2 border-v-ink px-4 py-1 mb-6 bg-v-yellow font-bold uppercase tracking-widest text-sm">
              Diccionario Técnico & AI Lab
            </div>
            <h1 className="text-[14vw] lg:text-[10rem] leading-[0.85] font-bold tracking-tighter uppercase text-v-ink mb-8">
              System<br />
              Thinking
            </h1>
            <p className="text-xl md:text-2xl font-medium leading-snug mb-8 text-v-ink max-w-xl">
              Domina el vocabulario técnico de UX/UI y Frontend. Deja de generalizar: hablar con propiedad es vital para alinearte con tu equipo y para delegar tareas complejas a la IA Agéntica.
            </p>
            <button 
              onClick={() => onNavigate('prompt-lab')}
              className="w-full md:w-auto py-5 bg-v-ink text-v-bg text-lg font-bold uppercase tracking-widest flex items-center justify-between md:justify-center gap-6 px-8 hover:bg-v-blue transition-colors border-2 border-v-ink hover:border-v-blue"
            >
              <span>Iniciar Prompt Lab</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Right: Brutalist Graphic Composition */}
          <div className="lg:col-span-5 relative hidden lg:block h-[500px] w-full">
            {/* Background abstract shape */}
            <div className="absolute top-8 right-0 w-[80%] h-[60%] bg-v-red border-4 border-v-ink transform rotate-3 transition-transform hover:rotate-6"></div>
            
            {/* Middle abstract shape */}
            <div className="absolute bottom-8 left-0 w-[70%] h-[50%] bg-v-blue border-4 border-v-ink transform -rotate-3 flex flex-col justify-between p-6 transition-transform hover:-rotate-6">
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-v-bg border-2 border-v-ink rounded-full"></div>
                <div className="w-4 h-4 bg-v-bg border-2 border-v-ink rounded-full"></div>
              </div>
              <div className="text-v-bg font-mono font-bold text-2xl uppercase">{"<Frontend />"}</div>
            </div>
            
            {/* Foreground abstract shape */}
            <div className="absolute top-1/4 left-1/4 w-[80%] h-[40%] bg-v-yellow border-4 border-v-ink flex items-center justify-center p-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <p className="font-mono text-3xl font-bold text-v-ink leading-tight uppercase">
                * Tech_
                <br/>
                * Vocabulary_
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Divider */}
      <div className="w-full border-y-2 border-v-ink mb-12 overflow-hidden bg-v-ink text-v-bg py-4 flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8 items-center text-xl font-bold uppercase tracking-widest">
          <span>UX/UI Design</span> <Sparkles className="w-6 h-6 text-v-yellow" />
          <span>Frontend Development</span> <Sparkles className="w-6 h-6 text-v-red" />
          <span>Generative AI</span> <Sparkles className="w-6 h-6 text-v-blue" />
          <span>Prompt Engineering</span> <Sparkles className="w-6 h-6 text-v-green" />
          <span>Design Systems</span> <Sparkles className="w-6 h-6 text-v-yellow" />
          {/* Repeat for seamless loop */}
          <span>UX/UI Design</span> <Sparkles className="w-6 h-6 text-v-yellow" />
          <span>Frontend Development</span> <Sparkles className="w-6 h-6 text-v-red" />
          <span>Generative AI</span> <Sparkles className="w-6 h-6 text-v-blue" />
          <span>Prompt Engineering</span> <Sparkles className="w-6 h-6 text-v-green" />
          <span>Design Systems</span> <Sparkles className="w-6 h-6 text-v-yellow" />
        </div>
      </div>

      {/* Categories - Brutalist Rows */}
      <div className="flex flex-col border-t-2 border-v-ink">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onNavigate(cat.id)}
            className={`group border-b-2 border-v-ink flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 py-6 md:py-8 cursor-pointer transition-colors ${cat.color} hover:text-v-bg`}
          >
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-2 md:mb-0">
              {cat.title}
            </h2>
            <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/3">
              <span className="text-lg font-medium opacity-80 group-hover:opacity-100">
                {cat.desc}
              </span>
              <ArrowRight className="w-8 h-8 transform group-hover:-rotate-45 transition-transform shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
