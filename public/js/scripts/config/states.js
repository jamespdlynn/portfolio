define(function(){
	return [
		{
			id : 'home',
			url : '/',
			label : 'Home',
			default : true,
			navDisabled : true
		},

		{
			id : 'about',
			label : 'About Me',
			template : 'about.html'
		},

		{
			id : 'portfolio',
			label : 'Portfolio',
			require : ['controller/port'],
			controller : 'PortfolioController',
			template : 'portfolio.html',
			abstract : true,
			states : [
				{
					id : 'hyper',
					url : '/hyper-galactic',
					label : 'Hyper Galactic',
					template : 'hyper-galactic.html'
				},

				{
					id : 'chess',
					url : '/chess-chaps',
					label : 'Chess Chaps',
					template : 'chess-chaps.html'
				},

				{
					id : 'league',
					url : '/league-champs',
					label : 'League Champs',
					template : 'league-champs.html'
				},

				{
					id : 'inmar',
					url : '/inmar-digital-coupons',
					label : 'Inmar Digital Coupons',
					template : 'inmar-digital-coupons.html'
				},

				{
					id : 'emerson',
					url : '/emeson-io',
					label : 'Emerson IO Calculator',
					template : 'emerson-io.html'
				},

				{
					id : 'oracle',
					url : '/oracle-roi-calculator',
					label : 'Oracle ROI Calculator',
					template : 'oracle-roi-calculator.html'
				}

			]
		},

		{
			id : 'resume',
			label : 'Resume',
			template : 'resume.html'
		},

		{
			id : 'contact',
			label : 'Contact',
			require : ['controller/contact'],
			controller : 'ContactController',
			template : 'contact.html'
		}

	];
});