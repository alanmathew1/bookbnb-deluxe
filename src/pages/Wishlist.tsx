import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import HotelCard from "@/components/HotelCard";
import { toast } from "sonner";

type WishlistItem = {
  id: string;
  hotel: {
    id: string;
    name: string;
    location: string;
    price_per_night: number;
    rating: number;
    image_url: string;
  };
};

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchWishlist();
    };

    checkAuth();
  }, [navigate]);

  const fetchWishlist = async () => {
    const { data, error } = await supabase
      .from("wishlist")
      .select(`
        id,
        hotel:hotels(*)
      `);

    if (error) {
      toast.error("Failed to load wishlist");
    } else {
      setWishlistItems(data as any);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <HotelCard
                key={item.id}
                id={item.hotel.id as any}
                name={item.hotel.name}
                location={item.hotel.location}
                price={Number(item.hotel.price_per_night)}
                rating={Number(item.hotel.rating)}
                image={item.hotel.image_url || ""}
                amenities={[]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;