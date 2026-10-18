import { redirect } from "next/navigation";
import { articles } from "@/data/journal";
export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export default function Page() { redirect("/menu/"); }
