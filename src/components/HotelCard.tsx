import { Star, MapPin, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HotelCardProps {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  featured?: boolean;
}

const HotelCard = ({
  name,
  location,
  price,
  rating,
  reviews,
  image,
  amenities,
  featured,
}: HotelCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-large">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <Heart className="h-4 w-4" />
        </Button>
        {featured && (
          <Badge className="absolute top-3 left-3 bg-accent">
            Featured
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
            <Star className="h-3 w-3 fill-current" />
            <span>{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviews} reviews)
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <span className="text-2xl font-bold text-foreground">${price}</span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
          <Button className="bg-gradient-hero">Book Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
