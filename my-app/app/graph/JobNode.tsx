import React from "react";
import { Handle, Position, Node, NodeProps, useStore } from "reactflow";
import { Tooltip } from "react-tooltip";
import {
  CONTAINER_WIDTH,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  getContainerHeight,
} from "./layout";
import { dependencyMap } from "./data";

export interface JobNodeData {
  label: string;
  highlighted?: boolean;
}

export type JobNodeType = Node<JobNodeData>;

const JobNode: React.FC<NodeProps<JobNodeData>> = ({
  data,
  id,
  selected,
  ...rest
}) => {
  const { label, highlighted } = data;

  const size = React.useMemo(
    () => ({
      width: CONTAINER_WIDTH,
      height: getContainerHeight(dependencyMap[id].vars.length),
    }),
    [id]
  );
  // console.log(rest);
  return (
    <div
      id={id}
      data-tooltip-id={id}
      data-tooltip-content={label}
      data-tooltip-place="top"
      className="flex flex-col p-4"
      style={{
        backgroundColor: selected
          ? "#d7f5f5"
          : highlighted
          ? "#ecfcfc"
          : "white",
        borderStyle: "solid",
        borderColor: selected ? "#00666d" : highlighted ? "#00838a" : "#e7e7e7",
        borderWidth: selected ? 2 : 1,
        borderRadius: 8,
        ...size,
      }}
    >
      <div
        style={{
          fontSize: "0.8rem",
          fontWeight: selected ? "500" : "400",
          padding: selected ? 0 : 1,
          width: "100%",
          height: ITEM_HEIGHT,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          overflowWrap: "anywhere",
          color: selected ? "#191919" : highlighted ? "#313131" : "#606060",
        }}
      >
        {label}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Tooltip id={id} />
    </div>
  );
};

export default JobNode;
