import { api } from "@simple.mail/server/convex/_generated/api.js";
import { useQuery } from "convex/react";
import { Text } from "ink";
import { useEffect, useState } from "react";

export default function IndexPage() {
	const [counter, setCounter] = useState(0);
	const hello = useQuery(api.tasks.sayHello, { name: "TUI" });

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter((previousCounter) => previousCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<>
			<Text color="green">{counter} tests passed</Text>
			<Text color="yellow">{hello}</Text>
		</>
	);
}
