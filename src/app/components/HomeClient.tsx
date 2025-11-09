'use client';

import { useState } from 'react';
import VehicleCard from './VehicleCard';
import Modal from './Modal';
import VehicleForm from './VehicleForm';
import ConfirmDialog from './ConfirmDialog';
import { TruckIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Vehicle } from '../types/vehicle';
import { createVehicleAction, updateVehicleAction, deleteVehicleAction } from '../actions/vehicleActions';

interface HomeClientProps {
  initialVehicles: Vehicle[];
}

export default function HomeClient({ initialVehicles }: HomeClientProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleCreateVehicle = async (vehicleData: Omit<Vehicle, 'id'>) => {
    const result = await createVehicleAction(vehicleData);
    
    if (result.success) {
      setIsCreateModalOpen(false);
    } else {
      alert('保存に失敗しました: ' + (result.error || '不明なエラー'));
    }
  };

  const handleUpdateVehicle = async (vehicleData: Omit<Vehicle, 'id'>) => {
    if (!selectedVehicle) return;
    
    const result = await updateVehicleAction(selectedVehicle.id, vehicleData);
    
    if (result.success) {
      setIsEditModalOpen(false);
      setSelectedVehicle(null);
    } else {
      alert('更新に失敗しました: ' + (result.error || '不明なエラー'));
    }
  };

  const handleDeleteVehicle = async () => {
    if (!selectedVehicle) return;
    
    const result = await deleteVehicleAction(selectedVehicle.id);
    
    if (result.success) {
      setIsDeleteDialogOpen(false);
      setSelectedVehicle(null);
    } else {
      alert('削除に失敗しました: ' + (result.error || '不明なエラー'));
    }
  };

  const handleCardClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  const sortedVehicles = initialVehicles;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* ヘッダー */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TruckIcon className="w-8 h-8 text-gray-700" />
                <h1 className="text-2xl font-bold text-gray-900">
                  納車待ち管理
                </h1>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>新規登録</span>
              </button>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* サマリー */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">納車待ち車両</div>
              <div className="text-3xl font-bold text-blue-600">
                {sortedVehicles.filter(v => v.status !== '納車完了').length}台
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">今月納車予定</div>
              <div className="text-3xl font-bold text-green-600">
                {sortedVehicles.filter(v => {
                  const date = new Date(v.deliveryDate);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                }).length}台
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">来月納車予定</div>
              <div className="text-3xl font-bold text-amber-600">
                {sortedVehicles.filter(v => {
                  const date = new Date(v.deliveryDate);
                  const now = new Date();
                  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                  return date.getMonth() === nextMonth.getMonth() && date.getFullYear() === nextMonth.getFullYear();
                }).length}台
              </div>
            </div>
          </div>

          {/* 車両一覧 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              車両一覧 <span className="text-sm font-normal text-gray-500">（納車予定日が近い順）</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedVehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle}
                onClick={() => handleCardClick(vehicle)}
              />
            ))}
          </div>

          {/* 空状態（車両が0台の場合） */}
          {sortedVehicles.length === 0 && (
            <div className="text-center py-16">
              <TruckIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                まだ車両が登録されていません
              </h3>
              <p className="text-gray-600 mb-6">
                右上の「新規登録」ボタンから車両を追加しましょう
              </p>
            </div>
          )}
        </div>
      </main>

      {/* 新規登録モーダル */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="車両を新規登録"
      >
        <VehicleForm
          onSubmit={handleCreateVehicle}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* 編集モーダル */}
      {selectedVehicle && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedVehicle(null);
          }}
          title="車両を編集"
        >
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setIsDeleteDialogOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
              <span>削除</span>
            </button>
          </div>
          <VehicleForm
            initialData={selectedVehicle}
            onSubmit={handleUpdateVehicle}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedVehicle(null);
            }}
          />
        </Modal>
      )}

      {/* 削除確認ダイアログ */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="車両を削除"
        message={`「${selectedVehicle?.maker} ${selectedVehicle?.model}」を削除してもよろしいですか？この操作は取り消せません。`}
        confirmText="削除"
        cancelText="キャンセル"
        isDestructive={true}
        onConfirm={handleDeleteVehicle}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}

