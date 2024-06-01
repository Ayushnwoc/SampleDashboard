import React from 'react'
import profilePic from './assets/profile.png'
import 
{ BsHouseAddFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                WiJungle
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
        <hr/>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'25px' }}>
            <img style={{ width: '150px', height: '150px' }} src={profilePic} alt="Profile Pic" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center',color:'white' }}>
            <h3>Ayush Kumar</h3>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                    <BsHouseAddFill className='icon'/> Dashboard
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar