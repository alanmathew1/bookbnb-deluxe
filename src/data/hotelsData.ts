import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";
import hotel6 from "@/assets/hotel-6.jpg";

export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  featured?: boolean;
  description?: string;
}

export const hotelsData: Hotel[] = [
  {
    id: 1,
    name: "The Grand Urban",
    location: "New York, USA",
    price: 299,
    rating: 4.8,
    reviews: 1245,
    image: hotel1,
    amenities: ["WiFi", "Parking", "Gym", "Restaurant"],
    featured: true,
    description: "Experience luxury in the heart of Manhattan with stunning city views and world-class amenities.",
  },
  {
    id: 2,
    name: "Paradise Beach Resort",
    location: "Maldives",
    price: 450,
    rating: 4.9,
    reviews: 892,
    image: hotel2,
    amenities: ["WiFi", "Pool", "Beach", "Spa"],
    featured: true,
    description: "Your private paradise awaits with crystal-clear waters and white sandy beaches.",
  },
  {
    id: 3,
    name: "Skyline Tower Hotel",
    location: "Dubai, UAE",
    price: 380,
    rating: 4.7,
    reviews: 1567,
    image: hotel3,
    amenities: ["WiFi", "Rooftop Bar", "Gym", "Concierge"],
    description: "Modern luxury with panoramic views of Dubai's iconic skyline.",
  },
  {
    id: 4,
    name: "Alpine Mountain Lodge",
    location: "Swiss Alps, Switzerland",
    price: 320,
    rating: 4.8,
    reviews: 743,
    image: hotel4,
    amenities: ["WiFi", "Ski Access", "Restaurant", "Fireplace"],
    description: "Cozy mountain retreat with breathtaking alpine views and premium ski access.",
  },
  {
    id: 5,
    name: "Villa Bella Vista",
    location: "Tuscany, Italy",
    price: 275,
    rating: 4.9,
    reviews: 621,
    image: hotel5,
    amenities: ["WiFi", "Pool", "Wine Cellar", "Garden"],
    featured: true,
    description: "Historic charm meets modern comfort in the heart of Tuscany's wine country.",
  },
  {
    id: 6,
    name: "Rainforest Eco Lodge",
    location: "Costa Rica",
    price: 185,
    rating: 4.6,
    reviews: 438,
    image: hotel6,
    amenities: ["WiFi", "Nature Tours", "Organic Restaurant", "Yoga"],
    description: "Sustainable luxury immersed in lush tropical rainforest.",
  },
];
