const { NavLink, Link } = ReactRouterDOM

export function AppHeader() {
  return (
    <React.Fragment>
      <Link to='/book'>
        <h1>Miss Book</h1>
      </Link>
      <nav className='app-nav'>
        <NavLink to='/'>Home</NavLink> |<NavLink to='/book'>Book</NavLink> |
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/BookAdd'>Search Book</NavLink>
      </nav>
    </React.Fragment>
  )
}
