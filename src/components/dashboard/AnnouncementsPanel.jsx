import { useState } from "react";
import { Sparkles, AlertCircle } from "lucide-react";
import announcements from "../../data/announcements.json";

import Card from "../common/Card";
import SectionHeader from "../ui/SectionHeader";
import Button from "../common/Button";

import { summarizeAnnouncement } from "../../services/ai";

const AnnouncementsPanel = () => {
  const latest = announcements.slice(0, 2);

  const [summaries, setSummaries] = useState({});
  const [errors, setErrors] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const generateSummary = async (announcement) => {
    if (summaries[announcement.id]) return;

    try {
      setLoadingId(announcement.id);
      setErrors((prev) => ({ ...prev, [announcement.id]: null }));

      const summary = await summarizeAnnouncement(announcement.body);

      setSummaries((prev) => ({
        ...prev,
        [announcement.id]: summary,
      }));
    } catch {
      setErrors((prev) => ({
        ...prev,
        [announcement.id]: "Couldn't generate a summary. Please try again.",
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
            className="border-b border-slate-200 pb-5 last:border-none dark:border-slate-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {announcement.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {announcement.body}
            </p>

            <Button
              className="mt-4"
              loading={loadingId === announcement.id}
              onClick={() => generateSummary(announcement)}
            >
              {summaries[announcement.id] ? "Summary Generated" : "✨ Summarize"}
            </Button>

            {/* Success: AI-generated summary, visually distinct as "AI content" */}
            {summaries[announcement.id] && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-1 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 duration-300 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  <Sparkles size={14} />
                  AI Summary
                </div>
                <p className="text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-200">
                  {summaries[announcement.id]}
                </p>
              </div>
            )}

            {/* Failure: visually distinct from success, with a retry action */}
            {errors[announcement.id] && (
              <div className="mt-4 flex items-start justify-between gap-3 rounded-xl border border-red-100 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
                <div className="flex items-start gap-2">
                  <AlertCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-red-500 dark:text-red-400"
                  />
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {errors[announcement.id]}
                  </p>
                </div>

                <button
                  onClick={() => generateSummary(announcement)}
                  className="shrink-0 text-sm font-medium text-red-700 underline hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AnnouncementsPanel;