import { Content } from "next/font/google";
import ServiceListingCard from "./ContentListingCard";

// This is a placeholder for the listings data. In a real application, this data would be fetched from an API or database.
const listings = [
  {
    id: 1,
    title: "image 1",
    likes: "24",
    comments: "5",
    publishDate: "2023-10-01",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
  },
  {
    id: 2,
    title: "video 1",
    likes: "10",
    comments: "2",
    publishDate: "2023-10-02",
    avatarUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl: "https://vimeo.com/153173314?&login=true",
    mediaType: "video",
  },
  {
    id: 3,
    title: "video 2",
    likes: "15",
    comments: "3",
    publishDate: "2023-10-03",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl: "https://youtu.be/ilE0T2H5pF4",
    mediaType: "video",
  },
  {
    id: 4,
    title: "image 2",
    likes: "8",
    comments: "1",
    publishDate: "2023-10-04",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
  },
  {
    id: 5,
    title: "image 3",
    likes: "12",
    comments: "4",
    publishDate: "2023-10-05",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
  },
  {
    id: 6,
    title: "video 3",
    likes: "20",
    comments: "6",
    publishDate: "2023-10-06",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl: "https://youtu.be/hr2Im6lLJhA",
    mediaType: "video",
  },
  {
    id: 7,
    title: "Need help with home repairs? I'm available this weekend!",
    description:
      "Hey neighbors! I'm a licensed handyman with 10+ years experience in home repairs. If you need help with anything around the house, feel free to reach out. I'm available this weekend and would love to assist you!",
    likes: "20",
    comments: "6",
    publishDate: "2023-10-06",
    avatarUrl: "",
    mediaUrl: "",
    mediaType: "text",
  },
];

const ContentListings = () => {
  return (
    <section className="flex flex-col gap-4 pb-12">
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
export default ContentListings;
// This component is a placeholder for the listings section of the services directory page.
