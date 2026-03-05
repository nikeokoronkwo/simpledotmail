import { program } from "commander";
import { ConvexClient } from "convex/browser";
import { api } from "@simple.mail/server/convex/_generated/api.js";
import "dotenv/config";

const client = new ConvexClient(process.env.CONVEX_URL!);

program.option("--first").option("-s, --separator <char>").argument("<string>");

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;

const unsubscribe = client.onUpdate(
	api.tasks.sayHello,
	{ name: options.name },
	async (tasks) => {
		console.log(tasks);
	},
);

console.log(program.args[0]?.split(options.separator, limit));

unsubscribe();
client.close();
