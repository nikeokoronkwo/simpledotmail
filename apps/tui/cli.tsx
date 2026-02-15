#!/usr/bin/env node
import React from "react";
import { renderTui } from "./src/render.js";

interface ParsedArgs {
	/** Initial counter value */
	initialCounter: number;
	/** Debug mode */
	debug: boolean;
	/** Don't exit on Ctrl+C */
	noExitOnCtrlC: boolean;
	/** Show help */
	help: boolean;
}

function parseArgs(): ParsedArgs {
	const args = process.argv.slice(2);
	const parsed: ParsedArgs = {
		initialCounter: 0,
		debug: false,
		noExitOnCtrlC: false,
		help: false,
	};

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];

		switch (arg) {
			case "--help":
			case "-h":
				parsed.help = true;
				break;
			case "--debug":
			case "-d":
				parsed.debug = true;
				break;
			case "--no-exit-on-ctrl-c":
				parsed.noExitOnCtrlC = true;
				break;
			case "--initial-counter":
			case "-c": {
				const value = args[++i];
				if (value === undefined || Number.isNaN(Number(value))) {
					console.error(`Error: --initial-counter requires a numeric value`);
					process.exit(1);
				}
				parsed.initialCounter = Number(value);
				break;
			}
			default:
				if (arg?.startsWith("-")) {
					console.error(`Error: Unknown option ${arg}`);
					process.exit(1);
				}
				break;
		}
	}

	return parsed;
}

function showHelp(): void {
	console.log(`
TUI Application

Usage: tui [options]

Options:
  -h, --help                    Show this help message
  -d, --debug                   Enable debug mode (logs unhandled errors to stderr)
  -c, --initial-counter <num>   Set initial counter value (default: 0)
  --no-exit-on-ctrl-c           Don't exit on Ctrl+C

Examples:
  tui                           Run with default options
  tui --debug                   Run in debug mode
  tui -c 100                    Start counter at 100
  tui --debug -c 50             Debug mode with custom counter
`);
}

function main(): void {
	const args = parseArgs();

	if (args.help) {
		showHelp();
		process.exit(0);
	}

	// Render the TUI with parsed arguments passed to App component
	renderTui({
		debug: args.debug,
		exitOnCtrlC: !args.noExitOnCtrlC,
		appProps: {
			initialCounter: args.initialCounter,
		},
	});
}

main();
