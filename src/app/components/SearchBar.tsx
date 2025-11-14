'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = '検索...' }: SearchBarProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl 
                   focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                   placeholder-gray-400 text-gray-900 bg-white
                   transition-all duration-200
                   hover:border-gray-300 hover:shadow-sm
                   text-sm sm:text-base"
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
        </button>
      )}
    </div>
  );
}

