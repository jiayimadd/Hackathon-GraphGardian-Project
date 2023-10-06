"use client";
import { ReactFlowProvider } from "reactflow";
import Graph from "./graph/Graph";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <ReactFlowProvider>
        <Graph />
      </ReactFlowProvider>
    </main>
  );
}
