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

/** 
 * The function which returns your id token from request object
 * @name IdTokenLocator
 * @function
 * @param {Object} req the express request object
 * @returns {String} id token that we want to decode and verify 
*/

/** 
 * The function that returns the redirect url
 * @name RedirectUrl
 * @function
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 * @returns {String} the url where the user is redirected is the token is not verified 
*/

/**
 * Middleware that verifies an JSON Web Token and redirects to a given url if the verification fails.
 * @param {IdTokenLocator} idTokenLocator the function which returns your id token from request object
 * @param {RedirectUrl} redirectUrl the function that returns the redirect url
 * @param {Object} config 
 */
module.exports = function (idTokenLocator, redirectUrl, config) {

	return function (req, res, next) {
		const idToken = idTokenLocator(req);

		try {
			req.userAuthInfo = verifyToken(idToken, config);
			next();
		} catch (err) {
			res.redirect(redirectUrl(req,res));
		}
	}
}