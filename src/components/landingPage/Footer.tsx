import React from 'react'

type Props = {}

export const Footer = (props: Props) => {
  let arr = [
    {"heading": "Home", "link": "#"},
    {"heading": "FAQ", "link": "#"},
    {"heading": "Notifications", "link": "#"},
    {"heading": "Operating Guidelines", "link": "#"},
    {"heading": "Downloads", "link": "#"},
    {"heading": "Training", "link": "#"},
    {"heading": "Contact Us", "link": "#"},
    {"heading": "Sitemap", "link": "#"}
  ]
  return (
    <footer className="text-white text-sm bg-footer-gradient-custom">
      <nav className="flex-col flex-wrap justify-center items-center p-4 max-w-screen-xl mx-auto border-b border-opacity-50 pb-6" style={{borderColor : "#5DAF4C", fontSize : "16px"}}>
        {/* primary nav */}
        <div className="w-full md:flex md:items-center md:w-auto md:space-x-4 md:justify-center flex-wrap">
          <>{
            arr.map((link) => {
              return <a href="#" className="block px-2 py-1 border-r border-white md:inline-block pr-6">
              {link.heading.toUpperCase()}
            </a>
            })
          }
          </>
        </div>
        {/* secondary nav */}

      </nav>
      <div
        className="py-4 text-center mt-6"
        style={{fontSize : "10px"}}
        // style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        COPYRIGHT © 2021 CBRS AI. ALL RIGHTS RESERVED.
        <div className="mt-4 md:mt-0 flex justify-center">
          <p>
            Powered and managed by <span className='underline font-bold'>NSE Data and Analytics Limited</span>
          </p>
        </div>
      </div>
    </footer>


  )
}

export default Footer;