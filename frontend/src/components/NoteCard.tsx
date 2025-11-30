import React from 'react';
import { Clock } from 'lucide-react';

interface NoteCardProps {
  title: string;
  content: string;
  date: string;
  categoryColor: string;
  onClick: () => void;
}

export default function NoteCard({ title, content, date, categoryColor, onClick }: NoteCardProps) {
  return (
    <div 
      onClick={onClick}
      className="p-6 rounded-[24px] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col h-[220px] relative group overflow-hidden"
      style={{ backgroundColor: categoryColor }} 
    >

      <h3 className="font-bold text-xl text-brand-text mb-3 line-clamp-1">
        {title || "Untitled Note"}
      </h3>
      
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