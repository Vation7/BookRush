import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import AuthService from './utils/auth';  // Assuming this is your auth.js on the client side

// Set up the HTTP connection to the GraphQL API
const httpLink = createHttpLink({
  uri: '/graphql',  // Replace this with your GraphQL endpoint
});

// Set up the context to include the authorization token
const authLink = setContext((_, { headers }) => {
  const token = AuthService.getToken();  // Retrieve token from localStorage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',  // Attach token to the headers
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),  // Combine authLink and httpLink
  cache: new InMemoryCache(),       // Set up caching
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;