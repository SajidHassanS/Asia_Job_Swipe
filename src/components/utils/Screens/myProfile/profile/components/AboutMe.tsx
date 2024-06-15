import React from 'react'
import { FaRegEdit } from "react-icons/fa";
const AboutMe = () => {
  return (
    <div className="border p-6  rounded-[20px] relative">
            <div className="flex justify-between">
                <h1 className="text-modaltext text-2xl">About Me</h1>
                <FaRegEdit  className="text-blue border rounded-lg p-2" size={40} />
              </div>
              <div className='text-signininput text-lg'>
                <p>
                I’m a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I’m passionate about designing digital products that have a positive impact on the world.
                </p>
              <br/>
                <p>
                I’m a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I’m passionate about designing digital products that have a positive impact on the world.
                </p>
              </div>

  </div>
  )
}

export default AboutMe