"use strict";

const jwt = require('jsonwebtoken');

/**
 * Decodes the JSON Web Token and verifies it's signature. Returns the decoded token.
 * @param {String} idToken 
 * @param {Object} options
 * @param {String} options.clientSecret
 * @param {String} options.clientId
 * @param {Array}  options.issuingDomains
 * @returns	{Object} 
 */

function verifyToken(idToken, {
	clientSecret,
	clientId,
	issuingDomains
}) {
	const key = Buffer.from(clientSecret, 'base64');
	const options = {
		algorithms: ['HS256'],
		issuingDomains,
		clientId
	};
	const userAuthInfo = jwt.verify(idToken, key, options);
	return userAuthInfo;
};

module.exports = function (idTokenLocator, config) {

	return function (req, res, next) {
		const idToken = idTokenLocator(req);

		req.userAuthInfo = verifyToken(idToken, config);
		next();
	}
}