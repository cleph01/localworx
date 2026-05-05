import Link from "next/link";
import { FaBriefcase, FaTags, FaUser } from "react-icons/fa";

const VisitorTypeSection = () => {
  return (
    <section className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 py-12">
      <Link
        href="/services-directory"
        className="inline-flex items-center justify-center gap-2 w-72 px-6 py-3 text-lg font-semibold text-white bg-brand-orange rounded-xl shadow-lg hover:bg-orange-600 transition duration-300"
      >
        <FaUser className="h-5 w-5" />
        I'm looking for services
      </Link>

      <Link
        href="/auth"
        className="inline-flex items-center justify-center gap-2 w-72 px-6 py-3 text-lg font-semibold text-white bg-navy-blue-background rounded-xl shadow-lg hover:opacity-80 transition duration-300"
      >
        <FaBriefcase className="h-5 w-5" />
        I'm a business owner
      </Link>

      <Link
        href="/marketplace"
        className="inline-flex items-center justify-center gap-2 w-72 px-6 py-3 text-lg font-semibold text-white bg-navy-blue-background rounded-xl shadow-lg hover:opacity-80 transition duration-300"
      >
        <FaTags className="h-5 w-5" />
        Browse the Marketplace
      </Link>
    </section>
  );
};

export default VisitorTypeSection;
