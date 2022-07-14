import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

it("Renders welcome message", async () => {
	render(<App />);
	const element = await screen.findByText("Welcome to the card game of War!");
	expect(element).toBeInTheDocument();
});

it("Player 1 and 2 username fields empty on initial render", async () => {
	render(<App />);
	const user1 = await screen.findByPlaceholderText("Player One Username");
	const user2 = await screen.findByPlaceholderText("Player Two Username");
	expect(user1).toHaveTextContent("");
	expect(user2).toHaveTextContent("");
});
