import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface PersonalNotesCardProps {
  initialNotes: string;
  onSaveNotes: (notes: string) => void;
}

export const PersonalNotesCard: React.FC<PersonalNotesCardProps> = ({
  initialNotes,
  onSaveNotes,
}) => {
  const [notes, setNotes] = useState(initialNotes);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const handleSave = () => {
    onSaveNotes(notes);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="w-full">
      <h3 className="text-[clamp(14px,1.5vw,15.6px)] font-bold text-[#1F2937] leading-[23.4px]">
        Personal Notes
      </h3>
      <p className="text-[clamp(11px,1.2vw,13.2px)] font-normal text-[#9CA3AF] leading-[19.8px] mt-0.5 mb-2">
        Add your thoughts for today
      </p>

      <div className="relative">
        <textarea
          value={notes}
          onChange={(e) => {
            if (e.target.value.length <= 300) {
              setNotes(e.target.value);
            }
          }}
          placeholder="Example: Today I felt nauseous after eating lunch."
          rows={3}
          className="w-full h-[96px] bg-[#F9FAFB] rounded-[14.4px] p-3 text-[13.2px] text-gray-800 placeholder-[#9CA3AF] border-[1.2px] border-[#E5E7EB] focus:outline-none focus:border-[#EA33A1] resize-none transition-colors"
        />
        <div className="flex justify-end text-[12px] text-[#9CA3AF] mt-1 mb-2.5">
          {notes.length} / 300
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full h-[44px] rounded-[14.4px] bg-[#EA33A1] hover:bg-[#D61E8C] active:scale-[0.99] text-white text-[14.4px] font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5"
      >
        {savedMessage ? (
          <>
            <Check className="w-4 h-4" />
            <span>Note Saved!</span>
          </>
        ) : (
          'Save Note'
        )}
      </button>
    </div>
  );
};
