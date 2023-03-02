import React from "react";
import { render, screen } from "@testing-library/react";
import UserForm from "./Components/UserForm";
import '@testing-library/jest-dom/extend-expect';

describe("UserForm component", () => {
  it("renders correctly", () => {
    const handleSend = jest.fn();
    const formChange = jest.fn();
    const selectchange = jest.fn();

    render(
      <UserForm
        handleSend={handleSend}
        formChange={formChange}
        selectchange={selectchange}
      />
    );
    // expect(screen.getByText(". Welcome, start by adding a YUMMY! recipe")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("eg. Fish Tako")).toBeInTheDocument();
    expect(screen.getByText("Recipe name:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("eg. Jesse Mwangi")).toBeInTheDocument();
    expect(screen.getByText("Author Name:")).toBeInTheDocument();
    expect(screen.getByText("Select Country")).toBeInTheDocument();

    // Take a snapshot of the rendered component
    expect(screen).toMatchSnapshot();
  });
});
