// components/home/ReviewsSection.tsx
import ReviewCard from "./ReviewCard";

// Reviews Cards to test data
const reviews = [
  {
    rating: 5,
    review:
      "As a small business owner, finding local promoters who genuinely care about our neighborhood made all the difference. We've seen real results.",
    name: "luis",
    businessName: "cafe owner",
    avatarUrl:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    rating: 5,
    review:
      "LocalWorx helped us connect with new customers in our area. The platform is easy to use and the support team is fantastic!",
    name: "gloria",
    businessName: "catering",
    avatarUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    rating: 5,
    review:
      "The exposure we gained through LocalWorx was incredible. Our bookings increased and we built lasting relationships with local customers.",
    name: "Santiago",
    businessName: "mechanic",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
];

const ReviewsSection = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-10 text-lg px-4">
      <h2 className="max-w-4xl text-5xl sm:text-6xl font-semibold mb-6">
        Don't take our word for it, here's what our{" "}
        <span className="font-serif italic">users</span> say:
      </h2>
      {/* Review Cards */}
      <section className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            rating={review.rating}
            review={review.review}
            name={review.name}
            businessName={review.businessName}
            avatarUrl={review.avatarUrl}
          />
        ))}
      </section>
    </section>
  );
};

export default ReviewsSection;
