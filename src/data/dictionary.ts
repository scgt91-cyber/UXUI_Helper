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
    description: 'Diccionario estándar de elementos de interfaz, incluyendo los componentes nativos de macOS (Apple HIG). Conocer el nombre exacto de cada componente es el primer paso para construir un Design System robusto y pedir interfaces precisas a la IA.',
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
        term: 'Divider vs. Separator vs. Rule',
        definition: 'Tres implementaciones del mismo concepto: Divider es el componente que separa bloques de contenido; Separator es la primitiva accesible de librerías como Radix UI; Rule es el elemento HTML semántico <hr> para separación temática.',
        badPrompt: 'Pon una raya gris para separar las dos secciones.',
        proPrompt: 'Separa secciones con un Divider (border-b + border-gray-200 + my-4). Para separación temática usa el elemento <hr /> (Rule) y para agrupación visual accesible usa el componente Separator de Radix.',
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
      },
      {
        term: 'Pagination',
        definition: 'La navegación por páginas que divide un conjunto grande de resultados o contenido en páginas numeradas más pequeñas, con controles anterior/siguiente.',
        badPrompt: 'Pon botones para pasar las páginas de la lista.',
        proPrompt: 'Implementa un componente Pagination mostrando las páginas alrededor de la actual (window), con botones prev/next y estados disabled en los extremos.',
        group: 'Navegación (Web)'
      },
      {
        term: 'Scrollspy',
        definition: 'Un mecanismo que detecta qué sección del contenido es visible en el viewport y resalta automáticamente el item de navegación correspondiente.',
        badPrompt: 'Que el menú se marque solo según dónde haga scroll.',
        proPrompt: 'Implementa un Scrollspy usando IntersectionObserver para resaltar el enlace activo del submenú cuando su sección entre en el centro del viewport.',
        group: 'Navegación (Web)'
      },
      {
        term: 'Hamburger Menu (Nav Drawer)',
        definition: 'Un botón de tres líneas horizontales que abre un panel de navegación deslizante, típicamente en móviles o cuando el espacio es reducido.',
        badPrompt: 'Pon el menú clásico de tres rayitas para el móvil.',
        proPrompt: 'Convierte la navegación en un Hamburger Menu en los breakpoints móviles: el botón abre un Nav Drawer desde la izquierda con scrim y cierre al hacer clic fuera (z-index alto).',
        group: 'Navegación (Web)'
      },
      {
        term: 'Site Header vs. Navigation Bar',
        definition: 'El Site Header es la zona superior que agrupa branding, buscador y acciones de sesión; la Navigation Bar es la barra de enlaces de navegación, que puede vivir dentro o debajo del header.',
        badPrompt: 'Haz la barra de arriba con el logo y los links.',
        proPrompt: 'Distingue el Site Header (branding, CTA y estado de sesión) de la Navigation Bar (enlaces principales) con una jerarquía clara en dos niveles.',
        group: 'Navegación (Web)'
      },
      {
        term: 'Command Palette',
        definition: 'Un buscador global que se abre con un atajo de teclado (Cmd/Ctrl+K) y permite ejecutar comandos o navegar a cualquier parte de la app escribiendo texto.',
        badPrompt: 'Pon un buscador bonito con Ctrl+K para navegar por la app.',
        proPrompt: 'Implementa una Command Palette con Cmd+K, autofoco en el input, navegación con flechas + Enter y resultados agrupados por categorías (Acciones, Navegación).',
        group: 'Navegación (Web)'
      },
      {
        term: 'The Three Dots (Overflow Menu)',
        definition: 'Un icono de tres puntos (vertical u horizontal) que oculta acciones secundarias o menos frecuentes en un menú desplegable, reduciendo la carga visual.',
        badPrompt: 'Pon tres puntitos donde estén las demás opciones.',
        proPrompt: 'Agrupa las acciones secundarias en un Overflow Menu (tres puntos) y mantén solo las 2-3 acciones principales visibles en la superficie.',
        group: 'Navegación (Web)'
      },
      {
        term: 'Form Field',
        definition: 'La unidad básica de un formulario: un campo con su label asociado, input, hint de ayuda y estados de validación (error, éxito, disabled).',
        badPrompt: 'Haz los campos del formulario con sus letreritos.',
        proPrompt: 'Construye cada Form Field como un componente con label asociado (htmlFor), mensaje de ayuda, estado de error y mensaje de validación accesible (aria-describedby).',
        group: 'Formularios e Inputs (Web)'
      },
      {
        term: 'Search Field (Web)',
        definition: 'Un campo de texto dedicado a buscar, con icono de lupa, placeholder claro y a menudo tecla Escape para limpiar y un botón de borrado.',
        badPrompt: 'Pon un cajón de búsqueda arriba.',
        proPrompt: 'Añade un Search Field con icono de lupa, botón de limpiar (×) que aparece al escribir y soporte para la tecla "/" que lo enfoca.',
        group: 'Formularios e Inputs (Web)'
      },
      {
        term: 'Sign-in Form',
        definition: 'Un formulario de inicio de sesión que normalmente incluye email/username, contraseña (con mostrar/ocultar), "recordarme", recuperación de contraseña y un CTA principal.',
        badPrompt: 'Haz la página de login con usuario y contraseña.',
        proPrompt: 'Diseña un Sign-in Form con validación en vivo, toggle mostrar/ocultar contraseña, autocomplete correcto (name/autocomplete) y un único CTA primario centrado.',
        group: 'Formularios e Inputs (Web)'
      },
      {
        term: 'Date Picker',
        definition: 'Un control que permite seleccionar una fecha (y a veces hora) mediante un calendario visual, con la entrada manual por teclado como alternativa.',
        badPrompt: 'Pon un calendario para elegir el día.',
        proPrompt: 'Implementa un Date Picker con calendario mensual, navegación por teclado (flechas, Enter) y entrada manual con formato dd/mm/aaaa validado.',
        group: 'Formularios e Inputs (Web)'
      },
      {
        term: 'Combobox (Autocomplete / Typeahead)',
        definition: 'Un campo de texto que combina input libre con una lista de sugerencias que se filtra mientras se escribe (autocomplete).',
        badPrompt: 'Pon un buscador que vaya sugiriendo mientras escribes.',
        proPrompt: 'Crea un Combobox accesible: input con aria-expanded, lista de opciones filtrada en tiempo real y soporte de flechas + Enter para seleccionar.',
        group: 'Formularios e Inputs (Web)'
      },
      {
        term: 'Multi-select',
        definition: 'Un control de selección que permite elegir varias opciones de una lista, mostrando los valores seleccionados como chips eliminables o una lista apilada.',
        badPrompt: 'Que se puedan elegir varias cosas de la lista.',
        proPrompt: 'Implementa un Multi-select donde cada selección aparezca como un chip eliminable, con menú desplegable de opciones y búsqueda dentro.',
        group: 'Formularios e Inputs (Web)'
      },
      {
        term: 'Switch vs. Checkbox vs. Radio',
        definition: 'Switch: activa o desactiva algo con efecto inmediato (binario). Checkbox: marca una opción independiente sin efecto inmediato. Radio: elige una opción dentro de un grupo mutuamente excluyente.',
        badPrompt: 'Pon interruptores para las opciones de la encuesta.',
        proPrompt: 'Usa Switch para activar ajustes en vivo, Checkboxes para selecciones independientes y Radios (no checkboxes) para opciones excluyentes como el método de pago.',
        group: 'Formularios e Inputs (Web)'
      },
      {
        term: 'Toggle Group (Segmented Control)',
        definition: 'Un grupo de botones unidos en una sola barra que permiten alternar entre vistas o filtros, mostrando una sola opción activa a la vez.',
        badPrompt: 'Pon botoncitos juntos para cambiar entre vista lista y cuadrícula.',
        proPrompt: 'Crea un Toggle Group con dos opciones (Vista Lista / Vista Grid) donde la activa tenga fondo destacado y contraste suficiente (WCAG AA).',
        group: 'Formularios e Inputs (Web)'
      },
      {
        term: 'Resize Handle',
        definition: 'El punto o borde arrastrable en la esquina o el borde de un elemento que permite redimensionarlo, típicamente paneles o áreas de texto.',
        badPrompt: 'Que se pueda agrandar la caja arrastrándola.',
        proPrompt: 'Añade un Resize Handle (cursor col-resize) entre el sidebar y el contenido para ajustar el ancho del panel, respetando min/max-width.',
        group: 'Formularios e Inputs (Web)'
      },
      {
        term: 'Insertion Caret',
        definition: 'La línea vertical parpadeante que indica dónde se insertará el texto que se escribe dentro de un campo o editor.',
        badPrompt: 'Haz que se vea dónde estoy escribiendo.',
        proPrompt: 'Asegura que el Insertion Caret sea visible con alto contraste dentro del campo, especialmente en estado de foco (:focus).',
        group: 'Formularios e Inputs (Web)'
      },
      {
        term: 'Bento Grid',
        definition: 'Un layout de cuadrícula asimétrico inspirado en las Bento Boxes japonesas donde las celdas tienen tamaños variados, creando composiciones visuales ricas.',
        badPrompt: 'Haz una cuadrícula bonita con cajas de distintos tamaños.',
        proPrompt: 'Compón un Bento Grid con CSS Grid (grid-cols-4) donde la celda principal ocupe 2x2 y el resto tengan tamaños irregulares y equilibrados.',
        group: 'Contenedores y Layout (Web)'
      },
      {
        term: 'Masonry Layout',
        definition: 'Un layout de columnas de igual ancho pero altura variable, donde los elementos se apilan sin huecos verticales, como en Pinterest.',
        badPrompt: 'Haz una galería de imágenes estilo Pinterest.',
        proPrompt: 'Implementa un Masonry Layout con CSS columns (column-count: 3) para que las tarjetas de alturas distintas fluyan sin espacios en blanco.',
        group: 'Contenedores y Layout (Web)'
      },
      {
        term: 'Split View (Web)',
        definition: 'Un layout donde el viewport se divide en dos o más paneles independientes (ej. lista + detalle) separados por un divisor.',
        badPrompt: 'Haz la página con lista a la izquierda y detalle a la derecha.',
        proPrompt: 'Implementa un Split View con dos paneles (master-detail) en grid-cols-[320px_1fr], con divisor entre ambos y versión móvil en pila vertical.',
        group: 'Contenedores y Layout (Web)'
      },
      {
        term: 'Modal Dialog vs. Drawer vs. Sheet',
        definition: 'Modal Dialog: ventana centrada que bloquea la página. Drawer: panel lateral deslizante. Sheet: panel que emerge desde el borde inferior (móvil) o lateral. Los tres usan un scrim.',
        badPrompt: 'Pon una ventana encima para los filtros.',
        proPrompt: 'Usa un Drawer lateral para filtros avanzados, un Sheet inferior para selecciones rápidas en móvil y un Modal Dialog centrado solo para acciones críticas que requieran confirmación.',
        group: 'Overlays y Superficies (Web)'
      },
      {
        term: 'Lightbox',
        definition: 'Un overlay que muestra una imagen (o galería) ampliada sobre la página, con el fondo oscurecido para enfocar la atención.',
        badPrompt: 'Que la foto se agrande al hacer clic con el fondo oscuro.',
        proPrompt: 'Implementa un Lightbox con teclas (Esc para cerrar, flechas para navegar), botón de zoom y un scrim oscurecido con blur.',
        group: 'Overlays y Superficies (Web)'
      },
      {
        term: 'Hover Card',
        definition: 'Una tarjeta informativa contextual que aparece al hacer hover sobre un enlace o elemento, con una breve ventana de activación para evitar parpadeos.',
        badPrompt: 'Que al pasar el ratón salga una cajita con información.',
        proPrompt: 'Crea un Hover Card con delay de apertura/cierre (openDelay 300ms) para evitar flicker y posicionamiento respecto al elemento ancla.',
        group: 'Overlays y Superficies (Web)'
      },
      {
        term: 'Scrim (Backdrop)',
        definition: 'La capa semitransparente oscura (o desenfocada) que cubre el resto de la interfaz para destacar el contenido superpuesto y bloquear la interacción.',
        badPrompt: 'Oscurece el fondo cuando salga el menú lateral.',
        proPrompt: 'Añade un Scrim (fixed inset-0 bg-black/40) tras el drawer con un clic para cerrar y un efecto de fundido en la entrada y salida.',
        group: 'Overlays y Superficies (Web)'
      },
      {
        term: 'Alert',
        definition: 'Un mensaje destacado que comunica información importante sobre el estado del sistema (éxito, error, advertencia) y puede incluir una acción.',
        badPrompt: 'Pon un aviso de color cuando algo falle.',
        proPrompt: 'Usa un Alert de tipo destructive con icono, título y mensaje claro, más un enlace o botón de acción cuando el error tenga solución.',
        group: 'Feedback y Estados (Web)'
      },
      {
        term: 'Inline Alert vs. Callout vs. Banner',
        definition: 'Inline Alert: mensaje junto al contenido afectado (validación de campos). Callout: bloque destacado sobre información contextual. Banner: franja persistente a nivel de página o app.',
        badPrompt: 'Pon avisos para cuando falten datos.',
        proPrompt: 'Muestra un Inline Alert bajo el campo con error, un Callout para notas de contexto y un Banner superior solo para avisos globales (ej. mantenimiento).',
        group: 'Feedback y Estados (Web)'
      },
      {
        term: 'Empty State',
        definition: 'La pantalla o zona que se muestra cuando no hay datos o contenido aún, con un mensaje claro y una acción para resolver la situación.',
        badPrompt: '¿Qué pongo cuando no hay resultados?',
        proPrompt: 'Diseña un Empty State con icono, mensaje breve, sugerencia útil y un CTA de acción principal (ej. "Añadir primer proyecto").',
        group: 'Feedback y Estados (Web)'
      },
      {
        term: 'Skeleton vs. Spinner',
        definition: 'Skeleton: placeholder con la silueta exacta del contenido que aparece durante la carga. Spinner: icono giratorio genérico. El skeleton comunica mejor la estructura final y reduce la percepción de espera.',
        badPrompt: 'Pon un relojito de carga mientras carga la página.',
        proPrompt: 'Usa un Skeleton con la silueta exacta de las tarjetas mientras cargan los datos, y reserva el Spinner para acciones concretas (enviar, descargar).',
        group: 'Feedback y Estados (Web)'
      },
      {
        term: 'Progress Ring vs. Spinner vs. Progress Bar',
        definition: 'Progress Ring: círculo con un arco que muestra un porcentaje real de avance. Spinner: indica actividad sin porcentaje. Progress Bar: barra lineal que muestra el progreso de una tarea.',
        badPrompt: 'Pon una barrita que se vaya llenando al subir el archivo.',
        proPrompt: 'Usa un Progress Bar (o Ring) con el valor real del porcentaje para la subida de archivos, y un Spinner para estados indeterminados donde no se conoce la duración.',
        group: 'Feedback y Estados (Web)'
      },
      {
        term: 'Carousel',
        definition: 'Un carrusel de contenido (imágenes, tarjetas, testimonios) que se desplaza horizontalmente con flechas, indicadores de posición y a menudo autoplay.',
        badPrompt: 'Pon un carrusel de fotos que pase solo.',
        proPrompt: 'Implementa un Carousel con scroll-snap, flechas e indicadores de posición; evita el autoplay o inclúyelo con pausa en hover y controles visibles.',
        group: 'Selección y Controles (Web)'
      },
      {
        term: 'Drag & Drop',
        definition: 'Interacción que permite arrastrar un elemento (drag) y soltarlo (drop) en otra zona para moverlo, reordenarlo o cargarlo.',
        badPrompt: 'Que las tarjetas se puedan arrastrar para ordenarlas.',
        proPrompt: 'Implementa Drag & Drop con estados visuales claros: el item arrastrado con sombra, la zona de drop destacada y feedback al soltar (éxito/error).',
        group: 'Selección y Controles (Web)'
      },
      {
        term: 'Steps',
        definition: 'Un componente de proceso que muestra las etapas de un flujo lineal (paso 1, 2, 3...) con estados completado, activo y pendiente.',
        badPrompt: 'Haz el proceso de registro por pasos.',
        proPrompt: 'Usa Steps con indicadores de estado (completado/actual/pendiente), navegación prev/next validada y persistencia del progreso entre pasos.',
        group: 'Selección y Controles (Web)'
      },
      {
        term: 'Avatar Group',
        definition: 'Un conjunto de avatares apilados y solapados que representa a varios usuarios, a menudo con un contador "+3" para los restantes.',
        badPrompt: 'Pon las fotos de los usuarios juntas.',
        proPrompt: 'Crea un Avatar Group con avatares solapados (negative margin), borde del color de fondo y un último avatar con el contador de usuarios restantes.',
        group: 'Selección y Controles (Web)'
      },
      {
        term: 'Parallax Scrolling',
        definition: 'Efecto donde las capas de fondo se mueven a una velocidad distinta que el contenido en primer plano al hacer scroll, creando profundidad.',
        badPrompt: 'Haz que la imagen de fondo se mueva más lento que el resto.',
        proPrompt: 'Implementa Parallax con transform: translateY basado en el scroll (translate3d para rendimiento), solo en desktop y respetando prefers-reduced-motion.',
        group: 'Movimiento y Animaciones (Web)'
      },
      {
        term: 'Spring Animation',
        definition: 'Animación física que imita un muelle (spring) con rebote y elasticidad natural, definida por masa, rigidez y fricción en vez de una duración fija.',
        badPrompt: 'Ponle un rebote chulo al abrir el menú.',
        proPrompt: 'Usa una spring animation (ej. framer-motion: type: "spring", stiffness 300, damping 30) para la entrada de elementos, evitando rebotes excesivos en interfaces de trabajo.',
        group: 'Movimiento y Animaciones (Web)'
      },
      {
        term: 'Easing (Timing Function)',
        definition: 'La curva que define cómo acelera o desacelera una animación a lo largo de su duración (linear, ease-in, ease-out, ease-in-out, cubic-bezier).',
        badPrompt: 'Que la animación se vea fluida.',
        proPrompt: 'Aplica easing ease-out para entradas (aceleración rápida, frenada suave) y ease-in-out para movimientos de ida y vuelta; documenta la curva cubic-bezier.',
        group: 'Movimiento y Animaciones (Web)'
      },
      {
        term: 'Text Scramble',
        definition: 'Un efecto de texto donde los caracteres parecen "descifrarse" aleatoriamente hasta revelar la palabra final, usado para efectos de estilo hacker o futurista.',
        badPrompt: 'Haz un efecto de texto tipo Matrix.',
        proPrompt: 'Crea un Text Scramble con caracteres aleatorios que se resuelven progresivamente hasta la palabra destino, con ~50ms por frame y pausa en hover.',
        group: 'Movimiento y Animaciones (Web)'
      },
      {
        term: 'Marquee',
        definition: 'Una banda de contenido (texto, logos) que se desplaza horizontalmente de forma continua e infinita, muy usada en secciones de logos o anuncios.',
        badPrompt: 'Pon una cinta de logos que se mueva sola.',
        proPrompt: 'Implementa un Marquee con animación CSS (translateX de 0 a -50%) sobre contenido duplicado, con pausa al hacer hover y respeto a prefers-reduced-motion.',
        group: 'Movimiento y Animaciones (Web)'
      },
      {
        term: 'Sticky vs. Fixed Positioning',
        definition: 'Sticky: el elemento permanece en el flujo del documento y se "pega" a la pantalla cuando su contenedor lo cruza. Fixed: el elemento queda fijo respecto al viewport, independiente del scroll.',
        badPrompt: 'Que el header se quede arriba al hacer scroll.',
        proPrompt: 'Usa position: sticky (top-0) para el header que debe seguir dentro de su sección, y position: fixed solo para elementos globales como un botón flotante o un overlay.',
        group: 'Movimiento y Animaciones (Web)'
      },
      {
        term: 'Truncation (Ellipsis & Line Clamp)',
        definition: 'El recorte de texto largo con puntos suspensivos (…) cuando supera el ancho o el número de líneas permitidas, mediante overflow-hidden, text-overflow y line-clamp.',
        badPrompt: 'Que el título largo no rompa el diseño.',
        proPrompt: 'Trunca el título con truncate (una línea) y el párrafo con line-clamp-2, añadiendo el atributo title o un tooltip con el texto completo.',
        group: 'Tipografía y Texto (Web)'
      },
      {
        term: 'Focus Ring (:focus-visible)',
        definition: 'El anillo visible que rodea a un elemento enfocado con teclado (pero no necesariamente con ratón) para indicar la posición del foco, aplicado con la pseudo-clase :focus-visible.',
        badPrompt: 'Ponle un borde cuando se seleccione el botón.',
        proPrompt: 'Aplica un Focus Ring con :focus-visible (ring-2 ring-v-blue ring-offset-2) a los elementos interactivos, garantizando navegación por teclado visible y cumpliendo WCAG 2.4.7.',
        group: 'Cursor e Interacción (Web)'
      },
      {
        term: 'Menu Bar',
        definition: 'La barra de menús del sistema en la parte superior de la pantalla (File, Edit, View, Window, Help), disponible en todo momento aunque cambies de app.',
        badPrompt: 'Pon los menús de Mac arriba en la app.',
        proPrompt: 'Usa la Menu Bar nativa del sistema (no una barra propia de la app) para comandos estándar como File/Edit/View, y reserva el toolbar para acciones contextuales.',
        group: 'Menús y Navegación (macOS)'
      },
      {
        term: 'Menu Bar Extra (Status Item)',
        definition: 'Iconos y controles que viven en el lado derecho de la Menu Bar del sistema (junto al reloj), como Wi-Fi, batería o los utilitarios de apps (NSStatusItem).',
        badPrompt: 'Pon un iconito arriba a la derecha en la barra de menús.',
        proPrompt: 'Implementa un Menu Bar Extra (NSStatusItem) con un icono template, un menú desplegable y actualización del estado mediante observer.',
        group: 'Menús y Navegación (macOS)'
      },
      {
        term: 'Context Menu',
        definition: 'Un menú que aparece al hacer clic con el botón derecho (o Ctrl+clic) sobre un elemento y muestra acciones contextuales específicas de ese objeto.',
        badPrompt: 'Pon las opciones al hacer clic derecho.',
        proPrompt: 'Añade un Context Menu con las acciones relevantes al objeto seleccionado (Copiar, Renombrar, Eliminar), sin duplicar las que ya están en el menú de acciones.',
        group: 'Menús y Navegación (macOS)'
      },
      {
        term: 'Sidebar (Source List)',
        definition: 'En macOS, el panel lateral que agrupa la navegación por secciones jerárquicas y desplegables (Source List), como en Finder o Mail, con items que pueden expandirse.',
        badPrompt: 'Haz la barra lateral de la app como la del Finder.',
        proPrompt: 'Construye una Sidebar estilo Source List con secciones plegables, iconos y badge de recuento por item, en un panel de ancho fijo con divider.',
        group: 'Menús y Navegación (macOS)'
      },
      {
        term: 'Column View (Browser)',
        definition: 'El modo de navegación del Finder donde cada nivel de la jerarquía se muestra en una columna a la derecha de la anterior (NSBrowser).',
        badPrompt: 'Haz el navegador de archivos con columnas.',
        proPrompt: 'Implementa una Column View (NSBrowser) donde seleccionar un item de una columna abra la siguiente, ideal para jerarquías con muchos niveles.',
        group: 'Menús y Navegación (macOS)'
      },
      {
        term: 'Outline View',
        definition: 'Una lista jerárquica expandible con items que contienen sub-items, mostrada con filas indentadas y disclosure triangles (NSOutlineView).',
        badPrompt: 'Haz una lista de carpetas con flechitas para desplegar.',
        proPrompt: 'Usa un Outline View (NSOutlineView) para la estructura jerárquica de datos, con filas indentadas y disclosure triangles para expandir/colapsar.',
        group: 'Menús y Navegación (macOS)'
      },
      {
        term: 'Disclosure Triangle',
        definition: 'El pequeño triángulo que apunta a la derecha cuando está cerrado y hacia abajo cuando está abierto, usado para expandir y colapsar secciones o jerarquías.',
        badPrompt: 'Pon una flechita para desplegar los subapartados.',
        proPrompt: 'Añade un Disclosure Triangle a cada fila con hijos, animando la rotación del icono (90°) y mostrando u ocultando el contenido con transición suave.',
        group: 'Menús y Navegación (macOS)'
      },
      {
        term: 'Mac Window',
        definition: 'El contenedor principal de una app en macOS, que incluye la title bar con los traffic lights, el toolbar y el área de contenido (content view).',
        badPrompt: 'Haz la ventana de la app con su barrita de arriba.',
        proPrompt: 'Diseña la Mac Window con title bar nativa (traffic lights), toolbar opcional y un content view que respete los insets del sistema.',
        group: 'Ventanas y Sistema (macOS)'
      },
      {
        term: 'Traffic Lights',
        definition: 'Los tres botones de color de la esquina superior izquierda de cada ventana macOS: rojo (cerrar), amarillo (minimizar) y verde (maximizar/fullscreen).',
        badPrompt: 'Pon los tres botoncitos de colores de Mac en la ventana.',
        proPrompt: 'Respeta los Traffic Lights nativos: no los reemplaces en la web; en apps nativas mantenlos en su posición estándar con los atajos Cmd+W/Cmd+M/Cmd+F.',
        group: 'Ventanas y Sistema (macOS)'
      },
      {
        term: 'Toolbar (Unified Title Bar)',
        definition: 'La barra integrada bajo la title bar de una ventana macOS que agrupa acciones principales, ajustes de vista y controles; en diseño unificado se fusiona con el título.',
        badPrompt: 'Pon una barra de acciones debajo del título de la ventana.',
        proPrompt: 'Configura el toolbar en modo unified (titlebarAppearsTransparent) con NSToolbar, incluyendo items principales y un overflow para los secundarios.',
        group: 'Ventanas y Sistema (macOS)'
      },
      {
        term: 'Visual Effect Material (Vibrancy)',
        definition: 'Los materiales translúcidos y difuminados de macOS (NSVisualEffectView) que aplican un desenfoque adaptativo al contenido subyacente, como en sidebar y panels.',
        badPrompt: 'Haz que el panel tenga el fondo borroso de Mac.',
        proPrompt: 'Aplica un Visual Effect Material (NSVisualEffectView) de tipo sidebar para el panel lateral, con el contenido adaptándose automáticamente a light/dark mode.',
        group: 'Ventanas y Sistema (macOS)'
      },
      {
        term: 'Inspector',
        definition: 'Un panel lateral (normalmente a la derecha) que muestra propiedades y controles para el elemento seleccionado, como en Xcode o Numbers.',
        badPrompt: 'Pon un panel a la derecha con las propiedades.',
        proPrompt: 'Implementa un Inspector con pestañas contextuales según la selección, agrupado por secciones (Estilo, Disposición, Datos) con disclosure headers.',
        group: 'Ventanas y Sistema (macOS)'
      },
      {
        term: 'Panel (Floating Window)',
        definition: 'Una ventana flotante auxiliar (NSPanel) que complementa a la ventana principal, como la paleta de colores, y puede estar siempre por delante de ella.',
        badPrompt: 'Haz una ventanita flotante para las herramientas.',
        proPrompt: 'Crea un Panel flotante (NSPanel) con estilo utility que se mantenga sobre la ventana principal y desaparezca al hacer clic fuera cuando sea no modal.',
        group: 'Ventanas y Sistema (macOS)'
      },
      {
        term: 'Sheet',
        definition: 'En macOS, una ventana secundaria que se desliza desde la parte superior de la ventana padre y bloquea la interacción con ella hasta que se cierra (modal atado a la ventana).',
        badPrompt: 'Pon una ventanita que salga de arriba de la ventana.',
        proPrompt: 'Usa un Sheet para acciones modales ligadas a la ventana (guardar cambios), presentándolo con el estilo nativo y el botón de cierre correcto.',
        group: 'Ventanas y Sistema (macOS)'
      },
      {
        term: 'Save Panel',
        definition: 'El diálogo del sistema para guardar un archivo, que permite elegir ubicación, nombre y formato, pudiendo expandirse a un selector de archivos completo.',
        badPrompt: 'Haz el cuadro de guardar archivo con carpeta y nombre.',
        proPrompt: 'Utiliza el Save Panel nativo (NSSavePanel) con una extensión de archivo por defecto, permitiendo la vista expandida del selector de archivos.',
        group: 'Ventanas y Sistema (macOS)'
      },
      {
        term: 'Scroll View',
        definition: 'El contenedor que permite desplazar contenido que supera el área visible (NSScrollView), con barras de scroll, zoom y control del comportamiento de scroll.',
        badPrompt: 'Que el contenido largo se pueda hacer scroll.',
        proPrompt: 'Envuelve el contenido en un Scroll View (NSScrollView) con overlay scroll bars y soporte para el scroll elástico (rubber-banding) nativo.',
        group: 'Ventanas y Sistema (macOS)'
      },
      {
        term: 'Split View',
        definition: 'El layout que divide el contenido en dos o más paneles (NSSplitView) con divisores arrastrables para ajustar el tamaño de cada uno.',
        badPrompt: 'Divide la ventana en dos partes que se puedan arrastrar.',
        proPrompt: 'Implementa un Split View (NSSplitView) con sidebar izquierdo y contenido principal, permitiendo ajustar el ancho con el divisor y colapsar el sidebar.',
        group: 'Ventanas y Sistema (macOS)'
      },
      {
        term: 'Search Field',
        definition: 'El campo de búsqueda nativo de macOS (NSSearchField) con icono de lupa, recents y un botón de limpiar; de estilo redondeado con borde.',
        badPrompt: 'Pon un campo de búsqueda redondeado.',
        proPrompt: 'Usa un Search Field nativo (NSSearchField) con placeholder, botón de limpiar visible al escribir y lista de búsquedas recientes.',
        group: 'Inputs y Controles (macOS)'
      },
      {
        term: 'Token Field',
        definition: 'Un campo de texto que convierte las entradas confirmadas en "tokens" (chips editables con borde), usado para destinatarios de correo, etiquetas o tags (NSTokenField).',
        badPrompt: 'Un campo donde se pongan etiquetas que se convierten en pastillas.',
        proPrompt: 'Implementa un Token Field (NSTokenField) para añadir destinatarios, donde cada dirección validada se convierta en un token editable que pueda separarse de nuevo.',
        group: 'Inputs y Controles (macOS)'
      },
      {
        term: 'Combo Button',
        definition: 'Un control que combina un menú desplegable con una acción principal: el cuerpo ejecuta la última acción y la flecha abre el menú con todas las opciones (NSComboButton).',
        badPrompt: 'Pon un botón con flechita para elegir opción.',
        proPrompt: 'Crea un Combo Button donde el clic en el cuerpo ejecute la acción por defecto y la flecha despliegue todas las variantes disponibles.',
        group: 'Inputs y Controles (macOS)'
      },
      {
        term: 'Pop-Up Button vs. Pull-Down Button vs. Combo Box',
        definition: 'Pop-Up: muestra la opción seleccionada de un conjunto fijo y cambia al elegir. Pull-Down: ejecuta acciones o navega, manteniendo su título. Combo Box: combina un pop-up con un campo editable.',
        badPrompt: 'Pon un menú desplegable para elegir el idioma.',
        proPrompt: 'Usa un Pop-Up Button para seleccionar una opción persistente (idioma), un Pull-Down para acciones (Exportar >) y un Combo Box cuando la opción deba ser editable.',
        group: 'Inputs y Controles (macOS)'
      },
      {
        term: 'Segmented Control',
        definition: 'Un control de segmentos conectados donde solo uno está activo a la vez, para alternar entre vistas, formatos o valores cercanos (NSSegmentedControl).',
        badPrompt: 'Pon botoncitos unidos para cambiar de vista.',
        proPrompt: 'Usa un Segmented Control (NSSegmentedControl) con los iconos o texto de cada vista y estado seleccionado con alto contraste.',
        group: 'Inputs y Controles (macOS)'
      },
      {
        term: 'Slider',
        definition: 'Un control de arrastre para seleccionar un valor dentro de un rango continuo, con un thumb (tirador) y opcionalmente marcas de escala (NSSlider).',
        badPrompt: 'Pon una barrita que se arrastre para el volumen.',
        proPrompt: 'Implementa un Slider (NSSlider) con mínimo/máximo claros, thumb accesible por teclado (flechas) y etiqueta con el valor actual.',
        group: 'Inputs y Controles (macOS)'
      },
      {
        term: 'Stepper (macOS)',
        definition: 'Un control de dos botones (flecha arriba/abajo o +/−) que incrementa o decrementa un valor numérico de a pasos (NSStepper).',
        badPrompt: 'Pon las flechitas para cambiar el número.',
        proPrompt: 'Empareja un Stepper (NSStepper) con un campo numérico sincronizado, definiendo min/max e incremento y deshabilitando los límites.',
        group: 'Inputs y Controles (macOS)'
      },
      {
        term: 'Color Well',
        definition: 'Un control que muestra el color actual y abre el selector de color del sistema al hacer clic para cambiarlo (NSColorWell).',
        badPrompt: 'Pon un cuadradito de color para cambiarlo.',
        proPrompt: 'Usa un Color Well (NSColorWell) para editar colores de marca, abriendo el color panel nativo y actualizando el token de color en tiempo real.',
        group: 'Inputs y Controles (macOS)'
      },
      {
        term: 'Level Indicator',
        definition: 'Un indicador de nivel que muestra un valor dentro de un rango con relleno continuo o discreto (como el de batería o señal), útil para valores de lectura no editables.',
        badPrompt: 'Pon una barrita de nivel como la de la batería.',
        proPrompt: 'Usa un Level Indicator (NSLevelIndicator) de tipo capacity para mostrar la cantidad consumida, con color crítico cuando el valor supere el umbral.',
        group: 'Inputs y Controles (macOS)'
      },
      {
        term: 'Alert (macOS)',
        definition: 'El diálogo de alerta nativo de macOS (NSAlert) que presenta información o pide una decisión con botones (ej. "Guardar", "Cancelar"), modal respecto a la ventana o la app.',
        badPrompt: 'Pon el aviso de Mac para confirmar el borrado.',
        proPrompt: 'Usa un Alert nativo (NSAlert) para confirmaciones destructivas, con el botón destructivo a la izquierda y el botón por defecto resaltado.',
        group: 'Feedback y Estado (macOS)'
      },
      {
        term: 'Dock Badge',
        definition: 'La insignia roja con número que se muestra sobre el icono de la app en el Dock para notificar la cantidad de avisos pendientes.',
        badPrompt: 'Pon un número rojo en el icono del Dock.',
        proPrompt: 'Actualiza el Dock Badge dinámicamente según los items no leídos y elimínalo (nil) cuando no haya pendientes.',
        group: 'Feedback y Estado (macOS)'
      },
      {
        term: 'Focus Ring',
        definition: 'El anillo azul de foco de macOS que rodea al elemento controlado por teclado, cuyo color varía según el accent color del sistema.',
        badPrompt: 'Marca el campo con un borde azul cuando esté activo.',
        proPrompt: 'Deja que el Focus Ring nativo gestione el foco por teclado (full keyboard access) y no lo ocultes con estilos personalizados.',
        group: 'Feedback y Estado (macOS)'
      },
      {
        term: 'Helvetica',
        definition: 'La tipografía histórica de Apple, utilizada en macOS durante años. Actualmente el sistema usa SF Pro como fuente del sistema, más legible y variable.',
        badPrompt: 'Usa la fuente Helvetica de siempre.',
        proPrompt: 'No fuerces Helvetica: usa la fuente del sistema (SF Pro en macOS, system-ui en web) para aprovechar los estilos variables y la legibilidad nativa.',
        group: 'Tipografía (macOS)'
      },
      {
        term: 'NSBrowser (Column View)',
        definition: 'La clase AppKit que implementa la vista de columnas del Finder para navegar jerarquías de muchos niveles mostrando una columna por nivel.',
        badPrompt: 'Usa la clase de navegador de columnas de AppKit.',
        proPrompt: 'Configura NSBrowser para la navegación por columnas con delegados que sirvan el número de columnas y el contenido de cada una según la selección.',
        group: 'Componentes AppKit (clases NS)'
      },
      {
        term: 'NSOutlineView',
        definition: 'La clase AppKit que renderiza listas jerárquicas expandibles con filas, disclosure triangles e indentación.',
        badPrompt: 'Usa la clase de lista con subitems de AppKit.',
        proPrompt: 'Implementa NSOutlineView con un data source jerárquico, expandiendo por defecto el primer nivel y con drag & drop para reordenar filas.',
        group: 'Componentes AppKit (clases NS)'
      },
      {
        term: 'NSStatusItem',
        definition: 'La clase que añade iconos y menús a la barra de menús del sistema (Menu Bar Extra), visible aunque la app esté oculta.',
        badPrompt: 'Usa la clase para el icono de la barra de menús.',
        proPrompt: 'Crea un NSStatusItem con un icono template (SF Symbol), un menú con acciones y un tooltip descriptivo del estado de la app.',
        group: 'Componentes AppKit (clases NS)'
      },
      {
        term: 'NSDockTile Badge',
        definition: 'La clase que controla la insignia (número) que se muestra sobre el icono de la app en el Dock.',
        badPrompt: 'Usa la clase para el número del Dock.',
        proPrompt: 'Actualiza NSDockTile badgeLabel con el contador de notificaciones y vacíalo ("") cuando la app esté activa.',
        group: 'Componentes AppKit (clases NS)'
      },
      {
        term: 'NSPanel',
        definition: 'La subclase de NSWindow para ventanas auxiliares flotantes (paletas, inspectores) que pueden mantenerse sobre la ventana principal.',
        badPrompt: 'Usa la clase de panel flotante de AppKit.',
        proPrompt: 'Crea un NSPanel con nivel flotante (floating panel), estilo utility y cierre automático al hacer clic fuera si es no modal.',
        group: 'Componentes AppKit (clases NS)'
      },
      {
        term: 'NSPopover',
        definition: 'La clase AppKit que presenta contenido contextual en una burbuja anclada a un elemento, ideal para acciones rápidas sin cambiar de ventana.',
        badPrompt: 'Usa la clase de popover de AppKit.',
        proPrompt: 'Presenta un NSPopover anclado al botón, con contentViewController y comportamiento transient (se cierra al hacer clic fuera).',
        group: 'Componentes AppKit (clases NS)'
      },
      {
        term: 'NSVisualEffectView',
        definition: 'La clase que aplica los materiales translúcidos (vibrancy) de macOS sobre el contenido subyacente.',
        badPrompt: 'Usa la clase del fondo borroso de AppKit.',
        proPrompt: 'Aplica NSVisualEffectView con blendingMode "withinWindow" y material según el estado de la ventana (active/inactive) para el sidebar o el toolbar.',
        group: 'Componentes AppKit (clases NS)'
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
