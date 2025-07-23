import { useState } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Book } from "@/data/books";

interface BookCardProps {
  book: Book;
  variant?: "default" | "featured";
}

export function BookCard({ book, variant = "default" }: BookCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Added to Cart",
      description: `"${book.title}" has been added to your cart.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `"${book.title}" ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-3 w-3 text-gray-300" />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-soft hover:shadow-warm transition-all duration-300 bg-card">
      <Link to={`/book/${book.id}`}>
        <div className="relative">
          {/* Book Image */}
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {book.bestseller && (
              <Badge variant="destructive" className="text-xs">
                Bestseller
              </Badge>
            )}
            {book.newRelease && (
              <Badge className="text-xs bg-forest-green text-white">
                New
              </Badge>
            )}
            {book.originalPrice && (
              <Badge variant="secondary" className="text-xs">
                {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWishlist}
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background transition-opacity opacity-0 group-hover:opacity-100"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </Button>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Category */}
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            {book.category}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-sm text-muted-foreground">
            by {book.author}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {renderStars(book.rating)}
            </div>
            <span className="text-xs text-muted-foreground">
              {book.rating} ({book.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-primary">
                ${book.price}
              </span>
              {book.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${book.originalPrice}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full gap-2"
          variant="default"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}