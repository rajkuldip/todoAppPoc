import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import { renderWithClient } from "./test-utils";

describe("Todo App", () => {
    it("renders header and footer", () => {
        renderWithClient(<App />);
        expect(screen.getAllByText(/poc/i)).toHaveLength(2);
        expect(screen.getByText(/©/i)).toBeInTheDocument();
    });

    it("allows adding a todo", async () => {
        renderWithClient(<App />);
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByRole("button", { name: /add task/i });
        expect(input).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });


    it("does not allow saving todo with less than 3 chars", async () => {
        renderWithClient(<App />);
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByRole("button", { name: /add task/i });

        await userEvent.type(input, "Hi");
        fireEvent.click(addButton);

        expect(screen.queryByText("Hi")).not.toBeInTheDocument();
    });

    it("disables the 'Add Task' button for tasks less than 3 characters", async () => {
        renderWithClient(<App />);
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByRole("button", { name: /add task/i });

        expect(addButton).toBeDisabled();

        await userEvent.type(input, "Hi");
        expect(addButton).toBeDisabled();

        expect(screen.queryByText("Hi")).not.toBeInTheDocument();

        await userEvent.clear(input);
        await userEvent.type(input, "Hello World");

        expect(addButton).toBeEnabled();

        await userEvent.click(addButton);
        await waitFor(() => {
            expect(screen.getByText("Hello World")).toBeInTheDocument();
        });
    });

    it("allows removing a todo", async () => {
        localStorage.setItem(
            "todos",
            JSON.stringify([{ id: 1, todo: "Buy groceries", completed: false }])
        );

        renderWithClient(<App />);

        const taskItem = await screen.findByText("Buy groceries");
        expect(taskItem).toBeInTheDocument();

        const removeButton = within(taskItem.parentElement!).getByRole("button", {
            name: /remove task/i,
        });
        expect(removeButton).toBeInTheDocument();

        await userEvent.click(removeButton);

        await waitFor(() => {
            expect(screen.queryByText("Buy groceries")).not.toBeInTheDocument();
        });
    });
});
