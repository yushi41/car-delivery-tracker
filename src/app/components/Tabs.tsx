'use client';

import { CalendarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { CalendarIcon as CalendarIconSolid, CheckCircleIcon as CheckCircleIconSolid, ClockIcon as ClockIconSolid } from '@heroicons/react/24/solid';

interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: 'calendar' | 'clock' | 'check';
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  const getIcon = (iconType?: string, isActive: boolean) => {
    const iconClass = `w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`;
    
    switch (iconType) {
      case 'calendar':
        return isActive ? <CalendarIconSolid className={iconClass} /> : <CalendarIcon className={iconClass} />;
      case 'clock':
        return isActive ? <ClockIconSolid className={iconClass} /> : <ClockIcon className={iconClass} />;
      case 'check':
        return isActive ? <CheckCircleIconSolid className={iconClass} /> : <CheckCircleIcon className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div className="border-b border-gray-200/60">
      <nav className="-mb-px flex space-x-1 sm:space-x-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                group relative pb-4 px-3 sm:px-4 border-b-2 font-medium text-sm transition-all duration-300
                whitespace-nowrap flex items-center space-x-2
                ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.icon && getIcon(tab.icon, isActive)}
              <span className="font-semibold">{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`
                  inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }
                `}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

