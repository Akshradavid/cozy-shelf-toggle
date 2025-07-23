export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  bestseller?: boolean;
  newRelease?: boolean;
}

export const categories = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Fantasy',
  'Biography',
  'History',
  'Self-Help',
  'Poetry'
];

export const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 24.99,
    originalPrice: 29.99,
    category: 'Fiction',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    rating: 4.8,
    reviews: 12843,
    featured: true,
    bestseller: true
  },
  {
    id: '2',
    title: 'Educated',
    author: 'Tara Westover',
    price: 19.99,
    category: 'Biography',
    description: 'A memoir about a woman who, raised by survivalists in Idaho, had never set foot in a classroom until she was 17.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    rating: 4.7,
    reviews: 8721,
    featured: true
  },
  {
    id: '3',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    price: 22.99,
    category: 'Fiction',
    description: 'Reclusive Hollywood icon Evelyn Hugo finally decides to tell her life story—but only to one reporter.',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    rating: 4.9,
    reviews: 15632,
    bestseller: true
  },
  {
    id: '4',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    price: 26.99,
    category: 'Sci-Fi',
    description: 'From her place in the store, Klara, an artificial friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    rating: 4.5,
    reviews: 6234,
    newRelease: true
  },
  {
    id: '5',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    price: 18.99,
    category: 'Mystery',
    description: 'In a peaceful retirement village, four unlikely friends meet weekly to investigate cold cases. But when a local developer is found dead, the Thursday Murder Club find themselves in the middle of their first live case.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    rating: 4.6,
    reviews: 9876,
    featured: true
  },
  {
    id: '6',
    title: 'Becoming',
    author: 'Michelle Obama',
    price: 21.99,
    category: 'Biography',
    description: 'In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world.',
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop',
    rating: 4.8,
    reviews: 18954,
    bestseller: true
  }
];

export const featuredBooks = books.filter(book => book.featured);
export const bestsellerBooks = books.filter(book => book.bestseller);
export const newReleaseBooks = books.filter(book => book.newRelease);