import styled from "styled-components";

export const TimelineSourceIcon = styled.div<{
  kind: "query" | "mutation" | "subscription";
}>`
  background-color: ${(p) => p.theme.dark["+6"]};
  color: ${(p) => p.theme.light["-8"]};
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 20px;
  transition: background-color 200ms ease;

  :before {
    content: "${({ kind }) => kind[0].toUpperCase()}";
  }

  &:hover {
    background-color: ${(p) => p.theme.dark["+8"]};
    color: ${(p) => p.theme.light["-2"]};
  }
`;
