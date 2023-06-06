import { BuyMeACoffeeIcon } from './icons'

const BuyMeACoffee = () => {
  return (
    <a
      className='flex gap-2 px-4 border-2 text-text h-8 border-[#FFDD00] items-center rounded-lg hover:bg-[#FFDD0022] font-medium text-lg transition-colors'
      href='https://www.buymeacoffee.com/jeegs'
      target='_blank'
      rel='noreferrer'
    >
      <BuyMeACoffeeIcon />
      <span className='text-base'>Buy me a coffee</span>
    </a>
  )
}

export default BuyMeACoffee
