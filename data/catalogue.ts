import { drinks, categories, type Drink } from "@/data/menu";
import dessertData from "@/data/desserts.json";
export type MenuItem = Drink & { kind: "drink" | "dessert" };
export const desserts: Drink[] = dessertData;
export const dessertCategories = ["Pastries", "Cakes & Chilled Desserts", "Cookies & Small Bakes"];
export const menuItems: MenuItem[] = [...drinks.map(d => ({ ...d, kind: "drink" as const })), ...desserts.map(d => ({ ...d, kind: "dessert" as const }))];
export { drinks, categories };
