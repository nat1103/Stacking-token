import clsxm from "@riverfl0w/clsxm";
import { type ComponentPropsWithoutRef, type FC } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

const Button: FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={clsxm(
        "py-1 px-2 rounded-lg bg-black text-white disabled:bg-neutral-400 hover:bg-neutral-800 active:bg-indigo-700",
        className
      )}
      {...props}
    />
  );
};

export default Button;
