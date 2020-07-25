import React from 'react';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import { rootReducer as reducer } from './store';
import { createMemoryHistory } from 'history';
import App from './App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return render(<Router history={history}>{component}</Router>);
};
const store = createStore(reducer, {});

describe('App', () => {
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  test('Should render the App', () => {
    screen.debug();

    renderWithRouter(app);
    screen.debug();
  });
});
