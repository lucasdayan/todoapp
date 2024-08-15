import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Task from "@/components/Task";
import { vi } from "vitest";

const mockTask = { id: 1, title: "Test Task", completed: false };

it("renders Task correctly", () => {
  const { getByText } = render(
    <Task
      task={mockTask}
      toggleTaskCompletion={() => {}}
      deleteTask={() => {}}
    />
  );
  expect(getByText("Test Task")).toBeInTheDocument();
});

it("toggles task completion", () => {
  const toggleTaskCompletion = vi.fn();
  const { getByRole } = render(
    <Task
      task={mockTask}
      toggleTaskCompletion={toggleTaskCompletion}
      deleteTask={() => {}}
    />
  );
  fireEvent.click(getByRole("checkbox"));
  expect(toggleTaskCompletion).toHaveBeenCalledWith(
    mockTask.id,
    mockTask.completed
  );
});

it("deletes a task", () => {
  const deleteTask = vi.fn();
  const { getByRole } = render(
    <Task
      task={mockTask}
      toggleTaskCompletion={() => {}}
      deleteTask={deleteTask}
    />
  );
  fireEvent.click(getByRole("button"));
  expect(deleteTask).toHaveBeenCalledWith(mockTask.id);
});
