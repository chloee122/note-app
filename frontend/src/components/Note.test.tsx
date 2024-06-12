import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";
import { AppContext } from "../context/AppContext";

test("renders content", () => {
  const note = {
    id: "1",
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockToggle = vi.fn()

  const contextValue = {
    addNote: () => {},
    user: {id: "1", name: "Chloe", username: "chloeng"},
    notes: [],
    login: () => {},
    logout: () => {},
    toggleImportance: () => {},
    errorMessage: null,
    noteFormRef: {current: {
      toggleVisibility: mockToggle
    }}
  };

  render(
    <AppContext.Provider value={contextValue}>
      <Note note={note} />
    </AppContext.Provider>
  );

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});

test("clicking the button calls event handler once", async () => {
  const note = {
    id: "1",
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockToggle = vi.fn()

  const mockToggleImportance = vi.fn();

  const contextValue = {
    addNote: () => {},
    user: {id: "1", name: "Chloe", username: "chloeng"},
    notes: [],
    login: () => {},
    logout: () => {},
    toggleImportance: mockToggleImportance,
    errorMessage: null,
    noteFormRef: {current: {
      toggleVisibility: mockToggle
    }}
  };

  render(
    <AppContext.Provider value={contextValue}>
      <Note note={note} />
    </AppContext.Provider>
  );

  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  console.log(mockToggleImportance.mock.calls);
  expect(mockToggleImportance.mock.calls).toHaveLength(1);
});
