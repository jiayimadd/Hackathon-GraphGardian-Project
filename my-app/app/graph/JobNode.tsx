import React from "react";
import { Handle, Position, Node, NodeProps } from "reactflow";

export interface JobNodeData {
  label: string;
}

export type JobNodeType = Node<JobNodeData>;

const JobNode: React.FC<NodeProps<JobNodeData>> = ({ data, ...rest }) => {
  const { label } = data;

  console.log(rest);
  return (
    <div className="flex flex-col prose p-4 border border-2 rounded">
      <h4>{label}</h4>
      <div className="" style={{ fontSize: 9 }}>
        {JSON.stringify(data)}
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
};

export default JobNode;
