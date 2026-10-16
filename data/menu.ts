export type Drink = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  ingredients: string[];
  size: string;
  notes: string[];
  dietary: string;
  signature?: boolean;
};
export const categories = [
  "Espresso Classics",
  "Milk-Based Coffee",
  "Filter & Slow Brew",
  "Iced Coffee",
  "Matcha & Alternatives",
  "Seasonal Signatures",
];
export const drinks: Drink[] = [
  {
    id: "espresso",
    name: "Espresso",
    price: 3.5,
    category: categories[0],
    image: "espresso",
    description:
      "A small, expressive cup. Rounded sweetness with a clean, lingering finish.",
    ingredients: ["Double espresso"],
    size: "36 ml",
    notes: ["Cacao", "Caramel", "Red fruit"],
    dietary: "Vegan. Contains caffeine.",
  },
  {
    id: "americano",
    name: "Americano",
    price: 4,
    category: categories[0],
    image: "filter",
    description:
      "Our espresso opened up with hot water, keeping its depth and gentle sweetness.",
    ingredients: ["Double espresso", "Filtered water"],
    size: "240 ml",
    notes: ["Dark chocolate", "Toasted nuts"],
    dietary: "Vegan. Contains caffeine.",
  },
  {
    id: "macchiato",
    name: "Espresso Macchiato",
    price: 4,
    category: categories[0],
    image: "espresso",
    description:
      "A double espresso, softened with a small spoonful of textured milk.",
    ingredients: ["Double espresso", "Whole milk"],
    size: "60 ml",
    notes: ["Cacao", "Sweet cream"],
    dietary: "Contains milk and caffeine. Oat alternative available.",
  },
  {
    id: "cortado",
    name: "Cortado",
    price: 4.5,
    category: categories[1],
    image: "latte",
    description:
      "Equal parts espresso and warm milk. Quiet balance, in a smaller cup.",
    ingredients: ["Double espresso", "Whole milk"],
    size: "120 ml",
    notes: ["Caramel", "Soft cocoa"],
    dietary: "Contains milk and caffeine. Oat alternative available.",
  },
  {
    id: "flat-white",
    name: "Flat White",
    price: 5,
    category: categories[1],
    image: "latte",
    description:
      "Velvety microfoam meets a concentrated espresso. Rich, familiar, beautifully balanced.",
    ingredients: ["Double espresso", "Whole milk"],
    size: "180 ml",
    notes: ["Milk chocolate", "Hazelnut notes"],
    dietary:
      "Contains milk and caffeine. Flavor notes do not indicate added nuts.",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 5,
    category: categories[1],
    image: "latte",
    description:
      "A generous, fine-textured foam with a distinct espresso heart.",
    ingredients: ["Double espresso", "Whole milk"],
    size: "180 ml",
    notes: ["Cacao", "Sweet milk"],
    dietary: "Contains milk and caffeine. Oat alternative available.",
  },
  {
    id: "latte",
    name: "Velune Latte",
    price: 5.5,
    category: categories[1],
    image: "latte",
    description:
      "Our everyday ritual. Silky milk, a soft espresso base, and nothing to hurry.",
    ingredients: ["Double espresso", "Whole milk"],
    size: "280 ml",
    notes: ["Caramel", "Cream", "Cacao"],
    dietary: "Contains milk and caffeine. Oat alternative available.",
    signature: true,
  },
  {
    id: "oat-latte",
    name: "Oat Latte",
    price: 6,
    category: categories[1],
    image: "latte",
    description: "Naturally mellow oat milk with a comforting, toasted finish.",
    ingredients: ["Double espresso", "Barista oat drink"],
    size: "280 ml",
    notes: ["Oat biscuit", "Brown sugar"],
    dietary:
      "Plant-based. Contains oats; may contain gluten. Contains caffeine.",
  },
  {
    id: "pour-over",
    name: "Hand-Poured Coffee",
    price: 6.5,
    category: categories[2],
    image: "filter",
    description:
      "Brewed one cup at a time to reveal a lighter, more delicate side of coffee.",
    ingredients: ["Freshly ground coffee", "Filtered water"],
    size: "250 ml",
    notes: ["Citrus", "Stone fruit", "Tea-like"],
    dietary: "Vegan. Contains caffeine.",
    signature: true,
  },
  {
    id: "batch-brew",
    name: "Daily Filter",
    price: 4.5,
    category: categories[2],
    image: "filter",
    description:
      "An approachable filter brew with clear sweetness and a round body.",
    ingredients: ["Ground coffee", "Filtered water"],
    size: "280 ml",
    notes: ["Apple", "Caramel"],
    dietary: "Vegan. Contains caffeine.",
  },
  {
    id: "aeropress",
    name: "AeroPress",
    price: 6,
    category: categories[2],
    image: "filter",
    description: "Immersion and gentle pressure bring out a full, smooth cup.",
    ingredients: ["Ground coffee", "Filtered water"],
    size: "220 ml",
    notes: ["Cocoa nib", "Dried fruit"],
    dietary: "Vegan. Contains caffeine.",
  },
  {
    id: "cold-brew",
    name: "Slow Cold Brew",
    price: 5.5,
    category: categories[3],
    image: "iced",
    description: "A long, cool steep for rounded sweetness and an easy finish.",
    ingredients: ["Cold-steeped coffee", "Filtered water", "Ice"],
    size: "300 ml",
    notes: ["Dark chocolate", "Date"],
    dietary: "Vegan. Contains caffeine.",
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    price: 5.5,
    category: categories[3],
    image: "iced",
    description: "Fresh espresso poured over cold milk and clear ice.",
    ingredients: ["Double espresso", "Whole milk", "Ice"],
    size: "350 ml",
    notes: ["Caramel", "Cool cream"],
    dietary: "Contains milk and caffeine. Oat alternative available.",
  },
  {
    id: "espresso-tonic",
    name: "Espresso Tonic",
    price: 6.5,
    category: categories[3],
    image: "iced",
    description: "Bright, bittersweet bubbles with a fresh espresso finish.",
    ingredients: ["Double espresso", "Tonic water", "Orange peel", "Ice"],
    size: "300 ml",
    notes: ["Citrus", "Botanical", "Bittersweet"],
    dietary: "Vegan. Contains caffeine and quinine.",
  },
  {
    id: "matcha",
    name: "Matcha Latte",
    price: 6,
    category: categories[4],
    image: "matcha",
    description:
      "Stone-ground green tea whisked smooth, with gently steamed milk.",
    ingredients: ["Matcha green tea", "Whole milk", "Filtered water"],
    size: "280 ml",
    notes: ["Fresh grass", "Umami", "Cream"],
    dietary: "Contains milk and caffeine. Oat alternative available.",
  },
  {
    id: "hojicha",
    name: "Hojicha Latte",
    price: 6,
    category: categories[4],
    image: "latte",
    description:
      "Roasted green tea brings a warm, nutty depth to steamed milk.",
    ingredients: ["Roasted green tea powder", "Whole milk", "Filtered water"],
    size: "280 ml",
    notes: ["Roasted grain", "Cacao"],
    dietary: "Contains milk and caffeine. Oat alternative available.",
  },
  {
    id: "chocolate",
    name: "Dark Chocolate",
    price: 5.5,
    category: categories[4],
    image: "latte",
    description: "Deep cocoa, steamed milk, and just enough sweetness.",
    ingredients: ["Cocoa", "Dark chocolate", "Whole milk", "Cane sugar"],
    size: "280 ml",
    notes: ["Dark cocoa", "Soft sweetness"],
    dietary:
      "Contains milk. Chocolate may contain soy. Naturally occurring caffeine.",
  },
  {
    id: "lavender-cloud",
    name: "Lavender Cloud",
    price: 7,
    category: categories[5],
    image: "latte",
    description:
      "A whisper of culinary lavender, vanilla, and espresso under silky milk.",
    ingredients: [
      "Double espresso",
      "Whole milk",
      "Culinary lavender syrup",
      "Vanilla",
    ],
    size: "280 ml",
    notes: ["Floral", "Vanilla", "Caramel"],
    dietary: "Contains milk and caffeine. Oat alternative available.",
    signature: true,
  },
  {
    id: "sesame-latte",
    name: "Black Sesame Latte",
    price: 7,
    category: categories[5],
    image: "latte",
    description:
      "Roasted black sesame and espresso, with a deeply comforting finish.",
    ingredients: [
      "Double espresso",
      "Whole milk",
      "Black sesame paste",
      "Cane sugar",
    ],
    size: "280 ml",
    notes: ["Roasted sesame", "Cocoa"],
    dietary: "Contains sesame, milk, and caffeine.",
  },
  {
    id: "yuzu-cold-brew",
    name: "Yuzu Cold Brew",
    price: 7,
    category: categories[5],
    image: "iced",
    description:
      "Slow-steeped coffee lifted by fragrant yuzu and a little sparkling water.",
    ingredients: [
      "Cold brew",
      "Yuzu juice",
      "Sparkling water",
      "Cane sugar",
      "Ice",
    ],
    size: "300 ml",
    notes: ["Yuzu zest", "Dark chocolate", "Bright"],
    dietary: "Vegan. Contains caffeine.",
    signature: true,
  },
];
export const price = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );
