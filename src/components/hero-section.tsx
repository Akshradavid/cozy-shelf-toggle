import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-bookstore.jpg";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Cozy bookstore interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Discover Your Next
              <span className="text-primary block">Literary Adventure</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Welcome to Cozy Shelf, where every book is a doorway to new worlds. 
              Find your perfect read from our carefully curated collection.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for books, authors, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-base bg-background/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary focus:bg-background rounded-full"
              />
            </div>
          </form>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate("/categories")}
              size="lg" 
              className="px-8 py-3 text-base rounded-full group"
            >
              Browse Categories
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => navigate("/about")}
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-base rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              Our Story
            </Button>
          </div>

          {/* Featured Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/20">
            <div className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Books Available</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-bold text-primary">5K+</div>
              <div className="text-sm text-muted-foreground">Happy Readers</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">New Arrivals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}