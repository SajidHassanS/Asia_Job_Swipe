import React from 'react'
import { FaRegEdit } from "react-icons/fa";
const AboutMe = () => {
  return (
    <div className="border p-6  rounded-[20px] relative">
            <div className="flex justify-between">
                <h1 className="text-modaltext text-2xl">Description</h1>
                <FaRegEdit  className="text-blue border rounded-lg p-2" size={40} />
              </div>
              <div className='text-signininput text-lg'>
                <p>
                Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe’s software tools to accept payments, expand globally, and manage their businesses online. Stripe has been at the forefront of expanding internet commerce, powering new business models, and supporting the latest platforms, from marketplaces to mobile commerce sites. We believe that growing the GDP of the internet is a problem rooted in code and design, not finance. Stripe is built for developers, makers, and creators. We work on solving the hard technical problems necessary to build global economic infrastructure—from designing highly reliable systems to developing advanced machine learning algorithms to prevent fraud. </p>
              </div>

  </div>
  )
}

export default AboutMe