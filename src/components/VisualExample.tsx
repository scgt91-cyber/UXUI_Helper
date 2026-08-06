import React from 'react';

interface VisualExampleProps {
  term: string;
}

export function VisualExample({ term }: VisualExampleProps) {
  const trafficLights = (
    <div className="flex gap-1.5">
      <span className="w-3 h-3 rounded-full bg-[#FF5F57]"></span>
      <span className="w-3 h-3 rounded-full bg-[#FEBC2E]"></span>
      <span className="w-3 h-3 rounded-full bg-[#28C840]"></span>
    </div>
  );

  const columnView = (
    <div className="flex w-full max-w-md h-36 border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="w-1/3 border-r border-gray-200 p-2 flex flex-col gap-1.5">
        <span className="text-xs text-gray-600 px-1.5 py-1 bg-gray-100 rounded">Escritorio</span>
        <span className="text-xs text-gray-600 px-1.5 py-1">Documentos ›</span>
        <span className="text-xs text-gray-600 px-1.5 py-1">Descargas ›</span>
      </div>
      <div className="w-1/3 border-r border-gray-200 p-2 flex flex-col gap-1.5">
        <span className="text-xs text-gray-600 px-1.5 py-1">Proyectos</span>
        <span className="text-xs text-gray-600 px-1.5 py-1 bg-gray-100 rounded">Fotos ›</span>
        <span className="text-xs text-gray-600 px-1.5 py-1">Notas</span>
      </div>
      <div className="w-1/3 p-2 flex flex-col gap-1.5">
        <span className="text-xs text-gray-600 px-1.5 py-1 bg-gray-100 rounded">Vacaciones</span>
        <span className="text-xs text-gray-600 px-1.5 py-1">Familia</span>
      </div>
    </div>
  );

  const outlineView = (
    <div className="w-full max-w-[220px] bg-white border border-gray-200 rounded-lg p-2.5 text-sm">
      <div className="flex items-center gap-1.5 text-gray-700 font-medium py-0.5"><span className="text-gray-400 text-[10px]">▼</span>Usuarios</div>
      <div className="flex items-center gap-1.5 text-gray-500 pl-4 py-0.5"><span className="text-gray-300 text-[10px]">▼</span>Documentos</div>
      <div className="flex items-center gap-1.5 pl-8 text-gray-500 py-0.5">informe.pdf</div>
      <div className="flex items-center gap-1.5 pl-8 text-gray-500 py-0.5">presupuesto.xlsx</div>
      <div className="flex items-center gap-1.5 pl-4 text-gray-500 py-0.5"><span className="text-gray-300 text-[10px]">▶</span>Descargas</div>
    </div>
  );

  const vibrancy = (
    <div className="relative w-full max-w-md h-28 rounded-lg overflow-hidden border border-gray-200">
      <div className="absolute inset-0 flex items-center justify-center gap-2">
        <span className="w-16 h-16 bg-v-blue/70"></span>
        <span className="w-16 h-16 bg-v-red/70"></span>
        <span className="w-16 h-16 bg-v-yellow/70"></span>
      </div>
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-md border border-white/60 rounded-lg px-4 py-3 shadow-lg">
        <p className="text-sm font-bold text-v-ink">Sidebar con vibrancy</p>
        <p className="text-xs text-gray-600">El material difumina lo que hay detrás.</p>
      </div>
    </div>
  );

  const panel = (
    <div className="relative w-full max-w-md h-36 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
      <div className="absolute left-4 top-4 w-40 border border-gray-300 rounded-lg bg-white shadow-xl">
        <div className="bg-gray-100 px-3 py-1.5 flex items-center justify-between rounded-t-lg border-b border-gray-200">
          <span className="text-[10px] font-bold text-gray-500">Paleta de colores</span>
        </div>
        <div className="p-3 flex flex-col gap-2">
          <div className="flex gap-1.5">
            <span className="w-5 h-5 rounded-full bg-v-red"></span>
            <span className="w-5 h-5 rounded-full bg-v-yellow"></span>
            <span className="w-5 h-5 rounded-full bg-v-blue"></span>
            <span className="w-5 h-5 rounded-full bg-v-green"></span>
            <span className="w-5 h-5 rounded-full bg-v-ink"></span>
          </div>
          <div className="h-4 bg-gray-100 rounded"></div>
        </div>
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-32 border border-gray-300 rounded-lg bg-white shadow-lg">
        <div className="bg-gray-100 px-3 py-1.5 rounded-t-lg border-b border-gray-200 text-[10px] font-bold text-gray-500">Panel flotante</div>
        <div className="p-3 h-8"></div>
      </div>
    </div>
  );

  const dockBadge = (
    <div className="relative inline-flex">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-200 to-gray-400 border border-gray-300 shadow-md"></div>
      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-v-red text-white text-[10px] font-bold flex items-center justify-center">3</span>
    </div>
  );

  const examples: Record<string, React.ReactNode> = {
    'Container / Wrapper': (
      <div className="w-full max-w-md bg-gray-100 p-4 rounded-md border-2 border-dashed border-gray-400 flex items-center justify-center">
        <div className="w-3/4 h-16 bg-white border border-gray-200 shadow-sm flex items-center justify-center text-xs text-gray-400 font-mono">
          max-w-7xl mx-auto
        </div>
      </div>
    ),
    'Card': (
      <div className="border border-gray-200 rounded-xl p-5 shadow-sm max-w-sm w-full bg-white">
        <div className="h-32 w-full bg-gray-100 rounded-lg mb-4"></div>
        <div className="h-5 w-2/3 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-full bg-gray-100 rounded mb-1"></div>
        <div className="h-3 w-4/5 bg-gray-100 rounded mb-4"></div>
        <div className="h-8 w-full bg-v-ink rounded-md"></div>
      </div>
    ),
    'Hero Section': (
      <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-md p-8 text-center flex flex-col items-center justify-center">
        <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-2 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-2 w-5/6 bg-gray-200 rounded mb-6"></div>
        <div className="flex space-x-3">
          <div className="h-10 w-28 bg-v-ink rounded-md"></div>
          <div className="h-10 w-28 border-2 border-gray-300 rounded-md"></div>
        </div>
      </div>
    ),
    'Navbar / Header': (
      <div className="w-full max-w-md border border-gray-200 rounded-md bg-white flex items-center justify-between px-4 py-3 shadow-sm">
        <div className="font-bold text-sm tracking-widest">LOGO</div>
        <div className="hidden sm:flex space-x-4 text-xs font-medium text-gray-500">
          <span className="text-v-ink">Home</span>
          <span>Products</span>
          <span>About</span>
        </div>
        <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
      </div>
    ),
    'Divider vs. Separator vs. Rule': (
      <div className="w-full max-w-md flex flex-col items-center space-y-4">
        <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
        <div className="w-full border-t border-gray-300"></div>
        <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
      </div>
    ),
    'Input Field / Textarea': (
      <div className="flex flex-col space-y-1.5 w-full max-w-xs">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
        <input 
          type="text" 
          disabled 
          placeholder="you@example.com" 
          className="border-2 border-gray-300 rounded-md px-3 py-2 text-sm bg-white placeholder:text-gray-400" 
        />
      </div>
    ),
    'Modal / Dialog': (
      <div className="relative h-48 w-full max-w-md bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
        <div className="absolute inset-0 bg-v-ink/20 backdrop-blur-sm"></div>
        <div className="relative bg-white p-5 rounded-xl shadow-xl w-3/4 border border-gray-100">
          <div className="h-4 w-1/2 bg-gray-800 rounded mb-3"></div>
          <div className="h-2 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-2 w-4/5 bg-gray-200 rounded mb-6"></div>
          <div className="flex justify-end space-x-2">
            <div className="h-8 w-16 bg-gray-100 rounded-md"></div>
            <div className="h-8 w-20 bg-v-blue rounded-md"></div>
          </div>
        </div>
      </div>
    ),
    'Tooltip': (
      <div className="relative inline-flex flex-col items-center mt-8">
        <div className="absolute bottom-full mb-2 px-3 py-1.5 bg-v-ink text-white text-xs font-medium rounded shadow-lg whitespace-nowrap">
          Información adicional aquí
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-v-ink"></div>
        </div>
        <span className="underline decoration-dashed decoration-gray-400 underline-offset-4 cursor-help font-medium text-gray-700">
          Pasa el ratón por aquí
        </span>
      </div>
    ),
    'Popover': (
      <div className="relative inline-flex flex-col items-center mt-24">
        <div className="absolute bottom-full mb-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-4">
          <h4 className="font-bold text-sm mb-2">Configuración</h4>
          <div className="space-y-2">
            <div className="h-2 w-full bg-gray-100 rounded"></div>
            <div className="h-2 w-4/5 bg-gray-100 rounded"></div>
          </div>
          <div className="mt-4 h-8 w-full bg-gray-900 rounded-md"></div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white drop-shadow-sm"></div>
        </div>
        <div className="bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
          Abrir Popover
        </div>
      </div>
    ),
    'Toast / Snackbar': (
      <div className="bg-v-ink text-white px-4 py-3 rounded-lg shadow-2xl flex items-center justify-between w-full max-w-xs border border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 rounded-full bg-v-green flex items-center justify-center">
            <svg className="w-3 h-3 text-v-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-sm font-medium">Elemento guardado</span>
        </div>
        <span className="text-gray-400 text-xs font-bold cursor-pointer hover:text-white">✕</span>
      </div>
    ),
    'Accordion': (
      <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 w-full max-w-sm bg-white shadow-sm">
        <div className="p-4 flex justify-between items-center font-medium text-sm cursor-pointer">
          <span>¿Cómo funciona esto?</span>
          <span className="text-gray-400">−</span>
        </div>
        <div className="p-4 text-sm text-gray-500 bg-gray-50/50 leading-relaxed">
          El contenido detallado se expande aquí abajo. Puedes poner texto, imágenes o formularios.
        </div>
        <div className="p-4 flex justify-between items-center font-medium text-sm cursor-pointer">
          <span>Opciones avanzadas</span>
          <span className="text-gray-400">+</span>
        </div>
      </div>
    ),
    'Breadcrumbs': (
      <nav className="text-sm font-medium flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-md border border-gray-200">
        <span className="text-gray-400 hover:text-gray-600 cursor-pointer">Inicio</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-400 hover:text-gray-600 cursor-pointer">Categoría</span>
        <span className="text-gray-300">/</span>
        <span className="text-v-ink">Producto Actual</span>
      </nav>
    ),
    'Badge / Chip': (
      <div className="flex space-x-3">
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-v-blue/10 text-v-blue border border-v-blue/20">
          Nuevo
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-v-green/10 text-v-green border border-v-green/20">
          Completado
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-v-red/10 text-v-red border border-v-red/20">
          Error
        </span>
      </div>
    ),
    'Skeleton Loader': (
      <div className="animate-pulse flex space-x-4 w-full max-w-sm p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
        <div className="rounded-full bg-gray-200 h-12 w-12 shrink-0"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    ),
    'Toggle Switch': (
      <div className="flex items-center space-x-3">
        <div className="w-12 h-7 bg-v-green rounded-full relative shadow-inner cursor-pointer transition-colors">
          <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
        </div>
        <span className="text-sm font-medium text-gray-700">Activado</span>
      </div>
    ),
    'Stepper': (
      <div className="flex items-center w-full max-w-sm">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-v-blue text-white flex items-center justify-center text-sm font-bold shadow-sm">1</div>
          <span className="text-[10px] font-bold uppercase mt-2 text-v-blue">Datos</span>
        </div>
        <div className="flex-1 h-0.5 bg-v-blue mx-2 -mt-5"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-v-blue text-v-blue bg-white flex items-center justify-center text-sm font-bold shadow-sm">2</div>
          <span className="text-[10px] font-bold uppercase mt-2 text-v-blue">Pago</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-200 mx-2 -mt-5"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 text-gray-400 bg-white flex items-center justify-center text-sm font-bold">3</div>
          <span className="text-[10px] font-bold uppercase mt-2 text-gray-400">Fin</span>
        </div>
      </div>
    ),
    'Tabs': (
      <div className="w-full max-w-sm">
        <div className="border-b border-gray-200 flex space-x-6 px-2">
          <div className="py-3 border-b-2 border-v-ink text-v-ink font-bold text-sm cursor-pointer">
            General
          </div>
          <div className="py-3 text-gray-500 font-medium text-sm hover:text-gray-700 cursor-pointer">
            Seguridad
          </div>
          <div className="py-3 text-gray-500 font-medium text-sm hover:text-gray-700 cursor-pointer">
            Avanzado
          </div>
        </div>
        <div className="p-4 bg-gray-50/50 rounded-b-lg border border-t-0 border-gray-200">
          <div className="h-2 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
        </div>
      </div>
    ),
    'Dropdown Menu': (
      <div className="relative inline-block mt-2">
        <div className="border border-gray-300 bg-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-between w-40 shadow-sm cursor-pointer">
          <span>Opciones</span>
          <span className="text-xs text-gray-500">▼</span>
        </div>
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg flex flex-col overflow-hidden z-10">
          <span className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer font-medium">Editar</span>
          <span className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer font-medium">Duplicar</span>
          <span className="px-4 py-2 text-sm text-v-red hover:bg-red-50 border-t border-gray-100 cursor-pointer font-medium">Eliminar</span>
        </div>
      </div>
    ),
    'Pagination': (
      <div className="flex items-center space-x-1 w-full max-w-xs">
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 text-xs font-bold">‹</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 text-xs font-bold">1</button>
        <button className="w-8 h-8 flex items-center justify-center bg-v-ink text-white rounded-md text-xs font-bold">2</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 text-xs font-bold">3</button>
        <span className="px-1 text-gray-400 text-xs font-medium">…</span>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 text-xs font-bold">8</button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 text-xs font-bold">›</button>
      </div>
    ),
    'Command Palette': (
      <div className="w-full max-w-sm border border-gray-200 rounded-xl shadow-xl bg-white overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"/></svg>
          <span className="text-sm text-gray-400 font-medium">Buscar comandos…</span>
          <span className="ml-auto px-2 py-0.5 border border-gray-200 rounded text-[10px] font-bold text-gray-400">ESC</span>
        </div>
        <div className="px-2 py-2 flex flex-col gap-1">
          <div className="px-3 py-2 bg-v-blue/10 text-v-blue text-sm font-medium rounded-md flex items-center justify-between">
            <span>Cambiar a modo oscuro</span>
            <span className="text-[10px] font-bold text-gray-400">↵</span>
          </div>
          <div className="px-3 py-2 text-sm text-gray-600 flex items-center justify-between"><span>Nuevo proyecto</span></div>
          <div className="px-3 py-2 text-sm text-gray-600 flex items-center justify-between"><span>Ir a Ajustes</span></div>
        </div>
      </div>
    ),
    'Combobox (Autocomplete / Typeahead)': (
      <div className="w-full max-w-xs relative">
        <input type="text" disabled placeholder="Escribe una ciudad…" className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm bg-white placeholder:text-gray-400" />
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-10">
          <div className="px-3 py-2 text-sm bg-v-blue/10 text-v-blue font-medium">Madrid</div>
          <div className="px-3 py-2 text-sm text-gray-700">Málaga</div>
          <div className="px-3 py-2 text-sm text-gray-700">Mérida</div>
          <div className="px-3 py-2 text-sm text-gray-700">Murcia</div>
        </div>
      </div>
    ),
    'Date Picker': (
      <div className="w-full max-w-[240px] bg-white border border-gray-200 rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-300 text-sm font-bold cursor-pointer">‹</span>
          <span className="text-sm font-bold">Agosto 2026</span>
          <span className="text-gray-300 text-sm font-bold cursor-pointer">›</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-gray-400 mb-1">
          <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-600">
          <span>1</span><span>2</span><span>3</span><span className="w-7 h-7 mx-auto rounded-full bg-v-blue text-white font-bold flex items-center justify-center">4</span><span>5</span><span>6</span><span>7</span>
          <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span>
          <span className="text-gray-300">15</span><span className="text-gray-300">16</span><span className="text-gray-300">17</span><span className="text-gray-300">18</span><span className="text-gray-300">19</span><span className="text-gray-300">20</span><span className="text-gray-300">21</span>
        </div>
      </div>
    ),
    'Multi-select': (
      <div className="w-full max-w-xs">
        <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md px-3 py-2 bg-white">
          <span className="px-2 py-0.5 bg-v-blue/10 text-v-blue text-xs font-bold rounded-full border border-v-blue/20 flex items-center gap-1">React <span className="cursor-pointer">×</span></span>
          <span className="px-2 py-0.5 bg-v-blue/10 text-v-blue text-xs font-bold rounded-full border border-v-blue/20 flex items-center gap-1">Vue <span className="cursor-pointer">×</span></span>
          <input type="text" disabled placeholder="Añadir…" className="text-sm flex-1 min-w-[60px] bg-transparent outline-none placeholder:text-gray-400" />
        </div>
        <div className="mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1">
          <div className="px-3 py-1.5 text-sm text-gray-400 flex justify-between"><span>Svelte</span><span className="text-v-blue font-bold">✓</span></div>
          <div className="px-3 py-1.5 text-sm text-gray-600">Angular</div>
          <div className="px-3 py-1.5 text-sm text-gray-600">Solid</div>
        </div>
      </div>
    ),
    'Toggle Group (Segmented Control)': (
      <div className="inline-flex border border-gray-300 rounded-md overflow-hidden bg-gray-100">
        <span className="px-4 py-2 bg-white text-sm font-bold shadow-sm">Lista</span>
        <span className="px-4 py-2 text-sm font-medium text-gray-600">Cuadrícula</span>
        <span className="px-4 py-2 text-sm font-medium text-gray-600">Tabla</span>
      </div>
    ),
    'Bento Grid': (
      <div className="grid grid-cols-4 grid-rows-2 gap-3 w-full max-w-md h-48">
        <div className="col-span-2 row-span-2 bg-v-blue border-2 border-v-ink rounded-lg flex items-center justify-center text-white text-sm font-bold">2×2</div>
        <div className="col-span-2 bg-v-yellow border-2 border-v-ink rounded-lg flex items-center justify-center text-v-ink text-sm font-bold">2×1</div>
        <div className="col-span-1 bg-v-red border-2 border-v-ink rounded-lg flex items-center justify-center text-white text-sm font-bold">1×1</div>
        <div className="col-span-1 bg-v-green border-2 border-v-ink rounded-lg flex items-center justify-center text-v-ink text-sm font-bold">1×1</div>
      </div>
    ),
    'Masonry Layout': (
      <div className="flex gap-3 w-full max-w-md items-start">
        <div className="flex-1 flex flex-col gap-3">
          <div className="h-16 bg-gray-200 rounded-lg border border-gray-300"></div>
          <div className="h-24 bg-gray-200 rounded-lg border border-gray-300"></div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="h-28 bg-gray-200 rounded-lg border border-gray-300"></div>
          <div className="h-14 bg-gray-200 rounded-lg border border-gray-300"></div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="h-12 bg-gray-200 rounded-lg border border-gray-300"></div>
          <div className="h-20 bg-gray-200 rounded-lg border border-gray-300"></div>
        </div>
      </div>
    ),
    'Lightbox': (
      <div className="relative h-48 w-full max-w-md bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
        <div className="absolute inset-0 bg-v-ink/70 backdrop-blur-sm"></div>
        <div className="relative w-40 h-28 bg-gray-300 border-2 border-white shadow-xl rounded-md flex items-center justify-center">
          <span className="text-v-ink font-bold text-xs">Imagen</span>
        </div>
        <span className="absolute top-3 right-4 text-white text-sm font-bold cursor-pointer">✕</span>
        <span className="absolute left-3 text-white/80 text-xl font-bold cursor-pointer">‹</span>
        <span className="absolute right-12 text-white/80 text-xl font-bold cursor-pointer">›</span>
      </div>
    ),
    'Hover Card': (
      <div className="relative flex flex-col items-start">
        <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-4 w-56 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-v-blue flex items-center justify-center text-white text-xs font-bold">MA</div>
            <div>
              <div className="text-sm font-bold">María Álvarez</div>
              <div className="text-xs text-gray-400">@maria</div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">Senior Product Designer en Acme. 12 años de experiencia en Design Systems.</p>
        </div>
        <span className="text-sm font-medium text-v-blue underline decoration-dashed underline-offset-4 cursor-pointer">@maria</span>
      </div>
    ),
    'Alert': (
      <div className="w-full max-w-sm border-l-4 border-v-red bg-red-50 px-4 py-3 rounded-r-md">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-v-red shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 3.86l-8.2 14.28A2 2 0 003.8 21h16.4a2 2 0 001.7-2.86L13.7 3.86a2 2 0 00-3.4 0z"/></svg>
          <div>
            <p className="text-sm font-bold text-v-red">No se pudo guardar</p>
            <p className="text-xs text-gray-600 mt-0.5">Comprueba tu conexión e inténtalo de nuevo.</p>
          </div>
        </div>
      </div>
    ),
    'Empty State': (
      <div className="flex flex-col items-center text-center w-full max-w-xs py-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0H4"/></svg>
        </div>
        <p className="text-base font-bold">Aún no hay proyectos</p>
        <p className="text-sm text-gray-500 mt-1 mb-4">Crea tu primer proyecto para empezar a organizar tu trabajo.</p>
        <div className="px-4 py-2 bg-v-ink text-white text-sm font-bold rounded-md">Crear proyecto</div>
      </div>
    ),
    'Progress Ring vs. Spinner vs. Progress Bar': (
      <div className="flex flex-col gap-6 w-full max-w-sm items-center">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-v-blue animate-spin"></div>
            <span className="text-[10px] font-bold uppercase text-gray-400">Spinner</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                <circle cx="24" cy="24" r="20" fill="none" stroke="#009FE3" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="37.7" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">75%</span>
            </div>
            <span className="text-[10px] font-bold uppercase text-gray-400">Ring</span>
          </div>
        </div>
        <div className="w-full">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-v-blue rounded-full"></div>
          </div>
          <span className="text-[10px] font-bold uppercase text-gray-400 mt-1.5 block text-center">Progress Bar</span>
        </div>
      </div>
    ),
    'Carousel': (
      <div className="w-full max-w-md">
        <div className="flex gap-3 overflow-hidden">
          <div className="w-40 h-24 bg-v-blue/20 border-2 border-v-blue rounded-lg flex items-center justify-center text-v-blue text-sm font-bold shrink-0">Slide 1</div>
          <div className="w-40 h-24 bg-v-yellow/20 border-2 border-v-yellow rounded-lg flex items-center justify-center text-v-ink text-sm font-bold shrink-0">Slide 2</div>
          <div className="w-40 h-24 bg-v-green/20 border-2 border-v-green rounded-lg flex items-center justify-center text-v-ink text-sm font-bold shrink-0">Slide 3</div>
        </div>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="text-gray-400 text-sm font-bold cursor-pointer">‹</span>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-v-ink"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          </div>
          <span className="text-gray-400 text-sm font-bold cursor-pointer">›</span>
        </div>
      </div>
    ),
    'Avatar Group': (
      <div className="flex -space-x-3">
        <div className="w-10 h-10 rounded-full bg-v-red border-2 border-v-bg flex items-center justify-center text-white text-xs font-bold">JA</div>
        <div className="w-10 h-10 rounded-full bg-v-blue border-2 border-v-bg flex items-center justify-center text-white text-xs font-bold">MR</div>
        <div className="w-10 h-10 rounded-full bg-v-green border-2 border-v-bg flex items-center justify-center text-white text-xs font-bold">LP</div>
        <div className="w-10 h-10 rounded-full bg-v-ink border-2 border-v-bg flex items-center justify-center text-v-bg text-xs font-bold">+3</div>
      </div>
    ),
    'Marquee': (
      <div className="w-full max-w-md overflow-hidden border-2 border-v-ink bg-white py-3">
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          <span className="text-sm font-bold uppercase tracking-widest">React</span>
          <span className="text-sm font-bold uppercase tracking-widest text-v-blue">Vue</span>
          <span className="text-sm font-bold uppercase tracking-widest">Angular</span>
          <span className="text-sm font-bold uppercase tracking-widest text-v-red">Svelte</span>
          <span className="text-sm font-bold uppercase tracking-widest">React</span>
          <span className="text-sm font-bold uppercase tracking-widest text-v-blue">Vue</span>
          <span className="text-sm font-bold uppercase tracking-widest">Angular</span>
          <span className="text-sm font-bold uppercase tracking-widest text-v-red">Svelte</span>
        </div>
      </div>
    ),
    'Steps': (
      <div className="flex items-center w-full max-w-sm">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-v-green text-white flex items-center justify-center text-sm font-bold">✓</div>
          <span className="text-[10px] font-bold uppercase mt-2 text-v-green">Datos</span>
        </div>
        <div className="flex-1 h-0.5 bg-v-green mx-2 -mt-5"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-v-blue text-white flex items-center justify-center text-sm font-bold">2</div>
          <span className="text-[10px] font-bold uppercase mt-2 text-v-blue">Pago</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-200 mx-2 -mt-5"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 text-gray-400 bg-white flex items-center justify-center text-sm font-bold">3</div>
          <span className="text-[10px] font-bold uppercase mt-2 text-gray-400">Fin</span>
        </div>
      </div>
    ),
    'Scrollspy': (
      <div className="flex gap-6 w-full max-w-md">
        <div className="flex flex-col gap-2.5 w-36 border-r-2 border-gray-200 pr-4">
          <span className="text-sm font-bold text-v-ink border-l-4 border-v-blue pl-2">Sección 1</span>
          <span className="text-sm font-medium text-gray-400 pl-2">Sección 2</span>
          <span className="text-sm font-medium text-gray-400 pl-2">Sección 3</span>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="h-10 bg-gray-100 border border-gray-200 rounded"></div>
          <div className="h-10 bg-gray-100 border border-gray-200 rounded"></div>
        </div>
      </div>
    ),
    'Hamburger Menu (Nav Drawer)': (
      <div className="relative w-full max-w-md h-40 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-v-ink/30"></div>
        <div className="relative bg-white h-full w-40 border-r border-gray-200 p-4 self-start shadow-xl">
          <div className="w-5 flex flex-col gap-1 mb-5">
            <span className="h-0.5 bg-v-ink w-full"></span>
            <span className="h-0.5 bg-v-ink w-full"></span>
            <span className="h-0.5 bg-v-ink w-full"></span>
          </div>
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            <span className="text-v-ink font-bold">Inicio</span>
            <span>Productos</span>
            <span>Blog</span>
            <span>Contacto</span>
          </div>
        </div>
      </div>
    ),
    'Site Header vs. Navigation Bar': (
      <div className="w-full max-w-md border border-gray-200 rounded-md bg-white overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
          <span className="font-bold text-sm tracking-widest">LOGO</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium">Buscar</span>
            <span className="w-6 h-6 rounded-full bg-gray-200"></span>
          </div>
        </div>
        <div className="flex items-center gap-5 px-4 py-2 bg-gray-50">
          <span className="text-xs font-bold text-v-ink border-b-2 border-v-ink pb-0.5">Inicio</span>
          <span className="text-xs font-medium text-gray-500">Productos</span>
          <span className="text-xs font-medium text-gray-500">Acerca</span>
          <span className="text-xs font-medium text-gray-500">Contacto</span>
        </div>
      </div>
    ),
    'The Three Dots (Overflow Menu)': (
      <div className="relative inline-block">
        <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
          <div className="flex flex-col gap-1">
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
          </div>
        </div>
        <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg py-1">
          <span className="block px-3 py-1.5 text-sm text-gray-700">Editar</span>
          <span className="block px-3 py-1.5 text-sm text-gray-700">Duplicar</span>
          <span className="block px-3 py-1.5 text-sm text-v-red border-t border-gray-100">Eliminar</span>
        </div>
      </div>
    ),
    'Form Field': (
      <div className="w-full max-w-xs flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Nombre de usuario</label>
          <input type="text" disabled placeholder="ej: mariag" className="border-2 border-gray-300 rounded-md px-3 py-2 text-sm bg-white placeholder:text-gray-400" />
          <p className="text-xs text-gray-400">Entre 3 y 20 caracteres.</p>
        </div>
        <div className="flex flex-col gap-1.5 border-l-4 border-v-red pl-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Contraseña</label>
          <input type="text" disabled placeholder="contraseña" className="border-2 border-v-red rounded-md px-3 py-2 text-sm bg-red-50 placeholder:text-gray-400" />
          <span className="text-xs font-medium text-v-red">Debe tener mínimo 8 caracteres.</span>
        </div>
      </div>
    ),
    'Switch vs. Checkbox vs. Radio': (
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 bg-white">
          <div>
            <p className="text-sm font-bold">Modo oscuro</p>
            <p className="text-xs text-gray-400">Switch — efecto inmediato</p>
          </div>
          <div className="w-12 h-7 bg-v-green rounded-full relative shadow-inner">
            <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
          </div>
        </div>
        <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 bg-white">
          <span className="w-4 h-4 border-2 border-v-blue rounded-sm bg-v-blue/20 flex items-center justify-center text-v-blue text-[10px] font-black">✓</span>
          <div>
            <p className="text-sm font-bold">Acepto los términos</p>
            <p className="text-xs text-gray-400">Checkbox — selección independiente</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg px-4 py-3 bg-white">
          <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Método de pago (Radio)</p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2.5 text-sm text-gray-700"><span className="w-4 h-4 rounded-full border-2 border-v-blue flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-v-blue"></span></span> Tarjeta</label>
            <label className="flex items-center gap-2.5 text-sm text-gray-400"><span className="w-4 h-4 rounded-full border-2 border-gray-300"></span> PayPal</label>
          </div>
        </div>
      </div>
    ),
    'Search Field (Web)': (
      <div className="relative w-full max-w-xs">
        <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"/></svg>
        <input type="text" disabled placeholder="Buscar…" className="w-full border-2 border-gray-300 rounded-md pl-9 pr-9 py-2 text-sm bg-white placeholder:text-gray-400" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold cursor-pointer">×</span>
      </div>
    ),
    'Sign-in Form': (
      <div className="w-full max-w-xs border-2 border-gray-200 rounded-xl bg-white p-6 flex flex-col gap-4">
        <div>
          <h4 className="text-lg font-bold tracking-tight">Inicia sesión</h4>
          <p className="text-xs text-gray-500 mt-0.5">Accede a tu cuenta</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Email</label>
          <input type="text" disabled placeholder="tu@email.com" className="border-2 border-gray-300 rounded-md px-3 py-2 text-sm bg-white placeholder:text-gray-400" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Contraseña</label>
          <div className="relative">
            <input type="text" disabled placeholder="••••••••" className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm bg-white placeholder:text-gray-400 pr-9" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">VER</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-gray-600"><span className="w-3.5 h-3.5 border border-gray-400 rounded-sm bg-white"></span> Recordarme</label>
          <span className="text-v-blue font-medium cursor-pointer">¿Olvidaste tu contraseña?</span>
        </div>
        <div className="py-2 bg-v-ink text-white text-sm font-bold rounded-md text-center">Entrar</div>
      </div>
    ),
    'Resize Handle': (
      <div className="flex w-full max-w-md h-32 border border-gray-200 rounded-md overflow-hidden">
        <div className="w-1/3 bg-gray-100 flex items-center justify-center text-[10px] font-bold uppercase text-gray-400">Panel</div>
        <div className="w-1.5 bg-gray-300 cursor-col-resize relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-8 rounded bg-white border border-gray-300"></div>
        </div>
        <div className="flex-1 bg-white flex items-center justify-center text-[10px] font-bold uppercase text-gray-300">Contenido</div>
      </div>
    ),
    'Insertion Caret': (
      <div className="flex items-center gap-0.5 border-2 border-gray-300 rounded-md px-3 py-2 bg-white w-full max-w-xs">
        <span className="text-sm font-mono text-gray-700">Hola mun</span>
        <span className="w-0.5 h-5 bg-v-blue animate-pulse"></span>
        <span className="text-sm font-mono text-gray-300">do</span>
      </div>
    ),
    'Split View (Web)': (
      <div className="flex w-full max-w-md h-36 border-2 border-v-ink rounded-lg overflow-hidden bg-white">
        <div className="w-24 bg-gray-50 border-r border-gray-200 flex flex-col gap-2 p-3">
          <span className="h-4 bg-gray-200 rounded w-3/4"></span>
          <span className="h-4 bg-gray-200 rounded w-1/2"></span>
          <span className="h-4 bg-v-blue/20 rounded w-3/4"></span>
        </div>
        <div className="flex-1 bg-white flex items-center justify-center p-3">
          <div className="w-3/4 h-16 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-xs text-gray-400 font-mono">Detail</div>
        </div>
      </div>
    ),
    'Modal Dialog vs. Drawer vs. Sheet': (
      <div className="flex flex-col gap-3 w-full max-w-md">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-16 bg-gray-50 border border-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-2 bg-white border border-gray-300 rounded shadow-md flex items-center justify-center text-[10px] font-bold uppercase text-gray-500">Dialog</div>
          </div>
          <div className="flex-1 h-16 bg-gray-50 border border-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-white border-l border-gray-300 shadow-md flex items-center justify-center text-[10px] font-bold uppercase text-gray-500">Drawer</div>
          </div>
        </div>
        <div className="h-16 bg-gray-50 border border-gray-200 rounded-lg relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white border-t border-gray-300 shadow-md flex items-center justify-center text-[10px] font-bold uppercase text-gray-500">Sheet</div>
        </div>
      </div>
    ),
    'Scrim (Backdrop)': (
      <div className="relative h-36 w-full max-w-md rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-4/5 h-20 bg-white border border-gray-300 rounded-lg shadow-xl flex items-center justify-center text-xs font-bold uppercase text-gray-500 z-10">Contenido</div>
        </div>
        <div className="absolute inset-0 bg-v-ink/50"></div>
      </div>
    ),
    'Inline Alert vs. Callout vs. Banner': (
      <div className="w-full max-w-md flex flex-col gap-3">
        <div className="bg-v-blue/10 border border-v-blue/30 rounded-md px-3 py-2 text-xs text-v-blue font-medium">Banner global: nuevas condiciones en tu cuenta.</div>
        <div className="border-l-4 border-v-yellow bg-yellow-50 px-3 py-2 rounded-r-md text-xs text-gray-700">Callout: recuerda guardar tus cambios antes de salir.</div>
        <div className="border-2 border-v-red rounded-md px-3 py-2 bg-red-50">
          <p className="text-[10px] font-bold uppercase text-v-red mb-1">Inline Alert</p>
          <p className="text-xs text-gray-600">El campo "Email" no es válido.</p>
        </div>
      </div>
    ),
    'Skeleton vs. Spinner': (
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="animate-pulse flex items-center gap-3 flex-1 border border-gray-100 rounded-xl p-3 bg-white shadow-sm">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase text-gray-400">Skeleton</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-3 border border-gray-100 rounded-xl p-3 bg-white shadow-sm">
            <div className="w-6 h-6 rounded-full border-2 border-gray-200 border-t-v-blue animate-spin"></div>
            <span className="text-xs text-gray-400">Cargando resultados…</span>
          </div>
          <span className="text-[10px] font-bold uppercase text-gray-400">Spinner</span>
        </div>
      </div>
    ),
    'Drag & Drop': (
      <div className="w-full max-w-md flex flex-col gap-2">
        <div className="p-3 border-2 border-v-blue border-dashed rounded-lg bg-v-blue/5 flex items-center justify-between text-sm">
          <span className="font-bold text-v-blue">Item arrastrado</span>
          <span className="text-xs text-v-blue">▼</span>
        </div>
        <div className="p-3 border-2 border-gray-200 rounded-lg bg-white text-sm text-gray-500 flex items-center justify-between">
          <span>Item 2</span>
          <span className="text-gray-300">⠿</span>
        </div>
        <div className="p-3 border-2 border-gray-200 rounded-lg bg-white text-sm text-gray-500 flex items-center justify-between">
          <span>Item 3</span>
          <span className="text-gray-300">⠿</span>
        </div>
        <div className="p-2.5 border-2 border-v-green border-dashed rounded-lg text-center text-xs font-bold uppercase text-v-green">Zona de drop</div>
      </div>
    ),
    'Parallax Scrolling': (
      <div className="relative w-full max-w-md h-32 rounded-lg overflow-hidden border border-gray-200">
        <div className="absolute -top-4 left-0 right-0 h-16 bg-v-blue/60 translate-y-1"></div>
        <div className="absolute top-8 left-4 text-white text-xs font-bold uppercase tracking-widest">Capa fondo</div>
        <div className="absolute bottom-3 left-4 right-4 bg-white border border-gray-200 rounded-md shadow-md px-3 py-2 text-sm font-bold">Contenido frontal</div>
      </div>
    ),
    'Spring Animation': (
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="relative h-14 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          <div className="absolute bottom-0 left-8 w-8 h-8 rounded-full bg-v-blue animate-bounce"></div>
          <span className="absolute bottom-1 right-3 text-[10px] font-bold uppercase text-gray-400">rigidez / fricción</span>
        </div>
        <div className="flex gap-3 text-[10px] font-bold uppercase text-gray-400">
          <span>stiffness: 300</span>
          <span>damping: 30</span>
          <span>masa: 1</span>
        </div>
      </div>
    ),
    'Easing (Timing Function)': (
      <div className="w-full max-w-md flex flex-col gap-4">
        <svg className="w-full h-12 bg-gray-50 border border-gray-200 rounded" viewBox="0 0 120 40" preserveAspectRatio="none">
          <path d="M0 36 C 40 36, 20 4, 120 4" fill="none" stroke="#009FE3" strokeWidth="2" />
          <text x="2" y="16" fill="#9ca3af" fontSize="8" fontWeight="bold">ease-in</text>
        </svg>
        <svg className="w-full h-12 bg-gray-50 border border-gray-200 rounded" viewBox="0 0 120 40" preserveAspectRatio="none">
          <path d="M0 4 C 100 4, 80 36, 120 36" fill="none" stroke="#009FE3" strokeWidth="2" />
          <text x="2" y="30" fill="#9ca3af" fontSize="8" fontWeight="bold">ease-out</text>
        </svg>
        <svg className="w-full h-12 bg-gray-50 border border-gray-200 rounded" viewBox="0 0 120 40" preserveAspectRatio="none">
          <path d="M0 36 C 30 36, 40 4, 60 4 C 80 4, 90 36, 120 36" fill="none" stroke="#009FE3" strokeWidth="2" />
          <text x="2" y="16" fill="#9ca3af" fontSize="8" fontWeight="bold">ease-in-out</text>
        </svg>
      </div>
    ),
    'Text Scramble': (
      <div className="w-full max-w-md bg-v-ink rounded-lg px-5 py-4">
        <p className="font-mono text-lg font-bold text-v-bg">
          <span className="text-v-yellow">¡A3d*</span><span className="text-v-bg">ia&7Q</span> <span className="text-v-yellow">H&kz</span><span className="text-v-bg">4a%</span><span className="text-v-yellow">!m</span>
        </p>
        <p className="text-[10px] font-bold uppercase text-gray-400 mt-2">→ resolviendo en: "Hola Mundo"</p>
      </div>
    ),
    'Sticky vs. Fixed Positioning': (
      <div className="w-full max-w-md">
        <div className="relative h-28 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          <div className="absolute top-2 left-2 right-2 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase text-gray-500 shadow-sm">sticky (dentro del contenedor)</div>
          <div className="absolute top-12 left-2 right-2 bg-v-blue text-white rounded-md px-3 py-1.5 text-[10px] font-bold uppercase shadow-md">fixed (respecto al viewport)</div>
          <span className="absolute bottom-1 right-2 text-[9px] text-gray-400">contenedor padre</span>
        </div>
      </div>
    ),
    'Truncation (Ellipsis & Line Clamp)': (
      <div className="w-full max-w-md flex flex-col gap-3">
        <div className="border border-gray-200 rounded-md px-3 py-2 bg-white">
          <p className="text-sm font-bold truncate">Este es un título muy largo que no cabe y se cortará con puntos suspensivos…</p>
        </div>
        <div className="border border-gray-200 rounded-md px-3 py-2 bg-white">
          <p className="text-sm text-gray-700 line-clamp-2">Este es un párrafo que se limita a dos líneas. El texto continúa y continúa hasta que se recorta con puntos suspensivos para no romper el layout de la tarjeta en la que vive.</p>
        </div>
      </div>
    ),
    'Focus Ring (:focus-visible)': (
      <div className="w-full max-w-md flex items-center gap-5">
        <button className="px-4 py-2 bg-v-ink text-white text-sm font-bold rounded-md ring-2 ring-v-blue ring-offset-2">Con foco</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-400 text-sm font-bold rounded-md">Sin foco</button>
        <span className="text-[10px] font-bold uppercase text-gray-400">:focus-visible</span>
      </div>
    ),
    'Menu Bar': (
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 text-xs font-bold text-gray-700">
          <span className="font-black">Apple</span>
          <span>Archivo</span>
          <span>Edición</span>
          <span>Ver</span>
          <span>Ventana</span>
          <span>Ayuda</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-gray-500">
          <span className="w-3.5 h-3.5 rounded-full bg-gray-400"></span>
          <span className="w-3.5 h-3.5 bg-gray-300"></span>
          <span>09:41</span>
        </div>
      </div>
    ),
    'Menu Bar Extra (Status Item)': (
      <div className="flex items-center gap-4 w-full max-w-md bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
        <span className="text-xs font-bold text-gray-700">File</span>
        <span className="text-xs font-bold text-gray-400">Edit</span>
        <span className="text-xs font-bold text-gray-400">View</span>
        <div className="ml-auto flex items-center gap-2.5">
          <span className="w-4 h-4 rounded-full bg-v-blue ring-2 ring-v-blue/30 flex items-center justify-center text-white text-[8px] font-bold">⇧</span>
          <span className="text-xs font-medium text-gray-500">App</span>
          <span className="text-xs text-gray-400">09:41</span>
        </div>
      </div>
    ),
    'Context Menu': (
      <div className="relative inline-block w-full max-w-[200px]">
        <div className="bg-gray-100 border border-gray-200 rounded-md p-4 flex items-center justify-center text-xs text-gray-500 font-medium">Elemento → Clic derecho</div>
        <div className="absolute top-full left-2 mt-1 w-44 bg-white border border-gray-300 rounded-lg shadow-xl py-1 z-10">
          <span className="block px-3 py-1 text-xs text-gray-700">Abrir</span>
          <span className="block px-3 py-1 text-xs text-gray-700">Mover a papelera…</span>
          <span className="block px-3 py-1 text-xs text-gray-400">Copiar</span>
          <div className="border-t border-gray-100 my-1"></div>
          <span className="block px-3 py-1 text-xs text-gray-700 flex justify-between"><span>Mostrar opciones</span><span className="text-gray-400">›</span></span>
        </div>
      </div>
    ),
    'Sidebar (Source List)': (
      <div className="w-48 bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col gap-3 text-sm">
        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 mb-1.5">Favoritos</p>
          <p className="font-bold text-v-blue flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-v-blue"></span>AirDrop</p>
          <p className="text-gray-700 flex items-center gap-2"><span className="w-3 h-3 bg-v-yellow"></span>Recents</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 mb-1.5">Ubicaciones</p>
          <p className="text-gray-700 flex items-center gap-2"><span className="w-3 h-3 bg-v-green"></span>Macintosh HD</p>
          <p className="text-gray-700 flex items-center gap-2"><span className="w-3 h-3 bg-v-blue"></span>iCloud Drive</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 mb-1.5">Etiquetas</p>
          <p className="text-gray-700 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-v-red"></span>Rojo</p>
          <p className="text-gray-700 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-v-yellow"></span>Ámbar</p>
        </div>
      </div>
    ),
    'Column View (Browser)': columnView,
    'NSBrowser (Column View)': columnView,
    'Outline View': outlineView,
    'NSOutlineView': outlineView,
    'Disclosure Triangle': (
      <div className="w-full max-w-[220px] bg-white border border-gray-200 rounded-lg p-2.5 text-sm flex flex-col gap-1">
        <div className="flex items-center gap-1.5 font-medium text-gray-700"><span className="text-gray-400 text-[10px]">▼</span>Sección expandida</div>
        <div className="flex items-center gap-1.5 pl-4 text-gray-500 text-xs">Sub-elemento A</div>
        <div className="flex items-center gap-1.5 pl-4 text-gray-500 text-xs">Sub-elemento B</div>
        <div className="flex items-center gap-1.5 font-medium text-gray-400"><span className="text-gray-300 text-[10px]">▶</span>Sección colapsada</div>
      </div>
    ),
    'Traffic Lights': (
      <div className="bg-gray-100 border border-gray-300 rounded-lg px-5 py-4 inline-flex flex-col items-center gap-2">
        <div className="flex gap-2">{trafficLights}</div>
        <span className="text-[10px] font-bold uppercase text-gray-400">cerrar · minimizar · maximizar</span>
      </div>
    ),
    'Mac Window': (
      <div className="w-full max-w-md border border-gray-300 rounded-xl overflow-hidden bg-white shadow-lg">
        <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-3 border-b border-gray-200">
          {trafficLights}
          <span className="text-xs text-gray-500 font-medium mx-auto">MiApp</span>
        </div>
        <div className="h-28 bg-gray-50 flex items-center justify-center text-[10px] font-bold uppercase text-gray-400">content view</div>
      </div>
    ),
    'Toolbar (Unified Title Bar)': (
      <div className="w-full max-w-md border border-gray-300 rounded-xl overflow-hidden bg-white shadow-lg">
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-100">
          {trafficLights}
          <div className="flex items-center gap-2 ml-2">
            <span className="w-8 h-6 bg-white border border-gray-300 rounded text-[10px] flex items-center justify-center text-gray-400">←</span>
            <span className="w-8 h-6 bg-white border border-gray-300 rounded text-[10px] flex items-center justify-center text-gray-400">→</span>
          </div>
          <span className="text-xs text-gray-500 font-medium ml-auto">toolbar unificado</span>
        </div>
        <div className="h-20 bg-gray-50 flex items-center justify-center text-[10px] font-bold uppercase text-gray-400">content view</div>
      </div>
    ),
    'Visual Effect Material (Vibrancy)': vibrancy,
    'NSVisualEffectView': vibrancy,
    'Inspector': (
      <div className="w-52 bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col gap-3">
        <p className="text-[10px] font-bold uppercase text-gray-400">Estilo</p>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 bg-white border border-gray-300 rounded-sm"></span>
          <span className="w-4 h-4 bg-v-blue border border-gray-300 rounded-sm"></span>
          <span className="w-4 h-4 bg-gray-800 border border-gray-300 rounded-sm"></span>
          <span className="w-4 h-4 bg-white border border-gray-300 rounded-full"></span>
        </div>
        <p className="text-[10px] font-bold uppercase text-gray-400">Disposición</p>
        <div className="h-4 bg-white border border-gray-300 rounded"></div>
        <div className="h-4 bg-white border border-gray-300 rounded w-3/4"></div>
        <p className="text-[10px] font-bold uppercase text-gray-400">Datos</p>
        <div className="h-4 bg-white border border-gray-300 rounded"></div>
      </div>
    ),
    'Panel (Floating Window)': panel,
    'NSPanel': panel,
    'Sheet': (
      <div className="relative w-full max-w-md h-36 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
        <div className="absolute top-4 left-6 right-6 h-24 bg-white border border-gray-300 rounded-lg shadow-lg p-3 flex flex-col justify-center items-center">
          <p className="text-sm font-bold text-gray-700">¿Guardar cambios?</p>
          <div className="flex gap-2 mt-2">
            <span className="px-3 py-1 bg-v-blue text-white text-xs font-bold rounded-md">Guardar</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md border border-gray-300">Cancelar</span>
          </div>
        </div>
      </div>
    ),
    'Save Panel': (
      <div className="w-full max-w-md border border-gray-300 rounded-lg bg-white shadow-lg p-4 flex flex-col gap-3">
        <p className="text-sm font-bold text-gray-700">Guardar como</p>
        <div className="flex items-center gap-2 text-xs text-gray-500 border border-gray-300 rounded px-2.5 py-1.5"><span className="text-gray-400">▸</span>Escritorio / Proyectos /</div>
        <div className="border border-gray-200 rounded p-2 flex flex-col gap-1.5 h-20 overflow-hidden">
          <span className="text-xs text-gray-600 bg-gray-100 rounded px-1.5 py-0.5 w-2/3">informe_final.pdf</span>
          <span className="text-xs text-gray-500 px-1.5 py-0.5 w-1/2">notas.txt</span>
          <span className="text-xs text-gray-500 px-1.5 py-0.5 w-3/5">logo.svg</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <label className="text-gray-500">Nombre:</label>
          <span className="flex-1 border border-gray-300 rounded px-2 py-1 bg-white">presupuesto.pdf</span>
        </div>
        <div className="flex gap-2 justify-end">
          <span className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-600 text-xs font-bold rounded-md">Cancelar</span>
          <span className="px-3 py-1 bg-v-blue text-white text-xs font-bold rounded-md">Guardar</span>
        </div>
      </div>
    ),
    'Scroll View': (
      <div className="relative w-full max-w-[220px] h-28 border border-gray-200 rounded-lg bg-white overflow-hidden p-3">
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>
        <div className="absolute right-1 top-2 bottom-2 w-1.5 rounded-full bg-gray-300">
          <div className="absolute top-2 w-1.5 h-10 rounded-full bg-gray-500"></div>
        </div>
      </div>
    ),
    'Split View': (
      <div className="flex w-full max-w-md h-36 border border-gray-300 rounded-lg overflow-hidden bg-white">
        <div className="w-1/4 bg-gray-50 border-r border-gray-200 flex flex-col gap-2 p-3">
          <span className="h-3 bg-gray-200 rounded w-3/4"></span>
          <span className="h-3 bg-gray-200 rounded w-1/2"></span>
        </div>
        <div className="w-1 bg-gray-200 cursor-col-resize"></div>
        <div className="flex-1 bg-white flex items-center justify-center text-[10px] font-bold uppercase text-gray-400">detalle</div>
      </div>
    ),
    'Search Field': (
      <div className="flex items-center gap-2 w-full max-w-xs bg-white border border-gray-300 rounded-full px-3 py-1.5">
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"/></svg>
        <span className="text-sm text-gray-400 flex-1">Buscar</span>
        <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-[9px] font-bold">×</span>
      </div>
    ),
    'Token Field': (
      <div className="flex items-center gap-1.5 w-full max-w-xs bg-white border border-gray-300 rounded-lg px-2.5 py-1.5">
        <span className="px-2 py-0.5 bg-v-blue/15 text-v-blue text-xs font-medium rounded border border-v-blue/30">ana@mail.com</span>
        <span className="px-2 py-0.5 bg-v-blue/15 text-v-blue text-xs font-medium rounded border border-v-blue/30">pablo@mail.com</span>
        <span className="text-xs text-gray-400">+</span>
      </div>
    ),
    'Combo Button': (
      <div className="flex items-center overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm">
        <span className="px-3 py-1.5 text-xs font-bold text-gray-700 border-r border-gray-200">Compartir</span>
        <span className="px-2 py-1.5 text-[10px] text-gray-500 bg-gray-50">▼</span>
      </div>
    ),
    'Pop-Up Button vs. Pull-Down Button vs. Combo Box': (
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
            <span className="px-3 py-1.5 text-xs font-bold text-gray-700">Español</span>
            <span className="px-1.5 py-1.5 text-[10px] text-gray-400 bg-gray-50">▼</span>
          </div>
          <span className="text-[10px] font-bold uppercase text-gray-400">Pop-Up</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
            <span className="px-3 py-1.5 text-xs font-bold text-gray-700">Exportar</span>
            <span className="px-1.5 py-1.5 text-[10px] text-gray-400 bg-gray-50">▼</span>
          </div>
          <span className="text-[10px] font-bold uppercase text-gray-400">Pull-Down</span>
        </div>
        <div className="flex items-center gap-3">
          <input type="text" disabled placeholder="Ciudad…" className="border border-gray-300 rounded-md px-2.5 py-1.5 text-xs bg-white flex-1" />
          <span className="text-[10px] font-bold uppercase text-gray-400">Combo Box</span>
        </div>
      </div>
    ),
    'Segmented Control': (
      <div className="inline-flex border border-gray-300 rounded-md overflow-hidden bg-gray-100">
        <span className="px-3.5 py-1.5 bg-white text-xs font-bold shadow-sm">Iconos</span>
        <span className="px-3.5 py-1.5 text-xs font-medium text-gray-600">Lista</span>
        <span className="px-3.5 py-1.5 text-xs font-medium text-gray-600">Columnas</span>
      </div>
    ),
    'Slider': (
      <div className="w-full max-w-xs flex flex-col gap-2">
        <div className="relative h-1.5 bg-gray-200 rounded-full">
          <div className="absolute inset-y-0 left-0 w-2/3 bg-v-blue rounded-full"></div>
          <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-5 h-5 rounded-full bg-white border-2 border-v-blue shadow"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>0</span><span>50</span><span>100</span>
        </div>
      </div>
    ),
    'Stepper (macOS)': (
      <div className="flex items-center gap-2">
        <div className="border border-gray-300 rounded-md px-3 py-1.5 text-sm font-bold text-gray-700 bg-white">42</div>
        <div className="flex flex-col border border-gray-300 rounded-md overflow-hidden">
          <span className="px-1.5 py-0.5 text-[10px] text-gray-600 border-b border-gray-200 bg-white leading-none">▲</span>
          <span className="px-1.5 py-0.5 text-[10px] text-gray-400 bg-white leading-none">▼</span>
        </div>
      </div>
    ),
    'Color Well': (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md border border-gray-300 bg-v-blue shadow-sm relative">
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white border border-gray-300"></div>
        </div>
        <span className="text-xs font-medium text-gray-500">#009FE3</span>
      </div>
    ),
    'Level Indicator': (
      <div className="w-full max-w-[180px] flex flex-col gap-2.5">
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => <span key={i} className={`flex-1 h-2.5 rounded-sm ${i <= 4 ? 'bg-v-green' : 'bg-gray-200'}`}></span>)}
        </div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => <span key={i} className={`flex-1 h-2.5 rounded-sm ${i <= 3 ? 'bg-v-yellow' : 'bg-gray-200'}`}></span>)}
        </div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => <span key={i} className={`flex-1 h-2.5 rounded-sm ${i <= 2 ? 'bg-v-red' : 'bg-gray-200'}`}></span>)}
        </div>
      </div>
    ),
    'Alert (macOS)': (
      <div className="w-full max-w-sm border border-gray-300 rounded-xl bg-white shadow-lg p-5 flex gap-4">
        <div className="w-10 h-10 rounded-full bg-v-yellow/20 border border-v-yellow/40 flex items-center justify-center text-v-yellow font-bold text-lg">!</div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-800">¿Seguro que quieres borrar?</p>
          <p className="text-xs text-gray-500 mt-1">Esta acción no se puede deshacer.</p>
          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 bg-v-blue text-white text-xs font-bold rounded-md">Borrar</span>
            <span className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-600 text-xs font-bold rounded-md">Cancelar</span>
          </div>
        </div>
      </div>
    ),
    'Dock Badge': dockBadge,
    'NSDockTile Badge': dockBadge,
    'Focus Ring': (
      <div className="w-full max-w-xs flex flex-col gap-1">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Campo con foco</label>
        <input type="text" disabled placeholder="Escribe aquí" className="border-2 border-v-blue rounded-lg px-3 py-2 text-sm bg-white placeholder:text-gray-400 ring-4 ring-v-blue/30" />
      </div>
    ),
    'Helvetica': (
      <div className="w-full max-w-md border border-gray-200 rounded-lg bg-white p-5">
        <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Helvetica</p>
        <p className="text-4xl font-bold text-gray-800 tracking-tight" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Hamburgefon</p>
        <div className="flex gap-4 mt-3 text-sm text-gray-600" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <span>Light</span><span className="font-medium">Regular</span><span className="font-bold">Bold</span>
        </div>
        <p className="text-[10px] text-gray-400 mt-3">Hoy macOS usa SF Pro; evita forzar Helvetica.</p>
      </div>
    ),
    'NSStatusItem': (
      <div className="flex items-center gap-4 w-full max-w-md bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
        <span className="text-xs font-bold text-gray-400">File</span>
        <span className="text-xs font-bold text-gray-400">Edit</span>
        <span className="ml-auto flex items-center gap-2.5">
          <span className="w-4 h-4 rounded-full bg-v-blue flex items-center justify-center text-white text-[8px] font-bold">⇧</span>
          <span className="text-xs text-gray-400">09:41</span>
        </span>
      </div>
    ),
    'NSPopover': (
      <div className="relative flex flex-col items-start mt-10">
        <div className="bg-white border border-gray-300 rounded-xl shadow-xl p-4 w-48 mb-3 relative">
          <div className="absolute top-full left-8 border-8 border-transparent border-t-white"></div>
          <p className="text-sm font-bold text-gray-800">Ajustes rápidos</p>
          <div className="mt-2 space-y-1.5">
            <div className="h-2 bg-gray-100 rounded w-full"></div>
            <div className="h-2 bg-gray-100 rounded w-4/5"></div>
          </div>
        </div>
        <button className="border border-gray-300 rounded-md px-4 py-1.5 bg-gray-100 text-sm font-medium text-gray-700">Mostrar</button>
      </div>
    )
  };

  const example = examples[term];

  if (!example) return null;

  return (
    <div className="mt-6 mb-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Ejemplo Visual</h3>
      <div className="p-8 bg-gray-50/50 border-2 border-gray-100 rounded-2xl flex items-center justify-center overflow-visible min-h-[160px]">
        {example}
      </div>
    </div>
  );
}
