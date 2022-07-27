import NoSuchElementException from "./NoSuchElementException";

export default class Optional<T> {
    private constructor(private value: T | null) {}

    public static empty<T>(): Optional<T> {
        return Optional.of<T>(null);
    }

    public static of<T>(value: T | null): Optional<T> {
        return new Optional<T>(value);
    }

    public filter(f: (v: T) => boolean): Optional<T> {
        if (this.value !== null && f(this.value)) {
            return Optional.of<T>(this.value);
        }

        return Optional.empty();
    }

    public flatMap<U>(f: (v: T) => Optional<U>): Optional<U> {
        if (this.value === null) {
            return Optional.empty();
        }
        
        return f(this.value);
    }

    public map<U>(f: (v: T) => U): Optional<U> {
        if (this.value === null) {
            return Optional.empty();
        }

        return Optional.of(f(this.value));
    }

    public get(): T {
        if (this.value === null) {
            throw new NoSuchElementException("Empty value");
        }

        return this.value;
    }

    public ifPresent(f: (a: T) => void): void {
        if (this.value !== null) {
            f(this.value);
        }
    }

    public isPresent(): boolean {
        return this.value !== null;
    }


    public orElse(other: T): T {
        const v = this.value ?? other;

        if (v === null) {
            throw new NoSuchElementException("Empty value");
        }
        
        return v;
    }

    public orElseGet(f: () => T): T {
        const v = this.value ?? f();

        if (v === null) {
            throw new NoSuchElementException("Empty value");
        }

        return v;
    }

    public orElseThrow(e: Error): T {
        if (this.value === null) {
            throw e;
        }

        return this.value;
    }
}
