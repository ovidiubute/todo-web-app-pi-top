import { render, waitFor } from "@testing-library/react";
import React from "react";
import * as todoService from "../todo/services/todoService";
import { App } from "./App";

jest.mock("../todo/services/todoService");

describe("Main App", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render a title input and initial todo cards", async () => {
    (todoService.getPartialTodos as jest.Mock).mockResolvedValueOnce([
      {
        id: "zXizI_6T4",
        createdAt: "2018-08-07T11:25:52.087Z",
        title: "get milk",
        priority: "3",
        isDone: false,
      },
      {
        id: "gsrbE1H3Z",
        createdAt: "2018-08-07T11:26:01.463Z",
        title: "conquer the world",
        priority: "8",
        isDone: false,
      },
    ]);

    const { getByPlaceholderText, getByText, getByTestId } = render(<App />);

    // Input
    const titleInputEl = getByPlaceholderText(/What's on your mind?/);

    expect(titleInputEl).toBeInTheDocument();
    expect(titleInputEl.getAttribute("value")).toBe("");

    // Todo cards
    await waitFor(() => {
      const firstCard = getByTestId(`todo-card-zXizI_6T4`);
      expect(firstCard).toBeInTheDocument();
    });

    await waitFor(() => {
      const sndCard = getByTestId(`todo-card-gsrbE1H3Z`);
      expect(sndCard).toBeInTheDocument();
    });
  });
});
