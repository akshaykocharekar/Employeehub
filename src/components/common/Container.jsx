import clsx from "clsx";

const Container = ({
  children,
  className = "",
  fluid = false,
}) => {
  return (
    <section
      className={clsx(
        "w-full",
        fluid ? "px-4 md:px-6 lg:px-8" : "mx-auto max-w-7xl px-4 md:px-6 lg:px-8",
        "py-6",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Container;