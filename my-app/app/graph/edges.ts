import { Edge } from "reactflow";

const edges: Edge[] = [
  {
    id: "subtotal_job/Subtotal-service_fee_collector_job",
    source: "subtotal_job/Subtotal",
    target: "service_fee_collector_job",
    animated: false,
  },
  {
    id: "subtotal_job/Subtotal-total_before_credits_applied_collector_job",
    source: "subtotal_job/Subtotal",
    target: "total_before_credits_applied_collector_job",
    animated: false,
  },
  {
    id: "service_fee_collector_job/ServiceFee-total_before_credits_applied_collector_job",
    source: "service_fee_collector_job/ServiceFee",
    target: "total_before_credits_applied_collector_job",
    animated: false,
  },
  {
    id: "delivery_fee_job/DeliveryFee-total_before_credits_applied_collector_job",
    source: "delivery_fee_job/DeliveryFee",
    target: "total_before_credits_applied_collector_job",
    animated: false,
  },
  {
    id: "delivery_fee_job/ExtraSosDeliveryFee-total_before_credits_applied_collector_job",
    source: "delivery_fee_job/ExtraSosDeliveryFee",
    target: "total_before_credits_applied_collector_job",
    animated: false,
  },
  {
    id: "service_fee_job/ServiceRate-total_before_credits_applied_collector_job",
    source: "service_fee_job/ServiceRate",
    target: "service_fee_collector_job",
    animated: false,
  },
];

export default edges;
