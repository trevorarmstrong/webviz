// @flow
//
//  Copyright (c) 2018-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import * as Sentry from "@sentry/browser";
import * as React from "react";
import styled from "styled-components";

import Button from "webviz-core/src/components/Button";
import Flex from "webviz-core/src/components/Flex";
import PanelToolbar from "webviz-core/src/components/PanelToolbar";
import { themeColor, useTheme } from "webviz-core/src/styles/theme";

const Heading = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: ${themeColor("errorHeading")};
  margin-top: 0.5em;
`;

const ErrorBanner = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  color: ${themeColor("foreground")};
  background-color: ${themeColor("errorBackground")};
  padding: 2px 5px;
`;

function ReloadButton({ onClick }: { onClick: () => void }) {
  const theme = useTheme();
  return (
    <Button style={{ background: theme.colors.tintStrong }} onClick={onClick}>
      Reload Panel
    </Button>
  );
}

type State = {
  error: ?Error,
  errorInfo: ?any,
};

export default class ErrorBoundary extends React.Component<{ children: React.Node }, State> {
  state = {
    error: undefined,
    errorInfo: undefined,
  };

  componentDidCatch(error: Error, errorInfo: any) {
    Sentry.captureException(error, {
      extra: errorInfo,
    });
    this.setState({ error, errorInfo });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (error) {
      let name = "this panel";
      if (errorInfo && typeof errorInfo.componentStack === "string") {
        const matches = errorInfo.componentStack.match(/^\s*in ([\w()]+) \(/);
        if (matches && matches.length > 0) {
          name = matches[1];
        }
      }
      return (
        <Flex col style={{ maxHeight: "100%", maxWidth: "100%" }}>
          <PanelToolbar>
            <ErrorBanner>
              <div style={{ flexGrow: 1 }}>An error occurred in {name}.</div>
              <ReloadButton onClick={() => this.setState({ error: undefined, errorInfo: undefined })} />
            </ErrorBanner>
          </PanelToolbar>
          <Flex col scroll scrollX style={{ padding: "2px 6px" }}>
            <Heading>Error stack:</Heading>
            <pre>{error.stack}</pre>
            <Heading>Component stack:</Heading>
            <pre>{errorInfo && errorInfo.componentStack && errorInfo.componentStack.replace(/^\s*\n/g, "")}</pre>
          </Flex>
        </Flex>
      );
    }
    return this.props.children;
  }
}
