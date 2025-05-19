// ForeverVisibleSection.tsx
import { FaInfinity } from "react-icons/fa";

const ForeverVisibleSection = () => {
  return (
    <section className="px-4 mt-12 text-center flex flex-col items-center">
      <FaInfinity className="w-10 h-10 text-blue-500 mb-4" />
      <h2 className="text-4xl font-bold mb-4">Content That Lives Forever</h2>
      <p className="text-gray-600 max-w-2xl">
        LocalWorx is built on Nostr, a decentralized network protocol. This
        means your posts don’t just stay on our platform—they’re distributed,
        permanent, and viewable from any Nostr client.
      </p>
      <p className="text-gray-600 max-w-2xl mt-4">
        This ensures long-term visibility, redundancy, and open accessibility
        for everyone involved—businesses, promoters, and everyday users alike.
      </p>
    </section>
  );
};

export default ForeverVisibleSection;
