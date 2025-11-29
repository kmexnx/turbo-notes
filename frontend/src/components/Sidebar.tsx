'use client';

import React from 'react';

const CATEGORIES = [
  { id: 1, name: 'Random Thoughts', color: 'bg-brand-orange' },
  { id: 2, name: 'School', color: 'bg-brand-yellow' },
  { id: 3, name: 'Personal', color: 'bg-brand-green' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 p-8 flex flex-col border-r border-gray-100 bg-background hidden md:flex">
      {/* Logo / Header */}
      <h1 className="text-2xl font-bold text-brand-text mb-10">Turbo Notes ⚡️</h1>

      {/* Categories List */}
      <nav className="flex-1 space-y-4">
        <div className="flex justify-between items-center group cursor-pointer p-2 rounded-lg hover:bg-gray-100">
          <span className="text-lg font-medium text-gray-600">All Categories</span>
        </div>

        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
             <div className="flex items-center gap-3">
                {/* Dot indicator */}
                <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                <span className="text-gray-600">{cat.name}</span>
             </div>
             {/* Counter (Dummy for now) */}
             <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">3</span>
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-2 transition-colors">
           Logout
        </button>
      </div>
    </aside>
  );
}