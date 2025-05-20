// VisitorTypeSection.tsx

import { FaBriefcase, FaBullhorn, FaUser } from "react-icons/fa";
import ButtonLink from "../ButtonLink";

const VisitorTypeSection = () => {
  return (
    <section className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <ButtonLink
        text="I'm looking for services"
        icon={<FaUser className="h-6 w-6 text-white mr-2" />}
        link="/signup"
        color="bg-blue-500" // Custom color for this button
      />

      <ButtonLink
        text="I'm a business owner"
        icon={<FaBriefcase className="h-6 w-6 text-blue-500 mr-2" />}
        link="/signup"
      />

      <ButtonLink
        text="I'm a promoter"
        icon={<FaBullhorn className="h-6 w-6 text-blue-500 mr-2" />}
        link="/signup"
      />
    </section>
  );
};

export default VisitorTypeSection;
