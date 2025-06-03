import { ReactNode } from "react";

type AvatarWrapperProps = {
  css: string;
  children: ReactNode;
};

const AvatarWrapper = ({ css, children }: AvatarWrapperProps) => {
  return (
    <>
      <div
        className={`aspect-square rounded-full bg-base-100 flex items-center justify-center select-none relative ${css}`}
      >
        <div className="w-full rounded-full overflow-hidden aspect-square not-prose">
          {children}
        </div>
      </div>
    </>
  );
};

export default AvatarWrapper;
