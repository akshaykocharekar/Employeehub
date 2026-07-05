import clsx from "clsx";

const Container = ({
  children,
  className,
  fluid = false,
}) => {
  return (
    <section
      className={clsx(
        "w-full py-6 sm:py-8",
        fluid
          ? "px-4 sm:px-6 lg:px-8"
          : "mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 xl:px-10",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Container;