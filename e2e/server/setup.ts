/**
 * This file initializes the convex service if available,
 */
import type { TestProject } from "vitest/node";

export function setup(project) {
	// check if convex instance is up and running

	// deploy convex backend to instance
	console.log("setup");
}

export function teardown() {
	// shutdown convex backend if made here
	console.log("teardown");
}

declare module "vitest" {
	export interface ProvidedContext {
		wsPort: number;
	}
}
