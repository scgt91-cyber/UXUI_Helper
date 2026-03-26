export interface Term {
  term: string;
  definition: string;
  badPrompt?: string;
  proPrompt?: string;
  group?: string;
}

export interface DictionarySection {
  title: string;
  description: string;
  terms: Term[];
}

export const dictionaryData: Record<string, DictionarySection> = {
  'ui-components': {
    title: 'UI Components',
    description: 'Diccionario estándar de elementos de interfaz. Conocer el nombre exacto de cada componente es el primer paso para construir un Design System robusto y pedir interfaces precisas a la IA.',
    terms: [
      {
        term: 'Container / Wrapper',
        definition: 'Un elemento estructural invisible que limita el ancho del contenido y lo centra en la pantalla para mantener la legibilidad.',
        badPrompt: 'Mete todo en un bloque en el medio para que no ocupe toda la pantalla.',
        proPrompt: 'Envuelve el contenido principal en un Container con un ancho máximo (max-w-7xl) y márgenes automáticos (mx-auto).',
        group: 'Estructura y Layout (Las famosas "Cajas")'
      },
      {
        term: 'Card',
        definition: 'Un contenedor rectangular que agrupa información relacionada sobre un único tema, a menudo incluyendo un título, imagen, texto y acciones.',
        badPrompt: 'Pon la información del producto en una caja blanca con sombra.',
        proPrompt: 'Usa un componente Card para agrupar el contenido, con padding interno (p-6), bordes redondeados (rounded-xl) y sombra sutil (shadow-sm).',
        group: 'Estructura y Layout (Las famosas "Cajas")'
      },
      {
        term: 'Hero Section',
        definition: 'La sección principal y más visible de una página web (above the fold), diseñada para captar la atención inmediatamente con un gran titular y un CTA.',
        badPrompt: 'Pon un bloque grande al principio con una foto de fondo y texto.',
        proPrompt: 'Diseña una Hero Section con un min-height de 80vh, background cover y flexbox/grid para centrar el contenido principal.',
        group: 'Estructura y Layout (Las famosas "Cajas")'
      },
      {
        term: 'Navbar / Header',
        definition: 'La barra de navegación principal, generalmente ubicada en la parte superior de la página, que contiene el logotipo, enlaces y acciones globales.',
        badPrompt: 'Haz la barra de arriba fija con el logo.',
        proPrompt: 'Implementa un Navbar sticky en la parte superior (top-0) con backdrop-blur y un z-index alto (z-50).',
        group: 'Estructura y Layout (Las famosas "Cajas")'
      },
      {
        term: 'Divider / Separator',
        definition: 'Una línea fina o espacio visual utilizado para separar contenido o agrupar elementos relacionados dentro de un layout.',
        badPrompt: 'Pon una raya gris para separar las dos secciones.',
        proPrompt: 'Añade un Divider horizontal usando un borde inferior (border-b) con un color sutil (border-gray-200) y margen vertical (my-4).',
        group: 'Estructura y Layout (Las famosas "Cajas")'
      },
      {
        term: 'Input Field / Textarea',
        definition: 'Un campo interactivo que permite al usuario introducir texto o datos.',
        badPrompt: 'Pon un cuadrito para escribir el nombre.',
        proPrompt: 'Añade un Input Field de tipo texto, con un placeholder descriptivo, un label accesible y estados focus/error claros.',
        group: 'Estructura y Layout (Las famosas "Cajas")'
      },
      {
        term: 'Modal / Dialog',
        definition: 'Una ventana superpuesta que requiere la atención del usuario y bloquea la interacción con el resto de la página hasta que se cierra o se toma una acción.',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Tooltip',
        definition: 'Un pequeño mensaje informativo que aparece al pasar el ratón (hover) o enfocar un elemento. Se usa para explicaciones breves, no para contenido interactivo.',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Popover',
        definition: 'Similar al tooltip, pero puede contener elementos interactivos (botones, enlaces, formularios) y suele requerir un clic para abrirse y cerrarse.',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Toast / Snackbar',
        definition: 'Notificaciones temporales y no intrusivas que aparecen (generalmente en la parte inferior o superior) para informar sobre el resultado de una acción.',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Accordion',
        definition: 'Una lista apilada verticalmente de encabezados que se pueden hacer clic para revelar u ocultar el contenido asociado.',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Breadcrumbs',
        definition: 'Un rastro de navegación secundario que muestra la ubicación actual del usuario dentro de la jerarquía del sitio web.',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Badge / Chip',
        definition: 'Pequeños elementos visuales utilizados para indicar estado, categorizar contenido o mostrar recuentos (ej. número de notificaciones).',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Skeleton Loader',
        definition: 'Una versión en blanco de un componente que se muestra mientras los datos reales se están cargando, mejorando la percepción de velocidad.',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Toggle Switch',
        definition: 'Un control que permite al usuario cambiar rápidamente entre dos estados opuestos (encendido/apagado), con efecto inmediato.',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Stepper',
        definition: 'Un indicador visual que muestra el progreso a través de una secuencia de pasos lógicos y numerados (ej. un proceso de checkout).',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Tabs',
        definition: 'Elementos de navegación que permiten al usuario alternar entre diferentes vistas o conjuntos de datos dentro del mismo contexto.',
        group: 'Componentes Interactivos y Feedback'
      },
      {
        term: 'Dropdown Menu',
        definition: 'Una lista contextual de opciones o acciones que aparece al interactuar con un botón u otro control.',
        group: 'Componentes Interactivos y Feedback'
      }
    ]
  },
  'foundations': {
    title: 'UX/UI Foundations',
    description: 'Conceptos fundamentales de diseño de experiencia e interfaz de usuario. El vocabulario base para hablar con propiedad sobre la estructura de cualquier producto digital.',
    terms: [
      {
        term: 'Tech Stack Baseline',
        definition: 'La definición estricta de las tecnologías, frameworks y lenguajes que la IA debe usar. Es el primer paso absoluto para evitar que la IA alucine librerías obsoletas o mezcle sintaxis.',
        badPrompt: 'Hazme una web moderna y rápida.',
        proPrompt: 'Stack requerido: React 18 (Functional Components), TypeScript estricto, Vite y Tailwind CSS. Prohibido usar archivos .css externos o librerías de UI no solicitadas.',
        group: 'El Paso Cero: Setup Inicial de IA'
      },
      {
        term: '8pt Grid System',
        definition: 'La regla matemática base para márgenes, paddings y tamaños. Establecer esto en el primer prompt garantiza que la IA no genere proporciones aleatorias o layouts desordenados.',
        badPrompt: 'Ponle espacio para que respire y no se vea apretado.',
        proPrompt: 'Implementa un sistema de espaciado estricto basado en múltiplos de 8pt (ej. p-2, m-4, gap-8 en Tailwind) para mantener un ritmo vertical y horizontal perfecto.',
        group: 'El Paso Cero: Setup Inicial de IA'
      },
      {
        term: 'Mobile-First Approach',
        definition: 'La directiva de diseñar y programar primero para pantallas pequeñas y luego escalar. Si no se lo dices a la IA al principio, generará código desktop que se romperá en móviles.',
        badPrompt: 'Que se adapte al móvil cuando la pantalla sea pequeña.',
        proPrompt: 'Adopta un enfoque mobile-first absoluto. Define el layout base sin prefijos y utiliza los breakpoints sm:, md: y lg: de Tailwind exclusivamente para escalar hacia arriba.',
        group: 'El Paso Cero: Setup Inicial de IA'
      },
      {
        term: 'Semantic Theming',
        definition: 'La definición de colores por su función (primario, fondo, texto, error) en lugar de valores estáticos. Fundamental para que la IA genere código mantenible y soporte Dark Mode.',
        badPrompt: 'Usa fondo blanco, texto negro y botones azules.',
        proPrompt: 'Configura un sistema de Semantic Theming usando variables CSS (background, foreground, primary, muted, destructive) en lugar de colores hardcodeados, asegurando soporte para Dark Mode.',
        group: 'El Paso Cero: Setup Inicial de IA'
      },
      {
        term: 'Affordance',
        definition: 'Pistas visuales que indican a los usuarios cómo interactuar con un elemento (ej. un botón que parece "clicable" por su sombra o borde).',
        badPrompt: 'Haz que el botón se note más.',
        proPrompt: 'Diseña el CTA principal con un clear affordance, utilizando un borde sólido de 2px y un estado hover invertido.'
      },
      {
        term: 'Cognitive Load',
        definition: 'La cantidad de esfuerzo mental requerido para usar una interfaz. Un buen diseño minimiza la carga cognitiva.',
        badPrompt: 'Hazlo simple y que no maree.',
        proPrompt: 'Reduce el cognitive load mediante progressive disclosure de los ajustes avanzados y agrupando los campos del formulario relacionados.'
      },
      {
        term: 'Visual Hierarchy',
        definition: 'La organización de elementos para mostrar su orden de importancia, guiando el ojo del usuario a través del diseño.',
        badPrompt: 'Pon el título más grande y destaca el precio.',
        proPrompt: 'Establece una visual hierarchy estricta usando una escala tipográfica de 1.250. El precio principal debe ser el punto focal.'
      },
      {
        term: 'Negative Space (Whitespace)',
        definition: 'El espacio vacío entre y alrededor de los elementos. Es crucial para dar respiro, agrupar elementos y mejorar la legibilidad.',
        badPrompt: 'Separa un poco las cosas para que no se vea apretado.',
        proPrompt: 'Utiliza negative space generoso (múltiplos de 8pt) para crear zonas de contenido distintas y mejorar la scannability.'
      },
      {
        term: 'Design Tokens',
        definition: 'Variables semánticas que almacenan decisiones de diseño (colores, tipografía, espaciado) para mantener consistencia en todo el sistema.',
        badPrompt: 'Usa azul oscuro y letra tamaño 16.',
        proPrompt: 'Implementa design tokens para colores semánticos (ej. color-primary-500) y variables de espaciado (spacing-4 = 16px).'
      },
      {
        term: 'Heuristics',
        definition: 'Reglas generales o principios (como las 10 heurísticas de Nielsen) que sirven para evaluar la usabilidad de una interfaz.',
        badPrompt: 'Revisa si la app es fácil de usar.',
        proPrompt: 'Realiza una evaluación heurística enfocada en la "Visibilidad del estado del sistema" y la "Prevención de errores" para el flujo de checkout.'
      },
      {
        term: 'Accessibility (a11y)',
        definition: 'Prácticas de diseño que aseguran que el producto pueda ser utilizado por personas con diversas discapacidades (visuales, motoras, cognitivas).',
        badPrompt: 'Que se vea bien para todos.',
        proPrompt: 'Asegura un contraste de color mínimo de 4.5:1 (WCAG AA) para texto normal y añade estados :focus-visible claros para navegación por teclado.'
      },
      {
        term: 'Microinteractions',
        definition: 'Pequeñas animaciones o respuestas visuales que ocurren tras una acción del usuario, proporcionando feedback inmediato.',
        badPrompt: 'Ponle una animación chula al botón.',
        proPrompt: 'Añade una microinteracción de success state en el botón: al hacer clic, cambia el icono a un checkmark con una transición de 200ms ease-in-out.'
      },
      {
        term: 'Atomic Design',
        definition: 'Metodología para crear sistemas de diseño dividiendo interfaces en componentes básicos (átomos, moléculas, organismos, plantillas, páginas).',
        badPrompt: 'Haz la página de perfil completa.',
        proPrompt: 'Sigue Atomic Design: primero crea el átomo Avatar, luego la molécula UserProfileCard, y finalmente intégralo en el organismo Sidebar.'
      },
      {
        term: 'Responsive vs Adaptive',
        definition: 'Responsive: el layout fluye y se ajusta fluidamente al ancho. Adaptive: el layout cambia bruscamente en puntos de quiebre (breakpoints) específicos.',
        badPrompt: 'Que se adapte al móvil.',
        proPrompt: 'Usa un enfoque responsive fluido usando clamp() para la tipografía, y un enfoque adaptive cambiando de CSS Grid a Flexbox-column por debajo de 768px.'
      },
      {
        term: 'Wireframe vs Prototype',
        definition: 'Wireframe: esquema visual de baja fidelidad que define la estructura. Prototipo: modelo interactivo de alta fidelidad que simula el producto final.',
        badPrompt: 'Hazme el diseño de la pantalla para ver cómo queda.',
        proPrompt: 'Prepara un wireframe de baja fidelidad para validar la estructura, y luego un prototipo interactivo para el user testing.'
      },
      {
        term: 'Information Architecture (IA)',
        definition: 'La práctica de organizar, estructurar y etiquetar el contenido de manera efectiva y sostenible para ayudar a los usuarios a encontrar información.',
        badPrompt: 'Ordena el menú para que se entienda.',
        proPrompt: 'Define la arquitectura de la información (IA) mediante un card sorting para estructurar la jerarquía de la navegación principal.'
      }
    ]
  },
  'communication': {
    title: 'UX/UI → AI Communication',
    description: 'Términos técnicos para estructurar peticiones y comunicarte con la IA (o con tu equipo) con precisión de ingeniero/arquitecto.',
    terms: [
      {
        term: 'System Prompt / Persona',
        definition: 'Instrucciones base que definen el rol, tono y restricciones de la IA antes de pedirle una tarea específica.',
        badPrompt: 'Eres un diseñador web experto.',
        proPrompt: 'Actúa como un Senior UX/UI Architect especializado en Design Systems, accesibilidad WCAG y Tailwind CSS.'
      },
      {
        term: 'Zero-shot / Few-shot',
        definition: 'Técnicas de prompting. Zero-shot es pedir algo sin ejemplos. Few-shot es proveer ejemplos previos para que la IA replique el patrón.',
        badPrompt: 'Hazme un componente de tarjeta.',
        proPrompt: 'Usando un enfoque few-shot, aquí tienes 2 ejemplos de la estructura de nuestro componente card. Genera una nueva pricing card siguiendo este patrón exacto.'
      },
      {
        term: 'Chain of Thought (CoT)',
        definition: 'Pedir a la IA que explique su proceso de razonamiento paso a paso antes de dar la respuesta final, lo que mejora drásticamente la lógica del resultado.',
        badPrompt: 'Hazme la base de datos para la app.',
        proPrompt: 'Piensa paso a paso (Chain of Thought): primero analiza las entidades necesarias, luego define las relaciones, y finalmente genera el esquema JSON.'
      },
      {
        term: 'Constraints',
        definition: 'Límites estrictos y reglas inquebrantables impuestas a la IA para evitar alucinaciones o código no deseado.',
        badPrompt: 'No uses colores feos ni librerías raras.',
        proPrompt: 'Constraints: Usa ÚNICAMENTE clases de utilidad de Tailwind. NO uses CSS personalizado. Limítate estrictamente a una paleta monocromática.'
      },
      {
        term: 'Iterative Refinement',
        definition: 'El proceso de mejorar el output de la IA paso a paso, corrigiendo detalles específicos en lugar de pedir todo de nuevo.',
        badPrompt: 'Hazlo de nuevo, no me gusta el menú.',
        proPrompt: 'Refina el output anterior: aumenta el padding de los items de navegación a 16px (p-4) y cambia el flex-direction a column en los breakpoints móviles.'
      },
      {
        term: 'Output Format',
        definition: 'Especificar exactamente cómo la IA debe entregar la respuesta (JSON, Markdown, código React, estructura de carpetas).',
        badPrompt: 'Dame el código.',
        proPrompt: 'Output format: Provee ÚNICAMENTE el código del componente funcional de React usando interfaces de TypeScript. Sin explicaciones en markdown.'
      },
      {
        term: 'Context Window',
        definition: 'La cantidad de texto (tokens) que la IA puede "recordar" y procesar en una sola interacción. Es crucial no saturarla con información irrelevante.',
        badPrompt: 'Toma estos 50 archivos y haz la app.',
        proPrompt: 'Para no exceder el context window, te daré solo el types.ts y el App.tsx. Basado en esto, genera el componente Header.'
      },
      {
        term: 'Prompt Chaining',
        definition: 'Dividir una tarea compleja en múltiples prompts secuenciales, donde el output del primer prompt es el input del segundo.',
        badPrompt: 'Haz el diseño, el código, la base de datos y el copy de la web.',
        proPrompt: 'Paso 1: Genera la estructura JSON de la landing. (Espero tu respuesta). Paso 2: Basado en ese JSON, genera los componentes React.'
      },
      {
        term: 'Hallucination',
        definition: 'Cuando la IA inventa información, librerías o sintaxis que no existen o son incorrectas. Se mitiga con constraints y few-shot.',
        badPrompt: 'Usa la librería de animaciones mágicas de React.',
        proPrompt: 'Para evitar alucinaciones de librerías, usa EXCLUSIVAMENTE framer-motion para las animaciones. No inventes hooks personalizados que no he proveído.'
      }
    ]
  },
  'ai-assisted': {
    title: 'AI-Assisted UX/UI',
    description: 'Conceptos sobre cómo la IA asiste en procesos de research, wireframing y generación de interfaces.',
    terms: [
      {
        term: 'Generative UI',
        definition: 'Interfaces de usuario que son generadas o adaptadas en tiempo real por IA basándose en el contexto o input del usuario.',
        badPrompt: 'Haz una pantalla que cambie según lo que pida el usuario.',
        proPrompt: 'Diseña un layout de Generative UI donde el área de contenido principal renderice micro-frontends distintos basados en la clasificación de intención de la IA.'
      },
      {
        term: 'Synthetic Users',
        definition: 'Perfiles de usuario generados por IA utilizados para simular pruebas de usabilidad o entrevistas en fases tempranas de research.',
        badPrompt: 'Imagina que eres un cliente y dime qué opinas.',
        proPrompt: 'Actúa como un synthetic user persona: un contable de 45 años con baja alfabetización digital. Evalúa este flujo de onboarding e identifica los puntos de fricción.'
      },
      {
        term: 'Automated Heuristic Evaluation',
        definition: 'Uso de IA para escanear wireframes o código y detectar violaciones a principios de usabilidad estándar.',
        badPrompt: 'Dime si este diseño está mal.',
        proPrompt: 'Realiza una automated heuristic evaluation de esta estructura HTML, comprobando específicamente los ratios de contraste WCAG y los tamaños de los touch targets.'
      },
      {
        term: 'Layout Synthesis',
        definition: 'Generación de estructuras de página (wireframes) a partir de descripciones de texto o requisitos de datos.',
        badPrompt: 'Hazme el esqueleto de un dashboard.',
        proPrompt: 'Sintetiza un wireframe de layout para un dashboard que incluya un sidebar izquierdo (240px), un sticky header superior, y un área de contenido principal en CSS Grid con un bento layout de 3 columnas.'
      },
      {
        term: 'Copy Generation',
        definition: 'Uso de IA para generar textos de interfaz (microcopy), mensajes de error, tooltips y llamadas a la acción (CTAs).',
        badPrompt: 'Pon un texto para cuando falla la contraseña.',
        proPrompt: 'Genera microcopy para un error de contraseña. Debe ser empático, conciso (máximo 6 palabras) y ofrecer una solución clara (ej. enlace de recuperación).'
      },
      {
        term: 'Predictive A/B Testing',
        definition: 'Simulación de pruebas A/B utilizando modelos de IA para predecir qué variante de diseño tendrá mejor rendimiento antes de programarla.',
        badPrompt: 'Dime cuál de estos dos botones es mejor.',
        proPrompt: 'Realiza un predictive A/B test entre un CTA rojo sólido y uno outline azul, considerando que nuestro target son usuarios daltónicos (protanopia).'
      },
      {
        term: 'Component Naming Generation',
        definition: 'Uso de IA para establecer convenciones de nombres consistentes (BEM, PascalCase) para componentes y tokens en un sistema de diseño.',
        badPrompt: 'Ponle nombres a las capas de Figma.',
        proPrompt: 'Genera una convención de nombres estricta usando BEM (Block Element Modifier) para este componente de tarjeta y sus sub-elementos.'
      }
    ]
  },
  'frontend': {
    title: 'Frontend Applied',
    description: 'Términos técnicos de desarrollo frontend, seguridad y buenas prácticas para hablar el mismo idioma que los desarrolladores.',
    terms: [
      {
        term: 'Responsive Breakpoints',
        definition: 'Puntos de interrupción (anchos de pantalla) donde el diseño se adapta utilizando media queries.',
        badPrompt: 'Que se vea bien en el móvil y en la compu.',
        proPrompt: 'Implementa responsive breakpoints en 768px (md) y 1024px (lg). El grid debe pasar de 1 columna en móvil a 3 columnas en lg.'
      },
      {
        term: 'Semantic HTML',
        definition: 'Uso de etiquetas HTML que describen su significado (ej. <nav>, <article>, <main>) en lugar de usar <div> para todo.',
        badPrompt: 'Usa divs para armar la página.',
        proPrompt: 'Estructura el layout usando etiquetas Semantic HTML5 (header, main, section, aside) para asegurar una accesibilidad óptima para screen readers.'
      },
      {
        term: 'State Management',
        definition: 'El control y manejo de los datos que cambian en la interfaz (ej. cargando, error, éxito, abierto, cerrado).',
        badPrompt: 'Que el botón cambie cuando le doy clic y espere.',
        proPrompt: 'Define un state management claro usando React hooks para los estados "isLoading", "isSuccess" e "isError" durante el flujo de envío del formulario.'
      },
      {
        term: 'CSS Grid / Flexbox',
        definition: 'Sistemas de layout en CSS. Flexbox es ideal para 1 dimensión (filas o columnas). Grid es para 2 dimensiones (filas y columnas).',
        badPrompt: 'Alinea las cajas una al lado de la otra.',
        proPrompt: 'Utiliza CSS Grid para el layout principal (grid-cols-12) y Flexbox (flex-row, items-center, justify-between) para la alineación de la barra de navegación.'
      },
      {
        term: 'DOM (Document Object Model)',
        definition: 'La representación en árbol de la estructura de una página web, que permite a los lenguajes de programación interactuar con ella.',
        badPrompt: 'Cambia el código de la página.',
        proPrompt: 'Manipula el DOM virtual para actualizar el nodo del componente sin forzar una recarga completa de la vista.'
      },
      {
        term: 'API (Application Programming Interface)',
        definition: 'Conjunto de reglas que permite que dos aplicaciones se comuniquen entre sí (ej. el frontend pidiendo datos al backend).',
        badPrompt: 'Conecta la app con los datos.',
        proPrompt: 'Consume la API RESTful para popular el estado del componente con los datos asíncronos del backend.'
      },
      {
        term: 'XSS (Cross-Site Scripting)',
        definition: 'Vulnerabilidad de seguridad donde un atacante inyecta scripts maliciosos en páginas web vistas por otros usuarios. Crucial sanitizar inputs.',
        badPrompt: 'Muestra en pantalla lo que el usuario escribió en el input.',
        proPrompt: 'Asegúrate de sanitizar el input del usuario antes de renderizarlo en el DOM para prevenir ataques XSS, utilizando DOMPurify o el escape automático de React.'
      },
      {
        term: 'CSRF (Cross-Site Request Forgery)',
        definition: 'Ataque que fuerza a un usuario final a ejecutar acciones no deseadas en una aplicación web en la que está autenticado.',
        badPrompt: 'Haz que el botón envíe el dinero a la cuenta.',
        proPrompt: 'Implementa protección CSRF en el formulario de transferencia, asegurando que se envíe y valide un token anti-CSRF en las cabeceras de la petición POST.'
      },
      {
        term: 'Lazy Loading',
        definition: 'Patrón de diseño que retrasa la carga de recursos no críticos (imágenes, componentes) hasta que son necesarios (ej. al hacer scroll).',
        badPrompt: 'Carga todas las imágenes de la galería rápido.',
        proPrompt: 'Implementa lazy loading nativo (loading="lazy") para las imágenes debajo del fold y usa React.lazy() para cargar el componente del modal solo cuando se abra.'
      },
      {
        term: 'Hydration',
        definition: 'El proceso en SSR (Server-Side Rendering) donde el HTML estático enviado por el servidor se convierte en una aplicación React interactiva en el cliente.',
        badPrompt: 'Haz que la página cargue rápido y ya.',
        proPrompt: 'Asegura que no haya hydration mismatches entre el servidor y el cliente; evita renderizar fechas relativas (ej. "hace 5 min") hasta que el componente esté montado.'
      },
      {
        term: 'Input Validation & Sanitization',
        definition: 'Validar (comprobar que el formato es correcto) y sanitizar (limpiar caracteres peligrosos) los datos introducidos por el usuario.',
        badPrompt: 'Pon un campo para el email y guárdalo.',
        proPrompt: 'Implementa validación de cliente con Zod para el esquema del email, y asegúrate de que el backend realice una sanitización estricta antes de guardar en la DB.'
      },
      {
        term: 'Content Security Policy (CSP)',
        definition: 'Capa de seguridad adicional que ayuda a detectar y mitigar ciertos tipos de ataques, incluyendo XSS y ataques de inyección de datos.',
        badPrompt: 'Pon seguridad a la página.',
        proPrompt: 'Configura los headers HTTP con una Content Security Policy (CSP) estricta que solo permita cargar scripts de nuestro propio dominio (self) y bloquee eval().'
      },
      {
        term: 'Code Refactoring / Translation',
        definition: 'El proceso de reestructurar código existente sin cambiar su comportamiento, como migrar de HTML/CSS puro a componentes de React con Tailwind CSS.',
        badPrompt: 'Pasa este código a React.',
        proPrompt: 'Refactoriza este HTML/CSS estático a componentes funcionales de React. Extrae los estilos a utilidades de Tailwind CSS y separa los elementos repetitivos en sub-componentes.'
      }
    ]
  },
  'integration': {
    title: 'UX/UI + FE + AI',
    description: 'Conceptos avanzados donde el diseño, el código y la inteligencia artificial (IA Agéntica) convergen.',
    terms: [
      {
        term: 'Agentic AI (IA Agéntica)',
        definition: 'Sistemas de IA que no solo responden preguntas, sino que planifican, toman decisiones y ejecutan flujos de trabajo (ej. un agente que diseña, programa y despliega de forma autónoma).',
        badPrompt: 'Haz que la IA programe toda la web sola.',
        proPrompt: 'Diseña una arquitectura basada en Agentic AI donde el agente de UX defina la estructura y el agente de Frontend genere y valide los componentes en React.'
      },
      {
        term: 'Agent Skills',
        definition: 'Capacidades o herramientas específicas (uso de APIs, ejecución de terminal, lectura de repositorios) que se otorgan a un agente de IA para interactuar con el entorno de desarrollo o diseño.',
        badPrompt: 'Dile a la IA que mire el diseño y lo suba a internet.',
        proPrompt: 'Configura las Agent Skills necesarias: proporciona acceso a la API de Figma para leer tokens y permisos de CLI para que el agente ejecute el build del frontend.'
      },
      {
        term: 'Autonomous Handoff',
        definition: 'Proceso donde agentes de IA traducen automáticamente las especificaciones de diseño visual a código de producción, manteniendo la sincronización entre diseño y desarrollo.',
        badPrompt: 'Pasa el diseño a los programadores para que lo monten.',
        proPrompt: 'Establece un pipeline de Autonomous Handoff donde el agente detecte cambios en los componentes de Figma y abra un Pull Request con el código actualizado en Tailwind.'
      },
      {
        term: 'Component-Driven Development (CDD)',
        definition: 'Metodología de desarrollo que construye UIs de abajo hacia arriba, empezando por componentes atómicos hasta llegar a páginas completas.',
        badPrompt: 'Hazme la página de inicio completa.',
        proPrompt: 'Adopta una arquitectura component-driven. Primero, genera los componentes atómicos Button e Input, luego compónlos en una molécula SearchBar.'
      },
      {
        term: 'Utility-First CSS',
        definition: 'Enfoque de estilos (como Tailwind CSS) donde se construyen diseños complejos combinando clases de utilidad de bajo nivel directamente en el HTML.',
        badPrompt: 'Ponle estilos CSS bonitos al botón.',
        proPrompt: 'Estiliza el componente usando un enfoque utility-first con Tailwind CSS. Evita archivos CSS personalizados. Usa clases como px-4 py-2 bg-black text-white.'
      },
      {
        term: 'Design-to-Code',
        definition: 'El proceso automatizado o semi-automatizado de traducir diseños visuales (Figma) a código funcional (React/HTML).',
        badPrompt: 'Pasa este diseño a código.',
        proPrompt: 'Ejecuta una traducción design-to-code para este layout. Mapea las propiedades de auto-layout de Figma directamente a utilidades flexbox de Tailwind.'
      },
      {
        term: 'Headless UI',
        definition: 'Librerías de componentes que proveen toda la lógica y accesibilidad, pero cero estilos, permitiendo control total del diseño visual.',
        badPrompt: 'Usa un dropdown que ya venga hecho pero cámbiale el color.',
        proPrompt: 'Implementa el dropdown usando un enfoque Headless UI (ej. primitivas de Radix UI) y estilízalo completamente con nuestros design tokens personalizados de Tailwind.'
      },
      {
        term: 'Design Tokens to CSS Variables',
        definition: 'El puente técnico entre los tokens de diseño (Figma) y la implementación en código mediante variables nativas de CSS.',
        badPrompt: 'Pon los colores del manual de marca en el código.',
        proPrompt: 'Mapea los design tokens del JSON exportado a CSS Custom Properties en el :root, y configúralos en el theme de tailwind.config.js para uso global.'
      },
      {
        term: 'Storybook / Component Library',
        definition: 'Herramienta para el desarrollo de UI que permite construir y aislar componentes fuera de la lógica principal de la aplicación.',
        badPrompt: 'Haz un archivo con todos los botones para verlos.',
        proPrompt: 'Genera la estructura de historias (stories) en formato CSF3 para Storybook, documentando todas las variantes (primary, secondary, disabled) del componente Button.'
      },
      {
        term: 'SVG Optimization',
        definition: 'Limpieza y reducción de código en gráficos vectoriales para mejorar el rendimiento y permitir la manipulación mediante CSS.',
        badPrompt: 'Pon este icono SVG en la web.',
        proPrompt: 'Optimiza el SVG eliminando etiquetas <defs> innecesarias, cambia los fill="black" por fill="currentColor" para heredar el color del texto, y conviértelo a un componente React.'
      }
    ]
  }
};
