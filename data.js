// ============================================================
// NGO-ID #WB303 — AashaDaan Foundation — Seed Data
// ============================================================

const CAMPAIGNS = [
    {
        id: 'c1',
        title: 'Rural School Initiative',
        description: 'Building modern classrooms and providing quality education to 500+ children in remote villages of Uttar Pradesh.',
        category: 'Education',
        status: 'active',
        goal: 500000,
        raised: 320000,
        image: 'linear-gradient(135deg, #38bdf8, #818cf8)',
        donors: 148,
        daysLeft: 45
    },
    {
        id: 'c2',
        title: 'Clean Water Project',
        description: 'Installing water purification systems in 15 villages to provide safe drinking water to over 10,000 people.',
        category: 'Health',
        status: 'urgent',
        goal: 800000,
        raised: 195000,
        image: 'linear-gradient(135deg, #06b6d4, #34d399)',
        donors: 87,
        daysLeft: 12
    },
    {
        id: 'c3',
        title: "Women's Skill Workshop",
        description: 'Empowering 200 women with tailoring, handicraft, and digital literacy skills for financial independence.',
        category: 'Women Empowerment',
        status: 'active',
        goal: 300000,
        raised: 275000,
        image: 'linear-gradient(135deg, #f472b6, #c084fc)',
        donors: 203,
        daysLeft: 20
    },
    {
        id: 'c4',
        title: 'Green Earth Drive',
        description: 'Planting 10,000 native trees across barren lands and creating community-managed green zones.',
        category: 'Environment',
        status: 'active',
        goal: 250000,
        raised: 180000,
        image: 'linear-gradient(135deg, #34d399, #a3e635)',
        donors: 312,
        daysLeft: 60
    },
    {
        id: 'c5',
        title: 'Medical Camp Outreach',
        description: 'Organizing free health checkup camps in underserved areas covering eye, dental, and general health screenings.',
        category: 'Health',
        status: 'completed',
        goal: 400000,
        raised: 400000,
        image: 'linear-gradient(135deg, #fb923c, #f472b6)',
        donors: 256,
        daysLeft: 0
    },
    {
        id: 'c6',
        title: 'Digital Literacy Program',
        description: 'Teaching basic computer skills, internet safety, and coding fundamentals to 300 rural youth.',
        category: 'Education',
        status: 'active',
        goal: 350000,
        raised: 120000,
        image: 'linear-gradient(135deg, #818cf8, #38bdf8)',
        donors: 95,
        daysLeft: 75
    }
];

const DONATION_PRESETS = [
    { amount: 100,  label: 'Feeds a family for a day',         icon: '🍲' },
    { amount: 500,  label: 'School supplies for 5 kids',       icon: '📚' },
    { amount: 1000, label: 'Funds a medical checkup camp',     icon: '🏥' },
    { amount: 5000, label: 'Builds a classroom wall',          icon: '🏗️' }
];

const RESOURCE_CATEGORIES = [
    { id: 'clothes',  label: 'Clothes',         icon: '👕', unit: 'pieces' },
    { id: 'food',     label: 'Food Packets',    icon: '🥫', unit: 'packets' },
    { id: 'books',    label: 'Books',           icon: '📖', unit: 'copies' },
    { id: 'medical',  label: 'Medical Kits',    icon: '💊', unit: 'kits' },
    { id: 'toys',     label: 'Toys & Games',    icon: '🧸', unit: 'items' }
];

const STORIES = [
    {
        id: 's1',
        title: 'From Darkness to Light',
        subtitle: "Ravi's Education Journey",
        narrative: 'Ravi, a 12-year-old from a remote village in Bihar, walked 8 km every day to reach the nearest school. With AashaDaan\'s Rural School Initiative, a new school was built just 1 km from his village. Today, Ravi dreams of becoming an engineer.',
        quote: '"I never thought I could study in a real classroom with a real blackboard. Now I have a computer too!"',
        quotee: '— Ravi Kumar, Student',
        stats: [
            { label: 'Students Educated', value: 520 },
            { label: 'Schools Built', value: 3 },
            { label: 'Invested', value: '₹15L' }
        ],
        gradient: 'linear-gradient(135deg, #fb923c, #f472b6)',
        bgAccent: '#fb923c'
    },
    {
        id: 's2',
        title: 'Water is Life',
        subtitle: 'Sundarpur Village Transformation',
        narrative: 'The women of Sundarpur used to walk 3 hours daily to fetch water from a distant well. After AashaDaan installed a solar-powered purification plant, the village now has 24/7 access to clean drinking water. Waterborne diseases dropped by 80%.',
        quote: '"My children no longer fall sick every monsoon. This water plant changed our lives forever."',
        quotee: '— Geeta Devi, Village Elder',
        stats: [
            { label: 'People Served', value: 10200 },
            { label: 'Villages Covered', value: 8 },
            { label: 'Disease Reduction', value: '80%' }
        ],
        gradient: 'linear-gradient(135deg, #06b6d4, #34d399)',
        bgAccent: '#06b6d4'
    },
    {
        id: 's3',
        title: 'Stitching a New Future',
        subtitle: "Women's Empowerment in Action",
        narrative: 'Fatima was once dependent on daily wages. Through AashaDaan\'s Women\'s Skill Workshop, she learned tailoring and now runs her own boutique. She employs 4 other women from her neighbourhood and earns 5x her previous income.',
        quote: '"I went from stitching torn clothes to designing bridal wear. AashaDaan gave me wings."',
        quotee: '— Fatima Sheikh, Entrepreneur',
        stats: [
            { label: 'Women Trained', value: 200 },
            { label: 'Businesses Started', value: 45 },
            { label: 'Income Growth', value: '5x' }
        ],
        gradient: 'linear-gradient(135deg, #c084fc, #f472b6)',
        bgAccent: '#c084fc'
    }
];

const IMPACT_DATA = {
    kpis: [
        { label: 'Lives Impacted',    value: 50000,  icon: '❤️',  gradient: 'linear-gradient(135deg, #f472b6, #fb923c)', prefix: '', suffix: '+' },
        { label: 'Meals Served',      value: 120000, icon: '🍲',  gradient: 'linear-gradient(135deg, #fb923c, #fbbf24)', prefix: '', suffix: ''  },
        { label: 'Trees Planted',     value: 15000,  icon: '🌳',  gradient: 'linear-gradient(135deg, #34d399, #a3e635)', prefix: '', suffix: ''  },
        { label: 'Schools Built',     value: 25,     icon: '🏫',  gradient: 'linear-gradient(135deg, #38bdf8, #818cf8)', prefix: '', suffix: ''  },
        { label: 'Active Volunteers', value: 500,    icon: '🤝',  gradient: 'linear-gradient(135deg, #c084fc, #e879f9)', prefix: '', suffix: '+' }
    ],
    monthlyFunding: [
        { month: 'Jan', value: 4.2 },
        { month: 'Feb', value: 3.8 },
        { month: 'Mar', value: 5.1 },
        { month: 'Apr', value: 6.3 },
        { month: 'May', value: 5.7 },
        { month: 'Jun', value: 7.2 }
    ],
    fundAllocation: [
        { category: 'Education',          percent: 35, color: '#38bdf8' },
        { category: 'Health',             percent: 25, color: '#34d399' },
        { category: 'Environment',        percent: 20, color: '#a3e635' },
        { category: 'Women Empowerment',  percent: 15, color: '#c084fc' },
        { category: 'Emergency Relief',   percent: 5,  color: '#fb923c' }
    ],
    milestones: [
        { year: '2020', title: 'Founded AashaDaan', desc: 'Started with 5 volunteers and a dream to transform rural India.' },
        { year: '2021', title: 'First 1,000 Meals Served', desc: 'Launched community kitchen program during COVID-19 lockdown.' },
        { year: '2022', title: '5,000 Trees Planted', desc: 'Green Earth Drive completed its first phase across 3 districts.' },
        { year: '2023', title: '10 Schools Built', desc: 'Rural School Initiative reaches double-digit milestone.' },
        { year: '2024', title: '50,000 Lives Touched', desc: 'AashaDaan expands to 5 states with 500+ active volunteers.' }
    ]
};

const VOLUNTEER_INTERESTS = [
    { id: 'teaching',      label: 'Teaching',          icon: '📚' },
    { id: 'medical',       label: 'Medical Aid',       icon: '🩺' },
    { id: 'environment',   label: 'Environmental',     icon: '🌿' },
    { id: 'tech',          label: 'Tech Support',      icon: '💻' },
    { id: 'food',          label: 'Food Distribution', icon: '🍱' },
    { id: 'counseling',    label: 'Counseling',        icon: '🤝' }
];

const RECENT_DONATIONS_SEED = [
    { name: 'Arjun K.',     amount: 500,  campaign: 'Rural School Initiative', time: '2 mins ago' },
    { name: 'Priya S.',     amount: 1000, campaign: 'Clean Water Project',     time: '5 mins ago' },
    { name: 'Rahul M.',     amount: 5000, campaign: "Women's Skill Workshop",  time: '12 mins ago' },
    { name: 'Anonymous',    amount: 100,  campaign: 'Green Earth Drive',       time: '18 mins ago' },
    { name: 'Sneha D.',     amount: 2000, campaign: 'Medical Camp Outreach',   time: '25 mins ago' }
];
