import { Vehicle, statusColors } from '../types/vehicle';
import { calculateDaysRemaining, formatDateJapanese } from '../utils/dateUtils';
import { CalendarIcon, UserIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: () => void;
}

export default function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const daysRemaining = calculateDaysRemaining(vehicle.deliveryDate);
  const formattedDate = formatDateJapanese(vehicle.deliveryDate);

  // 残り日数の表示テキスト
  const getDaysText = (days: number) => {
    if (days < 0) return '納車済み';
    if (days === 0) return '今日納車！';
    return `あと${days}日`;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-100 cursor-pointer"
    >
      {/* 車種・メーカー */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          {vehicle.maker} {vehicle.model}
        </h3>
        {vehicle.year && (
          <p className="text-sm text-gray-500">{vehicle.year}年式</p>
        )}
      </div>

      {/* カウントダウン（大きく表示） */}
      <div className="my-6 text-center">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {getDaysText(daysRemaining)}
        </div>
        <div className="flex items-center justify-center text-sm text-gray-600">
          <CalendarIcon className="w-4 h-4 mr-1.5 text-gray-500" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* 担当者とステータス */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-700">
          <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
          <span>{vehicle.assignee}</span>
        </div>
        <div className="flex items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[vehicle.status]}`}>
            {vehicle.status}
          </span>
        </div>
      </div>

      {/* メモ（あれば表示） */}
      {vehicle.memo && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-start text-xs text-gray-600">
            <DocumentTextIcon className="w-4 h-4 mr-1.5 text-gray-500 mt-0.5 flex-shrink-0" />
            <span>{vehicle.memo}</span>
          </div>
        </div>
      )}
    </div>
  );
}

