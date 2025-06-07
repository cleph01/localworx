import PostCard from "../posts/PostCard";

const MyPostsSection = () => {
  const myPosts = [
    {
      id: "1",
      userId: "1",
      firstName: "Alice",
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
      id: "2",
      userId: "3",
      firstName: "Charlie",
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
      id: "3",
      userId: "4",
      firstName: "Diana",
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
      id: "4",
      userId: "2",
      firstName: "Bob",
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
      id: "5",
      userId: "5",
      firstName: "Ethan",
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
      id: "6",
      userId: "6",
      firstName: "Fiona",
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
      id: "7",
      userId: "7",
      firstName: "George",
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
  ]; // Fetch user’s posts

  return (
    <section className="max-w-4xl bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">📝 Your Posts</h2>
      {myPosts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          You haven’t published any posts yet.{" "}
          <a href="/post/create" className="text-blue-600 underline">
            Create one now
          </a>
          .
        </p>
      )}
    </section>
  );
};

export default MyPostsSection;
