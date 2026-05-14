import {
  Activity,
  ArrowRight,
  BadgePercent,
  Car,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Cpu,
  Filter,
  Gauge,
  Heart,
  Instagram,
  Languages,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Trophy,
  UserRound,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type Language = 'en' | 'es';

const categoryIds = [
  'performance',
  'exhaust',
  'suspension',
  'wheels',
  'body-kit',
  'brakes',
  'carbon',
  'electronics',
  'filters',
  'engine',
  'car-care',
  'lifestyle',
] as const;

type CategoryId = (typeof categoryIds)[number];

type StockStatus = 'in' | 'low' | 'preorder';

type Product = {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  category: CategoryId;
  price: string;
  originalPrice?: string;
  sale?: boolean;
  stock: StockStatus;
  brand: string;
  compatibility: string[];
  visual: string;
};

type Service = {
  title: string;
  description: string;
};

type PackageTier = {
  title: string;
  subtitle: string;
  features: string[];
};

type Project = {
  title: string;
  services: string;
  tags: string[];
  visual: string;
};

type Translation = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    services: string;
    performance: string;
    projects: string;
    shop: string;
    about: string;
    contact: string;
    consultation: string;
    cart: string;
    account: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    explore: string;
    shop: string;
    quote: string;
    imageAlt: string;
    badges: string[];
    stats: { value: string; label: string }[];
  };
  sectionLabels: {
    servicesEyebrow: string;
    servicesTitle: string;
    servicesBody: string;
    packagesEyebrow: string;
    packagesTitle: string;
    packagesBody: string;
    gainsEyebrow: string;
    gainsTitle: string;
    gainsBody: string;
    shopEyebrow: string;
    shopTitle: string;
    shopBody: string;
    categoriesEyebrow: string;
    categoriesTitle: string;
    projectsEyebrow: string;
    projectsTitle: string;
    whyEyebrow: string;
    whyTitle: string;
    processEyebrow: string;
    processTitle: string;
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    aboutEyebrow: string;
    aboutTitle: string;
    contactEyebrow: string;
    contactTitle: string;
  };
  common: {
    learnMore: string;
    viewProject: string;
    viewDetails: string;
    addToCart: string;
    addAgain: string;
    added: string;
    visitShop: string;
    requestQuote: string;
    requestFitment: string;
    checkoutQuote: string;
    allCategories: string;
    allBrands: string;
    vehiclePlaceholder: string;
    searchPlaceholder: string;
    category: string;
    stock: string;
    compatibility: string;
    sampleResults: string;
    disclaimer: string;
    cartEmpty: string;
    cartTitle: string;
    cartItems: string;
    favorite: string;
    favorited: string;
    accountMessage: string;
    cartMessage: string;
    newsletterSuccess: string;
    sale: string;
    close: string;
    openMenu: string;
    closeMenu: string;
    accountTitle: string;
    accountAction: string;
    projectBrief: string;
    requestSimilarBuild: string;
    wishlistAdded: string;
    wishlistRemoved: string;
    noProducts: string;
    legalMessage: string;
  };
  categoryLabels: Record<CategoryId, string>;
  categoryDescriptions: Record<CategoryId, string>;
  stockLabels: Record<StockStatus, string>;
  services: Service[];
  packages: PackageTier[];
  why: string[];
  process: { step: string; title: string; description: string }[];
  testimonials: { quote: string; name: string }[];
  projects: Project[];
  about: {
    body: string;
    points: string[];
  };
  contact: {
    body: string;
    fields: Record<string, string>;
    serviceOptions: string[];
    submitSuccess: string;
    cards: { label: string; value: string }[];
  };
  footer: {
    slogan: string;
    quickLinks: string;
    services: string;
    shopCategories: string;
    contact: string;
    newsletter: string;
    newsletterBody: string;
    emailPlaceholder: string;
    subscribe: string;
    copyright: string;
    legal: string[];
  };
};

const translations: Record<Language, Translation> = {
  en: {
    meta: {
      title: 'KRKN Garage | Premium Performance Tuning & Parts',
      description:
        'Premium automotive tuning garage for ECU remapping, performance tuning, car modification, body kits, exhaust systems, suspension upgrades and performance parts.',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      performance: 'Performance',
      projects: 'Projects',
      shop: 'Shop',
      about: 'About',
      contact: 'Contact',
      consultation: 'Book a Consultation',
      cart: 'Cart',
      account: 'Account',
    },
    hero: {
      eyebrow: 'KRKN Garage // Premium Tuning & Performance Parts',
      headline: 'Built for Power. Tuned for Precision.',
      subheadline:
        'KRKN Garage delivers premium ECU remapping, performance upgrades, custom body kits, exhaust systems and aftermarket parts for drivers who demand more.',
      explore: 'Explore Services',
      shop: 'Shop Performance Parts',
      quote: 'Request a Quote',
      imageAlt:
        'Modified performance coupe in a dark premium tuning garage with red accent lighting',
      badges: ['ECU Remapping', 'Stage 1-3 Tuning', 'Body Kits', 'Performance Parts', 'Custom Builds'],
      stats: [
        { value: '500+', label: 'Tuned Vehicles' },
        { value: '10+', label: 'Years Experience' },
        { value: 'Stage 1-3', label: 'Performance' },
        { value: 'Premium', label: 'Parts Supply' },
      ],
    },
    sectionLabels: {
      servicesEyebrow: 'Garage Services',
      servicesTitle: 'Precision work for every performance goal.',
      servicesBody:
        'From safe daily-driver calibrations to full custom builds, KRKN Garage combines diagnostics, clean installation standards and performance-focused consultation.',
      packagesEyebrow: 'Performance Packages',
      packagesTitle: 'Choose the stage that matches your build.',
      packagesBody:
        'Every calibration is matched to vehicle condition, hardware, fuel quality and the way you actually drive.',
      gainsEyebrow: 'Tuning Potential',
      gainsTitle: 'Sample estimated power gains.',
      gainsBody:
        'Use these examples as a starting point for your consultation. Final results depend on the car, setup and maintenance history.',
      shopEyebrow: 'Performance Parts',
      shopTitle: 'Shop-ready parts structure for serious builds.',
      shopBody:
        'Browse sample categories, search products, check stock and add parts to a temporary cart ready for checkout integration.',
      categoriesEyebrow: 'Shop Categories',
      categoriesTitle: 'Built around real automotive buying paths.',
      projectsEyebrow: 'Featured Builds',
      projectsTitle: 'Street presence, power and clean fitment.',
      whyEyebrow: 'Why Choose KRKN Garage',
      whyTitle: 'A premium garage experience from quote to delivery.',
      processEyebrow: 'Process',
      processTitle: 'Clear steps. No guesswork.',
      testimonialsEyebrow: 'Client Feedback',
      testimonialsTitle: 'Trusted by drivers who care about the details.',
      aboutEyebrow: 'About KRKN Garage',
      aboutTitle: 'Performance culture with modern garage standards.',
      contactEyebrow: 'Quote Request',
      contactTitle: 'Tell us about your vehicle and goals.',
    },
    common: {
      learnMore: 'Learn More',
      viewProject: 'View Project',
      viewDetails: 'View Details',
      addToCart: 'Add to Cart',
      addAgain: 'Add Again',
      added: 'Added',
      visitShop: 'Visit Shop',
      requestQuote: 'Request a Quote',
      requestFitment: 'Request Fitment Check',
      checkoutQuote: 'Request Checkout Link',
      allCategories: 'All Categories',
      allBrands: 'All Brands',
      vehiclePlaceholder: 'Vehicle compatibility',
      searchPlaceholder: 'Search performance parts',
      category: 'Category',
      stock: 'Stock',
      compatibility: 'Compatibility',
      sampleResults: 'Sample estimated results. Actual gains may vary.',
      disclaimer:
        'Performance results vary depending on vehicle condition, engine type, hardware, software, fuel quality and maintenance history.',
      cartEmpty: 'Your cart is ready for parts.',
      cartTitle: 'Temporary Cart',
      cartItems: 'items',
      favorite: 'Add to wishlist',
      favorited: 'Saved to wishlist',
      accountMessage: 'Customer account access is ready for future login integration.',
      cartMessage: 'Added to your temporary cart.',
      newsletterSuccess: 'You are on the KRKN Garage update list.',
      sale: 'Sale',
      close: 'Close',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      accountTitle: 'KRKN Account',
      accountAction: 'Request Account Access',
      projectBrief: 'Project Details',
      requestSimilarBuild: 'Request Similar Build',
      wishlistAdded: 'Saved to wishlist.',
      wishlistRemoved: 'Removed from wishlist.',
      noProducts: 'No matching parts yet. Adjust filters or request a fitment check.',
      legalMessage: 'Policy details are ready for future checkout integration.',
    },
    categoryLabels: {
      performance: 'Performance',
      exhaust: 'Exhaust',
      suspension: 'Suspension',
      wheels: 'Wheels',
      'body-kit': 'Body Kit',
      brakes: 'Brakes',
      carbon: 'Carbon Parts',
      electronics: 'Electronics',
      filters: 'Filters',
      engine: 'Engine Parts',
      'car-care': 'Car Care',
      lifestyle: 'Lifestyle',
    },
    categoryDescriptions: {
      performance: 'ECU packages, intakes and power upgrades.',
      exhaust: 'Catback systems, downpipes and sound upgrades.',
      suspension: 'Ride height, grip and handling control.',
      wheels: 'Forged alloys, tires and fitment essentials.',
      'body-kit': 'Visual conversions and aggressive styling.',
      brakes: 'Stopping power for tuned street builds.',
      carbon: 'Lightweight lips, trims and aero details.',
      electronics: 'Coding, modules and vehicle control upgrades.',
      filters: 'Airflow, maintenance and intake support.',
      engine: 'Hardware for stronger performance foundations.',
      'car-care': 'Protection, coatings and detailing supplies.',
      lifestyle: 'KRKN apparel and garage merchandise.',
    },
    stockLabels: {
      in: 'In Stock',
      low: 'Low Stock',
      preorder: 'Pre-order',
    },
    services: [
      {
        title: 'ECU Remapping',
        description:
          'Custom engine calibration focused on smoother torque, sharper response and safe power delivery.',
      },
      {
        title: 'TCU / Gearbox Tuning',
        description:
          'Transmission software optimization for cleaner shifts, stronger launch behavior and better drivability.',
      },
      {
        title: 'Stage 1-3 Performance',
        description:
          'Progressive tuning paths from daily-driver gains to hardware-supported custom builds.',
      },
      {
        title: 'Exhaust Systems',
        description:
          'Catback, downpipe and performance exhaust upgrades with a balanced sound and clean installation.',
      },
      {
        title: 'Suspension & Handling',
        description:
          'Lowering, damping and chassis upgrades tuned for stance, comfort and control.',
      },
      {
        title: 'Wheels & Tires',
        description:
          'Fitment consultation, premium wheel sourcing and tire setup for visual and driving performance.',
      },
      {
        title: 'Body Kits & Aero',
        description:
          'Front lips, side skirts, diffusers and complete exterior conversion packages.',
      },
      {
        title: 'Carbon Parts',
        description:
          'Carbon fiber trim, aero accents and lightweight visual upgrades for a premium finish.',
      },
      {
        title: 'Brake Upgrades',
        description:
          'Pads, discs, big brake kits and fluid upgrades matched to your power level.',
      },
      {
        title: 'Vehicle Coding',
        description:
          'OEM feature activation, module configuration and software refinement for modern vehicles.',
      },
      {
        title: 'Detailing & Protection',
        description:
          'Paint correction, ceramic coatings and protection work to keep the build looking sharp.',
      },
      {
        title: 'Custom Project Builds',
        description:
          'End-to-end build planning, parts sourcing, installation and delivery for signature cars.',
      },
    ],
    packages: [
      {
        title: 'Stage 1',
        subtitle: 'For daily drivers seeking safe and noticeable performance gains.',
        features: [
          'ECU optimization',
          'Improved throttle response',
          'Better torque delivery',
          'No major hardware required',
        ],
      },
      {
        title: 'Stage 2',
        subtitle: 'For cars with hardware upgrades.',
        features: [
          'Downpipe/exhaust support',
          'Intake optimization',
          'Stronger torque curve',
          'Advanced calibration',
        ],
      },
      {
        title: 'Stage 3',
        subtitle: 'For serious custom builds.',
        features: [
          'Turbo upgrade support',
          'Fuel system optimization',
          'Custom dyno-focused calibration',
          'Project consultation',
        ],
      },
    ],
    why: [
      'Custom tuning, not generic files',
      'Premium parts supply',
      'Clean installation standards',
      'Performance-focused consultation',
      'Transparent process',
      'After-service support',
      'Modern garage experience',
      'Enthusiast-driven approach',
    ],
    process: [
      {
        step: '01',
        title: 'Consultation',
        description: 'We understand your vehicle, goals and budget.',
      },
      {
        step: '02',
        title: 'Inspection',
        description: 'We check vehicle condition and upgrade suitability.',
      },
      {
        step: '03',
        title: 'Build & Tune',
        description: 'We install, calibrate and optimize performance.',
      },
      {
        step: '04',
        title: 'Delivery',
        description: 'You receive a sharper, stronger and more personalized car.',
      },
    ],
    testimonials: [
      {
        quote:
          'KRKN Garage completely changed the way my car feels. The throttle response and torque improvement are incredible.',
        name: 'Daniel R.',
      },
      {
        quote:
          'Professional team, clean installation and great communication from start to finish.',
        name: 'Carlos M.',
      },
      {
        quote:
          'The body kit fitment and wheel setup made the car look exactly how I imagined.',
        name: 'Emre K.',
      },
      {
        quote:
          'The shop section made it easy to find the right performance parts for my build.',
        name: 'Alex T.',
      },
    ],
    projects: [
      {
        title: 'BMW M Series Street Build',
        services: 'ECU remap, carbon aero, exhaust and forged wheels.',
        tags: ['ECU', 'Exhaust', 'Carbon', 'Wheels'],
        visual: 'project-m',
      },
      {
        title: 'Audi S-Line Performance Setup',
        services: 'Stage 1 calibration, intake, suspension and detailing.',
        tags: ['Stage 1', 'Intake', 'Suspension', 'Detailing'],
        visual: 'project-audi',
      },
      {
        title: 'Mercedes AMG Style Conversion',
        services: 'Body kit, brake styling, wheels and coding package.',
        tags: ['Body Kit', 'Wheels', 'Coding', 'Brakes'],
        visual: 'project-amg',
      },
      {
        title: 'VW Golf GTI Stage 2',
        services: 'Downpipe, catback, intake and advanced ECU calibration.',
        tags: ['ECU', 'Downpipe', 'Exhaust', 'Stage 2'],
        visual: 'project-gti',
      },
      {
        title: 'Porsche Visual Enhancement',
        services: 'Carbon accents, wheel fitment and paint protection.',
        tags: ['Carbon', 'Wheels', 'Protection', 'Aero'],
        visual: 'project-porsche',
      },
      {
        title: 'Custom JDM Garage Build',
        services: 'Suspension, aero package, exhaust and project detailing.',
        tags: ['JDM', 'Aero', 'Exhaust', 'Detailing'],
        visual: 'project-jdm',
      },
    ],
    about: {
      body:
        'KRKN Garage was created for enthusiasts who see cars as more than transportation. We combine performance engineering, visual customization and detail-focused craftsmanship to build vehicles with character, power and presence.',
      points: [
        'Automotive passion shaped by performance culture',
        'Precision-led tuning and installation standards',
        'Trusted premium parts sourcing',
        'International customer experience',
      ],
    },
    contact: {
      body:
        'Send your vehicle details and desired service. The KRKN Garage team can prepare a fitment, tuning or parts quote for your build.',
      fields: {
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        country: 'Country',
        make: 'Vehicle Make',
        model: 'Vehicle Model',
        year: 'Vehicle Year',
        engine: 'Engine',
        service: 'Desired Service',
        message: 'Message',
      },
      serviceOptions: [
        'ECU Remapping',
        'Stage 1 Tuning',
        'Stage 2 Tuning',
        'Stage 3 Build',
        'Exhaust',
        'Suspension',
        'Body Kit',
        'Wheels',
        'Parts Purchase',
        'Custom Project',
      ],
      submitSuccess:
        'Quote request received. This demo keeps the request on-screen and is ready for backend integration.',
      cards: [
        { label: 'WhatsApp', value: '+1 555 000 0000' },
        { label: 'Email', value: 'info@krkngarage.com' },
        { label: 'Location', value: 'USA' },
        { label: 'Instagram', value: '@krkngarage' },
      ],
    },
    footer: {
      slogan: 'Performance. Style. Precision.',
      quickLinks: 'Quick Links',
      services: 'Services',
      shopCategories: 'Shop Categories',
      contact: 'Contact',
      newsletter: 'Newsletter',
      newsletterBody: 'Get tuning notes, product drops and project updates.',
      emailPlaceholder: 'Email address',
      subscribe: 'Subscribe',
      copyright: '© 2026 KRKN Garage. All rights reserved.',
      legal: ['Privacy Policy', 'Terms & Conditions', 'Return Policy', 'Cookie Policy'],
    },
  },
  es: {
    meta: {
      title: 'KRKN Garage | Tuning Premium y Piezas de Rendimiento',
      description:
        'Garage premium de tuning automotriz para reprogramación ECU, mejoras de rendimiento, modificación de vehículos, body kits, escapes, suspensión y piezas de rendimiento.',
    },
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      performance: 'Rendimiento',
      projects: 'Proyectos',
      shop: 'Tienda',
      about: 'Acerca',
      contact: 'Contacto',
      consultation: 'Reservar una consulta',
      cart: 'Carrito',
      account: 'Cuenta',
    },
    hero: {
      eyebrow: 'KRKN Garage // Tuning Premium y Piezas de Rendimiento',
      headline: 'Creado para la potencia. Ajustado con precisión.',
      subheadline:
        'KRKN Garage ofrece reprogramación ECU premium, mejoras de rendimiento, body kits personalizados, sistemas de escape y piezas aftermarket para conductores que exigen más.',
      explore: 'Explorar servicios',
      shop: 'Comprar piezas de rendimiento',
      quote: 'Solicitar presupuesto',
      imageAlt:
        'Coupé de rendimiento modificado en un garage premium oscuro con iluminación roja',
      badges: ['Reprogramación ECU', 'Tuning Stage 1-3', 'Body Kits', 'Piezas de rendimiento', 'Proyectos a medida'],
      stats: [
        { value: '500+', label: 'Vehículos tuneados' },
        { value: '10+', label: 'Años de experiencia' },
        { value: 'Stage 1-3', label: 'Rendimiento' },
        { value: 'Premium', label: 'Suministro de piezas' },
      ],
    },
    sectionLabels: {
      servicesEyebrow: 'Servicios de Garage',
      servicesTitle: 'Trabajo de precisión para cada objetivo de rendimiento.',
      servicesBody:
        'Desde calibraciones seguras para uso diario hasta proyectos completos, KRKN Garage combina diagnóstico, instalación limpia y asesoría enfocada en rendimiento.',
      packagesEyebrow: 'Paquetes de Rendimiento',
      packagesTitle: 'Elige el stage que encaja con tu proyecto.',
      packagesBody:
        'Cada calibración se adapta al estado del vehículo, hardware, calidad de combustible y forma real de conducción.',
      gainsEyebrow: 'Potencial de Tuning',
      gainsTitle: 'Ganancias estimadas de potencia.',
      gainsBody:
        'Usa estos ejemplos como punto de partida para tu consulta. Los resultados finales dependen del vehículo, configuración e historial de mantenimiento.',
      shopEyebrow: 'Piezas de Rendimiento',
      shopTitle: 'Estructura de tienda lista para proyectos serios.',
      shopBody:
        'Explora categorías, busca productos, revisa stock y añade piezas a un carrito temporal listo para integración de checkout.',
      categoriesEyebrow: 'Categorías de Tienda',
      categoriesTitle: 'Organizadas según compras reales de automoción.',
      projectsEyebrow: 'Proyectos Destacados',
      projectsTitle: 'Presencia, potencia y fitment limpio.',
      whyEyebrow: 'Por Qué Elegir KRKN Garage',
      whyTitle: 'Una experiencia premium desde el presupuesto hasta la entrega.',
      processEyebrow: 'Proceso',
      processTitle: 'Pasos claros. Sin improvisación.',
      testimonialsEyebrow: 'Opiniones de Clientes',
      testimonialsTitle: 'Confianza de conductores que cuidan cada detalle.',
      aboutEyebrow: 'Acerca de KRKN Garage',
      aboutTitle: 'Cultura de rendimiento con estándares modernos de garage.',
      contactEyebrow: 'Solicitud de Presupuesto',
      contactTitle: 'Cuéntanos sobre tu vehículo y tus objetivos.',
    },
    common: {
      learnMore: 'Más información',
      viewProject: 'Ver proyecto',
      viewDetails: 'Ver detalles',
      addToCart: 'Añadir al carrito',
      addAgain: 'Añadir otra vez',
      added: 'Añadido',
      visitShop: 'Visitar tienda',
      requestQuote: 'Solicitar presupuesto',
      requestFitment: 'Solicitar verificación de compatibilidad',
      checkoutQuote: 'Solicitar enlace de pago',
      allCategories: 'Todas las categorías',
      allBrands: 'Todas las marcas',
      vehiclePlaceholder: 'Compatibilidad del vehículo',
      searchPlaceholder: 'Buscar piezas de rendimiento',
      category: 'Categoría',
      stock: 'Stock',
      compatibility: 'Compatibilidad',
      sampleResults: 'Resultados estimados de muestra. Las ganancias reales pueden variar.',
      disclaimer:
        'Los resultados de rendimiento varían según el estado del vehículo, tipo de motor, hardware, software, calidad del combustible e historial de mantenimiento.',
      cartEmpty: 'Tu carrito está listo para piezas.',
      cartTitle: 'Carrito temporal',
      cartItems: 'artículos',
      favorite: 'Añadir a favoritos',
      favorited: 'Guardado en favoritos',
      accountMessage: 'El acceso de cuenta de cliente está listo para una futura integración de login.',
      cartMessage: 'Añadido a tu carrito temporal.',
      newsletterSuccess: 'Ya estás en la lista de novedades de KRKN Garage.',
      sale: 'Oferta',
      close: 'Cerrar',
      openMenu: 'Abrir menu',
      closeMenu: 'Cerrar menu',
      accountTitle: 'Cuenta KRKN',
      accountAction: 'Solicitar acceso',
      projectBrief: 'Detalles del proyecto',
      requestSimilarBuild: 'Solicitar proyecto similar',
      wishlistAdded: 'Guardado en favoritos.',
      wishlistRemoved: 'Eliminado de favoritos.',
      noProducts: 'No hay piezas que coincidan. Ajusta los filtros o solicita una verificacion de compatibilidad.',
      legalMessage: 'La informacion legal esta lista para una futura integracion de checkout.',
    },
    categoryLabels: {
      performance: 'Rendimiento',
      exhaust: 'Escape',
      suspension: 'Suspensión',
      wheels: 'Ruedas',
      'body-kit': 'Body Kit',
      brakes: 'Frenos',
      carbon: 'Piezas de Carbono',
      electronics: 'Electrónica',
      filters: 'Filtros',
      engine: 'Piezas de Motor',
      'car-care': 'Car Care',
      lifestyle: 'Lifestyle',
    },
    categoryDescriptions: {
      performance: 'Paquetes ECU, admisión y mejoras de potencia.',
      exhaust: 'Sistemas catback, downpipes y mejoras de sonido.',
      suspension: 'Altura, agarre y control de chasis.',
      wheels: 'Llantas forjadas, neumáticos y fitment.',
      'body-kit': 'Conversiones visuales y estilo agresivo.',
      brakes: 'Frenada para proyectos de calle potenciados.',
      carbon: 'Lips, molduras y aero ligero en carbono.',
      electronics: 'Coding, módulos y control del vehículo.',
      filters: 'Flujo de aire, mantenimiento y soporte de admisión.',
      engine: 'Hardware para bases de rendimiento más fuertes.',
      'car-care': 'Protección, coatings e insumos de detailing.',
      lifestyle: 'Ropa KRKN y merchandising del garage.',
    },
    stockLabels: {
      in: 'En stock',
      low: 'Stock limitado',
      preorder: 'Preventa',
    },
    services: [
      {
        title: 'Reprogramación ECU',
        description:
          'Calibración de motor personalizada para más par, mejor respuesta y entrega de potencia segura.',
      },
      {
        title: 'Tuning TCU / Caja',
        description:
          'Optimización de software de transmisión para cambios más limpios, mejor launch y mayor manejabilidad.',
      },
      {
        title: 'Rendimiento Stage 1-3',
        description:
          'Rutas progresivas de tuning desde ganancias diarias hasta proyectos a medida con hardware.',
      },
      {
        title: 'Sistemas de Escape',
        description:
          'Catback, downpipe y upgrades de escape con sonido equilibrado e instalación limpia.',
      },
      {
        title: 'Suspensión y Handling',
        description:
          'Altura, amortiguación y chasis ajustados para stance, comodidad y control.',
      },
      {
        title: 'Ruedas y Neumáticos',
        description:
          'Asesoría de fitment, suministro de llantas premium y configuración de neumáticos.',
      },
      {
        title: 'Body Kits y Aero',
        description:
          'Front lips, taloneras, difusores y paquetes completos de conversión exterior.',
      },
      {
        title: 'Piezas de Carbono',
        description:
          'Molduras, detalles aero y mejoras visuales en fibra de carbono con acabado premium.',
      },
      {
        title: 'Mejoras de Frenos',
        description:
          'Pastillas, discos, big brake kits y fluidos adecuados para tu nivel de potencia.',
      },
      {
        title: 'Coding del Vehículo',
        description:
          'Activación de funciones OEM, configuración de módulos y refinamiento de software.',
      },
      {
        title: 'Detailing y Protección',
        description:
          'Corrección de pintura, ceramic coating y protección para mantener el proyecto impecable.',
      },
      {
        title: 'Proyectos a Medida',
        description:
          'Planificación, piezas, instalación y entrega completa para vehículos con identidad propia.',
      },
    ],
    packages: [
      {
        title: 'Stage 1',
        subtitle: 'Para conductores diarios que buscan ganancias seguras y notables.',
        features: [
          'Optimización ECU',
          'Mejor respuesta del acelerador',
          'Entrega de par más fuerte',
          'Sin hardware mayor requerido',
        ],
      },
      {
        title: 'Stage 2',
        subtitle: 'Para vehículos con mejoras de hardware.',
        features: [
          'Soporte para downpipe/escape',
          'Optimización de admisión',
          'Curva de par más contundente',
          'Calibración avanzada',
        ],
      },
      {
        title: 'Stage 3',
        subtitle: 'Para proyectos serios a medida.',
        features: [
          'Soporte para upgrade de turbo',
          'Optimización de sistema de combustible',
          'Calibración personalizada enfocada en dyno',
          'Consultoría de proyecto',
        ],
      },
    ],
    why: [
      'Tuning personalizado, no archivos genéricos',
      'Suministro de piezas premium',
      'Estándares de instalación limpia',
      'Asesoría enfocada en rendimiento',
      'Proceso transparente',
      'Soporte post-servicio',
      'Experiencia de garage moderna',
      'Enfoque impulsado por entusiastas',
    ],
    process: [
      {
        step: '01',
        title: 'Consulta',
        description: 'Entendemos tu vehículo, objetivos y presupuesto.',
      },
      {
        step: '02',
        title: 'Inspección',
        description: 'Revisamos el estado del vehículo y la viabilidad de upgrades.',
      },
      {
        step: '03',
        title: 'Build & Tune',
        description: 'Instalamos, calibramos y optimizamos el rendimiento.',
      },
      {
        step: '04',
        title: 'Entrega',
        description: 'Recibes un coche más rápido, fuerte y personalizado.',
      },
    ],
    testimonials: [
      {
        quote:
          'KRKN Garage cambió por completo cómo se siente mi coche. La respuesta del acelerador y el par son increíbles.',
        name: 'Daniel R.',
      },
      {
        quote:
          'Equipo profesional, instalación limpia y gran comunicación de principio a fin.',
        name: 'Carlos M.',
      },
      {
        quote:
          'El fitment del body kit y las ruedas dejaron el coche exactamente como lo imaginaba.',
        name: 'Emre K.',
      },
      {
        quote:
          'La tienda hizo muy fácil encontrar las piezas de rendimiento correctas para mi proyecto.',
        name: 'Alex T.',
      },
    ],
    projects: [
      {
        title: 'BMW M Series Street Build',
        services: 'Reprogramación ECU, aero de carbono, escape y llantas forjadas.',
        tags: ['ECU', 'Escape', 'Carbono', 'Ruedas'],
        visual: 'project-m',
      },
      {
        title: 'Audi S-Line Performance Setup',
        services: 'Calibración Stage 1, admisión, suspensión y detailing.',
        tags: ['Stage 1', 'Admisión', 'Suspensión', 'Detailing'],
        visual: 'project-audi',
      },
      {
        title: 'Mercedes AMG Style Conversion',
        services: 'Body kit, estilo de frenos, ruedas y paquete de coding.',
        tags: ['Body Kit', 'Ruedas', 'Coding', 'Frenos'],
        visual: 'project-amg',
      },
      {
        title: 'VW Golf GTI Stage 2',
        services: 'Downpipe, catback, admisión y calibración ECU avanzada.',
        tags: ['ECU', 'Downpipe', 'Escape', 'Stage 2'],
        visual: 'project-gti',
      },
      {
        title: 'Porsche Visual Enhancement',
        services: 'Detalles en carbono, fitment de ruedas y protección de pintura.',
        tags: ['Carbono', 'Ruedas', 'Protección', 'Aero'],
        visual: 'project-porsche',
      },
      {
        title: 'Custom JDM Garage Build',
        services: 'Suspensión, paquete aero, escape y detailing de proyecto.',
        tags: ['JDM', 'Aero', 'Escape', 'Detailing'],
        visual: 'project-jdm',
      },
    ],
    about: {
      body:
        'KRKN Garage nació para entusiastas que ven los coches como algo más que transporte. Combinamos ingeniería de rendimiento, personalización visual y artesanía enfocada en el detalle para crear vehículos con carácter, potencia y presencia.',
      points: [
        'Pasión automotriz influida por la cultura de rendimiento',
        'Tuning e instalación guiados por precisión',
        'Suministro confiable de piezas premium',
        'Experiencia de cliente internacional',
      ],
    },
    contact: {
      body:
        'Envía los datos de tu vehículo y el servicio deseado. El equipo de KRKN Garage puede preparar una cotización de fitment, tuning o piezas para tu proyecto.',
      fields: {
        fullName: 'Nombre completo',
        email: 'Email',
        phone: 'Teléfono',
        country: 'País',
        make: 'Marca del vehículo',
        model: 'Modelo del vehículo',
        year: 'Año del vehículo',
        engine: 'Motor',
        service: 'Servicio deseado',
        message: 'Mensaje',
      },
      serviceOptions: [
        'Reprogramación ECU',
        'Tuning Stage 1',
        'Tuning Stage 2',
        'Proyecto Stage 3',
        'Escape',
        'Suspensión',
        'Body Kit',
        'Ruedas',
        'Compra de piezas',
        'Proyecto a medida',
      ],
      submitSuccess:
        'Solicitud recibida. Esta demo mantiene la solicitud en pantalla y está lista para integración backend.',
      cards: [
        { label: 'WhatsApp', value: '+1 555 000 0000' },
        { label: 'Email', value: 'info@krkngarage.com' },
        { label: 'Ubicación', value: 'EE. UU.' },
        { label: 'Instagram', value: '@krkngarage' },
      ],
    },
    footer: {
      slogan: 'Rendimiento. Estilo. Precisión.',
      quickLinks: 'Enlaces rápidos',
      services: 'Servicios',
      shopCategories: 'Categorías',
      contact: 'Contacto',
      newsletter: 'Newsletter',
      newsletterBody: 'Recibe notas de tuning, lanzamientos de piezas y proyectos.',
      emailPlaceholder: 'Email',
      subscribe: 'Suscribirse',
      copyright: '© 2026 KRKN Garage. Todos los derechos reservados.',
      legal: ['Política de Privacidad', 'Términos y Condiciones', 'Política de Devoluciones', 'Política de Cookies'],
    },
  },
};

const products: Product[] = [
  {
    id: 'carbon-front-lip',
    name: { en: 'Carbon Fiber Front Lip', es: 'Front Lip de Fibra de Carbono' },
    description: {
      en: 'Lightweight aero upgrade with a gloss carbon finish for aggressive front-end styling.',
      es: 'Upgrade aero ligero con acabado carbono brillante para un frontal más agresivo.',
    },
    category: 'carbon',
    price: '$690',
    originalPrice: '$820',
    sale: true,
    stock: 'in',
    brand: 'KRKN Aero',
    compatibility: ['BMW 3 Series', 'Audi A4', 'Mercedes C-Class'],
    visual: 'visual-carbon',
  },
  {
    id: 'catback-exhaust',
    name: { en: 'Catback Exhaust System', es: 'Sistema de Escape Catback' },
    description: {
      en: 'Stainless catback setup tuned for deeper sound and clean flow.',
      es: 'Sistema catback en acero inoxidable para sonido más profundo y flujo limpio.',
    },
    category: 'exhaust',
    price: '$1,240',
    stock: 'low',
    brand: 'FlowRace',
    compatibility: ['VW Golf GTI', 'Audi S3', 'BMW 320i'],
    visual: 'visual-exhaust',
  },
  {
    id: 'performance-downpipe',
    name: { en: 'Performance Downpipe', es: 'Downpipe de Rendimiento' },
    description: {
      en: 'High-flow downpipe for Stage 2-ready exhaust response and torque support.',
      es: 'Downpipe high-flow para respuesta de escape y soporte de par en Stage 2.',
    },
    category: 'exhaust',
    price: '$540',
    originalPrice: '$620',
    sale: true,
    stock: 'in',
    brand: 'TurboLine',
    compatibility: ['Audi S3', 'VW Golf GTI', 'BMW 520d'],
    visual: 'visual-downpipe',
  },
  {
    id: 'sport-suspension-kit',
    name: { en: 'Sport Suspension Kit', es: 'Kit de Suspensión Sport' },
    description: {
      en: 'Lower stance, better road feel and controlled handling for fast street cars.',
      es: 'Menor altura, mejor tacto de carretera y control para coches de calle rápidos.',
    },
    category: 'suspension',
    price: '$980',
    stock: 'in',
    brand: 'ApexRide',
    compatibility: ['BMW 3 Series', 'Mercedes C-Class', 'Audi A4'],
    visual: 'visual-suspension',
  },
  {
    id: 'stage-1-remap',
    name: { en: 'Stage 1 ECU Remap Package', es: 'Paquete Reprogramación ECU Stage 1' },
    description: {
      en: 'Daily-friendly ECU optimization for stronger torque and improved throttle response.',
      es: 'Optimización ECU para uso diario con más par y mejor respuesta del acelerador.',
    },
    category: 'performance',
    price: '$390',
    stock: 'in',
    brand: 'KRKN Tune',
    compatibility: ['BMW 320i', 'Audi A4', 'Mercedes C200', 'BMW 520d'],
    visual: 'visual-ecu',
  },
  {
    id: 'cold-air-intake',
    name: { en: 'Cold Air Intake Kit', es: 'Kit de Admisión Cold Air' },
    description: {
      en: 'Improved airflow and sharper induction sound for tuned turbo engines.',
      es: 'Mejor flujo de aire y sonido de admisión más definido para motores turbo.',
    },
    category: 'filters',
    price: '$330',
    stock: 'in',
    brand: 'AirForge',
    compatibility: ['VW Golf GTI', 'Audi S3', 'BMW 320i'],
    visual: 'visual-intake',
  },
  {
    id: 'big-brake-kit',
    name: { en: 'Big Brake Kit', es: 'Big Brake Kit' },
    description: {
      en: 'Larger calipers and performance discs for stronger stopping power.',
      es: 'Pinzas más grandes y discos de rendimiento para mayor potencia de frenado.',
    },
    category: 'brakes',
    price: '$2,450',
    stock: 'preorder',
    brand: 'StopForce',
    compatibility: ['BMW M Series', 'Audi S3', 'VW Golf GTI'],
    visual: 'visual-brakes',
  },
  {
    id: 'forged-wheels',
    name: { en: 'Forged Alloy Wheels', es: 'Llantas Forjadas de Aleación' },
    description: {
      en: 'Lightweight forged wheel set with premium concave fitment options.',
      es: 'Juego de llantas forjadas ligeras con opciones premium de fitment cóncavo.',
    },
    category: 'wheels',
    price: '$1,890',
    originalPrice: '$2,150',
    sale: true,
    stock: 'low',
    brand: 'KRKN Forged',
    compatibility: ['BMW 3 Series', 'Audi A4', 'Mercedes C-Class', 'VW Golf GTI'],
    visual: 'visual-wheels',
  },
  {
    id: 'ceramic-coating-kit',
    name: { en: 'Ceramic Coating Kit', es: 'Kit de Ceramic Coating' },
    description: {
      en: 'High-gloss paint protection kit for long-lasting depth and easier maintenance.',
      es: 'Kit de protección de pintura con alto brillo, profundidad y mantenimiento sencillo.',
    },
    category: 'car-care',
    price: '$145',
    stock: 'in',
    brand: 'DetailPro',
    compatibility: ['Universal'],
    visual: 'visual-care',
  },
  {
    id: 'krkn-tshirt',
    name: { en: 'KRKN Garage T-Shirt', es: 'Camiseta KRKN Garage' },
    description: {
      en: 'Premium heavyweight garage T-shirt with KRKN motorsport styling.',
      es: 'Camiseta premium de garage con estilo motorsport KRKN.',
    },
    category: 'lifestyle',
    price: '$42',
    stock: 'in',
    brand: 'KRKN Garage',
    compatibility: ['Universal'],
    visual: 'visual-shirt',
  },
];

const gainRows = [
  { car: 'BMW 320i', hp: '+45 HP', torque: '+80 Nm' },
  { car: 'VW Golf GTI', hp: '+60 HP', torque: '+95 Nm' },
  { car: 'Audi A4 2.0 TDI', hp: '+50 HP', torque: '+100 Nm' },
  { car: 'Mercedes C200', hp: '+40 HP', torque: '+75 Nm' },
  { car: 'BMW 520d', hp: '+55 HP', torque: '+110 Nm' },
  { car: 'Audi S3', hp: '+70 HP', torque: '+120 Nm' },
];

const serviceIcons: LucideIcon[] = [
  Cpu,
  Settings,
  Gauge,
  Wrench,
  Activity,
  CircleDollarSign,
  Car,
  Sparkles,
  ShieldCheck,
  ClipboardCheck,
  Star,
  Trophy,
];

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [wishlist, setWishlist] = useState<Set<string>>(() => new Set());
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [toast, setToast] = useState('');
  const [quoteStatus, setQuoteStatus] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription?.setAttribute('content', t.meta.description);
  }, [language, t.meta.description, t.meta.title]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const brands = useMemo(() => ['all', ...Array.from(new Set(products.map((product) => product.brand)))], []);
  const vehicles = useMemo(
    () => ['all', ...Array.from(new Set(products.flatMap((product) => product.compatibility)))],
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const searchable = [
        product.name[language],
        product.description[language],
        t.categoryLabels[product.category],
        product.brand,
        product.compatibility.join(' '),
      ]
        .join(' ')
        .toLowerCase();
      const matchesSearch = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesBrand = brandFilter === 'all' || product.brand === brandFilter;
      const matchesVehicle = vehicleFilter === 'all' || product.compatibility.includes(vehicleFilter);
      return matchesCategory && matchesSearch && matchesBrand && matchesVehicle;
    });
  }, [activeCategory, brandFilter, language, query, t.categoryLabels, vehicleFilter]);

  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? products[0];
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartProducts = products.filter((product) => cart[product.id]);

  const showToast = (message: string) => setToast(message);

  const addToCart = (product: Product) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    showToast(t.common.cartMessage);
  };

  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.has(productId);
    setWishlist((current) => {
      const next = new Set(current);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
    showToast(isSaved ? t.common.wishlistRemoved : t.common.wishlistAdded);
  };

  const showCategory = (category: CategoryId | 'all') => {
    setActiveCategory(category);
    setQuery('');
    setBrandFilter('all');
    setVehicleFilter('all');

    const nextProduct =
      category === 'all' ? products[0] : products.find((product) => product.category === category);
    if (nextProduct) {
      setSelectedProductId(nextProduct.id);
    }
  };

  const selectProduct = (productId: string) => {
    setSelectedProductId(productId);
    window.setTimeout(() => {
      document.getElementById('product-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handleQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuoteStatus(t.contact.submitSuccess);
    event.currentTarget.reset();
  };

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus(t.common.newsletterSuccess);
    event.currentTarget.reset();
  };

  return (
    <>
      <Header
        language={language}
        setLanguage={setLanguage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        cartCount={cartCount}
        wishlistCount={wishlist.size}
        showToast={showToast}
        t={t}
      />

      <main>
        <Hero t={t} />
        <Services t={t} />
        <PerformancePackages t={t} />
        <TuningPotential t={t} />
        <Shop
          t={t}
          language={language}
          products={filteredProducts}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          query={query}
          setQuery={setQuery}
          brandFilter={brandFilter}
          setBrandFilter={setBrandFilter}
          brands={brands}
          vehicleFilter={vehicleFilter}
          setVehicleFilter={setVehicleFilter}
          vehicles={vehicles}
          cart={cart}
          cartProducts={cartProducts}
          addToCart={addToCart}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          selectedProduct={selectedProduct}
          selectProduct={selectProduct}
        />
        <Categories t={t} showCategory={showCategory} />
        <Projects t={t} />
        <WhyChoose t={t} />
        <ProcessSection t={t} />
        <Testimonials t={t} />
        <About t={t} />
        <Contact t={t} handleQuoteSubmit={handleQuoteSubmit} quoteStatus={quoteStatus} />
      </main>

      <Footer
        t={t}
        handleNewsletterSubmit={handleNewsletterSubmit}
        newsletterStatus={newsletterStatus}
        showCategory={showCategory}
        showToast={showToast}
      />

      <div className={`toast ${toast ? 'toast-visible' : ''}`} role="status" aria-live="polite">
        <CheckCircle2 size={18} />
        <span>{toast}</span>
      </div>
    </>
  );
}

function Header({
  language,
  setLanguage,
  isMenuOpen,
  setIsMenuOpen,
  cartCount,
  wishlistCount,
  showToast,
  t,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  cartCount: number;
  wishlistCount: number;
  showToast: (message: string) => void;
  t: Translation;
}) {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#performance', label: t.nav.performance },
    { href: '#projects', label: t.nav.projects },
    { href: '#shop', label: t.nav.shop },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <a href="#home" className="brand" aria-label="KRKN Garage home" onClick={closeMenu}>
        <img src="/logo.png" alt="KRKN Garage logo" />
        <span>KRKN Garage</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        <button
          className="icon-button"
          type="button"
          aria-label={`${t.common.favorited}: ${wishlistCount}`}
          onClick={() => showToast(wishlistCount ? t.common.favorited : t.common.favorite)}
        >
          <Heart size={18} />
          {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
        </button>
        <a className="icon-button" href="#cart" aria-label={`${t.nav.cart}: ${cartCount}`}>
          <ShoppingCart size={18} />
          {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
        </a>
        <button
          className="icon-button account-button"
          type="button"
          aria-label={t.nav.account}
          onClick={() => setIsAccountOpen(true)}
        >
          <UserRound size={18} />
        </button>
        <a className="primary-button header-cta" href="#contact">
          {t.nav.consultation}
        </a>
        <button
          className="mobile-toggle"
          type="button"
          aria-label={isMenuOpen ? t.common.closeMenu : t.common.openMenu}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`mobile-nav ${isMenuOpen ? 'mobile-nav-open' : ''}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a className="primary-button" href="#contact" onClick={closeMenu}>
          {t.nav.consultation}
        </a>
      </div>

      {isAccountOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="account-title">
          <div className="modal-card account-modal">
            <button
              type="button"
              className="modal-close"
              aria-label={t.common.close}
              onClick={() => setIsAccountOpen(false)}
            >
              <X size={18} />
            </button>
            <UserRound size={26} />
            <h2 id="account-title">{t.common.accountTitle}</h2>
            <p>{t.common.accountMessage}</p>
            <a className="primary-button" href="#contact" onClick={() => setIsAccountOpen(false)}>
              {t.common.accountAction}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function LanguageSwitcher({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
}) {
  return (
    <div className="language-switcher" aria-label="Language switcher">
      <Languages size={16} />
      {(['en', 'es'] as Language[]).map((option) => (
        <button
          key={option}
          type="button"
          className={language === option ? 'active' : ''}
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Hero({ t }: { t: Translation }) {
  return (
    <section className="hero section-band" id="home">
      <img src="/assets/krkn-hero-garage.png" alt={t.hero.imageAlt} className="hero-bg" />
      <div className="hero-overlay" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.headline}</h1>
          <p className="hero-subheadline">{t.hero.subheadline}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#services">
              {t.hero.explore}
              <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="#shop">
              {t.hero.shop}
            </a>
            <a className="ghost-button" href="#contact">
              {t.hero.quote}
            </a>
          </div>
          <div className="trust-badges" aria-label="KRKN Garage specialties">
            {t.hero.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
        <div className="hero-stat-panel" aria-label="KRKN Garage statistics">
          {t.hero.stats.map((stat) => (
            <div key={`${stat.value}-${stat.label}`} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function Services({ t }: { t: Translation }) {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = t.services[activeServiceIndex];

  return (
    <section className="section-band" id="services">
      <div className="container">
        <SectionIntro
          eyebrow={t.sectionLabels.servicesEyebrow}
          title={t.sectionLabels.servicesTitle}
          body={t.sectionLabels.servicesBody}
        />
        <div className="services-grid">
          {t.services.map((service, index) => {
            const Icon = serviceIcons[index] ?? Wrench;
            return (
              <article
                className={`service-card ${activeServiceIndex === index ? 'service-card-active' : ''}`}
                key={service.title}
              >
                <div className="card-icon">
                  <Icon size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button
                  type="button"
                  className="text-link service-learn-button"
                  aria-expanded={activeServiceIndex === index}
                  aria-controls="service-detail"
                  onClick={() => setActiveServiceIndex(index)}
                >
                  {t.common.learnMore}
                  <ChevronRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
        {activeService && (
          <div className="service-detail-strip" id="service-detail" aria-live="polite">
            <div>
              <span>{t.sectionLabels.servicesEyebrow}</span>
              <h3>{activeService.title}</h3>
              <p>{activeService.description}</p>
            </div>
            <a href="#contact" className="secondary-button">
              {t.common.requestQuote}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function PerformancePackages({ t }: { t: Translation }) {
  return (
    <section className="section-band performance-section" id="performance">
      <div className="container">
        <SectionIntro
          eyebrow={t.sectionLabels.packagesEyebrow}
          title={t.sectionLabels.packagesTitle}
          body={t.sectionLabels.packagesBody}
        />
        <div className="package-grid">
          {t.packages.map((tier, index) => (
            <article className={`package-card package-${index + 1}`} key={tier.title}>
              <div className="package-topline">
                <span>{tier.title}</span>
                <Gauge size={22} />
              </div>
              <h3>{tier.subtitle}</h3>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={17} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="secondary-button">
                {t.common.requestQuote}
              </a>
            </article>
          ))}
        </div>
        <p className="disclaimer">{t.common.disclaimer}</p>
      </div>
    </section>
  );
}

function TuningPotential({ t }: { t: Translation }) {
  return (
    <section className="section-band gains-section">
      <div className="container gains-layout">
        <div>
          <SectionIntro
            eyebrow={t.sectionLabels.gainsEyebrow}
            title={t.sectionLabels.gainsTitle}
            body={t.sectionLabels.gainsBody}
          />
          <p className="result-note">{t.common.sampleResults}</p>
        </div>
        <div className="gain-table" aria-label="Sample tuning power gains">
          {gainRows.map((row) => (
            <div className="gain-row" key={row.car}>
              <span>{row.car}</span>
              <strong>{row.hp}</strong>
              <strong>{row.torque}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Shop({
  t,
  language,
  products: visibleProducts,
  activeCategory,
  setActiveCategory,
  query,
  setQuery,
  brandFilter,
  setBrandFilter,
  brands,
  vehicleFilter,
  setVehicleFilter,
  vehicles,
  cart,
  cartProducts,
  addToCart,
  wishlist,
  toggleWishlist,
  selectedProduct,
  selectProduct,
}: {
  t: Translation;
  language: Language;
  products: Product[];
  activeCategory: CategoryId | 'all';
  setActiveCategory: (category: CategoryId | 'all') => void;
  query: string;
  setQuery: (query: string) => void;
  brandFilter: string;
  setBrandFilter: (brand: string) => void;
  brands: string[];
  vehicleFilter: string;
  setVehicleFilter: (vehicle: string) => void;
  vehicles: string[];
  cart: Record<string, number>;
  cartProducts: Product[];
  addToCart: (product: Product) => void;
  wishlist: Set<string>;
  toggleWishlist: (productId: string) => void;
  selectedProduct: Product;
  selectProduct: (productId: string) => void;
}) {
  const featuredProducts = visibleProducts.slice(0, 8);

  return (
    <section className="section-band shop-section" id="shop">
      <div className="container">
        <SectionIntro
          eyebrow={t.sectionLabels.shopEyebrow}
          title={t.sectionLabels.shopTitle}
          body={t.sectionLabels.shopBody}
        />

        <div className="shop-controls" id="shop-products" aria-label="Shop filters">
          <label className="search-control">
            <Search size={18} />
            <span className="sr-only">{t.common.searchPlaceholder}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.common.searchPlaceholder}
            />
          </label>
          <label className="select-control">
            <Filter size={18} />
            <span className="sr-only">{t.common.allBrands}</span>
            <select value={brandFilter} onChange={(event) => setBrandFilter(event.target.value)}>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand === 'all' ? t.common.allBrands : brand}
                </option>
              ))}
            </select>
          </label>
          <label className="select-control">
            <Car size={18} />
            <span className="sr-only">{t.common.vehiclePlaceholder}</span>
            <select value={vehicleFilter} onChange={(event) => setVehicleFilter(event.target.value)}>
              {vehicles.map((vehicle) => (
                <option key={vehicle} value={vehicle}>
                  {vehicle === 'all' ? t.common.vehiclePlaceholder : vehicle}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="category-filter" aria-label="Product category filters">
          <button
            type="button"
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => setActiveCategory('all')}
          >
            {t.common.allCategories}
          </button>
          {categoryIds.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {t.categoryLabels[category]}
            </button>
          ))}
        </div>

        {featuredProducts.length > 0 ? (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                language={language}
                t={t}
                isFavorite={wishlist.has(product.id)}
                inCart={Boolean(cart[product.id])}
                onFavorite={() => toggleWishlist(product.id)}
                onAdd={() => addToCart(product)}
                onView={() => selectProduct(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={22} />
            <p>{t.common.noProducts}</p>
            <a className="secondary-button" href="#contact">
              {t.common.requestFitment}
            </a>
          </div>
        )}

        <div className="shop-bottom">
          <ProductDetail
            product={selectedProduct}
            language={language}
            t={t}
            inCart={Boolean(cart[selectedProduct.id])}
            onAdd={() => addToCart(selectedProduct)}
          />
          <CartPanel cart={cart} cartProducts={cartProducts} language={language} t={t} />
        </div>

        <div className="centered-action">
          <a className="primary-button" href="#shop-products">
            {t.common.visitShop}
            <ShoppingBag size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  language,
  t,
  isFavorite,
  inCart,
  onFavorite,
  onAdd,
  onView,
}: {
  product: Product;
  language: Language;
  t: Translation;
  isFavorite: boolean;
  inCart: boolean;
  onFavorite: () => void;
  onAdd: () => void;
  onView: () => void;
}) {
  return (
    <article className="product-card">
      <div className={`product-visual ${product.visual}`} role="img" aria-label={product.name[language]}>
        {product.sale && (
          <span className="sale-badge">
            <BadgePercent size={15} />
            {t.common.sale}
          </span>
        )}
        <button
          className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
          type="button"
          aria-label={isFavorite ? t.common.favorited : t.common.favorite}
          onClick={onFavorite}
        >
          <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <Package size={46} />
      </div>
      <div className="product-body">
        <span className="product-category">{t.categoryLabels[product.category]}</span>
        <h3>{product.name[language]}</h3>
        <p>{product.description[language]}</p>
        <div className="product-meta">
          <div>
            <strong>{product.price}</strong>
            {product.originalPrice && <span>{product.originalPrice}</span>}
          </div>
          <em className={`stock stock-${product.stock}`}>{t.stockLabels[product.stock]}</em>
        </div>
        <div className="product-actions">
          <button type="button" className="primary-button" onClick={onAdd}>
            {inCart ? t.common.addAgain : t.common.addToCart}
          </button>
          <button type="button" className="secondary-button" onClick={onView}>
            {t.common.viewDetails}
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductDetail({
  product,
  language,
  t,
  inCart,
  onAdd,
}: {
  product: Product;
  language: Language;
  t: Translation;
  inCart: boolean;
  onAdd: () => void;
}) {
  return (
    <article className="product-detail" id="product-detail">
      <div className="detail-kicker">{t.common.category}: {t.categoryLabels[product.category]}</div>
      <h3>{product.name[language]}</h3>
      <p>{product.description[language]}</p>
      <div className="detail-price-row">
        <strong>{product.price}</strong>
        <span>{product.brand}</span>
        <em className={`stock stock-${product.stock}`}>{t.stockLabels[product.stock]}</em>
      </div>
      <div className="compatibility-list">
        <span>{t.common.compatibility}</span>
        <div>
          {product.compatibility.map((item) => (
            <small key={item}>{item}</small>
          ))}
        </div>
      </div>
      <div className="detail-actions">
        <button type="button" className="primary-button" onClick={onAdd}>
          {inCart ? t.common.addAgain : t.common.addToCart}
        </button>
        <a className="secondary-button" href="#contact">
          {t.common.requestFitment}
        </a>
      </div>
    </article>
  );
}

function CartPanel({
  cart,
  cartProducts,
  language,
  t,
}: {
  cart: Record<string, number>;
  cartProducts: Product[];
  language: Language;
  t: Translation;
}) {
  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  return (
    <aside className="cart-panel" id="cart">
      <div className="cart-heading">
        <ShoppingCart size={22} />
        <div>
          <h3>{t.common.cartTitle}</h3>
          <span>
            {itemCount} {t.common.cartItems}
          </span>
        </div>
      </div>
      {cartProducts.length === 0 ? (
        <p>{t.common.cartEmpty}</p>
      ) : (
        <ul className="cart-list">
          {cartProducts.map((product) => (
            <li key={product.id}>
              <span>{product.name[language]}</span>
              <strong>x{cart[product.id]}</strong>
            </li>
          ))}
        </ul>
      )}
      <a className="primary-button" href="#contact">
        {t.common.checkoutQuote}
      </a>
    </aside>
  );
}

function Categories({
  t,
  showCategory,
}: {
  t: Translation;
  showCategory: (category: CategoryId) => void;
}) {
  return (
    <section className="section-band categories-section">
      <div className="container">
        <SectionIntro
          eyebrow={t.sectionLabels.categoriesEyebrow}
          title={t.sectionLabels.categoriesTitle}
        />
        <div className="category-grid">
          {categoryIds.map((category) => (
            <a
              className="category-card"
              href="#shop-products"
              key={category}
              onClick={() => showCategory(category)}
            >
              <span>{t.categoryLabels[category]}</span>
              <p>{t.categoryDescriptions[category]}</p>
              <ChevronRight size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ t }: { t: Translation }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section className="section-band" id="projects">
      <div className="container">
        <SectionIntro
          eyebrow={t.sectionLabels.projectsEyebrow}
          title={t.sectionLabels.projectsTitle}
        />
        <div className="projects-grid">
          {t.projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className={`project-visual ${project.visual}`} role="img" aria-label={project.title}>
                <Car size={54} />
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.services}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <button type="button" className="text-link" onClick={() => setActiveProject(project)}>
                  {t.common.viewProject}
                  <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="project-title">
          <div className="modal-card project-modal">
            <button
              type="button"
              className="modal-close"
              aria-label={t.common.close}
              onClick={() => setActiveProject(null)}
            >
              <X size={18} />
            </button>
            <span className="detail-kicker">{t.common.projectBrief}</span>
            <h2 id="project-title">{activeProject.title}</h2>
            <p>{activeProject.services}</p>
            <div className="tag-row">
              {activeProject.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="modal-actions">
              <a className="primary-button" href="#contact" onClick={() => setActiveProject(null)}>
                {t.common.requestSimilarBuild}
              </a>
              <button type="button" className="secondary-button" onClick={() => setActiveProject(null)}>
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function WhyChoose({ t }: { t: Translation }) {
  return (
    <section className="section-band why-section">
      <div className="container why-layout">
        <SectionIntro
          eyebrow={t.sectionLabels.whyEyebrow}
          title={t.sectionLabels.whyTitle}
        />
        <div className="why-grid">
          {t.why.map((item) => (
            <div className="why-item" key={item}>
              <CheckCircle2 size={19} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ t }: { t: Translation }) {
  return (
    <section className="section-band process-section">
      <div className="container">
        <SectionIntro
          eyebrow={t.sectionLabels.processEyebrow}
          title={t.sectionLabels.processTitle}
        />
        <div className="process-grid">
          {t.process.map((item) => (
            <article className="process-step" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ t }: { t: Translation }) {
  return (
    <section className="section-band testimonials-section">
      <div className="container">
        <SectionIntro
          eyebrow={t.sectionLabels.testimonialsEyebrow}
          title={t.sectionLabels.testimonialsTitle}
        />
        <div className="testimonial-grid">
          {t.testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <div className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <p>"{testimonial.quote}"</p>
              <strong>{testimonial.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ t }: { t: Translation }) {
  return (
    <section className="section-band about-section" id="about">
      <div className="container about-layout">
        <div>
          <SectionIntro
            eyebrow={t.sectionLabels.aboutEyebrow}
            title={t.sectionLabels.aboutTitle}
            body={t.about.body}
          />
          <div className="about-points">
            {t.about.points.map((point) => (
              <span key={point}>
                <ShieldCheck size={17} />
                {point}
              </span>
            ))}
          </div>
        </div>
        <div className="about-panel">
          <img src="/logo.png" alt="KRKN Garage logo badge" />
          <p>krkngarage.com</p>
          <strong>{t.footer.slogan}</strong>
        </div>
      </div>
    </section>
  );
}

function Contact({
  t,
  handleQuoteSubmit,
  quoteStatus,
}: {
  t: Translation;
  handleQuoteSubmit: (event: FormEvent<HTMLFormElement>) => void;
  quoteStatus: string;
}) {
  return (
    <section className="section-band contact-section" id="contact">
      <div className="container contact-layout">
        <div>
          <SectionIntro
            eyebrow={t.sectionLabels.contactEyebrow}
            title={t.sectionLabels.contactTitle}
            body={t.contact.body}
          />
          <div className="contact-cards">
            {t.contact.cards.map((card, index) => {
              const icons = [Phone, Mail, MapPin, Instagram];
              const Icon = icons[index] ?? Phone;
              const hrefs = [
                'tel:+15550000000',
                'mailto:info@krkngarage.com',
                'https://www.google.com/maps/search/?api=1&query=USA',
                'https://www.instagram.com/krkngarage',
              ];
              const isExternal = hrefs[index]?.startsWith('https://');
              return (
                <a
                  className="contact-card"
                  href={hrefs[index] ?? '#contact'}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  key={card.label}
                >
                  <Icon size={21} />
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </a>
              );
            })}
          </div>
        </div>

        <form className="quote-form" onSubmit={handleQuoteSubmit}>
          <div className="form-grid">
            <FormField label={t.contact.fields.fullName} name="fullName" autoComplete="name" required />
            <FormField label={t.contact.fields.email} name="email" type="email" autoComplete="email" required />
            <FormField label={t.contact.fields.phone} name="phone" type="tel" autoComplete="tel" />
            <FormField label={t.contact.fields.country} name="country" autoComplete="country-name" />
            <FormField label={t.contact.fields.make} name="make" />
            <FormField label={t.contact.fields.model} name="model" />
            <FormField label={t.contact.fields.year} name="year" inputMode="numeric" />
            <FormField label={t.contact.fields.engine} name="engine" />
          </div>
          <label className="field full-field select-field">
            <span>{t.contact.fields.service}</span>
            <select name="service" required defaultValue="">
              <option value="" disabled>
                {t.contact.fields.service}
              </option>
              {t.contact.serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="field full-field">
            <span>{t.contact.fields.message}</span>
            <textarea name="message" rows={5} placeholder={t.contact.fields.message} />
          </label>
          <button className="primary-button form-submit" type="submit">
            {t.common.requestQuote}
            <ArrowRight size={18} />
          </button>
          {quoteStatus && (
            <p className="form-status" role="status">
              {quoteStatus}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type = 'text',
  autoComplete,
  inputMode,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?: 'numeric' | 'text' | 'email' | 'tel' | 'url' | 'search' | 'decimal';
  required?: boolean;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
      />
    </label>
  );
}

function Footer({
  t,
  handleNewsletterSubmit,
  newsletterStatus,
  showCategory,
  showToast,
}: {
  t: Translation;
  handleNewsletterSubmit: (event: FormEvent<HTMLFormElement>) => void;
  newsletterStatus: string;
  showCategory: (category: CategoryId) => void;
  showToast: (message: string) => void;
}) {
  const footerLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.performance, href: '#performance' },
    { label: t.nav.shop, href: '#shop' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo.png" alt="KRKN Garage logo" />
          <p>{t.footer.slogan}</p>
          <span>krkngarage.com</span>
        </div>
        <div>
          <h2>{t.footer.quickLinks}</h2>
          <div className="footer-links">
            {footerLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2>{t.footer.shopCategories}</h2>
          <div className="footer-links">
            {categoryIds.slice(0, 8).map((category) => (
              <a href="#shop-products" key={category} onClick={() => showCategory(category)}>
                {t.categoryLabels[category]}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2>{t.footer.newsletter}</h2>
          <p>{t.footer.newsletterBody}</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" placeholder={t.footer.emailPlaceholder} required />
            <button type="submit">{t.footer.subscribe}</button>
          </form>
          {newsletterStatus && (
            <p className="newsletter-status" role="status">
              {newsletterStatus}
            </p>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>{t.footer.copyright}</p>
        <div>
          {t.footer.legal.map((item) => (
            <button type="button" key={item} onClick={() => showToast(t.common.legalMessage)}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default App;
