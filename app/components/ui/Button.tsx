type ButtonDetails = {
  css: string;
  text: string;
};

const Button = ({ details }: { details: ButtonDetails }) => {
  return (
    <div
      className={`${details.css} block text-center rounded-lg shadow-lg transition duration-300`}
    >
      {details.text}
    </div>
  );
};
export default Button;
