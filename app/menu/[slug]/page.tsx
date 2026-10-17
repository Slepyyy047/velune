import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { drinks } from "@/data/menu";
import { DrinkDetail } from "@/components/drink-detail";
export function generateStaticParams() { return drinks.map(d => ({ slug: d.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const drink = drinks.find(d => d.id === slug);
  return { title: drink?.name || "Drink", description: drink?.description };
}
export default async function DrinkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const drink = drinks.find(d => d.id === slug);
  if (!drink) notFound();
  return <DrinkDetail drink={drink}/>;
}
