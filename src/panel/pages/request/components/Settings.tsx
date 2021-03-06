import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { faPlay, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRequest } from "../../../context";

export const Settings: FC = () => {
  const { setQuery, execute } = useRequest();

  const handleTrashClick = useCallback(() => setQuery(""), [setQuery]);

  return (
    <Container>
      <Icon title="Run (⌃ ⏎)" icon={faPlay} onClick={execute} />
      <Icon title="Clear" icon={faTrashAlt} onClick={handleTrashClick} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 3px 10px;
  background: ${(props) => props.theme.dark["+3"]};
  border-bottom: solid 1px ${(p) => p.theme.dark["+4"]};
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 13px;
  margin: 3px 5px;

  &:hover {
    color: ${(p) => p.theme.light["-9"]};
  }

  &,
  &:active {
    color: ${(p) => p.theme.grey["0"]};
  }
`;
