'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export default function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
        {label}
      </label>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl
                     focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                     text-gray-900 bg-white text-sm sm:text-base
                     transition-all duration-200
                     hover:border-gray-300 hover:shadow-sm
                     cursor-pointer font-medium"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </div>
  );
}

