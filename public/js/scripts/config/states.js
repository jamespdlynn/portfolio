define(function(){
	return [
		{
			id : 'home',
			url : '/',
			label : 'Home',
			navDisabled : true,
			default : true
		},

		{
			id : 'about',
			label : 'About Me',
			template : 'about.html'
		},

		{
			id : 'portfolio',
			label : 'Portfolio',
			controller : 'PortfolioController',
			template : 'portfolio.html',
			abstract : true,
			states : [
				{
					url : '',
					id : 'hyper-galactic',
					label : 'Hyper Galactic',
					template : 'hyper-galactic.html'
				},

				{
					id : 'chess-chaps',
					label : 'Chess Chaps',
					template : 'chess-chaps.html'
				},

				{
					id : 'league-champs',
					label : 'League Champs',
					template : 'league-champs.html'
				},

				{
					id : 'inmar-digital-coupons',
					label : 'Inmar Digital Coupons',
					template : 'inmar-digital-coupons.html'
				},

				{
					id : 'emerson-io',
					label : 'Emerson IO Calculator',
					template : 'emerson-io.html'
				},

				{
					id : 'oracle-roi-calculator',
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
			controller : 'ContactController',
			template : 'contact.html'
		}

	];
});