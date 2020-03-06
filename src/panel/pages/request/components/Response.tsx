import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { RequestContext } from "../../../context";
import { Pane, CodeHighlight } from "../../../components";

export const Response = () => {
  const { fetching, response, error } = useContext(RequestContext);

  const className =
    error !== undefined ? "error" : response !== undefined ? "success" : "";

  const code = useMemo(() => {
    const content = fetching ? "Fetching" : response || error || "Unknown";
    return JSON.stringify(content, null, 2);
  }, [response, error, fetching]);

  return (
    <Pane>
      <Heading className={className}>Response</Heading>
      <Pane.Body>
        <CodeHighlight code={code} language="json" />
      </Pane.Body>
    </Pane>
  );
};

const Heading = styled.h2`
  margin: 0;
  padding: 10px;
  font-size: 12px;
  color: #fff;
  background: ${props => props.theme.blue["0"]};

  &.success {
    background: ${props => props.theme.green["0"]};
    color: #fff;
  }

  &.error {
    background: ${props => props.theme.red["0"]};
    color: #fff;
  }
`;