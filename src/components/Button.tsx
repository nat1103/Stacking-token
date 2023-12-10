import clsxm from "@riverfl0w/clsxm";
import { type ComponentPropsWithoutRef, type FC } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

const Button: FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={clsxm(
        "py-1 px-2 border  rounded-lg bg-quaternary text-white disabled:bg-slate-400 disabled:border-slate-200",
        className
      )}
      {...props}
    />
  );
};

export default Button;
