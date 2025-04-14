import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
      <header style={{ width: '100%'}}>
        <nav className='' style={{ justifyContent: 'center', backgroundColor: '#f8f9fa', padding: '10px' }}>
          <a className='' href='https://www.techcarrot.com' style={{ textDecoration: 'none', color: '#343a40', fontSize: '24px' }}>
            Employee Management System
          </a>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent
