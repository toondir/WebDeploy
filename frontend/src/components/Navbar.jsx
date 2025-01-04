import { useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { NavLink } from 'react-router-dom'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Note', href: '/note' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Maps', href: '/map' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar() {
  
  const [current, setCurrent] = useState('/');

  return (
    <Disclosure as="nav" className="bg-gray-800 font-custom ">
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-left justify-left sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    
                    onClick={() => {setCurrent(item.href); this.forceUpdate()}} 
                    className={({ isActive }) =>
                      classNames(
                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 transition ease-in-out duration-500 hover:bg-gray-700 hover:text-white ',
                        'rounded-md px-3 py-2 text-[17px] font-medium',
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}

export default Navbar;
