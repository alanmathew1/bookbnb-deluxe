import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import HotelCard from "@/components/HotelCard";
import SearchFilters from "@/components/SearchFilters";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp } from "lucide-react";
import { toast } from "sonner";

type Hotel = {
  id: string;
  name: string;
  location: string;
  price_per_night: number;
  rating: number;
  image_url: string;
  amenities: string[];
  description?: string;
};

const Index = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const { data, error } = await supabase
      .from("hotels")
      .select("*")
      .order("rating", { ascending: false });

    if (error) {
      toast.error("Failed to load hotels");
      console.error(error);
    } else {
      setHotels(data || []);
    }
    setIsLoading(false);
  };

  const featuredHotels = hotels.slice(0, 3);
  const allHotels = hotels;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSearch />
        <div className="container py-16">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading hotels...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSearch />

      {/* Featured Hotels */}
      <section className="container py-16">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="h-6 w-6 text-accent" />
          <h2 className="text-3xl font-bold text-foreground">Featured Hotels</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              location={hotel.location}
              price={Number(hotel.price_per_night)}
              rating={Number(hotel.rating)}
              image={hotel.image_url || ""}
              amenities={hotel.amenities || []}
            />
          ))}
        </div>
      </section>

      {/* All Hotels */}
      <section id="hotels" className="container py-16 bg-secondary/30">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">All Hotels</h2>
          <SearchFilters />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              location={hotel.location}
              price={Number(hotel.price_per_night)}
              rating={Number(hotel.rating)}
              image={hotel.image_url || ""}
              amenities={hotel.amenities || []}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">About StayScape</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for finding the perfect accommodations worldwide.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 StayScape. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
