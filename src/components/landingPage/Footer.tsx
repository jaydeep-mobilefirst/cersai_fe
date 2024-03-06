import React from 'react'

type Props = {}

export const Footer = (props: Props) => {
  return (
    <footer className="bg-green-700 text-white text-sm bg-footer-gradient-custom">
      <nav className="flex-col flex-wrap justify-center items-center p-4 max-w-screen-xl mx-auto border-b border-opacity-50" style={{borderColor : "#5DAF4C", fontSize : "16px"}}>
        {/* primary nav */}
        <div className="w-full md:flex md:items-center md:w-auto md:space-x-4 md:justify-center">
          <>
            <a href="#" className="block px-2 py-1 border-r border-white md:inline-block pr-6">
              Home
            </a>
            <a href="#" className="block px-2 py-1 border-r border-white md:inline-block pr-6">
              FAQ
            </a>
            <a href="#" className="block px-2 py-1 border-r border-white md:inline-block pr-6">
              Notifications
            </a>
            <a href="#" className="block px-2 py-1 border-r border-white md:inline-block pr-6">
              Operating Guidelines
            </a>
            <a href="#" className="block px-2 py-1 border-r border-white md:inline-block pr-6">
              Downloads
            </a>
            <a href="#" className="block px-2 py-1 border-r border-white md:inline-block pr-6">
              Training
            </a>
            <a href="#" className="block px-2 py-1 border-r border-white md:inline-block pr-6">
              Contact Us
            </a>
            <a href="#" className="block px-2 py-1 md:border-r-0 md:inline-block">
              Sitemap
            </a>
          </>

        </div>
        {/* secondary nav */}

      </nav>
      <div
        className="py-4 text-center"
        style={{fontSize : "10px"}}
        // style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div className="mt-4 md:mt-0 flex justify-center">
          <p>
            Powered and managed by NSE Data and Analytics Limited
          </p>
        </div>
        COPYRIGHT © 2021 CBRS AI. ALL RIGHTS RESERVED.
      </div>
    </footer>


  )
}