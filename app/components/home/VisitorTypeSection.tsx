// VisitorTypeSection.tsx

import { FaBriefcase, FaBullhorn, FaUser } from "react-icons/fa";
import ButtonLink from "../ButtonLink";

const VisitorTypeSection = () => {
  return (
    <section className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <ButtonLink
        text="I'm looking for services"
        icon={<FaUser className="h-5 w-5 text-white " />}
        link="/signup"
        color="bg-blue-500" // Custom color for this button
      />

      <ButtonLink
        text="I'm a business owner"
        icon={<FaBriefcase className="h-5 w-5 text-blue-500 " />}
        link="/signup"
      />

      <ButtonLink
        text="I'm a promoter"
        icon={<FaBullhorn className="h-5 w-5 text-blue-500 " />}
        link="/signup"
      />
    </section>
  );
};

export default VisitorTypeSection;
