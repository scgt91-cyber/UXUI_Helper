import React from 'react';
import { cn } from '@/lib/utils';

interface DesignStyle {
  name: string;
  group: string;
  tipo: string;
  idea: string;
  visual: React.ReactNode;
}

const styles: DesignStyle[] = [
  // ── Superficies y materiales ────────────────────────────────────────────
  {
    name: 'Skeuomorphism',
    group: 'Superficies y Materiales',
    tipo: 'Estilo visual · Historicismo digital',
    idea: 'Tomar prestado el aspecto de las cosas tangibles —papel, cuero, madera— y llevarlo a la pantalla para que la interfaz se entienda por pura intuición física.',
    visual: (
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-amber-800/50 bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 p-5 shadow-[0_6px_16px_rgba(0,0,0,0.3),inset_0_2px_6px_rgba(0,0,0,0.25)]">
          <div className="rounded-md border-2 border-dashed border-amber-900/40 bg-gradient-to-b from-amber-50 to-amber-200 p-4 shadow-[inset_0_2px_5px_rgba(0,0,0,0.25)]">
            <p className="font-bold text-amber-900">Bloc de notas</p>
            <div className="mt-2 h-2 w-3/4 rounded-full bg-amber-400/70"></div>
            <div className="mt-1.5 h-2 w-1/2 rounded-full bg-amber-400/70"></div>
          </div>
        </div>
        <div className="mt-3 inline-block rounded-md border border-slate-500 bg-gradient-to-b from-slate-200 to-slate-400 px-4 py-2 text-sm font-bold text-slate-800 shadow-[0_3px_0_#64748b]">
          Botón bevel
        </div>
      </div>
    ),
  },
  {
    name: 'Neumorphism',
    group: 'Superficies y Materiales',
    tipo: 'Técnica · Estilo visual',
    idea: 'La pieza y su fondo comparten el mismo tono, y un par de sombras contrapuestas —una luminosa y otra oscura— moldean el elemento para que parezca sobresalir o hundirse del lienzo.',
    visual: (
      <div className="flex w-full max-w-md items-center justify-center gap-6 rounded-2xl bg-[#e0e5ec] p-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#e0e5ec] text-2xl shadow-[9px_9px_18px_#b8bdc7,-9px_-9px_18px_#ffffff]">
          <svg className="h-8 w-8 text-[#6a7a8f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" /></svg>
        </div>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e0e5ec] text-2xl shadow-[inset_8px_8px_16px_#b8bdc7,inset_-8px_-8px_16px_#ffffff]">
          <svg className="h-8 w-8 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.4 6.4l-.7-.7M6.3 6.3l-.7-.7m12.1 0l-.7.7M6.3 17.7l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        </div>
      </div>
    ),
  },
  {
    name: 'Claymorphism',
    group: 'Superficies y Materiales',
    tipo: 'Estilo visual',
    idea: 'Piezas que parecen modeladas a mano: siluetas blandas, tonos dulces y un resplandor cenital que acaricia el borde superior de cada figura.',
    visual: (
      <div className="flex w-full max-w-md items-center justify-center bg-gradient-to-br from-v-blue/20 to-v-green/20 p-8">
        <div className="relative h-36 w-36 rounded-[2rem] bg-gradient-to-b from-v-blue to-[#0077c0] shadow-[0_18px_30px_-8px_rgba(0,100,180,0.6)]">
          <div className="absolute left-6 top-4 h-10 w-24 rounded-full bg-white/40 blur-[2px]"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white/90">●</div>
          <div className="absolute inset-x-4 bottom-5 h-2 w-14 rounded-full bg-white/30"></div>
        </div>
      </div>
    ),
  },
  {
    name: 'Glassmorphism',
    group: 'Superficies y Materiales',
    tipo: 'Estilo visual · Técnica de material',
    idea: 'Vidrio empañado aplicado a la interfaz: capas semiopacas que dejan entrever lo que tienen detrás, todo difuminado y rematado con un contorno casi blanco.',
    visual: (
      <div className="relative h-40 w-full max-w-md overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-[conic-gradient(at_40%_30%,#f7a11a,#009fe3,#8db600,#e6261f,#f7a11a)]"></div>
        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 rounded-xl border border-white/50 bg-white/30 px-5 py-4 shadow-lg backdrop-blur-md">
          <p className="text-sm font-bold text-white drop-shadow-sm">Panel de cristal</p>
          <p className="text-xs text-white/90">backdrop-blur sobre el degradado</p>
        </div>
      </div>
    ),
  },
  {
    name: 'Liquid Glass',
    group: 'Superficies y Materiales',
    tipo: 'Estilo visual',
    idea: 'El cristal llevado a su versión más fluida: contornos que se derraman, destellos que resbalan por la superficie y una sensación de profundidad apacible.',
    visual: (
      <div className="relative h-44 w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-v-blue via-v-ink to-v-red">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ffffff,transparent_40%)] opacity-50"></div>
        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/15 px-6 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          <div className="mb-2 h-2 w-1/3 rounded-full bg-white/70"></div>
          <div className="h-1.5 w-2/3 rounded-full bg-white/40"></div>
        </div>
      </div>
    ),
  },

  // ── Retro y colorido ────────────────────────────────────────────────────
  {
    name: 'Windows Aero',
    group: 'Retro y Colorido',
    tipo: 'Estilo visual',
    idea: 'Las ventanas de Windows se vuelven cristalinas: paneles que translucen el escritorio, reflejos que se deslizan y transiciones que se sienten líquidas.',
    visual: (
      <div className="w-full max-w-md overflow-hidden rounded-md border border-white/60 bg-white/40 shadow-2xl">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#2b5797] via-[#4a8fe0] to-[#2b5797] px-3 py-1.5">
          <span className="text-xs font-bold text-white">Ventana Vista</span>
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 bg-white/80"></span>
            <span className="h-2.5 w-2.5 bg-white/80"></span>
            <span className="h-2.5 w-2.5 bg-[#c42b1c]"></span>
          </div>
        </div>
        <div className="h-28 bg-gradient-to-br from-[#dce8f7]/80 to-[#b8cfe6]/80 backdrop-blur-sm"></div>
      </div>
    ),
  },
  {
    name: 'Aqua',
    group: 'Retro y Colorido',
    tipo: 'Estilo visual',
    idea: 'El mundo submarino de Apple en los 2000: superficies de gelatina, destellos cóncavos y una paleta de dulces tan brillante que parece húmeda.',
    visual: (
      <div className="flex w-full max-w-md items-center justify-center bg-gradient-to-b from-[#1e5cb8] to-[#a7c9ee] p-8">
        <div className="h-24 w-24 rounded-full bg-[radial-gradient(circle_at_30%_25%,#ffffff,#7fc0ff_45%,#1c5cb8_90%)] shadow-[0_10px_25px_rgba(0,0,0,0.4)]"></div>
        <div className="ml-5 h-12 w-12 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#4caeff_50%,#0e4c9e_95%)] shadow-[0_8px_18px_rgba(0,0,0,0.35)]"></div>
      </div>
    ),
  },
  {
    name: 'Y2K',
    group: 'Retro y Colorido',
    tipo: 'Movimiento estético · Cultura visual',
    idea: 'La estética de un futuro imaginado en el 2000: superficies cromadas, reflejos metálicos y neones suaves que gritan "bienvenido al nuevo milenio".',
    visual: (
      <div className="w-full max-w-md bg-[radial-gradient(circle_at_50%_0%,#ffd1e8,#ff6ec7_50%,#6a0dad_110%)] p-8 text-center">
        <div className="inline-block bg-gradient-to-r from-[#b9f2ff] via-[#ffffff] to-[#ff9be0] bg-clip-text text-5xl font-black uppercase tracking-tighter text-transparent drop-shadow-[0_2px_0_rgba(0,0,0,0.2)]">
          Y2K
        </div>
        <div className="mx-auto mt-5 h-8 w-28 rounded-full border border-white bg-gradient-to-r from-[#b9f2ff] to-[#ff9be0] shadow-lg"></div>
      </div>
    ),
  },
  {
    name: 'Frutiger Aero',
    group: 'Retro y Colorido',
    tipo: 'Estilo visual',
    idea: 'Un remanso de calma tecnológica: aguas transparentes, burbujas flotando y vegetación que asoma tras superficies de cristal pulido.',
    visual: (
      <div className="relative h-40 w-full max-w-md overflow-hidden rounded-lg bg-gradient-to-b from-[#7fd8ff] to-[#1e90a0]">
        <div className="absolute inset-0 flex items-center justify-center gap-3">
          <span className="h-6 w-6 rounded-full border-2 border-white/70 bg-white/30"></span>
          <span className="h-14 w-14 rounded-full border-2 border-white/70 bg-white/10"></span>
          <span className="h-10 w-10 rounded-full border-2 border-white/70 bg-white/20"></span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-[radial-gradient(circle_at_30%_0%,#ffffff44,transparent_60%)]"></div>
        <div className="absolute left-4 top-4 h-2 w-16 rounded-full bg-white/50"></div>
      </div>
    ),
  },

  // ── Plano y sobrio ───────────────────────────────────────────────────────
  {
    name: 'Flat Design',
    group: 'Plano y Sobrio',
    tipo: 'Estilo visual',
    idea: 'Cero fingimiento de volumen: superficies sólidas, siluetas sencillas y texto despejado, sin gradientes ni sombras que estorben.',
    visual: (
      <div className="w-full max-w-md border border-gray-200 bg-white p-8">
        <div className="grid grid-cols-3 gap-3">
          <div className="h-20 rounded-lg bg-v-red"></div>
          <div className="h-20 rounded-lg bg-v-yellow"></div>
          <div className="h-20 rounded-lg bg-v-blue"></div>
        </div>
        <div className="mt-4 h-3 w-1/2 rounded bg-gray-800"></div>
        <div className="mt-2 h-3 w-3/4 rounded bg-gray-300"></div>
      </div>
    ),
  },
  {
    name: 'Minimalism',
    group: 'Plano y Sobrio',
    tipo: 'Filosofía de diseño',
    idea: 'Lo imprescindible y nada más: el vacío se vuelve protagonista, los tonos se apagan y cada elemento debe ganarse su sitio.',
    visual: (
      <div className="flex h-44 w-full max-w-md flex-col items-center justify-center bg-white p-10 text-center">
        <div className="h-px w-10 bg-gray-900"></div>
        <div className="mt-6 text-xs uppercase tracking-[0.4em] text-gray-500">Less is more</div>
        <div className="mt-2 text-[10px] text-gray-400">un solo elemento visual</div>
      </div>
    ),
  },

  // ── Brutalismo ───────────────────────────────────────────────────────────
  {
    name: 'Web Brutalism',
    group: 'Brutalismo',
    tipo: 'Estilo web · Reacción',
    idea: 'La página tal como nació, sin pulido ni concesiones: contenido directo, tipografía por defecto y una crudeza que no pide disculpas.',
    visual: (
      <div className="w-full max-w-md bg-white p-5 font-mono text-xs">
        <p className="text-[#0000cc] underline">Welcome to my site!!</p>
        <p className="mt-2 bg-lime-300 font-bold text-black">100% RAW HTML</p>
        <div className="mt-3 border-2 border-black bg-[#ffff00] p-2 text-[10px]">No css, no mercy.</div>
        <p className="mt-2 text-[10px]">visits: <span className="text-[#ff0000]">0000123</span></p>
      </div>
    ),
  },
  {
    name: 'Neobrutalism',
    group: 'Brutalismo',
    tipo: 'Estilo visual',
    idea: 'Un brutalismo más civilizado pero igual de contundente: trazos negros rotundos, sombras que no se difuminan y color a raudales.',
    visual: (
      <div className="flex w-full max-w-md flex-wrap items-center gap-4 bg-[#fdf6e3] p-8">
        <div className="rounded-xl border-4 border-v-ink bg-v-yellow px-6 py-4 text-2xl font-black uppercase tracking-tight shadow-[6px_6px_0_#111111]">
          ¡Sí!
        </div>
        <div className="flex items-center gap-3 rounded-xl border-4 border-v-ink bg-white px-4 py-3 shadow-[6px_6px_0_#111111]">
          <div className="h-8 w-8 rounded-full border-2 border-v-ink bg-v-red"></div>
          <div className="text-sm font-bold">Perfil</div>
        </div>
        <div className="relative h-24 w-28 overflow-hidden rounded-xl border-4 border-v-ink bg-v-blue shadow-[6px_6px_0_#111111]">
          <div className="absolute -right-3 -top-3 h-10 w-10 rounded-full border-4 border-v-ink bg-v-red"></div>
        </div>
      </div>
    ),
  },

  // ── Web clásica ──────────────────────────────────────────────────────────
  {
    name: 'Vernacular Web',
    group: 'Web Clásica',
    tipo: 'Estilo web · Cultura',
    idea: 'La internet casera de los 90, construida por gente que aprendía sobre la marcha: tablas, textos en movimiento y enlaces que eran promesas.',
    visual: (
      <div className="w-full max-w-md border border-[#808080] bg-[#c0c0c0] p-4 font-mono text-xs">
        <p className="border border-[#808080] bg-[#ffffcc] px-2 py-1">Welcome to my homepage!</p>
        <div className="mt-2 overflow-hidden whitespace-nowrap bg-[#000080] py-1 text-white">
          <div className="animate-marquee inline-flex gap-8">
            <span>NEW · GUESTBOOK · LINKS · MAIL ME · NEW · GUESTBOOK · LINKS · MAIL ME</span>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1 text-[#0000ff] underline">
          <span>my cool links</span>
          <span>cooler links</span>
        </div>
        <div className="mt-2 border-2 border-dotted border-[#808080] bg-[#ffffe0] px-2 py-1 text-center font-bold">
          Under Construction
        </div>
      </div>
    ),
  },
];

const groups = ['Superficies y Materiales', 'Retro y Colorido', 'Plano y Sobrio', 'Brutalismo', 'Web Clásica'];

const groupColors: Record<string, string> = {
  'Superficies y Materiales': 'text-v-ink',
  'Retro y Colorido': 'text-v-red',
  'Plano y Sobrio': 'text-v-blue',
  'Brutalismo': 'text-v-yellow',
  'Web Clásica': 'text-v-green',
};

const slugify = (name: string) =>
  name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function StylesPage() {
  return (
    <div className="w-full animate-in fade-in duration-500 pb-20">
      <div className="mb-12 border-b-4 border-v-ink pb-6 px-4 md:px-8 pt-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none mb-4">
          Estilos de Diseño
        </h1>
        <p className="text-lg md:text-xl font-medium max-w-3xl">
          Movimientos, técnicas y tendencias visuales explicados en pocas líneas y mostrados con un ejemplo visual. Conócelos de un vistazo para no volver a decir "hazlo bonito" sin propiedad.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 px-4 md:px-8 mb-4">
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => document.getElementById(slugify(group))?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="border-2 border-v-ink px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors bg-v-bg hover:bg-v-ink hover:text-v-bg"
          >
            {group}
          </button>
        ))}
      </div>

      <div className="flex flex-col px-4 md:px-8">
        {groups.map((group) => {
          const items = styles.filter((s) => s.group === group);
          const accent = groupColors[group];
          return (
            <div key={group} id={slugify(group)} className="my-8 p-6 md:p-10 border-4 border-v-ink bg-v-ink/5 relative scroll-mt-28">
              <div className="absolute -top-4 left-6 md:left-10 bg-v-ink text-white px-4 py-1 font-bold uppercase tracking-widest text-sm">
                {group}
              </div>
              <div className="flex flex-col gap-10 pt-4">
                {items.map((style, i) => (
                  <div
                    key={style.name}
                    className={cn(
                      "grid grid-cols-1 lg:grid-cols-12 gap-6",
                      i !== items.length - 1 ? "pb-10 border-b-2 border-v-ink/10" : ""
                    )}
                  >
                    <div className="lg:col-span-4">
                      <h2 className="text-xl md:text-2xl font-bold tracking-tighter uppercase sticky top-24">
                        {style.name}
                      </h2>
                      <p className={cn("mt-2 text-xs font-bold uppercase tracking-widest", accent)}>
                        {style.tipo}
                      </p>
                    </div>
                    <div className="lg:col-span-8">
                      <p className="text-lg font-medium leading-relaxed">
                        {style.idea}
                      </p>

                      <div className="mt-6">{style.visual}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
