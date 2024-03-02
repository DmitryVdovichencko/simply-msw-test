import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import {
  fireEvent,
  getByLabelText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import LoginPage from "./LoginPage";

import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";

const server = setupServer(
  http.post("https://some-domain.com/api/login", () => {
    return HttpResponse.json({ data: true });
  })
);

describe("<LoginPage />", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test("LoginPage mounts properly", () => {
    const wrapper = render(<LoginPage />);
    expect(wrapper).toBeTruthy();

    // Get by h1
    const h5 = wrapper.container.querySelector("h5");
    expect(h5?.textContent).toBe("Sign in");

    // Get by text using the React testing library
    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton.textContent).toBeTruthy();

    const userNameInput: HTMLInputElement = getByLabelText(
      wrapper.container,
      /username/i
    );
    fireEvent.change(userNameInput, {
      target: { value: "admin" },
    });

    expect(userNameInput.value).toBe("admin");

    const userPasswordInput: HTMLInputElement = getByLabelText(
      wrapper.container,
      /password/i
    );
    fireEvent.change(userPasswordInput, {
      target: { value: "123" },
    });

    expect(userPasswordInput.value).toBe("123");

    fireEvent.click(submitButton);

    const loadingElement = screen.getByText(/Loading/i);
    waitFor(() => expect(loadingElement.textContent).toBeTruthy());
		const usernameElement = screen.getByText(/admin/i);
		expect(usernameElement.textContent).toBeTruthy();
  });
});
