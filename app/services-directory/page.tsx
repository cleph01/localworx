import SearchBarSection from "../components/services-directory/SearchBarSection";
import PageHeader from "../components/ui/PageHeader";

const ServicesDirectoryPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 pb-12 ">
      {/* Page Header */}
      <PageHeader />

      {/* Search Section */}
      <SearchBarSection />
      <div>testing services directory page</div>
    </main>
  );
};

export default ServicesDirectoryPage;
