import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { WellnessMetricsData } from '../../types/tracker';

interface EditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: WellnessMetricsData;
  onSave: (metrics: Partial<WellnessMetricsData>) => void;
}

export const EditLogModal: React.FC<EditLogModalProps> = ({
  isOpen,
  onClose,
  metrics,
  onSave,
}) => {
  const [formData, setFormData] = useState<WellnessMetricsData>({ ...metrics });

  useEffect(() => {
    setFormData({ ...metrics });
  }, [metrics]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn"
    >
      <div
        className="fixed inset-0 bg-transparent"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-[28px] w-full max-w-md p-6 shadow-xl border border-gray-100 z-10">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h3 id="modal-title" className="text-lg font-bold text-gray-900">
            Edit Wellness Log
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Sleep Duration
            </label>
            <input
              type="text"
              value={formData.sleep}
              onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 min-h-[44px]"
              placeholder="e.g. 7.2 hrs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Mood Status
            </label>
            <input
              type="text"
              value={formData.mood}
              onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 min-h-[44px]"
              placeholder="e.g. Good"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Water Intake
            </label>
            <input
              type="text"
              value={formData.water}
              onChange={(e) => setFormData({ ...formData, water: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 min-h-[44px]"
              placeholder="e.g. 2.1 / 2.5 L"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Steps Count
            </label>
            <input
              type="text"
              value={formData.steps}
              onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 min-h-[44px]"
              placeholder="e.g. 6,245"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Weight
            </label>
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 min-h-[44px]"
              placeholder="e.g. 58.5 kg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Sex Activity
            </label>
            <select
              value={formData.sexActivity}
              onChange={(e) => setFormData({ ...formData, sexActivity: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 bg-white min-h-[44px]"
            >
              <option value="Not Logged">Not Logged</option>
              <option value="Logged">Logged</option>
              <option value="Protected">Protected</option>
              <option value="Unprotected">Unprotected</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 min-h-[44px] flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm font-semibold hover:from-pink-600 hover:to-pink-700 shadow-sm min-h-[44px] flex items-center justify-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
