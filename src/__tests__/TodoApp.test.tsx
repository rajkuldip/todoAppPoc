import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import { renderWithClient } from "./test-utils";

describe("Todo App", () => {
    it("renders header and footer", () => {
        renderWithClient(<App />);
        // Header
        expect(screen.getAllByText(/poc/i)).toHaveLength(2);
        // Footer
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

        // Initially, the button should be disabled (empty input)
        expect(addButton).toBeDisabled();

        // Type a short task
        await userEvent.type(input, "Hi");
        expect(addButton).toBeDisabled();

        // Check that the task is not added (optional, but good practice)
        expect(screen.queryByText("Hi")).not.toBeInTheDocument();

        // Now, type a valid length task
        await userEvent.clear(input);
        await userEvent.type(input, "Hello World");

        // The button should now be enabled
        expect(addButton).toBeEnabled();

        // Click the button and verify the task is added
        await userEvent.click(addButton);
        await waitFor(() => {
            expect(screen.getByText("Hello World")).toBeInTheDocument();
        });
    });

    it("allows removing a todo", async () => {
        // 1. Pre-populate localStorage with a todo item
        localStorage.setItem(
            "todos",
            JSON.stringify([{ id: 1, todo: "Buy groceries", completed: false }])
        );

        renderWithClient(<App />);

        // 2. Wait for the task to appear on the screen
        const taskItem = await screen.findByText("Buy groceries");
        expect(taskItem).toBeInTheDocument();

        // 3. Find the "Remove Task" button associated with this specific task item.
        //    We use 'within' to scope the search to the parent element of the task text.
        const removeButton = within(taskItem.parentElement!).getByRole("button", {
            name: /remove task/i,
        });
        expect(removeButton).toBeInTheDocument();

        // 4. Click the "Remove Task" button
        await userEvent.click(removeButton);

        // 5. Verify that the task is no longer in the document
        await waitFor(() => {
            expect(screen.queryByText("Buy groceries")).not.toBeInTheDocument();
        });
    });
});
