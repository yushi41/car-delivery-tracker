// 日付に関するユーティリティ関数

/**
 * 納車予定日までの残り日数を計算
 * @param deliveryDate 納車予定日（YYYY-MM-DD形式）
 * @returns 残り日数
 */
export function calculateDaysRemaining(deliveryDate: string): number {
  const today = new Date();
  const delivery = new Date(deliveryDate);
  
  // 時間をリセット（日付のみで比較）
  today.setHours(0, 0, 0, 0);
  delivery.setHours(0, 0, 0, 0);
  
  // ミリ秒の差を日数に変換
  const diffTime = delivery.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * 日付を日本語形式でフォーマット
 * @param dateString 日付文字列（YYYY-MM-DD形式）
 * @returns フォーマットされた日付（例：2025年11月23日（金））
 */
export function formatDateJapanese(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = weekdays[date.getDay()];
  
  return `${year}年${month}月${day}日（${weekday}）`;
}

/**
 * 価格を日本円形式でフォーマット
 * @param price 価格
 * @returns フォーマットされた価格（例：¥2,800,000）
 */
export function formatPrice(price: number): string {
  return `¥${price.toLocaleString('ja-JP')}`;
}

