# Auth0 Express middleware #

### What is this repository for? ###

This is a module to quickly add the middleware necessary to decode and verify the Auth0 JSON Web Token.

### How do I get set up? ###

- Install the module by running `yarn` or `npm install`.

### Methods available ###

- Verify token: decodes and verifies the signature of the JWT token. Expects the id token and an object with the required configurations. Returns the decoded token. 

