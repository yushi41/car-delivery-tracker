'use client';

import { useState } from 'react';
import { Vehicle, VehicleStatus } from '../types/vehicle';

interface VehicleFormProps {
  onSubmit: (vehicle: Omit<Vehicle, 'id'>) => Promise<void>;
  onCancel: () => void;
  initialData?: Vehicle;
}

export default function VehicleForm({ onSubmit, onCancel, initialData }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    maker: initialData?.maker || '',
    model: initialData?.model || '',
    year: initialData?.year?.toString() || '',
    price: initialData?.price?.toString() || '',
    purchaseDate: initialData?.purchaseDate || '',
    deliveryDate: initialData?.deliveryDate || '',
    assignee: initialData?.assignee || '',
    status: initialData?.status || '契約済み' as VehicleStatus,
    memo: initialData?.memo || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        maker: formData.maker,
        model: formData.model,
        year: formData.year ? parseInt(formData.year) : undefined,
        price: formData.price ? parseInt(formData.price) : undefined,
        purchaseDate: formData.purchaseDate,
        deliveryDate: formData.deliveryDate,
        assignee: formData.assignee,
        status: formData.status,
        memo: formData.memo || undefined,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('保存に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* メーカーと車種 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="maker" className="block text-sm font-medium text-gray-700 mb-2">
            メーカー <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="maker"
            name="maker"
            value={formData.maker}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例：トヨタ"
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
            車種 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例：プリウス"
          />
        </div>
      </div>

      {/* 年式と価格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
            年式
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max="2100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例：2023"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            価格（円）
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例：2800000"
          />
        </div>
      </div>

      {/* 購入日と納車予定日 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-2">
            購入日 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-2">
            納車予定日 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* 担当者とステータス */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-2">
            担当者 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例：山田太郎"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            ステータス <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="契約済み">契約済み</option>
            <option value="書類手続き中">書類手続き中</option>
            <option value="整備中">整備中</option>
            <option value="納車準備完了">納車準備完了</option>
            <option value="納車完了">納車完了</option>
          </select>
        </div>
      </div>

      {/* メモ */}
      <div>
        <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-2">
          メモ
        </label>
        <textarea
          id="memo"
          name="memo"
          value={formData.memo}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="例：ナビとドラレコを後付け予定"
        />
      </div>

      {/* ボタン */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>保存中...</span>
            </>
          ) : (
            <span>保存</span>
          )}
        </button>
      </div>
    </form>
  );
}

