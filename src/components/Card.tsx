import { ReactNode, FC, ComponentPropsWithoutRef } from "react";
import clsxm from "@riverfl0w/clsxm";

interface CardProps extends ComponentPropsWithoutRef<"section"> {
  children: ReactNode;
  title?: string;
}

const Card: FC<CardProps> = ({ children, className, title }) => {
  return (
    <section
      className={clsxm(" bg-indigo-500 rounded-2xl p-auto flex flex-col drop-shadow-xl h-1/2 min-w-[20rem] p-5", className)}
    >
      <h1 className="text-xl text-slate-50 uppercase font-bold text-center my-auto">
        {title}
      </h1>
      <div className="flex flex-col px-4 w-full m-auto mt-0 justify-center gap-2 self-center">
        {children}
      </div>
    </section>
  );
};

export default Card;
