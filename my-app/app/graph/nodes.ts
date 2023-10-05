import { Node } from "reactflow";

const nodes: Node[] = [
  {
    draggable: false,
    id: "subtotal_job",
    data: { label: "subtotal_job" },
    position: { x: -400, y: 0 },
    className: "light",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)", width: 200, height: 200 },
  },
  {
    draggable: false,
    id: "subtotal_job/Subtotal",
    data: { label: "Subtotal" },
    position: { x: 10, y: 50 },
    parentNode: "subtotal_job",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  },
  {
    draggable: false,
    id: "delivery_fee_job",
    data: { label: "delivery_fee_job" },
    position: { x: -400, y: 500 },
    className: "light",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)", width: 200, height: 200 },
  },
  {
    draggable: false,
    id: "delivery_fee_job/DeliveryFee",
    data: { label: "DeliveryFee" },
    position: { x: 10, y: 50 },
    parentNode: "delivery_fee_job",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  },
  {
    draggable: false,
    id: "delivery_fee_job/ExtraSosDeliveryFee",
    data: { label: "ExtraSosDeliveryFee" },
    position: { x: 10, y: 100 },
    parentNode: "delivery_fee_job",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  },

  {
    draggable: false,
    id: "service_fee_job",
    data: { label: "service_fee_job" },
    position: { x: -400, y: 250 },
    className: "light",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)", width: 200, height: 200 },
  },
  {
    draggable: false,
    id: "service_fee_job/ServiceRate",
    data: { label: "ServiceRate" },
    position: { x: 10, y: 50 },
    parentNode: "service_fee_job",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  },

  {
    draggable: false,
    id: "service_fee_collector_job",
    data: { label: "service_fee_collector_job" },
    selected: true,
    position: { x: 100, y: 250 },
    className: "light",
    style: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      width: 200,
      height: 200,
      borderColor: "green",
    },
  },
  {
    draggable: false,
    id: "service_fee_collector_job/ServiceFee",
    data: { label: "ServiceFee" },
    position: { x: 10, y: 50 },
    parentNode: "service_fee_collector_job",
    // hidden: true,
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  },

  {
    draggable: false,
    id: "total_before_credits_applied_collector_job",
    data: { label: "total_before_credits_applied_collector_job" },
    position: { x: 500, y: 250 },
    className: "light",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)", width: 200, height: 200 },
  },
  {
    draggable: false,
    id: "total_before_credits_applied_collector_job/FinalServiceFee",
    data: { label: "FinalServiceFee" },
    position: { x: 10, y: 50 },
    parentNode: "total_before_credits_applied_collector_job",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  },

  {
    draggable: false,
    id: "total_before_credits_applied_collector_job/FinalDeliveryFee",
    data: { label: "FinalDeliveryFee" },
    position: { x: 10, y: 100 },
    parentNode: "total_before_credits_applied_collector_job",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  },

  {
    draggable: false,
    id: "total_before_credits_applied_collector_job/TotalBeforeCreditsApplied",
    data: { label: "TotalBeforeCreditsApplied" },
    position: { x: 10, y: 150 },
    parentNode: "total_before_credits_applied_collector_job",
    style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  },
];

export default nodes;
