// components/home/ProfilesCarouselSection.tsx
import Carousel from "../Carousel";

// Profiles Test Data
const profiles = [
  {
    name: "Charlie Montoya",
    category: "WebDev",
    accolades: ["Bitcoin Dev", "Full Stack Dev"],
    imageUrl:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  },
  {
    name: "Charlie Montoya",
    category: "WebDev",
    accolades: ["Bitcoin Dev", "Full Stack Dev"],
    imageUrl:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  },
  {
    name: "Charlie Montoya",
    category: "WebDev",
    accolades: ["Bitcoin Dev", "Full Stack Dev"],
    imageUrl:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  },
];

interface ProfilesCarouselSectionProps {
  profiles: {
    name: string;
    category: string;
    accolades: string[];
    imageUrl: string;
  }[];
}

const ProfilesCarouselSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center mt-10 px-4">
      <Carousel profiles={profiles} />
    </section>
  );
};

export default ProfilesCarouselSection;
