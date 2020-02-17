import React from "react";
import NextApp from "next/app";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";

class App extends NextApp {
  render() {
    const { Component } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component />
      </ThemeProvider>
    );
  }
}

export default App;
