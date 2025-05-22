type ButtonDetails = {
  css: string;
  text: string;
};

const Button = ({ details }: { details: ButtonDetails }) => {
  return (
    <div
      className={`${details.css} block text-center rounded-lg shadow-lg transition duration-300 cursor-pointer`}
    >
      {details.text}
    </div>
  );
};
export default Button;
