const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve(__dirname, '../travinno-data.json');

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

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: 'Alexander Mercer',
    company: 'Mercer Estates',
    location: 'London, UK',
    rating: 5,
    text: 'Travinno orchestrated our corporate retreat in Dubai flawlessly. The level of detail, selection of hotels, and ground handling exceeded all our expectations.'
  },
  {
    id: 2,
    name: 'Sophia Lorenza',
    company: 'Aura Creative',
    location: 'Milan, Italy',
    rating: 5,
    text: 'The custom Vietnam route they designed for our VIP clients was spectacular. Their local expertise and responsiveness are unmatched in B2B travel.'
  },
  {
    id: 3,
    name: 'David K. Vance',
    company: 'Vance & Co.',
    location: 'New York, USA',
    rating: 5,
    text: 'We have partnered with Travinno for over three years. Their destination representation and contracting rates in Thailand have significantly boosted our margins.'
  }
];

const INITIAL_LOGOS = Array.from({ length: 52 }, (_, i) => `partners/partner-${i + 1}.webp`);

const INITIAL_APPLICATIONS = [
  {
    id: 'app_1',
    jobTitle: 'Senior Travel Consultant',
    fullName: 'Jasmine Lee',
    email: 'jasmine.lee@luxuryconsult.com',
    phone: '+971 4 575 6105',
    coverLetter: 'I have 6 years of boutique luxury travel consulting experience in the Middle East. I would love to join the dynamic Travinno team in Dubai!',
    fileName: 'jasmine_resume.pdf',
    date: 'June 30, 2026'
  }
];

function ensureAllCollections() {
  let data = {};
  if (fs.existsSync(dataFilePath)) {
    try {
      data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } catch (e) {
      console.error('Error reading travinno-data.json:', e);
    }
  }

  let added = [];
  if (!data.travinno_blogs) { data.travinno_blogs = INITIAL_BLOGS; added.push('travinno_blogs'); }
  if (!data.travinno_careers) { data.travinno_careers = INITIAL_JOBS; added.push('travinno_careers'); }
  if (!data.travinno_testimonials) { data.travinno_testimonials = INITIAL_TESTIMONIALS; added.push('travinno_testimonials'); }
  if (!data.travinno_logos) { data.travinno_logos = INITIAL_LOGOS; added.push('travinno_logos'); }
  if (!data.travinno_applications) { data.travinno_applications = INITIAL_APPLICATIONS; added.push('travinno_applications'); }

  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`[OK] travinno-data.json verified. Total collections: ${Object.keys(data).length}`);
  if (added.length > 0) {
    console.log(`[+] Added default values for: ${added.join(', ')}`);
  }
  return data;
}

if (require.main === module) {
  ensureAllCollections();
}

module.exports = { ensureAllCollections };
