const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;