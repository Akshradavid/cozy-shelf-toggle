import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BookOpen, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <BookOpen className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
        <h1 className="font-serif text-6xl font-bold mb-4 text-foreground">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Looks like this page got lost in our library. Let's help you find your way back to our collection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/categories">Browse Books</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
