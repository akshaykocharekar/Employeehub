import profile from "../data/profile.json";

import Container from "../components/common/Container";
import Card from "../components/common/Card";
import PageHeader from "../components/ui/PageHeader";

const Profile = () => {
  return (
    <Container>
      <PageHeader
        title="Profile"
        subtitle="Employee information"
      />

      <Card>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white">
            {profile.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold">
              {profile.name}
            </h2>

            <p>{profile.role}</p>

            <p>{profile.department}</p>

            <p>{profile.email}</p>

            <p>Joined: {profile.joinDate}</p>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Profile;