import Card from "../common/Card";

const StatsCard = ({
  title,
  value,
  subtitle,
  Icon,
  iconBg = "bg-indigo-100",
  iconColor = "text-indigo-600",
  trend,
}) => {
  return (
    <Card className="group cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}

          {trend}
        </div>

        {Icon && (
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${iconBg}`}
          >
            <Icon
              size={28}
              className={iconColor}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;