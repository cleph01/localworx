// app/businesses/[id]/page.tsx

import db from "@/db/db";
import NotFound from "@/app/not-found";

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Extract the id from the context
  const { id } = await params;

  // SSR: Fetch the business details from the database
  // Fetch the business details from the database
  const business = await db("businesses").where("id", id).first();

  if (!business) return NotFound();

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
