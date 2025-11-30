'use client';

import React, { useEffect, useState, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useDebounce } from '@/hooks/useDebounce';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { X, ChevronDown, Loader2, Mic, MicOff, Check, Clock } from 'lucide-react';
import { formatLocalTime } from '@/utilis/date';


interface Category {
  id: number;
  name: string;
  color: string;
}

export default function NoteEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const noteId = id;
  const token = Cookies.get('accessToken');

  const { isListening, transcript, startListening, stopListening } = useSpeechToText();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [lastEdited, setLastEdited] = useState('');
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const debouncedTitle = useDebounce(title, 800);
  const debouncedContent = useDebounce(content, 1000);
  
  const isFirstRender = useRef(true);

  useEffect(() => {
    const initData = async () => {
      if (!token) return;
      try {
        const [noteRes, catsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}/`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (noteRes.ok && catsRes.ok) {
          const noteData = await noteRes.json();
          const catsData = await catsRes.json();

          setTitle(noteData.title);
          setContent(noteData.content);
          setCategoryId(noteData.category_id);
          setLastEdited(noteData.updated_at);
          setCurrentColor(noteData.category_color);
          setCategories(catsData);
        } else {
            router.push('/');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setTimeout(() => { isFirstRender.current = false; }, 500);
      }
    };
    initData();
  }, [noteId, token, router]);


  // Auto-Save Logic
  useEffect(() => {
    if (isFirstRender.current) return;
    
    const saveNote = async () => {
      setIsSaving(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: debouncedTitle,
            content: debouncedContent,
            category_id: categoryId
          })
        });

        if (res.ok) {
            const data = await res.json();
            setLastEdited(data.updated_at);
            setCurrentColor(data.category_color);
        }
      } finally {
        setIsSaving(false);
      }
    };

    saveNote();
  }, [debouncedTitle, debouncedContent, categoryId, noteId, token]);

  // Speech to Text: Append transcript to content
  useEffect(() => {
    if (transcript) {
      setContent((prev) => prev + (prev ? ' ' : '') + transcript);
    }
  }, [transcript]);


  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin"/></div>;

  return (
    <div 
        className="h-[calc(100vh-2rem)] md:h-full rounded-3xl p-8 flex flex-col transition-colors duration-500 ease-in-out relative overflow-hidden"
        style={{ backgroundColor: currentColor }}
    >
      
      <div className="flex justify-between items-start mb-12 z-10">
        <div className="relative group">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full cursor-pointer hover:bg-white/30 transition-colors border border-black/5">
                <span className="w-2 h-2 rounded-full bg-brand-text"></span>
                <span className="text-sm font-medium text-brand-text">
                    {categories.find(c => c.id === categoryId)?.name || 'Select Category'}
                </span>
                <ChevronDown size={14} className="text-brand-text/60" />
            </div>

            <select 
                value={categoryId || ''}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
        </div>

        <div className="flex items-center gap-4">
             <button 
                onClick={() => router.push('/')}
                className="p-2 hover:bg-black/5 rounded-full transition-colors text-brand-text"
             >
                <X size={28} strokeWidth={1.5} />
            </button>
        </div>
      </div>

      <div className="absolute top-24 right-8 text-xs font-medium text-brand-text/50">
        Last Edited: {formatLocalTime(lastEdited)}  
        {isSaving ? <Clock size={12} className="inline-block" /> : <Check size={12} className="inline-block" />}
      </div>


      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full z-10">
         
         <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="bg-transparent border-none text-5xl font-serif font-bold text-brand-text placeholder-brand-text/30 focus:ring-0 outline-none mb-6 w-full"
         />

         <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Pour your heart out..."
            className="flex-1 bg-transparent border-none text-lg text-brand-text placeholder-brand-text/40 focus:ring-0 outline-none resize-none leading-relaxed"
         />
      </div>

      {/* Speech to Text Button */}
      <div className="fixed bottom-8 right-8 z-20">
        {/* Wave Animation */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-16 h-16 rounded-full bg-brand-orange/30 animate-ping"></div>
            <div className="absolute w-20 h-20 rounded-full bg-brand-orange/20 animate-pulse"></div>
          </div>
        )}
        
        <button
          onClick={isListening ? stopListening : startListening}
          className={`relative p-4 m-4 rounded-full shadow-lg transition-all ${
            isListening
              ? 'bg-brand-text scale-110'
              : 'bg-brand-text hover:scale-105'
          }`}
          title={isListening ? 'Stop Recording' : 'Start Recording'}
        >
          {isListening ? (
            <MicOff size={24} className="text-white" />
          ) : (
            <Mic size={24} className="text-white" />
          )}
        </button>
      </div>

    </div>
  );
}