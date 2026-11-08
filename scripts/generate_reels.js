const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '../public/reel');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const slides = [
  {
    filename: 'about-1.webp',
    title: 'Monarch Meta Ads Engine',
    category: 'Performance Acquisition',
    metric: '4.8x ROAS',
    sub: 'Real-Time Algorithmic Bidding Matrix',
    accent: '#57957E'
  },
  {
    filename: 'about-2.webp',
    title: 'Spektral 60FPS Web System',
    category: 'Web Engineering',
    metric: '60 FPS WebGL',
    sub: 'Bespoke GPU Accelerated Interactive Frontend',
    accent: '#7ecba9'
  },
  {
    filename: 'about-3.webp',
    title: 'Owari Viral SMM Loops',
    category: 'Organic Distribution',
    metric: '14.2M Reach',
    sub: 'High-Retention Short Form Social Systems',
    accent: '#25D366'
  },
  {
    filename: 'about-4.webp',
    title: 'Trading Analytics Architecture',
    category: 'Data and Attribution',
    metric: '$25M+ Scaled',
    sub: 'First-Party High Frequency Attribution Dashboard',
    accent: '#00F0FF'
  },
  {
    filename: 'service-meta.webp',
    title: 'Algorithmic Meta Ads Suite',
    category: 'Meta Ads',
    metric: 'CAPI Active',
    sub: 'Automated Creative Testing and Predictive Budgeting',
    accent: '#57957E'
  },
  {
    filename: 'service-smm.webp',
    title: 'Omnichannel Viral Growth Engine',
    category: 'Social Media Marketing',
    metric: '98.4% Retention',
    sub: 'Multi-Platform Viral Distribution Engine',
    accent: '#dc2743'
  },
  {
    filename: 'service-webdev.webp',
    title: '60 FPS Interactive Digital Systems',
    category: 'Website Development',
    metric: '100 / 100 Perf',
    sub: 'Ultra-Fast Next.js and Lenis Smooth Architecture',
    accent: '#7ecba9'
  },
  {
    filename: 'service-attribution.webp',
    title: 'Conversion API and Funnel Scaling',
    category: 'Meta Ads',
    metric: '+312% Growth',
    sub: 'Enterprise Attribution Matrix and Funnel Optimization',
    accent: '#EA4335'
  }
];

async function generate() {
  for (const s of slides) {
    const svg = `
    <svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#141a18" />
          <stop offset="100%" stop-color="#070908" />
        </radialGradient>
        <linearGradient id="accGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${s.accent}" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="900" fill="url(#grad1)" />
      
      <!-- Grid Lines -->
      <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
        <line x1="80" y1="0" x2="80" y2="900" />
        <line x1="280" y1="0" x2="280" y2="900" />
        <line x1="600" y1="0" x2="600" y2="900" />
        <line x1="920" y1="0" x2="920" y2="900" />
        <line x1="1120" y1="0" x2="1120" y2="900" />
        <line x1="0" y1="160" x2="1200" y2="160" />
        <line x1="0" y1="450" x2="1200" y2="450" />
        <line x1="0" y1="740" x2="1200" y2="740" />
      </g>
      
      <!-- Top Bar Mockup Window -->
      <rect x="80" y="80" width="1040" height="740" rx="24" fill="#0c100e" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5" />
      <circle cx="120" cy="120" r="6" fill="#ff5f56" />
      <circle cx="140" cy="120" r="6" fill="#ffbd2e" />
      <circle cx="160" cy="120" r="6" fill="#27c93f" />
      
      <!-- Category Pill -->
      <rect x="195" y="105" width="230" height="30" rx="15" fill="${s.accent}" fill-opacity="0.15" stroke="${s.accent}" stroke-opacity="0.4" />
      <text x="310" y="125" fill="${s.accent}" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="2" text-anchor="middle">${s.category.toUpperCase()}</text>
      
      <!-- Main Metric Card -->
      <rect x="120" y="180" width="460" height="260" rx="20" fill="#141a17" stroke="#ffffff" stroke-opacity="0.08" />
      <text x="160" y="235" fill="#889892" font-family="system-ui, sans-serif" font-size="14" font-weight="600" letter-spacing="1.5">KEY PERFORMANCE INDICATOR</text>
      <text x="160" y="330" fill="url(#accGrad)" font-family="system-ui, sans-serif" font-size="64" font-weight="900">${s.metric}</text>
      <text x="160" y="380" fill="#a4b4ad" font-family="system-ui, sans-serif" font-size="16" font-weight="400">${s.sub}</text>
      
      <!-- Graph Lines Mockup -->
      <rect x="620" y="180" width="460" height="260" rx="20" fill="#141a17" stroke="#ffffff" stroke-opacity="0.08" />
      <polyline points="660,380 720,340 780,360 840,280 900,300 960,230 1020,250" fill="none" stroke="${s.accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="960" cy="230" r="6" fill="${s.accent}" stroke="#ffffff" stroke-width="2" />
      <text x="660" y="230" fill="#f2ede6" font-family="system-ui, sans-serif" font-size="18" font-weight="700">Live Telemetry Feed</text>
      <text x="660" y="260" fill="#758880" font-family="system-ui, sans-serif" font-size="13">Real-time low-latency synchronization</text>
      
      <!-- Big Project Title at Bottom -->
      <text x="120" y="520" fill="#ffffff" font-family="system-ui, sans-serif" font-size="38" font-weight="800" letter-spacing="-0.5">${s.title}</text>
      <text x="120" y="560" fill="#7d9188" font-family="system-ui, sans-serif" font-size="18" font-weight="400">Engineered by Musquen Media • Precision Digital Systems</text>
      
      <!-- Bottom Activity Bars -->
      <rect x="120" y="600" width="220" height="160" rx="16" fill="#111614" stroke="#ffffff" stroke-opacity="0.06" />
      <text x="140" y="640" fill="#7d9188" font-family="system-ui, sans-serif" font-size="12" font-weight="600">CONVERSION VELOCITY</text>
      <text x="140" y="690" fill="#f2ede6" font-family="system-ui, sans-serif" font-size="28" font-weight="800">+184%</text>
      <rect x="140" y="715" width="180" height="8" rx="4" fill="#202a24" />
      <rect x="140" y="715" width="140" height="8" rx="4" fill="${s.accent}" />

      <rect x="360" y="600" width="220" height="160" rx="16" fill="#111614" stroke="#ffffff" stroke-opacity="0.06" />
      <text x="380" y="640" fill="#7d9188" font-family="system-ui, sans-serif" font-size="12" font-weight="600">FRAME TIME</text>
      <text x="380" y="690" fill="#f2ede6" font-family="system-ui, sans-serif" font-size="28" font-weight="800">16.6 ms</text>
      <rect x="380" y="715" width="180" height="8" rx="4" fill="#202a24" />
      <rect x="380" y="715" width="170" height="8" rx="4" fill="${s.accent}" />

      <rect x="600" y="600" width="480" height="160" rx="16" fill="#111614" stroke="#ffffff" stroke-opacity="0.06" />
      <text x="630" y="640" fill="#7d9188" font-family="system-ui, sans-serif" font-size="12" font-weight="600">INFRASTRUCTURE STATUS</text>
      <circle cx="638" cy="680" r="5" fill="#27c93f" />
      <text x="655" y="685" fill="#f2ede6" font-family="system-ui, sans-serif" font-size="16" font-weight="700">All Nodes Operational • Zero Frame Drops</text>
      <text x="630" y="725" fill="#586c63" font-family="system-ui, sans-serif" font-size="13">Bespoke 60 FPS WebGL Texture &amp; Shader Pipeline</text>
    </svg>
    `;

    const outPath = path.join(outputDir, s.filename);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(outPath);
    console.log(`Generated: ${s.filename}`);
  }
}

generate().catch(console.error);
