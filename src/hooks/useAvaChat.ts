import { useCallback, useMemo, useRef, useState } from 'react';
import { askAva, greeting, SUGGESTED_QUESTIONS, toAvaPhase, type AvaContext } from '../lib/ava';

export interface ChatMessage {
  id: number;
  role: 'ava' | 'user';
  text: string;
}

/**
 * Conversation with Ava for the current cycle context.
 * The greeting is always derived from live data; the exchange that follows is kept for the
 * session and starts over when the date, phase or cycle day changes.
 */
export function useAvaChat(ctx: AvaContext) {
  const contextKey = `${ctx.date}|${ctx.phase}|${ctx.cycleDay}`;
  const [chat, setChat] = useState<{ key: string; messages: ChatMessage[] }>({ key: contextKey, messages: [] });
  const [pending, setPending] = useState(false);
  const nextId = useRef(1);

  // Cycle context changed (e.g. a new period was logged) — previous answers no longer apply
  if (chat.key !== contextKey) setChat({ key: contextKey, messages: [] });

  const append = useCallback((role: ChatMessage['role'], text: string) => {
    const message = { id: nextId.current++, role, text };
    setChat((c) => ({ ...c, messages: [...c.messages, message] }));
  }, []);

  const send = useCallback(
    async (raw: string) => {
      const question = raw.trim();
      if (!question || pending) return;
      append('user', question);
      setPending(true);
      try {
        append('ava', await askAva(question, ctx));
      } finally {
        setPending(false);
      }
    },
    [append, ctx, pending],
  );

  return {
    greeting: useMemo(() => greeting(ctx), [ctx]),
    suggestions: SUGGESTED_QUESTIONS[toAvaPhase(ctx.phase)],
    messages: chat.key === contextKey ? chat.messages : [],
    pending,
    send,
  };
}
