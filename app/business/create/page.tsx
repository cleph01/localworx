// /app/business/create/page.tsx

"use client";

import BusinessForm from "../../components/business/create/BusinessFormSection";

export default function CreateBusinessPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">🏪 Register Your Business</h1>
      <BusinessForm />
    </main>
  );
}
