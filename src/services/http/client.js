import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  // Required constructor fields
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});