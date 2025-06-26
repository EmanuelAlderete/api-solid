export class EmailAlreadyRegisteredError extends Error {
	constructor() {
		super('E-mail already registered.')
	}
}
