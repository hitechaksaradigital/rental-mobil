import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey);

export async function fetchArmada() {
  const { data, error } = await supabase
    .from('armada')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function insertArmada(payload) {
  const { data, error } = await supabase
    .from('armada')
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteArmada(id) {
  const { error } = await supabase.from('armada').delete().eq('id', id);
  if (error) throw error;
}

export async function updateArmadaStatus(id, status) {
  const { error } = await supabase.from('armada').update({ status }).eq('id', id);
  if (error) throw error;
}