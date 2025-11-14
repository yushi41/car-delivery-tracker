'use client';

import { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Vehicle } from '../types/vehicle';

interface CalendarProps {
  vehicles: Vehicle[];
  onVehicleClick: (vehicle: Vehicle) => void;
}

export default function Calendar({ vehicles, onVehicleClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 現在の年月
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 月の最初の日と最後の日
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // 月の最初の日の曜日（0:日曜 〜 6:土曜）
  const firstDayOfWeek = firstDay.getDay();
  
  // 月の日数
  const daysInMonth = lastDay.getDate();

  // 前月へ
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // 次月へ
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // 今月に戻る
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // 日付ごとの車両をマッピング
  const vehiclesByDate = useMemo(() => {
    const map: { [key: string]: Vehicle[] } = {};
    
    vehicles.forEach((vehicle) => {
      const deliveryDate = new Date(vehicle.deliveryDate);
      const dateKey = `${deliveryDate.getFullYear()}-${deliveryDate.getMonth()}-${deliveryDate.getDate()}`;
      
      if (!map[dateKey]) {
        map[dateKey] = [];
      }
      map[dateKey].push(vehicle);
    });
    
    return map;
  }, [vehicles]);

  // カレンダーの日付配列を生成
  const calendarDays = useMemo(() => {
    const days = [];
    
    // 空白セルを追加（月の最初の日の曜日まで）
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // 日付を追加
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  }, [firstDayOfWeek, daysInMonth]);

  // 特定の日付の車両を取得
  const getVehiclesForDay = (day: number) => {
    const dateKey = `${year}-${month}-${day}`;
    return vehiclesByDate[dateKey] || [];
  };

  // 今日かどうか
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // 月の名前（日本語）
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-4 sm:p-8">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {year}年 {monthNames[month]}
          </h3>
          <p className="text-sm text-gray-500 mt-1">納車予定を確認</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* 今月に戻るボタン */}
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            今月
          </button>
          
          {/* 前月ボタン */}
          <button
            onClick={goToPreviousMonth}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="前月"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* 次月ボタン */}
          <button
            onClick={goToNextMonth}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="次月"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3">
        {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
          <div
            key={day}
            className={`text-center text-xs sm:text-sm font-semibold py-3 ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* カレンダーグリッド */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {calendarDays.map((day, index) => {
          if (day === null) {
            // 空白セル
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const vehiclesOnDay = getVehiclesForDay(day);
          const hasVehicles = vehiclesOnDay.length > 0;

          return (
            <div
              key={day}
              className={`
                aspect-square border rounded-xl transition-all duration-300
                ${isToday(day) 
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-300 shadow-md ring-2 ring-blue-200/50' 
                  : 'border-gray-200/60 hover:border-gray-300 hover:shadow-sm'
                }
                ${hasVehicles ? 'bg-gradient-to-br from-white to-gray-50/50' : 'bg-white'}
                cursor-pointer group
              `}
            >
              <div className="h-full flex flex-col p-1.5 sm:p-2.5">
                {/* 日付 */}
                <div className={`
                  text-xs sm:text-sm font-semibold mb-1.5 transition-colors
                  ${isToday(day) 
                    ? 'text-blue-700' 
                    : hasVehicles 
                      ? 'text-gray-900' 
                      : 'text-gray-500 group-hover:text-gray-700'
                  }
                `}>
                  {day}
                </div>

                {/* 車両情報 */}
                {hasVehicles && (
                  <div className="flex-1 overflow-hidden space-y-1">
                    {vehiclesOnDay.slice(0, 2).map((vehicle) => (
                      <button
                        key={vehicle.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onVehicleClick(vehicle);
                        }}
                        className="w-full text-left"
                      >
                        <div className={`
                          text-[10px] sm:text-xs px-1.5 py-1 rounded-lg truncate
                          transition-all duration-200 font-medium
                          ${vehicle.status === '納車完了'
                            ? 'bg-gray-100/80 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                            : 'bg-blue-100/80 text-blue-700 hover:bg-blue-200 hover:shadow-sm hover:scale-[1.02]'
                          }
                        `}>
                          <span className="hidden sm:inline">{vehicle.maker} </span>
                          {vehicle.model}
                        </div>
                      </button>
                    ))}
                    
                    {/* 3台以上ある場合は「+n」と表示 */}
                    {vehiclesOnDay.length > 2 && (
                      <div className="text-[10px] text-gray-500 text-center font-medium pt-0.5">
                        +{vehiclesOnDay.length - 2}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 凡例 */}
      <div className="mt-8 pt-6 border-t border-gray-200/60 flex flex-wrap items-center gap-6 text-xs sm:text-sm">
        <div className="flex items-center space-x-2.5">
          <div className="w-3.5 h-3.5 rounded-lg bg-blue-100 border border-blue-200"></div>
          <span className="text-gray-600 font-medium">納車予定</span>
        </div>
        <div className="flex items-center space-x-2.5">
          <div className="w-3.5 h-3.5 rounded-lg bg-gray-100 border border-gray-200"></div>
          <span className="text-gray-600 font-medium">納車済み</span>
        </div>
        <div className="flex items-center space-x-2.5">
          <div className="w-3.5 h-3.5 rounded-lg bg-blue-200 border-2 border-blue-400 shadow-sm"></div>
          <span className="text-gray-600 font-medium">今日</span>
        </div>
      </div>
    </div>
  );
}


