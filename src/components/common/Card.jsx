import clsx from "clsx";

const Card = ({ children, className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        `
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        dark:border-slate-700
        dark:bg-slate-800
        dark:hover:border-indigo-500
        `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;