import { FaBriefcase, FaBullhorn, FaUser } from "react-icons/fa";
import ButtonLink from "../ButtonLink";

const VisitorTypeSection = () => {
  return (
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
  );
};

export default VisitorTypeSection;
