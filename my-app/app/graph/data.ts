import { Edge, MarkerType, Node, Position } from "reactflow";
import {
  CONTAINER_WIDTH,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  getContainerHeight,
  getItemPosition,
} from "./layout";

export interface NodeData {
  /**
   * id format
   * - for job: job id, e.g. `subtotal_job`
   * - for var: `${jobId}/${varName}`, e.g. `subtotal_job/Subtotal`
   */
  id: string;
  data: {
    label: string; // use job name or var name if no special display label needed
    description?: string; // optional description to provide more context for viewer
  };
  /**
   * Only applicable for vars, value is job id
   */
  parentNode?: string;
}

export type DependencyMap = Record<
  string, // id of the job/var node
  {
    // The complete list of ids of all vars that this node is depending on
    dependencyVars: string[];
    // The complete list of ids of all jobs that this node is depending on
    dependencyJobs: string[];
    // The complete list of ids of all jobs that are depending on the current node
    dependents: string[];
    // The complete list of ids of all vars in the job
    vars: string[];
  }
>;

export const nodes: NodeData[] = [
  {
    id: "subtotal_job",
    data: { label: "subtotal_job" },
  },
  {
    id: "subtotal_job/Subtotal",
    data: { label: "Subtotal" },
    parentNode: "subtotal_job",
  },
  {
    id: "delivery_fee_job",
    data: { label: "delivery_fee_job" },
  },
  {
    id: "delivery_fee_job/DeliveryFee",
    data: { label: "DeliveryFee" },
    parentNode: "delivery_fee_job",
  },
  {
    id: "delivery_fee_job/ExtraSosDeliveryFee",
    data: { label: "ExtraSosDeliveryFee" },
    parentNode: "delivery_fee_job",
  },
  {
    id: "service_fee_job",
    data: { label: "service_fee_job" },
  },
  {
    id: "service_fee_job/ServiceRate",
    data: { label: "ServiceRate" },
    parentNode: "service_fee_job",
  },
  {
    id: "service_fee_collector_job",
    data: { label: "service_fee_collector_job" },
  },
  {
    id: "service_fee_collector_job/ServiceFee",
    data: { label: "ServiceFee" },
    parentNode: "service_fee_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job",
    data: { label: "total_before_credits_applied_collector_job" },
  },
  {
    id: "total_before_credits_applied_collector_job/FinalServiceFee",
    data: { label: "FinalServiceFee" },
    parentNode: "total_before_credits_applied_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job/FinalDeliveryFee",
    data: { label: "FinalDeliveryFee" },
    parentNode: "total_before_credits_applied_collector_job",
  },

  {
    id: "total_before_credits_applied_collector_job/TotalBeforeCreditsApplied",
    data: { label: "TotalBeforeCreditsApplied" },
    parentNode: "total_before_credits_applied_collector_job",
  },
];

export const dependencyMap: DependencyMap = {
  subtotal_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: [
      "total_before_credits_applied_collector_job",
      "service_fee_collector_job",
    ],
    vars: ["subtotal_job/Subtotal"],
  },
  delivery_fee_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: ["total_before_credits_applied_collector_job"],
    vars: [
      "delivery_fee_job/DeliveryFee",
      "delivery_fee_job/ExtraSosDeliveryFee",
    ],
  },
  service_fee_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: ["service_fee_collector_job"],
    vars: ["service_fee_job/ServiceRate"],
  },
  service_fee_collector_job: {
    dependencyJobs: ["service_fee_job", "subtotal_job"],
    dependencyVars: ["service_fee_job/ServiceRate", "subtotal_job/Subtotal"],
    dependents: ["total_before_credits_applied_collector_job"],
    vars: ["service_fee_collector_job/ServiceFee"],
  },
  total_before_credits_applied_collector_job: {
    dependencyJobs: [
      "service_fee_collector_job",
      "subtotal_job",
      "delivery_fee_job",
    ],
    dependencyVars: [
      "service_fee_collector_job/ServiceFee",
      "subtotal_job/Subtotal",
      "delivery_fee_job/DeliveryFee",
      "delivery_fee_job/ExtraSosDeliveryFee",
    ],
    dependents: ["total_before_credits_applied_collector_job"],
    vars: [
      "total_before_credits_applied_collector_job/FinalServiceFee",
      "total_before_credits_applied_collector_job/FinalDeliveryFee",
      "total_before_credits_applied_collector_job/TotalBeforeCreditsApplied",
    ],
  },
};

export const getReactFlowNodes = (nodesData: NodeData[]): Node[] => {
  return nodesData.map((node) => {
    const position = node.parentNode
      ? getItemPosition(dependencyMap[node.parentNode].vars.indexOf(node.id))
      : { x: 0, y: 0 };
    const size = node.parentNode
      ? { width: ITEM_WIDTH, height: ITEM_HEIGHT }
      : {
          width: CONTAINER_WIDTH,
          height: getContainerHeight(dependencyMap[node.id].vars.length),
        };
    return {
      ...node,
      type: node.parentNode ? "var" : "job",
      position: position,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      draggable: false,
      style: {
        ...size,
      },
    } as Node;
  });
};

export const getReactFlowEdges = (dependencyMap: DependencyMap): Edge[] => {
  return Object.entries(dependencyMap).reduce((acc, cur) => {
    const [jobId, dependencyMap] = cur;
    return [
      ...acc,
      ...dependencyMap.dependencyVars.map((varId) => ({
        id: `${varId}-${jobId}`,
        source: varId,
        target: jobId,
        animated: false,
        markerEnd: {
          type: MarkerType.Arrow,
        },
        zIndex: 9,
        type: "smoothstep",
      })),
    ];
  }, [] as Edge[]);
};

// only job nodes are needed for top-level layout
export const getReactFlowLayoutNodes = (nodesData: NodeData[]): Node[] => {
  return nodesData
    .filter((node) => !node.parentNode)
    .map(
      (node) =>
        ({
          ...node,
          position: { x: 0, y: 0 },
          sourcePosition: "right",
          targetPosition: "left",
          style: {
            width: 200,
            height: 200,
          },
        } as Node)
    );
};

// only job nodes edges are needed for top-level layout
export const getReactFlowLayoutEdges = (
  dependencyMap: DependencyMap
): Edge[] => {
  return Object.entries(dependencyMap)
    .filter(([k, v]) => v.dependencyJobs.length > 0)
    .reduce((acc, cur) => {
      const [jobId, dependency] = cur;
      return [
        ...acc,
        ...dependency.dependencyJobs.map(
          (dependencyJobId) =>
            ({
              id: `${dependencyJobId}-${jobId}`,
              source: dependencyJobId,
              target: jobId,
              animated: false,
            } as Edge)
        ),
      ];
    }, [] as Edge[]);
};
