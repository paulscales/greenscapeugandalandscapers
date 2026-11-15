export interface ServiceItem {
  id: string;
  name: string;
  category: 'design' | 'hardscaping' | 'planting' | 'maintenance';
  summary: string;
}

export interface DisciplineGroup {
  index: string;
  title: string;
  category: 'design' | 'hardscaping' | 'planting' | 'maintenance';
  headline: string;
  description: string;
  highlights: string[];
  featured: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'compounds' | 'pavers' | 'rockery';
  categoryLabel: string;
  location: string;
  image: string;
  aspectClass: string;
  scope: string;
  servicesUsed: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  meta: string;
  timeAgo: string;
  rating: number;
  servicesTag?: string;
  quote: string;
  ownerReply?: string;
  ownerReplyTime?: string;
}

export interface SocialPostItem {
  id: string;
  title: string;
  excerpt: string;
  timeAgo: string;
  channel: string;
}

export interface FaqItem {
  id: string;
  category: 'pricing' | 'timelines' | 'plant-care';
  categoryLabel: string;
  question: string;
  answer: string;
}

export const assetUrl = (relativePath: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${relativePath.replace(/^\/+/, '')}`;
};

export const LOGO_IMAGE_URL = assetUrl('assets/aistudio/image_59c8df70.png');
export const HERO_IMAGE_URL = assetUrl('assets/aistudio/image_9265b7f5.png');

export const BUSINESS_INFO = {
  name: 'GreenScape Uganda',
  tagline: 'Landscape Design, Compound Paving & Botanical Styling in Kampala',
  phoneDisplay: '0781 021371',
  phoneIntl: '+256 781 021371',
  telHref: 'tel:+256781021371',
  whatsappBase: 'https://wa.me/256781021371',
  address: 'Opposite MOTV, Old Port Bell Road, Wankoko, Kampala',
  shortAddress: 'Old Port Bell Road, Wankoko, Kampala',
  hoursSummary: 'Opens 9:00 AM Sat · Mon–Sat Consultations',
  rating: '5.0',
  reviewCount: 5,
  instagramHandle: '@greenscapeuganda',
  instagramUrl: 'https://www.instagram.com/greenscapeuganda/',
  facebookUrl: 'https://www.facebook.com/search/top?q=GreenScape%20Uganda',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=GreenScape+Uganda+Old+Port+Bell+Road+Wankoko+Kampala',
};

export const DISCIPLINES: DisciplineGroup[] = [
  {
    index: '01.',
    title: 'Landscape Architecture & Compound Designing',
    category: 'design',
    headline: 'Master-planned residential & commercial compounds built for Kampala’s climate.',
    description:
      'From initial site grading and spatial layout to complete construction drawings, we transform bare plots and older yards into structured, low-maintenance outdoor living grounds.',
    highlights: [
      'Custom landscape design',
      'Compound Designing',
      'Landscape architecture services',
      'Landscape design construction',
    ],
    featured: true,
  },
  {
    index: '02.',
    title: 'Driveway Paving, Steps & Hardscaping',
    category: 'hardscaping',
    headline: 'Precision interlocking pavers, stone walkways, and exterior steps.',
    description:
      'Engineered sub-bases, clean drainage gradients, and crisp pattern work using interlocking concrete blocks, natural stone slabs, and bordered garden paths.',
    highlights: [
      'Pavers (paving and block) installation',
      'Driveway or path paving',
      'Outdoor step construction',
      'Hardscaping',
    ],
    featured: false,
  },
  {
    index: '03.',
    title: 'Lawns, Rock Gardens & Plant Nursery',
    category: 'planting',
    headline: 'Lush green turf, sculpted rockeries, and indoor/outdoor specimen plants.',
    description:
      'Full soil preparation, tropical border planting, mature trees, rock gardens, and ready-to-place indoor and outdoor plants available directly from our Old Port Bell Road store.',
    highlights: [
      'Lawn installation & grass planting',
      'Rock garden design',
      'Flowers & tree planting',
      'Indoor plants for homes, offices & hotels',
    ],
    featured: false,
  },
  {
    index: '04.',
    title: 'Ongoing Garden & Lawn Maintenance',
    category: 'maintenance',
    headline: 'Scheduled pruning, mowing, weeding, and seasonal soil care.',
    description:
      'Keep your compound crisp year-round with reliable routine visits—hedge shaping, turf feeding, border edging, and plant health restoration.',
    highlights: [
      'Lawn care & maintenance',
      'Garden maintenance',
      'Gardening services',
      'Commercial grounds upkeep',
    ],
    featured: true,
  },
];

export const ALL_SERVICES: ServiceItem[] = [
  {
    id: 'compound-designing',
    name: 'Compound Designing',
    category: 'design',
    summary: 'Complete residential & commercial compound spatial planning.',
  },
  {
    id: 'custom-landscape-design',
    name: 'Custom Landscape Design',
    category: 'design',
    summary: 'Tailored planting, seating, and circulation plans for your plot.',
  },
  {
    id: 'landscape-architecture',
    name: 'Landscape Architecture Services',
    category: 'design',
    summary: 'Site grading, drainage planning, and architectural outdoor layouts.',
  },
  {
    id: 'landscape-design-construction',
    name: 'Landscape Design Construction',
    category: 'design',
    summary: 'End-to-end execution from excavation to final finishing.',
  },
  {
    id: 'garden-design',
    name: 'Garden Design',
    category: 'design',
    summary: 'Layered flower beds, shaded retreats, and courtyard gardens.',
  },
  {
    id: 'outdoor-landscaping',
    name: 'Outdoor Landscaping',
    category: 'design',
    summary: 'Full exterior transformation for homes, apartments, and hospitality.',
  },
  {
    id: 'pavers-installation',
    name: 'Pavers (Paving & Block) Installation',
    category: 'hardscaping',
    summary: 'Interlocking chevron, herringbone, and stone paver laying.',
  },
  {
    id: 'driveway-paving',
    name: 'Driveway or Path Paving',
    category: 'hardscaping',
    summary: 'Heavy-duty driveway surfaces and pedestrian garden walkways.',
  },
  {
    id: 'driveway-landscaping',
    name: 'Driveway Landscaping',
    category: 'hardscaping',
    summary: 'Curved kerbs, greenery framing, and entrance gate borders.',
  },
  {
    id: 'outdoor-steps',
    name: 'Outdoor Step Construction',
    category: 'hardscaping',
    summary: 'Sloped plot stairways, stone risers, and terrace transitions.',
  },
  {
    id: 'path-landscaping',
    name: 'Path Landscaping',
    category: 'hardscaping',
    summary: 'Stepping-stone trails set neatly across lush grass.',
  },
  {
    id: 'hardscaping',
    name: 'Hardscaping',
    category: 'hardscaping',
    summary: 'Retaining walls, stone edging, firepit patios, and drainage kerbs.',
  },
  {
    id: 'rock-garden-design',
    name: 'Rock Garden Design',
    category: 'planting',
    summary: 'River pebbles, sculptural boulders, succulents, and focal urns.',
  },
  {
    id: 'lawn-installation',
    name: 'Lawn Installation & Grass Planting',
    category: 'planting',
    summary: 'Soil leveling, topsoil enrichment, and dense green grass turfing.',
  },
  {
    id: 'flowers-planting',
    name: 'Flowers Planting & Garden Decorating',
    category: 'planting',
    summary: 'Seasonal colour borders, bougainvillea, and terracotta planters.',
  },
  {
    id: 'tree-planting',
    name: 'Tree & Palm Planting',
    category: 'planting',
    summary: 'Shade canopies, royal palms, and privacy screening trees.',
  },
  {
    id: 'landscape-installations',
    name: 'Landscape Installations',
    category: 'planting',
    summary: 'Complete softscape installation for newly built properties.',
  },
  {
    id: 'indoor-outdoor-plants',
    name: 'Indoor & Outdoor Plants Supply',
    category: 'planting',
    summary: 'Curated potted plants for homes, offices, restaurants, and hotels.',
  },
  {
    id: 'lawn-maintenance',
    name: 'Lawn Care & Maintenance',
    category: 'maintenance',
    summary: 'Scheduled mowing, edging, aeration, and turf recovery.',
  },
  {
    id: 'garden-maintenance',
    name: 'Garden Maintenance & Gardening Services',
    category: 'maintenance',
    summary: 'Hedge trimming, pruning, mulching, and border upkeep.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'courtyard-patio',
    title: 'Flagstone Firepit Courtyard & Tropical Borders',
    category: 'compounds',
    categoryLabel: 'Compound & Lawns',
    location: 'Kampala Residence',
    image: assetUrl('assets/aistudio/image_9265b7f5.png'),
    aspectClass: 'aspect-[16/10]',
    scope:
      'Custom stone-slab walkways integrated directly into lush manicured lawn, framed by red cordyline, crotons, white border blooms, and a curved seating patio.',
    servicesUsed: ['Compound Designing', 'Hardscaping', 'Lawn Installation & Grass Planting'],
  },
  {
    id: 'curved-driveway',
    title: 'Curved Stone-Edged Driveway & Palm Canopy',
    category: 'compounds',
    categoryLabel: 'Compound & Lawns',
    location: 'Residential Estate, Kampala',
    image: assetUrl('assets/aistudio/image_4df9bccf.png'),
    aspectClass: 'aspect-[4/3]',
    scope:
      'Sweeping driveway kerb edging paired with manicured turf, layered purple phormium, silver groundcover, and mature palm specimens along the entry drive.',
    servicesUsed: ['Driveway Landscaping', 'Tree & Palm Planting', 'Flowers Planting & Garden Decorating'],
  },
  {
    id: 'chevron-pavers',
    title: 'Two-Tone Chevron Interlocking Paver Laying',
    category: 'pavers',
    categoryLabel: 'Pavers & Steps',
    location: 'Kampala Compound Project',
    image: assetUrl('assets/aistudio/image_8ea8d23d.png'),
    aspectClass: 'aspect-[4/3]',
    scope:
      'Precision compacted sand bed and custom charcoal-and-silver interlocking chevron paver installation connecting exterior staircase and raised patio steps.',
    servicesUsed: ['Pavers (Paving & Block) Installation', 'Outdoor Step Construction', 'Driveway or Path Paving'],
  },
  {
    id: 'rockery-urn',
    title: 'Terracotta Urn & Succulent Rockery Feature',
    category: 'rockery',
    categoryLabel: 'Rock & Courtyard Gardens',
    location: 'Garden Courtyard, Kampala',
    image: assetUrl('assets/aistudio/image_1def463e.png'),
    aspectClass: 'aspect-[4/3]',
    scope:
      'Hand-arranged natural stone rockery filled with river pebbles, echeveria rosettes, barrel cacti, and a crimson bougainvillea centerpiece beside stepping-stone grass.',
    servicesUsed: ['Rock Garden Design', 'Path Landscaping', 'Flowers Planting & Garden Decorating'],
  },
  {
    id: 'commercial-courtyard',
    title: 'Commercial Courtyard Hedges & Royal Palms',
    category: 'rockery',
    categoryLabel: 'Rock & Courtyard Gardens',
    location: 'Kampala Commercial Complex',
    image: assetUrl('assets/aistudio/image_11315723.png'),
    aspectClass: 'aspect-[4/3]',
    scope:
      'Structured courtyard planting with clipped perimeter hedges, interlocking grey courtyard pavers, and spaced palm trees designed for clean foot-traffic flow.',
    servicesUsed: ['Landscape Architecture Services', 'Pavers (Paving & Block) Installation', 'Garden Maintenance & Gardening Services'],
  },
  {
    id: 'gatehouse-border',
    title: 'Entry Gate Botanical Border & Lawn Strip',
    category: 'compounds',
    categoryLabel: 'Compound & Lawns',
    location: 'Kampala Villa Gate',
    image: assetUrl('assets/aistudio/image_b76b4eea.png'),
    aspectClass: 'aspect-[3/4]',
    scope:
      'High-impact gate arrival strip combining multi-tier foliage texture, deep green turf, and crisp stone edging along the entry curve.',
    servicesUsed: ['Custom Landscape Design', 'Garden Design', 'Lawn Care & Maintenance'],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'loy-gamisha',
    author: 'Loy Gamisha',
    meta: 'Verified Google Review · Reasonable price',
    timeAgo: '1 month ago',
    rating: 5,
    servicesTag: 'Compound designing, Landscaping & Garden designing',
    quote:
      'Greenscape Uganda they did our compound designing, landscaping and garden designing professionally. Thanks for excellent work, people trust the service of GreenScape Uganda.',
    ownerReply: 'Thanks for your kind words, we look forward to working with you again.',
    ownerReplyTime: '1 month ago',
  },
  {
    id: 'kamara-lawrence',
    author: 'Kamara Lawrence',
    meta: 'Verified Google Review · Great price',
    timeAgo: '3 months ago',
    rating: 5,
    servicesTag: 'Compound Designing',
    quote:
      'Thank you for your work, I like the way you design my compound. Excellent work, GreenScape Uganda.',
    ownerReply:
      'Thank you so much! We are thrilled you loved our work. It was a pleasure bringing your garden to life — Team GreenScape Uganda.',
    ownerReplyTime: '2 months ago',
  },
  {
    id: 'moses-mutale',
    author: 'Moses Mutale',
    meta: 'Verified Google Review · Photo Contributor',
    timeAgo: '3 months ago',
    rating: 5,
    servicesTag: 'Landscape installations · Garden decorating',
    quote: 'Thanks for excellent work, GreenScape Uganda.',
    ownerReply:
      'Thank you for your kind words! We appreciate your support and are glad you are happy with our landscaping services.',
    ownerReplyTime: '3 months ago',
  },
  {
    id: 'ndema-patrick',
    author: 'Ndema Patrick',
    meta: 'Verified Google Review · Great price',
    timeAgo: '3 months ago',
    rating: 5,
    quote: 'Excellent service.',
    ownerReply:
      'Thank you for kind words and trusting GreenScape Uganda to bring your garden alive.',
    ownerReplyTime: '1 month ago',
  },
];

export const SOCIAL_UPDATES: SocialPostItem[] = [
  {
    id: 'indoor-plants',
    title: 'Indoor Plants Now In Stock',
    excerpt:
      'Healthy indoor plants suitable for homes, offices, restaurants, and hotels available directly at our Old Port Bell Road store.',
    timeAgo: '4 days ago',
    channel: 'Instagram · @greenscapeuganda',
  },
  {
    id: 'outdoor-transform',
    title: 'Full Compound Design, Lawns & Paving',
    excerpt:
      'From bare soil to crisp interlocking pavers, manicured grass installation, and custom garden layouts across Kampala.',
    timeAgo: '1 week ago',
    channel: 'Instagram · @greenscapeuganda',
  },
  {
    id: 'design-create-maintain',
    title: 'Always We Design, Create & Maintain',
    excerpt:
      'Ongoing garden maintenance, hedge shaping, and plant supply tailored for Kampala residential compounds and commercial properties.',
    timeAgo: '3 weeks ago',
    channel: 'Instagram · @greenscapeuganda',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'pricing-structure',
    category: 'pricing',
    categoryLabel: 'Pricing & Quotes',
    question: 'How do you price compound designing, paver laying, and landscaping?',
    answer:
      'Every quotation is itemized based on exact compound measurements (square meters), ground leveling requirements, paver style, topsoil volume, and plant or turf selection. Following a site visit, we provide a transparent written breakdown so you know material and labor costs upfront with no hidden charges.',
  },
  {
    id: 'phased-budget',
    category: 'pricing',
    categoryLabel: 'Pricing & Quotes',
    question: 'Can we complete our compound project in phases to fit a budget?',
    answer:
      'Yes. Many Kampala homeowners start with essential hardscaping—such as driveway paving, drainage kerbs, and exterior steps—and follow up in phase two with lawn installation, rock gardens, and border planting. We design the full master layout so every phase connects cleanly.',
  },
  {
    id: 'project-timelines',
    category: 'timelines',
    categoryLabel: 'Project Timelines',
    question: 'How long does a typical landscaping or paving project take?',
    answer:
      'A focused rock garden, flower border, or courtyard planting typically takes 2 to 4 days. Driveway and compound interlocking paver installations run 5 to 12 days depending on total area and sub-base preparation, while full compound design-and-build transformations generally complete within 2 to 4 weeks.',
  },
  {
    id: 'kampala-rain-drainage',
    category: 'timelines',
    categoryLabel: 'Project Timelines',
    question: 'How do you handle Kampala rains and sloped plots during installation?',
    answer:
      'Before laying a single paver or turf square, our team grades the compound for proper water runoff, compacts a crushed aggregate and river-sand bed beneath interlocking blocks, and builds retaining kerbs or outdoor steps where slopes require stability—preventing sinking or waterlogging.',
  },
  {
    id: 'new-lawn-care',
    category: 'plant-care',
    categoryLabel: 'Plant Care',
    question: 'How should I care for newly planted grass lawns and flower borders?',
    answer:
      'Water newly laid grass deeply once daily (early morning or late afternoon) for the first 14 to 21 days until the roots anchor into the enriched topsoil. Avoid heavy foot traffic during rooting, wait until the grass reaches about 6 cm before its first light mow, and never scalp the turf too short.',
  },
  {
    id: 'indoor-outdoor-care',
    category: 'plant-care',
    categoryLabel: 'Plant Care',
    question: 'Do indoor plants from your Old Port Bell Road store come with care support?',
    answer:
      'Yes. When you buy indoor or outdoor plants for your home, office, restaurant, or hotel, we match species to your exact lighting conditions and provide clear watering and feeding instructions. We also offer scheduled weekly or bi-weekly garden and lawn maintenance visits across Kampala.',
  },
];
