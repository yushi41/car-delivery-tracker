import { Vehicle } from '../types/vehicle';

// モックデータ（仮のデータ）
export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    maker: 'トヨタ',
    model: 'プリウス',
    year: 2022,
    price: 2800000,
    purchaseDate: '2025-10-15',
    deliveryDate: '2025-11-23',
    assignee: '山田太郎',
    status: '整備中',
    memo: 'ナビとドラレコを後付け予定'
  },
  {
    id: '2',
    maker: 'ホンダ',
    model: 'フィット',
    year: 2023,
    price: 2200000,
    purchaseDate: '2025-10-20',
    deliveryDate: '2025-12-06',
    assignee: '佐藤花子',
    status: '書類手続き中',
    memo: ''
  },
  {
    id: '3',
    maker: 'マツダ',
    model: 'CX-5',
    year: 2023,
    price: 3500000,
    purchaseDate: '2025-10-25',
    deliveryDate: '2025-12-23',
    assignee: '鈴木一郎',
    status: '契約済み',
    memo: ''
  },
  {
    id: '4',
    maker: 'スバル',
    model: 'レヴォーグ',
    year: 2024,
    price: 4200000,
    purchaseDate: '2025-11-01',
    deliveryDate: '2026-01-10',
    assignee: '田中美咲',
    status: '整備中',
    memo: 'ETC付き'
  },
  {
    id: '5',
    maker: 'ニッサン',
    model: 'セレナ',
    year: 2023,
    price: 3200000,
    purchaseDate: '2025-11-05',
    deliveryDate: '2025-12-15',
    assignee: '山田太郎',
    status: '納車準備完了',
    memo: ''
  }
];

