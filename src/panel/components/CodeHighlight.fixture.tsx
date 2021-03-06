import React from "react";
import styled from "styled-components";
import { print } from "graphql";
import gql from "graphql-tag";
import { CodeHighlight, InlineCodeHighlight } from "./CodeHighlight";

const query = gql`
  query Todos {
    todos {
      id
      name
      __typename
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px;
  background: ${(p) => p.theme.dark["0"]};

  p {
    color: ${(p) => p.theme.light["0"]};
  }
`;

export default {
  "Block - GraphQL": (
    <Wrapper>
      <p data-snapshot>
        value: <CodeHighlight code={print(query)} language="graphql" />
      </p>
    </Wrapper>
  ),
  "Block - JSON": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <CodeHighlight
          code={JSON.stringify({ number: 1234, string: "Hello" }, null, 2)}
          language="json"
        />
      </p>
    </Wrapper>
  ),
  "Inline - string": (
    <Wrapper>
      <p data-snapshot>
        value: <InlineCodeHighlight code={'"Hello world"'} language="json" />
      </p>
    </Wrapper>
  ),
  "Inline - string (collapsed)": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight
          code={'"Hello world this string is very long"'}
          language="json"
        />
      </p>
    </Wrapper>
  ),
  "Inline - object": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight
          code={JSON.stringify({ prop: 123 })}
          language="json"
        />
      </p>
    </Wrapper>
  ),
  "Inline - object (collapsed)": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight
          code={JSON.stringify({
            prop: 123,
            otherProp: "some string",
          })}
          language="json"
        />
      </p>
    </Wrapper>
  ),
  "Inline - array": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight
          code={JSON.stringify([1, "two"])}
          language="json"
        />
      </p>
    </Wrapper>
  ),
  "Inline - array (collapsed)": (
    <Wrapper>
      <p data-snapshot>
        value:{" "}
        <InlineCodeHighlight
          code={JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}
          language="json"
        />
      </p>
    </Wrapper>
  ),
};
