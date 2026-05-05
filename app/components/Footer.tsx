import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/posts", label: "Community Posts" },
  { href: "/services-directory", label: "Services Directory" },
  { href: "/promotions", label: "Promotions" },
  { href: "/marketplace", label: "Marketplace" },
];

const Footer = () => {
  return (
    <footer className="w-full px-6 py-12 bg-navy-blue-background text-gray-400">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <Image
              src="/localworx-text-only.svg"
              className="mb-4"
              alt="LocalWorx"
              width={140}
              height={36}
            />
            <p className="text-sm text-gray-500 leading-relaxed">
              A decentralized platform powered by Lightning and Nostr — firing up
              local economies through peer-powered promotion and Bitcoin micro-payments.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
              Navigation
            </h5>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
              Contact
            </h5>
            <ul className="flex flex-col gap-2 text-sm text-gray-400 mb-6">
              <li>
                <a
                  href="mailto:support@localworx.io"
                  className="hover:text-white transition-colors"
                >
                  support@localworx.io
                </a>
              </li>
            </ul>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wide mb-2">
              Newsletter
            </h5>
            <p className="text-sm text-gray-500">
              Stay up to date with promos and announcements.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} LocalWorx. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
