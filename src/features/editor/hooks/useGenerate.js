import { useState, useEffect } from "react";
import aiService from "../../../services/aiService";

export function useGenerate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [regenerateCount, setRegenerateCount] = useState(0);
  const isCoolingDown = false;
  const cooldownSeconds = 0;
  
  const [readmeNote, setReadmeNote] = useState(null);
  const [pendingDraft, setPendingDraft] = useState(null);

  useEffect(() => {
    aiService.getPendingDraft()
      .then(res => { if (res?.hasPendingDraft) setPendingDraft(res.draft); })
      .catch(() => {});
  }, []);

  const discardPendingDraft = async () => {
    try {
      await aiService.discardPendingDraft();
      setPendingDraft(null);
    } catch {
      setError("Failed to discard draft");
    }
  };

  const generate = async (payload) => {
    setLoading(true); setError(null); setReadmeNote(null);
    try {
      const data = await aiService.generate(payload);
      if (data.readmeNote) setReadmeNote(data.readmeNote);
      if (payload.isRegeneration) setRegenerateCount(prev => prev + 1);
      return data.blog;
    } catch (err) {
      const msg = err.response?.data?.message || "Generation failed";
      setError(msg);
      return null;
    } finally { setLoading(false); }
  };

  return {
    generate, loading, error, setError,
    regenerateCount, isCoolingDown, cooldownSeconds,
    readmeNote, pendingDraft, discardPendingDraft
  };
}
