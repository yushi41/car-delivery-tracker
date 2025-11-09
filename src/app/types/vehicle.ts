// 車両情報の型定義
export interface Vehicle {
  id: string;
  maker: string;           // メーカー
  model: string;           // 車種
  year?: number;           // 年式
  price?: number;          // 価格
  purchaseDate: string;    // 購入日
  deliveryDate: string;    // 納車予定日
  assignee: string;        // 担当者
  status: VehicleStatus;   // ステータス
  memo?: string;           // メモ
}

// ステータスの型
export type VehicleStatus = '契約済み' | '書類手続き中' | '整備中' | '納車準備完了' | '納車完了';

// ステータスに対応する色の設定
export const statusColors: Record<VehicleStatus, string> = {
  '契約済み': 'bg-gray-100 text-gray-700',
  '書類手続き中': 'bg-blue-100 text-blue-700',
  '整備中': 'bg-amber-100 text-amber-700',
  '納車準備完了': 'bg-green-100 text-green-700',
  '納車完了': 'bg-green-600 text-white'
};

