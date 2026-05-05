import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

const CallToActionSection = () => {
  return (
    <section
      className="w-full px-6 py-16"
      style={{
        background: "linear-gradient(135deg, #091f36 0%, #0d2d50 60%, #0f3660 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-brand-orange text-sm font-semibold uppercase tracking-widest mb-4">
          Get Started
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Start <span className="font-serif italic text-brand-orange">Earning</span>,
          Promoting, and Energizing Locally
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl">
          Join a growing community where your skills, services, and support help
          power local success.
        </p>

        <Link
          href="/auth"
          className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-bold text-base px-6 py-3 rounded-xl transition-colors shadow-lg"
        >
          Create an account <FaAngleRight />
        </Link>

        {/* Social proof */}
        <div className="mt-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[
              "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-9 h-9 rounded-full ring-2 ring-navy-blue-background object-cover"
              />
            ))}
          </div>
          <p className="text-white/60 text-sm font-medium">
            Trusted by local businesses and promoters
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
