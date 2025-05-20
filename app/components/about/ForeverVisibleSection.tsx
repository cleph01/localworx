// ForeverVisibleSection.tsx
import { FaInfinity } from "react-icons/fa";

const ForeverVisibleSection = () => {
  return (
    <section className="px-4 pb-8 mt-12 flex flex-col items-center">
      <FaInfinity className="w-10 h-10 text-blue-500 mb-4" />
      <h2 className="text-4xl font-bold mb-4">Content That Lives Forever</h2>
      <p className="text-gray-600 text-lg font-semibold capitalize max-w-2xl">
        LocalWorx is built on Nostr, a decentralized network protocol.
      </p>
      <p className="text-gray-600 text-lg max-w-2xl mt-4"></p>
      <ol className="text-gray-600 text-left text-lg max-w-2xl mt-4 space-y-2">
        <li className="">This means:</li>
        <li className="list-disc">
          <span className="font-semibold">No Censorship:</span> Your content is
          not subject to the whims of any single platform or authority.
        </li>
        <li className="list-disc">
          <span className="font-semibold">No Deletion:</span> Once you post,
          it’s permanent. Your content can’t be deleted or hidden by anyone.
        </li>
        <li className="list-disc">
          <span className="font-semibold">No Intermediaries:</span> You control
          your content, how it’s shared, and the amount you can earn. No
          middlemen taking a cut or controlling your reach.
        </li>
      </ol>
      <p className="text-gray-600 text-lg max-w-2xl mt-4">
        With LocalWorx, you’re not just posting to a single platform. Your
        content is distributed across the Nostr network, ensuring that it’s
        accessible to anyone who wants to see it on any Nostr client.
      </p>
      <p className="text-gray-600 font-semibold text-lg max-w-2xl mt-4">
        This ensures long-term visibility, redundancy, and open accessibility
        for everyone involved—businesses, promoters, and everyday users alike.
      </p>
    </section>
  );
};

export default ForeverVisibleSection;
