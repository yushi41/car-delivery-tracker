'use server';

import { revalidatePath } from 'next/cache';
import { 
  createVehicle as createVehicleService,
  updateVehicle as updateVehicleService,
  deleteVehicle as deleteVehicleService
} from '../lib/vehicleService';
import { Vehicle } from '../types/vehicle';

export async function createVehicleAction(vehicleData: Omit<Vehicle, 'id'>) {
  try {
    const result = await createVehicleService(vehicleData);
    
    if (result) {
      // ページのキャッシュを無効化して再読み込みを強制
      revalidatePath('/');
      return { success: true, data: result };
    }
    
    return { success: false, error: 'Failed to create vehicle' };
  } catch (error) {
    console.error('Error in createVehicleAction:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function updateVehicleAction(id: string, vehicleData: Partial<Vehicle>) {
  try {
    const result = await updateVehicleService(id, vehicleData);
    
    if (result) {
      revalidatePath('/');
      return { success: true, data: result };
    }
    
    return { success: false, error: 'Failed to update vehicle' };
  } catch (error) {
    console.error('Error in updateVehicleAction:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function deleteVehicleAction(id: string) {
  try {
    const result = await deleteVehicleService(id);
    
    if (result) {
      revalidatePath('/');
      return { success: true };
    }
    
    return { success: false, error: 'Failed to delete vehicle' };
  } catch (error) {
    console.error('Error in deleteVehicleAction:', error);
    return { success: false, error: 'An error occurred' };
  }
}

