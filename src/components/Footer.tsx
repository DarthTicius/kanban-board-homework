import { Facebook } from "@src/assets/icons/Facebook";
import { GitHub } from "@src/assets/icons/GitHub";
import { Instagram } from "@src/assets/icons/Instagram";
import { Twitter } from "@src/assets/icons/Twitter";

export function Footer() {
	const navigation = {
		solutions: [
			{ name: 'Marketing', href: '#' },
			{ name: 'Analytics', href: '#' },
			{ name: 'Automation', href: '#' },
			{ name: 'Commerce', href: '#' },
			{ name: 'Insights', href: '#' },
		],
		support: [
			{ name: 'Submit ticket', href: '#' },
			{ name: 'Documentation', href: '#' },
			{ name: 'Guides', href: '#' },
		],
		company: [
			{ name: 'About', href: '#' },
			{ name: 'Blog', href: '#' },
			{ name: 'Jobs', href: '#' },
			{ name: 'Press', href: '#' },
		],
		legal: [
			{ name: 'Terms of service', href: '#' },
			{ name: 'Privacy policy', href: '#' },
			{ name: 'License', href: '#' },
		],
		social: [
			{
				name: 'Facebook',
				href: '#',
				icon: () => (<Facebook color="black" aria-hidden='true' className="w-6 h-6" />),
			},
			{
				name: 'Instagram',
				href: '#',
				icon: () => (<Instagram color="black" aria-hidden='true' className="w-6 h-6" />),
			},
			{
				name: 'X',
				href: '#',
				icon: () => (<Twitter color="black" aria-hidden='true' className="w-6 h-6" />),
			},
			{
				name: 'GitHub',
				href: '#',
				icon: () => (<GitHub color="black" aria-hidden='true' className="w-6 h-6" />),
			},
		],
	} as const;
	return (
		<footer className="bg-white">
			<div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="space-y-8">
						<img
							alt="Company name"
							src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
							className="h-9"
						/>
						<p className="text-balance text-sm/6 text-gray-600">
							Making the world a better place through constructing elegant hierarchies.
						</p>
						<div className="flex gap-x-6">
							{navigation.social.map((item) => (
								<a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-800">
									<span className="sr-only">{item.name}</span>
									{item.icon()}
								</a>
							))}
						</div>
					</div>
					<div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm/6 font-semibold text-gray-900">Solutions</h3>
								<ul role="list" className="mt-6 space-y-4">
									{navigation.solutions.map((item) => (
										<li key={item.name}>
											<a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-10 md:mt-0">
								<h3 className="text-sm/6 font-semibold text-gray-900">Support</h3>
								<ul role="list" className="mt-6 space-y-4">
									{navigation.support.map((item) => (
										<li key={item.name}>
											<a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm/6 font-semibold text-gray-900">Company</h3>
								<ul role="list" className="mt-6 space-y-4">
									{navigation.company.map((item) => (
										<li key={item.name}>
											<a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-10 md:mt-0">
								<h3 className="text-sm/6 font-semibold text-gray-900">Legal</h3>
								<ul role="list" className="mt-6 space-y-4">
									{navigation.legal.map((item) => (
										<li key={item.name}>
											<a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
					<p className="text-sm/6 text-gray-600">&copy; {new Date().getFullYear()} Your Company, Inc. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
