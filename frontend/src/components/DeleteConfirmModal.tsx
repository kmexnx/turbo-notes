import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Note?',
  message = 'This action cannot be undone. Your note will be permanently deleted.',
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-brand-orange/10 rounded-xl">
            <Trash2 size={24} className="text-brand-orange" />
          </div>
          <h3 className="text-xl font-bold text-brand-text">{title}</h3>
        </div>
        <p className="text-brand-text/70 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="text-brand-text/60 hover:bg-gray-100 rounded-xl px-4 py-2 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-brand-orange text-white hover:bg-brand-orange/90 rounded-xl px-4 py-2 shadow-lg shadow-brand-orange/30 transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
