import { fireEvent, render, waitFor } from "@testing-library/react";
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

    const { getByPlaceholderText, getByTestId } = render(<App />);

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

  it("should allow saving a new task", async () => {
    // Empty initially
    (todoService.getPartialTodos as jest.Mock).mockResolvedValueOnce([]);

    // Response to save a todo
    (todoService.addTodo as jest.Mock).mockResolvedValueOnce({
      id: "gsrbE1H3Z",
      createdAt: "2018-08-07T11:26:01.463Z",
      title: "title test",
      priority: "8",
      isDone: false,
    });
    const { getByPlaceholderText, getByTestId, getByText } = render(<App />);

    // No card initially
    expect(() => getByTestId(`todo-card-gsrbE1H3Z`)).toThrowError();

    // After we reload, we expect one todo we just saved
    (todoService.getPartialTodos as jest.Mock).mockResolvedValueOnce([
      {
        id: "gsrbE1H3Z",
        createdAt: "2018-08-07T11:26:01.463Z",
        title: "title test",
        priority: "8",
        isDone: false,
      },
    ]);

    // Input - write and submit
    const titleInputEl = getByPlaceholderText(/What's on your mind?/);
    fireEvent.change(titleInputEl, {
      target: {
        value: "title test",
      },
    });
    fireEvent.submit(titleInputEl);

    // Wait for description text area to appear
    await waitFor(() => {
      const textareaEl = getByTestId("todo-textarea");
      fireEvent.change(textareaEl, {
        target: {
          value: "description test",
        },
      });
    });

    // Click OK to save new todo
    getByText(/OK/i).click();

    // Card is now in document
    await waitFor(() => {
      const card = getByTestId(`todo-card-gsrbE1H3Z`);
      expect(card).toBeInTheDocument();
    });
  });

  it("should allow expanding task to get more details", async () => {
    (todoService.getPartialTodos as jest.Mock).mockResolvedValueOnce([
      {
        id: "zXizI_6T4",
        createdAt: "2018-08-07T11:25:52.087Z",
        title: "get milk",
        priority: "3",
        isDone: false,
      },
    ]);
    const fullTodo = {
      id: "zXizI_6T4",
      createdAt: "2018-08-07T11:25:52.087Z",
      title: "get milk",
      description: "buy 1.5l semi-skimmed milk from the supermarket",
      priority: "3",
      tags: ["shopping", "dairy"],
      isDone: false,
    };
    (todoService.getTodo as jest.Mock).mockResolvedValueOnce([fullTodo]);

    const { getByText } = render(<App />);

    expect(() => getByText(fullTodo.description)).toThrowError();
    expect(() => getByText(fullTodo.tags.join(", "))).toThrowError();

    waitFor(() => {
      const moreLink = getByText(/More.../);
      fireEvent.click(moreLink);

      expect(getByText(fullTodo.description)).toBeInTheDocument();
      expect(getByText(fullTodo.tags.join(", "))).toBeInTheDocument();
    });
  });
});
