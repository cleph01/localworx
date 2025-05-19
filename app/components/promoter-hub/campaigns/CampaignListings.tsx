import ServiceListingCard from "./CampaignListingCard";

// This is a placeholder for the listings data. In a real application, this data would be fetched from an API or database.
const listings = [
  {
    id: 1,
    businessName: "business1",
    firstName: "John",
    rating: "4.5",
    reviewCount: "10",
    clicks: "100",
    views: "200",
    referrals: "50",
    avatarUrl:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
  },
  {
    id: 2,
    businessName: "business2",
    firstName: "Jane",
    rating: "4.0",
    reviewCount: "20",
    clicks: "150",
    views: "300",
    referrals: "70",
    avatarUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl: "https://vimeo.com/153173314?&login=true",
    mediaType: "video",
  },
  {
    id: 3,
    businessName: "business3",
    firstName: "Alice",
    rating: "5.0",
    reviewCount: "30",
    clicks: "200",
    views: "400",
    referrals: "100",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl: "https://youtu.be/ilE0T2H5pF4",
    mediaType: "video",
  },
  {
    id: 4,
    businessName: "business4",
    firstName: "Bob",
    rating: "3.5",
    reviewCount: "5",
    clicks: "50",
    views: "100",
    referrals: "20",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
  },
  {
    id: 5,
    businessName: "business5",
    firstName: "Charlie",
    rating: "4.8",
    reviewCount: "15",
    clicks: "80",
    views: "160",
    referrals: "40",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
  },
  {
    id: 6,
    businessName: "business6",
    firstName: "Dave",
    rating: "4.2",
    reviewCount: "25",
    clicks: "120",
    views: "240",
    referrals: "60",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl: "https://youtu.be/hr2Im6lLJhA",
    mediaType: "video",
  },
];

const ListingsSection = () => {
  return (
    <section className="flex flex-col gap-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example listing item */}
        {listings.map((listing) => (
          <ServiceListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* TODO: Modularize this button into UI component */}
      <div className="my-6 py-4 shadow-lg inline-flex items-center justify-center rounded-lg bg-navy-blue-background text-white text-sm font-bold">
        Load more results
      </div>
    </section>
  );
};
export default ListingsSection;
// This component is a placeholder for the listings section of the services directory page.
