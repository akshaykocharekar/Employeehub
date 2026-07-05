import { useState } from "react";
import {
  Sparkles,
  LoaderCircle,
  ChevronDown,
  ChevronUp,
  CalendarDays,
} from "lucide-react";

import Card from "../common/Card";
import Button from "../common/Button";

import { summarizeAnnouncement } from "../../services/ai";

const AnnouncementCard = ({ announcement }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const generateSummary = async () => {
    if (summary) {
      setExpanded((prev) => !prev);
      return;
    }

    try {
      setLoading(true);

      const result = await summarizeAnnouncement(`
Title:
${announcement.title}

Date:
${announcement.date}

Content:
${announcement.body}
      `);

      setSummary(result);
      setExpanded(true);
    } catch (err) {
      console.error(err);

      setSummary(
        "⚠️ Unable to generate summary. Please try again."
      );

      setExpanded(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-6 p-2">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {announcement.title}
            </h2>

            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 line-clamp-4">
              {announcement.body}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
            <CalendarDays size={15} />
            {announcement.date}
          </div>
        </div>

        {/* AI Button */}
        <Button
          onClick={generateSummary}
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white transition-all duration-300 hover:bg-indigo-700 sm:w-fit"
        >
          {loading ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
              Generating Summary...
            </>
          ) : (
            <>
              <Sparkles
                size={18}
                className="transition-transform duration-300 group-hover:rotate-12"
              />

              {summary
                ? expanded
                  ? "Hide AI Summary"
                  : "Show AI Summary"
                : "Generate AI Summary"}

              {summary &&
                (expanded ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                ))}
            </>
          )}
        </Button>

        {/* Summary */}
        {summary && (
          <div
            className={`overflow-hidden transition-all duration-500 ${
              expanded
                ? "max-h-[600px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-6 dark:border-indigo-500/30 dark:from-indigo-500/10 dark:to-violet-500/10">

              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-indigo-500 p-2 text-white">
                  <Sparkles size={16} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    AI Summary
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Generated using Gemini AI
                  </p>
                </div>
              </div>

              <div className="whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-300">
                {summary}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AnnouncementCard;