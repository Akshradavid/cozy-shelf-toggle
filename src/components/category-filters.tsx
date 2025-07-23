import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/books";

interface CategoryFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
}

export function CategoryFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
}: CategoryFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const clearAllFilters = () => {
    onCategoryChange([]);
    onPriceRangeChange([0, 100]);
    onSortByChange("title");
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 100 || sortBy !== "title";

  return (
    <div className="w-full">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters & Categories
          </span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 100 ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter Content */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-serif">Filters</CardTitle>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleCategory(category)}
                    className="justify-start text-sm h-8"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[0]}
                    onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground min-w-[3rem]">
                    ${priceRange[0]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground min-w-[3rem]">
                    ${priceRange[1]}
                  </span>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  ${priceRange[0]} - ${priceRange[1]}
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: "title", label: "Title (A-Z)" },
                  { value: "price-low", label: "Price (Low to High)" },
                  { value: "price-high", label: "Price (High to Low)" },
                  { value: "rating", label: "Highest Rated" },
                  { value: "newest", label: "Newest First" },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSortByChange(option.value)}
                    className="justify-start text-sm h-8"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters */}
        {hasActiveFilters && (
          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="gap-1">
                    {category}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 100) && (
                  <Badge variant="secondary" className="gap-1">
                    ${priceRange[0]}-${priceRange[1]}
                    <button
                      onClick={() => onPriceRangeChange([0, 100])}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}