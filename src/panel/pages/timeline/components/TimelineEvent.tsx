import React, { FC, useMemo, ComponentProps } from "react";
import styled from "styled-components";
import { DebugEvent } from "@urql/core";
import ExecutionIcon from "../../../../assets/events/execution.svg";
import OtherIcon from "../../../../assets/events/other.svg";
import TeardownIcon from "../../../../assets/events/teardown.svg";
import UpdateIcon from "../../../../assets/events/update.svg";
import { useTooltip, TimelineTooltip } from "./TimelineTooltip";

const Svg = styled.svg`
  cursor: pointer;
  filter: brightness(1);
  transition: filter 300ms ease;

  & > * {
    fill: ${(props) => props.theme.grey["-1"]};
  }

  &:hover {
    filter: brightness(1.5);
  }

  &:active {
    filter: brightness(1.25);
  }
`;

const eventGroupIcon: Record<string, any> = {
  execution: ExecutionIcon,
  update: UpdateIcon,
  teardown: TeardownIcon,
  other: OtherIcon,
};

export const TimelineEvent: FC<
  {
    event: DebugEvent<string>;
  } & ComponentProps<typeof Svg>
> = ({ event, ...svgProps }) => {
  const { ref, tooltipProps, isVisible } = useTooltip();

  const iconSize = useMemo(
    () =>
      Object.keys(eventGroupIcon)
        .filter((k) => k !== "other")
        .includes(event.type)
        ? 12
        : 8,
    [event.type]
  );

  const Icon = useMemo(
    () => eventGroupIcon[event.type] || eventGroupIcon.other,
    []
  );

  return (
    <>
      <Svg
        as={Icon}
        {...svgProps}
        width={iconSize}
        height={iconSize}
        ref={ref}
      />
      {isVisible && (
        <TimelineTooltip {...tooltipProps}>{event.message}</TimelineTooltip>
      )}
    </>
  );
};
