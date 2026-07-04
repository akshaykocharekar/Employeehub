import Card from "../common/Card";

const TeamCard = ({ member }) => {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
          {member.name
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </div>

        <div>
          <h2 className="font-semibold">
            {member.name}
          </h2>

          <p className="text-sm text-slate-500">
            {member.role}
          </p>

          <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs">
            {member.department}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default TeamCard;