const ResultComponent = ({ emoji, hour }: { emoji: string[], hour: string }) => {
  return (
    <p>
      <span className='font-emoji'>{emoji}</span>
      <span>{hour} </span>
    </p>
  )
}

export default ResultComponent
