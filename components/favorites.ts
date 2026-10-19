"use client";
import { useCallback, useEffect, useState } from "react";
import { menuItems } from "@/data/catalogue";
const key = "velune-favorites";
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const read = () => {
      try {
        const saved = JSON.parse(localStorage.getItem(key) || "[]");
        setFavorites(Array.isArray(saved) ? saved.filter(id => menuItems.some(d => d.id === id)) : []);
      } catch { setStorageError(true); }
    };
    read();
    const sync = (event: StorageEvent) => { if (event.key === key) read(); };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try { localStorage.setItem(key, JSON.stringify(next)); } catch { setStorageError(true); }
      return next;
    });
  }, []);
  return { favorites, storageError, toggleFavorite };
}
