import clsx from "clsx";
import { LoaderCircle } from "lucide-react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  loading = false,
}) => {
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",

    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",

    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
    >
      {loading && (
        <LoaderCircle
          size={18}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
};

export default Button;