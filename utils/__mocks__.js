import React from "react";
import { queries } from "./graphql";

export const mocks = [
  {
    request: {
      query: queries.characters,
      variables: {
        name: "",
        page: 1,
      },
    },
    result: {
      data: {
        results: {
          info: { pages: 20, prev: null, next: 2, count: 200 },
          characters: [
            { id: "1", name: "Rick Sanchez" },
            { id: "2", name: "Morty Smith" },
          ],
        },
      },
    },
  },
];

export const mockUser = {
  appUser: { id: 1, username: "john.doe@example.com" },
  name: "John Doe",
  email: "john.doe@example.com",
  sub: "auth0|1234567890",
};

export const useUser = () => ({
  user: mockUser,
  isLoading: false,
  isAuthenticated: true,
});

export const UserProvider = ({ children }) => <div>{children}</div>;

export const withPageAuthRequired = (Component) => {
  return (props) => <Component {...props} />;
};
