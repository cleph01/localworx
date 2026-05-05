type ChecklistProps = {
  number: string;
  text: string;
};

const CheckList: React.FC<ChecklistProps> = ({ number, text }) => {
  return (
    <div className="flex flex-col items-start p-6 bg-gray-50 rounded-xl border border-gray-100">
      <span className="text-4xl font-bold text-brand-orange mb-2">{number}</span>
      <span className="text-gray-600 text-sm">{text}</span>
    </div>
  );
};

export default CheckList;
