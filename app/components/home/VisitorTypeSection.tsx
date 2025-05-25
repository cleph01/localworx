// VisitorTypeSection.tsx

import { FaBriefcase, FaBullhorn, FaTags, FaUser } from "react-icons/fa";
import ButtonLink from "../ButtonLink";

const VisitorTypeSection = () => {
  return (
    <section className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <ButtonLink
        text="I'm looking for services"
        icon={<FaUser className="h-5 w-5 text-white " />}
        link="/services-directory"
        color="bg-blue-500" // Custom color for this button
      />

      <ButtonLink
        text="I'm a business owner"
        icon={<FaBriefcase className="h-5 w-5 text-white" />}
        color="bg-slate-700"
        link=""
      />

      <ButtonLink
        text="Browse the Marketplace"
        link="/marketplace"
        icon={<FaTags className="h-5 w-5 text-white" />}
        color="bg-green-600"
      />
    </section>
  );
};

export default VisitorTypeSection;
