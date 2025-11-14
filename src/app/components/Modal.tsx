'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景オーバーレイ */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* モーダルコンテンツ */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/60">
          {/* ヘッダー */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-200/60">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* コンテンツ */}
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

