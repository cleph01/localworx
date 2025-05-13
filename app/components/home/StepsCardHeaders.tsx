import { FaAngleRight, FaBtc } from "react-icons/fa";

export const CreateAccount = () => {
  return (
    <div className="p-2 shadow-lg inline-flex items-center justify-center rounded-lg bg-blue-600 text-white">
      Create an account{" "}
      <span className="ml-2">
        <FaAngleRight />
      </span>
    </div>
  );
};

export const CommunityConnect = () => {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      <img
        className="inline-block size-15 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block size-15 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block size-15 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block size-15 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block size-15 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
  );
};

export const EarningSnapshot = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center ">
        <div className="flex flex-row justify-between">
          <FaBtc />
          5024<span className="text-xs">.75</span>
          <div className="w-15 text-gray-400 text-sm">
            Balance available for withdrawal
          </div>
        </div>
      </div>
      <div className="p-2 my-6 shadow-lg inline-flex items-center justify-center rounded-lg bg-green-600 text-white">
        Withdraw balance
      </div>
    </div>
  );
};
