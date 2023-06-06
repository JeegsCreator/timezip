import BuyMeACoffee from './BuyMeACoffee'
import { GitHub, Twitter } from '@/components/icons'

const Footer = () => {
  return (
    <footer className='h-full border-t border-slate-400 flex flex-col justify-center items-center gap-4'>
      <div className='flex gap-4 mt-8'>
        <BuyMeACoffee />
        <a target='_blank' rel='noreferrer' className='h-8 aspect-square text-xl grid place-items-center' href='https://github.com/JhonnGutierrez/timezip'><GitHub /></a>
        <a target='_blank' rel='noreferrer' className='h-8 aspect-square text-xl grid place-items-center' href='https://twitter.com/JeegsGutierrez'><Twitter /></a>
      </div>
      <span className='mb-8'>Build with ❤️ by <a target='_blank' rel='noreferrer' href='https://twitter.com/JeegsGutierrez' className='underline'>Jeegs</a></span>
    </footer>
  )
}

export default Footer
