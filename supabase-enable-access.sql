-- Row Level Security (RLS) のポリシーを設定
-- これにより、匿名ユーザーでもvehiclesテーブルを操作できるようになります

-- 既存のポリシーを削除（エラーが出てもOK）
DROP POLICY IF EXISTS "Enable read access for all users" ON vehicles;
DROP POLICY IF EXISTS "Enable insert access for all users" ON vehicles;
DROP POLICY IF EXISTS "Enable update access for all users" ON vehicles;
DROP POLICY IF EXISTS "Enable delete access for all users" ON vehicles;

-- RLSを有効化（既に有効でもOK）
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- すべてのユーザーに読み取り権限を付与
CREATE POLICY "Enable read access for all users" 
ON vehicles FOR SELECT 
USING (true);

-- すべてのユーザーに挿入権限を付与
CREATE POLICY "Enable insert access for all users" 
ON vehicles FOR INSERT 
WITH CHECK (true);

-- すべてのユーザーに更新権限を付与
CREATE POLICY "Enable update access for all users" 
ON vehicles FOR UPDATE 
USING (true);

-- すべてのユーザーに削除権限を付与
CREATE POLICY "Enable delete access for all users" 
ON vehicles FOR DELETE 
USING (true);

