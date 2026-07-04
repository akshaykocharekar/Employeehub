import TeamCard from "./TeamCard";

const TeamGrid = ({ members }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <TeamCard
          key={member.id}
          member={member}
        />
      ))}
    </div>
  );
};

export default TeamGrid;