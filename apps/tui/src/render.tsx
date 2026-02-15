import React from "react";
import { render as inkRender, type RenderOptions } from "ink";
import App from "./App.js";

export interface TuiRenderOptions {
	/** stdout stream (default: process.stdout) */
	stdout?: NodeJS.WriteStream;
	/** stdin stream (default: process.stdin) */
	stdin?: NodeJS.ReadStream;
	/** stderr stream (default: process.stderr) */
	stderr?: NodeJS.WriteStream;
	/** Debug mode - logs unhandled errors to stderr */
	debug?: boolean;
	/** Exit on Ctrl+C (default: true) */
	exitOnCtrlC?: boolean;
	/** Patch console methods to prevent output breaking TUI (default: true) */
	patchConsole?: boolean;
	/** Additional props to pass to the App component */
	appProps?: {
		initialCounter?: number;
		/** Any other future props for App component */
		[key: string]: unknown;
	};
}

/**
 * Renders the TUI application with customizable options.
 * This function can be used both as a CLI tool and as an SSH server component.
 */
export function renderTui(
	options: TuiRenderOptions = {},
): ReturnType<typeof inkRender> {
	const {
		stdout = process.stdout,
		stdin = process.stdin,
		stderr = process.stderr,
		debug = false,
		exitOnCtrlC = true,
		patchConsole = true,
		appProps = {},
	} = options;

	const inkOptions: RenderOptions = {
		stdout,
		stdin,
		stderr,
		debug,
		exitOnCtrlC,
		patchConsole,
	};

	return inkRender(<App {...appProps} />, inkOptions);
}

export default renderTui;
