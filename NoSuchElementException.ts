export default class NoSuchElementException extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, NoSuchElementException.prototype);
    }
}
