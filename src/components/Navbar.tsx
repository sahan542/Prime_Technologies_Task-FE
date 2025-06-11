import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='hidden lg:block'>
        <div className="container">
            <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-black">
                <Link className='navbar__link relative' href="#" >SKIN CARE
                </Link>
                                <Link className='navbar__link relative' href="#" >CLENSERS
                </Link>
                                <Link className='navbar__link relative' href="#" >MOISTURIZORS
                </Link>
                                <Link className='navbar__link relative' href="#" >SERAMS
                </Link>
                                <Link className='navbar__link relative' href="#" >TONERS
                </Link>
                                <Link className='navbar__link relative' href="#" >EYE & LIP CARE
                </Link>
                                <Link className='navbar__link relative' href="#" >BLOG
                </Link>
                                <Link className='navbar__link relative' href="#" >HOT OFFERS
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar