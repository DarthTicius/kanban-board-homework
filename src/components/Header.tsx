import { useState } from "react";

export function Header() {
	const [openMenu, setOpenMenu] = useState(false);
	const navigation = [
		{
			id: 'home',
			name: 'Home',
			href: '/'
		},
		{
			id: 'about',
			name: 'About',
			href: '/about'
		},
		{
			id: 'contact',
			name: 'Contact',
			href: '/contact'
		}
	] as const;
	return (
		<header className="py-2 mb-4 border-b">
			<nav
				className="relative z-30 mx-auto"
				role="navigation"
				aria-label="Main menu"
				id="main-menu"
			>
				<div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr,1fr,1fr] lg:gap-5">
					<div className="flex w-full max-w-[210px] grow md:mx-auto md:max-w-[250px] lg:mx-0 lg:max-w-[290px] lg:justify-self-start">
						<a
							href='/'
							className="block"
							aria-label="Go to homepage"
						>
							<span>HOME LOGO</span>
						</a>
					</div>
					<button
						type="button"
						className={`transition-all duration-300 lg:hidden ${openMenu ? 'rotate-90' : 'rotate-0'
							}`}
						onMouseDown={() => setOpenMenu(!openMenu)}
						aria-expanded={openMenu}
						aria-haspopup="true"
						aria-controls="main-menu"
						aria-label="Menu"
					>
						<div className="space-y-2">
							<div className="w-8 h-0.5 bg-gray-600"></div>
							<div className="w-8 h-0.5 bg-gray-600"></div>
							<div className="w-8 h-0.5 bg-gray-600"></div>
						</div>
					</button>
					<ul
						className="main_nav relative z-10 hidden flex-grow items-center justify-center lg:flex lg:h-full lg:w-full"
						role="navigation"
					>
						{navigation.map((navElement) => (
							navElement.href && (
								<li
									key={navElement.id}
									className="px-5 py-3"
									role="group"
								>
									<a
										href={navElement.href}
										className="text-lg font-medium hover:text-brand-blue-default"
									>
										{navElement.name}
									</a>
								</li>
							)
						)
						)}
					</ul>
				</div>
				{openMenu ? (
					<div className="absolute left-auto right-0 mx-auto w-full max-w-[290px] overflow-hidden overflow-y-visible bg-white lg:hidden">
						<ul
							role="menu"
							className="flex flex-col items-start justify-center px-4"
						>
							{navigation.map((navElement) =>
								navElement.href ? (
									<li
										key={navElement.id}
										className="mx-auto w-full border-t border-brand-gray-border p-4"
										role="group"
									>
										<a
											href={navElement.href}
											className="text-lg font-medium hover:text-brand-blue-default"
										>
											{navElement.name}
										</a>
									</li>
								) : null
							)}
						</ul>
					</div>
				) : null}
			</nav>
		</header>
	)
}
