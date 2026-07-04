import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import announcements from "../../data/announcements.json";

import AnnouncementCard from "./AnnouncementCard";

const AnnouncementList = () => {
  const [search, setSearch] = useState("");

  const filteredAnnouncements = useMemo(() => {
    if (!search.trim()) return announcements;

    return announcements.filter((announcement) => {
      const query = search.toLowerCase();

      return (
        announcement.title.toLowerCase().includes(query) ||
        announcement.body.toLowerCase().includes(query)
      );
    });
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search announcements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500"
        />
      </div>

      {filteredAnnouncements.length > 0 ? (
        filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
          />
        ))
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-700">
            No announcements found
          </h3>

          <p className="mt-2 text-slate-500">
            Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;