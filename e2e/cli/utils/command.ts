import { spawn, execSync } from "node:child_process";
import type { ReadableStream, WritableStream } from "node:stream/web";
import { Readable, Writable } from "node:stream";

export const enum CommandOptionMode {
	equals,
	spaced,
	nonSpaced,
}

/**
 * Allows for creating composable CLI commands using a
 */
export class Command {
	private args: string[];
	private options: Record<string, string>;
	private optionMode: CommandOptionMode;

	constructor(
		private command: string,
		args?: string[],
		optionMode: CommandOptionMode = CommandOptionMode.spaced,
	) {
		this.args = args ?? [];
		this.options = {};
		this.optionMode = optionMode;
	}

	argument(...arg: string[]): Command {
		this.args.push(...arg);
		return this;
	}

	option(flag: string, value: string): Command {
		this.options[flag] = value;
		return this;
	}

	exec(stdin?: string): CommandExecResult {
		let separator: string;
		switch (this.optionMode) {
			case CommandOptionMode.equals:
				separator = "=";
			case CommandOptionMode.spaced:
				separator = " ";
			case CommandOptionMode.nonSpaced:
				separator = "";
		}

		const assembledCommand = `${this.command} ${Object.entries(this.options)
			.map(([k, v]) => {
				if (k.startsWith("--")) return `${k} ${v}`;
				else if (k.startsWith("-")) return `${k}${separator}${v}`;
				else if (k.length === 1) return `-${k}${separator}${v}`;
				else return `--${k} ${v}`;
			})
			.join(" ")} ${this.args}`;

		try {
			const result = execSync(assembledCommand, {
				encoding: "utf-8",
				input: stdin,
			});
			return { exitCode: 0, stdout: result };
		} catch (err) {
			if (err instanceof Error) {
				//@ts-ignore
				return { exitCode: err.status, stdout: err.stdout, stderr: err.stderr };
			}
		}

		throw new Error("Unknown error executing command");
	}

	spawn(): CommandSpawnResult {
		let separator: string;
		switch (this.optionMode) {
			case CommandOptionMode.equals:
				separator = "=";
			case CommandOptionMode.spaced:
				separator = " ";
			case CommandOptionMode.nonSpaced:
				separator = "";
		}

		const optionsList = Object.entries(this.options)
			.map(([k, v]) => {
				if (k.startsWith("--")) return `${k} ${v}`;
				else if (k.startsWith("-")) return `${k}${separator}${v}`;
				else if (k.length === 1) return `-${k}${separator}${v}`;
				else return `--${k} ${v}`;
			})
			.join(" ");

		const v = spawn(this.command, [...optionsList, ...this.args], {
			stdio: "pipe",
		});

		return {
			exitCode: new Promise<number>((resolve) => {
				v.addListener("exit", (code) => {
					if (code) resolve(code);
				});
				v.addListener("close", (code) => {
					if (code) resolve(code);
				});
				v.addListener("error", (err) => {
					resolve("status" in err ? (err.status as number) : 1);
				});
			}),
			stderr: Readable.toWeb(v.stderr),
			stdout: Readable.toWeb(v.stdout),
			stdin: Writable.toWeb(v.stdin),
		};
	}
}

export interface CommandExecResult {
	exitCode: number;
	stdout: string;
	stderr?: string;
}

export interface CommandSpawnResult {
	exitCode: Promise<number>;
	stdout: ReadableStream;
	stderr: ReadableStream;
	stdin: WritableStream;
}
