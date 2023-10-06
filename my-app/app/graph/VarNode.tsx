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

export interface VarNodeData {
  label: string;
  highlighted?: boolean;
}

export type VarNodeType = Node<VarNodeData>;

const VarNode: React.FC<NodeProps<VarNodeData>> = ({
  data,
  id,
  selected,
  ...rest
}) => {
  const { label, highlighted } = data;

  const highlight = Boolean(selected || highlighted);

  const size = { width: ITEM_WIDTH, height: ITEM_HEIGHT };
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
          padding: selected ? 0 : 1,
          fontSize: "0.7rem",
          fontWeight: selected ? "500" : "400",
          width: "100%",
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

export default VarNode;
