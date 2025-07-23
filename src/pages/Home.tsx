import { HeroSection } from "@/components/hero-section";
import { BookCarousel } from "@/components/book-carousel";
import { featuredBooks, bestsellerBooks, newReleaseBooks, categories } from "@/data/books";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, TrendingUp, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Books Carousel */}
      <BookCarousel
        books={featuredBooks}
        title="Featured Books"
        subtitle="Hand-picked selections from our expert curators"
      />

      {/* Categories Section */}
      <section className="py-12 bg-gradient-warm">
        <div className="container px-4">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              Explore by Category
            </h2>
            <p className="text-muted-foreground">
              Find your next great read in your favorite genre
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {categories.slice(0, 10).map((category) => (
              <Link key={category} to={`/category/${category.toLowerCase()}`}>
                <Card className="group hover:shadow-warm transition-all duration-300 cursor-pointer border-0 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="mb-3">
                      <BookOpen className="h-8 w-8 mx-auto text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {category}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/categories">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <BookCarousel
        books={bestsellerBooks}
        title="Bestsellers"
        subtitle="The most loved books by our community"
      />

      {/* Special Offers Section */}
      <section className="py-12 bg-gradient-accent">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wide">
                    Special Offer
                  </span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                  Join our Book Club & Save 25%
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get exclusive access to monthly book selections, author interviews, 
                  and special discounts on your favorite titles. Join thousands of 
                  readers in our cozy community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-full">
                    Join Book Club
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-warm">
                  <div className="text-center space-y-4">
                    <TrendingUp className="h-12 w-12 mx-auto text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-primary">25% OFF</div>
                      <div className="text-sm text-muted-foreground">Monthly Subscription</div>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>✓ Curated book selections</div>
                      <div>✓ Exclusive author content</div>
                      <div>✓ Community discussions</div>
                      <div>✓ Priority customer support</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Releases */}
      {newReleaseBooks.length > 0 && (
        <BookCarousel
          books={newReleaseBooks}
          title="New Releases"
          subtitle="Fresh arrivals from your favorite authors"
        />
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary">
        <div className="container px-4 text-center">
          <div className="max-w-2xl mx-auto text-primary-foreground">
            <h2 className="font-serif text-3xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Be the first to know about new arrivals, exclusive offers, 
              and literary events. Join our newsletter today!
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="rounded-full px-8"
              onClick={() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}