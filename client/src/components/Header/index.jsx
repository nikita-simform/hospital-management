import React from 'react'
import PropTypes from 'prop-types'

function Header(props) {
  return (
    <div class="fixed-header">
        <div class="container">
          <nav>
            <a href="/login">Login</a>
            <a href="#">Sign up</a>
          </nav>
        </div>
      </div>
  )
}

Header.propTypes = {

}

export default Header;