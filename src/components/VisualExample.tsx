import React from 'react';

interface VisualExampleProps {
  term: string;
}

export function VisualExample({ term }: VisualExampleProps) {
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
