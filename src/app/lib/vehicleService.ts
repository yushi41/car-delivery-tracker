import { supabase } from '@/lib/supabase';
import { Vehicle } from '../types/vehicle';

/**
 * Supabaseから全ての車両データを取得
 */
export async function getAllVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('delivery_date', { ascending: true });

  if (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }

  // Supabaseのデータ形式をアプリの型に変換
  return data.map((vehicle) => ({
    id: vehicle.id,
    maker: vehicle.maker,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    purchaseDate: vehicle.purchase_date,
    deliveryDate: vehicle.delivery_date,
    assignee: vehicle.assignee,
    customerName: vehicle.customer_name || undefined,
    status: vehicle.status as any,
    memo: vehicle.memo || undefined,
  }));
}

/**
 * 特定の車両を取得
 */
export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching vehicle:', error);
    return null;
  }

  return {
    id: data.id,
    maker: data.maker,
    model: data.model,
    year: data.year,
    price: data.price,
    purchaseDate: data.purchase_date,
    deliveryDate: data.delivery_date,
    assignee: data.assignee,
    customerName: data.customer_name || undefined,
    status: data.status as any,
    memo: data.memo || undefined,
  };
}

/**
 * 車両を新規登録
 */
export async function createVehicle(vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle | null> {
  const { data, error } = await supabase
    .from('vehicles')
    .insert([
      {
        maker: vehicle.maker,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        purchase_date: vehicle.purchaseDate,
        delivery_date: vehicle.deliveryDate,
        assignee: vehicle.assignee,
        customer_name: vehicle.customerName || null,
        status: vehicle.status,
        memo: vehicle.memo || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating vehicle:', error);
    return null;
  }

  return {
    id: data.id,
    maker: data.maker,
    model: data.model,
    year: data.year,
    price: data.price,
    purchaseDate: data.purchase_date,
    deliveryDate: data.delivery_date,
    assignee: data.assignee,
    customerName: data.customer_name || undefined,
    status: data.status as any,
    memo: data.memo || undefined,
  };
}

/**
 * 車両情報を更新
 */
export async function updateVehicle(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle | null> {
  const updateData: any = {};
  
  if (vehicle.maker !== undefined) updateData.maker = vehicle.maker;
  if (vehicle.model !== undefined) updateData.model = vehicle.model;
  if (vehicle.year !== undefined) updateData.year = vehicle.year;
  if (vehicle.price !== undefined) updateData.price = vehicle.price;
  if (vehicle.purchaseDate !== undefined) updateData.purchase_date = vehicle.purchaseDate;
  if (vehicle.deliveryDate !== undefined) updateData.delivery_date = vehicle.deliveryDate;
  if (vehicle.assignee !== undefined) updateData.assignee = vehicle.assignee;
  if (vehicle.customerName !== undefined) updateData.customer_name = vehicle.customerName || null;
  if (vehicle.status !== undefined) updateData.status = vehicle.status;
  if (vehicle.memo !== undefined) updateData.memo = vehicle.memo;

  const { data, error } = await supabase
    .from('vehicles')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating vehicle:', error);
    return null;
  }

  return {
    id: data.id,
    maker: data.maker,
    model: data.model,
    year: data.year,
    price: data.price,
    purchaseDate: data.purchase_date,
    deliveryDate: data.delivery_date,
    assignee: data.assignee,
    customerName: data.customer_name || undefined,
    status: data.status as any,
    memo: data.memo || undefined,
  };
}

/**
 * 車両を削除
 */
export async function deleteVehicle(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting vehicle:', error);
    return false;
  }

  return true;
}

