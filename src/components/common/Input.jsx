import clsx from "clsx";

const Input = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}

      <input
        {...props}
        className={clsx(
          `
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-slate-800
          outline-none
          transition-all
          duration-200

          placeholder:text-slate-400

          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-100

          disabled:cursor-not-allowed
          disabled:bg-slate-100
          disabled:opacity-70

          dark:border-slate-700
          dark:bg-slate-800
          dark:text-white
          dark:placeholder:text-slate-500
          dark:focus:ring-indigo-900
          `,
          error &&
            "border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900",
          className
        )}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;