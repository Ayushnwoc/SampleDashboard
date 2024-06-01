import React from "react";
import {
	BsSearch,
	BsJustify,
	BsBoxArrowRight
} from "react-icons/bs";

function Header({ OpenSidebar }) {
	return (
		<header className="header">
			<div className="menu-icon">
				<BsJustify className="icon" onClick={OpenSidebar} />
			</div>
			{/* <div className='header-left'>
            <BsSearch  className='icon'/>
        </div> */}
			<div className="search-box">
				<input
					type="text"
					placeholder="Search..."
          className="search-input"
				/>
				<button className="search-button">
					<BsSearch />
				</button>
			</div>
			<div className="header-right">
				<BsBoxArrowRight style={{fontSize:'30px'}} className="icon" />
			</div>
		</header>
	);
}

export default Header;
