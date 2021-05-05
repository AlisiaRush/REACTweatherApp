import React from "react";
import {unmountComponentAtNode } from "react-dom";
import App from './App';
import {fireEvent, render, waitFor} from '@testing-library/react';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data for weather", async () => {
  const weather = {
    temperature: 51
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(weather)
    })
  );

  const {getByText, getByTestId} = render(<App/>);
  const button = getByText("Submit");

  // Checked if a submit button exists
  expect(button).toBeInTheDocument();

  // simulate a button click 
  fireEvent.click(button);

  // await and check if api was called and if the expected value is received
  await waitFor(()=> expect(getByTestId("fetch-load").textContent).toBe(weather.temperature.toString()));

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();

});
