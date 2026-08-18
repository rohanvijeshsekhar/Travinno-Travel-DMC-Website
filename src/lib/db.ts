// Database Manager for Travinno CMS (Client-side adapter for Next.js SSR)
// Manages CRUD actions on localStorage/sessionCache and synchronizes with Next.js api routes.

const INITIAL_DESTINATIONS = [
  {
    id: 'dubai',
    name: 'Dubai',
    region: 'Middle East',
    tagline: 'Futuristic architectural marvels meet ancient desert sands.',
    image: 'images/destinations/dubai.webp',
    description: 'Dubai stands as a monumental oasis of modern ambition and timeless allure, where futuristic architectural marvels rise dramatically from the golden sands of the Arabian Desert. Beyond the gleaming glass towers and ultra-luxury shopping domains lies a destination of rich cultural contrasts—from heritage souks and traditional dhows sailing the historic creek to private yacht charters along the modern marina. Visitors can transition seamlessly from the dynamic energy of world-class Michelin-starred dining to the absolute stillness of a private luxury conservation camp nestled deep within the desert dunes under a canopy of stars.',
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'kenya',
    name: 'Kenya',
    region: 'East Africa',
    tagline: 'Witness the majesty of the great wilderness.',
    image: 'images/destinations/kenya.webp',
    description: 'Kenya is the cradle of the wild, an untamed land of sweeping savannahs, ancient acacia trees, and dramatic volcanic landscapes that capture the raw essence of East Africa. It is a sanctuary where the rhythm of life is dictated by the great migration, and where the air is filled with the calls of the wild at daybreak. From eco-luxury tented camps situated along private conservancies to personalized hot air balloon safaris over the Maasai Mara, Kenya offers an intimate, slow-paced journey into nature, guided by Maasai warriors who share their deep ancestral knowledge and heritage.',
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'bali',
    name: 'Bali',
    region: 'Southeast Asia',
    tagline: 'Immersive spiritual rituals in tropical sanctuaries.',
    image: 'images/destinations/bali.webp',
    description: 'Bali is a spiritual sanctuary where deep-rooted Hindu traditions blend seamlessly with tropical volcanic peaks, sacred rivers, and pristine coastal shores. Known as the Island of the Gods, it is a landscape carpeted in emerald-green rice terraces and dotted with stone temples shrouded in morning mist. Visitors are invited to immerse themselves in purification rituals at holy springs, walk through rainforest canopies in Ubud, and stay in magnificent private pool villas that overlook deep river gorges, offering a profound sense of peace, healing, and cultural discovery.',
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'thailand',
    name: 'Thailand',
    region: 'Southeast Asia',
    tagline: 'Sailing emerald coves and tasting vibrant cultures.',
    image: 'images/destinations/thailand.webp',
    description: 'Thailand is a sensory marvel of gold-leaf temples, bustling night markets, and pristine archipelagos rising from clear turquoise waters. From the historic capital of Bangkok to the secluded white-sand shores of Koh Samui, the kingdom offers an extraordinary balance of high-end indulgence and authentic heritage. Private catamaran charters navigate the limestone karsts of Phang Nga Bay, while custom cooking masterclasses with master chefs reveal the intricate balance of sweet, sour, salty, and spicy flavors that define the country’s revered culinary tradition.',
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'singapore',
    name: 'Singapore',
    region: 'Southeast Asia',
    tagline: 'Exploring biophilic skyscrapers and smart architecture.',
    image: 'images/destinations/singapore.webp',
    description: 'Singapore is a futuristic biophilic metropolis where steel-and-glass skyscrapers are enveloped in vertical gardens and sprawling rain forests. This island city-state is a global hub of innovation, culinary excellence, and rich multi-cultural heritage, seamlessly linking historical shophouses with high-altitude rooftop lounges. From after-hours tours of the iconic Gardens by the Bay domes to bespoke heritage walking trails through historic districts, Singapore offers a refined, hyper-modern urban experience unlike any other.',
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    region: 'Southeast Asia',
    tagline: 'Intimate tea rituals and dynamic culinary paths.',
    image: 'images/destinations/vietnam.webp',
    description: 'Vietnam is a country of quiet elegance and spectacular natural beauty, defined by misty mountain peaks, emerald rice paddies, and thousands of towering limestone islands in Halong Bay. Its rich history is woven into the fabric of lantern-lit ancient trading towns and imperial cities, where traditional tea ceremonies offer a window into a graceful heritage. The country’s cuisine is a masterclass in fresh herbs and delicate balance, offering sophisticated travelers an authentic, multi-layered journey through time and culture.',
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    region: 'Southeast Asia',
    tagline: 'Ancient rainforests meet dynamic culture.',
    image: 'images/destinations/malaysia.webp',
    description: 'Malaysia is a vibrant tapestry of prehistoric tropical rainforests, colonial heritage towns, and hyper-modern skylines that reflect a diverse multi-cultural identity. From the towering spires of Kuala Lumpur to the pristine, ancient jungles of Taman Negara, it is a destination where nature and cosmopolitan sophistication exist side-by-side. Guests can explore the culinary streets and rich Peranakan history of Penang, charter a private helicopter to the pristine beaches of Langkawi, or walk along night-canopy suspension bridges in the heart of the world\'s oldest jungle.',
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  }
];

const INITIAL_BLOGS = [
  {
    id: 1,
    title: 'The Art of Slow Travel in Kenya',
    category: 'Expeditions',
    readTime: '5 min read',
    date: 'June 28, 2026',
    image: 'images/destinations/kenya.webp',
    description: 'An editorial guide on experiencing the untamed beauty of East Africa at a refined, deliberate pace.',
    content: `<p class="article-lead">In a world dominated by instant gratification and rapid itineraries, slow travel emerges as a profound rebellion. To travel slowly through Kenya is to align oneself with the timeless rhythm of the savannah, where life is measured not by hours, but by the migration of herds and the setting of the equatorial sun.</p><h2>Redefining the Safari Experience</h2><p>Traditional safaris often feel like a race to check off the "Big Five" from a dashboard. Slow travel invites you to step out of the safari vehicle. On a walking safari through the Maasai Mara, accompanied by a local Maasai guide, the landscape transforms. You begin to notice the track of a leopard in the soft dust, the medicinal properties of the acacia tree, and the warning calls of the superb starling.</p><blockquote>"Slow travel is not about seeing everything; it is about feeling everything you see."</blockquote><h2>Conservation and Connection</h2><p>By staying in community-owned conservancies rather than crowded public reserves, travellers establish a direct, positive footprint. Here, luxury is defined by space, silence, and genuine human connection. An evening spent sharing stories around a campfire with local elders offers a depth of understanding that no museum could ever replicate.</p><h2>Practical Tips for Your Journey</h2><ul><li><strong>Spend at least four nights in one location:</strong> This allows you to unpack, relax, and establish a connection with the local guides and wildlife patterns.</li><li><strong>Embrace the midday lull:</strong> When the heat peaks and animals retreat to the shade, read, reflect, or simply listen to the hum of the wild.</li><li><strong>Choose low-impact lodges:</strong> Support retreats that run on solar energy, harvest rainwater, and actively employ local community members.</li></ul>`
  },
  {
    id: 2,
    title: 'Navigating the Sacred Sanctuaries of Bali',
    category: 'Culture',
    readTime: '6 min read',
    date: 'June 15, 2026',
    image: 'images/destinations/bali.webp',
    description: "Discovering the hidden water temples and spiritual heritage of Indonesia's most mystical island.",
    content: `<p class="article-lead">Bali is more than a tropical escape; it is a living, breathing tapestry of devotion. To truly navigate its sacred sanctuaries is to look past the beaches and dive deep into the cultural veins that keep this island spiritually alive.</p><h2>The Water Temples of Ubud</h2><p>At the heart of Balinese spiritual life is water. Tirta Empul, the famous water temple near Ubud, serves as a site for ritual purification. Visitors and locals alike step into the crystal-clear springs to wash away negative energies. Further north, the volcanic lake temples like Pura Ulun Danu Bratan seem to float on water, acting as guardians of the island's crucial irrigation networks.</p><blockquote>"In Bali, every temple is a bridge between the physical world and the sacred unseen."</blockquote><h2>Etiquette and Reverence</h2><p>When visiting Balinese temples, respect is paramount. Wearing a traditional sash and sarong is a basic sign of respect. But true reverence lies in your presence—moving quietly, avoiding stepping on offering baskets (canang sari) laid out on the ground, and honoring the daily ceremonies that take place.</p><h2>Hidden Gems Beyond the Crowds</h2><p>While temples like Uluwatu and Tanah Lot offer stunning sunsets, the true magic lies in the lesser-known sanctuaries. Nestled in the misty forests of Mount Batukaru, Pura Luhur Batukaru remains untouched by massive tourism, wrapped in dense foliage and silent devotion.</p>`
  },
  {
    id: 3,
    title: 'Vietnam’s Culinary Secrets: A Connoisseur’s Diary',
    category: 'Gastronomy',
    readTime: '8 min read',
    date: 'May 30, 2026',
    image: 'images/destinations/vietnam.webp',
    description: "An intimate journey through Kaiseki dining and the ancient tea ceremonies of Vietnam's cultural heart.",
    content: `<p class="article-lead">Vietnamese cuisine is a masterclass in balance. It is a sensory journey where sweet, sour, salty, bitter, and hot elements meet in perfect harmony. From the royal tables of Hue to the vibrant street food stalls of Hanoi, every bite tells a story of heritage and adaptation.</p><h2>The Royal Heritage of Hue</h2><p>In the former imperial capital of Hue, dining was historically elevated to an art form. Royal chefs created intricate, multi-course dishes designed to please the emperors. Today, this tradition lives on in delicate bites like banh beo (steamed rice cakes) and bun bo Hue (spicy beef noodle soup), where complex spice blends reflect a rich dynastic legacy.</p><blockquote>"A Vietnamese dish is a landscape painted in fresh herbs, rich broths, and delicate spices."</blockquote><h2>The Art of the Broth</h2><p>Nowhere is the dedication to culinary perfection more visible than in a bowl of Pho. A master broth takes upwards of twelve hours to simmer, drawing deep flavors from charred ginger, star anise, cinnamon, and roasted beef bones. It is a slow culinary craft that demands patience and absolute precision.</p><h2>Street Food Connoisseurship</h2><p>The true heart of Vietnamese gastronomy lies on the street. Pull up a tiny plastic stool on a Hanoian sidewalk, and order a bowl of Bun Cha—grilled pork belly served over cold rice noodles with fresh herbs and a tangy dipping sauce. It is simple, unpretentious, and gastronomically perfect.</p>`
  }
];

const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Senior Travel Consultant',
    location: 'Dubai, UAE',
    type: 'Full-Time',
    description: 'Help create premium leisure and corporate travel experiences for global clients.',
    status: 'Open'
  },
  {
    id: 2,
    title: 'Operations & Destination Coordinator',
    location: 'Cochin, India',
    type: 'Full-Time',
    description: 'Coordinate ground logistics, hotel contracts, and transit operations for luxury tours.',
    status: 'Open'
  },
  {
    id: 3,
    title: 'Luxury Travel Representative',
    location: 'Bangkok, Thailand',
    type: 'Contract',
    description: 'Deliver bespoke local guiding, transfer coordination, and VIP guest relations.',
    status: 'Open'
  },
  {
    id: 4,
    title: 'Digital Marketing Lead',
    location: 'London, UK',
    type: 'Full-Time',
    description: 'Direct digital brand strategies, campaigns, and audience growth across global luxury sectors.',
    status: 'Closed'
  }
];

const INITIAL_TEAM = [
  {
    id: 1,
    name: 'Prinu Santhappan',
    position: 'Managing Director',
    bio: 'With over two decades of experience in the travel and hospitality industry, I am proud to lead a team of passionate professionals who are united by a shared vision of excellence, innovation, and genuine customer satisfaction.\n\nOur journey has been defined by strong partnerships – built on trust, mutual growth, and a commitment to delivering exceptional value. We believe that success is not achieved alone; it is the result of meaningful collaborations with our clients, partners, and stakeholders.',
    signature: 'Prinu Santhappan',
    image: 'images/founder.webp',
    isLeader: true,
    order: 0
  },
  {
    id: 2,
    name: 'Geetha Biju',
    position: 'Sr. Manager (Finance)',
    image: 'images/specialist_1.webp',
    isLeader: false,
    order: 1
  },
  {
    id: 3,
    name: 'Manu Prasad',
    position: 'Head of Operations',
    image: 'images/specialist_2.webp',
    isLeader: false,
    order: 2
  },
  {
    id: 4,
    name: 'Anuraj VS',
    position: 'Business Development Head (India)',
    image: 'images/specialist_3.webp',
    isLeader: false,
    order: 3
  },
  {
    id: 5,
    name: 'Kavitha Prinu',
    position: 'Manager Sales (Group)',
    image: 'images/specialist_4.webp',
    isLeader: false,
    order: 4
  },
  {
    id: 6,
    name: 'Neethu Dilver',
    position: 'Manager FIT (Indian Operations)',
    image: 'images/specialist_5.webp',
    isLeader: false,
    order: 5
  },
  {
    id: 7,
    name: 'Sree Rekha M',
    position: 'Asst. Manager (Product & Contracting)',
    image: 'images/specialist_6.webp',
    isLeader: false,
    order: 6
  },
  {
    id: 8,
    name: 'Godson KJ',
    position: 'Asst. Manager - Groups',
    image: 'images/specialist_7.webp',
    isLeader: false,
    order: 7
  },
  {
    id: 9,
    name: 'Vishnu VB',
    position: 'Visa Department Head',
    image: 'images/specialist_8.webp',
    isLeader: false,
    order: 8
  },
  {
    id: 10,
    name: 'Violah Cherotich',
    position: 'Business Development Manager (Africa)',
    image: 'images/specialist_9.webp',
    isLeader: false,
    order: 9
  }
];

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: "Alexander Mercer",
    company: "Mercer Estates",
    location: "London, UK",
    rating: 5,
    text: "Travinno orchestrated our corporate retreat in Dubai flawlessly. The level of detail, selection of hotels, and ground handling exceeded all our expectations."
  },
  {
    id: 2,
    name: "Sophia Lorenza",
    company: "Aura Creative",
    location: "Milan, Italy",
    rating: 5,
    text: "The custom Vietnam route they designed for our VIP clients was spectacular. Their local expertise and responsiveness are unmatched in B2B travel."
  },
  {
    id: 3,
    name: "David K. Vance",
    company: "Vance & Co.",
    location: "New York, USA",
    rating: 5,
    text: "We have partnered with Travinno for over three years. Their destination representation and contracting rates in Thailand have significantly boosted our margins."
  }
];

const INITIAL_LOGOS = Array.from({ length: 52 }, (_, i) => `partners/partner-${i + 1}.webp`);



const INITIAL_INQUIRIES = [
  {
    id: 'inq_1',
    name: 'Robert Sterling',
    email: 'robert@sterlingtravels.co.uk',
    phone: '+44 7911 123456',
    agencyName: 'Sterling Luxury Travels',
    message: 'Hello, we are interested in setting up a preferred B2B partner contract for luxury custom packages across Singapore and Vietnam. Looking forward to your contracting rates.',
    date: 'July 01, 2026',
    read: false
  },
  {
    id: 'inq_2',
    name: 'Elena Rostova',
    email: 'elena@rostovavip.de',
    phone: '+49 170 9876543',
    agencyName: 'Rostova Elite Tours',
    message: 'Greetings! We have a high-net-worth family of 6 visiting Dubai in late December. We require a bespoke desert luxury camp buyout and private yacht charters. Please advise.',
    date: 'June 30, 2026',
    read: true
  }
];

const INITIAL_APPLICATIONS = [
  {
    id: 'app_1',
    jobTitle: 'Senior Travel Consultant',
    fullName: 'Jasmine Lee',
    email: 'jasmine.lee@luxuryconsult.com',
    phone: '+971 50 123 4567',
    coverLetter: 'I have 6 years of boutique luxury travel consulting experience in the Middle East. I would love to join the dynamic Travinno team in Dubai!',
    fileName: 'jasmine_resume.pdf',
    date: 'June 30, 2026'
  }
];

const INITIAL_ACTIVITIES = [
  { id: 'act_1', text: 'Database initialized with default collections', date: 'July 01, 2026 12:00 PM' },
  { id: 'act_2', text: 'Sample partner contract inquiry received from Sterling Luxury Travels', date: 'July 01, 2026 12:05 PM' }
];

const INITIAL_SEO = [
  { page: 'home', title: 'Travinno - Crafting Journeys, Creating Memories', description: 'Premium B2B travel partner contract for luxury custom packages, destination management, and leisure travel.' },
  { page: 'about', title: 'About Our Journey - Travinno', description: 'Explore the legacy, core purpose, and chronological journey of Travinno.' },
  { page: 'services', title: 'Luxury Travel Services & MICE - Travinno', description: 'Discover our premium destination services, corporate retreats, MICE coordination, and bespoke packages.' },
  { page: 'destinations', title: 'Luxury Destinations Showcase - Travinno', description: 'Discover futuristic cities, private deserts, and tropical archipelagos designed by Travinno specialists.' },
  { page: 'team', title: 'Our Executive Leadership & Travel Specialists - Travinno', description: 'Meet the passionate professionals and travel specialists behind Travinno.' },
  { page: 'testimonials', title: 'What Our B2B Partners Say - Travinno', description: 'Read client reviews and testimonials from our global B2B travel partners.' },
  { page: 'careers', title: 'Careers at Travinno - Join Our Team', description: 'Join the dynamic Travinno team. Apply for premium travel and operations positions around the globe.' },
  { page: 'blog', title: 'Travel Journal & Insights - Travinno', description: 'Read the latest travel tips, destinations guides, and B2B hospitality insights by Travinno editors.' },
  { page: 'contact', title: 'Contact Us - Travinno Partner Onboarding', description: 'Reach out to establish a B2B partner contract or make custom travel inquiries with Travinno.' }
];

// Helper to broadcast state changes to active components
const broadcastChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('travinno-db-update'));
  }
};

const API_BASE = '/demo';

// 2. Database Core Interface (synchronized with Next.js server actions / API routes)
export const db = {
  apiBase: API_BASE,
  serverActive: false,
  collections: {
    'travinno_destinations': INITIAL_DESTINATIONS,
    'travinno_blogs': INITIAL_BLOGS,
    'travinno_careers': INITIAL_JOBS,
    'travinno_team': INITIAL_TEAM,
    'travinno_testimonials': INITIAL_TESTIMONIALS,
    'travinno_logos': INITIAL_LOGOS,

    'travinno_inquiries': INITIAL_INQUIRIES,
    'travinno_applications': INITIAL_APPLICATIONS,
    'travinno_activities': INITIAL_ACTIVITIES,
    'travinno_seo': INITIAL_SEO
  } as Record<string, any[]>,
  initialized: false,
  initPromise: null as Promise<void> | null,
  // When true, SSR already populated db.collections with the latest server data.
  // db.init() will skip the client-side network fetch entirely.
  ssrHydrated: false,

  // ── Session cache helpers (write-only after MySQL fetch) ──────────────────
  _SS_PREFIX: 'tv_cache_',
  _ssGet(key: string) {
    if (typeof window === 'undefined') return null;
    try {
      const v = sessionStorage.getItem(this._SS_PREFIX + key);
      return v ? JSON.parse(v) : null;
    } catch(e) { return null; }
  },
  _ssSet(key: string, value: any) {
    if (typeof window === 'undefined') return;
    try { sessionStorage.setItem(this._SS_PREFIX + key, JSON.stringify(value)); } catch(e) {}
  },
  _ssClear() {
    if (typeof window === 'undefined') return;
    try {
      const keys = Object.keys(sessionStorage).filter(k => k.startsWith(this._SS_PREFIX));
      keys.forEach(k => sessionStorage.removeItem(k));
    } catch(e) {}
  },

  init() {
    if (this.initialized) return;
    this.initialized = true;

    // ── SSR Fast Path ─────────────────────────────────────────────────────────
    // DBHydrator sets ssrHydrated=true when the server already provided the
    // latest DB data via page.tsx → getCollections(). In that case we skip
    // both network round trips (ping + /api/collections) entirely.
    // serverActive is still set so that subsequent admin saves go to the API.
    if (this.ssrHydrated) {
      this.serverActive = true;
      broadcastChange();
      return;
    }

    // ── Fetch from API (used on admin, sub-pages, or when SSR is unavailable) ──
    this.initPromise = (async () => {
      if (typeof window === 'undefined') return;
      try {
        const pingRes = await fetch(`${API_BASE}/api/ping?t=${Date.now()}`).then(r => r.json()).catch(() => null);
        if (pingRes && pingRes.success) {
          console.log(`[db] Server active. Loading from API...`);
          this.serverActive = true;

          // Fetch all collections. Hard-fail on any network/HTTP error.
          const data = await fetch(`${API_BASE}/api/collections?t=${Date.now()}`).then(r => {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
          });

          this._ssClear();

          const collectionsToSync = [
            { key: 'travinno_destinations', defaultVal: INITIAL_DESTINATIONS },
            { key: 'travinno_blogs', defaultVal: INITIAL_BLOGS },
            { key: 'travinno_careers', defaultVal: INITIAL_JOBS },
            { key: 'travinno_team', defaultVal: INITIAL_TEAM },
            { key: 'travinno_testimonials', defaultVal: INITIAL_TESTIMONIALS },
            { key: 'travinno_logos', defaultVal: INITIAL_LOGOS },

            { key: 'travinno_inquiries', defaultVal: INITIAL_INQUIRIES },
            { key: 'travinno_applications', defaultVal: INITIAL_APPLICATIONS },
            { key: 'travinno_activities', defaultVal: INITIAL_ACTIVITIES },
            { key: 'travinno_seo', defaultVal: INITIAL_SEO }
          ];

          for (const item of collectionsToSync) {
            if (data[item.key] !== undefined && data[item.key] !== null) {
              this.collections[item.key] = data[item.key];
            } else {
              this.collections[item.key] = item.defaultVal;
            }
          }

          broadcastChange();
        } else {
          console.warn('[db] Server unreachable. Showing default data until server is ready.');
          this._loadDefaults();
        }
      } catch (e: any) {
        console.warn('[db] Fetch error. Showing default data.', e.message);
        this._loadDefaults();
      }
    })();
  },

  _loadDefaults() {
    const collectionsToSync = [
      { key: 'travinno_destinations', defaultVal: INITIAL_DESTINATIONS },
      { key: 'travinno_blogs', defaultVal: INITIAL_BLOGS },
      { key: 'travinno_careers', defaultVal: INITIAL_JOBS },
      { key: 'travinno_team', defaultVal: INITIAL_TEAM },
      { key: 'travinno_testimonials', defaultVal: INITIAL_TESTIMONIALS },
      { key: 'travinno_logos', defaultVal: INITIAL_LOGOS },

      { key: 'travinno_inquiries', defaultVal: INITIAL_INQUIRIES },
      { key: 'travinno_applications', defaultVal: INITIAL_APPLICATIONS },
      { key: 'travinno_activities', defaultVal: INITIAL_ACTIVITIES },
      { key: 'travinno_seo', defaultVal: INITIAL_SEO }
    ];
    collectionsToSync.forEach(item => { this.collections[item.key] = item.defaultVal; });
    broadcastChange();
  },



  getDestinations() {
    this.init();
    return this.collections['travinno_destinations'] || [];
  },
  getBlogs() {
    this.init();
    return this.collections['travinno_blogs'] || [];
  },
  getCareers() {
    this.init();
    return this.collections['travinno_careers'] || [];
  },
  getTeam() {
    this.init();
    return this.collections['travinno_team'] || [];
  },
  getTestimonials() {
    this.init();
    return this.collections['travinno_testimonials'] || [];
  },
  getLogos() {
    this.init();
    return this.collections['travinno_logos'] || [];
  },
  getInquiries() {
    this.init();
    return this.collections['travinno_inquiries'] || [];
  },
  getApplications() {
    this.init();
    return this.collections['travinno_applications'] || [];
  },
  getActivities() {
    this.init();
    return this.collections['travinno_activities'] || [];
  },

  // WRITE & LOG ACTIVITY
  logActivity(text: string) {
    const logs = this.getActivities();
    const newLog = { id: 'act_' + Date.now(), text, date: new Date().toLocaleString() };
    const updatedLogs = [newLog, ...logs].slice(0, 100);
    this.collections['travinno_activities'] = updatedLogs;
    this._ssSet('travinno_activities', updatedLogs);
    if (this.serverActive || process.env.NODE_ENV === 'production') {
      fetch(`${API_BASE}/api/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'travinno_activities', value: updatedLogs })
      }).catch(err => console.error('Error writing activity logs to server:', err));
    }
    broadcastChange();
  },

  // SAVE ALL
  saveDestinations(data: any[], activityMsg?: string) {
    this.collections['travinno_destinations'] = data;
    this._ssSet('travinno_destinations', data);
    if (this.serverActive || process.env.NODE_ENV === 'production') {
      fetch(`${API_BASE}/api/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'travinno_destinations', value: data })
      }).catch(err => console.error('Error writing destinations:', err));
    }
    if (activityMsg) this.logActivity(activityMsg);
    broadcastChange();
  },
  saveBlogs(data: any[], activityMsg?: string) {
    this.collections['travinno_blogs'] = data;
    this._ssSet('travinno_blogs', data);
    if (this.serverActive || process.env.NODE_ENV === 'production') {
      fetch(`${API_BASE}/api/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'travinno_blogs', value: data })
      }).catch(err => console.error('Error writing blogs:', err));
    }
    if (activityMsg) this.logActivity(activityMsg);
    broadcastChange();
  },
  saveCareers(data: any[], activityMsg?: string) {
    this.collections['travinno_careers'] = data;
    this._ssSet('travinno_careers', data);
    if (this.serverActive || process.env.NODE_ENV === 'production') {
      fetch(`${API_BASE}/api/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'travinno_careers', value: data })
      }).catch(err => console.error('Error writing careers:', err));
    }
    if (activityMsg) this.logActivity(activityMsg);
    broadcastChange();
  },
  saveTeam(data: any[], activityMsg?: string) {
    this.collections['travinno_team'] = data;
    this._ssSet('travinno_team', data);
    if (this.serverActive || process.env.NODE_ENV === 'production') {
      fetch(`${API_BASE}/api/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'travinno_team', value: data })
      }).catch(err => console.error('Error writing team:', err));
    }
    if (activityMsg) this.logActivity(activityMsg);
    broadcastChange();
  },
  saveTestimonials(data: any[], activityMsg?: string) {
    this.collections['travinno_testimonials'] = data;
    this._ssSet('travinno_testimonials', data);
    if (this.serverActive || process.env.NODE_ENV === 'production') {
      fetch(`${API_BASE}/api/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'travinno_testimonials', value: data })
      }).catch(err => console.error('Error writing testimonials:', err));
    }
    if (activityMsg) this.logActivity(activityMsg);
    broadcastChange();
  },
  saveLogos(data: any[], activityMsg?: string) {
    this.collections['travinno_logos'] = data;
    this._ssSet('travinno_logos', data);
    if (this.serverActive || process.env.NODE_ENV === 'production') {
      fetch(`${API_BASE}/api/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'travinno_logos', value: data })
      }).catch(err => console.error('Error writing logos:', err));
    }
    if (activityMsg) this.logActivity(activityMsg);
    broadcastChange();
  },
  saveInquiries(data: any[], activityMsg?: string) {
    this.collections['travinno_inquiries'] = data;
    this._ssSet('travinno_inquiries', data);
    if (this.serverActive || process.env.NODE_ENV === 'production') {
      fetch(`${API_BASE}/api/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'travinno_inquiries', value: data })
      }).catch(err => console.error('Error writing inquiries:', err));
    }
    if (activityMsg) this.logActivity(activityMsg);
    broadcastChange();
  },
  saveApplications(data: any[], activityMsg?: string) {
    this.collections['travinno_applications'] = data;
    this._ssSet('travinno_applications', data);
    if (this.serverActive || process.env.NODE_ENV === 'production') {
      fetch(`${API_BASE}/api/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'travinno_applications', value: data })
      }).catch(err => console.error('Error writing applications:', err));
    }
    if (activityMsg) this.logActivity(activityMsg);
    broadcastChange();
  },
  getSeo() {
    this.init();
    return this.collections['travinno_seo'] || [];
  },
  saveSeo(data: any[], activityMsg?: string) {
    this.collections['travinno_seo'] = data;
    this._ssSet('travinno_seo', data);
    if (this.serverActive || process.env.NODE_ENV === 'production') {
      fetch(`${API_BASE}/api/save`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'travinno_seo', value: data })
      }).catch(err => console.error('Error writing seo data:', err));
    }
    if (activityMsg) this.logActivity(activityMsg);
    broadcastChange();
  }
};

// Trigger background initialization client-side
if (typeof window !== 'undefined') {
  setTimeout(() => {
    db.init();
  }, 0);
}
