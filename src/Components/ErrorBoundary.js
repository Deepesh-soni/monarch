import React, { Component } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import { connect } from "react-redux";

import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import { PRIMARY_800 } from "@common/UI/colors";
import { Button } from "@common/UI/Buttons";
import { logout } from "@redux/slices/auth";

const Container = styled(FlexBox)`
  height: 80vh;
  max-width: 50vw;
  width: 20rem;
  margin: auto;
  row-gap: 2rem;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const Buttons = styled(FlexBox)`
  column-gap: 2rem;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    row-gap: 2rem;
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    // Added check to avoid multiple initialization for bugsnag
    if (!Bugsnag._client) {
      Bugsnag.start({
        apiKey: "3c40fb389c0a9ad511a603f4c83b954d",
        plugins: [new BugsnagPluginReact()],
        enabledReleaseStages: ["production"],
      });
    }
    Bugsnag.getPlugin("react").createErrorBoundary(React);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // The error will be catched here. Bugsnag will autoDetect and log the same.
    if (process.env.NEXT_PUBLIC_ENV !== "production") {
      console.log("Error occurred", error, errorInfo);
    }
    Bugsnag.notify(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container column rowGap="2rem" align="center" justify="center">
          <Body1 bold fontSize="1.5rem">
            Something went wrong
          </Body1>
          <Buttons>
            <Button
              color={PRIMARY_800}
              outline
              block
              onClick={() => (window.location.href = "/dashboard/general")}
            >
              Go to Home
            </Button>

            <Button block onClick={() => this.props.logout()}>
              Re login
            </Button>
          </Buttons>
        </Container>
      );
    }

    return this.props.children;
  }
}

const mapDispatchToProps = { logout };

export default connect(null, mapDispatchToProps)(ErrorBoundary);
