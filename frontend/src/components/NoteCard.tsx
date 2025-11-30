import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

interface NoteCardProps {
  title: string;
  content: string;
  date: string;
  categoryColor: string;
  onClick: () => void;
  onDelete?: () => void;
}

export default function NoteCard({ title, content, date, categoryColor, onClick, onDelete }: NoteCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div 
      onClick={onClick}
      className="p-6 rounded-[24px] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col h-[220px] relative group overflow-hidden"
      style={{ backgroundColor: categoryColor }} 
    >

      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-xl text-brand-text line-clamp-1 flex-1">
          {title || "Untitled Note"}
        </h3>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity ml-2 p-1 hover:bg-white/20 rounded-lg"
            aria-label="Delete note"
          >
            <Trash2 size={16} className="text-brand-text" />
          </button>
        )}
      </div>
      
      <p className="text-sm text-brand-text/80 line-clamp-4 flex-1 whitespace-pre-wrap leading-relaxed font-medium">
        {content || "No additional text"}
      </p>

      <div className="mt-auto pt-4 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity text-brand-text">
        <Clock size={14} />
        <span className="text-xs font-bold uppercase tracking-wide">{date}</span>
      </div>

      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
    </div>
  );
}