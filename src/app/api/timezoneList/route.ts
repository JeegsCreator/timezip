import { NextResponse } from 'next/server'
import { supabase } from '@/supabaseClient'

export async function GET () {
  const { data, error } = await supabase
    .from('Country')
    .select('*, Timezone(*)')

  if (error !== null) {
    console.log('jeegs')
    console.log(error)
    throw new Error('Error getting data')
  }
  return NextResponse.json(data)
}
