'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Plus, Loader2 } from 'lucide-react';
import NoteCard from '@/components/NoteCard';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatLocalTime } from '@/utilis/date';
import { motion } from 'framer-motion';

interface Note {
  id: number;
  title: string;
  content: string;
  updated_at_formatted: string;
  category_color: string;
  updated_at: string;
}

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  const selectedCategory = searchParams.get('category');

  // GET Notes
  useEffect(() => {
    const fetchNotes = async () => {
      const token = Cookies.get('accessToken');
      if (!token) return;

      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/notes/`;
        if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setNotes(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [selectedCategory]);

  const handleCreateNote = () => {
    setIsCreating(true);

    // for now we just post to create a new note and redirect to its edit page
    const createNote = async () => {
      const token = Cookies.get('accessToken');
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({})
        });

        if (res.ok) {
          const newNote = await res.json();
          router.push(`/note/${newNote.id}`);
        }
      } catch (error) {
        console.error('Failed to create note:', error);
      } finally {
        setIsCreating(false);
      }
    };
    
    createNote();
  };

  return (
    <div className="mx-auto">

      <div className="flex justify-end items-center mb-8">

        <button
        onClick={handleCreateNote}
        disabled={isCreating}
        className="bg-transparent 
            text-[#957139]             
            border 
            border-[#957139]
            px-6 py-3 rounded-xl
            flex items-center gap-2
            shadow-md
            hover:bg-brand-orange/10
            transition-colors
            cursor-pointer">
            {isCreating ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            {isCreating ? 'Creating...' : 'New Note'}
        </button>
      </div>

      {isLoading ? (
        <p>Loading your ideas...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            {notes.map((note) => (
                <motion.div key={note.id} variants={itemVariants}>
                  <NoteCard 
                      title={note.title}
                      content={note.content}
                      date={formatLocalTime(note.updated_at)} 
                      categoryColor={note.category_color}
                      onClick={() => router.push(`/note/${note.id}`)}
                  />
                </motion.div>
            ))}
            
            {notes.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-400">
                    <Image
                        src="/empty-state.svg"
                        alt="No notes"
                        width={300}
                        height={300}
                        className="mx-auto mb-4"
                    />
                    <p>I’m just here waiting for your charming notes...</p>
                </div>
            )}
        </motion.div>
      )}
    </div>
  );
}