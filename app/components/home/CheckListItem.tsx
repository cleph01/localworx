import { FaCheck } from "react-icons/fa";

type ChecklistProps = {
  number: string;
  text: string;
};

const CheckList: React.FC<ChecklistProps> = ({ number, text }) => {
  return (
    <div className="flex flex-row items-center justify-center mt-10 gap-6 sm:flex-row sm:gap-8">
      <div className="mr-2">
        <FaCheck className="h-6 w-6 text-blue-500" />
      </div>
      <div>
        <span className="font-bold">{number}</span> {text}
      </div>
    </div>
  );
};
export default CheckList;
