module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{png,jpg,html,json,js,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};