import { Outlet } from 'react-router-dom'
import Navbar from './styled-components/Navbar/StyledNavbar'
import { useEffect, useState } from 'react'

export default function LayoutWithNav() {
  const [navBackground, setNavBackground] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Set green background on navbar when scrolling down
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)

    if (position > 150) {
      setNavBackground(true)
    } else {
      setNavBackground(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Navbar navBackground={navBackground} />
      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}
