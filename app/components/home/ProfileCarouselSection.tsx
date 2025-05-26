// components/home/ProfilesCarouselSection.tsx
import Carousel from "../ui/Carousel";

// Profiles Test Data
const profiles = [
  {
    name: "Charlie Montoya",
    category: "Cybersecurity Student",
    accolades: ["WebDev", "SysAdmin", "Network Security"],
    imageUrl:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
  },

  {
    name: "Alexa Young",
    category: "UI/UX Designer",
    accolades: ["Figma Expert", "Branding", "Mobile Design"],
    imageUrl:
      "https://images.pexels.com/photos/1181696/pexels-photo-1181696.jpeg",
  },
  {
    name: "Priya Patel",
    category: "Data Scientist",
    accolades: ["Machine Learning", "Python", "Data Visualization"],
    imageUrl:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
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
    <section className="w-full max-w-7xl flex flex-col items-center justify-center mt-10 px-4">
      <Carousel profiles={profiles} />
    </section>
  );
};

export default ProfilesCarouselSection;
