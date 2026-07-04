import Input from "../common/Input";

const departments = [
  "All",
  "Engineering",
  "Design",
  "Management",
  "Human Resources",
  "Quality Assurance",
  "Business",
];

const TeamFilters = ({
  search,
  setSearch,
  department,
  setDepartment,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row">
      <Input
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={department}
        onChange={(e) =>
          setDepartment(e.target.value)
        }
        className="rounded-xl border border-slate-300 px-4"
      >
        {departments.map((dept) => (
          <option key={dept}>{dept}</option>
        ))}
      </select>
    </div>
  );
};

export default TeamFilters;