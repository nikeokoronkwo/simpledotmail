import React from "react";
import { Text } from "ink";
import { render } from "ink-testing-library";
import { test, expect } from "vitest";

const Counter = ({ count }) => <Text>Count: {count}</Text>;

test("Counter Component", () => {
	const { lastFrame, rerender } = render(<Counter count={0} />);

	expect(lastFrame()).equals("Count: 0", "Count starts");

	rerender(<Counter count={1} />);

	expect(lastFrame()).equals("Count: 1", "Count is now 1");
});
