export interface ReelSlide {
  id: string;
  order: number;
  title: string;
  category?: string;
  url: string;
  image: string;
  section: "about" | "services";
}

export const reelSlides: ReelSlide[] = [
  // ABOUT slides: orders 1-4
  {
    order: 1,
    id: "about-1",
    title: "Monarch Meta Ads Engine",
    category: "Performance Acquisition",
    url: "#",
    image: "/reel/about-1.webp",
    section: "about",
  },
  {
    order: 2,
    id: "about-2",
    title: "Spektral 60FPS Web System",
    category: "Web Engineering",
    url: "#",
    image: "/reel/about-2.webp",
    section: "about",
  },
  {
    order: 3,
    id: "about-3",
    title: "Owari Viral SMM Loops",
    category: "Organic Distribution",
    url: "#",
    image: "/reel/about-3.webp",
    section: "about",
  },
  {
    order: 4,
    id: "about-4",
    title: "Trading Analytics Architecture",
    category: "Data & Attribution",
    url: "#",
    image: "/reel/about-4.webp",
    section: "about",
  },

  // SERVICES slides: orders 5-8  (Add Services images here)
  {
    order: 5,
    id: "service-meta",
    title: "Algorithmic Meta Ads Suite",
    category: "Meta Ads",
    url: "#",
    image: "/reel/service-meta.webp",
    section: "services",
  },
  {
    order: 6,
    id: "service-smm",
    title: "Omnichannel Viral Growth Engine",
    category: "Social Media Marketing",
    url: "#",
    image: "/reel/service-smm.webp",
    section: "services",
  },
  {
    order: 7,
    id: "service-webdev",
    title: "60 FPS Interactive Digital Systems",
    category: "Website Development",
    url: "#",
    image: "/reel/service-webdev.webp",
    section: "services",
  },
  {
    order: 8,
    id: "service-attribution",
    title: "Conversion API & Funnel Scaling",
    category: "Meta Ads",
    url: "#",
    image: "/reel/service-attribution.webp",
    section: "services",
  },
];
