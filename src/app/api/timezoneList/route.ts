import { NextResponse } from 'next/server'
// import { supabase } from '@/supabaseClient'
import timezones from './timezones.json'

export async function GET () {
  // const { data, error } = await supabase
  //   .from('Country')
  //   .select('*, Timezone(*)')
  // const res = await fs.readFile(resolve('./timezones.json'))
  // const data = res.toJSON()

  // console.log(timezones)

  // const info = readFile('./timezones.json')

  // if (error !== null) {
  //   console.log('jeegs')
  //   console.log(error)
  //   throw new Error('Error getting data')
  // }
  return NextResponse.json(timezones)
  // return NextResponse.json(data)
}
