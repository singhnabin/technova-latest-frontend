import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { isauthenticated, isLogout } from './backend/Auth';
import { AuthContext } from './context/CartContext';
function Header() {
  const history = useHistory();
  const { user, setUser } = React.useContext(AuthContext);
  const isLoggedIn = isauthenticated();

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">

        <Navbar.Brand href="/" >TechNova</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Link to="/aboutus">About Us</Link>
            <Link to="/product">Products</Link>
            <Link to="/category">Category</Link>
            <Link to="/admin/dashboard">Admin</Link>
            <Link to="/video">Prime Video</Link>
            <Link to="/weather">Weather</Link>

            <NavDropdown title="User Options" id="collasible-nav-dropdown" >
              {(!user || !isLoggedIn)}
              {(user || isLoggedIn) ? (
                <div className="logout-menu text-center">
                  <li className='nav-item'><span className='nav-link text-warning' onClick={() => isLogout(setUser, () => {
                    history.push('/login')
                  })}> Log Out</span></li>
                  <Link to="/cart">Cart</Link></div>
              ) : (<>
                <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>


              </>)}
              {/* //<NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item> */}
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
          {/* <Nav>
      <Nav.Link href="#deets">About Us</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav> */}
        </Navbar.Collapse>

      </Navbar>
      <Link to="/"></Link>

    </div>
  )
}

export default Header;
