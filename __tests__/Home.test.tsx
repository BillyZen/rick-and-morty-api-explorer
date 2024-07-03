import { render, screen, act, fireEvent } from "@testing-library/react";
import Home from "../pages/index";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { MockedProvider } from "@apollo/client/testing";
import { mockUser, mocks } from "../utils/__mocks__";

describe("Home", () => {
  it("should render welcome text", async () => {
    render(
      <UserProvider user={mockUser}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      </UserProvider>
    );

    const welcomeText = await screen.findByText(/Hello, .+!/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it("should have a button that when clicked will fetch table of results", async () => {
    render(
      <UserProvider user={mockUser}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      </UserProvider>
    );

    const searchButton = await screen.findByRole("button");
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent("Squanch");

    await act(async () => {
      fireEvent.click(searchButton);
    });

    const table = await screen.findByRole("table");

    expect(table).toBeInTheDocument();
  });
});
