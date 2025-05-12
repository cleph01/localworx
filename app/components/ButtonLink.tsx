import Link from "next/link";

type ButtonProps = {
  text: string; // Text for the button
  emoji?: string; // Optional emoji for the button
  icon?: React.ReactNode; // Optional Heroicon or other React component for the button
  link: string; // URL to redirect to
  color?: string; // Optional background color for the button
  size?: "sm" | "md" | "lg"; // Optional size prop
};

const ButtonLink: React.FC<ButtonProps> = ({
  text,
  emoji,
  icon,
  link,
  color = "bg-white-600",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-64 px-4 py-2 text-sm", // Small button with fixed width of 6rem
    md: "w-72 px-6 py-3 text-lg", // Medium button with fixed width of 8rem
    lg: "w-80 px-8 py-4 text-xl", // Large button with fixed width of 10rem
  };

  return (
    <Link
      href={link}
      className={`mb-6 shadow-lg inline-flex items-center justify-center rounded-lg ${
        color == "bg-white-600" ? "text-slate-900" : "text-white"
      } ${sizeClasses[size]} ${color} hover:${color.replace(
        "600",
        "700"
      )} transition duration-300`}
    >
      {/* Render either emoji or icon */}
      {emoji && <span className="mr-2 text-lg">{emoji}</span>}
      {icon && <span className="mr-2">{icon}</span>} {/* Render icon */}
      {text}
    </Link>
  );
};

export default ButtonLink;
