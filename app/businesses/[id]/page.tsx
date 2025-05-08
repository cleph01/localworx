// app/businesses/[id]/page.tsx

import { notFound } from "next/navigation";
import db from "@/db/db";

export default async function BusinessDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const business = await db("businesses").where("id", params.id).first();

  if (!business) return notFound();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{business.name}</h1>
      <p className="text-gray-600">
        {business.address}, {business.city}, {business.state}
      </p>
      <p className="mt-2">{business.notes}</p>
      {/* Add more UI here: map, check-ins, reviews, etc */}
    </div>
  );
}
