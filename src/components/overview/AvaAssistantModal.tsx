import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { SendHorizontal, X } from 'lucide-react';
import { AVA_PHASE_NAME, toAvaPhase, type AvaContext } from '../../lib/ava';
import type { ChatMessage } from '../../hooks/useAvaChat';
import { AvaAvatar } from '../ui/AvaAvatar';
import { Modal } from '../ui/Modal';

interface AvaAssistantModalProps {
  context: AvaContext;
  greeting: string;
  suggestions: string[];
  messages: ChatMessage[];
  pending: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
}

function AvaBubbleAvatar() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FDF2F8] to-[#EDE9FE]">
      <AvaAvatar className="h-7 w-7" />
    </span>
  );
}

function Bubble({ role, text }: { role: ChatMessage['role']; text: string }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] whitespace-pre-line break-words rounded-2xl rounded-tr-md bg-brand-strong px-4 py-2.5 text-label text-white">
          <span className="sr-only">You: </span>
          {text}
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2">
      <AvaBubbleAvatar />
      <p className="max-w-[85%] whitespace-pre-line break-words rounded-2xl rounded-tl-md bg-[#F5F0FF] px-4 py-2.5 text-label text-ink">
        <span className="sr-only">Ava: </span>
        {text}
      </p>
    </div>
  );
}

export function AvaAssistantModal({ context, greeting, suggestions, messages, pending, onSend, onClose }: AvaAssistantModalProps) {
  const [draft, setDraft] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  // Keep the latest message in view
  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, pending]);

  const submit = (text: string) => {
    if (!text.trim() || pending) return;
    onSend(text);
    setDraft('');
    input.current?.focus();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit(draft);
  };

  const phaseName = AVA_PHASE_NAME[toAvaPhase(context.phase)];

  return (
    <Modal
      labelledBy={titleId}
      describedBy={descId}
      onClose={onClose}
      initialFocus={input}
      className="flex h-[min(92dvh,760px)] flex-col overflow-hidden sm:h-[min(86dvh,720px)] sm:max-w-[560px]"
    >
      <header className="flex items-center gap-3 border-b border-line px-[clamp(16px,2.2vw,28px)] py-[clamp(14px,1.6vw,20px)]">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FDF2F8] to-[#EDE9FE]">
          <AvaAvatar className="h-10 w-10" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="text-heading font-bold text-ink">
            Ava
          </h2>
          <p id={descId} className="text-label text-ink-muted">
            AI Cycle Assistant
          </p>
          {/* narrow phones: phase + cycle day move under the title (the side badge is hidden there) */}
          <p className="text-caption font-semibold text-brand-strong min-[400px]:hidden">
            {phaseName} · Day {context.cycleDay}
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-brand-soft px-3 py-1 text-caption font-semibold text-brand-strong min-[400px]:inline">
          {phaseName} · Day {context.cycleDay}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Ava"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong transition-colors hover:bg-[#FBCFE8]"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={2.4} />
        </button>
      </header>

      <div
        ref={log}
        role="log"
        aria-live="polite"
        aria-label="Conversation with Ava"
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-[clamp(16px,2.2vw,28px)] py-4"
      >
        <Bubble role="ava" text={greeting} />
        {messages.map((m) => (
          <Bubble key={m.id} role={m.role} text={m.text} />
        ))}
        {pending && (
          <div className="flex items-center gap-2">
            <span className="sr-only">Ava is typing</span>
            <AvaBubbleAvatar />
            <span aria-hidden="true" className="flex gap-1 rounded-2xl bg-[#F5F0FF] px-4 py-3">
              {[0, 150, 300].map((delay) => (
                <span key={delay} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#A78BFA]" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-line px-[clamp(16px,2.2vw,28px)] pb-[clamp(14px,1.6vw,20px)] pt-3">
        <p className="sr-only" id={`${titleId}-suggest`}>
          Suggested questions for your {phaseName}
        </p>
        <ul aria-labelledby={`${titleId}-suggest`} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-3">
          {suggestions.map((q) => (
            <li key={q} className="shrink-0">
              <button
                type="button"
                onClick={() => submit(q)}
                disabled={pending}
                className="whitespace-nowrap rounded-full border border-[#DDD6FE] bg-white px-3.5 py-1.5 text-caption font-medium text-[#6D28D9] transition-colors hover:bg-[#F5F0FF] disabled:opacity-60"
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <label htmlFor={`${titleId}-input`} className="sr-only">
            Ask Ava a question
          </label>
          <input
            ref={input}
            id={`${titleId}-input`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={500}
            autoComplete="off"
            placeholder="Ask about your cycle…"
            className="min-w-0 flex-1 rounded-full border border-line bg-white px-4 py-3 text-body text-ink outline-none placeholder:text-ink-faint focus:border-brand"
          />
          <button
            type="submit"
            disabled={!draft.trim() || pending}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-strong px-[clamp(14px,1.6vw,20px)] text-label font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizontal className="h-4 w-4" aria-hidden="true" />
            <span className="max-[359px]:sr-only">Send</span>
          </button>
        </form>
        <p className="mt-2.5 text-center text-caption text-ink-muted">
          Ava shares general cycle-health information, not medical advice.
        </p>
      </div>
    </Modal>
  );
}
