import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';

import App from './app/app';
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/query',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <StrictMode>
        <App />
      </StrictMode>
    </ApolloProvider>
  </BrowserRouter>
);
