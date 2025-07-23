import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BookCard } from "@/components/book-card";
import { CategoryFilters } from "@/components/category-filters";
import { books, categories } from "@/data/books";

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState("title");

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(book => 
        selectedCategories.includes(book.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(book => 
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id.localeCompare(a.id); // Assuming higher IDs are newer
        case "title":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [selectedCategories, priceRange, sortBy]);

  // Update URL when category filter changes
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    if (categories.length === 1) {
      setSearchParams({ category: categories[0] });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
            Browse Our Collection
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover books across all genres and categories
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CategoryFilters
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              sortBy={sortBy}
              onSortByChange={setSortBy}
            />
          </div>

          {/* Books Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedCategories.length > 0 
                    ? selectedCategories.join(", ") 
                    : "All Books"
                  }
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-4">
                  No books found matching your criteria
                </div>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or browse our full collection
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}