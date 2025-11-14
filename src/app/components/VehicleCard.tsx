import { Vehicle, statusColors } from '../types/vehicle';
import { calculateDaysRemaining, formatDateJapanese } from '../utils/dateUtils';
import { CalendarIcon, UserIcon, DocumentTextIcon, UserCircleIcon } from '@heroicons/react/24/outline';

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
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-200/60 hover:border-gray-300 group cursor-pointer"
    >
      {/* 車種・メーカー */}
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
          {vehicle.maker} {vehicle.model}
        </h3>
        {vehicle.year && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">{vehicle.year}年式</p>
        )}
      </div>

      {/* カウントダウン（大きく表示） */}
      <div className="my-6 text-center">
        <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3 tracking-tight">
          {getDaysText(daysRemaining)}
        </div>
        <div className="flex items-center justify-center text-xs sm:text-sm text-gray-600">
          <CalendarIcon className="w-4 h-4 mr-1.5 text-gray-400" />
          <span className="font-medium">{formattedDate}</span>
        </div>
      </div>

      {/* 顧客名、担当者とステータス */}
      <div className="space-y-3 mb-4">
        {vehicle.customerName && (
          <div className="flex items-center text-sm text-gray-700">
            <UserCircleIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium">{vehicle.customerName}</span>
          </div>
        )}
        <div className="flex items-center text-sm text-gray-700">
          <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-medium">{vehicle.assignee}</span>
        </div>
        <div className="flex items-center">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusColors[vehicle.status]} shadow-sm`}>
            {vehicle.status}
          </span>
        </div>
      </div>

      {/* メモ（あれば表示） */}
      {vehicle.memo && (
        <div className="mt-5 pt-4 border-t border-gray-200/60">
          <div className="flex items-start text-xs sm:text-sm text-gray-600">
            <DocumentTextIcon className="w-4 h-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="leading-relaxed">{vehicle.memo}</span>
          </div>
        </div>
      )}
    </div>
  );
}

