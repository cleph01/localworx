type ButtonDetails = {
  css: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({ details }: { details: ButtonDetails }) => {
  return (
    <button
      type={details.type ?? "button"}
      onClick={details.onClick}
      disabled={details.disabled}
      className={`${details.css} block w-full text-center rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {details.text}
    </button>
  );
};

export default Button;
