import Image from "next/image";

const Footer = () => {
  return (
    <section className="p-4 min-w-screen bg-navy-blue-background text-gray-400 text-lg">
      <Image
        src="/localworx-text-only.svg"
        className="my-6"
        alt=""
        width={150}
        height={75}
      />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est excepturi
        pariatur cum atque quis quibusdam, nesciunt earum voluptate harum esse
        ea vel sequi at molestias iusto magni error quidem delectus.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
        <div>
          <h5 className="text-white font-bold text-xl">Navigation</h5>
          <p>Home</p>
          <p>About</p>
          <p>Services Directory</p>
          <p>Promoter Hub</p>
          <p>Marketplace</p>
          <p>Help</p>
        </div>

        <div>
          <h5 className="text-white font-bold text-xl">Contact</h5>
          <p>support@localworx.io</p>
          <p>(212)555-5555</p>
        </div>

        <div>
          <h5 className="text-white font-bold text-xl">Newsletter</h5>
          {/* Add Newsletter component */}
          <p>Stay up to date with promos and announcements</p>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <p className="font-bold">
          &copy; {new Date().getFullYear()} LocalWorx. All Rights Reserved
        </p>
      </div>
    </section>
  );
};
export default Footer;
