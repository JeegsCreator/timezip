import Script from 'next/script'
import React from 'react'

function Analytics() {
  return (
    <div>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-X0BVM58N5X'
      />
      <Script id='google-analytics'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-X0BVM58N5X');
      `}
      </Script>
    </div>
  )
}

export default Analytics
