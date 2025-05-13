import Image from "next/image";
import ButtonLink from "./components/ButtonLink";
import {
  FaAddressCard,
  FaBriefcase,
  FaBtc,
  FaBullhorn,
  FaColumns,
  FaInfo,
  FaInfoCircle,
  FaQrcode,
  FaUser,
  FaUsers,
  FaVolumeUp,
} from "react-icons/fa";

import Carousel from "./components/Carousel";
import HomeFeaturesCard from "./components/home/FeaturesCard";
import HomeCheckListItem from "./components/home/CheckListItem";
import {
  CreateAccount,
  CommunityConnect,
  EarningSnapshot,
} from "./components/home/StepsCardHeaders";
import StepsCard from "./components/home/StepsCard";

export default function Home() {
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

  // Features Test Data
  const features = [
    {
      title: "Bitcoin Zap Integration",
      description:
        "Send and receive instant payments for community engagement and service promotion.",
      icon: <FaBtc className="h-12 w-12 text-blue-400" />,
    },
    {
      title: "Promoter Hub",
      description:
        "Earn by promoting local businesses and services or sharing community-powered deals with your friends.",
      icon: <FaVolumeUp className="h-10 w-10 text-blue-400" />,
    },
    {
      title: "Service Directory",
      description:
        "Quickly find local offerings that match your needs using intuitive filters and categories.",
      icon: <FaAddressCard className="h-10 w-10 text-blue-400" />,
    },
    {
      title: "Role Based User Profiles",
      description:
        "Easily showcase your skills or service with profiles tailored to freelancers, promoters, and business owners.",
      icon: <FaUsers className="h-10 w-10 text-blue-400" />,
    },
    {
      title: "Reward Dashboard",
      description:
        "Stay motivated with real-time insights into your earnings, milestones, and progress through gamified tracking.",
      icon: <FaColumns className="h-10 w-10 text-blue-400" />,
    },
    {
      title: "Community Check-Ins",
      description:
        "Share your wins, track impact, and stay connected with the local businesses that matter most to you.",
      icon: <FaQrcode className="h-10 w-10 text-blue-400" />,
    },
  ];

  // Checklist Items Test Data
  const checklistItems = [
    {
      number: "150+",
      text: "Cities represented accross the platform",
    },
    {
      number: "3k+",
      text: "Verified members and growing",
    },
    {
      number: "2.5k+",
      text: "Services listed by local professionals",
    },
  ];

  // Steps Cards Test Data
  const stepCards = [
    {
      header: <CreateAccount />,
      step: "01",
      title: "Create your profile",
      description:
        "Sign up and you'll automatically become a user, promoter, and business owner with a personalized profile.",
    },
    {
      header: <CommunityConnect />,
      step: "02",
      title: "Connect with your community",
      description:
        "Access discounts, rewards, and income opportnities from creating content that promotes your favorite local spots",
    },
    {
      header: <EarningSnapshot />,
      step: "03",
      title: "Start earning and growing",
      description:
        "Get paid directly via bitcoin from business owners and/or from reselling rewards and discounts earned from supporting your local economies.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 ">
      {/* Header */}
      <section className="flex flex-col items-center justify-center text-xl">
        {/* Title & Tagline */}
        <p className="mb-6 text-base">
          🟦 Connect with your community to grow, share, and thrive together.
        </p>
        <h1 className="text-5xl sm:text-4xl md:text-5xl font-bold">
          <span className="font-serif italic">Empowering</span> Communities. One
          Shoutout at a Time.
        </h1>
        {/* Hero Image */}
        <Image
          src="/localworx-logo.png"
          alt="LocalWorx Logo"
          className="w-48 h-auto my-6 "
          width={192}
          height={192}
        />
        <p className="sm:text-2xl text-gray-500 mb-4">
          We are the <span className="font-bold">Main Street First</span>{" "}
          platform that is putting LOCAL businesses ahead of global ones.
        </p>
        <p className="text-gray-500 mb-4">
          LocalWorx.io is a decentralized platform powered by{" "}
          <span className="font-bold">Lightning</span> and{" "}
          <span className="font-bold">Nostr</span>
        </p>
        <p className="text-gray-500 mb-4">
          Our focus is to fire up local economies through word-of-mouth
          marketing, decentralize social media, and Bitcoin micro-payments.
        </p>

        <p className="font-bold capitalize text-gray-500 mb-4">
          Take control of the technology we use
        </p>

        <p className="text-gray-500 mb-8">
          We're all influencers to our friends and families. We create content
          for the benefit of the gatekeepers. LocalWorx.io is here to flip the
          paradigm on its head.
        </p>

        <p className="text-3xl font-bold font-italic mb-8">
          It's OUR data, OUR content, OUR livlihood, OUR money
        </p>
      </section>

      {/* Visitor Type Buttons */}
      <section className="flex flex-col items-center justify-center">
        <ButtonLink
          text="I'm looking for services"
          icon={<FaUser className="h-6 w-6 text-white" />}
          link="/signup"
          color="bg-blue-600" // Custom color for this button
        />

        <ButtonLink
          text="I'm a business owner"
          icon={<FaBriefcase className="h-6 w-6 text-slate-900" />}
          link="/signup"
        />

        <ButtonLink
          text="I'm a promoter"
          icon={<FaBullhorn className="h-6 w-6 text-slate-900" />}
          link="/signup"
        />
      </section>

      {/* Carousel */}
      <section className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center mt-10 px-4">
        <Carousel profiles={profiles} />
      </section>

      {/* Features Header*/}
      <section className="flex flex-col items-center justify-center text-lg">
        <p className="my-4 font-bold text-base">
          🟦 Tools to grow within your local network.
        </p>
        <p className="text-gray-500">
          From listing your services to getting paid for promoting your
          community, LocalWorx.io gives you the infrastructure to grow your
          impct locally and sustainably.
        </p>
        {/* Features Cards */}
        <div className="flex flex-col items-center justify-center mt-10 gap-6 sm:flex-row sm:gap-8">
          {/* Feature Cards */}
          {features.map((feature, index) => (
            <HomeFeaturesCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>
      {/* Vision / Mission */}
      <section className="flex flex-col items-center justify-between text-lg">
        <img
          src="https://images.unsplash.com/photo-1533574508174-2921ef150b1c"
          alt="Main Street"
          className="rounded my-12"
          width={"auto"}
          height={"auto"}
        />

        <h2 className="text-5xl sm:text-4xl md:text-5xl font-bold mb-8">
          A platform built to{" "}
          <span className="font-serif italic">strengthen</span> local
          connections, economies, and opportunities.
        </h2>
        <p className="mb-6 font-bold text-base sm:text-lg">
          🟦 Built for immediate local benefit.
        </p>

        <p className="text-gray-600 mb-6">
          To revitalize local economies and defend digital sovereignty by
          enabling trust-based, peer-to-peer promotion networks.
        </p>

        <p className="text-gray-600 mb-6">
          LocalWorx.io is an innovative platform designed to drive community
          collaboratoin, economic empowerment, and professional growth. As an
          extension of the John Connor Project, LocalWorx encourages digital
          sovereignty and local resilience by providing a decentralized,
          peer-to-peer platform for individuals to connect, do business, and
          thrive. By leveraging the power of Bitcoin and community-driven
          initiatives, LocalWorx aims to create a sustainable ecosystem that
          benefits both individuals and local businesses.
        </p>

        <ButtonLink
          text="Learn more about us"
          icon={
            <FaInfoCircle className="h-6 text-blue-500 w-6 text-blue-500" />
          }
          link="/about"
        />

        <img
          src="https://images.unsplash.com/photo-1627896067004-38a36f39e506"
          alt="Family Shopping"
          className="rounded mb-4 mt-6"
          width={"auto"}
          height={"auto"}
        />

        <div className="flex flex-col mt-10 gap-6 sm:flex-row sm:gap-8">
          {checklistItems.map((item, index) => (
            <HomeCheckListItem
              key={index}
              number={item.number}
              text={item.text}
            />
          ))}
        </div>
      </section>

      {/* Signup Steps */}

      <section className=" min-w-screen px-4 py-8 mt-10 bg-slate-gray-background flex-col items-center justify-center text-lg">
        <h2 className="text-5xl sm:text-6xl font-semibold text-white mb-6">
          Turn your skills into local{" "}
          <span className="font-serif italic">impact</span> in three simple
          steps
        </h2>
        <p className="text-base sm:text-lg font-semibold text-white mb-4">
          ◻️ Join, Share, Thrive
        </p>
        <p className="text-gray-200 capitalize list-disc list-inside space-y-2">
          Discover how quickly you can connect with your community, promote your
          and others' services, and start earning money—all in just a few
          clicks.
        </p>

        {/* Sign up and Earn Steps */}
        <div className="my-8">
          {stepCards.map((step, index) => (
            <div key={index} className="mb-4">
              <StepsCard
                header={step.header}
                step={step.step}
                title={step.title}
                description={step.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="flex flex-col items-center justify-center mt-10 text-lg">
        <h2 className="text-5xl sm:text-6xl font-semibold mb-6">
          Don't take our word for it, here's what our{" "}
          <span className="font-serif italic">users</span> say:
        </h2>
      </section>

      <section></section>
      {/* GitHub CTA */}
      <a
        href="https://github.com/cleph01/localworx"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
      >
        ⭐ Check out the GitHub Repo
      </a>

      {/* Under Construction Note */}
      <p className="mt-6 text-sm text-red-500 italic">
        This site is under active construction.
      </p>
      <p className="mt-6 text-sm text-red-500 italic">
        Join the journey early.
      </p>
    </main>
  );
}
