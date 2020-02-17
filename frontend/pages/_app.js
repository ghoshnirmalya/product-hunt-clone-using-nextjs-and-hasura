import React from "react";
import NextApp from "next/app";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import { ClientContext } from "graphql-hooks";

import withGraphQLClient from "../lib/with-graphql-client";

class App extends NextApp {
  render() {
    const { Component, pageProps, graphQLClient } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CSSReset />
        <ClientContext.Provider value={graphQLClient}>
          <Component {...pageProps} />
        </ClientContext.Provider>
      </ThemeProvider>
    );
  }
}

export default withGraphQLClient(App);
