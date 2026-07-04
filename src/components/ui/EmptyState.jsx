const EmptyState = ({ title, description }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;