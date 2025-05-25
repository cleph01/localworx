// CallToActionSection.tsx
import ButtonLink from "../ButtonLink";
import { FaBullhorn, FaBriefcase, FaTags } from "react-icons/fa";

const CallToActionSection = () => {
  return (
    <section className="bg-blue-50 py-12 px-4 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-4">
        Ready to <span className="font-serif italic">promote</span> or{" "}
        <span className="font-serif italic">get promoted</span>?
      </h2>

      <p className="text-gray-600 text-lg max-w-2xl mb-8">
        Whether you're a business looking to boost visibility, a promoter
        looking to earn Bitcoin, or a bargain-hunter seeking local deals — the
        LocalWorx economy has something for you.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <ButtonLink
          text="I'm a Business Owner"
          link=""
          icon={<FaBriefcase className="h-5 w-5 text-white" />}
          color="bg-blue-500"
        />
        <ButtonLink
          text="I'm a Promoter"
          link=""
          icon={<FaBullhorn className="h-5 w-5 text-white" />}
          color="bg-slate-700"
        />
        <ButtonLink
          text="Browse the Marketplace"
          link="/marketplace"
          icon={<FaTags className="h-5 w-5 text-white" />}
          color="bg-green-600"
        />
      </div>
    </section>
  );
};

export default CallToActionSection;
