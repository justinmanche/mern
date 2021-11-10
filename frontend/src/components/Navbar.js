import React, { useState } from 'react'
import classnames from 'classnames'
import 'navbar.css'

const NavLink = ({ href = '#', text, closeMenu }) => (
	<li className="ml-10">
		<a className='text-primary text-4xl hover:text-hover' onClick={() => closeMenu()} href={href}>{text}</a>
	</li>
)

export const Navbar = () => {
	const [hamburgerActive, setHamburgerActive] = useState(false)
	const [navActive, setNavActive] = useState(false)
	const navItems = [
		{ href: '/items', text: 'Items' },
		{ href: '/users', text: 'Users' }
	]

	const closeMenu = () => {
		setHamburgerActive(false)
		setNavActive(false)
	}

	const mobileMenu = () => {
		setHamburgerActive(!hamburgerActive)
		setNavActive(!navActive)
	}

	return (
		<nav className="py-4 flex justify-between align-center">
			<a href="/" className="text-5xl text-secondary">MERN</a>
			<ul className={classnames('flex justify-between align-center', { active: navActive })}>
				{
					navItems.map(item => (
						<NavLink
							key={item.text}
							href={item.href}
							text={item.text}
							closeMenu={closeMenu}/>
					))
				}
			</ul>
			<div
				className={classnames('hamburger', { active: hamburgerActive })}
				onClick={mobileMenu}>
				<span className="bar"></span>
				<span className="bar"></span>
				<span className="bar"></span>
			</div>
		</nav>
	)
}
