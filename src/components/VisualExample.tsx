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
    'Divider / Separator': (
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
