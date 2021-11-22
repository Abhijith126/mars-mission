import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import './setupTests';
import App from './App';
import * as TestMissionData from '../test_db.json';
import { Provider } from 'react-redux';
import store from './store';

export const handlers = [
  rest.get('/missions', (req, res, ctx) => {
    return res(ctx.json(TestMissionData), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('App renders home page', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/Missions/i);
  expect(linkElement).toBeInTheDocument();
});

test('fetches & receives missions on page load', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(screen.getByText(/Missions/i)).toBeInTheDocument();
  expect(screen.getByText(/New Mission/i)).toBeInTheDocument();
});
