import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { RequestContext } from "../../../context";
import { Pane, CodeHighlight } from "../../../components";

export const Response = () => {
  const { fetching, response, error } = useContext(RequestContext);

  const { state, code } = useMemo(() => {
    if (fetching) {
      return {
        state: "Fetching",
        code: null,
      };
    }

    if (response) {
      return {
        state: "Success",
        code: (
          <CodeHighlight
            code={JSON.stringify(response, null, 2)}
            language="json"
          />
        ),
      };
    }

    if (error) {
      return {
        state: "Error",
        code: (
          <CodeHighlight
            code={JSON.stringify(error, null, 2)}
            language="json"
          />
        ),
      };
    }

    return {
      state: "Idle",
      code: null,
    };
  }, [fetching, response, error]);

  return (
    <Pane>
      <PaneBody>
        <PaneSection>
          <h1>Response</h1>
          <Status>
            <Icon data-state={state.toLowerCase()} /> {state}
          </Status>
          {code}
        </PaneSection>
      </PaneBody>
    </Pane>
  );
};

const Status = styled.p`
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  display: block;
  margin-right: 7px;
  width: 10px;
  height: 10px;

  &[data-state="idle"] {
    background-color: ${(p) => p.theme.grey["0"]};
  }

  &[data-state="fetching"] {
    background-color: ${(p) => p.theme.blue["0"]};
  }

  &[data-state="success"] {
    background-color: ${(p) => p.theme.green["0"]};
  }

  &[data-state="error"] {
    background-color: ${(p) => p.theme.red["-1"]};
  }
`;

const PaneBody = styled(Pane.Body)`
  display: flex;
  flex-grow: 1;
`;

const PaneSection = styled.section`
  color: #fff;
  background: ${(props) => props.theme.dark[0]};
  padding: 20px;
  overflow: scroll;
  flex-grow: 1;
  flex-basis: 0;

  h1 {
    background-color: ${(p) => p.theme.dark["+3"]};
    position: sticky;
    top: -20px;
    margin: -20px;
    padding: 2px 10px;
    font-size: 14px;
    font-weight: 400;
    border-bottom: solid 1px ${(p) => p.theme.dark["+5"]};
    z-index: 1;
  }

  h1 + * {
    margin-top: 40px;
  }
`;
