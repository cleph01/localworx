import { ReactNode } from "react";

type HeaderImageWrapperProps = {
  css: string;
  children: ReactNode;
};

const HeaderImageWrapper = ({ css, children }: HeaderImageWrapperProps) => {
  return (
    <>
      <div
        className={`flex items-center justify-center aspect-square rounded-xl bg-base-100 select-none relative ${css}`}
      >
        <div className="w-full rounded-xl overflow-hidden aspect-square not-prose">
          {children}
        </div>
      </div>
    </>
  );
};

export default HeaderImageWrapper;
