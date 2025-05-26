// components/checkin/IntroOfferSection.tsx
"use client";

import { useEffect, useState } from "react";

const IntroOfferSection = ({ businessId }: { businessId: string }) => {
  const [data, setData] = useState<{
    hasCheckedInBefore: string;
    introOffer: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntroOffer = async () => {
      try {
        const res = await fetch(`/api/checkin/intro-offer/${businessId}`);
        const result = await res.json();

        if (res.ok) {
          setData(result);
        } else {
          console.error(result.message || "Failed to fetch intro offer.");
        }
      } catch (error) {
        console.error("Error fetching intro offer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIntroOffer();
  }, [businessId]);

  if (loading || !data) return null;
  if (data.hasCheckedInBefore || !data.introOffer) return null;

  return (
    <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-yellow-800 mb-2">
        🎉 First-Time Offer
      </h3>
      <p className="text-sm text-yellow-700">{data.introOffer}</p>
    </section>
  );
};

export default IntroOfferSection;
