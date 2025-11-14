'use client';

import { useState, useMemo } from 'react';
import VehicleCard from './VehicleCard';
import Modal from './Modal';
import VehicleForm from './VehicleForm';
import ConfirmDialog from './ConfirmDialog';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import Tabs from './Tabs';
import Calendar from './Calendar';
import { TruckIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Vehicle, VehicleStatus } from '../types/vehicle';
import { createVehicleAction, updateVehicleAction, deleteVehicleAction } from '../actions/vehicleActions';

interface HomeClientProps {
  initialVehicles: Vehicle[];
}

export default function HomeClient({ initialVehicles }: HomeClientProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  // タブ状態
  const [activeTab, setActiveTab] = useState<'waiting' | 'delivered' | 'calendar'>('waiting');
  
  // 検索・フィルター状態
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('すべて');
  const [selectedStatus, setSelectedStatus] = useState('すべて');

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

  // 担当者リストを取得（重複を除く）
  const assigneeOptions = useMemo(() => {
    const assignees = Array.from(new Set(initialVehicles.map(v => v.assignee)));
    return [
      { value: 'すべて', label: 'すべて' },
      ...assignees.map(a => ({ value: a, label: a }))
    ];
  }, [initialVehicles]);

  // ステータスオプション
  const statusOptions = [
    { value: 'すべて', label: 'すべて' },
    { value: '契約済み', label: '契約済み' },
    { value: '書類手続き中', label: '書類手続き中' },
    { value: '整備中', label: '整備中' },
    { value: '納車準備完了', label: '納車準備完了' },
    { value: '納車完了', label: '納車完了' },
  ];

  // タブに応じて車両を分ける
  const waitingVehicles = useMemo(() => {
    return initialVehicles.filter(v => v.status !== '納車完了');
  }, [initialVehicles]);

  const deliveredVehicles = useMemo(() => {
    return initialVehicles.filter(v => v.status === '納車完了');
  }, [initialVehicles]);

  // 現在のタブの車両
  const currentTabVehicles = activeTab === 'waiting' ? waitingVehicles : deliveredVehicles;

  // フィルタリング・検索ロジック
  const filteredVehicles = useMemo(() => {
    return currentTabVehicles.filter((vehicle) => {
      // 検索クエリでフィルタ（メーカー、車種、担当者、顧客名）
      const matchesSearch = searchQuery === '' || 
        vehicle.maker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (vehicle.customerName && vehicle.customerName.toLowerCase().includes(searchQuery.toLowerCase()));

      // 担当者でフィルタ
      const matchesAssignee = selectedAssignee === 'すべて' || vehicle.assignee === selectedAssignee;

      // ステータスでフィルタ
      const matchesStatus = selectedStatus === 'すべて' || vehicle.status === selectedStatus;

      return matchesSearch && matchesAssignee && matchesStatus;
    });
  }, [currentTabVehicles, searchQuery, selectedAssignee, selectedStatus]);

  const sortedVehicles = filteredVehicles;

  // タブ設定
  const tabs = [
    { id: 'waiting', label: '納車待ち', count: waitingVehicles.length, icon: 'clock' as const },
    { id: 'delivered', label: '納車済み', count: deliveredVehicles.length, icon: 'check' as const },
    { id: 'calendar', label: 'カレンダー', icon: 'calendar' as const },
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* ヘッダー */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <TruckIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  納車待ち管理
                </h1>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
              >
                <PlusIcon className="w-5 h-5" />
                <span className="hidden sm:inline">新規登録</span>
              </button>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* タブ */}
          <div className="mb-8">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={(tabId) => setActiveTab(tabId as 'waiting' | 'delivered' | 'calendar')}
            />
          </div>

          {/* カレンダー表示 */}
          {activeTab === 'calendar' && (
            <Calendar
              vehicles={initialVehicles}
              onVehicleClick={handleCardClick}
            />
          )}

          {/* サマリー（納車待ちタブのみ表示） */}
          {activeTab === 'waiting' && activeTab !== 'calendar' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-all duration-200">
                <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">納車待ち車両</div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 tracking-tight">
                  {waitingVehicles.length}台
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-all duration-200">
                <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">今月納車予定</div>
                <div className="text-3xl sm:text-4xl font-bold text-green-600 tracking-tight">
                  {waitingVehicles.filter(v => {
                    const date = new Date(v.deliveryDate);
                    const now = new Date();
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                  }).length}台
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-all duration-200">
                <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">来月納車予定</div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-600 tracking-tight">
                  {waitingVehicles.filter(v => {
                    const date = new Date(v.deliveryDate);
                    const now = new Date();
                    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                    return date.getMonth() === nextMonth.getMonth() && date.getFullYear() === nextMonth.getFullYear();
                  }).length}台
                </div>
              </div>
            </div>
          )}

          {/* 検索・フィルター（カレンダータブ以外） */}
          {activeTab !== 'calendar' && (
            <>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 sm:p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {/* 検索ボックス */}
                  <div className="md:col-span-1">
                    <SearchBar
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="車種、メーカー、担当者、顧客名で検索..."
                    />
                  </div>

                  {/* 担当者フィルター */}
                  <div>
                    <FilterDropdown
                      label="担当者"
                      value={selectedAssignee}
                      options={assigneeOptions}
                      onChange={setSelectedAssignee}
                    />
                  </div>

                  {/* ステータスフィルター */}
                  <div>
                    <FilterDropdown
                      label="ステータス"
                      value={selectedStatus}
                      options={statusOptions}
                      onChange={setSelectedStatus}
                    />
                  </div>
                </div>

                {/* フィルター結果の件数表示 */}
                {(searchQuery || selectedAssignee !== 'すべて' || selectedStatus !== 'すべて') && (
                  <div className="mt-6 pt-6 border-t border-gray-200/60">
                    <p className="text-sm font-medium text-gray-600">
                      <span className="text-gray-900 font-semibold">{filteredVehicles.length}件</span>の車両が見つかりました
                      {searchQuery && (
                        <span className="ml-2 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">
                          「{searchQuery}」で検索中
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* 車両一覧 */}
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                  {activeTab === 'waiting' ? '納車待ち車両' : '納車済み車両'}
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  {activeTab === 'waiting' ? '納車予定日が近い順' : '納車日が新しい順'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                    <TruckIcon className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                    {activeTab === 'waiting' 
                      ? (searchQuery || selectedAssignee !== 'すべて' || selectedStatus !== 'すべて'
                          ? '条件に一致する車両が見つかりません'
                          : 'まだ車両が登録されていません')
                      : (searchQuery || selectedAssignee !== 'すべて' || selectedStatus !== 'すべて'
                          ? '条件に一致する納車済み車両が見つかりません'
                          : 'まだ納車済みの車両がありません')
                    }
                  </h3>
                  {activeTab === 'waiting' && !searchQuery && selectedAssignee === 'すべて' && selectedStatus === 'すべて' && (
                    <p className="text-gray-600 mb-6 font-medium">
                      右上の「新規登録」ボタンから車両を追加しましょう
                    </p>
                  )}
                </div>
              )}
            </>
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

