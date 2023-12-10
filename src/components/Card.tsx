import { ReactNode, FC, ComponentPropsWithoutRef } from "react";
import clsxm from "@riverfl0w/clsxm";

interface CardProps extends ComponentPropsWithoutRef<"section"> {
  children: ReactNode;
  title?: string;
}

const Card: FC<CardProps> = ({ children, className, title }) => {
  return (
    <section
      className={clsxm(" bg-tertiary rounded-xl p-2 flex flex-col", className)}
    >
      <h1 className="text-xl text-slate-50 uppercase font-bold pb-2 text-center">
        {title}
      </h1>
      <div className="flex flex-col px-4 m-auto justify-center gap-2 self-center">
        {children}
      </div>
    </section>
  );
};

export default Card;
