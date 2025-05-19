import { ReactNode } from "react";
import Button from "../../ui/Button";

const buttonData = {
  css: "mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold",
  text: "Add New Bitcoin Wallet",
};
const AddNewWallet = () => (
  <Button
    details={{
      css: buttonData.css,
      text: buttonData.text,
    }}
  />
);
export default AddNewWallet;
