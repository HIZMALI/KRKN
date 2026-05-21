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
  'exhaust',
  'intake',
  'performance',
  'suspension',
  'brakes',
  'carbon',
  'body-kit',
  'wheels',
  'car-care',
  'detailing',
  'merchandise',
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
  items: string[];
  note?: string;
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
    dynoEyebrow: string;
    dynoTitle: string;
    dynoBody: string;
    mediaEyebrow: string;
    mediaTitle: string;
    mediaBody: string;
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
  dyno: {
    headline: string;
    description: string;
    metrics: { label: string; value: string }[];
    cards: { title: string; body: string }[];
  };
  media: {
    clips: { title: string; path: string; label: string }[];
    playLabel: string;
  };
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

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const translations: Record<Language, Translation> = {
  en: {
    meta: { title: 'KRKN Eluxx Customs | Detailing, Tuning, Dyno & Performance Parts', description: 'Premium automotive customization company for detailing, ECU tuning, dyno services, aftermarket performance parts and professional installation.' },
    nav: { home: 'Home', services: 'Services', performance: 'Performance', projects: 'Projects', shop: 'Shop', about: 'About', contact: 'Contact', consultation: 'Book a Consultation', cart: 'Cart', account: 'Account' },
    hero: { eyebrow: 'KRKN Eluxx Customs // Detailing, Tuning & Aftermarket Performance', headline: 'Detail. Tune. Customize.', subheadline: 'KRKN Eluxx Customs delivers premium detailing, ECU tuning, dyno services, aftermarket performance parts and professional installation for drivers who demand a sharper, cleaner and stronger vehicle.', explore: 'Explore Services', shop: 'Shop Performance Parts', quote: 'Book a Consultation', imageAlt: 'Modified performance coupe in a dark premium customization studio with red accent lighting', badges: ['Premium Detailing', 'ECU Tuning', 'Dyno Testing', 'Performance Parts', 'Professional Installation'], stats: [{ value: 'Detail', label: 'PPF, coating and restoration' }, { value: 'Tune', label: 'Stage 1-3 calibration' }, { value: 'Dyno', label: 'Power and torque validation' }, { value: 'Install', label: 'Aftermarket parts fitted cleanly' }] },
    sectionLabels: { servicesEyebrow: 'Customization Pillars', servicesTitle: 'Detailing, tuning and aftermarket performance under one roof.', servicesBody: 'KRKN Eluxx Customs provides premium detailing, ECU tuning, dyno services, aftermarket performance parts and professional installation for automotive enthusiasts.', packagesEyebrow: 'Performance Packages', packagesTitle: 'Staged tuning with a measured, professional approach.', packagesBody: 'Every performance upgrade is matched to vehicle condition, supporting hardware, fuel quality, dyno feedback and intended use.', gainsEyebrow: 'Measured Potential', gainsTitle: 'Sample estimated performance ranges.', gainsBody: 'Use these examples as consultation starting points. Real results depend on vehicle, hardware, calibration and maintenance.', dynoEyebrow: 'Dyno Services', dynoTitle: 'Dyno-Tested Performance', dynoBody: 'Our dyno service helps measure horsepower, torque and power delivery before and after tuning. It provides a clearer view of real performance gains and supports safer calibration.', mediaEyebrow: 'Cinematic Process', mediaTitle: 'Crafted in Motion', mediaBody: 'From detailing finishes to dyno-tested performance, every KRKN Eluxx Customs project is built to be seen, heard and felt.', shopEyebrow: 'Aftermarket Performance Shop', shopTitle: 'Selected parts, care products and install-ready packages.', shopBody: 'Browse exhaust systems, air intakes, detailing products, performance parts and dyno-ready packages prepared for quote and checkout integration.', categoriesEyebrow: 'Shop Categories', categoriesTitle: 'Parts and car care organized around real build paths.', projectsEyebrow: 'Featured Customs', projectsTitle: 'Detail, protection, power and installation in one build language.', whyEyebrow: 'Why Choose KRKN Eluxx Customs', whyTitle: 'A premium customization experience from consultation to delivery.', processEyebrow: 'Process', processTitle: 'Consult, protect, tune, validate.', testimonialsEyebrow: 'Client Feedback', testimonialsTitle: 'Trusted by drivers who care about the details.', aboutEyebrow: 'About KRKN Eluxx Customs', aboutTitle: 'A premium customs house for presence, protection and power.', contactEyebrow: 'Quote Request', contactTitle: 'Tell us about your vehicle and goals.' },
    common: { learnMore: 'Learn More', viewProject: 'View Project', viewDetails: 'View Details', addToCart: 'Add to Cart', addAgain: 'Add Again', added: 'Added', visitShop: 'Visit Shop', requestQuote: 'Request a Quote', requestFitment: 'Request Fitment Check', checkoutQuote: 'Request Checkout Link', allCategories: 'All Categories', allBrands: 'All Brands', vehiclePlaceholder: 'Vehicle compatibility', searchPlaceholder: 'Search performance parts', category: 'Category', stock: 'Stock', compatibility: 'Compatibility', sampleResults: 'Sample estimated results. Actual gains may vary.', disclaimer: 'Performance modifications may affect warranty, emissions compliance and road legality depending on vehicle, location and usage. KRKN Eluxx Customs recommends responsible and legal use.', cartEmpty: 'Your cart is ready for parts.', cartTitle: 'Temporary Cart', cartItems: 'items', favorite: 'Add to wishlist', favorited: 'Saved to wishlist', accountMessage: 'Customer account access is ready for future login integration.', cartMessage: 'Added to your temporary cart.', newsletterSuccess: 'You are on the KRKN Eluxx Customs update list.', sale: 'Sale', close: 'Close', openMenu: 'Open menu', closeMenu: 'Close menu', accountTitle: 'KRKN Eluxx Account', accountAction: 'Request Account Access', projectBrief: 'Project Details', requestSimilarBuild: 'Request Similar Build', wishlistAdded: 'Saved to wishlist.', wishlistRemoved: 'Removed from wishlist.', noProducts: 'No matching parts yet. Adjust filters or request a fitment check.', legalMessage: 'Policy details are ready for future checkout integration.' },
    categoryLabels: { exhaust: 'Exhaust Systems', intake: 'Air Intake Systems', performance: 'Performance Parts', suspension: 'Suspension', brakes: 'Brakes', carbon: 'Carbon Parts', 'body-kit': 'Body Kits', wheels: 'Wheels', 'car-care': 'Car Care', detailing: 'Detailing Products', merchandise: 'Merchandise' },
    categoryDescriptions: { exhaust: 'Catback systems, downpipes and branded exhaust upgrades.', intake: 'Cold air intakes and airflow support for tuned engines.', performance: 'ECU packages, dyno sessions and power upgrades.', suspension: 'Ride height, grip and handling control.', brakes: 'Stopping power for tuned street builds.', carbon: 'Lightweight lips, trims and aero details.', 'body-kit': 'Exterior conversion pieces and clean visual styling.', wheels: 'Forged alloys, tires and fitment essentials.', 'car-care': 'Protection, coatings and detailing supplies.', detailing: 'PPF, VIP detailing and surface protection packages.', merchandise: 'KRKN Eluxx Customs apparel and branded essentials.' },
    stockLabels: { in: 'In Stock', low: 'Low Stock', preorder: 'Pre-order' },
    services: [{ title: 'Detailing', description: 'From PPF and ceramic coating to detailed interior and exterior restoration, KRKN Eluxx Customs protects and refines every surface of your vehicle.', items: ['PPF / Paint Protection Film', 'Ceramic Coating', 'Interior Detailing', 'Exterior Detailing', 'Interior Restoration', 'Exterior Restoration', 'VIP Car Wash', 'Paint Correction', 'Premium Car Care'] }, { title: 'Tuning', description: 'Our tuning services are designed to unlock safer, sharper and more responsive performance through ECU remapping, staged upgrades and custom calibration.', items: ['ECU Remapping', 'Stage 1 Tuning', 'Stage 2 Tuning', 'Stage 3 Tuning', 'VMAX Off / Speed Limiter Removal', 'TCU / Gearbox Tuning', 'Performance Diagnostics', 'Custom Calibration'], note: 'Availability depends on vehicle model, local regulations and intended use.' }, { title: 'Aftermarket Parts', description: 'We supply and install selected aftermarket parts including branded exhaust systems, air intakes, carbon parts, suspension kits and performance components.', items: ['Branded Exhaust Systems', 'Air Intake Systems', 'Performance Parts', 'Suspension Kits', 'Brake Upgrades', 'Carbon Parts', 'Body Kits', 'Wheels', 'Installation Service'] }, { title: 'Dyno Services', description: 'Our dyno service helps measure horsepower, torque and power delivery before and after tuning while supporting safer calibration decisions.', items: ['Dyno Testing', 'Before / After Power Measurement', 'Tuning Validation', 'Power Curve Analysis', 'Torque Curve Analysis', 'Performance Report', 'Safe Calibration Support'] }],
    packages: [{ title: 'Stage 1', subtitle: 'For daily drivers seeking safe and noticeable performance gains.', features: ['ECU optimization', 'Improved throttle response', 'Better torque delivery', 'No major hardware required'] }, { title: 'Stage 2', subtitle: 'For cars with hardware upgrades.', features: ['Downpipe/exhaust support', 'Intake optimization', 'Stronger torque curve', 'Advanced calibration'] }, { title: 'Stage 3', subtitle: 'For serious custom builds.', features: ['Turbo upgrade support', 'Fuel system optimization', 'Custom dyno-focused calibration', 'Project consultation'] }],
    dyno: { headline: 'Dyno-Tested Performance', description: 'Our dyno service helps measure horsepower, torque and power delivery before and after tuning. It provides a clearer view of real performance gains and supports safer calibration.', metrics: [{ value: 'HP', label: 'Horsepower measurement' }, { value: 'TQ', label: 'Torque curve analysis' }, { value: 'Before / After', label: 'Comparison report' }, { value: 'Safe', label: 'Calibration support' }], cards: [{ title: 'Dyno Testing', body: 'Measure sample estimated figures in a controlled rolling-road environment.' }, { title: 'Before / After Measurement', body: 'Compare baseline and post-tune delivery with a clearer performance view.' }, { title: 'Power Curve Analysis', body: 'Review how horsepower and torque build across the usable rev range.' }, { title: 'Performance Report', body: 'Prepare a polished report for consultation, validation and future upgrade planning.' }] },
    media: { clips: [{ title: 'Detailing Finish', path: '/videos/detailing.mp4', label: 'Placeholder video path ready' }, { title: 'Dyno Test Session', path: '/videos/dyno-test.mp4', label: 'Fallback visual active' }, { title: 'Custom Installation', path: '/videos/garage-hero.mp4', label: 'Replace with royalty-free footage' }], playLabel: 'Preview motion concept' },
    why: ['Detailing and performance under one roof', 'Professional installation', 'Dyno-supported tuning', 'Premium aftermarket parts', 'Paint protection expertise', 'Enthusiast-focused service', 'Transparent consultation', 'Bilingual customer experience'],
    process: [{ step: '01', title: 'Consultation', description: 'We understand your vehicle, goals, usage and build priorities.' }, { step: '02', title: 'Protection & Preparation', description: 'We inspect paint, interior, hardware and vehicle condition before work begins.' }, { step: '03', title: 'Install & Tune', description: 'We install selected parts, refine surfaces and calibrate performance with care.' }, { step: '04', title: 'Dyno & Delivery', description: 'We validate results where appropriate and deliver a cleaner, stronger, more personal car.' }],
    testimonials: [{ quote: 'KRKN Eluxx Customs made the car feel sharper and look dramatically cleaner. The process felt premium from start to finish.', name: 'Daniel R.' }, { quote: 'Professional team, clean installation and great communication from start to finish.', name: 'Carlos M.' }, { quote: 'The PPF and ceramic coating finish gave the car the exact protected, high-gloss look I wanted.', name: 'Emre K.' }, { quote: 'The dyno-supported consultation made the Stage 2 setup feel responsible and properly measured.', name: 'Alex T.' }],
    projects: [{ title: 'BMW M Performance Detail & Stage 1 Tune', services: 'Paint correction, ceramic coating, ECU remap and dyno-supported validation.', tags: ['Detailing', 'ECU Tune', 'Stage 1', 'Dyno'], visual: 'project-m' }, { title: 'Audi S-Line Exhaust & Air Intake Setup', services: 'Branded exhaust system, cold air intake, fitment check and installation.', tags: ['Exhaust', 'Air Intake', 'Installation', 'Stage 1'], visual: 'project-audi' }, { title: 'Mercedes AMG Style Exterior Restoration', services: 'Exterior restoration, paint correction, carbon styling and wheel fitment.', tags: ['Restoration', 'Carbon', 'Wheels', 'Detailing'], visual: 'project-amg' }, { title: 'VW Golf GTI Stage 2 Dyno Calibration', services: 'Downpipe, intake, ECU calibration, dyno testing and torque curve review.', tags: ['Stage 2', 'Dyno', 'ECU Tune', 'Air Intake'], visual: 'project-gti' }, { title: 'Porsche Ceramic Coating & PPF Package', services: 'PPF package, ceramic coating, premium car care and delivery inspection.', tags: ['PPF', 'Ceramic', 'Detailing', 'Protection'], visual: 'project-porsche' }, { title: 'JDM Custom Build with Aftermarket Parts', services: 'Suspension, exhaust, body kit, carbon parts and project detailing.', tags: ['Installation', 'Exhaust', 'Carbon', 'Body Kit'], visual: 'project-jdm' }],
    about: { body: 'KRKN Eluxx Customs was founded to bring detailing, tuning and aftermarket customization together under one premium automotive experience. From PPF, VIP detailing and interior restoration to ECU tuning, dyno testing and performance part installation, we help enthusiasts build vehicles with presence, protection and power.', points: ['Premium detailing, paint protection and restoration', 'ECU tuning supported by diagnostics and dyno validation', 'Selected aftermarket parts supply and installation', 'Bilingual consultation for enthusiast builds'] },
    contact: { body: 'Send your vehicle details and desired service. The KRKN Eluxx Customs team can prepare a detailing, tuning, dyno, installation or parts quote for your build.', fields: { fullName: 'Full Name', email: 'Email', phone: 'Phone', country: 'Country', make: 'Vehicle Make', model: 'Vehicle Model', year: 'Vehicle Year', engine: 'Engine', service: 'Desired Service', message: 'Message' }, serviceOptions: ['PPF / Paint Protection Film', 'Ceramic Coating', 'VIP Detailing', 'Interior Restoration', 'Exterior Restoration', 'ECU Remapping', 'Stage 1 Tuning', 'Stage 2 Tuning', 'Stage 3 Tuning', 'VMAX Off', 'Dyno Test', 'Exhaust System', 'Air Intake', 'Aftermarket Parts', 'Parts Installation', 'Custom Project'], submitSuccess: 'Quote request received. This demo keeps the request on-screen and is ready for backend integration.', cards: [{ label: 'WhatsApp', value: '+1 555 000 0000' }, { label: 'Email', value: 'info@krkneluxxcustoms.com' }, { label: 'Location', value: 'USA' }, { label: 'Instagram', value: '@krkneluxxcustoms' }] },
    footer: { slogan: 'Detailing. Tuning. Aftermarket Performance.', quickLinks: 'Quick Links', services: 'Services', shopCategories: 'Shop Categories', contact: 'Contact', newsletter: 'Newsletter', newsletterBody: 'Get detailing notes, tuning updates, product drops and project previews.', emailPlaceholder: 'Email address', subscribe: 'Subscribe', copyright: '© 2026 KRKN Eluxx Customs. All rights reserved.', legal: ['Privacy Policy', 'Terms & Conditions', 'Return Policy', 'Cookie Policy'] },
  },
  es: {
    meta: { title: 'KRKN Eluxx Customs | Detailing, Tuning, Dyno y Piezas de Rendimiento', description: 'Empresa premium de personalización automotriz para detailing, reprogramación ECU, servicios dyno, piezas aftermarket de rendimiento e instalación profesional.' },
    nav: { home: 'Inicio', services: 'Servicios', performance: 'Rendimiento', projects: 'Proyectos', shop: 'Tienda', about: 'Acerca', contact: 'Contacto', consultation: 'Reservar una consulta', cart: 'Carrito', account: 'Cuenta' },
    hero: { eyebrow: 'KRKN Eluxx Customs // Detailing, Tuning y Rendimiento Aftermarket', headline: 'Detalla. Potencia. Personaliza.', subheadline: 'KRKN Eluxx Customs ofrece detailing premium, reprogramación ECU, servicios dyno, piezas aftermarket de alto rendimiento e instalación profesional para conductores que buscan un vehículo más limpio, más fuerte y más exclusivo.', explore: 'Explorar servicios', shop: 'Comprar piezas de rendimiento', quote: 'Reservar una consulta', imageAlt: 'Coupé de rendimiento modificado en un garage premium oscuro con iluminación roja', badges: ['Detailing premium', 'Reprogramación ECU', 'Pruebas dyno', 'Piezas de rendimiento', 'Instalación profesional'], stats: [{ value: 'Detalle', label: 'PPF, coating y restauración' }, { value: 'Tune', label: 'Calibración Stage 1-3' }, { value: 'Dyno', label: 'Validación de potencia y torque' }, { value: 'Instala', label: 'Piezas aftermarket con acabado limpio' }] },
    sectionLabels: { servicesEyebrow: 'Pilares de Personalización', servicesTitle: 'Detailing, tuning y rendimiento aftermarket bajo un mismo techo.', servicesBody: 'KRKN Eluxx Customs ofrece detailing premium, reprogramación ECU, servicios dyno, piezas aftermarket de rendimiento e instalación profesional para entusiastas del automóvil.', packagesEyebrow: 'Paquetes de Rendimiento', packagesTitle: 'Tuning por etapas con un enfoque medido y profesional.', packagesBody: 'Cada mejora de rendimiento se adapta al estado del vehículo, hardware de soporte, calidad de combustible, feedback dyno y uso previsto.', gainsEyebrow: 'Potencial Medido', gainsTitle: 'Rangos estimados de rendimiento.', gainsBody: 'Usa estos ejemplos como punto de partida para la consulta. Los resultados reales dependen del vehículo, hardware, calibración y mantenimiento.', dynoEyebrow: 'Servicios Dyno', dynoTitle: 'Rendimiento probado en dyno', dynoBody: 'Nuestro servicio dyno permite medir potencia, torque y entrega de rendimiento antes y después del tuning. Ofrece una visión más clara de las ganancias reales y ayuda a una calibración más segura.', mediaEyebrow: 'Proceso Cinemático', mediaTitle: 'Creado en movimiento', mediaBody: 'Desde acabados de detailing hasta rendimiento probado en dyno, cada proyecto de KRKN Eluxx Customs está creado para verse, sentirse y escucharse.', shopEyebrow: 'Tienda Aftermarket Performance', shopTitle: 'Piezas seleccionadas, car care y paquetes listos para instalación.', shopBody: 'Explora sistemas de escape, air intakes, productos de detailing, piezas de rendimiento y paquetes dyno preparados para consulta e integración de checkout.', categoriesEyebrow: 'Categorías de Tienda', categoriesTitle: 'Piezas y car care organizados según rutas reales de proyecto.', projectsEyebrow: 'Customs Destacados', projectsTitle: 'Detalle, protección, potencia e instalación con un mismo lenguaje.', whyEyebrow: 'Por Qué Elegir KRKN Eluxx Customs', whyTitle: 'Una experiencia premium de personalización desde la consulta hasta la entrega.', processEyebrow: 'Proceso', processTitle: 'Consulta, protege, potencia, valida.', testimonialsEyebrow: 'Opiniones de Clientes', testimonialsTitle: 'Confianza de conductores que cuidan cada detalle.', aboutEyebrow: 'Acerca de KRKN Eluxx Customs', aboutTitle: 'Una casa customs premium para presencia, protección y potencia.', contactEyebrow: 'Solicitud de Presupuesto', contactTitle: 'Cuéntanos sobre tu vehículo y tus objetivos.' },
    common: { learnMore: 'Más información', viewProject: 'Ver proyecto', viewDetails: 'Ver detalles', addToCart: 'Añadir al carrito', addAgain: 'Añadir otra vez', added: 'Añadido', visitShop: 'Visitar tienda', requestQuote: 'Solicitar presupuesto', requestFitment: 'Solicitar verificación de compatibilidad', checkoutQuote: 'Solicitar enlace de pago', allCategories: 'Todas las categorías', allBrands: 'Todas las marcas', vehiclePlaceholder: 'Compatibilidad del vehículo', searchPlaceholder: 'Buscar piezas de rendimiento', category: 'Categoría', stock: 'Stock', compatibility: 'Compatibilidad', sampleResults: 'Resultados estimados de muestra. Las ganancias reales pueden variar.', disclaimer: 'Las modificaciones de rendimiento pueden afectar la garantía, el cumplimiento de emisiones y la legalidad en carretera según el vehículo, la ubicación y el uso. KRKN Eluxx Customs recomienda un uso responsable y legal.', cartEmpty: 'Tu carrito está listo para piezas.', cartTitle: 'Carrito temporal', cartItems: 'artículos', favorite: 'Añadir a favoritos', favorited: 'Guardado en favoritos', accountMessage: 'El acceso de cuenta de cliente está listo para una futura integración de login.', cartMessage: 'Añadido a tu carrito temporal.', newsletterSuccess: 'Ya estás en la lista de novedades de KRKN Eluxx Customs.', sale: 'Oferta', close: 'Cerrar', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú', accountTitle: 'Cuenta KRKN Eluxx', accountAction: 'Solicitar acceso', projectBrief: 'Detalles del proyecto', requestSimilarBuild: 'Solicitar proyecto similar', wishlistAdded: 'Guardado en favoritos.', wishlistRemoved: 'Eliminado de favoritos.', noProducts: 'No hay piezas que coincidan. Ajusta los filtros o solicita una verificación de compatibilidad.', legalMessage: 'La información legal está lista para una futura integración de checkout.' },
    categoryLabels: { exhaust: 'Sistemas de escape', intake: 'Air Intake Systems', performance: 'Piezas de rendimiento', suspension: 'Suspensión', brakes: 'Frenos', carbon: 'Piezas de carbono', 'body-kit': 'Body Kits', wheels: 'Ruedas', 'car-care': 'Car Care', detailing: 'Productos de detailing', merchandise: 'Merchandising' },
    categoryDescriptions: { exhaust: 'Sistemas catback, downpipes y escapes de marca.', intake: 'Air intakes y soporte de flujo para motores tuneados.', performance: 'Paquetes ECU, sesiones dyno y mejoras de potencia.', suspension: 'Altura, agarre y control de chasis.', brakes: 'Frenada para proyectos de calle potenciados.', carbon: 'Lips, molduras y aero ligero en carbono.', 'body-kit': 'Piezas exteriores de conversión y estilo limpio.', wheels: 'Llantas forjadas, neumáticos y fitment.', 'car-care': 'Protección, coatings e insumos de detailing.', detailing: 'PPF, detailing VIP y paquetes de protección de superficies.', merchandise: 'Ropa y esenciales de marca KRKN Eluxx Customs.' },
    stockLabels: { in: 'En stock', low: 'Stock limitado', preorder: 'Preventa' },
    services: [{ title: 'Detailing', description: 'Desde PPF y coating cerámico hasta restauración interior y exterior detallada, KRKN Eluxx Customs protege y perfecciona cada superficie de tu vehículo.', items: ['PPF / Película de protección de pintura', 'Coating cerámico', 'Detailing interior', 'Detailing exterior', 'Restauración interior', 'Restauración exterior', 'Lavado VIP', 'Corrección de pintura', 'Car care premium'] }, { title: 'Tuning', description: 'Nuestros servicios de tuning están diseñados para liberar un rendimiento más seguro, preciso y dinámico mediante reprogramación ECU, mejoras por etapas y calibración personalizada.', items: ['Reprogramación ECU', 'Stage 1', 'Stage 2', 'Stage 3', 'VMAX Off / Eliminación de limitador', 'Tuning TCU / Caja', 'Diagnóstico de rendimiento', 'Calibración personalizada'], note: 'La disponibilidad depende del modelo del vehículo, la normativa local y el uso previsto.' }, { title: 'Piezas Aftermarket', description: 'Suministramos e instalamos piezas aftermarket seleccionadas, incluyendo sistemas de escape de marca, air intakes, piezas de carbono, suspensión y componentes de rendimiento.', items: ['Sistemas de escape de marca', 'Air Intake Systems', 'Piezas de rendimiento', 'Kits de suspensión', 'Mejoras de frenos', 'Piezas de carbono', 'Body Kits', 'Ruedas', 'Servicio de instalación'] }, { title: 'Servicios Dyno', description: 'Nuestro servicio dyno permite medir potencia, torque y entrega de rendimiento antes y después del tuning mientras apoya decisiones de calibración más seguras.', items: ['Prueba dyno', 'Medición antes / después', 'Validación de tuning', 'Análisis de curva de potencia', 'Análisis de curva de torque', 'Reporte de rendimiento', 'Soporte para calibración segura'] }],
    packages: [{ title: 'Stage 1', subtitle: 'Para conductores diarios que buscan ganancias seguras y notables.', features: ['Optimización ECU', 'Mejor respuesta del acelerador', 'Entrega de torque más fuerte', 'Sin hardware mayor requerido'] }, { title: 'Stage 2', subtitle: 'Para vehículos con mejoras de hardware.', features: ['Soporte para downpipe/escape', 'Optimización de admisión', 'Curva de torque más contundente', 'Calibración avanzada'] }, { title: 'Stage 3', subtitle: 'Para proyectos serios a medida.', features: ['Soporte para upgrade de turbo', 'Optimización de sistema de combustible', 'Calibración personalizada enfocada en dyno', 'Consultoría de proyecto'] }],
    dyno: { headline: 'Rendimiento probado en dyno', description: 'Nuestro servicio dyno permite medir potencia, torque y entrega de rendimiento antes y después del tuning. Ofrece una visión más clara de las ganancias reales y ayuda a una calibración más segura.', metrics: [{ value: 'HP', label: 'Medición de potencia' }, { value: 'TQ', label: 'Análisis de curva de torque' }, { value: 'Antes / Después', label: 'Reporte comparativo' }, { value: 'Seguro', label: 'Soporte de calibración' }], cards: [{ title: 'Prueba dyno', body: 'Mide cifras estimadas de muestra en un entorno rolling-road controlado.' }, { title: 'Medición antes / después', body: 'Compara entrega base y post-tuning con una visión más clara del rendimiento.' }, { title: 'Análisis de curva', body: 'Revisa cómo se construyen potencia y torque dentro del rango útil de rpm.' }, { title: 'Reporte de rendimiento', body: 'Prepara un reporte pulido para consulta, validación y planificación de upgrades.' }] },
    media: { clips: [{ title: 'Acabado de detailing', path: '/videos/detailing.mp4', label: 'Ruta de video placeholder lista' }, { title: 'Sesión de prueba dyno', path: '/videos/dyno-test.mp4', label: 'Fallback visual activo' }, { title: 'Instalación custom', path: '/videos/garage-hero.mp4', label: 'Reemplazar con footage royalty-free' }], playLabel: 'Vista previa del concepto en movimiento' },
    why: ['Detailing y rendimiento bajo un mismo techo', 'Instalación profesional', 'Tuning apoyado por dyno', 'Piezas aftermarket premium', 'Experiencia en protección de pintura', 'Servicio enfocado en entusiastas', 'Consulta transparente', 'Experiencia bilingüe para clientes'],
    process: [{ step: '01', title: 'Consulta', description: 'Entendemos tu vehículo, objetivos, uso y prioridades del proyecto.' }, { step: '02', title: 'Protección y preparación', description: 'Revisamos pintura, interior, hardware y estado del vehículo antes del trabajo.' }, { step: '03', title: 'Instalación y tuning', description: 'Instalamos piezas seleccionadas, refinamos superficies y calibramos con cuidado.' }, { step: '04', title: 'Dyno y entrega', description: 'Validamos resultados cuando corresponde y entregamos un coche más limpio, fuerte y personal.' }],
    testimonials: [{ quote: 'KRKN Eluxx Customs hizo que el coche se sintiera más preciso y se viera mucho más limpio. El proceso fue premium de principio a fin.', name: 'Daniel R.' }, { quote: 'Equipo profesional, instalación limpia y gran comunicación de principio a fin.', name: 'Carlos M.' }, { quote: 'El PPF y el coating cerámico dieron exactamente el acabado protegido y brillante que quería.', name: 'Emre K.' }, { quote: 'La consulta apoyada por dyno hizo que el Stage 2 se sintiera responsable y bien medido.', name: 'Alex T.' }],
    projects: [{ title: 'BMW M Performance Detail & Stage 1 Tune', services: 'Corrección de pintura, coating cerámico, reprogramación ECU y validación dyno.', tags: ['Detailing', 'ECU Tune', 'Stage 1', 'Dyno'], visual: 'project-m' }, { title: 'Audi S-Line Exhaust & Air Intake Setup', services: 'Sistema de escape de marca, cold air intake, verificación de fitment e instalación.', tags: ['Escape', 'Air Intake', 'Instalación', 'Stage 1'], visual: 'project-audi' }, { title: 'Mercedes AMG Style Exterior Restoration', services: 'Restauración exterior, corrección de pintura, estilo carbono y fitment de ruedas.', tags: ['Restauración', 'Carbono', 'Ruedas', 'Detailing'], visual: 'project-amg' }, { title: 'VW Golf GTI Stage 2 Dyno Calibration', services: 'Downpipe, intake, calibración ECU, prueba dyno y revisión de curva de torque.', tags: ['Stage 2', 'Dyno', 'ECU Tune', 'Air Intake'], visual: 'project-gti' }, { title: 'Porsche Ceramic Coating & PPF Package', services: 'Paquete PPF, coating cerámico, car care premium e inspección de entrega.', tags: ['PPF', 'Ceramic', 'Detailing', 'Protección'], visual: 'project-porsche' }, { title: 'JDM Custom Build with Aftermarket Parts', services: 'Suspensión, escape, body kit, piezas de carbono y detailing de proyecto.', tags: ['Instalación', 'Escape', 'Carbono', 'Body Kit'], visual: 'project-jdm' }],
    about: { body: 'KRKN Eluxx Customs fue creada para unir detailing, tuning y personalización aftermarket en una experiencia automotriz premium. Desde PPF, detailing VIP y restauración interior hasta reprogramación ECU, pruebas dyno e instalación de piezas de rendimiento, ayudamos a los entusiastas a crear vehículos con presencia, protección y potencia.', points: ['Detailing premium, protección de pintura y restauración', 'Reprogramación ECU apoyada por diagnóstico y validación dyno', 'Suministro e instalación de piezas aftermarket seleccionadas', 'Consulta bilingüe para proyectos de entusiastas'] },
    contact: { body: 'Envía los datos de tu vehículo y el servicio deseado. El equipo de KRKN Eluxx Customs puede preparar una cotización de detailing, tuning, dyno, instalación o piezas para tu proyecto.', fields: { fullName: 'Nombre completo', email: 'Email', phone: 'Teléfono', country: 'País', make: 'Marca del vehículo', model: 'Modelo del vehículo', year: 'Año del vehículo', engine: 'Motor', service: 'Servicio deseado', message: 'Mensaje' }, serviceOptions: ['PPF / Película de protección de pintura', 'Coating cerámico', 'Detailing VIP', 'Restauración interior', 'Restauración exterior', 'Reprogramación ECU', 'Stage 1', 'Stage 2', 'Stage 3', 'VMAX Off', 'Prueba dyno', 'Sistema de escape', 'Air intake', 'Piezas aftermarket', 'Instalación de piezas', 'Proyecto personalizado'], submitSuccess: 'Solicitud recibida. Esta demo mantiene la solicitud en pantalla y está lista para integración backend.', cards: [{ label: 'WhatsApp', value: '+1 555 000 0000' }, { label: 'Email', value: 'info@krkneluxxcustoms.com' }, { label: 'Ubicación', value: 'EE. UU.' }, { label: 'Instagram', value: '@krkneluxxcustoms' }] },
    footer: { slogan: 'Detailing. Tuning. Rendimiento aftermarket.', quickLinks: 'Enlaces rápidos', services: 'Servicios', shopCategories: 'Categorías', contact: 'Contacto', newsletter: 'Newsletter', newsletterBody: 'Recibe notas de detailing, novedades de tuning, lanzamientos de piezas y proyectos.', emailPlaceholder: 'Email', subscribe: 'Suscribirse', copyright: '© 2026 KRKN Eluxx Customs. Todos los derechos reservados.', legal: ['Política de Privacidad', 'Términos y Condiciones', 'Política de Devoluciones', 'Política de Cookies'] },
  },
};

const products: Product[] = [
  { id: 'premium-catback-exhaust', name: { en: 'Premium Catback Exhaust System', es: 'Sistema de Escape Catback Premium' }, description: { en: 'Branded stainless exhaust package for deeper tone, cleaner flow and professional fitment.', es: 'Paquete de escape de acero inoxidable de marca para sonido más profundo, mejor flujo y fitment profesional.' }, category: 'exhaust', price: '$1,240', stock: 'low', brand: 'FlowRace', compatibility: ['VW Golf GTI', 'Audi S3', 'BMW 320i'], visual: 'visual-exhaust' },
  { id: 'performance-downpipe', name: { en: 'Performance Downpipe', es: 'Downpipe de Rendimiento' }, description: { en: 'High-flow downpipe for Stage 2-ready exhaust response and torque support.', es: 'Downpipe high-flow para respuesta de escape y soporte de torque en Stage 2.' }, category: 'exhaust', price: '$540', originalPrice: '$620', sale: true, stock: 'in', brand: 'TurboLine', compatibility: ['Audi S3', 'VW Golf GTI', 'BMW 520d'], visual: 'visual-downpipe' },
  { id: 'cold-air-intake', name: { en: 'Cold Air Intake Kit', es: 'Kit Cold Air Intake' }, description: { en: 'Improved airflow and sharper induction sound for tuned turbo engines.', es: 'Mejor flujo de aire y sonido de admisión más definido para motores turbo tuneados.' }, category: 'intake', price: '$330', stock: 'in', brand: 'AirForge', compatibility: ['VW Golf GTI', 'Audi S3', 'BMW 320i'], visual: 'visual-intake' },
  { id: 'carbon-front-lip', name: { en: 'Carbon Fiber Front Lip', es: 'Front Lip de Fibra de Carbono' }, description: { en: 'Lightweight aero upgrade with a gloss carbon finish for aggressive front-end styling.', es: 'Upgrade aero ligero con acabado carbono brillante para un frontal más agresivo.' }, category: 'carbon', price: '$690', originalPrice: '$820', sale: true, stock: 'in', brand: 'KRKN Aero', compatibility: ['BMW 3 Series', 'Audi A4', 'Mercedes C-Class'], visual: 'visual-carbon' },
  { id: 'ceramic-coating-kit', name: { en: 'Ceramic Coating Kit', es: 'Kit de Coating Cerámico' }, description: { en: 'High-gloss paint protection kit for long-lasting depth and easier maintenance.', es: 'Kit de protección de pintura con alto brillo, profundidad duradera y mantenimiento sencillo.' }, category: 'car-care', price: '$145', stock: 'in', brand: 'DetailPro', compatibility: ['Universal'], visual: 'visual-care' },
  { id: 'ppf-protection-package', name: { en: 'PPF Protection Package', es: 'Paquete de Protección PPF' }, description: { en: 'Paint protection film consultation package for front-end, high-impact and full-body coverage.', es: 'Paquete de consulta para película de protección de pintura en frontal, zonas de impacto o cobertura completa.' }, category: 'detailing', price: '$890', stock: 'preorder', brand: 'KRKN Eluxx Customs', compatibility: ['Universal'], visual: 'visual-ppf' },
  { id: 'stage-1-remap', name: { en: 'Stage 1 ECU Remap Package', es: 'Paquete Reprogramación ECU Stage 1' }, description: { en: 'Daily-friendly ECU optimization for stronger torque and improved throttle response.', es: 'Optimización ECU para uso diario con más torque y mejor respuesta del acelerador.' }, category: 'performance', price: '$390', stock: 'in', brand: 'KRKN Tune', compatibility: ['BMW 320i', 'Audi A4', 'Mercedes C200', 'BMW 520d'], visual: 'visual-ecu' },
  { id: 'sport-suspension-kit', name: { en: 'Sport Suspension Kit', es: 'Kit de Suspensión Sport' }, description: { en: 'Lower stance, better road feel and controlled handling for fast street cars.', es: 'Menor altura, mejor tacto de carretera y control para coches de calle rápidos.' }, category: 'suspension', price: '$980', stock: 'in', brand: 'ApexRide', compatibility: ['BMW 3 Series', 'Mercedes C-Class', 'Audi A4'], visual: 'visual-suspension' },
  { id: 'big-brake-kit', name: { en: 'Big Brake Kit', es: 'Big Brake Kit' }, description: { en: 'Larger calipers and performance discs for stronger, more consistent stopping power.', es: 'Pinzas más grandes y discos de rendimiento para frenada más fuerte y consistente.' }, category: 'brakes', price: '$2,450', stock: 'preorder', brand: 'StopForce', compatibility: ['BMW M Series', 'Audi S3', 'VW Golf GTI'], visual: 'visual-brakes' },
  { id: 'forged-wheels', name: { en: 'Forged Alloy Wheels', es: 'Llantas Forjadas de Aleación' }, description: { en: 'Lightweight forged wheel set with premium concave fitment options.', es: 'Juego de llantas forjadas ligeras con opciones premium de fitment cóncavo.' }, category: 'wheels', price: '$1,890', originalPrice: '$2,150', sale: true, stock: 'low', brand: 'KRKN Forged', compatibility: ['BMW 3 Series', 'Audi A4', 'Mercedes C-Class', 'VW Golf GTI'], visual: 'visual-wheels' },
  { id: 'vip-detailing-package', name: { en: 'VIP Detailing Package', es: 'Paquete Detailing VIP' }, description: { en: 'Premium interior and exterior detailing session with paint refinement and delivery inspection.', es: 'Sesión premium de detailing interior y exterior con refinado de pintura e inspección de entrega.' }, category: 'detailing', price: '$320', stock: 'in', brand: 'KRKN Eluxx Customs', compatibility: ['Universal'], visual: 'visual-detailing' },
  { id: 'dyno-test-session', name: { en: 'Dyno Test Session', es: 'Sesión de Prueba Dyno' }, description: { en: 'Rolling-road power measurement session with sample estimated HP and torque report.', es: 'Sesión rolling-road de medición de potencia con reporte estimado de HP y torque.' }, category: 'performance', price: '$180', stock: 'in', brand: 'KRKN Dyno', compatibility: ['BMW 320i', 'Audi S3', 'VW Golf GTI', 'Mercedes C200'], visual: 'visual-dyno' },
  { id: 'krkn-eluxx-hoodie', name: { en: 'KRKN Eluxx Customs Hoodie', es: 'Hoodie KRKN Eluxx Customs' }, description: { en: 'Premium heavyweight customs hoodie with restrained motorsport styling.', es: 'Hoodie premium de alto gramaje con estilo motorsport sobrio.' }, category: 'merchandise', price: '$68', stock: 'in', brand: 'KRKN Eluxx Customs', compatibility: ['Universal'], visual: 'visual-shirt' },
];

const gainRows = [
  { car: 'BMW 320i', hp: '+45 HP', torque: '+80 Nm' },
  { car: 'VW Golf GTI', hp: '+60 HP', torque: '+95 Nm' },
  { car: 'Audi A4 2.0 TDI', hp: '+50 HP', torque: '+100 Nm' },
  { car: 'Mercedes C200', hp: '+40 HP', torque: '+75 Nm' },
  { car: 'BMW 520d', hp: '+55 HP', torque: '+110 Nm' },
  { car: 'Audi S3', hp: '+70 HP', torque: '+120 Nm' },
];

const serviceIcons: LucideIcon[] = [Sparkles, Cpu, Package, Activity];

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
        <DynoSection t={t} />
        <MediaSection t={t} />
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
      <a href="#home" className="brand" aria-label="KRKN Eluxx Customs home" onClick={closeMenu}>
        <img src={publicAsset('logo.png')} alt="KRKN Eluxx Customs logo" />
        <span>KRKN Eluxx Customs</span>
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
      <img src={publicAsset('assets/krkn-hero-garage.png')} alt={t.hero.imageAlt} className="hero-bg" />
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
          <div className="trust-badges" aria-label="KRKN Eluxx Customs specialties">
            {t.hero.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
        <div className="hero-stat-panel" aria-label="KRKN Eluxx Customs statistics">
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
                <div className="service-items">
                  {service.items.slice(0, 4).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
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
              <div className="service-detail-list">
                {activeService.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              {activeService.note && <small>{activeService.note}</small>}
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

function DynoSection({ t }: { t: Translation }) {
  return (
    <section className="section-band dyno-section" id="dyno">
      <div className="container dyno-layout">
        <div>
          <SectionIntro
            eyebrow={t.sectionLabels.dynoEyebrow}
            title={t.sectionLabels.dynoTitle}
            body={t.sectionLabels.dynoBody}
          />
          <div className="dyno-card-grid">
            {t.dyno.cards.map((card) => (
              <article className="dyno-info-card" key={card.title}>
                <Gauge size={20} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="dyno-visual" aria-label={t.dyno.headline}>
          <div className="dyno-room">
            <div className="rolling-road">
              <span />
              <span />
            </div>
            <div className="dyno-car">
              <Car size={58} />
            </div>
          </div>
          <div className="dyno-chart">
            <div className="chart-header">
              <span>{t.dyno.headline}</span>
              <strong>{t.common.sampleResults}</strong>
            </div>
            <svg viewBox="0 0 420 180" role="img" aria-label={t.dyno.description}>
              <defs>
                <linearGradient id="powerLine" x1="0" x2="1" y1="0" y2="0">
                  <stop stopColor="#a7adb6" />
                  <stop offset="1" stopColor="#ef233c" />
                </linearGradient>
              </defs>
              <path className="chart-grid-line" d="M20 142H400M20 100H400M20 58H400" />
              <path className="torque-curve" d="M20 132 C85 96, 136 70, 200 78 C270 88, 320 62, 400 50" />
              <path className="power-curve" d="M20 150 C90 136, 132 112, 190 92 C262 67, 324 44, 400 28" />
            </svg>
          </div>
          <div className="dyno-metrics">
            {t.dyno.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaSection({ t }: { t: Translation }) {
  return (
    <section className="section-band media-section">
      <div className="container">
        <SectionIntro
          eyebrow={t.sectionLabels.mediaEyebrow}
          title={t.sectionLabels.mediaTitle}
          body={t.sectionLabels.mediaBody}
        />
        <div className="media-grid">
          {t.media.clips.map((clip, index) => (
            <article
              className={`motion-card motion-card-${index + 1}`}
              data-video-src={publicAsset(clip.path)}
              key={clip.path}
            >
              <div className="motion-overlay" />
              <button type="button" className="play-button" aria-label={`${t.media.playLabel}: ${clip.title}`}>
                <span />
              </button>
              <div className="motion-copy">
                <h3>{clip.title}</h3>
                <p>{clip.label}</p>
              </div>
            </article>
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
          <img src={publicAsset('logo.png')} alt="KRKN Eluxx Customs logo badge" />
          <p>krkneluxxcustoms.com</p>
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
                'mailto:info@krkneluxxcustoms.com',
                'https://www.google.com/maps/search/?api=1&query=USA',
                'https://www.instagram.com/krkneluxxcustoms',
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
          <img src={publicAsset('logo.png')} alt="KRKN Eluxx Customs logo" />
          <p>{t.footer.slogan}</p>
          <span>krkneluxxcustoms.com</span>
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
