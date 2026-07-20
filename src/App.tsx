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
  Film,
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
  Play,
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
import { FormEvent, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import AdminStudio from './AdminStudio';
import { CategoryId, Language, Product, StockStatus, catalogProductsFrom, categoryIds } from './catalog';

type BrandStatement = {
  title: Record<Language, string>;
  body: Record<Language, string>;
  pillars: { title: Record<Language, string>; body: Record<Language, string>; icon: LucideIcon }[];
};

type VehiclePlatform = {
  category: Record<Language, string>;
  name: string;
  tags: string[];
};

type VehicleCategory = {
  id: string;
  label: Record<Language, string>;
  image: string;
};

type TechnicalNote = {
  title: Record<Language, string>;
  tag: Record<Language, string>;
  summary: Record<Language, string>;
  details: Record<Language, string>;
};

const tagTranslations: Record<string, string> = {
  'ecu tune': 'Reprogramación ECU',
  dyno: 'Dyno',
  exhaust: 'Escape',
  intake: 'Air intake',
  'body kit': 'Body kit',
  detailing: 'Detailing',
  ppf: 'PPF',
  carbon: 'Carbono',
  'stage 1': 'Stage 1',
  'stage 2': 'Stage 2',
  'stage 3': 'Stage 3',
  aero: 'Aero',
  sound: 'Sonido',
  valvetronic: 'Valvetronic',
  muffler: 'Muffler',
  headers: 'Headers',
  engine: 'Motor',
  supercharger: 'Supercharger',
  intercooler: 'Intercooler',
  cooling: 'Enfriamiento',
  turbo: 'Turbo',
  'charge pipe': 'Charge pipe',
  boost: 'Boost',
  tcu: 'TCU',
  software: 'Software',
  gearbox: 'Caja',
  coilovers: 'Coilovers',
  handling: 'Handling',
  stance: 'Stance',
  'air suspension': 'Air suspension',
  brakes: 'Frenos',
  'carbon ceramic': 'Carbon ceramic',
  track: 'Track',
  rotors: 'Rotores',
  drag: 'Drag',
  tires: 'Neumáticos',
  hood: 'Capó',
  exterior: 'Exterior',
  wing: 'Wing',
  spoiler: 'Spoiler',
  lighting: 'Iluminación',
  headlights: 'Faros',
  taillights: 'Taillights',
  interior: 'Interior',
  'steering wheel': 'Volante',
  seats: 'Asientos',
  harness: 'Arnés',
  carplay: 'CarPlay',
  electronics: 'Electrónica',
  'ecu unlock': 'ECU unlock',
  tune: 'Tune',
  tint: 'Tint',
  wrap: 'Wrap',
  'roll cage': 'Roll cage',
  safety: 'Seguridad',
  weight: 'Peso',
  battery: 'Batería',
  'lift kit': 'Lift kit',
  truck: 'Truck',
  offroad: 'Offroad',
  'roof rack': 'Roof rack',
  wheels: 'Ruedas',
  suv: 'SUV',
};

function localizeTag(tag: string, language: Language) {
  return language === 'es' ? tagTranslations[tag.toLowerCase()] ?? tag : tag;
}

function searchableTags(tags: string[]) {
  return tags.map((tag) => `${tag} ${tagTranslations[tag.toLowerCase()] ?? ''}`).join(' ');
}

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
    gainsDisclaimer: string;
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
    clips: { title: string; poster: string; video: string; label: string; meta: string }[];
    playLabel: string;
    closeLabel: string;
    unavailableLabel: string;
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
    submitError: string;
    submitting: string;
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

const imageAsset = (name: string) => `assets/images/${name}`;

const imageSource = (path: string) => (path.startsWith('http') ? path : publicAsset(path));

const vehicleAsset = (name: string) => imageAsset(`vehicles/${name}`);

const productAsset = (name: string) => imageAsset(`products/${name}`);

const motionAsset = (name: string) => imageAsset(`motion/${name}`);

const videoAsset = (name: string) => publicAsset(`assets/videos/${name}`);

const serviceImages = [
  imageAsset('detailing-polish.jpg'),
  imageAsset('tuning-engine.jpg'),
  imageAsset('carbon-body.jpg'),
  imageAsset('garage-industrial.jpg'),
];

const projectImages = [
  imageAsset('garage-luxury-dark.jpg'),
  imageAsset('carbon-body.jpg'),
  imageAsset('supercar-street.jpg'),
  imageAsset('tuning-engine.jpg'),
  imageAsset('detailing-polish.jpg'),
  imageAsset('garage-industrial.jpg'),
];

const technicalImages = [
  imageAsset('tuning-engine.jpg'),
  imageAsset('turbo-engine.jpg'),
  imageAsset('garage-industrial.jpg'),
  imageAsset('detailing-polish.jpg'),
  imageAsset('exhaust-close.jpg'),
  imageAsset('turbo-engine.jpg'),
  imageAsset('carbon-body.jpg'),
  imageAsset('brake-wheel.jpg'),
];

const productImageByCategory: Record<CategoryId, string> = {
  exhaust: productAsset('part-catback-exhaust.jpg'),
  intake: productAsset('part-cold-air-intake.jpg'),
  performance: productAsset('part-turbocharger.jpg'),
  suspension: productAsset('part-coilovers.jpg'),
  brakes: productAsset('part-carbon-ceramic-brake.jpg'),
  carbon: productAsset('part-carbon-hood.jpg'),
  'body-kit': productAsset('part-widebody.jpg'),
  wheels: imageAsset('brake-wheel.jpg'),
  lighting: imageAsset('lighting-garage.jpg'),
  interior: imageAsset('interior-racing.jpg'),
  electronics: imageAsset('turbo-engine.jpg'),
  'car-care': imageAsset('detailing-buff.jpg'),
  detailing: imageAsset('detailing-polish.jpg'),
  'track-drag': imageAsset('track-motion.jpg'),
  'suv-truck': imageAsset('suv-offroad.jpg'),
  merchandise: imageAsset('garage-supercars.jpg'),
};

const productImageById: Record<string, string> = {
  'premium-catback-exhaust': productAsset('part-catback-exhaust.jpg'),
  'performance-downpipe': productAsset('part-downpipe.jpg'),
  'cold-air-intake': productAsset('part-cold-air-intake.jpg'),
  'carbon-front-lip': productAsset('part-front-splitter.jpg'),
  'gloss-black-side-skirts': productAsset('part-side-skirts.jpg'),
  'rear-diffuser-kit': productAsset('part-rear-diffuser.jpg'),
  'performance-spoiler': productAsset('part-gt-wing.jpg'),
  'aero-splitter-package': productAsset('part-front-splitter.jpg'),
  'widebody-conversion-kit': productAsset('part-widebody.jpg'),
  'carbon-mirror-caps': imageAsset('carbon-body.jpg'),
  'complete-body-kit-package': productAsset('part-widebody.jpg'),
  'ceramic-coating-kit': imageAsset('detailing-polish.jpg'),
  'ppf-protection-package': imageAsset('detailing-buff.jpg'),
  'stage-1-remap': imageAsset('tuning-engine.jpg'),
  'sport-suspension-kit': productAsset('part-coilovers.jpg'),
  'big-brake-kit': imageAsset('brake-wheel.jpg'),
  'forged-wheels': imageAsset('brake-wheel.jpg'),
  'vip-detailing-package': imageAsset('detailing-polish.jpg'),
  'dyno-test-session': motionAsset('video-dyno-preview.jpg'),
  'valvetronic-exhaust': imageAsset('carbon-exhaust.jpg'),
  'headers-package': productAsset('part-downpipe.jpg'),
  'hybrid-turbo-kit': productAsset('part-turbocharger.jpg'),
  'supercharger-kit': productAsset('part-supercharger.jpg'),
  'front-mount-intercooler': productAsset('part-intercooler.jpg'),
  'charge-pipe-kit': productAsset('part-cold-air-intake.jpg'),
  'blow-off-valve': productAsset('part-turbocharger.jpg'),
  'tcu-tune-package': imageAsset('tuning-engine.jpg'),
  'coilover-kit': productAsset('part-coilovers.jpg'),
  'air-suspension-kit': productAsset('part-air-suspension.jpg'),
  'carbon-ceramic-brakes': productAsset('part-carbon-ceramic-brake.jpg'),
  'slotted-rotors': productAsset('part-carbon-ceramic-brake.jpg'),
  'drag-pack-wheels': imageAsset('brake-wheel.jpg'),
  'performance-tires': imageAsset('brake-wheel.jpg'),
  'carbon-fiber-hood': productAsset('part-carbon-hood.jpg'),
  'gt-wing-package': productAsset('part-gt-wing.jpg'),
  'led-headlights': productAsset('part-led-headlight.jpg'),
  'smoked-taillights': imageAsset('lighting-garage.jpg'),
  'ambient-lighting-kit': imageAsset('interior-racing.jpg'),
  'carbon-steering-wheel': imageAsset('interior-racing.jpg'),
  'bucket-seat-package': productAsset('part-bucket-seats.jpg'),
  'carplay-module': imageAsset('interior-racing.jpg'),
  'ecu-unlock': imageAsset('tuning-engine.jpg'),
  'window-tint-package': imageAsset('detailing-buff.jpg'),
  'vinyl-wrap-package': imageAsset('carbon-body.jpg'),
  'roll-cage-package': productAsset('part-roll-cage.jpg'),
  'lightweight-battery': imageAsset('tuning-engine.jpg'),
  'lift-kit': productAsset('part-lift-kit.jpg'),
  'offroad-wheel-package': productAsset('part-offroad-wheels.jpg'),
  'roof-rack-system': productAsset('part-roof-rack.jpg'),
  'krkn-eluxx-hoodie': imageAsset('garage-supercars.jpg'),
};

const productImageFor = (product: Product) =>
  product.image ?? productImageById[product.id] ?? productImageByCategory[product.category];

const fallbackImage = (event: SyntheticEvent<HTMLImageElement>) => {
  const image = event.currentTarget;

  if (image.dataset.fallbackApplied === 'true') {
    image.hidden = true;
    return;
  }

  image.dataset.fallbackApplied = 'true';
  image.src = publicAsset(imageAsset('garage-luxury-dark.jpg'));
};

const translations: Record<Language, Translation> = {
  en: {
    meta: { title: 'KRKN Eluxx Customs | Detailing, Tuning, Dyno, Body Kits & Performance Parts', description: 'Premium automotive customization company for detailing, ECU tuning, dyno services, body kits, carbon exterior parts, aftermarket performance parts and professional installation.' },
    nav: { home: 'Home', services: 'Services', performance: 'Performance', projects: 'Projects', shop: 'Shop', about: 'About', contact: 'Contact', consultation: 'Book a Consultation', cart: 'Cart', account: 'Account' },
    hero: { eyebrow: 'KRKN Eluxx Customs // Detailing, Tuning & Aftermarket Performance', headline: 'Detail. Tune. Customize.', subheadline: 'KRKN Eluxx Customs delivers premium detailing, ECU tuning, dyno services, aftermarket performance parts and professional installation for drivers who demand a sharper, cleaner and stronger vehicle.', explore: 'Explore Services', shop: 'Shop Performance Parts', quote: 'Book a Consultation', imageAlt: 'Modified performance coupe in a dark premium customization studio with red accent lighting', badges: ['Premium Detailing', 'ECU Tuning', 'Dyno Testing', 'Performance Parts', 'Professional Installation'], stats: [{ value: 'Detail', label: 'PPF, coating and restoration' }, { value: 'Tune', label: 'Stage 1-3 calibration' }, { value: 'Dyno', label: 'Power and torque validation' }, { value: 'Install', label: 'Aftermarket parts fitted cleanly' }] },
    sectionLabels: { servicesEyebrow: 'Customization Pillars', servicesTitle: 'Detailing, tuning and aftermarket performance under one roof.', servicesBody: 'KRKN Eluxx Customs provides premium detailing, ECU tuning, dyno services, aftermarket performance parts and professional installation for automotive enthusiasts.', packagesEyebrow: 'Performance Packages', packagesTitle: 'Staged tuning with a measured, professional approach.', packagesBody: 'Every performance upgrade is matched to vehicle condition, supporting hardware, fuel quality, dyno feedback and intended use.', gainsEyebrow: 'Exotic Benchmarks', gainsTitle: 'Estimated Performance Gains', gainsBody: 'Sample estimated results for premium platforms. Use them as consultation starting points, not fixed promises.', dynoEyebrow: 'Dyno Services', dynoTitle: 'Dyno-Tested Performance', dynoBody: 'Our dyno service helps measure horsepower, torque and power delivery before and after tuning. It provides a clearer view of real performance gains and supports safer calibration.', mediaEyebrow: 'Cinematic Process', mediaTitle: 'Crafted in Motion', mediaBody: 'From detailing finishes to dyno-tested performance, every KRKN Eluxx Customs project is built to be seen, heard and felt.', shopEyebrow: 'Aftermarket Performance Shop', shopTitle: 'Selected parts, care products and install-ready packages.', shopBody: 'Browse exhaust systems, air intakes, detailing products, performance parts and dyno-ready packages prepared for quote and checkout integration.', categoriesEyebrow: 'Shop Categories', categoriesTitle: 'Parts and car care organized around real build paths.', projectsEyebrow: 'Featured Customs', projectsTitle: 'Detail, protection, power and installation in one build language.', whyEyebrow: 'Why Choose KRKN Eluxx Customs', whyTitle: 'A premium customization experience from consultation to delivery.', processEyebrow: 'Process', processTitle: 'Consult, protect, tune, validate.', testimonialsEyebrow: 'Client Feedback', testimonialsTitle: 'Trusted by drivers who care about the details.', aboutEyebrow: 'About KRKN Eluxx Customs', aboutTitle: 'A premium customs house for presence, protection and power.', contactEyebrow: 'Quote Request', contactTitle: 'Tell us about your vehicle and goals.' },
    common: { learnMore: 'Learn More', viewProject: 'View Project', viewDetails: 'View Details', addToCart: 'Add to Cart', addAgain: 'Add Again', added: 'Added', visitShop: 'Visit Shop', requestQuote: 'Request a Quote', requestFitment: 'Request Fitment Check', checkoutQuote: 'Request Checkout Link', allCategories: 'All Categories', allBrands: 'All Brands', vehiclePlaceholder: 'Vehicle compatibility', searchPlaceholder: 'Search performance parts', category: 'Category', stock: 'Stock', compatibility: 'Compatibility', sampleResults: 'Sample estimated results.', gainsDisclaimer: 'Sample estimated gains. Actual results vary by vehicle condition, hardware, software, fuel quality and intended use.', disclaimer: 'Performance modifications may affect warranty, emissions compliance and road legality depending on vehicle, location and intended use. KRKN Eluxx Customs recommends responsible and legal use.', cartEmpty: 'Your cart is ready for parts.', cartTitle: 'Temporary Cart', cartItems: 'items', favorite: 'Add to wishlist', favorited: 'Saved to wishlist', accountMessage: 'Customer account access is ready for future login integration.', cartMessage: 'Added to your temporary cart.', newsletterSuccess: 'You are on the KRKN Eluxx Customs update list.', sale: 'Sale', close: 'Close', openMenu: 'Open menu', closeMenu: 'Close menu', accountTitle: 'KRKN Eluxx Account', accountAction: 'Request Account Access', projectBrief: 'Project Details', requestSimilarBuild: 'Request Similar Build', wishlistAdded: 'Saved to wishlist.', wishlistRemoved: 'Removed from wishlist.', noProducts: 'No matching parts found. Try another keyword or request a custom quote.', legalMessage: 'Policy details are ready for future checkout integration.' },
    categoryLabels: { exhaust: 'Exhaust Systems', intake: 'Air Intake Systems', performance: 'Engine / Performance', suspension: 'Suspension', brakes: 'Brakes', carbon: 'Carbon / Exterior', 'body-kit': 'Body Kits', wheels: 'Wheels / Tires', lighting: 'Lighting', interior: 'Interior', electronics: 'Electronics / Software', 'car-care': 'Car Care', detailing: 'Detailing / Protection', 'track-drag': 'Track / Drag', 'suv-truck': 'SUV / Truck', merchandise: 'Merchandise' },
    categoryDescriptions: { exhaust: 'Downpipes, midpipes, catback and valvetronic sound systems.', intake: 'Cold air intakes, charge pipes and airflow support.', performance: 'Turbo, supercharger, fueling and ECU/TCU upgrade paths.', suspension: 'Coilovers, springs, air suspension and handling hardware.', brakes: 'Big brake kits, pads, rotors and cooling support.', carbon: 'Carbon hoods, lips, mirror caps and exterior aero details.', 'body-kit': 'Fitment-focused exterior upgrades, body kits, diffusers, spoilers and aero packages.', wheels: 'Forged wheels, drag packs, tires and fitment essentials.', lighting: 'Headlights, taillights, signals and ambient lighting upgrades.', interior: 'Steering wheels, seats, harnesses and Alcantara trim.', electronics: 'Modules, dash cams, ECU unlocks and software support.', 'car-care': 'Protection, coatings and detailing supplies.', detailing: 'PPF, tint, wraps, correction and surface protection packages.', 'track-drag': 'Track-ready safety, drag setup and lightweight hardware.', 'suv-truck': 'Lift kits, offroad wheels, racks and SUV/truck exterior hardware.', merchandise: 'KRKN Eluxx Customs apparel and branded essentials.' },
    stockLabels: { in: 'In Stock', low: 'Low Stock', preorder: 'Pre-order' },
    services: [{ title: 'Detailing', description: 'From PPF and ceramic coating to detailed interior and exterior restoration, KRKN Eluxx Customs protects and refines every surface of your vehicle.', items: ['PPF / Paint Protection Film', 'Ceramic Coating', 'Interior Detailing', 'Exterior Detailing', 'Interior Restoration', 'Exterior Restoration', 'VIP Car Wash', 'Paint Correction', 'Premium Car Care'] }, { title: 'Tuning', description: 'Our tuning services are designed to unlock safer, sharper and more responsive performance through ECU remapping, staged upgrades and custom calibration.', items: ['ECU Remapping', 'Stage 1 Tuning', 'Stage 2 Tuning', 'Stage 3 Tuning', 'VMAX Off / Speed Limiter Removal', 'TCU / Gearbox Tuning', 'Performance Diagnostics', 'Custom Calibration'], note: 'Availability depends on vehicle model, local regulations and intended use.' }, { title: 'Aftermarket Parts', description: 'From carbon front lips and rear diffusers to complete body kit installations, KRKN Eluxx Customs helps create a sharper, more aggressive and more personalized exterior presence.', items: ['Branded Exhaust Systems', 'Air Intake Systems', 'Performance Parts', 'Carbon Fiber Exterior Parts', 'Front Lips', 'Side Skirts', 'Rear Diffusers', 'Spoilers', 'Splitters', 'Widebody Kits', 'Aero Packages', 'Professional Body Kit Installation', 'Fitment Support'] }, { title: 'Dyno Services', description: 'Our dyno service helps measure horsepower, torque and power delivery before and after tuning while supporting safer calibration decisions.', items: ['Dyno Testing', 'Before / After Power Measurement', 'Tuning Validation', 'Power Curve Analysis', 'Torque Curve Analysis', 'Performance Report', 'Safe Calibration Support'] }],
    packages: [{ title: 'Stage 1', subtitle: 'For daily drivers seeking safe and noticeable performance gains.', features: ['ECU optimization', 'Improved throttle response', 'Better torque delivery', 'No major hardware required'] }, { title: 'Stage 2', subtitle: 'For cars with hardware upgrades.', features: ['Downpipe/exhaust support', 'Intake optimization', 'Stronger torque curve', 'Advanced calibration'] }, { title: 'Stage 3', subtitle: 'For serious custom builds.', features: ['Turbo upgrade support', 'Fuel system optimization', 'Custom dyno-focused calibration', 'Project consultation'] }],
    dyno: { headline: 'Dyno-Tested Performance', description: 'Our dyno service helps measure horsepower, torque and power delivery before and after tuning. It provides a clearer view of real performance gains and supports safer calibration.', metrics: [{ value: 'HP', label: 'Horsepower measurement' }, { value: 'TQ', label: 'Torque curve analysis' }, { value: 'Before / After', label: 'Comparison report' }, { value: 'Safe', label: 'Calibration support' }], cards: [{ title: 'Dyno Testing', body: 'Measure sample estimated figures in a controlled rolling-road environment.' }, { title: 'Before / After Measurement', body: 'Compare baseline and post-tune delivery with a clearer performance view.' }, { title: 'Power Curve Analysis', body: 'Review how horsepower and torque build across the usable rev range.' }, { title: 'Performance Report', body: 'Prepare a polished report for consultation, validation and future upgrade planning.' }] },
    media: { clips: [{ title: 'Detailing Motion', poster: motionAsset('video-detailing-preview.jpg'), video: videoAsset('krkn-detailing-motion.mp4'), label: 'Paint correction, film prep and gloss delivery with real shop-floor motion.', meta: 'Cinematic Preview' }, { title: 'Dyno Performance', poster: motionAsset('video-dyno-preview.jpg'), video: videoAsset('krkn-dyno-performance.mp4'), label: 'Rolling-road validation, power testing and calibration atmosphere.', meta: 'Play Video' }, { title: 'Exhaust & Body Walkaround', poster: motionAsset('video-exhaust-preview.jpg'), video: videoAsset('krkn-exhaust-walkaround.mp4'), label: 'Sound hardware, exhaust detail and cinematic vehicle walkaround energy.', meta: 'Watch Video' }], playLabel: 'Watch Video', closeLabel: 'Close video', unavailableLabel: 'Video unavailable. Please try again later.' },
    why: ['Detailing, tuning and customization under one roof', 'Fitment-focused exterior upgrades', 'Premium aero and carbon styling', 'Professional installation', 'Dyno-supported tuning', 'Paint protection expertise', 'Installed by automotive enthusiasts', 'Bilingual customer experience'],
    process: [{ step: '01', title: 'Consultation', description: 'We understand your vehicle, goals, usage and build priorities.' }, { step: '02', title: 'Protection & Preparation', description: 'We inspect paint, interior, hardware and vehicle condition before work begins.' }, { step: '03', title: 'Install & Tune', description: 'We install selected parts, refine surfaces and calibrate performance with care.' }, { step: '04', title: 'Dyno & Delivery', description: 'We validate results where appropriate and deliver a cleaner, stronger, more personal car.' }],
    testimonials: [{ quote: 'KRKN Eluxx Customs made the car feel sharper and look dramatically cleaner. The process felt premium from start to finish.', name: 'Daniel R.' }, { quote: 'Professional team, clean installation and great communication from start to finish.', name: 'Carlos M.' }, { quote: 'The PPF and ceramic coating finish gave the car the exact protected, high-gloss look I wanted.', name: 'Emre K.' }, { quote: 'The dyno-supported consultation made the Stage 2 setup feel responsible and properly measured.', name: 'Alex T.' }],
    projects: [{ title: 'BMW M Performance Detail & Stage 1 Tune', services: 'Paint correction, ceramic coating, ECU remap and dyno-supported validation.', tags: ['Detailing', 'ECU Tune', 'Stage 1', 'Dyno'], visual: 'project-m' }, { title: 'Audi S-Line Aero & Intake Setup', services: 'Cold air intake, gloss black side skirts, rear diffuser fitment and installation.', tags: ['Air Intake', 'Side Skirts', 'Diffuser', 'Fitment'], visual: 'project-audi' }, { title: 'Mercedes AMG Style Exterior Package', services: 'Front lip, rear diffuser, carbon mirror caps, exterior styling and wheel fitment.', tags: ['Body Kit', 'Carbon', 'Wheels', 'Exterior'], visual: 'project-amg' }, { title: 'VW Golf GTI Stage 2 Dyno Calibration', services: 'Downpipe, intake, ECU calibration, dyno testing and torque curve review.', tags: ['Stage 2', 'Dyno', 'ECU Tune', 'Air Intake'], visual: 'project-gti' }, { title: 'Porsche Ceramic Coating & PPF Package', services: 'PPF package, ceramic coating, premium car care and delivery inspection.', tags: ['PPF', 'Ceramic', 'Detailing', 'Protection'], visual: 'project-porsche' }, { title: 'JDM Widebody Custom Build', services: 'Widebody conversion, splitter package, spoiler installation, exhaust and project detailing.', tags: ['Widebody', 'Splitter', 'Spoiler', 'Installation'], visual: 'project-jdm' }],
    about: { body: 'KRKN Eluxx Customs was founded to bring detailing, tuning and aftermarket customization together under one premium automotive experience. From PPF, VIP detailing and interior restoration to ECU tuning, dyno testing and performance part installation, we help enthusiasts build vehicles with presence, protection and power.', points: ['Premium detailing, paint protection and restoration', 'ECU tuning supported by diagnostics and dyno validation', 'Selected aftermarket parts supply and installation', 'Bilingual consultation for enthusiast builds'] },
    contact: { body: 'Send your vehicle details and desired service. The KRKN Eluxx Customs team can prepare a detailing, tuning, dyno, exterior styling, installation or parts quote for your build.', fields: { fullName: 'Full Name', email: 'Email', phone: 'Phone', country: 'Country', make: 'Vehicle Make', model: 'Vehicle Model', year: 'Vehicle Year', engine: 'Engine', service: 'Desired Service', message: 'Message' }, serviceOptions: ['PPF / Paint Protection Film', 'Ceramic Coating', 'VIP Detailing', 'Interior Restoration', 'Exterior Restoration', 'ECU Remapping', 'Stage 1 Tuning', 'Stage 2 Tuning', 'Stage 3 Tuning', 'VMAX Off', 'Dyno Test', 'Exhaust System', 'Air Intake', 'Aftermarket Parts', 'Parts Installation', 'Body Kit Installation', 'Carbon Exterior Parts', 'Front Lip / Diffuser', 'Spoiler Installation', 'Widebody Kit', 'Exterior Styling Package', 'Valvetronic Exhaust', 'Turbo / Supercharger Kit', 'Suspension / Fitment', 'Brake Upgrade', 'Wheels / Tires', 'Lighting Upgrade', 'Interior Upgrade', 'Track / Drag Setup', 'SUV / Truck Package', 'Custom Project'], submitSuccess: 'Your consultation request has been received. The KRKN team will review your build details.', submitError: 'The request could not be sent. Please email info@eluxx.us.', submitting: 'Sending request...', cards: [{ label: 'Online Consultation', value: 'Request a build quote' }, { label: 'Email', value: 'info@eluxx.us' }, { label: 'Location', value: 'USA' }, { label: 'Instagram', value: '@krkneluxxcustoms' }] },
    footer: { slogan: 'Detailing. Tuning. Aftermarket Performance.', quickLinks: 'Quick Links', services: 'Services', shopCategories: 'Shop Categories', contact: 'Contact', newsletter: 'Newsletter', newsletterBody: 'Get detailing notes, tuning updates, product drops and project previews.', emailPlaceholder: 'Email address', subscribe: 'Subscribe', copyright: '© 2026 KRKN Eluxx Customs. All rights reserved.', legal: ['Privacy Policy', 'Terms & Conditions', 'Return Policy', 'Cookie Policy'] },
  },
  es: {
    meta: { title: 'KRKN Eluxx Customs | Detailing, Tuning, Dyno, Body Kits y Piezas de Rendimiento', description: 'Empresa premium de personalización automotriz para detailing, reprogramación ECU, servicios dyno, body kits, piezas exteriores de carbono, piezas aftermarket de rendimiento e instalación profesional.' },
    nav: { home: 'Inicio', services: 'Servicios', performance: 'Rendimiento', projects: 'Proyectos', shop: 'Tienda', about: 'Acerca', contact: 'Contacto', consultation: 'Reservar una consulta', cart: 'Carrito', account: 'Cuenta' },
    hero: { eyebrow: 'KRKN Eluxx Customs // Detailing, Tuning y Rendimiento Aftermarket', headline: 'Detalla. Potencia. Personaliza.', subheadline: 'KRKN Eluxx Customs ofrece detailing premium, reprogramación ECU, servicios dyno, piezas aftermarket de alto rendimiento e instalación profesional para conductores que buscan un vehículo más limpio, más fuerte y más exclusivo.', explore: 'Explorar servicios', shop: 'Comprar piezas de rendimiento', quote: 'Reservar una consulta', imageAlt: 'Coupé de rendimiento modificado en un garage premium oscuro con iluminación roja', badges: ['Detailing premium', 'Reprogramación ECU', 'Pruebas dyno', 'Piezas de rendimiento', 'Instalación profesional'], stats: [{ value: 'Detalle', label: 'PPF, coating y restauración' }, { value: 'Tune', label: 'Calibración Stage 1-3' }, { value: 'Dyno', label: 'Validación de potencia y torque' }, { value: 'Instala', label: 'Piezas aftermarket con acabado limpio' }] },
    sectionLabels: { servicesEyebrow: 'Pilares de Personalización', servicesTitle: 'Detailing, tuning y rendimiento aftermarket bajo un mismo techo.', servicesBody: 'KRKN Eluxx Customs ofrece detailing premium, reprogramación ECU, servicios dyno, piezas aftermarket de rendimiento e instalación profesional para entusiastas del automóvil.', packagesEyebrow: 'Paquetes de Rendimiento', packagesTitle: 'Tuning por etapas con un enfoque medido y profesional.', packagesBody: 'Cada mejora de rendimiento se adapta al estado del vehículo, hardware de soporte, calidad de combustible, feedback dyno y uso previsto.', gainsEyebrow: 'Benchmarks Exóticos', gainsTitle: 'Ganancias de rendimiento estimadas', gainsBody: 'Resultados estimados de muestra para plataformas premium. Úsalos como punto de partida de consulta, no como promesas fijas.', dynoEyebrow: 'Servicios Dyno', dynoTitle: 'Rendimiento probado en dyno', dynoBody: 'Nuestro servicio dyno permite medir potencia, torque y entrega de rendimiento antes y después del tuning. Ofrece una visión más clara de las ganancias reales y ayuda a una calibración más segura.', mediaEyebrow: 'Proceso Cinemático', mediaTitle: 'Creado en movimiento', mediaBody: 'Desde acabados de detailing hasta rendimiento probado en dyno, cada proyecto de KRKN Eluxx Customs está creado para verse, sentirse y escucharse.', shopEyebrow: 'Tienda Aftermarket Performance', shopTitle: 'Piezas seleccionadas, car care y paquetes listos para instalación.', shopBody: 'Explora sistemas de escape, air intakes, productos de detailing, piezas de rendimiento y paquetes dyno preparados para consulta e integración de checkout.', categoriesEyebrow: 'Categorías de Tienda', categoriesTitle: 'Piezas y car care organizados según rutas reales de proyecto.', projectsEyebrow: 'Customs Destacados', projectsTitle: 'Detalle, protección, potencia e instalación con un mismo lenguaje.', whyEyebrow: 'Por Qué Elegir KRKN Eluxx Customs', whyTitle: 'Una experiencia premium de personalización desde la consulta hasta la entrega.', processEyebrow: 'Proceso', processTitle: 'Consulta, protege, potencia, valida.', testimonialsEyebrow: 'Opiniones de Clientes', testimonialsTitle: 'Confianza de conductores que cuidan cada detalle.', aboutEyebrow: 'Acerca de KRKN Eluxx Customs', aboutTitle: 'Una casa customs premium para presencia, protección y potencia.', contactEyebrow: 'Solicitud de Presupuesto', contactTitle: 'Cuéntanos sobre tu vehículo y tus objetivos.' },
    common: { learnMore: 'Más información', viewProject: 'Ver proyecto', viewDetails: 'Ver detalles', addToCart: 'Añadir al carrito', addAgain: 'Añadir otra vez', added: 'Añadido', visitShop: 'Visitar tienda', requestQuote: 'Solicitar presupuesto', requestFitment: 'Solicitar verificación de compatibilidad', checkoutQuote: 'Solicitar enlace de pago', allCategories: 'Todas las categorías', allBrands: 'Todas las marcas', vehiclePlaceholder: 'Compatibilidad del vehículo', searchPlaceholder: 'Buscar piezas de rendimiento', category: 'Categoría', stock: 'Stock', compatibility: 'Compatibilidad', sampleResults: 'Resultados estimados de muestra.', gainsDisclaimer: 'Ganancias estimadas de muestra. Los resultados reales varían según el estado del vehículo, el hardware, el software, la calidad del combustible y el uso previsto.', disclaimer: 'Las modificaciones de rendimiento pueden afectar la garantía, el cumplimiento de emisiones y la legalidad en carretera según el vehículo, la ubicación y el uso previsto. KRKN Eluxx Customs recomienda un uso responsable y legal.', cartEmpty: 'Tu carrito está listo para piezas.', cartTitle: 'Carrito temporal', cartItems: 'artículos', favorite: 'Añadir a favoritos', favorited: 'Guardado en favoritos', accountMessage: 'El acceso de cuenta de cliente está listo para una futura integración de login.', cartMessage: 'Añadido a tu carrito temporal.', newsletterSuccess: 'Ya estás en la lista de novedades de KRKN Eluxx Customs.', sale: 'Oferta', close: 'Cerrar', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú', accountTitle: 'Cuenta KRKN Eluxx', accountAction: 'Solicitar acceso', projectBrief: 'Detalles del proyecto', requestSimilarBuild: 'Solicitar proyecto similar', wishlistAdded: 'Guardado en favoritos.', wishlistRemoved: 'Eliminado de favoritos.', noProducts: 'No se encontraron piezas compatibles. Prueba otra palabra clave o solicita un presupuesto personalizado.', legalMessage: 'La información legal está lista para una futura integración de checkout.' },
    categoryLabels: { exhaust: 'Sistemas de escape', intake: 'Air Intake Systems', performance: 'Motor / Rendimiento', suspension: 'Suspensión', brakes: 'Frenos', carbon: 'Carbono / Exterior', 'body-kit': 'Body Kits', wheels: 'Ruedas / Neumáticos', lighting: 'Iluminación', interior: 'Interior', electronics: 'Electrónica / Software', 'car-care': 'Car Care', detailing: 'Detailing / Protección', 'track-drag': 'Track / Drag', 'suv-truck': 'SUV / Truck', merchandise: 'Merchandising' },
    categoryDescriptions: { exhaust: 'Downpipes, midpipes, catback y sistemas valvetronic.', intake: 'Air intakes, charge pipes y soporte de flujo.', performance: 'Turbo, supercharger, fueling y rutas ECU/TCU.', suspension: 'Coilovers, springs, air suspension y hardware de handling.', brakes: 'Big brake kits, pastillas, rotores y cooling support.', carbon: 'Capós, lips, mirror caps y detalles aero en carbono.', 'body-kit': 'Mejoras exteriores enfocadas en el ajuste, body kits, difusores, spoilers y paquetes aero.', wheels: 'Llantas forjadas, drag packs, neumáticos y fitment.', lighting: 'Faros, taillights, señales y ambient lighting.', interior: 'Volantes, asientos, arneses y trim Alcantara.', electronics: 'Módulos, dash cams, ECU unlock y soporte software.', 'car-care': 'Protección, coatings e insumos de detailing.', detailing: 'PPF, tint, wraps, corrección y protección de superficies.', 'track-drag': 'Seguridad track-ready, drag setup y hardware ligero.', 'suv-truck': 'Lift kits, ruedas offroad, racks y hardware SUV/truck.', merchandise: 'Ropa y esenciales de marca KRKN Eluxx Customs.' },
    stockLabels: { in: 'En stock', low: 'Stock limitado', preorder: 'Preventa' },
    services: [{ title: 'Detailing', description: 'Desde PPF y coating cerámico hasta restauración interior y exterior detallada, KRKN Eluxx Customs protege y perfecciona cada superficie de tu vehículo.', items: ['PPF / Película de protección de pintura', 'Coating cerámico', 'Detailing interior', 'Detailing exterior', 'Restauración interior', 'Restauración exterior', 'Lavado VIP', 'Corrección de pintura', 'Car care premium'] }, { title: 'Tuning', description: 'Nuestros servicios de tuning están diseñados para liberar un rendimiento más seguro, preciso y dinámico mediante reprogramación ECU, mejoras por etapas y calibración personalizada.', items: ['Reprogramación ECU', 'Stage 1', 'Stage 2', 'Stage 3', 'VMAX Off / Eliminación de limitador', 'Tuning TCU / Caja', 'Diagnóstico de rendimiento', 'Calibración personalizada'], note: 'La disponibilidad depende del modelo del vehículo, la normativa local y el uso previsto.' }, { title: 'Piezas Aftermarket', description: 'Desde front lips de carbono y difusores traseros hasta instalaciones completas de body kit, KRKN Eluxx Customs ayuda a crear una presencia exterior más agresiva, exclusiva y personalizada.', items: ['Sistemas de escape de marca', 'Air Intake Systems', 'Piezas de rendimiento', 'Piezas exteriores de carbono', 'Front Lips', 'Side Skirts', 'Difusores traseros', 'Spoilers', 'Splitters', 'Widebody Kits', 'Paquetes aero', 'Instalación profesional de body kit', 'Soporte de fitment'] }, { title: 'Servicios Dyno', description: 'Nuestro servicio dyno permite medir potencia, torque y entrega de rendimiento antes y después del tuning mientras apoya decisiones de calibración más seguras.', items: ['Prueba dyno', 'Medición antes / después', 'Validación de tuning', 'Análisis de curva de potencia', 'Análisis de curva de torque', 'Reporte de rendimiento', 'Soporte para calibración segura'] }],
    packages: [{ title: 'Stage 1', subtitle: 'Para conductores diarios que buscan ganancias seguras y notables.', features: ['Optimización ECU', 'Mejor respuesta del acelerador', 'Entrega de torque más fuerte', 'Sin hardware mayor requerido'] }, { title: 'Stage 2', subtitle: 'Para vehículos con mejoras de hardware.', features: ['Soporte para downpipe/escape', 'Optimización de admisión', 'Curva de torque más contundente', 'Calibración avanzada'] }, { title: 'Stage 3', subtitle: 'Para proyectos serios a medida.', features: ['Soporte para upgrade de turbo', 'Optimización de sistema de combustible', 'Calibración personalizada enfocada en dyno', 'Consultoría de proyecto'] }],
    dyno: { headline: 'Rendimiento probado en dyno', description: 'Nuestro servicio dyno permite medir potencia, torque y entrega de rendimiento antes y después del tuning. Ofrece una visión más clara de las ganancias reales y ayuda a una calibración más segura.', metrics: [{ value: 'HP', label: 'Medición de potencia' }, { value: 'TQ', label: 'Análisis de curva de torque' }, { value: 'Antes / Después', label: 'Reporte comparativo' }, { value: 'Seguro', label: 'Soporte de calibración' }], cards: [{ title: 'Prueba dyno', body: 'Mide cifras estimadas de muestra en un entorno rolling-road controlado.' }, { title: 'Medición antes / después', body: 'Compara entrega base y post-tuning con una visión más clara del rendimiento.' }, { title: 'Análisis de curva', body: 'Revisa cómo se construyen potencia y torque dentro del rango útil de rpm.' }, { title: 'Reporte de rendimiento', body: 'Prepara un reporte pulido para consulta, validación y planificación de upgrades.' }] },
    media: { clips: [{ title: 'Movimiento de detailing', poster: motionAsset('video-detailing-preview.jpg'), video: videoAsset('krkn-detailing-motion.mp4'), label: 'Corrección de pintura, preparación de film y entrega gloss con movimiento real de taller.', meta: 'Vista cinematográfica' }, { title: 'Rendimiento en dyno', poster: motionAsset('video-dyno-preview.jpg'), video: videoAsset('krkn-dyno-performance.mp4'), label: 'Validación en banco, pruebas de potencia y atmósfera de calibración.', meta: 'Reproducir' }, { title: 'Recorrido de escape y carrocería', poster: motionAsset('video-exhaust-preview.jpg'), video: videoAsset('krkn-exhaust-walkaround.mp4'), label: 'Hardware de sonido, detalle de escape y energía cinematográfica de walkaround.', meta: 'Ver video' }], playLabel: 'Ver video', closeLabel: 'Cerrar video', unavailableLabel: 'Video no disponible. Inténtalo de nuevo más tarde.' },
    why: ['Detailing, tuning y personalización en un solo lugar', 'Mejoras exteriores enfocadas en el ajuste', 'Estilo aero y carbono premium', 'Instalación profesional', 'Tuning apoyado por dyno', 'Experiencia en protección de pintura', 'Instalado por entusiastas automotrices', 'Experiencia bilingüe para clientes'],
    process: [{ step: '01', title: 'Consulta', description: 'Entendemos tu vehículo, objetivos, uso y prioridades del proyecto.' }, { step: '02', title: 'Protección y preparación', description: 'Revisamos pintura, interior, hardware y estado del vehículo antes del trabajo.' }, { step: '03', title: 'Instalación y tuning', description: 'Instalamos piezas seleccionadas, refinamos superficies y calibramos con cuidado.' }, { step: '04', title: 'Dyno y entrega', description: 'Validamos resultados cuando corresponde y entregamos un coche más limpio, fuerte y personal.' }],
    testimonials: [{ quote: 'KRKN Eluxx Customs hizo que el coche se sintiera más preciso y se viera mucho más limpio. El proceso fue premium de principio a fin.', name: 'Daniel R.' }, { quote: 'Equipo profesional, instalación limpia y gran comunicación de principio a fin.', name: 'Carlos M.' }, { quote: 'El PPF y el coating cerámico dieron exactamente el acabado protegido y brillante que quería.', name: 'Emre K.' }, { quote: 'La consulta apoyada por dyno hizo que el Stage 2 se sintiera responsable y bien medido.', name: 'Alex T.' }],
    projects: [{ title: 'BMW M Performance Detail & Stage 1 Tune', services: 'Corrección de pintura, coating cerámico, reprogramación ECU y validación dyno.', tags: ['Detailing', 'ECU Tune', 'Stage 1', 'Dyno'], visual: 'project-m' }, { title: 'Audi S-Line Aero & Intake Setup', services: 'Cold air intake, side skirts gloss black, fitment de difusor trasero e instalación.', tags: ['Air Intake', 'Side Skirts', 'Difusor', 'Fitment'], visual: 'project-audi' }, { title: 'Mercedes AMG Style Exterior Package', services: 'Front lip, difusor trasero, mirror caps de carbono, estilo exterior y fitment de ruedas.', tags: ['Body Kit', 'Carbono', 'Ruedas', 'Exterior'], visual: 'project-amg' }, { title: 'VW Golf GTI Stage 2 Dyno Calibration', services: 'Downpipe, intake, calibración ECU, prueba dyno y revisión de curva de torque.', tags: ['Stage 2', 'Dyno', 'ECU Tune', 'Air Intake'], visual: 'project-gti' }, { title: 'Porsche Ceramic Coating & PPF Package', services: 'Paquete PPF, coating cerámico, car care premium e inspección de entrega.', tags: ['PPF', 'Ceramic', 'Detailing', 'Protección'], visual: 'project-porsche' }, { title: 'JDM Widebody Custom Build', services: 'Conversión widebody, paquete splitter, instalación de spoiler, escape y detailing de proyecto.', tags: ['Widebody', 'Splitter', 'Spoiler', 'Instalación'], visual: 'project-jdm' }],
    about: { body: 'KRKN Eluxx Customs fue creada para unir detailing, tuning y personalización aftermarket en una experiencia automotriz premium. Desde PPF, detailing VIP y restauración interior hasta reprogramación ECU, pruebas dyno e instalación de piezas de rendimiento, ayudamos a los entusiastas a crear vehículos con presencia, protección y potencia.', points: ['Detailing premium, protección de pintura y restauración', 'Reprogramación ECU apoyada por diagnóstico y validación dyno', 'Suministro e instalación de piezas aftermarket seleccionadas', 'Consulta bilingüe para proyectos de entusiastas'] },
    contact: { body: 'Envía los datos de tu vehículo y el servicio deseado. El equipo de KRKN Eluxx Customs puede preparar una cotización de detailing, tuning, dyno, estilo exterior, instalación o piezas para tu proyecto.', fields: { fullName: 'Nombre completo', email: 'Email', phone: 'Teléfono', country: 'País', make: 'Marca del vehículo', model: 'Modelo del vehículo', year: 'Año del vehículo', engine: 'Motor', service: 'Servicio deseado', message: 'Mensaje' }, serviceOptions: ['PPF / Película de protección de pintura', 'Coating cerámico', 'Detailing VIP', 'Restauración interior', 'Restauración exterior', 'Reprogramación ECU', 'Stage 1', 'Stage 2', 'Stage 3', 'VMAX Off', 'Prueba dyno', 'Sistema de escape', 'Air intake', 'Piezas aftermarket', 'Instalación de piezas', 'Instalación de body kit', 'Piezas exteriores de carbono', 'Front lip / Difusor', 'Instalación de spoiler', 'Widebody kit', 'Paquete de estilo exterior', 'Escape valvetronic', 'Kit turbo / supercharger', 'Suspensión / fitment', 'Mejora de frenos', 'Ruedas / neumáticos', 'Mejora de iluminación', 'Mejora interior', 'Setup track / drag', 'Paquete SUV / truck', 'Proyecto personalizado'], submitSuccess: 'Tu solicitud de consulta ha sido recibida. El equipo KRKN revisará los datos de tu proyecto.', submitError: 'No se pudo enviar la solicitud. Escribe a info@eluxx.us.', submitting: 'Enviando solicitud...', cards: [{ label: 'Consulta online', value: 'Solicitar cotización' }, { label: 'Email', value: 'info@eluxx.us' }, { label: 'Ubicación', value: 'EE. UU.' }, { label: 'Instagram', value: '@krkneluxxcustoms' }] },
    footer: { slogan: 'Detailing. Tuning. Rendimiento aftermarket.', quickLinks: 'Enlaces rápidos', services: 'Servicios', shopCategories: 'Categorías', contact: 'Contacto', newsletter: 'Newsletter', newsletterBody: 'Recibe notas de detailing, novedades de tuning, lanzamientos de piezas y proyectos.', emailPlaceholder: 'Email', subscribe: 'Suscribirse', copyright: '© 2026 KRKN Eluxx Customs. Todos los derechos reservados.', legal: ['Política de Privacidad', 'Términos y Condiciones', 'Política de Devoluciones', 'Política de Cookies'] },
  },
};

const products: Product[] = [
  { id: 'premium-catback-exhaust', name: { en: 'Premium Catback Exhaust System', es: 'Sistema de Escape Catback Premium' }, description: { en: 'Branded stainless exhaust package for deeper tone, cleaner flow and professional fitment.', es: 'Paquete de escape de acero inoxidable de marca para sonido más profundo, mejor flujo y fitment profesional.' }, category: 'exhaust', price: '$1,240', stock: 'low', brand: 'FlowRace', compatibility: ['VW Golf GTI', 'Audi S3', 'BMW 320i'], visual: 'visual-exhaust' },
  { id: 'performance-downpipe', name: { en: 'Performance Downpipe', es: 'Downpipe de Rendimiento' }, description: { en: 'High-flow downpipe for Stage 2-ready exhaust response and torque support.', es: 'Downpipe high-flow para respuesta de escape y soporte de torque en Stage 2.' }, category: 'exhaust', price: '$540', originalPrice: '$620', sale: true, stock: 'in', brand: 'TurboLine', compatibility: ['Audi S3', 'VW Golf GTI', 'BMW 520d'], visual: 'visual-downpipe' },
  { id: 'cold-air-intake', name: { en: 'Cold Air Intake Kit', es: 'Kit Cold Air Intake' }, description: { en: 'Improved airflow and sharper induction sound for tuned turbo engines.', es: 'Mejor flujo de aire y sonido de admisión más definido para motores turbo tuneados.' }, category: 'intake', price: '$330', stock: 'in', brand: 'AirForge', compatibility: ['VW Golf GTI', 'Audi S3', 'BMW 320i'], visual: 'visual-intake' },
  { id: 'carbon-front-lip', name: { en: 'Carbon Fiber Front Lip', es: 'Front Lip de Fibra de Carbono' }, description: { en: 'Lightweight aero upgrade with a gloss carbon finish for aggressive front-end styling.', es: 'Upgrade aero ligero con acabado carbono brillante para un frontal más agresivo.' }, category: 'carbon', price: '$690', originalPrice: '$820', sale: true, badge: { en: 'Carbon Finish', es: 'Acabado carbono' }, stock: 'in', brand: 'KRKN Aero', compatibility: ['BMW 3 Series', 'Audi A4', 'Mercedes C-Class'], visual: 'visual-carbon' },
  { id: 'gloss-black-side-skirts', name: { en: 'Gloss Black Side Skirts', es: 'Side Skirts Gloss Black' }, description: { en: 'Fitment-focused side skirt set for a lower, cleaner and more aggressive exterior profile.', es: 'Set de side skirts enfocado en fitment para un perfil exterior más bajo, limpio y agresivo.' }, category: 'body-kit', price: '$520', badge: { en: 'New Arrival', es: 'Nuevo' }, stock: 'in', brand: 'KRKN Aero', compatibility: ['BMW 3 Series', 'Audi A4', 'Mercedes C-Class'], visual: 'visual-body-kit' },
  { id: 'rear-diffuser-kit', name: { en: 'Rear Diffuser Kit', es: 'Kit de Difusor Trasero' }, description: { en: 'Rear aero diffuser package designed to sharpen stance and complete the exhaust-area finish.', es: 'Paquete de difusor aero trasero diseñado para afinar la postura y completar el acabado del escape.' }, category: 'body-kit', price: '$610', badge: { en: 'Fitment Checked', es: 'Fitment verificado' }, stock: 'low', brand: 'KRKN Aero', compatibility: ['VW Golf GTI', 'Audi S3', 'BMW 320i'], visual: 'visual-diffuser' },
  { id: 'performance-spoiler', name: { en: 'Performance Spoiler', es: 'Spoiler de Rendimiento' }, description: { en: 'Premium spoiler upgrade for a sharper silhouette and restrained motorsport presence.', es: 'Mejora premium de spoiler para una silueta más definida y presencia motorsport sobria.' }, category: 'body-kit', price: '$430', badge: { en: 'Popular', es: 'Popular' }, stock: 'in', brand: 'AeroLine', compatibility: ['BMW M Series', 'Audi S3', 'VW Golf GTI'], visual: 'visual-spoiler' },
  { id: 'aero-splitter-package', name: { en: 'Aero Splitter Package', es: 'Paquete Aero Splitter' }, description: { en: 'Front splitter and hardware package for premium aero and carbon styling consultation.', es: 'Paquete de splitter frontal y hardware para consulta de estilo aero y carbono premium.' }, category: 'body-kit', price: '$740', badge: { en: 'PPF Ready', es: 'Listo para PPF' }, stock: 'preorder', brand: 'KRKN Aero', compatibility: ['Universal'], visual: 'visual-splitter' },
  { id: 'widebody-conversion-kit', name: { en: 'Widebody Conversion Kit', es: 'Kit de Conversión Widebody' }, description: { en: 'Complete widebody styling package prepared for professional installation and fitment support.', es: 'Paquete completo de estilo widebody preparado para instalación profesional y soporte de fitment.' }, category: 'body-kit', price: '$3,800', badge: { en: 'Premium Installation', es: 'Instalación premium' }, stock: 'preorder', brand: 'KRKN Customs', compatibility: ['Project Consultation'], visual: 'visual-widebody' },
  { id: 'carbon-mirror-caps', name: { en: 'Carbon Mirror Caps', es: 'Mirror Caps de Carbono' }, description: { en: 'Gloss carbon mirror caps for a subtle exterior upgrade with a refined OEM-plus finish.', es: 'Mirror caps en carbono brillante para una mejora exterior sutil con acabado OEM-plus refinado.' }, category: 'carbon', price: '$260', badge: { en: 'Carbon Finish', es: 'Acabado carbono' }, stock: 'in', brand: 'KRKN Aero', compatibility: ['BMW 3 Series', 'Audi A4', 'Mercedes C-Class', 'VW Golf GTI'], visual: 'visual-carbon' },
  { id: 'complete-body-kit-package', name: { en: 'Complete Body Kit Package', es: 'Paquete Body Kit Completo' }, description: { en: 'Full exterior styling package with front lip, side skirts, rear diffuser and installation support.', es: 'Paquete completo de estilo exterior con front lip, side skirts, difusor trasero y soporte de instalación.' }, category: 'body-kit', price: '$2,450', badge: { en: 'Best Seller', es: 'Más vendido' }, stock: 'low', brand: 'KRKN Customs', compatibility: ['Project Consultation'], visual: 'visual-body-kit' },
  { id: 'ceramic-coating-kit', name: { en: 'Ceramic Coating Kit', es: 'Kit de Coating Cerámico' }, description: { en: 'High-gloss paint protection kit for long-lasting depth and easier maintenance.', es: 'Kit de protección de pintura con alto brillo, profundidad duradera y mantenimiento sencillo.' }, category: 'car-care', price: '$145', stock: 'in', brand: 'DetailPro', compatibility: ['Universal'], visual: 'visual-care' },
  { id: 'ppf-protection-package', name: { en: 'PPF Protection Package', es: 'Paquete de Protección PPF' }, description: { en: 'Paint protection film consultation package for front-end, high-impact and full-body coverage.', es: 'Paquete de consulta para película de protección de pintura en frontal, zonas de impacto o cobertura completa.' }, category: 'detailing', price: '$890', stock: 'preorder', brand: 'KRKN Eluxx Customs', compatibility: ['Universal'], visual: 'visual-ppf' },
  { id: 'stage-1-remap', name: { en: 'Stage 1 ECU Remap Package', es: 'Paquete Reprogramación ECU Stage 1' }, description: { en: 'Daily-friendly ECU optimization for stronger torque and improved throttle response.', es: 'Optimización ECU para uso diario con más torque y mejor respuesta del acelerador.' }, category: 'performance', price: '$390', stock: 'in', brand: 'KRKN Tune', compatibility: ['BMW 320i', 'Audi A4', 'Mercedes C200', 'BMW 520d'], visual: 'visual-ecu' },
  { id: 'sport-suspension-kit', name: { en: 'Sport Suspension Kit', es: 'Kit de Suspensión Sport' }, description: { en: 'Lower stance, better road feel and controlled handling for fast street cars.', es: 'Menor altura, mejor tacto de carretera y control para coches de calle rápidos.' }, category: 'suspension', price: '$980', stock: 'in', brand: 'ApexRide', compatibility: ['BMW 3 Series', 'Mercedes C-Class', 'Audi A4'], visual: 'visual-suspension' },
  { id: 'big-brake-kit', name: { en: 'Big Brake Kit', es: 'Big Brake Kit' }, description: { en: 'Larger calipers and performance discs for stronger, more consistent stopping power.', es: 'Pinzas más grandes y discos de rendimiento para frenada más fuerte y consistente.' }, category: 'brakes', price: '$2,450', stock: 'preorder', brand: 'StopForce', compatibility: ['BMW M Series', 'Audi S3', 'VW Golf GTI'], visual: 'visual-brakes' },
  { id: 'forged-wheels', name: { en: 'Forged Alloy Wheels', es: 'Llantas Forjadas de Aleación' }, description: { en: 'Lightweight forged wheel set with premium concave fitment options.', es: 'Juego de llantas forjadas ligeras con opciones premium de fitment cóncavo.' }, category: 'wheels', price: '$1,890', originalPrice: '$2,150', sale: true, stock: 'low', brand: 'KRKN Forged', compatibility: ['BMW 3 Series', 'Audi A4', 'Mercedes C-Class', 'VW Golf GTI'], visual: 'visual-wheels' },
  { id: 'vip-detailing-package', name: { en: 'VIP Detailing Package', es: 'Paquete Detailing VIP' }, description: { en: 'Premium interior and exterior detailing session with paint refinement and delivery inspection.', es: 'Sesión premium de detailing interior y exterior con refinado de pintura e inspección de entrega.' }, category: 'detailing', price: '$320', stock: 'in', brand: 'KRKN Eluxx Customs', compatibility: ['Universal'], visual: 'visual-detailing' },
  { id: 'dyno-test-session', name: { en: 'Dyno Test Session', es: 'Sesión de Prueba Dyno' }, description: { en: 'Rolling-road power measurement session with sample estimated HP and torque report.', es: 'Sesión rolling-road de medición de potencia con reporte estimado de HP y torque.' }, category: 'performance', price: '$180', stock: 'in', brand: 'KRKN Dyno', compatibility: ['BMW 320i', 'Audi S3', 'VW Golf GTI', 'Mercedes C200'], visual: 'visual-dyno' },
  { id: 'valvetronic-exhaust', name: { en: 'Valvetronic Exhaust System', es: 'Sistema de Escape Valvetronic' }, description: { en: 'Switchable sound system for refined cruising and a sharper performance tone when appropriate.', es: 'Sistema de sonido con válvulas para cruising refinado y tono de rendimiento más definido cuando corresponde.' }, category: 'exhaust', price: '$1,980', badge: { en: 'Premium Installation', es: 'Instalación premium' }, stock: 'preorder', brand: 'ValveCraft', compatibility: ['BMW M3 Competition', 'Audi RS3', 'Mercedes-AMG C63 S'], tags: ['exhaust', 'sound', 'valvetronic', 'muffler'], visual: 'visual-exhaust' },
  { id: 'headers-package', name: { en: 'Performance Headers', es: 'Headers de Rendimiento' }, description: { en: 'Header package selected for sound character, flow and responsible performance use.', es: 'Paquete de headers seleccionado por carácter de sonido, flujo y uso responsable de rendimiento.' }, category: 'exhaust', price: '$1,150', stock: 'low', brand: 'FlowRace', compatibility: ['Ford Mustang Shelby GT500', 'Chevrolet Camaro ZL1', 'Dodge Challenger Hellcat'], tags: ['headers', 'exhaust', 'sound'], visual: 'visual-downpipe' },
  { id: 'hybrid-turbo-kit', name: { en: 'Hybrid Turbo Kit', es: 'Kit Hybrid Turbo' }, description: { en: 'Hardware consultation package for track-focused power builds with supporting calibration.', es: 'Paquete de consulta de hardware para builds de potencia track-focused con calibración de soporte.' }, category: 'performance', price: '$3,600', badge: { en: 'Track Ready', es: 'Track Ready' }, stock: 'preorder', brand: 'TurboLine', compatibility: ['Audi RS3', 'Volkswagen Golf R', 'BMW M2'], tags: ['turbo', 'stage 3', 'dyno', 'engine'], visual: 'visual-turbo' },
  { id: 'supercharger-kit', name: { en: 'Supercharger Kit', es: 'Kit Supercharger' }, description: { en: 'Forced-induction consultation package for V8 and specialty platforms requiring hardware, fueling and calibration planning.', es: 'Paquete de consulta de inducción forzada para plataformas V8 y especiales que requieren planificación de hardware, fueling y calibración.' }, category: 'performance', price: '$4,900', badge: { en: 'Custom Order', es: 'Pedido custom' }, stock: 'preorder', brand: 'BoostCraft', compatibility: ['Ford Mustang Shelby GT500', 'Chevrolet Camaro ZL1', 'Dodge Challenger Hellcat'], tags: ['supercharger', 'stage 3', 'engine', 'dyno'], visual: 'visual-turbo' },
  { id: 'front-mount-intercooler', name: { en: 'Front Mount Intercooler', es: 'Intercooler Frontal' }, description: { en: 'Cooling support for tuned turbo platforms and repeatable performance delivery.', es: 'Soporte de enfriamiento para plataformas turbo tuneadas y entrega de rendimiento más consistente.' }, category: 'performance', price: '$890', stock: 'in', brand: 'AirForge', compatibility: ['Audi S3', 'VW Golf GTI', 'BMW 320i'], tags: ['intercooler', 'cooling', 'turbo'], visual: 'visual-intake' },
  { id: 'charge-pipe-kit', name: { en: 'Charge Pipe Kit', es: 'Kit Charge Pipe' }, description: { en: 'Reinforced charge pipe upgrade for tuned boost systems and cleaner airflow reliability.', es: 'Mejora de charge pipe reforzado para sistemas boost tuneados y mayor fiabilidad de flujo.' }, category: 'intake', price: '$380', stock: 'in', brand: 'AirForge', compatibility: ['BMW 320i', 'BMW M2', 'BMW M3 Competition'], tags: ['charge pipe', 'intake', 'boost'], visual: 'visual-intake' },
  { id: 'blow-off-valve', name: { en: 'Blow Off Valve', es: 'Blow Off Valve' }, description: { en: 'Boost-control sound and response upgrade selected for compatible turbo applications.', es: 'Mejora de sonido y respuesta de boost seleccionada para aplicaciones turbo compatibles.' }, category: 'performance', price: '$260', stock: 'in', brand: 'BoostCraft', compatibility: ['Audi S3', 'Volkswagen Golf R', 'Toyota GR Supra'], tags: ['boost', 'turbo', 'sound'], visual: 'visual-turbo' },
  { id: 'tcu-tune-package', name: { en: 'TCU Tune Package', es: 'Paquete TCU Tune' }, description: { en: 'Transmission calibration consultation for sharper shifts and measured drivability.', es: 'Consulta de calibración de transmisión para cambios más precisos y conducción medida.' }, category: 'electronics', price: '$450', badge: { en: 'Dyno Supported', es: 'Apoyado por dyno' }, stock: 'in', brand: 'KRKN Tune', compatibility: ['BMW M5 Competition', 'Audi RS3', 'VW Golf R'], tags: ['tcu', 'software', 'gearbox'], visual: 'visual-ecu' },
  { id: 'coilover-kit', name: { en: 'Coilover Kit', es: 'Kit Coilover' }, description: { en: 'Adjustable suspension package for stance, control and fitment-focused builds.', es: 'Paquete de suspensión ajustable para stance, control y builds enfocados en fitment.' }, category: 'suspension', price: '$1,240', badge: { en: 'Fitment Checked', es: 'Fitment verificado' }, stock: 'in', brand: 'ApexRide', compatibility: ['BMW M3 Competition', 'Audi S3', 'Mercedes-AMG A45 S'], tags: ['coilovers', 'handling', 'stance'], visual: 'visual-suspension' },
  { id: 'air-suspension-kit', name: { en: 'Air Suspension Kit', es: 'Kit Air Suspension' }, description: { en: 'Premium adjustable ride-height system for show-quality exterior presence.', es: 'Sistema premium de altura ajustable para una presencia exterior de show car.' }, category: 'suspension', price: '$3,200', stock: 'preorder', brand: 'ApexRide', compatibility: ['Audi RS7', 'BMW M5 Competition', 'Mercedes-AMG E63 S'], tags: ['air suspension', 'stance', 'fitment'], visual: 'visual-suspension' },
  { id: 'carbon-ceramic-brakes', name: { en: 'Carbon Ceramic Brake Package', es: 'Paquete de Frenos Carbon Ceramic' }, description: { en: 'Premium brake consultation package for high-performance road and track-focused setups.', es: 'Paquete de consulta premium de frenos para configuraciones de alto rendimiento y enfoque track.' }, category: 'brakes', price: '$6,900', badge: { en: 'Premium Installation', es: 'Instalación premium' }, stock: 'preorder', brand: 'StopForce', compatibility: ['Porsche 911 Turbo S', 'BMW M5 Competition', 'Audi RS6 Avant'], tags: ['brakes', 'carbon ceramic', 'track'], visual: 'visual-brakes' },
  { id: 'slotted-rotors', name: { en: 'Slotted Rotors', es: 'Rotores Ranurados' }, description: { en: 'Rotor upgrade selected for stronger bite, heat management and clean street manners.', es: 'Mejora de rotores seleccionada por mordida, control de calor y uso de calle limpio.' }, category: 'brakes', price: '$620', stock: 'in', brand: 'StopForce', compatibility: ['BMW 3 Series', 'Audi A4', 'VW Golf GTI'], tags: ['rotors', 'brakes'], visual: 'visual-brakes' },
  { id: 'drag-pack-wheels', name: { en: 'Drag Pack Wheels', es: 'Llantas Drag Pack' }, description: { en: 'Lightweight wheel setup for drag-oriented fitment and responsible closed-course use.', es: 'Setup de llantas ligeras para fitment drag y uso responsable en circuito cerrado.' }, category: 'wheels', price: '$1,680', badge: { en: 'Track Ready', es: 'Track Ready' }, stock: 'low', brand: 'KRKN Forged', compatibility: ['Dodge Charger Hellcat', 'Ford Mustang Shelby GT500', 'Chevrolet Camaro ZL1'], tags: ['wheels', 'drag', 'tires'], visual: 'visual-wheels' },
  { id: 'performance-tires', name: { en: 'Performance Tires', es: 'Neumáticos de Rendimiento' }, description: { en: 'Tire consultation for grip, ride quality and fitment around your wheel package.', es: 'Consulta de neumáticos para agarre, calidad de marcha y fitment de tu setup de ruedas.' }, category: 'wheels', price: '$980', stock: 'in', brand: 'Fitment Lab', compatibility: ['Universal'], tags: ['tires', 'fitment', 'grip'], visual: 'visual-wheels' },
  { id: 'carbon-fiber-hood', name: { en: 'Carbon Fiber Hood', es: 'Capó de Fibra de Carbono' }, description: { en: 'Premium carbon exterior panel for aggressive styling and a motorsport-inspired finish.', es: 'Panel exterior premium en carbono para estilo agresivo y acabado inspirado en motorsport.' }, category: 'carbon', price: '$1,650', badge: { en: 'Carbon Finish', es: 'Acabado carbono' }, stock: 'preorder', brand: 'KRKN Aero', compatibility: ['BMW M4 CSL', 'Toyota GR Supra', 'Nissan Z'], tags: ['carbon', 'hood', 'exterior'], visual: 'visual-carbon' },
  { id: 'gt-wing-package', name: { en: 'GT Wing Package', es: 'Paquete GT Wing' }, description: { en: 'Track-inspired wing package with fitment support and exterior styling consultation.', es: 'Paquete de wing inspirado en track con soporte de fitment y consulta de estilo exterior.' }, category: 'body-kit', price: '$1,320', badge: { en: 'Fitment Checked', es: 'Fitment verificado' }, stock: 'preorder', brand: 'KRKN Aero', compatibility: ['Porsche 911 GT3 RS', 'Toyota GR Supra', 'Nissan GT-R Nismo'], tags: ['wing', 'spoiler', 'aero', 'body kit'], visual: 'visual-spoiler' },
  { id: 'led-headlights', name: { en: 'LED Headlights', es: 'Faros LED' }, description: { en: 'Premium lighting consultation for sharper front-end presence and cleaner night visibility where compatible.', es: 'Consulta premium de iluminación para una presencia frontal más definida y mejor visibilidad nocturna donde sea compatible.' }, category: 'lighting', price: '$940', badge: { en: 'OEM+ Look', es: 'Look OEM+' }, stock: 'low', brand: 'NightLine', compatibility: ['BMW 3 Series', 'Mercedes C-Class', 'Audi A4'], tags: ['lighting', 'headlights', 'exterior'], visual: 'visual-lighting' },
  { id: 'smoked-taillights', name: { en: 'Smoked Taillights', es: 'Taillights Ahumados' }, description: { en: 'Lighting upgrade for a cleaner rear profile with a premium dark exterior finish.', es: 'Mejora de iluminación para un perfil trasero más limpio con acabado exterior oscuro premium.' }, category: 'lighting', price: '$480', badge: { en: 'New Arrival', es: 'Nuevo' }, stock: 'in', brand: 'NightLine', compatibility: ['BMW 3 Series', 'Audi A4', 'VW Golf GTI'], tags: ['lighting', 'taillights', 'exterior'], visual: 'visual-lighting' },
  { id: 'ambient-lighting-kit', name: { en: 'Ambient Lighting Kit', es: 'Kit Ambient Lighting' }, description: { en: 'Interior lighting upgrade for a refined cabin mood without an aftermarket-looking finish.', es: 'Mejora de iluminación interior para un ambiente refinado sin acabado aftermarket excesivo.' }, category: 'lighting', price: '$360', stock: 'in', brand: 'NightLine', compatibility: ['Universal'], tags: ['lighting', 'interior'], visual: 'visual-lighting' },
  { id: 'carbon-steering-wheel', name: { en: 'Carbon Steering Wheel', es: 'Volante de Carbono' }, description: { en: 'Carbon and leather steering wheel upgrade for a more focused cockpit feel.', es: 'Mejora de volante en carbono y cuero para una cabina más enfocada.' }, category: 'interior', price: '$780', badge: { en: 'Carbon Finish', es: 'Acabado carbono' }, stock: 'low', brand: 'CabinCraft', compatibility: ['BMW M3 Competition', 'Audi RS3', 'Mercedes-AMG C63 S'], tags: ['interior', 'carbon', 'steering wheel'], visual: 'visual-interior' },
  { id: 'bucket-seat-package', name: { en: 'Bucket Seat Package', es: 'Paquete Bucket Seats' }, description: { en: 'Seat and harness consultation for track-focused interiors and responsible use.', es: 'Consulta de asientos y arnés para interiores track-focused y uso responsable.' }, category: 'interior', price: '$2,200', stock: 'preorder', brand: 'CabinCraft', compatibility: ['Porsche 911 GT3 RS', 'Toyota GR Supra', 'Honda Civic Type R'], tags: ['seats', 'harness', 'track'], visual: 'visual-interior' },
  { id: 'carplay-module', name: { en: 'CarPlay Module', es: 'Módulo CarPlay' }, description: { en: 'Modern infotainment module upgrade for cleaner daily usability.', es: 'Mejora de módulo infotainment moderno para uso diario más limpio.' }, category: 'electronics', price: '$420', stock: 'in', brand: 'SignalLab', compatibility: ['BMW 3 Series', 'Audi A4', 'Mercedes C-Class'], tags: ['carplay', 'module', 'electronics'], visual: 'visual-electronics' },
  { id: 'ecu-unlock', name: { en: 'ECU Unlock Service', es: 'Servicio ECU Unlock' }, description: { en: 'Software access consultation for supported platforms before responsible calibration work.', es: 'Consulta de acceso software para plataformas compatibles antes de una calibración responsable.' }, category: 'electronics', price: '$320', badge: { en: 'Dyno Supported', es: 'Apoyado por dyno' }, stock: 'in', brand: 'KRKN Tune', compatibility: ['BMW M3 Competition', 'Audi RS3', 'Mercedes-AMG A45 S'], tags: ['ecu unlock', 'software', 'tune'], visual: 'visual-ecu' },
  { id: 'window-tint-package', name: { en: 'Window Tint Package', es: 'Paquete Window Tint' }, description: { en: 'Premium tint consultation to sharpen exterior presence while respecting local regulations.', es: 'Consulta premium de tint para reforzar la presencia exterior respetando normativa local.' }, category: 'detailing', price: '$280', stock: 'in', brand: 'DetailPro', compatibility: ['Universal'], tags: ['tint', 'detailing', 'exterior'], visual: 'visual-detailing' },
  { id: 'vinyl-wrap-package', name: { en: 'Vinyl Wrap Package', es: 'Paquete Vinyl Wrap' }, description: { en: 'Exterior color and finish consultation for a curated, non-generic custom look.', es: 'Consulta de color y acabado exterior para un look custom curado y no genérico.' }, category: 'detailing', price: '$2,900', badge: { en: 'Premium Installation', es: 'Instalación premium' }, stock: 'preorder', brand: 'KRKN Eluxx Customs', compatibility: ['Universal'], tags: ['wrap', 'exterior', 'detailing'], visual: 'visual-detailing' },
  { id: 'roll-cage-package', name: { en: 'Roll Cage Package', es: 'Paquete Roll Cage' }, description: { en: 'Track safety consultation package for closed-course builds and intended use.', es: 'Paquete de consulta de seguridad track para builds de circuito cerrado y uso previsto.' }, category: 'track-drag', price: '$2,600', badge: { en: 'Track Ready', es: 'Track Ready' }, stock: 'preorder', brand: 'TrackSpec', compatibility: ['Toyota GR Supra', 'Porsche 911 GT3 RS', 'Honda Civic Type R'], tags: ['roll cage', 'track', 'safety'], visual: 'visual-track' },
  { id: 'lightweight-battery', name: { en: 'Lightweight Battery', es: 'Batería Ligera' }, description: { en: 'Weight reduction component for performance builds with proper charging compatibility.', es: 'Componente de reducción de peso para builds de rendimiento con compatibilidad de carga adecuada.' }, category: 'track-drag', price: '$430', stock: 'in', brand: 'TrackSpec', compatibility: ['Universal'], tags: ['weight', 'track', 'battery'], visual: 'visual-track' },
  { id: 'lift-kit', name: { en: 'SUV / Truck Lift Kit', es: 'Lift Kit SUV / Truck' }, description: { en: 'SUV and truck stance package for offroad presence, clearance and wheel fitment.', es: 'Paquete de stance para SUV y truck con presencia offroad, clearance y fitment de ruedas.' }, category: 'suv-truck', price: '$1,450', stock: 'preorder', brand: 'RidgeSpec', compatibility: ['Ram 1500 TRX', 'Range Rover SV', 'Mercedes-AMG G63'], tags: ['lift kit', 'truck', 'offroad'], visual: 'visual-suv' },
  { id: 'offroad-wheel-package', name: { en: 'Offroad Wheel Package', es: 'Paquete de Ruedas Offroad' }, description: { en: 'Wheel and tire setup for aggressive SUV/truck fitment and rugged exterior presence.', es: 'Setup de ruedas y neumáticos para fitment agresivo SUV/truck y presencia exterior robusta.' }, category: 'suv-truck', price: '$1,980', badge: { en: 'Fitment Checked', es: 'Fitment verificado' }, stock: 'low', brand: 'RidgeSpec', compatibility: ['Ram 1500 TRX', 'Jeep Grand Cherokee Trackhawk', 'Cadillac Escalade-V'], tags: ['offroad', 'wheels', 'suv'], visual: 'visual-suv' },
  { id: 'roof-rack-system', name: { en: 'Roof Rack System', es: 'Sistema Roof Rack' }, description: { en: 'Utility rack package for SUV/truck builds that need cargo function without losing premium exterior balance.', es: 'Paquete de rack utilitario para builds SUV/truck que necesitan función de carga sin perder balance exterior premium.' }, category: 'suv-truck', price: '$780', stock: 'in', brand: 'RidgeSpec', compatibility: ['Mercedes-AMG G63', 'Range Rover SV', 'Porsche Cayenne Turbo GT'], tags: ['roof rack', 'suv', 'truck', 'offroad'], visual: 'visual-suv' },
  { id: 'krkn-eluxx-hoodie', name: { en: 'KRKN Eluxx Customs Hoodie', es: 'Hoodie KRKN Eluxx Customs' }, description: { en: 'Premium heavyweight customs hoodie with restrained motorsport styling.', es: 'Hoodie premium de alto gramaje con estilo motorsport sobrio.' }, category: 'merchandise', price: '$68', stock: 'in', brand: 'KRKN Eluxx Customs', compatibility: ['Universal'], visual: 'visual-shirt' },
];

const gainRows = [
  { car: 'Porsche 911 Turbo S', hp: '+70 HP', torque: '+100 Nm', badge: 'Stage 1', image: vehicleAsset('vehicle-porsche-911-turbo-s.jpg') },
  { car: 'BMW M5 Competition', hp: '+80 HP', torque: '+120 Nm', badge: 'Dyno Tested', image: vehicleAsset('vehicle-bmw-m5-competition.jpg') },
  { car: 'BMW M3 CS', hp: '+65 HP', torque: '+90 Nm', badge: 'Stage 1', image: vehicleAsset('vehicle-bmw-m3-cs.jpg') },
  { car: 'Lamborghini Huracan', hp: '+50 HP', torque: '+60 Nm', badge: 'Stage 1', image: vehicleAsset('vehicle-lamborghini-huracan.jpg') },
  { car: 'Ferrari 488', hp: '+75 HP', torque: '+110 Nm', badge: 'Stage 2', image: vehicleAsset('vehicle-ferrari-488.jpg') },
  { car: 'Mercedes-AMG E63', hp: '+85 HP', torque: '+130 Nm', badge: 'Dyno Tested', image: vehicleAsset('vehicle-mercedes-amg-e63.jpg') },
];

const vehiclePlatformImages: Record<string, string> = {
  'bmw m5 competition': vehicleAsset('vehicle-bmw-m5-competition.jpg'),
  'bmw m3 cs': vehicleAsset('vehicle-bmw-m3-cs.jpg'),
  'bmw m3 competition': vehicleAsset('vehicle-bmw-m3-cs.jpg'),
  'bmw m4 csl': vehicleAsset('vehicle-bmw-m4-csl.jpg'),
  'bmw m2': vehicleAsset('vehicle-bmw-m2.jpg'),
  'bmw x5 m competition': vehicleAsset('vehicle-bmw-x5m.jpg'),
  'audi rs3': vehicleAsset('vehicle-audi-rs3.jpg'),
  'audi s3': vehicleAsset('vehicle-audi-s3.jpg'),
  'audi rs5': vehicleAsset('vehicle-audi-rs5.jpg'),
  'audi rs6 avant': vehicleAsset('vehicle-audi-rs6-avant.jpg'),
  'audi rs7': vehicleAsset('vehicle-audi-rs7.jpg'),
  'audi r8': vehicleAsset('vehicle-audi-r8.jpg'),
  'audi rsq8': vehicleAsset('vehicle-audi-rsq8.jpg'),
  'mercedes-amg a45 s': vehicleAsset('vehicle-mercedes-amg-a45.jpg'),
  'mercedes-amg c63 s': vehicleAsset('vehicle-mercedes-amg-c63.jpg'),
  'mercedes-amg e63 s': vehicleAsset('vehicle-mercedes-amg-e63.jpg'),
  'mercedes-amg gt black series': vehicleAsset('vehicle-mercedes-amg-gt-black-series.jpg'),
  'mercedes-amg g63': vehicleAsset('vehicle-mercedes-amg-g63.jpg'),
  'cadillac ct5-v blackwing': vehicleAsset('vehicle-cadillac-ct5v-blackwing.jpg'),
  'cadillac escalade-v': vehicleAsset('vehicle-cadillac-escalade.jpg'),
  'dodge charger hellcat': vehicleAsset('vehicle-dodge-charger-hellcat.jpg'),
  'dodge challenger hellcat': vehicleAsset('vehicle-dodge-challenger-hellcat.jpg'),
  'chevrolet camaro zl1': vehicleAsset('vehicle-chevrolet-camaro-zl1.jpg'),
  'ford mustang shelby gt500': vehicleAsset('vehicle-ford-mustang-gt500.jpg'),
  'ram 1500 trx': vehicleAsset('vehicle-ram-1500-trx.jpg'),
  'jeep grand cherokee trackhawk': vehicleAsset('vehicle-jeep-trackhawk.jpg'),
  'nissan gt-r nismo': vehicleAsset('vehicle-nissan-gtr.jpg'),
  'toyota gr supra': vehicleAsset('vehicle-toyota-supra.jpg'),
};

const vehicleImageForPlatform = (platform: VehiclePlatform, fallback?: string) => {
  const name = platform.name.toLowerCase();
  const exactImage = vehiclePlatformImages[name];

  if (exactImage) return exactImage;

  if (name.includes('porsche 911 turbo s')) return gainRows[0].image;
  if (name.includes('porsche 911') || name.includes('porsche carrera')) return gainRows[0].image;
  if (name.includes('bmw m5 competition')) return gainRows[1].image;
  if (name.includes('bmw m4')) return vehicleAsset('vehicle-bmw-m4-csl.jpg');
  if (name.includes('bmw m2')) return vehicleAsset('vehicle-bmw-m2.jpg');
  if (name.includes('bmw m3')) return gainRows[2].image;
  if (name.includes('hurac')) return gainRows[3].image;
  if (name.includes('urus')) return imageAsset('suv-offroad.jpg');
  if (name.includes('lamborghini')) return imageAsset('hero-garage.jpg');
  if (name.includes('ferrari 488')) return gainRows[4].image;
  if (name.includes('ferrari')) return imageAsset('garage-supercars.jpg');
  if (name.includes('mercedes-amg gt black')) return vehicleAsset('vehicle-mercedes-amg-gt-black-series.jpg');
  if (name.includes('mercedes-amg g63')) return vehicleAsset('vehicle-mercedes-amg-g63.jpg');
  if (name.includes('mercedes-amg e63')) return gainRows[5].image;
  if (name.includes('mercedes-amg c63')) return vehicleAsset('vehicle-mercedes-amg-c63.jpg');
  if (name.includes('mercedes-amg a45')) return vehicleAsset('vehicle-mercedes-amg-a45.jpg');
  if (name.includes('audi rsq8')) return vehicleAsset('vehicle-audi-rsq8.jpg');
  if (name.includes('audi r8')) return vehicleAsset('vehicle-audi-r8.jpg');
  if (name.includes('audi rs7')) return vehicleAsset('vehicle-audi-rs7.jpg');
  if (name.includes('audi rs6')) return vehicleAsset('vehicle-audi-rs6-avant.jpg');
  if (name.includes('audi rs5')) return vehicleAsset('vehicle-audi-rs5.jpg');
  if (name.includes('audi rs3')) return vehicleAsset('vehicle-audi-rs3.jpg');
  if (name.includes('audi s3')) return vehicleAsset('vehicle-audi-s3.jpg');
  if (name.includes('volkswagen') || name.includes('golf') || name.includes('civic') || name.includes('cupra')) return imageAsset('track-motion.jpg');
  if (name.includes('mustang')) return vehicleAsset('vehicle-ford-mustang-gt500.jpg');
  if (name.includes('camaro')) return vehicleAsset('vehicle-chevrolet-camaro-zl1.jpg');
  if (name.includes('charger')) return vehicleAsset('vehicle-dodge-charger-hellcat.jpg');
  if (name.includes('challenger')) return vehicleAsset('vehicle-dodge-challenger-hellcat.jpg');
  if (name.includes('ct5-v')) return vehicleAsset('vehicle-cadillac-ct5v-blackwing.jpg');
  if (name.includes('escalade')) return vehicleAsset('vehicle-cadillac-escalade.jpg');
  if (name.includes('corvette') || name.includes('hellcat') || name.includes('cadillac')) return imageAsset('supercar-street.jpg');
  if (name.includes('suv') || name.includes('ram') || name.includes('range rover') || name.includes('g63') || name.includes('urus') || name.includes('trackhawk') || name.includes('cayenne')) return imageAsset('suv-offroad.jpg');

  return fallback ?? imageAsset('garage-luxury-dark.jpg');
};

const serviceIcons: LucideIcon[] = [Sparkles, Cpu, Package, Activity];

const brandStatement: BrandStatement = {
  title: { en: 'What is KRKN?', es: '¿Qué es KRKN?' },
  body: {
    en: 'KRKN Eluxx Customs is a premium automotive customization brand built around three ideas: refined detailing, measured performance and carefully selected aftermarket upgrades. From PPF and ceramic protection to ECU tuning, dyno sessions and exterior styling, KRKN brings detailing, tuning and parts installation together under one roof.',
    es: 'KRKN Eluxx Customs es una marca premium de personalización automotriz basada en tres ideas: detailing refinado, rendimiento medido y mejoras aftermarket cuidadosamente seleccionadas. Desde PPF y protección cerámica hasta reprogramación ECU, sesiones dyno y estilo exterior, KRKN une detailing, tuning e instalación de piezas en un solo lugar.',
  },
  pillars: [
    {
      title: { en: 'Detail', es: 'Detail' },
      body: {
        en: 'Measured paint correction, PPF-ready finishes and interior refinement for a luxury-grade delivery.',
        es: 'Corrección de pintura medida, acabados listos para PPF y refinamiento interior con entrega de nivel lujo.',
      },
      icon: Sparkles,
    },
    {
      title: { en: 'Tune', es: 'Tune' },
      body: {
        en: 'Responsible ECU/TCU calibration, dyno-supported validation and performance paths built around intended use.',
        es: 'Calibración ECU/TCU responsable, validación apoyada por dyno y rutas de rendimiento según uso previsto.',
      },
      icon: Gauge,
    },
    {
      title: { en: 'Customize', es: 'Personaliza' },
      body: {
        en: 'Premium aero, carbon styling and aftermarket parts selected for fitment, sound and reliability.',
        es: 'Aero premium, estilo carbono y piezas aftermarket seleccionadas por ajuste, sonido y fiabilidad.',
      },
      icon: Wrench,
    },
  ],
};

const vehicleCategories: VehicleCategory[] = [
  { id: 'performance', label: { en: 'Performance Sedans / Coupes', es: 'Sedanes / Coupés de rendimiento' }, image: imageAsset('garage-industrial.jpg') },
  { id: 'texas', label: { en: 'Texas Street / Highway Icons', es: 'Íconos street / highway de Texas' }, image: imageAsset('supercar-street.jpg') },
  { id: 'supercar', label: { en: 'Supercar / Exotic', es: 'Supercar / Exótico' }, image: imageAsset('supercar-lineup.jpg') },
  { id: 'hypercar', label: { en: 'Hypercar Level', es: 'Nivel hypercar' }, image: imageAsset('garage-supercars.jpg') },
  { id: 'suv', label: { en: 'Performance SUV / Truck', es: 'SUV / Truck de rendimiento' }, image: imageAsset('suv-offroad.jpg') },
  { id: 'driver', label: { en: 'Hot Hatch / Driver Cars', es: 'Hot hatch / driver cars' }, image: imageAsset('carbon-body.jpg') },
];

const vehiclePlatforms: VehiclePlatform[] = [
  ...['BMW M5 Competition', 'BMW M3 CS', 'BMW M3 Competition', 'BMW M4 CSL', 'BMW M2', 'Audi RS3', 'Audi S3', 'Audi RS5', 'Audi RS6 Avant', 'Audi RS7', 'Volkswagen Golf R', 'Mercedes-AMG A45 S', 'Mercedes-AMG C63 S', 'Mercedes-AMG E63 S', 'Mercedes-AMG GT Black Series', 'Cadillac CT5-V Blackwing', 'Dodge Charger Hellcat', 'Dodge Challenger Hellcat', 'Chevrolet Camaro ZL1', 'Ford Mustang Shelby GT500', 'Tesla Model S Plaid'].map((name) => ({ category: vehicleCategories[0].label, name, tags: ['ECU Tune', 'Dyno', 'Exhaust', 'Intake', 'PPF'] })),
  ...['Chevrolet Corvette C8', 'Chevrolet Corvette Z06', 'Nissan GT-R Nismo', 'Toyota GR Supra', 'Porsche 911 Turbo S', 'Porsche 911 GT3 RS', 'Audi R8'].map((name) => ({ category: vehicleCategories[1].label, name, tags: ['Dyno', 'Exhaust', 'Body Kit', 'Detailing', 'PPF'] })),
  ...['Lamborghini Huracán', 'Lamborghini Aventador', 'Ferrari 488 GTB', 'Ferrari F8 Tributo', 'Ferrari 812 Superfast', 'McLaren 720S', 'McLaren 765LT', 'Aston Martin DBS Superleggera', 'Bentley Continental GT Speed', 'Porsche Carrera GT', 'Ford GT', 'Lotus Emira', 'Alpine A110'].map((name) => ({ category: vehicleCategories[2].label, name, tags: ['Detailing', 'PPF', 'Carbon', 'Exterior', 'Dyno'] })),
  ...['Bugatti Chiron', 'Koenigsegg Jesko', 'Pagani Huayra', 'Rimac Nevera', 'Ferrari LaFerrari', 'McLaren P1'].map((name) => ({ category: vehicleCategories[3].label, name, tags: ['PPF', 'Detailing', 'Dyno', 'Carbon', 'Concierge'] })),
  ...['BMW X5 M Competition', 'BMW X7 M60i', 'Audi RSQ8', 'Lamborghini Urus', 'Mercedes-AMG G63', 'Porsche Cayenne Turbo GT', 'Jeep Grand Cherokee Trackhawk', 'Cadillac Escalade-V', 'Ram 1500 TRX', 'Range Rover SV'].map((name) => ({ category: vehicleCategories[4].label, name, tags: ['Dyno', 'Exhaust', 'Wheels', 'PPF', 'SUV'] })),
  ...['Nissan Z', 'Toyota GR Yaris', 'Honda Civic Type R', 'Hyundai i30 N', 'Renault Megane RS', 'Cupra Leon VZ'].map((name) => ({ category: vehicleCategories[5].label, name, tags: ['ECU Tune', 'Intake', 'Suspension', 'Body Kit', 'Detailing'] })),
];

const platformCopy = {
  eyebrow: { en: 'Supported Performance Platforms', es: 'Plataformas de rendimiento compatibles' },
  title: { en: 'Built for icons, curated for real fitment.', es: 'Creado para íconos, curado para fitment real.' },
  body: {
    en: 'Search premium platforms by category and explore upgrade paths for detailing, tuning, dyno validation, aero styling and aftermarket installation.',
    es: 'Busca plataformas premium por categoría y explora rutas de mejora para detailing, tuning, validación dyno, estilo aero e instalación aftermarket.',
  },
  search: { en: 'Search vehicles or services', es: 'Buscar vehículos o servicios' },
  all: { en: 'All Platforms', es: 'Todas las plataformas' },
  button: { en: 'View Upgrades', es: 'Ver mejoras' },
  modalTitle: { en: 'Build Options', es: 'Opciones de build' },
  ctaShop: { en: 'Explore Parts', es: 'Explorar piezas' },
  ctaContact: { en: 'Request Platform Quote', es: 'Solicitar cotización' },
  empty: { en: 'No platforms found. Try another model or service keyword.', es: 'No se encontraron plataformas. Prueba otro modelo o servicio.' },
  note: {
    en: 'Vehicle names and brands are used for compatibility and service reference only. KRKN Eluxx Customs is an independent automotive customization company.',
    es: 'Los nombres y marcas de vehículos se utilizan únicamente como referencia de compatibilidad y servicio. KRKN Eluxx Customs es una empresa independiente de personalización automotriz.',
  },
};

const technicalCopy = {
  eyebrow: { en: 'KRKN Technical Notes', es: 'Notas técnicas KRKN' },
  title: { en: 'Performance knowledge with a responsible edge.', es: 'Conocimiento de rendimiento con enfoque responsable.' },
  body: {
    en: 'Clear, expert-style notes for enthusiasts comparing detailing, tuning, dyno validation and exterior upgrades.',
    es: 'Notas claras y expertas para entusiastas que comparan detailing, tuning, validación dyno y mejoras exteriores.',
  },
  readMore: { en: 'Read More', es: 'Leer más' },
};

const technicalNotes: TechnicalNote[] = [
  {
    title: { en: 'What is Stage 1 Tuning?', es: '¿Qué es Stage 1?' },
    tag: { en: 'ECU', es: 'ECU' },
    summary: { en: 'A software-first calibration path for supported vehicles with no major hardware changes.', es: 'Una ruta de calibración software-first para vehículos compatibles sin grandes cambios de hardware.' },
    details: { en: 'Stage 1 tuning focuses on throttle response, torque delivery and safe power within the limits of the factory hardware. Suitability depends on vehicle condition, fuel quality and intended use.', es: 'Stage 1 se enfoca en respuesta, entrega de torque y potencia segura dentro de los límites del hardware original. La viabilidad depende del estado del vehículo, combustible y uso previsto.' },
  },
  {
    title: { en: 'ECU Tune vs TCU Tune', es: 'ECU Tune vs TCU Tune' },
    tag: { en: 'Software', es: 'Software' },
    summary: { en: 'Engine and gearbox calibration solve different parts of the performance experience.', es: 'La calibración de motor y caja resuelve partes diferentes de la experiencia de rendimiento.' },
    details: { en: 'ECU tuning manages engine behavior. TCU tuning refines shift logic, torque management and drivability where supported. Both should be matched to hardware and responsible use.', es: 'ECU tuning gestiona el motor. TCU tuning refina lógica de cambios, gestión de torque y conducción donde sea compatible. Ambos deben adaptarse al hardware y uso responsable.' },
  },
  {
    title: { en: 'Why Dyno Testing Matters', es: 'Por qué importa el dyno' },
    tag: { en: 'Dyno', es: 'Dyno' },
    summary: { en: 'Dyno data helps validate power delivery instead of relying on guesses.', es: 'Los datos dyno ayudan a validar la entrega de potencia en lugar de depender de suposiciones.' },
    details: { en: 'A dyno session can compare baseline and post-upgrade behavior, review torque curves and support safer calibration decisions. Figures should be treated as measured context, not reckless claims.', es: 'Una sesión dyno compara baseline y comportamiento post-upgrade, revisa curvas de torque y apoya decisiones de calibración más seguras. Las cifras son contexto medido, no promesas imprudentes.' },
  },
  {
    title: { en: 'PPF vs Ceramic Coating', es: 'PPF vs coating cerámico' },
    tag: { en: 'Detailing', es: 'Detailing' },
    summary: { en: 'Protection film and ceramic coating protect different surfaces in different ways.', es: 'La película de protección y el coating cerámico protegen superficies de maneras distintas.' },
    details: { en: 'PPF adds physical impact protection for paint. Ceramic coating improves gloss, hydrophobic behavior and maintenance. Many premium builds use both with careful paint preparation.', es: 'PPF añade protección física contra impactos. El coating mejora brillo, comportamiento hidrofóbico y mantenimiento. Muchos builds premium combinan ambos con preparación cuidadosa.' },
  },
  {
    title: { en: 'Catback vs Downpipe', es: 'Catback vs Downpipe' },
    tag: { en: 'Exhaust', es: 'Escape' },
    summary: { en: 'Sound, flow and legal considerations vary by exhaust component.', es: 'Sonido, flujo y consideraciones legales cambian según el componente de escape.' },
    details: { en: 'Catback systems usually affect tone and rear-section flow. Downpipes can support higher stages but may affect emissions compliance depending on vehicle and location.', es: 'Los sistemas catback suelen afectar tono y flujo trasero. Los downpipes pueden apoyar stages superiores pero pueden afectar cumplimiento de emisiones según vehículo y ubicación.' },
  },
  {
    title: { en: 'Cold Air Intake Benefits', es: 'Beneficios del cold air intake' },
    tag: { en: 'Intake', es: 'Intake' },
    summary: { en: 'A good intake upgrade supports airflow, sound and serviceability when selected correctly.', es: 'Un buen intake apoya flujo, sonido y mantenimiento cuando se selecciona correctamente.' },
    details: { en: 'Intakes should be chosen for heat management, filter quality, fitment and calibration compatibility. Bigger is not always better without a complete setup.', es: 'Los intakes deben elegirse por manejo de calor, calidad de filtro, fitment y compatibilidad de calibración. Más grande no siempre es mejor sin un setup completo.' },
  },
  {
    title: { en: 'How Body Kits Affect Aerodynamics', es: 'Cómo los body kits afectan la aerodinámica' },
    tag: { en: 'Aero', es: 'Aero' },
    summary: { en: 'Exterior parts should be selected for fitment, stability and visual balance.', es: 'Las piezas exteriores deben seleccionarse por fitment, estabilidad y balance visual.' },
    details: { en: 'Front lips, splitters, diffusers and wings can change airflow and road presence. KRKN focuses on clean installation, fitment support and a curated exterior language.', es: 'Front lips, splitters, difusores y wings pueden cambiar flujo y presencia. KRKN se enfoca en instalación limpia, soporte de fitment y un lenguaje exterior curado.' },
  },
  {
    title: { en: 'Choosing Wheels for Fitment and Performance', es: 'Elegir ruedas para fitment y rendimiento' },
    tag: { en: 'Fitment', es: 'Fitment' },
    summary: { en: 'Wheel choice affects stance, clearance, grip and how complete the build feels.', es: 'La elección de ruedas afecta stance, clearance, agarre y la sensación final del build.' },
    details: { en: 'Offset, tire sizing, brake clearance and suspension setup should be considered together. A premium fitment looks intentional and drives correctly.', es: 'Offset, medida de neumático, clearance de frenos y suspensión deben evaluarse juntos. Un fitment premium se ve intencional y conduce correctamente.' },
  },
];

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(products);
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
  const normalPageTitleRef = useRef(t.meta.title);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/catalog', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Catalog unavailable');
        return response.json();
      })
      .then((payload) => {
        const liveProducts = catalogProductsFrom(payload);
        if (!cancelled && liveProducts) setCatalogProducts(liveProducts);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    normalPageTitleRef.current = t.meta.title;
    if (!document.hidden) {
      document.title = t.meta.title;
    }
    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription?.setAttribute('content', t.meta.description);
  }, [language, t.meta.description, t.meta.title]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? '!! COME BACK !!' : normalPageTitleRef.current;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const brands = useMemo(() => ['all', ...Array.from(new Set(catalogProducts.map((product) => product.brand)))], [catalogProducts]);
  const vehicles = useMemo(
    () => ['all', ...Array.from(new Set(catalogProducts.flatMap((product) => product.compatibility)))],
    [catalogProducts],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return catalogProducts.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const searchable = [
        product.name[language],
        product.description[language],
        t.categoryLabels[product.category],
        product.brand,
        product.compatibility.join(' '),
        searchableTags(product.tags ?? []),
      ]
        .join(' ')
        .toLowerCase();
      const matchesSearch = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesBrand = brandFilter === 'all' || product.brand === brandFilter;
      const matchesVehicle = vehicleFilter === 'all' || product.compatibility.includes(vehicleFilter);
      return matchesCategory && matchesSearch && matchesBrand && matchesVehicle;
    });
  }, [activeCategory, brandFilter, catalogProducts, language, query, t.categoryLabels, vehicleFilter]);

  const selectedProduct = catalogProducts.find((product) => product.id === selectedProductId) ?? catalogProducts[0] ?? products[0];
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartProducts = catalogProducts.filter((product) => cart[product.id]);

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
      category === 'all' ? catalogProducts[0] : catalogProducts.find((product) => product.category === category);
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

  const handleQuoteSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    setQuoteStatus(t.contact.submitting);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, language }),
      });
      if (!response.ok) throw new Error('Request failed');
      setQuoteStatus(t.contact.submitSuccess);
      form.reset();
    } catch {
      setQuoteStatus(t.contact.submitError);
    }
  };

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') || '');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Request failed');
      setNewsletterStatus(t.common.newsletterSuccess);
      form.reset();
    } catch {
      setNewsletterStatus(t.contact.submitError);
    }
  };

  const isAdminRoute = window.location.pathname.replace(/\/+$/, '').endsWith('/admin');
  if (isAdminRoute) {
    return (
      <AdminStudio
        language={language}
        setLanguage={setLanguage}
        products={catalogProducts}
        onProductsChange={setCatalogProducts}
        productImage={(product) => imageSource(productImageFor(product))}
      />
    );
  }

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
        <BrandEssence language={language} />
        <BuildEditorial language={language} />
        <Services t={t} />
        <PerformancePackages t={t} />
        <TuningPotential t={t} />
        <DynoSection t={t} />
        <MediaSection t={t} />
        <VehiclePlatforms language={language} />
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
        <TechnicalNotes language={language} />
        <About t={t} />
        <Contact language={language} t={t} handleQuoteSubmit={handleQuoteSubmit} quoteStatus={quoteStatus} />
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
      <img
        src={publicAsset(imageAsset('hero-garage.jpg'))}
        alt={t.hero.imageAlt}
        className="hero-bg"
        onError={(event) => {
          event.currentTarget.src = publicAsset('assets/krkn-hero-garage.png');
        }}
      />
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

function BrandEssence({ language }: { language: Language }) {
  return (
    <section className="section-band brand-essence-section">
      <div className="container brand-essence-layout">
        <div className="brand-essence-copy">
          <p className="eyebrow">KRKN // Eluxx Customs</p>
          <h2>{brandStatement.title[language]}</h2>
          <p>{brandStatement.body[language]}</p>
          <div className="brand-line">
            <span>{language === 'en' ? 'Measured power. Refined finish.' : 'Potencia medida. Acabado refinado.'}</span>
            <span>{language === 'en' ? 'Not just modified. Curated.' : 'No solo modificado. Curado.'}</span>
          </div>
        </div>
        <div className="brand-pillar-grid">
          {brandStatement.pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article className="brand-pillar-card" key={pillar.title.en}>
                <Icon size={24} />
                <h3>{pillar.title[language]}</h3>
                <p>{pillar.body[language]}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BuildEditorial({ language }: { language: Language }) {
  const copy = {
    eyebrow: language === 'en' ? 'Studio View' : 'Vista de estudio',
    title:
      language === 'en'
        ? 'Images, parts and process now work like a custom shop, not a catalog shell.'
        : 'Imágenes, piezas y proceso ahora funcionan como un customs shop, no como una plantilla.',
    body:
      language === 'en'
        ? 'The page pairs exact exotic platforms with part-specific hardware visuals, cinematic preview cards and darker editorial transitions so every section feels tied to real builds.'
        : 'La página combina plataformas exóticas exactas con hardware visual específico, previews cinematográficos y transiciones editoriales oscuras para que cada sección se sienta ligada a builds reales.',
    feature: language === 'en' ? 'Vehicle spotlight' : 'Spotlight de vehículo',
    hardware: language === 'en' ? 'Hardware detail' : 'Detalle de hardware',
    motion: language === 'en' ? 'Motion preview' : 'Preview en movimiento',
  };

  return (
    <section className="section-band editorial-section">
      <div className="container editorial-layout">
        <div className="editorial-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
        <div className="editorial-mosaic" aria-label={copy.eyebrow}>
          <figure className="editorial-tile editorial-tile-large">
            <img src={publicAsset(vehicleAsset('vehicle-lamborghini-huracan.jpg'))} alt="Lamborghini Huracan" loading="lazy" onError={fallbackImage} />
            <figcaption>{copy.feature}</figcaption>
          </figure>
          <figure className="editorial-tile">
            <img src={publicAsset(productAsset('part-turbocharger.jpg'))} alt="Turbocharger hardware" loading="lazy" onError={fallbackImage} />
            <figcaption>{copy.hardware}</figcaption>
          </figure>
          <figure className="editorial-tile">
            <img src={publicAsset(motionAsset('video-dyno-preview.jpg'))} alt="Dyno testing preview" loading="lazy" onError={fallbackImage} />
            <figcaption>{copy.motion}</figcaption>
          </figure>
        </div>
      </div>
    </section>
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
                <div className="service-photo">
                  <img src={publicAsset(serviceImages[index] ?? serviceImages[0])} alt="" loading="lazy" onError={fallbackImage} />
                </div>
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
        <div className="gain-card-grid" aria-label="Sample estimated performance gains">
          {gainRows.map((row) => (
            <article className="gain-card" key={row.car}>
              <div className="gain-visual">
                <img src={imageSource(row.image)} alt={row.car} loading="lazy" onError={fallbackImage} />
                <span>{row.badge}</span>
              </div>
              <div className="gain-body">
                <h3>{row.car}</h3>
                <div className="gain-metrics">
                  <strong>{row.hp}</strong>
                  <strong>{row.torque}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="gains-disclaimer">{t.common.gainsDisclaimer}</p>
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
  const [activeClipIndex, setActiveClipIndex] = useState<number | null>(null);
  const [videoError, setVideoError] = useState(false);
  const activeClip = activeClipIndex === null ? null : t.media.clips[activeClipIndex];

  useEffect(() => {
    setVideoError(false);
  }, [activeClipIndex]);

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
              key={clip.title}
              role="button"
              tabIndex={0}
              aria-label={`${t.media.playLabel}: ${clip.title}`}
              onClick={() => setActiveClipIndex(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setActiveClipIndex(index);
                }
              }}
            >
              <img src={imageSource(clip.poster)} alt="" loading="lazy" onError={fallbackImage} />
              <div className="motion-overlay" />
              <div className="motion-meta">
                <Film size={15} />
                <span>{clip.meta}</span>
              </div>
              <span className="play-button" aria-hidden="true">
                <Play size={21} fill="currentColor" />
              </span>
              <div className="motion-copy">
                <h3>{clip.title}</h3>
                <p>{clip.label}</p>
                <span className="motion-action">
                  <Play size={14} fill="currentColor" />
                  {t.media.playLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeClip && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="motion-preview-title">
          <div className="modal-card motion-modal">
            <button
              type="button"
              className="modal-close"
              aria-label={t.media.closeLabel}
              onClick={() => setActiveClipIndex(null)}
            >
              <X size={18} />
            </button>
            <div className="motion-preview-frame">
              {videoError ? (
                <div className="video-fallback">
                  <img src={imageSource(activeClip.poster)} alt="" onError={fallbackImage} />
                  <p>{t.media.unavailableLabel}</p>
                </div>
              ) : (
                <video
                  key={activeClip.video}
                  className="motion-video"
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  poster={imageSource(activeClip.poster)}
                  onError={() => setVideoError(true)}
                >
                  <source src={activeClip.video} type="video/mp4" />
                  {t.media.unavailableLabel}
                </video>
              )}
              <div className="motion-scanline" />
            </div>
            <span className="detail-kicker">{activeClip.meta}</span>
            <h2 id="motion-preview-title">{activeClip.title}</h2>
            <p>{activeClip.label}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function VehiclePlatforms({ language }: { language: Language }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [platformQuery, setPlatformQuery] = useState('');
  const [activePlatform, setActivePlatform] = useState<VehiclePlatform | null>(null);
  const normalizedQuery = platformQuery.trim().toLowerCase();
  const selectedCategory = vehicleCategories.find((category) => category.id === activeCategory);
  const visiblePlatforms = vehiclePlatforms
    .filter((platform) => {
      const matchesCategory = activeCategory === 'all' || platform.category.en === selectedCategory?.label.en;
      const searchable = [platform.name, platform.category[language], searchableTags(platform.tags)].join(' ').toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    })
    .slice(0, 18);

  return (
    <section className="section-band platform-section" id="platforms">
      <div className="container">
        <SectionIntro
          eyebrow={platformCopy.eyebrow[language]}
          title={platformCopy.title[language]}
          body={platformCopy.body[language]}
        />
        <div className="platform-controls">
          <label className="search-control">
            <Search size={18} />
            <span className="sr-only">{platformCopy.search[language]}</span>
            <input
              value={platformQuery}
              onChange={(event) => setPlatformQuery(event.target.value)}
              placeholder={platformCopy.search[language]}
            />
          </label>
          <div className="category-filter platform-filter" aria-label={platformCopy.eyebrow[language]}>
            <button
              type="button"
              className={activeCategory === 'all' ? 'active' : ''}
              onClick={() => setActiveCategory('all')}
            >
              {platformCopy.all[language]}
            </button>
            {vehicleCategories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={activeCategory === category.id ? 'active' : ''}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label[language]}
              </button>
            ))}
          </div>
        </div>
        {visiblePlatforms.length > 0 ? (
          <div className="platform-grid">
            {visiblePlatforms.map((platform, index) => {
              const platformCategory = vehicleCategories.find((category) => category.label.en === platform.category.en);
              return (
                <article className="platform-card" key={`${platform.category.en}-${platform.name}`}>
                  <div className={`platform-visual platform-visual-${(index % 6) + 1}`}>
                    <img
                      src={imageSource(vehicleImageForPlatform(platform, platformCategory?.image))}
                      alt=""
                      loading="lazy"
                      onError={fallbackImage}
                    />
                    <Car size={34} />
                  </div>
                  <div className="platform-body">
                    <span>{platform.category[language]}</span>
                    <h3>{platform.name}</h3>
                    <div className="tag-row">
                      {platform.tags.slice(0, 4).map((tag) => (
                        <small key={tag}>{localizeTag(tag, language)}</small>
                      ))}
                    </div>
                    <button type="button" className="text-link" onClick={() => setActivePlatform(platform)}>
                      {platformCopy.button[language]}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={22} />
            <p>{platformCopy.empty[language]}</p>
          </div>
        )}
        <p className="platform-note">{platformCopy.note[language]}</p>
      </div>

      {activePlatform && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="platform-title">
          <div className="modal-card project-modal platform-modal">
            <button
              type="button"
              className="modal-close"
              aria-label={language === 'en' ? 'Close' : 'Cerrar'}
              onClick={() => setActivePlatform(null)}
            >
              <X size={18} />
            </button>
            <span className="detail-kicker">{platformCopy.modalTitle[language]}</span>
            <h2 id="platform-title">{activePlatform.name}</h2>
            <p>
              {language === 'en'
                ? 'Performance parts selected for fitment, sound and reliability. Built for enthusiasts, finished like a luxury product.'
                : 'Piezas de rendimiento seleccionadas por ajuste, sonido y fiabilidad. Creado para entusiastas, terminado como un producto de lujo.'}
            </p>
            <div className="tag-row">
              {activePlatform.tags.map((tag) => (
                <span key={tag}>{localizeTag(tag, language)}</span>
              ))}
            </div>
            <div className="modal-actions">
              <a className="primary-button" href="#shop" onClick={() => setActivePlatform(null)}>
                {platformCopy.ctaShop[language]}
              </a>
              <a className="secondary-button" href="#contact" onClick={() => setActivePlatform(null)}>
                {platformCopy.ctaContact[language]}
              </a>
            </div>
          </div>
        </div>
      )}
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
        <img
          src={imageSource(productImageFor(product))}
          alt=""
          loading="lazy"
          onError={fallbackImage}
        />
        {(product.sale || product.badge) && (
          <span className="sale-badge">
            <BadgePercent size={15} />
            {product.badge ? product.badge[language] : t.common.sale}
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
      </div>
      <div className="product-body">
        <span className="product-category">{t.categoryLabels[product.category]}</span>
        <h3>{product.name[language]}</h3>
        <p>{product.description[language]}</p>
        {product.tags && (
          <div className="product-tags">
            {product.tags.slice(0, 3).map((tag) => (
              <small key={tag}>{localizeTag(tag, language)}</small>
            ))}
          </div>
        )}
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
      <div className={`detail-visual ${product.visual}`} role="img" aria-label={product.name[language]}>
        <img src={imageSource(productImageFor(product))} alt="" loading="lazy" onError={fallbackImage} />
      </div>
      <div className="detail-kicker">{t.common.category}: {t.categoryLabels[product.category]}</div>
      <h3>{product.name[language]}</h3>
      <p>{product.description[language]}</p>
      {product.tags && (
        <div className="product-tags detail-tags">
          {product.tags.slice(0, 5).map((tag) => (
            <small key={tag}>{localizeTag(tag, language)}</small>
          ))}
        </div>
      )}
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
              <div className="category-card-visual">
                <img src={publicAsset(productImageByCategory[category])} alt="" loading="lazy" onError={fallbackImage} />
              </div>
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
          {t.projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className={`project-visual ${project.visual}`} role="img" aria-label={project.title}>
                <img src={publicAsset(projectImages[index] ?? projectImages[0])} alt="" loading="lazy" onError={fallbackImage} />
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

function TechnicalNotes({ language }: { language: Language }) {
  const [activeNote, setActiveNote] = useState<TechnicalNote | null>(null);

  return (
    <section className="section-band technical-section" id="technical">
      <div className="container">
        <SectionIntro
          eyebrow={technicalCopy.eyebrow[language]}
          title={technicalCopy.title[language]}
          body={technicalCopy.body[language]}
        />
        <div className="technical-grid">
          {technicalNotes.map((note, index) => (
            <article className="technical-card" key={note.title.en}>
              <div className="technical-visual">
                <img src={publicAsset(technicalImages[index] ?? technicalImages[0])} alt="" loading="lazy" onError={fallbackImage} />
              </div>
              <span>{note.tag[language]}</span>
              <h3>{note.title[language]}</h3>
              <p>{note.summary[language]}</p>
              <button type="button" className="text-link" onClick={() => setActiveNote(note)}>
                {technicalCopy.readMore[language]}
                <ChevronRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeNote && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="technical-title">
          <div className="modal-card project-modal technical-modal">
            <button
              type="button"
              className="modal-close"
              aria-label={language === 'en' ? 'Close' : 'Cerrar'}
              onClick={() => setActiveNote(null)}
            >
              <X size={18} />
            </button>
            <span className="detail-kicker">{activeNote.tag[language]}</span>
            <h2 id="technical-title">{activeNote.title[language]}</h2>
            <p>{activeNote.details[language]}</p>
            <div className="modal-actions">
              <a className="primary-button" href="#contact" onClick={() => setActiveNote(null)}>
                {language === 'en' ? 'Discuss This Setup' : 'Consultar este setup'}
              </a>
              <button type="button" className="secondary-button" onClick={() => setActiveNote(null)}>
                {language === 'en' ? 'Close' : 'Cerrar'}
              </button>
            </div>
          </div>
        </div>
      )}
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
          <p>info@eluxx.us</p>
          <strong>{t.footer.slogan}</strong>
        </div>
      </div>
    </section>
  );
}

function Contact({
  language,
  t,
  handleQuoteSubmit,
  quoteStatus,
}: {
  language: Language;
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
              const icons = [ClipboardCheck, Mail, MapPin, Instagram];
              const Icon = icons[index] ?? ClipboardCheck;
              const hrefs = [
                '#contact-form',
                'mailto:info@eluxx.us',
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

        <form className="quote-form" id="contact-form" onSubmit={handleQuoteSubmit}>
          <input className="form-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
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
          <span>info@eluxx.us</span>
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
            <input type="email" name="email" placeholder={t.footer.emailPlaceholder} required />
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
