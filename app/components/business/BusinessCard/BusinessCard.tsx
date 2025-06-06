import Card from "../../ui/Card";
//* This component is a part of the services-directory page and the dashboard page.
//* It displays a business card with the business details.
import BusinessCardHeader from "./BusinessCardHeader";
import BusinessCardContent from "./BusinessCardContent";
import BusinessCardFooter from "./BusinessCardFooter";

type Business = {
  id: string;
  // Description
  description: string;
  // Wallet-related fields
  pairing_uri_encrypted: string;
  wallet_created: boolean;
  wallet_id: string;
  // Basic info
  business_name: string;
  address: string;
  city: string;
  state: string; // Two-letter state abbreviation
  phone: string;
  email: string;
  email_verified: boolean;
  website: string;
  logo_url: string;
  // Promoter hiring flag
  hiring_promoters: boolean;
  // Coordinates
  latitude: number;
  longitude: number;
  // Foreign keys
  owner_id: string;
  category_id: string;
  // Timestamps
  created_at: string; // Use Date if you prefer native Date objects
  updated_at: string;
};

type BusinessCardProps = {
  business: Business;
  clientSideFetch?: boolean;
};

const BusinessCard = ({ business, clientSideFetch }: BusinessCardProps) => {
  return (
    <Card
      Header={
        <BusinessCardHeader {...business} clientSideFetch={clientSideFetch} />
      }
      Content={
        <BusinessCardContent {...business} clientSideFetch={clientSideFetch} />
      }
      Footer={
        <BusinessCardFooter
          {...business}
          clientSideFetch={clientSideFetch}
          category_id={business.category_id ?? ""}
        />
      }
      css="w-full max-w-sm border border-gray-200 transition-shadow hover:shadow-xl"
    />
  );
};
export default BusinessCard;
