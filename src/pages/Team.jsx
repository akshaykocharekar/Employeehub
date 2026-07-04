import { useMemo, useState } from "react";

import team from "../data/team.json";

import Container from "../components/common/Container";
import PageHeader from "../components/ui/PageHeader";

import TeamFilters from "../components/team/TeamFilters";
import TeamGrid from "../components/team/TeamGrid";

const Team = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const filteredMembers = useMemo(() => {
    return team.filter((member) => {
      const matchesSearch = member.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" ||
        member.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [search, department]);

  return (
    <Container>
      <PageHeader
        title="Team Directory"
        subtitle="Browse all employees"
      />

      <TeamFilters
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
      />

      <TeamGrid members={filteredMembers} />
    </Container>
  );
};

export default Team;