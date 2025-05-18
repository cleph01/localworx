import { FaBtc } from "react-icons/fa";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import {
  WithdrawalContentType,
  WithdrawalFooterType,
  WithdrawalHeaderType,
} from "./earningSummaryTypes";

// Sample data for the Available For Withdrawal Card
const withdrawalData = {
  title: "Available For Withdrawal",
  description: "You can withdraw this amount",
  amount: "100.00",
};

// Sample data for the button
const buttonData = {
  css: "py-2 bg-green-600 hover:bg-green-700 text-white text-lg font-bold",
  text: "Withdraw balance",
};

const AvailableForWithdrawalCard = () => {
  /* Available For Withdrawal Card */
  const { title, description, amount } = withdrawalData;

  return (
    <Card
      Header={<WithdrawalHeader {...withdrawalData} />}
      Content={<WithdrawalContent {...withdrawalData} />}
      Footer={<WithdrawalFooter css={buttonData.css} text={buttonData.text} />}
      className="w-full max-w-sm"
    />
  );
};
export default AvailableForWithdrawalCard;

const WithdrawalHeader = ({ amount }: WithdrawalHeaderType) => (
  // Withdrawal Amount
  <div className="font-bold inline-flex items-center text-2xl">
    <span className="">
      <FaBtc className="text-orange-500" />
    </span>
    {amount}
  </div>
);

const WithdrawalContent = ({ description }: WithdrawalContentType) => (
  // Withdrawal Description
  <div className="inline-flex text-gray-400 font-semibold">{description}</div>
);

const WithdrawalFooter = ({ css, text }: WithdrawalFooterType) => (
  // Withdrawal Button
  <Button
    details={{
      css: css,
      text: text,
    }}
  />
);
