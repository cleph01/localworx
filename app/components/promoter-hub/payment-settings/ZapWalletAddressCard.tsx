import { FaRegCopy, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { ZapWallAddressCardProps } from "./ZapWalletAddressCardTypes";

const ZapWallAddressCard = ({ address }: ZapWallAddressCardProps) => {
  return (
    <div className="flex flex-col gap-2 border-b border-gray-400">
      <div className="py-2 px-4 flex flex-row items-center justify-between border border-gray-400 rounded">
        <div>{address}</div>
        <div className="flex items-center justify-center text-gray-500 p-2 rounded cursor-pointer hover:bg-gray-200 transition duration-300">
          <FaRegCopy className="mr-2" /> Copy
        </div>
      </div>

      <div className="flex flex-row items-center justify-between px-2 pb-2 rounded">
        <div className="px-2 py-1 text-gray-500 border border-gray-400 rounded hover:cursor-pointer">
          Verify
        </div>
        <div className="flex flex-row items-center">
          <div className="px-2 py-1 mr-4 text-gray-500 hover:cursor-pointer">
            <FaRegEdit />
          </div>
          <div className="px-2 py-1 text-red-500 hover:cursor-pointer">
            <FaRegTrashAlt />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ZapWallAddressCard;
