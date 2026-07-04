import { useState } from "react";
import {
  Sparkles,
  LoaderCircle,
  ChevronDown,
  ChevronUp,
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

      const result = await summarizeAnnouncement(
        `
Title:
${announcement.title}

Date:
${announcement.date}

Content:
${announcement.body}
`
      );

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
    <Card>
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {announcement.title}
            </h2>

            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
              {announcement.date}
            </span>
          </div>

          <p className="mt-4 leading-7 text-slate-600">
            {announcement.body}
          </p>
        </div>

        <Button
          onClick={generateSummary}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
              Generating...
            </>
          ) : summary ? (
            <>
              <Sparkles size={18} />
              {expanded
                ? "Hide Summary"
                : "Show Summary"}

              {expanded ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate AI Summary
            </>
          )}
        </Button>

        {summary && expanded && (
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-indigo-600"
              />

              <h3 className="font-semibold text-indigo-700">
                Gemini Summary
              </h3>
            </div>

            <div className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {summary}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AnnouncementCard;