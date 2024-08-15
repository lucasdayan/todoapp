import { describe, it, expect, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoMain from "@/components/TodoMain";

describe("TodoMain component", () => {
  it("fetches and displays tasks", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([{ id: 1, title: "Sample Task", completed: false }]),
        ok: true,
      } as Response)
    );

    const { getByText } = render(<TodoMain />);
    await waitFor(() => expect(getByText("Sample Task")).toBeInTheDocument());
  });
});
