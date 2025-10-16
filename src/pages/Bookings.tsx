import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

type Booking = {
  id: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  total_price: number;
  status: string;
  payment_status: string;
  hotel: {
    name: string;
    location: string;
    image_url: string;
  };
};

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchBookings();
    };

    checkAuth();
  }, [navigate]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        hotel:hotels(name, location, image_url)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load bookings");
    } else {
      setBookings(data as any);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">You don't have any bookings yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{booking.hotel.name}</CardTitle>
                      <CardDescription>{booking.hotel.location}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                        {booking.status}
                      </Badge>
                      <Badge variant={booking.payment_status === "paid" ? "default" : "outline"}>
                        {booking.payment_status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Check-in</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(booking.check_in_date), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Check-out</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(booking.check_out_date), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Guests</p>
                        <p className="text-sm text-muted-foreground">{booking.guests}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Total:</span>
                      <span className="text-lg font-bold">${booking.total_price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;