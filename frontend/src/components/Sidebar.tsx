'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  color: string;
  notes_count?: number;
}

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    const fetchCategories = async () => {
      const token = Cookies.get('accessToken');
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 p-8 flex flex-col border-r border-gray-100 hidden md:flex">
      {/* Logo / Header */}
      {/* <h1 className="text-2xl font-bold text-brand-text mb-10">What's up {user?.name} </h1> */}

      {/* Categories List */}
      <nav className="flex-1 space-y-4">
        {loading ? (
          <div className="text-gray-400 text-sm">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-gray-400 text-sm">No categories yet</div>
        ) : (
          categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.id.toString() === selectedCategory ? '/' : `?category=${cat.id}`}
              className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.color }}
                ></span>
                <span className="text-gray-600">{cat.name}</span>
              </div>
              {/* Counter */}
              {cat.notes_count !== undefined && (
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {cat.notes_count}
                </span>
              )}
            </Link>
          ))
        )}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={logout}
          className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}