import clsx from "clsx";

const Card = ({ children, className = "", onClick }) => {
  const isInteractive = Boolean(onClick);

  const handleKeyDown = (e) => {
    if (!isInteractive) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      className={clsx(
        `
        group
        relative
        rounded-2xl
        border
        border-slate-200/80
        bg-white
        p-6
        shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]
        transition-all
        duration-300
        ease-out

        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-12px_rgba(0,0,0,0.4)]
        `,
        isInteractive &&
          `
          cursor-pointer
          hover:-translate-y-1
          hover:border-indigo-200
          hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_32px_-12px_rgba(99,102,241,0.25)]
          active:translate-y-0
          active:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_16px_-8px_rgba(99,102,241,0.2)]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-indigo-500
          focus-visible:ring-offset-2
          dark:hover:border-indigo-500/50
          dark:focus-visible:ring-offset-slate-900
          `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;