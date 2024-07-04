import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://artz-trust-be.deepsense.dev/graphql/',
  cache: new InMemoryCache(),
});

export default client;
