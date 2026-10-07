import React from 'react'
import { useRoutes, Link, NavLink } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/:id',
      element: <LocationEvents />
    },
    {
      path: '/events',
      element: <Events />
    },
    {
      path: '*',
      element: (
        <div className='page-message'>
          <h2>Page not found</h2>
          <p>This page does not exist.</p>
          <Link to='/' className='text-link'>Back to the map</Link>
        </div>
      )
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1><Link to='/'>Pixel City Arcades</Link></h1>

        <nav className='header-buttons' aria-label='Main'>
          <NavLink to='/' end>Map</NavLink>
          <NavLink to='/events'>All events</NavLink>
        </nav>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App
