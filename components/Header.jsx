"use client";
import Link from 'next/link';

const Header = () => {
  return (
    <header className='sticky top-0 z-999 flex w-full bg-white'>
      <div className='flex items-center justify-between px-8 py-5 shadow w-full'>
        <img src="/logo.gif" alt="Logo" className="h-10 w-auto mr-4" />
        <nav className='flex items-center gap-3 2xsm:gap-7 text-black ml-auto'>
          <Link href="/" className="p-2">Home</Link>
          <Link href="/bearing-pads" className="p-2">Bearing Pads</Link>
          <Link href="/rubber-parts" className="p-2">Rubber Parts</Link>
          <Link href="/ramps" className="p-2">Ramps</Link>
          <Link href="/experience" className="p-2">Experience</Link>
          <Link href="/company" className="p-2">Company</Link>
          <Link href="/contact-us" className="p-2">Contact Us</Link>
          <Link href="/employment" className="p-2">Employment</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
