"use client";

import { useEffect, useState } from "react";

export default function UserPromotionList({ npub }: { npub: string }) {
  const [promotions, setPromotions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/users/promotions/${npub}`);
      const data = await res.json();
      setPromotions(data);
    }

    fetchData();
  }, [npub]);

  if (!promotions.length) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Your Promotions</h2>
      <ul className="space-y-2">
        {promotions.map((promo) => (
          <li
            key={promo.id}
            className="border p-4 rounded-md bg-gray-800 text-white"
          >
            <h3 className="font-bold">{promo.title}</h3>
            <p className="text-sm text-gray-400">{promo.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
