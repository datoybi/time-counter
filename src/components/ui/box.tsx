import { ReactNode } from "react";

const Box = ({ children, style, ...rest }: { children: ReactNode; style?: string }) => {
  let className = "p-5 text-center rounded-lg shadow-xl";

  if (style) {
    className += ` ${style}`;
  }

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export default Box;
