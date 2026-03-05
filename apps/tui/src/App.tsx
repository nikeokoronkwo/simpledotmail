import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { useState, useEffect } from "react";
import { api } from "@simple.mail/server/convex/_generated/api.js";
import { useQuery } from "convex/react";
import IndexPage from "./pages/index.js";

export interface AppProps {
	/** Initial counter value */
	initialCounter?: number;
	/** Any additional props for future extensibility */
	[key: string]: unknown;
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

const App = ({ initialCounter = 0 }: AppProps) => {
	return (
		<ConvexProvider client={convex}>
			<IndexPage />
		</ConvexProvider>
	);
};

export default App;
