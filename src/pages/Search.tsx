import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/book-card";
import { CategoryFilters } from "@/components/category-filters";
import { books } from "@/data/books";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState("relevance");

  // Update query from URL params
  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  // Search and filter logic
  const searchResults = useMemo(() => {
    let results = [...books];

    // Text search
    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(' ');
      results = results.filter(book => {
        const searchableText = `${book.title} ${book.author} ${book.category} ${book.description}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter(book => selectedCategories.includes(book.category));
    }

    // Price filter
    results = results.filter(book => 
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    // Sort results
    results.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "relevance":
        default:
          // For relevance, prioritize exact title matches, then author matches
          if (query.trim()) {
            const queryLower = query.toLowerCase();
            const aTitle = a.title.toLowerCase();
            const bTitle = b.title.toLowerCase();
            const aAuthor = a.author.toLowerCase();
            const bAuthor = b.author.toLowerCase();
            
            const aExactTitle = aTitle.includes(queryLower);
            const bExactTitle = bTitle.includes(queryLower);
            const aExactAuthor = aAuthor.includes(queryLower);
            const bExactAuthor = bAuthor.includes(queryLower);
            
            if (aExactTitle && !bExactTitle) return -1;
            if (!aExactTitle && bExactTitle) return 1;
            if (aExactAuthor && !bExactAuthor) return -1;
            if (!aExactAuthor && bExactAuthor) return 1;
          }
          return a.title.localeCompare(b.title);
      }
    });

    return results;
  }, [query, selectedCategories, priceRange, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query !== searchParams.get("q")) {
      setSearchParams(query ? { q: query } : {});
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-6">
            Search Books
          </h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for books, authors, or genres..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-12 py-3 text-base bg-muted/50 border-2 border-border focus:border-primary focus:bg-background"
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>

          {/* Search Info */}
          {query && (
            <div className="mt-4 text-muted-foreground">
              {searchResults.length > 0 ? (
                <p>
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for{' '}
                  <span className="font-medium text-foreground">"{query}"</span>
                </p>
              ) : (
                <p>
                  No results found for{' '}
                  <span className="font-medium text-foreground">"{query}"</span>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CategoryFilters
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              sortBy={sortBy}
              onSortByChange={setSortBy}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {query ? `Search Results` : "All Books"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {searchResults.length} book{searchResults.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Sort Options for Mobile */}
              <div className="md:hidden">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border rounded-md px-3 py-2 bg-background"
                >
                  <option value="relevance">Relevance</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="author">Author (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-12">
                <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No books found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any books matching your search. Try:
                </p>
                <div className="space-y-2 text-sm text-muted-foreground max-w-md mx-auto">
                  <p>• Checking your spelling</p>
                  <p>• Using different keywords</p>
                  <p>• Searching for the author's name</p>
                  <p>• Browsing by category instead</p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategories([]);
                    setPriceRange([0, 100]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Start your search</h3>
                <p className="text-muted-foreground">
                  Enter a book title, author name, or genre to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}