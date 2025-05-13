// Because we're using the app directory, that makes this a server component and not a client component
// // (which is the default). This means you don't need to use "use client" at the top of the file.
// You can also use async/await directly in the component function, and you don't need to use useEffect or useState.
// // You can also use server-side functions like getServerSession directly in this component.
//because you're already on the server and can directly call backend logic (e.g., database access functions like getBusinessById()).
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/lib/authOptions";
import { redirect } from "next/navigation";
import { fetchBusiness } from "@/app/api/business/businessService";

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  // Extract the id from the params
  // Note: params is a Promise, so we need to await it
  const { id } = await params;

  const businessId = Number(id);
  if (isNaN(businessId)) {
    return redirect("/error?message=Invalid%20Business%20ID");
  }
  // Fetch the business data
  const business = await fetchBusiness(businessId);

  // Optional: confirm ownership
  if (business?.owner_id !== session.user.id) {
    return redirect("/unauthorized");
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Business Profile</h1>
      <p className="text-lg font-semibold">{business.name}</p>
      <p className="text-gray-700 mt-2 mb-6">{business.description}</p>
      <a
        href={`/business/${id}/update`}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Edit
      </a>
    </div>
  );
}
