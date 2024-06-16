import React from 'react';

const PersonalInfo = () => {
  return (
    <div className='pb-10'>
      <h1 className="text-custom-dark-blue text-xl">Personal Info</h1>
   
      {/* ? "border-b-2 border-signature text-custom-dark-blue" */}
      {/* : "text-custom-gray-blue hover:text-signature"; */}

      <div className="mt-5">
        <div className="flex gap-4">
          <div className="w-1/2 ">
            <p className='text-custom-gray-blue md:text-sm'>Full Name</p>
            <p className='text-custom-dark-blue md:text-sm'> Jerome Bell</p>
          </div>
          <div className="w-1/2 ">
            <p className='text-custom-gray-blue md:text-sm'>Gender</p>
            <p className='text-custom-dark-blue md:text-sm'>Male</p>
          </div>
        </div>

        <div className="flex mt-5 gap-4">
          <div className="w-1/2 ">
            <p className='text-custom-gray-blue md:text-sm'>Date of Birth</p>
            <p className='text-custom-dark-blue md:text-sm'>March 23, 1995 (26 y.o)</p>
          </div>
          <div className="w-1/2 ">
            <p className='text-custom-gray-blue md:text-sm'>Language</p>
            <p className='text-custom-dark-blue md:text-sm'>English, French, Bahasa</p>
          </div>
        </div>
       
        <div className="flex mt-5 gap-4">
          <div className="w-1/2 ">
            <p className='text-custom-gray-blue md:text-sm'>Address</p>
            <p className='text-custom-dark-blue md:text-sm'>4517 Washington Ave. Manchester, Kentucky 39495</p>
          </div>
        </div>
        <div className='border border-secondary my-5'></div>
      </div>

      <div className="mt-6">
        <h1 className="text-custom-dark-blue text-xl">Professional Info</h1>

        <div className="mt-5 ">
          <p className='text-custom-gray-blue md:text-sm'>About Me</p>
          <h1 className='text-custom-dark-blue md:text-sm'>
            I&apos;m a product designer + filmmaker currently working remotely 
            at Twitter from beautiful Manchester, United Kingdom. I&apos;m passionate about designing digital products that 
            have a positive impact on the world.
          </h1>
          <br/>
          <h1 className='text-custom-dark-blue md:text-sm'>
            For 10 years, I&apos;ve specialized in interface, experience &amp; interaction design as well as working in user research and product strategy for product agencies, big tech companies &amp; start-ups.
          </h1>
        </div>

        <div className="mt-5">
          <div className="flex gap-4">
            <div className="w-1/2 ">
              <p className='text-custom-gray-blue md:text-sm'>Current Job</p>
              <p className='text-custom-dark-blue md:text-sm'> Product Designer</p>
            </div>
            <div className="w-1/2 ">
              <p className='text-custom-gray-blue md:text-sm'>Experience in Years</p>
              <p className='text-custom-dark-blue md:text-sm'>4 Years</p>
            </div>
          </div>

          <div className="flex mt-5 gap-4">
            <div className="w-1/2 ">
              <p className='text-custom-gray-blue md:text-sm'>Highest Qualification Held</p>
              <p className='text-custom-dark-blue md:text-sm'>Bachelors in Engineering</p>
            </div>
            <div className="w-1/2 ">
              <p className='text-custom-gray-blue md:text-sm'>Skill set</p>
              <div className='flex flex-wrap gap-2'>
                <span className=" bg-secondary text-signature md:text-sm px-2 py-1 rounded-lg">Project Management</span>
                <span className=" bg-secondary text-signature md:text-sm px-2 py-1 rounded-lg">Copywriting</span>
                <span className=" bg-secondary text-signature md:text-sm px-2 py-1 rounded-lg">English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
