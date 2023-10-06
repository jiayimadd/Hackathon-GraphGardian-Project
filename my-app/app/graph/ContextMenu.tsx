/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { dependencyMap } from "./data";

export interface ContextMenuProps {
  id: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  onClick?: any;
}

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: ContextMenuProps) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  const node = getNode(id)!;

  return (
    <div
      style={{ top, left, right, bottom }}
      className="context-menu flex flex-col p-4 space-y-4 font-[12px]"
      {...props}
    >
      <div
        style={{
          fontSize: "0.8rem",
          fontWeight: "400",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          overflowWrap: "anywhere",
          color: "#606060",
        }}
      >
        {node.data.label}
      </div>
      {!node.parentNode && (
        <>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: "400",
            }}
          >
            {dependencyMap[node!.id].dependents.length} dependents
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: "400",
            }}
          >
            {dependencyMap[node!.id].dependencyJobs.length} job dependencies
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: "400",
            }}
          >
            {dependencyMap[node!.id].dependencyVars.length} var dependencies
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: "400",
            }}
          >
            {dependencyMap[node!.id].vars.length} output vars
          </div>
        </>
      )}
      {node.parentNode && (
        <>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: "400",
            }}
          >
            From {getNode(node.parentNode)?.data.label}
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: "400",
            }}
          >
            Depended by{" "}
            {
              Object.keys(dependencyMap).filter((jobId) =>
                dependencyMap[jobId].dependencyVars.includes(node.id)
              ).length
            }{" "}
            jobs
          </div>
        </>
      )}
      <a
        href={node.data.codeLink}
        target="_blank"
        style={{
          fontSize: "0.7rem",
          fontWeight: "400",
          cursor: node.data.codeLink ? "pointer" : "not-allowed",
          opacity: node.data.codeLink ? 1 : 0.8,
        }}
        className="flex flex-row justify-start items-center space-x-2"
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          className="w-4 h-4"
          alt="github"
        />
        <div>
          {node.data.codeLink
            ? "View on GitHub"
            : "Code link not available yet"}
        </div>
      </a>
    </div>
  );
}
