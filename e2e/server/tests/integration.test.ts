import { afterAll, beforeAll, expect, test } from "vitest";

function sum(a: number, b: number) {
	return a + b;
}

beforeAll(() => {
	// note tables and all that
});

afterAll(() => {
	// clearAll
});

test("adds 1 + 2 to equal 3", () => {
	expect(sum(1, 2)).toBe(3);
});
