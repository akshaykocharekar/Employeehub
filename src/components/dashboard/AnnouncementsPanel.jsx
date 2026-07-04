import { useState } from "react";
import announcements from "../../data/announcements.json";

import Card from "../common/Card";
import SectionHeader from "../ui/SectionHeader";
import Button from "../common/Button";

import { summarizeAnnouncement } from "../../services/ai";

const AnnouncementsPanel = () => {
  const latest = announcements.slice(0, 2);

  const [summaries, setSummaries] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const generateSummary = async (announcement) => {
    if (summaries[announcement.id]) return;

    try {
      setLoadingId(announcement.id);

      const summary = await summarizeAnnouncement(
        announcement.body
      );

      setSummaries((prev) => ({
        ...prev,
        [announcement.id]: summary,
      }));
    } catch {
      setSummaries((prev) => ({
        ...prev,
        [announcement.id]:
          "Unable to generate summary.",
      }));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card>
      <SectionHeader title="Latest Announcements" />

      <div className="space-y-6">
        {latest.map((announcement) => (
          <div
            key={announcement.id}
            className="border-b border-slate-200 pb-5 last:border-none"
          >
            <h3 className="font-semibold">
              {announcement.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {announcement.body}
            </p>

            <Button
              className="mt-4"
              loading={loadingId === announcement.id}
              onClick={() =>
                generateSummary(announcement)
              }
            >
              {summaries[announcement.id]
                ? "Summary Generated"
                : "✨ Summarize"}
            </Button>

            {summaries[announcement.id] && (
              <div className="mt-4 rounded-xl bg-slate-100 p-4 text-sm whitespace-pre-wrap">
                {summaries[announcement.id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AnnouncementsPanel;