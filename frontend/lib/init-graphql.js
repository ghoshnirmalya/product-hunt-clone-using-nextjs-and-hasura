import { GraphQLClient } from "graphql-hooks";
import memCache from "graphql-hooks-memcache";
import unfetch from "isomorphic-unfetch";
import { parseCookies } from "nookies";

let graphQLClient = null;

function create(initialState = {}) {
  return new GraphQLClient({
    ssrMode: typeof window === "undefined",
    url: "http://localhost:8080/v1/graphql",
    cache: memCache({ initialState }),
    fetch: typeof window !== "undefined" ? fetch.bind() : unfetch, // eslint-disable-line
    headers: {
      "x-hasura-admin-secret": "secret",
      "x-hasura-role": parseCookies()["X-Hasura-User-Role"],
      "X-Hasura-User-Id": parseCookies()["X-Hasura-User-Id"]
    }
  });
}

export default function initGraphQL(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!graphQLClient) {
    graphQLClient = create(initialState);
  }

  return graphQLClient;
}
