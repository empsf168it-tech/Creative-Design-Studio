import capImg from './assets/images/valence_hero_cap.png';
import trenchImg from './assets/images/valence_trench_look.png';
import blazerImg from './assets/images/valence_blazer_look.png';

export type PageRoute = 'home' | 'about' | 'contact' | 'archive';

export interface GalleryItem {
  id: number;
  url: string;
  alt: string;
  title: string;
  category: 'Outerwear' | 'Tailoring' | 'Footwear' | 'Objects';
  price: string;
  description: string;
}

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 1,
    url: capImg,
    alt: "VALENCE Archival Cap Look 01",
    title: "VALENCE PIXEL ARCHIVE CAP",
    category: "Outerwear",
    price: "$340",
    description: "Heavyweight distressed canvas baseball cap with custom embroidered VALENCE pixel insignia."
  },
  {
    id: 2,
    url: trenchImg,
    alt: "VALENCE Structured Trench 02",
    title: "STRUCTURED TRENCH 02",
    category: "Outerwear",
    price: "$1,450",
    description: "Heavyweight bonded Japanese wool with asymmetrical storm flap and laser-etched VALENCE titanium hardware."
  },
  {
    id: 3,
    url: blazerImg,
    alt: "VALENCE Deconstructed Blazer 03",
    title: "DECONSTRUCTED BLAZER",
    category: "Tailoring",
    price: "$1,280",
    description: "Double-faced virgin wool blazer featuring exposed seam allowances and VALENCE horn button closures."
  },
  {
    id: 4,
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc.png&w=1920&q=85",
    alt: "VALENCE Archival Boot 04",
    title: "ARCHIVAL BOOT 04",
    category: "Footwear",
    price: "$950",
    description: "Hand-finished calfskin leather combat boot with sculpted Vibram platform sole and VALENCE stamp."
  },
  {
    id: 5,
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37.png&w=1920&q=85",
    alt: "VALENCE Modular Trouser 05",
    title: "MODULAR TROUSER",
    category: "Tailoring",
    price: "$780",
    description: "Wide-leg pleated wool trousers with adjustable lateral strap harness system."
  },
  {
    id: 6,
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c.png&w=1920&q=85",
    alt: "VALENCE Metallic Archive Object 06",
    title: "METALLIC ARCHIVE OBJECT",
    category: "Objects",
    price: "$640",
    description: "Limited edition brushed titanium identity tag with laser-engraved VALENCE archive serial code."
  },
  {
    id: 7,
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103808_013583d0-3386-4547-9832-37c7d8edb3ac.png&w=1920&q=85",
    alt: "VALENCE Asymmetric Silk Shirt 07",
    title: "ASYMMETRIC SILK SHIRT",
    category: "Tailoring",
    price: "$690",
    description: "Heavy mulberry silk shirt with diagonal placket and elongated cuffs."
  },
  {
    id: 8,
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103937_a0c49d0a-33eb-4ead-aea6-c1baf241acbc.png&w=1920&q=85",
    alt: "VALENCE Bonded Puffer Jacket 08",
    title: "BONDED PUFFER JACKET",
    category: "Outerwear",
    price: "$1,620",
    description: "Matte technical nylon down jacket with internal shoulder carry straps."
  },
  {
    id: 9,
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103956_d18ed8fd-7b6f-4b86-91f9-20010fe38670.png&w=1920&q=85",
    alt: "VALENCE Derby 09 Platform",
    title: "DERBY 09 PLATFORM",
    category: "Footwear",
    price: "$890",
    description: "Square-toe polished calfskin derby shoe with Goodyear welted tread."
  },
  {
    id: 10,
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104034_ba5a9963-87ff-4008-a545-6bd686c088b5.png&w=1920&q=85",
    alt: "VALENCE Archive Leather Tote 10",
    title: "ARCHIVE LEATHER TOTE",
    category: "Objects",
    price: "$1,150",
    description: "Minimalist full-grain architectural leather tote with concealed magnetic lock."
  }
];

export const VIDEO_URLS = {
  left: "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4",
  right: "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4"
};

export const HERO_IMAGE_URL = capImg;
