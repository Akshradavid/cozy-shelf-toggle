import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, ArrowLeft, Share2, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { books } from "@/data/books";
import { BookCarousel } from "@/components/book-carousel";

export default function BookDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <Link to="/categories">
            <Button>Browse Books</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedBooks = books
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} copy${quantity > 1 ? 'ies' : ''} of "${book.title}" added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `"${book.title}" ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Book link copied to clipboard!",
      });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        {/* Back Button */}
        <Link to="/categories" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Book Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] max-w-md mx-auto overflow-hidden rounded-lg shadow-book bg-muted">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {book.bestseller && (
                <Badge variant="destructive">Bestseller</Badge>
              )}
              {book.newRelease && (
                <Badge className="bg-forest-green text-white">New Release</Badge>
              )}
              {book.featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>

            {/* Title and Author */}
            <div>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                by {book.author}
              </p>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {book.category}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(book.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                {book.rating} out of 5 ({book.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                ${book.price}
              </span>
              {book.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${book.originalPrice}
                  </span>
                  <Badge variant="secondary">
                    Save ${(book.originalPrice - book.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlist}
                  className="gap-2"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Free shipping on orders over $25</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>30-day return policy</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <>
            <Separator className="mb-8" />
            <BookCarousel
              books={relatedBooks}
              title="You Might Also Like"
              subtitle={`More books in ${book.category}`}
            />
          </>
        )}
      </div>
    </div>
  );
}