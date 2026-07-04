import Container from "../components/common/Container";
import PageHeader from "../components/ui/PageHeader";

import AnnouncementList from "../components/announcements/AnnouncementList";

const Announcements = () => {
  return (
    <Container>
      <PageHeader
        title="Announcements"
        subtitle="Latest company updates"
      />

      <AnnouncementList />
    </Container>
  );
};

export default Announcements;