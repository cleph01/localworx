import { Content, ZCOOL_KuaiLe } from "next/font/google";
import ServiceListingCard from "./ContentListingCard";
import Button from "../../ui/Button";

// This is a placeholder for the listings data. In a real application, this data would be fetched from an API or database.
const listings = [
  {
    id: 1,
    firstName: "Sophie",
    title:
      "Just Launched: My Local Art Workshop Series! Join Us & Get Creative 🎨",
    description:
      "Excited to announce my new weekend art workshops for all ages! Whether you're a beginner or a seasoned artist, come connect, learn, and create together. First session is free—let’s make our neighborhood more colorful!",
    likes: "32",
    comments: "7",
    publishDate: "2024-06-10",
    avatarUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    zapCount: "100",
  },
  {
    id: 2,
    firstName: "James",
    title: "Must-See: My New Video on Local History!",
    description:
      "I just uploaded a new video exploring the rich history of our town. From hidden gems to famous landmarks, it's a journey through time. Check it out and let me know your thoughts!",
    likes: "10",
    comments: "2",
    publishDate: "2023-10-02",
    avatarUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl: "https://vimeo.com/153173314?&login=true",
    mediaType: "video",
    zapCount: "50",
  },
  {
    id: 3,
    firstName: "Olivia",
    title: "Check Out My New Video on Local Wildlife!",
    description:
      "I just uploaded a new video showcasing the amazing wildlife in our area. From birds to deer, it's a must-watch for nature lovers! Let me know what you think in the comments.",
    likes: "15",
    comments: "3",
    publishDate: "2023-10-03",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl: "https://youtu.be/ilE0T2H5pF4",
    mediaType: "video",
    zapCount: "75",
  },
  {
    id: 4,
    firstName: "Liam",
    title: "Exploring Local Parks: My Favorite Spots 🌳",
    description:
      "I just published a new blog post about my favorite parks in the area. From hidden trails to scenic views, these spots are perfect for a weekend getaway. Check it out and share your favorites too!",
    likes: "8",
    comments: "1",
    publishDate: "2023-10-04",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    zapCount: "60",
  },
  {
    id: 5,
    firstName: "Emma",
    title: "Local Food Festival: My Experience & Recommendations 🍽️",
    description:
      "I had a blast at the local food festival this weekend! From delicious street food to amazing local vendors, it was a feast for the senses. Check out my top picks and let me know your favorites!",
    likes: "12",
    comments: "4",
    publishDate: "2023-10-05",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    zapCount: "90",
  },
  {
    id: 6,
    firstName: "Noah",
    title: "My New Video on Local Art Scene 🎨",
    description:
      "I just released a new video exploring the vibrant local art scene. From galleries to street art, there's so much creativity in our community. Check it out and let me know your thoughts!",
    likes: "20",
    comments: "6",
    publishDate: "2023-10-06",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl: "https://youtu.be/hr2Im6lLJhA",
    mediaType: "video",
    zapCount: "110",
  },
  {
    id: 7,
    firstName: "Mason",
    title: "Need help with home repairs? I'm available this weekend!",
    description:
      "Hey neighbors! I'm a licensed handyman with 10+ years experience in home repairs. If you need help with anything around the house, feel free to reach out. I'm available this weekend and would love to assist you!",
    likes: "20",
    comments: "6",
    publishDate: "2023-10-06",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1689629870780-5d0e655383e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    mediaUrl: "",
    mediaType: "text",
    zapCount: "40",
  },
  {
    id: 8,
    firstName: "Ava",
    title: "Community Garden Volunteers Needed 🌱",
    description:
      "We're looking for volunteers to help maintain our local community garden this summer! No experience necessary—just bring your enthusiasm and love for plants. Tools and refreshments provided. Let's grow together!",
    likes: "18",
    comments: "5",
    publishDate: "2024-06-12",
    avatarUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    zapCount: "80",
  },
  {
    id: 9,
    firstName: "Lucas",
    title: "Local Book Club: June Meeting Announcement 📚",
    description:
      "Our neighborhood book club is meeting on June 20th at the community center! This month, we're reading 'The Night Circus' by Erin Morgenstern. New members are always welcome—come for the discussion, stay for the snacks!",
    likes: "14",
    comments: "3",
    publishDate: "2024-06-05",
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    mediaUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    zapCount: "30",
  },
  {
    id: 10,
    firstName: "Mia",
    title: "Local Hiking Group: Weekend Adventure! 🥾",
    description:
      "Join us for a weekend hike at the beautiful Blue Ridge Mountains! All skill levels are welcome. Bring your water, snacks, and a sense of adventure. Let's explore the great outdoors together!",
    likes: "25",
    comments: "8",
    publishDate: "2024-06-15",
    avatarUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    mediaType: "image",
    zapCount: "0",
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

      {/* Load More Results Button */}
      <Button
        details={{
          text: "Load more results",
          css: "w-full my-6 py-4 bg-navy-blue-background text-white text-base font-bold",
        }}
      />
    </section>
  );
};
export default ContentListings;
// This component is a placeholder for the listings section of the services directory page.
