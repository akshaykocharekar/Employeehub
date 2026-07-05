import { useMemo, useState } from "react";
import { Search, FileText } from "lucide-react";

import announcements from "../../data/announcements.json";
import AnnouncementCard from "./AnnouncementCard";

const AnnouncementList = () => {
  const [search, setSearch] = useState("");

  const filteredAnnouncements = useMemo(() => {
    if (!search.trim()) return announcements;

    const query = search.toLowerCase();

    return announcements.filter(
      (announcement) =>
        announcement.title.toLowerCase().includes(query) ||
        announcement.body.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div className="space-y-8">

      {/* Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:max-w-lg">

          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-slate-300
              bg-white
              pl-12
              pr-4
              text-sm
              shadow-sm
              outline-none
              transition-all
              duration-300
              placeholder:text-slate-400
              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-500/10
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
              dark:placeholder:text-slate-500
            "
          />
        </div>

        <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
          <FileText size={16} />
          {filteredAnnouncements.length} Announcement
          {filteredAnnouncements.length !== 1 && "s"}
        </div>

      </div>

      {/* Announcement Cards */}
      {filteredAnnouncements.length ? (
        <div className="grid gap-6">
          {filteredAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/10">
            <Search
              size={34}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </div>

          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            No announcements found
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            We couldn't find any announcements matching your search.
            Try using different keywords or clear the search.
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;