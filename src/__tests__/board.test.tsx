import { render, screen } from "@testing-library/react";
import Board from "@/components/Board";
import { TaskInterface } from "@/components/Task";
import "@testing-library/jest-dom";

const mockTasks: TaskInterface[] = [
  { id: 1, title: "Task 1", completed: true },
  { id: 2, title: "Task 2", completed: false },
  { id: 3, title: "Task 3", completed: true },
  { id: 4, title: "Task 4", completed: false },
];

describe("Board Component", () => {
  it("displays correct number of completed and pending tasks", () => {
    render(<Board tasks={mockTasks} />);

    // Check if the "Completed" and "Pending" sections are present
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();

    // Check the number of spans with the text "2"
    const allCounts = screen.getAllByText("2");

    // Verify that there are exactly 2 span elements with the text "2"
    expect(allCounts).toHaveLength(2);

    // Check that the first "2" is in the Completed section
    const completedSpan = screen
      .getByText("Completed")
      .closest("div")
      ?.nextSibling?.querySelector("span");
    expect(completedSpan).toHaveTextContent("2");

    // Check that the second "2" is in the Pending section
    const pendingSpan = screen
      .getByText("Pending")
      .closest("div")
      ?.nextSibling?.querySelector("span");
    expect(pendingSpan).toHaveTextContent("2");
  });
});
