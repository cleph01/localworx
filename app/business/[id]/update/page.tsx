import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/lib/authOptions";
import { fetchBusiness } from "@/app/api/business/businessService";
import UpdateBusinessForm from "../../../components/UpdateBusinessForm";

export default async function UpdateBusinessPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  // Convert params.id to a number to match the expected type
  // and handle potential NaN case
  const businessId = Number(params.id);
  if (isNaN(businessId)) {
    return redirect("/error?message=Invalid%20Business%20ID");
  }
  // Fetch the business data
  const business = await fetchBusiness(businessId);
  if (!business) return notFound();

  // Optional: Only allow business owners to edit
  if (business.owner_id !== session.user.id) {
    redirect("/unauthorized");
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Update Business</h1>
      <UpdateBusinessForm business={business} />
    </div>
  );
}
