import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className='relative text-gray-800'>
      {/* Background image */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src='/footer.jpg'
          alt='Footer background'
          layout='fill'
          objectFit='cover'
          priority={false}
        />
      </div>

      {/* Main content grid */}
      <div className='max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8'>
        {/* Logo */}
        <div>
          <Image
            src='/logo.png'
            alt='Supreme Group logo'
            width={160}
            height={40}
          />
        </div>

        {/* Applications column */}
        <div>
          <h3 className='text-sm font-semibold mb-4 uppercase'>Applications</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='#' className='hover:underline'>
                Apparel
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Automotive
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Filtration
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Customised Nonwoven
              </a>
            </li>
          </ul>
        </div>

        {/* Company column */}
        <div>
          <h3 className='text-sm font-semibold mb-4 uppercase'>Company</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='#' className='hover:underline'>
                Who We Are
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Global Competency
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Innovation
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                ESG Impact
              </a>
            </li>
          </ul>
        </div>

        {/* More column */}
        <div>
          <h3 className='text-sm font-semibold mb-4 uppercase'>More</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='#contact' className='hover:underline'>
                Contact Us
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us column */}
        <div>
          <h3 className='text-sm font-semibold mb-4 uppercase'>Follow Us</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a
                href='https://www.linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline'
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom row */}
      <div className='border-gray-300 pt-4 text-sm text-gray-600 flex flex-col md:flex-row justify-between max-w-7xl mx-auto px-6 py-4'>
        <span>©2024. All Rights Reserved.</span>
        <span>Supreme House, 110, 16th Road, Chembur, Mumbai – 400071.</span>
      </div>
    </footer>
  );
};

export default Footer;
