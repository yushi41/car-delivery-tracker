-- 顧客名カラムを追加
ALTER TABLE vehicles 
ADD COLUMN IF NOT EXISTS customer_name TEXT;

-- 既存データがある場合のコメント（必要に応じて既存データを更新）
-- UPDATE vehicles SET customer_name = '顧客名' WHERE customer_name IS NULL;

