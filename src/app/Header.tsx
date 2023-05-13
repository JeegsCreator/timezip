import { GitHub, Twitter } from './icons'

const Header = () => {
  return (
    <header className='border-b border-slate-500 h-14 flex items-center justify-between px-80'>
      <div>
        <p className='font-bold text-2xl'>TimeZip</p>
      </div>
      <div className='flex gap-4'>
        <a target='_blank' rel='noreferrer' className='h-10 aspect-square border border-slate-400 rounded-full text-xl grid place-items-center' href='https://github.com/JhonnGutierrez/timezip'><GitHub /></a>
        <a target='_blank' rel='noreferrer' className='h-10 aspect-square border border-slate-400 rounded-full text-xl grid place-items-center' href='https://twitter.com/JeegsGutierrez'><Twitter /></a>
      </div>
    </header>
  )
}

export default Header
