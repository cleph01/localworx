"use client";

import { useEffect, useState } from "react";

export default function UserBusinessList({ npub }: { npub: string }) {
  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/users/businesses/${npub}`);
      const data = await res.json();
      setBusinesses(data);
    }
    fetchData();
  }, [npub]);

  if (!businesses.length) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Your Businesses</h2>
      <ul className="space-y-2">
        {businesses.map((b) => (
          <li
            key={b.id}
            className="border p-4 rounded-md bg-gray-800 text-white"
          >
            <h3 className="font-bold">{b.business_name}</h3>
            <p className="text-sm text-gray-400">{b.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
