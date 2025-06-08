'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const [show, setShow] = useState('translate-y-0');
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 200) {
      // scrolling down
      if (currentScrollY > lastScrollY) {
        setShow('-translate-y-[80px]'); // hide
      } else {
        setShow('translate-y-0 shadow-lg'); // show + shadow
      }
    } else {
      setShow('translate-y-0'); // always show near top
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full bg-white 
        transition-transform duration-300 ease-in-out 
        z-50
        ${show}
      `}
    >
      <div className='w-container flex items-center justify-between py-2 xlg:py-1 mx-auto'>
        <Link href='/'>
          <Image
            src='/logo.png'
            width={170}
            height={40}
            alt='Logo of Supreme Group'
            loading='eager'
          />
        </Link>
        {/* TODO: add your nav links/buttons here */}
      </div>
    </header>
  );
};

export default Navbar;
