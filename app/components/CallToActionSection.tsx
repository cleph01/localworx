// components/home/CallToActionSection.tsx
import { FaAngleRight } from "react-icons/fa";
import Image from "next/image";

const CallToActionSection = () => {
  return (
    <section className="p-4 min-w-screen text-gray-900 bg-[url('https://images.unsplash.com/photo-1672766113353-1888bf37a41c?w=800&auto=format&fit=crop')]">
      <p className="w-40 py-1 px-2 mb-6 rounded font-bold text-base sm:text-lg text-white">
        Get Started
      </p>
      <h2 className="mt-10 py-2 px-2 bg-gray-400/66 rounded text-5xl sm:text-4xl md:text-5xl font-bold mb-8">
        Start <span className="font-serif italic">Earning</span>, Promoting, and
        Energizing Locally
      </h2>
      <p className="py-1 px-2 bg-gray-400/66 rounded font-bold text-lg">
        Join a growing community where your skills, services, and support help
        power local success.
      </p>
      {/* Button */}
      <div className="w-full my-8 p-2 shadow-lg inline-flex items-center justify-center rounded bg-blue-600 text-white font-bold text-xl">
        Create an account{" "}
        <span className="ml-2">
          <FaAngleRight />
        </span>
      </div>
      {/* Avatar stack */}
      <div className="mb-8 flex -space-x-2 overflow-hidden">
        <img
          className="inline-block size-15 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block size-15 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block size-15 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block size-15 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block size-15 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <p className="font-bold py-1 px-2 bg-gray-400/75 rounded">
        {" "}
        Trusted by 5k+ workers locally
      </p>
    </section>
  );
};

export default CallToActionSection;
