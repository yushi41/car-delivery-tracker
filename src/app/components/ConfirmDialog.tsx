'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = '確認',
  cancelText = 'キャンセル',
  onConfirm,
  onCancel,
  isDestructive = false
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景オーバーレイ */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />
      
      {/* ダイアログコンテンツ */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-gray-200/60">
          {/* アイコンと タイトル */}
          <div className="flex items-start space-x-4 mb-6">
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
              isDestructive ? 'bg-red-50' : 'bg-blue-50'
            }`}>
              <ExclamationTriangleIcon className={`w-6 h-6 ${
                isDestructive ? 'text-red-600' : 'text-blue-600'
              }`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{message}</p>
            </div>
          </div>
          
          {/* ボタン */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-5 py-2.5 rounded-xl text-white transition-all duration-200 font-semibold shadow-sm hover:shadow-md ${
                isDestructive 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

