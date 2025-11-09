-- 車両テーブルを作成
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  maker TEXT NOT NULL,                    -- メーカー
  model TEXT NOT NULL,                    -- 車種
  year INTEGER,                           -- 年式
  price INTEGER,                          -- 価格
  purchase_date DATE NOT NULL,            -- 購入日
  delivery_date DATE NOT NULL,            -- 納車予定日
  assignee TEXT NOT NULL,                 -- 担当者名
  status TEXT NOT NULL,                   -- ステータス
  memo TEXT,                              -- メモ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 更新日時を自動更新するトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガーを設定
CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- サンプルデータを挿入（テスト用）
INSERT INTO vehicles (maker, model, year, price, purchase_date, delivery_date, assignee, status, memo)
VALUES
  ('トヨタ', 'プリウス', 2022, 2800000, '2025-10-15', '2025-11-23', '山田太郎', '整備中', 'ナビとドラレコを後付け予定'),
  ('ホンダ', 'フィット', 2023, 2200000, '2025-10-20', '2025-12-06', '佐藤花子', '書類手続き中', ''),
  ('マツダ', 'CX-5', 2023, 3500000, '2025-10-25', '2025-12-23', '鈴木一郎', '契約済み', ''),
  ('スバル', 'レヴォーグ', 2024, 4200000, '2025-11-01', '2026-01-10', '田中美咲', '整備中', 'ETC付き'),
  ('ニッサン', 'セレナ', 2023, 3200000, '2025-11-05', '2025-12-15', '山田太郎', '納車準備完了', '');

