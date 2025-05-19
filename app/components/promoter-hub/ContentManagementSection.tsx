import Button from "../ui/Button";
import ListingsSection from "./content-management/ContentListings";
import ContentFilterHeader from "./content-management/ContentFilterHead";

// Sample data for the button
const buttonData = {
  css: "mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold",
  text: "Create a new post",
};

const ContentManagementSection = () => {
  return (
    <section className="flex flex-col gap-4 px-4">
      <div className="flex flex-col border rounded border-gray-400 p-4 space-y-4">
        <h2 className="text-2xl font-bold">Content Management</h2>

        {/* Filter Header */}
        <ContentFilterHeader />
      </div>

      {/* Create New Post Button */}
      <div className="my-4">
        <Button
          details={{
            css: buttonData.css,
            text: buttonData.text,
          }}
        />
      </div>

      {/* Listings Section */}
      <ListingsSection />
    </section>
  );
};
export default ContentManagementSection;
