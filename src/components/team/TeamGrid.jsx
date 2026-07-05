import { Users } from "lucide-react";
import TeamCard from "./TeamCard";

const TeamGrid = ({ members }) => {
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 py-16 text-center dark:border-slate-700">
        <Users size={28} className="text-slate-300 dark:text-slate-600" />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No team members match your search
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <TeamCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default TeamGrid;