import React, {useState, useEffect} from 'react';
import {Text} from 'ink';

export interface AppProps {
	/** Initial counter value */
	initialCounter?: number;
	/** Any additional props for future extensibility */
	[key: string]: unknown;
}

const App = ({initialCounter = 0}: AppProps) => {
	const [counter, setCounter] = useState(initialCounter);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text color="green">{counter} tests passed</Text>;
};

export default App;