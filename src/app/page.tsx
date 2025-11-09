import HomeClient from './components/HomeClient';
import { getAllVehicles } from './lib/vehicleService';

export default async function Home() {
  // Supabaseから車両データを取得（納車予定日が近い順）
  const vehicles = await getAllVehicles();

  return <HomeClient initialVehicles={vehicles} />;
}

