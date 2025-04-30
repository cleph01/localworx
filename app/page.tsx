import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center px-6 py-12">
      {/* Coming Soon Badge */}
      <div className="bg-yellow-400 text-black text-sm px-3 py-1 rounded-full mb-4">
        🚧 Coming Soon
      </div>

      {/* Hero Image */}
      <Image
        src="/localworx-logo.jpg"
        alt="LocalWorx Logo"
        className="w-48 h-auto mb-6 rounded-lg shadow-lg"
      />

      {/* Title & Tagline */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        LocalWorx.io
      </h1>
      <p className="text-lg text-gray-300 text-center capitalize max-w-xl mb-8">
        A peer-powered platform to grow small businesses, reward local promoters
        with Bitcoin, and build resilient communities.
      </p>

      {/* Vision / Mission */}
      <section className="text-center max-w-2xl space-y-4">
        <h2 className="text-2xl font-semibold">🚀 Our Vision</h2>
        <p className="text-gray-400 capitalize">
          To revitalize local economies and defend digital sovereignty by
          enabling trust-based, peer-to-peer promotion networks.
        </p>

        <h2 className="text-2xl font-semibold mt-6">🔍 Our Mission</h2>
        <ul className="text-gray-400 capitalize list-disc list-inside">
          <li>Empower small businesses with transparent promotion tools</li>
          <li>Enable locals to earn by supporting their community</li>
          <li>Operate without centralized gatekeepers or ad algorithms</li>
        </ul>
      </section>

      {/* GitHub CTA */}
      <a
        href="https://github.com/cleph01/localworx"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
      >
        ⭐ Check out the GitHub Repo
      </a>

      {/* Under Construction Note */}
      <p className="mt-6 text-sm text-red-500 italic">
        This site is under active construction. <br /> Join the journey early.
      </p>
    </main>
  );
}
