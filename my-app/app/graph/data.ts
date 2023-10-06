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
    codeLink?: string;
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
    id: "credit_job",
    data: {
      label: "credit_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/CreditJobCreator.kt",
    },
  },
  {
    id: "credit_job/AvailableCredit",
    data: {
      label: "AvailableCredit",
      description: "Configuration of available credit for each cx",
    },
    parentNode: "credit_job",
  },
  {
    id: "delivery_fee_job",
    data: {
      label: "delivery_fee_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/DeliveryFeeJobCreator.kt",
    },
  },
  {
    id: "delivery_fee_job/DeliveryFee",
    data: {
      label: "DeliveryFee",
      description: "Original delivery fee",
    },
    parentNode: "delivery_fee_job",
  },
  {
    id: "delivery_fee_job/ExtraSosDeliveryFee",
    data: {
      label: "ExtraSosDeliveryFee",
      description: "Original delivery fee",
    },
    parentNode: "delivery_fee_job",
  },
  {
    id: "delivery_option_job",
    data: {
      label: "delivery_option_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/DeliveryOptionJobCreator.kt",
    },
  },
  {
    id: "delivery_option_job/PriorityFee",
    data: {
      label: "PriorityFee",
      description: "Priority fee amount",
    },
    parentNode: "delivery_option_job",
  },
  {
    id: "delivery_option_job/DeliveryTrainsDiscountConfigVar",
    data: {
      label: "DeliveryTrainsDiscountConfigVar",
      description: "configuration for no rush delivery",
    },
    parentNode: "delivery_option_job",
  },
  {
    id: "delivery_option_quote_job",
    data: {
      label: "delivery_option_quote_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/DeliveryOptionQuoteJobCreator.kt",
    },
  },
  {
    id: "delivery_option_quote_job/DeliveryOptionQuoteVar",
    data: {
      label: "DeliveryOptionQuoteVar",
      description: "configuration of each delivery option",
    },
    parentNode: "delivery_option_quote_job",
  },
  {
    id: "eligible_subscription_job",
    data: {
      label: "eligible_subscription_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/EligibleSubscriptionJobCreator.kt",
    },
  },
  {
    id: "eligible_subscription_job/EligibleSubscriptionDiscount",
    data: {
      label: "EligibleSubscriptionDiscount",
      description:
        "Discount configuration on subscription with cx, mx, plan criterions",
    },
    parentNode: "eligible_subscription_job",
  },
  {
    id: "eligible_subscription_job/TrulyFreeDeliveryExperimentEligibleServiceFeeRate",
    data: {
      label: "TrulyFreeDeliveryExperimentEligibleServiceFeeRate",
      description:
        "This is the service rate used tor DP upsells. It tells consumer what the service rate when the consumer is eligbie for truly free delivery",
    },
    parentNode: "eligible_subscription_job",
  },
  {
    id: "generic_fee_job",
    data: {
      label: "generic_fee_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/GenericFeeJobCreator.kt",
    },
  },
  {
    id: "generic_fee_job/GenericFees",
    data: {
      label: "GenericFees",
      description: "fees required by government or by law",
    },
    parentNode: "generic_fee_job",
  },
  {
    id: "generic_fee_job/LegislativeFeeVar",
    data: {
      label: "LegislativeFeeVar",
      description: "fees required by government or by law",
    },
    parentNode: "generic_fee_job",
  },
  {
    id: "min_order_fee_job",
    data: {
      label: "min_order_fee_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/MinOrderFeeJobCreator.kt",
    },
  },
  {
    id: "min_order_fee_job/MinOrderSubtotalSetting",
    data: {
      label: "MinOrderSubtotalSetting",
      description: "The subtotal threshold for min order fee",
    },
    parentNode: "min_order_fee_job",
  },
  {
    id: "min_order_fee_job/MinOrderFeeSetting",
    data: {
      label: "MinOrderFeeSetting",
      description:
        "Sub market level min order fee. And this value is adjusted by service fee min.",
    },
    parentNode: "min_order_fee_job",
  },
  {
    id: "recurring_delivery_discount_job",
    data: {
      label: "recurring_delivery_discount_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/RecurringDeliveryDiscountJobCreator.kt",
    },
  },
  {
    id: "recurring_delivery_discount_job/RecurringDeliveryDiscountVar",
    data: {
      label: "RecurringDeliveryDiscountVar",
      description: "Recurring delivery discounts for subtotal",
    },
    parentNode: "recurring_delivery_discount_job",
  },
  {
    id: "service_fee_job",
    data: {
      label: "service_fee_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/ServiceFeeJobCreator.kt",
    },
  },
  {
    id: "service_fee_job/ServiceRate",
    data: {
      label: "ServiceRate",
      description: "Service rate percentage",
    },
    parentNode: "service_fee_job",
  },
  {
    id: "subscription_job",
    data: {
      label: "subscription_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/SubscriptionJobCreator.kt",
    },
  },
  {
    id: "subscription_job/SubscriptionDiscount",
    data: {
      label: "SubscriptionDiscount",
      description:
        "This includes subscription's discount details, such as dp users' delivery fee and service fee",
    },
    parentNode: "subscription_job",
  },
  {
    id: "subscription_job/SubscriptionDetail",
    data: {
      label: "SubscriptionDetail",
      description:
        "This includes the details about s subscription plan, such as subscription id.",
    },
    parentNode: "subscription_job",
  },
  {
    id: "subscription_job/TrulyFreeDeliveryExperimentServiceFeeRate",
    data: {
      label: "TrulyFreeDeliveryExperimentServiceFeeRate",
      description:
        "This is the service rate when the consumer is eligible for truly free delivery.",
    },
    parentNode: "subscription_job",
  },
  {
    id: "subtotal_job",
    data: {
      label: "subtotal_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/SubtotalJobCreator.kt",
    },
  },
  {
    id: "subtotal_job/Subtotal",
    data: {
      label: "Subtotal",
      description: "This the original cart subtotal.",
    },
    parentNode: "subtotal_job",
  },
  {
    id: "delivery_option_quote_collector_job",
    data: {
      label: "delivery_option_quote_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/DeliveryOptionQuoteCollectorJobCreator.kt",
    },
  },
  {
    id: "delivery_option_quote_collector_job/NoRushDeliveryOptionDiscountQuoteVar",
    data: {
      label: "NoRushDeliveryOptionDiscountQuoteVar",
      description: "Discount amount value for no rush delivery option",
    },
    parentNode: "delivery_option_quote_collector_job",
  },
  {
    id: "delivery_option_quote_collector_job/ScheduleDeliveryOptionDiscountQuoteVar",
    data: {
      label: "ScheduleDeliveryOptionDiscountQuoteVar",
      description: "Scheduled delivery discounts",
    },
    parentNode: "delivery_option_quote_collector_job",
  },
  {
    id: "min_order_fee_collector_job",
    data: {
      label: "min_order_fee_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/MinOrderFeeCollectorJobCreator.kt",
    },
  },
  {
    id: "min_order_fee_collector_job/MinOrderFee",
    data: {
      label: "MinOrderFee",
      description:
        "Small order fee. This is a charge to consumer when the subtotal is below a threshold",
    },
    parentNode: "min_order_fee_collector_job",
  },
  {
    id: "min_order_fee_collector_job/MinOrderSubtotal",
    data: {
      label: "MinOrderSubtotal",
      description: "The subtotal threshold for min order fee",
    },
    parentNode: "min_order_fee_collector_job",
  },
  {
    id: "min_order_fee_collector_job/MinOrderAdditionalSubtotal",
    data: {
      label: "MinOrderAdditionalSubtotal",
      description: "Add this amount to avoid min order fee.",
    },
    parentNode: "min_order_fee_collector_job",
  },
  {
    id: "service_fee_collector_job",
    data: {
      label: "service_fee_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/ServiceFeeCollectorJobCreator.kt",
    },
  },
  {
    id: "service_fee_collector_job/ServiceFee",
    data: {
      label: "ServiceFee",
      description:
        "Service fee. This var includes the adjustment by service fee min",
    },
    parentNode: "service_fee_collector_job",
  },
  {
    id: "train_discount_collector_job",
    data: {
      label: "train_discount_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/TrainDiscountCollectorJobCreator.kt",
    },
  },
  {
    id: "train_discount_collector_job/DeliveryTrainsDiscountAmountVar",
    data: {
      label: "DeliveryTrainsDiscountAmountVar",
      description: "final discount amount and info for no rush delivery",
    },
    parentNode: "train_discount_collector_job",
  },
  {
    id: "bundle_fee_discount_collector_job",
    data: {
      label: "bundle_fee_discount_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/BundleFeeDiscountCollectorJobCreator.kt",
    },
  },
  {
    id: "bundle_fee_discount_collector_job/BundleDiscountDeliveryFeeDiscountAmountVar",
    data: {
      label: "BundleDiscountDeliveryFeeDiscountAmountVar",
      description: "Delivery fee discount amount for bundle cart",
    },
    parentNode: "bundle_fee_discount_collector_job",
  },
  {
    id: "bundle_fee_discount_collector_job/BundleDiscountSmallOrderFeeDiscountAmountVar",
    data: {
      label: "BundleDiscountSmallOrderFeeDiscountAmountVar",
      description: "Small order fee discount amount for bundle cart",
    },
    parentNode: "bundle_fee_discount_collector_job",
  },
  {
    id: "eligible_subscription_collector_job",
    data: {
      label: "eligible_subscription_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/EligibleSubscriptionCollectorJobCreator.kt",
    },
  },
  {
    id: "eligible_subscription_collector_job/EligibleSubscriptionDiscountedServiceRate",
    data: {
      label: "EligibleSubscriptionDiscountedServiceRate",
      description:
        "Service rate discount amount introduced by eligible subscription",
    },
    parentNode: "eligible_subscription_collector_job",
  },
  {
    id: "eligible_subscription_collector_job/EligibleSubscriptionDiscountedServiceFee",
    data: {
      label: "EligibleSubscriptionDiscountedServiceFee",
      description:
        "Service fee discount amount introduced by eligible subscription",
    },
    parentNode: "eligible_subscription_collector_job",
  },
  {
    id: "eligible_subscription_collector_job/EligibleSubscriptionDiscountedDeliveryFee",
    data: {
      label: "EligibleSubscriptionDiscountedDeliveryFee",
      description: "Original delivery fee",
    },
    parentNode: "eligible_subscription_collector_job",
  },
  {
    id: "subscription_collector_job",
    data: {
      label: "subscription_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/SubscriptionCollectorJobCreator.kt",
    },
  },
  {
    id: "subscription_collector_job/SubscriptionAdditionalSubtotal",
    data: {
      label: "SubscriptionAdditionalSubtotal",
      description:
        "This is used for upsells. Add $X to get Dashpass discounts.",
    },
    parentNode: "subscription_collector_job",
  },
  {
    id: "subscription_collector_job/SubscriptionBenefitsApplied",
    data: {
      label: "SubscriptionBenefitsApplied",
      description: "It indicates whether DashPass discounts is applied.",
    },
    parentNode: "subscription_collector_job",
  },
  {
    id: "subscription_collector_job/SubscriptionDiscountedDeliveryFee",
    data: {
      label: "SubscriptionDiscountedDeliveryFee",
      description: "Original delivery fee",
    },
    parentNode: "subscription_collector_job",
  },
  {
    id: "subscription_collector_job/SubscriptionDiscountedServiceFee",
    data: {
      label: "SubscriptionDiscountedServiceFee",
      description:
        "Service fee. This var includes the adjustment by service fee min",
    },
    parentNode: "subscription_collector_job",
  },
  {
    id: "subscription_collector_job/SubscriptionDiscountedServiceRate",
    data: {
      label: "SubscriptionDiscountedServiceRate",
      description: "Service rate percentage",
    },
    parentNode: "subscription_collector_job",
  },
  {
    id: "subscription_collector_job/SubscriptionDiscountFlatRate",
    data: {
      label: "SubscriptionDiscountFlatRate",
      description: "This is the flat rate for lunch pass users.",
    },
    parentNode: "subscription_collector_job",
  },
  {
    id: "subscription_collector_job/TrulyFreeDeliveryExperimentServiceFee",
    data: {
      label: "TrulyFreeDeliveryExperimentServiceFee",
      description:
        "Service fee. This var includes the adjustment by service fee min",
    },
    parentNode: "subscription_collector_job",
  },
  {
    id: "subscription_collector_job/DummyAdjustment",
    data: {
      label: "DummyAdjustment",
      description: "Dummy Adjust for payment method",
    },
    parentNode: "subscription_collector_job",
  },
  {
    id: "promotion_collector_job",
    data: {
      label: "promotion_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/PromotionCollectorJobCreator.kt",
    },
  },
  {
    id: "promotion_collector_job/AppliedPromotion",
    data: {
      label: "AppliedPromotion",
      description:
        "Discounts retrieved from Promotion service after filtering and mapping",
    },
    parentNode: "promotion_collector_job",
  },
  {
    id: "promotion_discount_collector_job",
    data: {
      label: "promotion_discount_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/PromotionDiscountCollectorJobCreator.kt",
    },
  },
  {
    id: "promotion_discount_collector_job/ExpandedRangeFee",
    data: {
      label: "ExpandedRangeFee",
      description: "Expanded range fee discount breakdowns for meal plans.",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/ItemLevelPromotion",
    data: {
      label: "ItemLevelPromotion",
      description: "best itemLevel promotion discount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/LunchpassPromotion",
    data: {
      label: "LunchpassPromotion",
      description: "best lunch pass promotion discount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PostMerchantDiscountedSubtotalVar",
    data: {
      label: "PostMerchantDiscountedSubtotalVar",
      description:
        "Post merchant promotion subtotal and fee information for tax calculation",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionAdditionalDiscountPercentMaxValue",
    data: {
      label: "PromotionAdditionalDiscountPercentMaxValue",
      description: "Promotion max discount amount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionAdditionalFlatValueSaving",
    data: {
      label: "PromotionAdditionalFlatValueSaving",
      description: "Promotion flat amount discount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionAdditionalPercentageSaving",
    data: {
      label: "PromotionAdditionalPercentageSaving",
      description: "Promotion percentage discount value",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionAdditionalSubtotal",
    data: {
      label: "PromotionAdditionalSubtotal",
      description: "Additional subtotal needed to be qualified for promotion",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionCreditsback",
    data: {
      label: "PromotionCreditsback",
      description: "Best credits back promotion discount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionDeliveryFeeDiscount",
    data: {
      label: "PromotionDeliveryFeeDiscount",
      description: "Best delivery fee promotion discount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionMinSubtotal",
    data: {
      label: "PromotionMinSubtotal",
      description: "Promotion minimum subtotal requirements",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionServiceFeeDiscount",
    data: {
      label: "PromotionServiceFeeDiscount",
      description: "best service fee promotion discount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionSmallOrderFeeDiscount",
    data: {
      label: "PromotionSmallOrderFeeDiscount",
      description: "best small order fee promotion discount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionValueDiscount",
    data: {
      label: "PromotionValueDiscount",
      description: "best subtotal level promotion discount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/StackableItemLevelPromotion",
    data: {
      label: "StackableItemLevelPromotion",
      description: "best itemLevel promotion discount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/NudgePromotionVar",
    data: {
      label: "NudgePromotionVar",
      description: "Nudge promotion adjustments",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionStackableDeliveryFeeDiscount",
    data: {
      label: "PromotionStackableDeliveryFeeDiscount",
      description: "total of all stackable delivery fee discount",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionPriorityFeeDiscount",
    data: {
      label: "PromotionPriorityFeeDiscount",
      description: "Priority fee promotion discount adjustment",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "promotion_discount_collector_job/PromotionNudgeTotalDiscountAmount",
    data: {
      label: "PromotionNudgeTotalDiscountAmount",
      description:
        "Promotion total save discount amount for nearby free delivery + discounted service fee with minimum subtotal",
    },
    parentNode: "promotion_discount_collector_job",
  },
  {
    id: "discount_collector_job",
    data: {
      label: "discount_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/DiscountCollectorJobCreator.kt",
    },
  },
  {
    id: "discount_collector_job/DiscountBreakdownCreditsBack",
    data: {
      label: "DiscountBreakdownCreditsBack",
      description: "final discount context for creditsBack",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "discount_collector_job/DiscountBreakdownDeliveryFee",
    data: {
      label: "DiscountBreakdownDeliveryFee",
      description: "Original delivery fee",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "discount_collector_job/DiscountBreakdownExpandedRangeFee",
    data: {
      label: "DiscountBreakdownExpandedRangeFee",
      description: "final discount context for expanded range fee",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "discount_collector_job/DiscountBreakdownItemPrice",
    data: {
      label: "DiscountBreakdownItemPrice",
      description: "final discount context for Item Price",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "discount_collector_job/DiscountBreakdownLunchpassVar",
    data: {
      label: "DiscountBreakdownLunchpassVar",
      description: "final discount context for lunch pass",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "discount_collector_job/DiscountBreakdownServiceFeeVar",
    data: {
      label: "DiscountBreakdownServiceFeeVar",
      description: "final discount context for service fee",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "discount_collector_job/DiscountBreakdownSmallOrderFee",
    data: {
      label: "DiscountBreakdownSmallOrderFee",
      description: "final discount context for small order fee",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "discount_collector_job/DiscountBreakdownSubtotal",
    data: {
      label: "DiscountBreakdownSubtotal",
      description: "final discount context for subtotal",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "discount_collector_job/DiscountContext",
    data: {
      label: "DiscountContext",
      description: "final discount context for all applicable discount",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "discount_collector_job/TotalDeliveryFeeDiscount",
    data: {
      label: "TotalDeliveryFeeDiscount",
      description: "This is the total amount for delivery fee discounts.",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "discount_collector_job/DiscountBreakdownPriorityFee",
    data: {
      label: "DiscountBreakdownPriorityFee",
      description: "final discount context for priority fee",
    },
    parentNode: "discount_collector_job",
  },
  {
    id: "estimated_tax_collector_job",
    data: {
      label: "estimated_tax_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/EstimatedTaxCollectorJobCreator.kt",
    },
  },
  {
    id: "estimated_tax_collector_job/DeliveryFeeTax",
    data: {
      label: "DeliveryFeeTax",
      description: "Tax for final delivery fee",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/EstimateTaxResponse",
    data: {
      label: "EstimateTaxResponse",
      description:
        "Estimated tax response payload for group order split bill usage",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/FeesTax",
    data: {
      label: "FeesTax",
      description: "Fees tax from tax response",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/GenericFeesTaxVar",
    data: {
      label: "GenericFeesTaxVar",
      description: "tax of generic fee",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/LegislativeFeeTaxVar",
    data: {
      label: "LegislativeFeeTaxVar",
      description: "tax of legislative fee",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/MarketplaceFacilitator",
    data: {
      label: "MarketplaceFacilitator",
      description: "Tax Mpf adjustment",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/PriorityFeeTaxVar",
    data: {
      label: "PriorityFeeTaxVar",
      description: "Priority fee tax",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/ServiceFeeTax",
    data: {
      label: "ServiceFeeTax",
      description: "Service fee tax",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SmallOrderFeeTax",
    data: {
      label: "SmallOrderFeeTax",
      description: "Tax for small order fee.",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/StoreTaxRate",
    data: {
      label: "StoreTaxRate",
      description: "Store level tax rate",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionDeliveryFeeTax",
    data: {
      label: "SubTransactionDeliveryFeeTax",
      description: "Tax for final delivery fee",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionFeesTax",
    data: {
      label: "SubTransactionFeesTax",
      description: "Fees tax from tax response",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionIds",
    data: {
      label: "SubTransactionIds",
      description:
        "The transaction ids for subtransactions. Subtransaction is used when the order includes alcohol.",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionLegislativeFeeTax",
    data: {
      label: "SubTransactionLegislativeFeeTax",
      description:
        "Legislative fee's tax in sub transaction. Subtransaction is used when the order includes alcohol.",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionPriorityFeeTax",
    data: {
      label: "SubTransactionPriorityFeeTax",
      description:
        "Priority fee's tax in sub transaction. Subtransaction is used when the order includes alcohol.",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionServiceFeeTax",
    data: {
      label: "SubTransactionServiceFeeTax",
      description: "Service fee tax",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionSmallOrderFeeTax",
    data: {
      label: "SubTransactionSmallOrderFeeTax",
      description: "Tax for small order fee.",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionStoreTaxRate",
    data: {
      label: "SubTransactionStoreTaxRate",
      description: "Store level tax rate",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionSubtotalTax",
    data: {
      label: "SubTransactionSubtotalTax",
      description: "Tax for cart subtotal",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionTax",
    data: {
      label: "SubTransactionTax",
      description:
        "The total tax for sub transactions. Subtransaction is used when the order includes alcohol.",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubTransactionTaxDetails",
    data: {
      label: "SubTransactionTaxDetails",
      description:
        "All tax related information for sub transaction. Subtransaction is used when the order includes alcohol.",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/SubtotalTax",
    data: {
      label: "SubtotalTax",
      description: "Tax for cart subtotal",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/Tax",
    data: {
      label: "Tax",
      description: "This is the default subtotal tax.",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/TaxDetails",
    data: {
      label: "TaxDetails",
      description: "Tax breakdown's snapshot",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "estimated_tax_collector_job/TaxMetadataVar",
    data: {
      label: "TaxMetadataVar",
      description:
        "Tax information about item breakdown and payment breakdown.",
    },
    parentNode: "estimated_tax_collector_job",
  },
  {
    id: "loyalty_points_collector_job",
    data: {
      label: "loyalty_points_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/LoyaltyPointsCollectorJobCreator.kt",
    },
  },
  {
    id: "loyalty_points_collector_job/DDLoyaltyPoints",
    data: {
      label: "DDLoyaltyPoints",
      description: "Doordash loyalty points",
    },
    parentNode: "loyalty_points_collector_job",
  },
  {
    id: "merchant_tip_suggestions_collector_job",
    data: {
      label: "merchant_tip_suggestions_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/MerchantTipSuggestionsCollectorJobCreator.kt",
    },
  },
  {
    id: "merchant_tip_suggestions_collector_job/MerchantTipSuggestions",
    data: {
      label: "MerchantTipSuggestions",
      description: "Merchant tip suggestion in amount",
    },
    parentNode: "merchant_tip_suggestions_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job",
    data: {
      label: "total_before_credits_applied_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/TotalBeforeCreditsAppliedCollectorJobCreator.kt",
    },
  },
  {
    id: "total_before_credits_applied_collector_job/EligibleTotalBeforeCreditsApplied",
    data: {
      label: "EligibleTotalBeforeCreditsApplied",
      description: "Eligible total amount before credits applied",
    },
    parentNode: "total_before_credits_applied_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job/EligibleTotalBeforeTipApplied",
    data: {
      label: "EligibleTotalBeforeTipApplied",
      description: "Eligible total amount before tip applied",
    },
    parentNode: "total_before_credits_applied_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job/FinalDeliveryFee",
    data: {
      label: "FinalDeliveryFee",
      description: "Original delivery fee",
    },
    parentNode: "total_before_credits_applied_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job/FinalMinOrderFee",
    data: {
      label: "FinalMinOrderFee",
      description:
        "FinalMinOrderFee is what is charged to the consumer. Minimum Order Fee (Small Order Fee) is charged when the subtotal of an order is below a certain threshold.",
    },
    parentNode: "total_before_credits_applied_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job/FinalPriorityFee",
    data: {
      label: "FinalPriorityFee",
      description:
        "FinalPriorityFee is what is charged to the consumer for express delivery.",
    },
    parentNode: "total_before_credits_applied_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job/FinalServiceFee",
    data: {
      label: "FinalServiceFee",
      description:
        "FinalServiceFee is what is charged to the consumer. This fee includes any service fee related discounts.",
    },
    parentNode: "total_before_credits_applied_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job/TotalBeforeCreditsApplied",
    data: {
      label: "TotalBeforeCreditsApplied",
      description:
        "This is the total charge for an order, before pricing services can apply any eligible credit balance on the consumers order.",
    },
    parentNode: "total_before_credits_applied_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job/TotalBeforeDiscountApplied",
    data: {
      label: "TotalBeforeDiscountApplied",
      description:
        "This is the original total charge for an order before any discounts applied.",
    },
    parentNode: "total_before_credits_applied_collector_job",
  },
  {
    id: "total_before_credits_applied_collector_job/TotalNotAppliedCredit",
    data: {
      label: "TotalNotAppliedCredit",
      description: "This is the subtotal we cannot use credits to apply",
    },
    parentNode: "total_before_credits_applied_collector_job",
  },
  {
    id: "credit_collector_job",
    data: {
      label: "credit_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/CreditCollectorJobCreator.kt",
    },
  },
  {
    id: "credit_collector_job/CreditsApplicableBeforeTip",
    data: {
      label: "CreditsApplicableBeforeTip",
      description: "How much credit is applied in order cart quote in total",
    },
    parentNode: "credit_collector_job",
  },
  {
    id: "credit_collector_job/ReferralCreditsApplied",
    data: {
      label: "ReferralCreditsApplied",
      description: "Credits for Referral",
    },
    parentNode: "credit_collector_job",
  },
  {
    id: "credit_collector_job/TotalCreditsApplied",
    data: {
      label: "TotalCreditsApplied",
      description:
        "This is the total credits available to apply for consumers.",
    },
    parentNode: "credit_collector_job",
  },
  {
    id: "reward_points_collector_job",
    data: {
      label: "reward_points_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/RewardPointsCollectorJobCreator.kt",
    },
  },
  {
    id: "reward_points_collector_job/AvailableRewardPoints",
    data: {
      label: "AvailableRewardPoints",
      description: "Final reward points that cx applies",
    },
    parentNode: "reward_points_collector_job",
  },
  {
    id: "total_collector_job",
    data: {
      label: "total_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/TotalCollectorJobCreator.kt",
    },
  },
  {
    id: "total_collector_job/EligibleTotal",
    data: {
      label: "EligibleTotal",
      description:
        "Eligible total amount after credits, tips, rewards, refunds, etc.",
    },
    parentNode: "total_collector_job",
  },
  {
    id: "total_collector_job/Total",
    data: {
      label: "Total",
      description: "This is the total charge for an order.",
    },
    parentNode: "total_collector_job",
  },
  {
    id: "total_collector_job/TotalBeforeTip",
    data: {
      label: "TotalBeforeTip",
      description: "This is total charge without tips for customers.",
    },
    parentNode: "total_collector_job",
  },
  {
    id: "dasher_tip_suggestions_collector_job",
    data: {
      label: "dasher_tip_suggestions_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/DasherTipSuggestionsCollectorJobCreator.kt",
    },
  },
  {
    id: "dasher_tip_suggestions_collector_job/DasherTipSuggestions",
    data: {
      label: "DasherTipSuggestions",
      description: "Suggestions tip amount for dasher",
    },
    parentNode: "dasher_tip_suggestions_collector_job",
  },
];

export const dependencyMap: DependencyMap = {
  credit_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: ["credit_collector_job"],
    vars: ["credit_job/AvailableCredit"],
  },
  delivery_fee_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: [
      "bundle_fee_discount_collector_job",
      "promotion_collector_job",
      "promotion_discount_collector_job",
      "discount_collector_job",
      "estimated_tax_collector_job",
      "merchant_tip_suggestions_collector_job",
      "total_before_credits_applied_collector_job",
      "dasher_tip_suggestions_collector_job",
    ],
    vars: [
      "delivery_fee_job/DeliveryFee",
      "delivery_fee_job/ExtraSosDeliveryFee",
    ],
  },
  delivery_option_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: [
      "train_discount_collector_job",
      "promotion_discount_collector_job",
      "estimated_tax_collector_job",
      "total_before_credits_applied_collector_job",
    ],
    vars: [
      "delivery_option_job/PriorityFee",
      "delivery_option_job/DeliveryTrainsDiscountConfigVar",
    ],
  },
  delivery_option_quote_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: ["delivery_option_quote_collector_job"],
    vars: ["delivery_option_quote_job/DeliveryOptionQuoteVar"],
  },
  eligible_subscription_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: ["eligible_subscription_collector_job"],
    vars: [
      "eligible_subscription_job/EligibleSubscriptionDiscount",
      "eligible_subscription_job/TrulyFreeDeliveryExperimentEligibleServiceFeeRate",
    ],
  },
  generic_fee_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: [
      "promotion_discount_collector_job",
      "estimated_tax_collector_job",
      "total_before_credits_applied_collector_job",
      "dasher_tip_suggestions_collector_job",
    ],
    vars: ["generic_fee_job/GenericFees", "generic_fee_job/LegislativeFeeVar"],
  },
  min_order_fee_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: ["min_order_fee_collector_job"],
    vars: [
      "min_order_fee_job/MinOrderSubtotalSetting",
      "min_order_fee_job/MinOrderFeeSetting",
    ],
  },
  recurring_delivery_discount_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: ["discount_collector_job"],
    vars: ["recurring_delivery_discount_job/RecurringDeliveryDiscountVar"],
  },
  service_fee_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: [
      "service_fee_collector_job",
      "eligible_subscription_collector_job",
      "subscription_collector_job",
      "promotion_collector_job",
      "promotion_discount_collector_job",
      "discount_collector_job",
      "total_before_credits_applied_collector_job",
    ],
    vars: ["service_fee_job/ServiceRate"],
  },
  subscription_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: [
      "subscription_collector_job",
      "promotion_collector_job",
      "promotion_discount_collector_job",
      "discount_collector_job",
      "estimated_tax_collector_job",
      "total_before_credits_applied_collector_job",
      "dasher_tip_suggestions_collector_job",
    ],
    vars: [
      "subscription_job/SubscriptionDiscount",
      "subscription_job/SubscriptionDetail",
      "subscription_job/TrulyFreeDeliveryExperimentServiceFeeRate",
    ],
  },
  subtotal_job: {
    dependencyJobs: [],
    dependencyVars: [],
    dependents: [
      "delivery_option_quote_collector_job",
      "min_order_fee_collector_job",
      "service_fee_collector_job",
      "train_discount_collector_job",
      "bundle_fee_discount_collector_job",
      "eligible_subscription_collector_job",
      "subscription_collector_job",
      "promotion_collector_job",
      "promotion_discount_collector_job",
      "discount_collector_job",
      "estimated_tax_collector_job",
      "loyalty_points_collector_job",
      "merchant_tip_suggestions_collector_job",
      "total_before_credits_applied_collector_job",
      "credit_collector_job",
      "total_collector_job",
      "dasher_tip_suggestions_collector_job",
    ],
    vars: ["subtotal_job/Subtotal"],
  },
  delivery_option_quote_collector_job: {
    dependencyJobs: ["subtotal_job", "delivery_option_quote_job"],
    dependencyVars: [
      "subtotal_job/Subtotal",
      "delivery_option_quote_job/DeliveryOptionQuoteVar",
    ],
    dependents: [],
    vars: [
      "delivery_option_quote_collector_job/NoRushDeliveryOptionDiscountQuoteVar",
      "delivery_option_quote_collector_job/ScheduleDeliveryOptionDiscountQuoteVar",
    ],
  },
  min_order_fee_collector_job: {
    dependencyJobs: ["subtotal_job", "min_order_fee_job"],
    dependencyVars: [
      "subtotal_job/Subtotal",
      "min_order_fee_job/MinOrderSubtotalSetting",
      "min_order_fee_job/MinOrderFeeSetting",
    ],
    dependents: [
      "bundle_fee_discount_collector_job",
      "promotion_discount_collector_job",
      "discount_collector_job",
      "estimated_tax_collector_job",
      "total_before_credits_applied_collector_job",
    ],
    vars: [
      "min_order_fee_collector_job/MinOrderFee",
      "min_order_fee_collector_job/MinOrderSubtotal",
      "min_order_fee_collector_job/MinOrderAdditionalSubtotal",
    ],
  },
  service_fee_collector_job: {
    dependencyJobs: ["subtotal_job", "service_fee_job"],
    dependencyVars: ["subtotal_job/Subtotal", "service_fee_job/ServiceRate"],
    dependents: [
      "eligible_subscription_collector_job",
      "subscription_collector_job",
      "promotion_collector_job",
      "promotion_discount_collector_job",
      "discount_collector_job",
      "estimated_tax_collector_job",
      "merchant_tip_suggestions_collector_job",
      "total_before_credits_applied_collector_job",
      "dasher_tip_suggestions_collector_job",
    ],
    vars: ["service_fee_collector_job/ServiceFee"],
  },
  train_discount_collector_job: {
    dependencyJobs: ["subtotal_job", "delivery_option_job"],
    dependencyVars: [
      "subtotal_job/Subtotal",
      "delivery_option_job/DeliveryTrainsDiscountConfigVar",
    ],
    dependents: ["discount_collector_job"],
    vars: ["train_discount_collector_job/DeliveryTrainsDiscountAmountVar"],
  },
  bundle_fee_discount_collector_job: {
    dependencyJobs: [
      "subtotal_job",
      "delivery_fee_job",
      "min_order_fee_collector_job",
    ],
    dependencyVars: [
      "subtotal_job/Subtotal",
      "delivery_fee_job/DeliveryFee",
      "min_order_fee_collector_job/MinOrderFee",
    ],
    dependents: ["discount_collector_job"],
    vars: [
      "bundle_fee_discount_collector_job/BundleDiscountDeliveryFeeDiscountAmountVar",
      "bundle_fee_discount_collector_job/BundleDiscountSmallOrderFeeDiscountAmountVar",
    ],
  },
  eligible_subscription_collector_job: {
    dependencyJobs: [
      "subtotal_job",
      "service_fee_job",
      "service_fee_collector_job",
      "eligible_subscription_job",
    ],
    dependencyVars: [
      "subtotal_job/Subtotal",
      "service_fee_job/ServiceRate",
      "service_fee_collector_job/ServiceFee",
      "eligible_subscription_job/EligibleSubscriptionDiscount",
      "eligible_subscription_job/TrulyFreeDeliveryExperimentEligibleServiceFeeRate",
    ],
    dependents: ["total_before_credits_applied_collector_job"],
    vars: [
      "eligible_subscription_collector_job/EligibleSubscriptionDiscountedServiceRate",
      "eligible_subscription_collector_job/EligibleSubscriptionDiscountedServiceFee",
      "eligible_subscription_collector_job/EligibleSubscriptionDiscountedDeliveryFee",
    ],
  },
  subscription_collector_job: {
    dependencyJobs: [
      "subtotal_job",
      "service_fee_job",
      "service_fee_collector_job",
      "subscription_job",
    ],
    dependencyVars: [
      "subtotal_job/Subtotal",
      "service_fee_job/ServiceRate",
      "service_fee_collector_job/ServiceFee",
      "subscription_job/SubscriptionDiscount",
      "subscription_job/SubscriptionDetail",
      "subscription_job/TrulyFreeDeliveryExperimentServiceFeeRate",
    ],
    dependents: [
      "promotion_collector_job",
      "discount_collector_job",
      "estimated_tax_collector_job",
      "total_before_credits_applied_collector_job",
    ],
    vars: [
      "subscription_collector_job/SubscriptionAdditionalSubtotal",
      "subscription_collector_job/SubscriptionBenefitsApplied",
      "subscription_collector_job/SubscriptionDiscountedDeliveryFee",
      "subscription_collector_job/SubscriptionDiscountedServiceFee",
      "subscription_collector_job/SubscriptionDiscountedServiceRate",
      "subscription_collector_job/SubscriptionDiscountFlatRate",
      "subscription_collector_job/TrulyFreeDeliveryExperimentServiceFee",
      "subscription_collector_job/DummyAdjustment",
    ],
  },
  promotion_collector_job: {
    dependencyJobs: [
      "subtotal_job",
      "service_fee_job",
      "delivery_fee_job",
      "subscription_job",
      "subscription_collector_job",
      "service_fee_collector_job",
    ],
    dependencyVars: [
      "subtotal_job/Subtotal",
      "service_fee_job/ServiceRate",
      "delivery_fee_job/DeliveryFee",
      "subscription_job/SubscriptionDiscount",
      "subscription_job/SubscriptionDetail",
      "subscription_collector_job/DummyAdjustment",
      "service_fee_collector_job/ServiceFee",
    ],
    dependents: ["promotion_discount_collector_job", "discount_collector_job"],
    vars: ["promotion_collector_job/AppliedPromotion"],
  },
  promotion_discount_collector_job: {
    dependencyJobs: [
      "subtotal_job",
      "service_fee_job",
      "delivery_fee_job",
      "subscription_job",
      "min_order_fee_collector_job",
      "generic_fee_job",
      "service_fee_collector_job",
      "promotion_collector_job",
      "delivery_option_job",
    ],
    dependencyVars: [
      "subtotal_job/Subtotal",
      "service_fee_job/ServiceRate",
      "delivery_fee_job/DeliveryFee",
      "subscription_job/SubscriptionDiscount",
      "min_order_fee_collector_job/MinOrderFee",
      "generic_fee_job/GenericFees",
      "service_fee_collector_job/ServiceFee",
      "promotion_collector_job/AppliedPromotion",
      "delivery_option_job/PriorityFee",
    ],
    dependents: [
      "discount_collector_job",
      "estimated_tax_collector_job",
      "total_before_credits_applied_collector_job",
    ],
    vars: [
      "promotion_discount_collector_job/ExpandedRangeFee",
      "promotion_discount_collector_job/ItemLevelPromotion",
      "promotion_discount_collector_job/LunchpassPromotion",
      "promotion_discount_collector_job/PostMerchantDiscountedSubtotalVar",
      "promotion_discount_collector_job/PromotionAdditionalDiscountPercentMaxValue",
      "promotion_discount_collector_job/PromotionAdditionalFlatValueSaving",
      "promotion_discount_collector_job/PromotionAdditionalPercentageSaving",
      "promotion_discount_collector_job/PromotionAdditionalSubtotal",
      "promotion_discount_collector_job/PromotionCreditsback",
      "promotion_discount_collector_job/PromotionDeliveryFeeDiscount",
      "promotion_discount_collector_job/PromotionMinSubtotal",
      "promotion_discount_collector_job/PromotionServiceFeeDiscount",
      "promotion_discount_collector_job/PromotionSmallOrderFeeDiscount",
      "promotion_discount_collector_job/PromotionValueDiscount",
      "promotion_discount_collector_job/StackableItemLevelPromotion",
      "promotion_discount_collector_job/NudgePromotionVar",
      "promotion_discount_collector_job/PromotionStackableDeliveryFeeDiscount",
      "promotion_discount_collector_job/PromotionPriorityFeeDiscount",
      "promotion_discount_collector_job/PromotionNudgeTotalDiscountAmount",
    ],
  },
  discount_collector_job: {
    dependencyJobs: [
      "delivery_fee_job",
      "recurring_delivery_discount_job",
      "service_fee_job",
      "subscription_job",
      "subtotal_job",
      "bundle_fee_discount_collector_job",
      "min_order_fee_collector_job",
      "promotion_collector_job",
      "promotion_discount_collector_job",
      "service_fee_collector_job",
      "subscription_collector_job",
      "train_discount_collector_job",
    ],
    dependencyVars: [
      "delivery_fee_job/DeliveryFee",
      "recurring_delivery_discount_job/RecurringDeliveryDiscountVar",
      "service_fee_job/ServiceRate",
      "subscription_job/SubscriptionDetail",
      "subscription_job/SubscriptionDiscount",
      "subscription_job/TrulyFreeDeliveryExperimentServiceFeeRate",
      "subtotal_job/Subtotal",
      "bundle_fee_discount_collector_job/BundleDiscountDeliveryFeeDiscountAmountVar",
      "bundle_fee_discount_collector_job/BundleDiscountSmallOrderFeeDiscountAmountVar",
      "min_order_fee_collector_job/MinOrderFee",
      "promotion_collector_job/AppliedPromotion",
      "promotion_discount_collector_job/ExpandedRangeFee",
      "promotion_discount_collector_job/ItemLevelPromotion",
      "promotion_discount_collector_job/LunchpassPromotion",
      "promotion_discount_collector_job/NudgePromotionVar",
      "promotion_discount_collector_job/PromotionAdditionalSubtotal",
      "promotion_discount_collector_job/PromotionCreditsback",
      "promotion_discount_collector_job/PromotionDeliveryFeeDiscount",
      "promotion_discount_collector_job/PromotionMinSubtotal",
      "promotion_discount_collector_job/PromotionServiceFeeDiscount",
      "promotion_discount_collector_job/PromotionSmallOrderFeeDiscount",
      "promotion_discount_collector_job/PromotionValueDiscount",
      "promotion_discount_collector_job/StackableItemLevelPromotion",
      "promotion_discount_collector_job/PromotionStackableDeliveryFeeDiscount",
      "promotion_discount_collector_job/PromotionPriorityFeeDiscount",
      "promotion_discount_collector_job/PromotionNudgeTotalDiscountAmount",
      "service_fee_collector_job/ServiceFee",
      "subscription_collector_job/SubscriptionAdditionalSubtotal",
      "subscription_collector_job/SubscriptionBenefitsApplied",
      "subscription_collector_job/SubscriptionDiscountedDeliveryFee",
      "subscription_collector_job/SubscriptionDiscountedServiceFee",
      "subscription_collector_job/SubscriptionDiscountedServiceRate",
      "subscription_collector_job/TrulyFreeDeliveryExperimentServiceFee",
      "train_discount_collector_job/DeliveryTrainsDiscountAmountVar",
    ],
    dependents: [
      "estimated_tax_collector_job",
      "loyalty_points_collector_job",
      "total_before_credits_applied_collector_job",
    ],
    vars: [
      "discount_collector_job/DiscountBreakdownCreditsBack",
      "discount_collector_job/DiscountBreakdownDeliveryFee",
      "discount_collector_job/DiscountBreakdownExpandedRangeFee",
      "discount_collector_job/DiscountBreakdownItemPrice",
      "discount_collector_job/DiscountBreakdownLunchpassVar",
      "discount_collector_job/DiscountBreakdownServiceFeeVar",
      "discount_collector_job/DiscountBreakdownSmallOrderFee",
      "discount_collector_job/DiscountBreakdownSubtotal",
      "discount_collector_job/DiscountContext",
      "discount_collector_job/TotalDeliveryFeeDiscount",
      "discount_collector_job/DiscountBreakdownPriorityFee",
    ],
  },
  estimated_tax_collector_job: {
    dependencyJobs: [
      "delivery_fee_job",
      "delivery_option_job",
      "generic_fee_job",
      "subscription_job",
      "subtotal_job",
      "discount_collector_job",
      "min_order_fee_collector_job",
      "promotion_discount_collector_job",
      "service_fee_collector_job",
      "subscription_collector_job",
    ],
    dependencyVars: [
      "delivery_fee_job/DeliveryFee",
      "delivery_fee_job/ExtraSosDeliveryFee",
      "delivery_option_job/PriorityFee",
      "generic_fee_job/GenericFees",
      "generic_fee_job/LegislativeFeeVar",
      "subscription_job/SubscriptionDiscount",
      "subtotal_job/Subtotal",
      "discount_collector_job/DiscountBreakdownDeliveryFee",
      "discount_collector_job/DiscountBreakdownExpandedRangeFee",
      "discount_collector_job/DiscountBreakdownServiceFeeVar",
      "discount_collector_job/DiscountBreakdownSmallOrderFee",
      "discount_collector_job/DiscountBreakdownSubtotal",
      "discount_collector_job/TotalDeliveryFeeDiscount",
      "min_order_fee_collector_job/MinOrderFee",
      "promotion_discount_collector_job/ItemLevelPromotion",
      "promotion_discount_collector_job/PostMerchantDiscountedSubtotalVar",
      "promotion_discount_collector_job/StackableItemLevelPromotion",
      "service_fee_collector_job/ServiceFee",
      "subscription_collector_job/SubscriptionDiscountedDeliveryFee",
      "subscription_collector_job/SubscriptionDiscountedServiceFee",
    ],
    dependents: [
      "merchant_tip_suggestions_collector_job",
      "total_before_credits_applied_collector_job",
      "dasher_tip_suggestions_collector_job",
    ],
    vars: [
      "estimated_tax_collector_job/DeliveryFeeTax",
      "estimated_tax_collector_job/EstimateTaxResponse",
      "estimated_tax_collector_job/FeesTax",
      "estimated_tax_collector_job/GenericFeesTaxVar",
      "estimated_tax_collector_job/LegislativeFeeTaxVar",
      "estimated_tax_collector_job/MarketplaceFacilitator",
      "estimated_tax_collector_job/PriorityFeeTaxVar",
      "estimated_tax_collector_job/ServiceFeeTax",
      "estimated_tax_collector_job/SmallOrderFeeTax",
      "estimated_tax_collector_job/StoreTaxRate",
      "estimated_tax_collector_job/SubTransactionDeliveryFeeTax",
      "estimated_tax_collector_job/SubTransactionFeesTax",
      "estimated_tax_collector_job/SubTransactionIds",
      "estimated_tax_collector_job/SubTransactionLegislativeFeeTax",
      "estimated_tax_collector_job/SubTransactionPriorityFeeTax",
      "estimated_tax_collector_job/SubTransactionServiceFeeTax",
      "estimated_tax_collector_job/SubTransactionSmallOrderFeeTax",
      "estimated_tax_collector_job/SubTransactionStoreTaxRate",
      "estimated_tax_collector_job/SubTransactionSubtotalTax",
      "estimated_tax_collector_job/SubTransactionTax",
      "estimated_tax_collector_job/SubTransactionTaxDetails",
      "estimated_tax_collector_job/SubtotalTax",
      "estimated_tax_collector_job/Tax",
      "estimated_tax_collector_job/TaxDetails",
      "estimated_tax_collector_job/TaxMetadataVar",
    ],
  },
  loyalty_points_collector_job: {
    dependencyJobs: ["discount_collector_job", "subtotal_job"],
    dependencyVars: [
      "discount_collector_job/DiscountBreakdownServiceFeeVar",
      "subtotal_job/Subtotal",
    ],
    dependents: [],
    vars: ["loyalty_points_collector_job/DDLoyaltyPoints"],
  },
  merchant_tip_suggestions_collector_job: {
    dependencyJobs: [
      "delivery_fee_job",
      "service_fee_collector_job",
      "subtotal_job",
      "estimated_tax_collector_job",
    ],
    dependencyVars: [
      "delivery_fee_job/DeliveryFee",
      "service_fee_collector_job/ServiceFee",
      "subtotal_job/Subtotal",
      "estimated_tax_collector_job/Tax",
    ],
    dependents: [],
    vars: ["merchant_tip_suggestions_collector_job/MerchantTipSuggestions"],
  },
  total_before_credits_applied_collector_job: {
    dependencyJobs: [
      "delivery_fee_job",
      "delivery_option_job",
      "generic_fee_job",
      "service_fee_job",
      "subscription_job",
      "subtotal_job",
      "discount_collector_job",
      "eligible_subscription_collector_job",
      "estimated_tax_collector_job",
      "min_order_fee_collector_job",
      "promotion_discount_collector_job",
      "service_fee_collector_job",
      "subscription_collector_job",
    ],
    dependencyVars: [
      "delivery_fee_job/DeliveryFee",
      "delivery_fee_job/ExtraSosDeliveryFee",
      "delivery_option_job/PriorityFee",
      "generic_fee_job/GenericFees",
      "generic_fee_job/LegislativeFeeVar",
      "service_fee_job/ServiceRate",
      "subscription_job/SubscriptionDiscount",
      "subtotal_job/Subtotal",
      "discount_collector_job/DiscountBreakdownPriorityFee",
      "discount_collector_job/DiscountBreakdownServiceFeeVar",
      "discount_collector_job/DiscountBreakdownSmallOrderFee",
      "discount_collector_job/DiscountContext",
      "discount_collector_job/TotalDeliveryFeeDiscount",
      "eligible_subscription_collector_job/EligibleSubscriptionDiscountedDeliveryFee",
      "eligible_subscription_collector_job/EligibleSubscriptionDiscountedServiceFee",
      "estimated_tax_collector_job/StoreTaxRate",
      "estimated_tax_collector_job/SubtotalTax",
      "estimated_tax_collector_job/Tax",
      "estimated_tax_collector_job/TaxMetadataVar",
      "min_order_fee_collector_job/MinOrderFee",
      "promotion_discount_collector_job/LunchpassPromotion",
      "promotion_discount_collector_job/PromotionDeliveryFeeDiscount",
      "service_fee_collector_job/ServiceFee",
      "subscription_collector_job/SubscriptionDiscountedDeliveryFee",
      "subscription_collector_job/SubscriptionDiscountedServiceFee",
      "subscription_collector_job/TrulyFreeDeliveryExperimentServiceFee",
    ],
    dependents: [
      "credit_collector_job",
      "reward_points_collector_job",
      "total_collector_job",
    ],
    vars: [
      "total_before_credits_applied_collector_job/EligibleTotalBeforeCreditsApplied",
      "total_before_credits_applied_collector_job/EligibleTotalBeforeTipApplied",
      "total_before_credits_applied_collector_job/FinalDeliveryFee",
      "total_before_credits_applied_collector_job/FinalMinOrderFee",
      "total_before_credits_applied_collector_job/FinalPriorityFee",
      "total_before_credits_applied_collector_job/FinalServiceFee",
      "total_before_credits_applied_collector_job/TotalBeforeCreditsApplied",
      "total_before_credits_applied_collector_job/TotalBeforeDiscountApplied",
      "total_before_credits_applied_collector_job/TotalNotAppliedCredit",
    ],
  },
  credit_collector_job: {
    dependencyJobs: [
      "credit_job",
      "subtotal_job",
      "total_before_credits_applied_collector_job",
    ],
    dependencyVars: [
      "credit_job/AvailableCredit",
      "subtotal_job/Subtotal",
      "total_before_credits_applied_collector_job/TotalBeforeCreditsApplied",
    ],
    dependents: ["reward_points_collector_job", "total_collector_job"],
    vars: [
      "credit_collector_job/CreditsApplicableBeforeTip",
      "credit_collector_job/ReferralCreditsApplied",
      "credit_collector_job/TotalCreditsApplied",
    ],
  },
  reward_points_collector_job: {
    dependencyJobs: [
      "credit_collector_job",
      "total_before_credits_applied_collector_job",
    ],
    dependencyVars: [
      "credit_collector_job/TotalCreditsApplied",
      "total_before_credits_applied_collector_job/EligibleTotalBeforeCreditsApplied",
    ],
    dependents: ["total_collector_job"],
    vars: ["reward_points_collector_job/AvailableRewardPoints"],
  },
  total_collector_job: {
    dependencyJobs: [
      "reward_points_collector_job",
      "total_before_credits_applied_collector_job",
      "subtotal_job",
      "credit_collector_job",
    ],
    dependencyVars: [
      "reward_points_collector_job/AvailableRewardPoints",
      "total_before_credits_applied_collector_job/EligibleTotalBeforeCreditsApplied",
      "total_before_credits_applied_collector_job/TotalBeforeCreditsApplied",
      "subtotal_job/Subtotal",
      "credit_collector_job/TotalCreditsApplied",
    ],
    dependents: ["dasher_tip_suggestions_collector_job"],
    vars: [
      "total_collector_job/EligibleTotal",
      "total_collector_job/Total",
      "total_collector_job/TotalBeforeTip",
    ],
  },
  dasher_tip_suggestions_collector_job: {
    dependencyJobs: [
      "delivery_fee_job",
      "generic_fee_job",
      "service_fee_collector_job",
      "subscription_job",
      "subtotal_job",
      "estimated_tax_collector_job",
      "total_collector_job",
    ],
    dependencyVars: [
      "delivery_fee_job/DeliveryFee",
      "generic_fee_job/GenericFees",
      "service_fee_collector_job/ServiceFee",
      "subscription_job/SubscriptionDiscount",
      "subtotal_job/Subtotal",
      "estimated_tax_collector_job/Tax",
      "total_collector_job/Total",
    ],
    dependents: [],
    vars: ["dasher_tip_suggestions_collector_job/DasherTipSuggestions"],
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
        // type: "smoothstep",
      })),
    ];
  }, [] as Edge[]);
};

// only job nodes are needed for top-level layout
export const getReactFlowLayoutNodes = (nodesData: NodeData[]): Node[] => {
  return nodesData
    .filter((node) => !node.parentNode)
    .map((node) => {
      const position = { x: 0, y: 0 };
      const size = {
        width: CONTAINER_WIDTH,
        height: getContainerHeight(0),
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
              markerEnd: {
                type: MarkerType.Arrow,
              },
              zIndex: 9,
              // type: "smoothstep",
            } as Edge)
        ),
      ];
    }, [] as Edge[]);
};

export const DESCRIPTION: Record<string, string> = {
  subtotal_job: "generate subtotal for each cart",
  delivery_fee_job: "generate delivery fee for each cart",
  service_fee_job: "generate service rate for each mx",
  min_order_fee_job: "generate configuration for min order fee",
  credit_job: "generate consumer'savailable credits",
  generic_fee_job: "generate fees required by government or by law",
  delivery_option_quote_job:
    "generate quotes based on different delivery option (option not selected)",
  delivery_option_job:
    "collect quotes based on different delivery option and added into preview orderQuote (option selected)",
  recurring_delivery_discount_job:
    "generate discount percentage if it is recurring delivery",
  eligible_subscription_job:
    "generate potential subscription discount and upsell the dashpass plan to consumers",
  subscription_job:
    "generate subscription discount based on current subscription plan",
  min_order_fee_collector_job:
    "collect min order fee based on subtotal and configuration",
  service_fee_collector_job:
    "collect service fee bsed on subtotal and service rate",
  subscription_collector_job: "collect subscription payment method",
  eligible_subscription_collector_job:
    "generates eligible subscription discounted fees and rates",
  promotion_collector_job:
    "collects promotions, validates and generates discount info",
  promotion_discount_collector_job:
    "generates promotion subtotal, discounts by fees, and itemized promotion results",
  train_discount_collector_job:
    "generates delivery train discount amount based on subtotal",
  bundle_fee_discount_collector_job:
    "collects post checkout bundle order specific fee discount amount",
  discount_collector_job: "collects final discount context and breakdowns",
  estimated_tax_collector_job: "collects tax breakdowns per category",
  total_before_credits_applied_collector_job:
    "collects final fee amounts and eligible total with criterias",
  credit_collector_job: "collects applicable and applied credits",
  reward_points_collector_job:
    "calculates available reward points applied amount",
  total_collector_job:
    "collects and calculates total related results with different criterias",
  loyalty_points_collector_job: "collects Loyalty point info",
  AppliedPromotion:
    "Discounts retrieved from Promotion service after filtering and mapping",
  AvailableCredit: "Configuration of available credit for each cx",
  AvailableRewardPoints: "Final reward points that cx applies",
  BundleDiscountDeliveryFeeDiscountAmountVar:
    "Delivery fee discount amount for bundle cart",
  BundleDiscountSmallOrderFeeDiscountAmountVar:
    "Small order fee discount amount for bundle cart",
  CreditsApplicableBeforeTip:
    "How much credit is applied in order cart quote in total",
  DasherTipSuggestions: "Suggestions tip amount for dasher",
  DDLoyaltyPoints: "Doordash loyalty points",
  DeliveryFee: "Original delivery fee",
  DeliveryFeeTax: "Tax for final delivery fee",
  DeliveryOptionQuoteVar: "configuration of each delivery option",
  DeliveryTrainsDiscountAmountVar:
    "final discount amount and info for no rush delivery",
  DeliveryTrainsDiscountConfigVar: "configuration for no rush delivery",
  DiscountBreakdownCreditsBack: "final discount context for creditsBack",
  DiscountBreakdownDeliveryFee: "final discount context for delivery fee",
  DiscountBreakdownExpandedRangeFee:
    "final discount context for expanded range fee",
  DiscountBreakdownItemPrice: "final discount context for Item Price",
  DiscountBreakdownLunchpassVar: "final discount context for lunch pass",
  DiscountBreakdownPriorityFee: "final discount context for priority fee",
  DiscountBreakdownServiceFeeVar: "final discount context for service fee",
  DiscountBreakdownSmallOrderFee: "final discount context for small order fee",
  DiscountBreakdownSubtotal: "final discount context for subtotal",
  DiscountContext: "final discount context for all applicable discount",
  DummyAdjustment: "Dummy Adjust for payment method",
  EligibleSubscriptionDiscount:
    "Discount configuration on subscription with cx, mx, plan criterions",
  EligibleSubscriptionDiscountedDeliveryFee:
    "Delivery fee discount amount introduced by eligible subscription",
  EligibleSubscriptionDiscountedServiceFee:
    "Service fee discount amount introduced by eligible subscription",
  EligibleSubscriptionDiscountedServiceRate:
    "Service rate discount amount introduced by eligible subscription",
  EligibleTotal:
    "Eligible total amount after credits, tips, rewards, refunds, etc.",
  EligibleTotalBeforeCreditsApplied:
    "Eligible total amount before credits applied",
  EligibleTotalBeforeTipApplied: "Eligible total amount before tip applied",
  EstimateTaxResponse:
    "Estimated tax response payload for group order split bill usage",
  ExpandedRangeFee: "Expanded range fee discount breakdowns for meal plans.",
  ExtraSosDeliveryFee: "?",
  FeesTax: "Fees tax from tax response",
  FinalDeliveryFee:
    "FinalDelivery fee is what is charged to the consumer. This fee is inclusive of any extra delivery costs associated along with any applicable delivery discounts.",
  FinalMinOrderFee:
    "FinalMinOrderFee is what is charged to the consumer. Minimum Order Fee (Small Order Fee) is charged when the subtotal of an order is below a certain threshold.",
  FinalPriorityFee:
    "FinalPriorityFee is what is charged to the consumer for express delivery.",
  FinalServiceFee:
    "FinalServiceFee is what is charged to the consumer. This fee includes any service fee related discounts.",
  GenericFees: "fees required by government or by law",
  GenericFeesTaxVar: "tax of generic fee",
  ItemLevelPromotion: "best itemLevel promotion discount",
  LegislativeFeeTaxVar: "tax of legislative fee",
  LegislativeFeeVar: "fees required by government or by law",
  LunchpassPromotion: "best lunch pass promotion discount",
  MarketplaceFacilitator: "Tax Mpf adjustment",
  MerchantTipSuggestions: "Merchant tip suggestion in amount",
  MinOrderAdditionalSubtotal: "Add this amount to avoid min order fee.",
  MinOrderFee:
    "Small order fee. This is a charge to consumer when the subtotal is below a threshold",
  MinOrderFeeSetting:
    "Sub market level min order fee. And this value is adjusted by service fee min.",
  MinOrderSubtotal: "The subtotal threshold for min order fee",
  MinOrderSubtotalSetting: "The subtotal threshold for min order fee",
  NoRushDeliveryOptionDiscountQuoteVar:
    "Discount amount value for no rush delivery option",
  NudgePromotionVar: "Nudge promotion adjustments",
  PostMerchantDiscountedSubtotalVar:
    "Post merchant promotion subtotal and fee information for tax calculation",
  PriorityFee: "Priority fee amount",
  PriorityFeeTaxVar: "Priority fee tax",
  PromotionAdditionalDiscountPercentMaxValue: "Promotion max discount amount",
  PromotionAdditionalFlatValueSaving: "Promotion flat amount discount",
  PromotionAdditionalPercentageSaving: "Promotion percentage discount value",
  PromotionAdditionalSubtotal:
    "Additional subtotal needed to be qualified for promotion",
  PromotionCreditsback: "Best credits back promotion discount",
  PromotionDeliveryFeeDiscount: "Best delivery fee promotion discount",
  PromotionMinSubtotal: "Promotion minimum subtotal requirements",
  PromotionNudgeTotalDiscountAmount:
    "Promotion total save discount amount for nearby free delivery + discounted service fee with minimum subtotal",
  PromotionPriorityFeeDiscount: "Priority fee promotion discount adjustment",
  PromotionServiceFeeDiscount: "best service fee promotion discount",
  PromotionSmallOrderFeeDiscount: "best small order fee promotion discount",
  PromotionStackableDeliveryFeeDiscount:
    "total of all stackable delivery fee discount",
  PromotionValueDiscount: "best subtotal level promotion discount",
  RecurringDeliveryDiscountVar: "Recurring delivery discounts for subtotal",
  ReferralCreditsApplied: "Credits for Referral",
  ScheduleDeliveryOptionDiscountQuoteVar: "Scheduled delivery discounts",
  ServiceFee:
    "Service fee. This var includes the adjustment by service fee min",
  ServiceFeeTax: "Service fee tax",
  ServiceRate: "Service rate percentage",
  SmallOrderFeeTax: "Tax for small order fee.",
  StackableItemLevelPromotion:
    "Promotion discount for stackable item level discounts",
  StoreTaxRate: "Store level tax rate",
  SubscriptionAdditionalSubtotal:
    "This is used for upsells. Add $X to get Dashpass discounts.",
  SubscriptionBenefitsApplied:
    "It indicates whether DashPass discounts is applied.",
  SubscriptionDetail:
    "This includes the details about s subscription plan, such as subscription id.",
  SubscriptionDiscount:
    "This includes subscription's discount details, such as dp users' delivery fee and service fee",
  SubscriptionDiscountedDeliveryFee:
    "This is the delivery fee for dashpass users.",
  SubscriptionDiscountedServiceFee:
    "This is the service fee for dashpass users.",
  SubscriptionDiscountedServiceRate:
    "This is the service rate for dashpass users.",
  SubscriptionDiscountFlatRate: "This is the flat rate for lunch pass users.",
  Subtotal: "This the original cart subtotal.",
  SubtotalTax: "Tax for cart subtotal",
  SubTransactionDeliveryFeeTax:
    "Delivery fee's tax in sub transaction. Subtransaction is used when the order includes alcohol.",
  SubTransactionFeesTax:
    "Fees' tax in subtransaction. Subtransaction is used when the order includes alcohol.",
  SubTransactionIds:
    "The transaction ids for subtransactions. Subtransaction is used when the order includes alcohol.",
  SubTransactionLegislativeFeeTax:
    "Legislative fee's tax in sub transaction. Subtransaction is used when the order includes alcohol.",
  SubTransactionPriorityFeeTax:
    "Priority fee's tax in sub transaction. Subtransaction is used when the order includes alcohol.",
  SubTransactionServiceFeeTax:
    "Service fee's tax in sub transaction.Subtransaction is used when the order includes alcohol.",
  SubTransactionSmallOrderFeeTax:
    "Small order fee's tax in sub transaction. Subtransaction is used when the order includes alcohol.",
  SubTransactionStoreTaxRate:
    "Store's tax rate in sub transaction. Subtransaction is used when the order includes alcohol.",
  SubTransactionSubtotalTax:
    "Subtotal's tax in sub transaction. Subtransaction is used when the order includes alcohol.",
  SubTransactionTax:
    "The total tax for sub transactions. Subtransaction is used when the order includes alcohol.",
  SubTransactionTaxDetails:
    "All tax related information for sub transaction. Subtransaction is used when the order includes alcohol.",
  Tax: "This is the default subtotal tax.",
  TaxDetails: "Tax breakdown's snapshot",
  TaxMetadataVar: "Tax information about item breakdown and payment breakdown.",
  Total: "This is the total charge for an order.",
  TotalBeforeCreditsApplied:
    "This is the total charge for an order, before pricing services can apply any eligible credit balance on the consumers order.",
  TotalBeforeDiscountApplied:
    "This is the original total charge for an order before any discounts applied.",
  TotalBeforeTip: "This is total charge without tips for customers.",
  TotalCreditsApplied:
    "This is the total credits available to apply for consumers.",
  TotalDeliveryFeeDiscount:
    "This is the total amount for delivery fee discounts.",
  TotalNotAppliedCredit: "This is the subtotal we cannot use credits to apply",
  TrulyFreeDeliveryExperimentEligibleServiceFeeRate:
    "This is the service rate used tor DP upsells. It tells consumer what the service rate when the consumer is eligbie for truly free delivery",
  TrulyFreeDeliveryExperimentServiceFee:
    "This is the service fee when consumer is eligible for truly free delivery.",
  TrulyFreeDeliveryExperimentServiceFeeRate:
    "This is the service rate when the consumer is eligible for truly free delivery.",
};

function getAllNodeIdSelectOptions() {
  return nodes.map((node) => ({
    value: node.id,
    label: node.data.label,
  }));
}

function getJobNodeIdSelectOptions() {
  return nodes
    .filter((node) => !node.parentNode)
    .map((node) => ({
      value: node.id,
      label: node.data.label,
    }));
}

export const nodeSelectOptions = getAllNodeIdSelectOptions();
export const jobNodeSelectOptions = getJobNodeIdSelectOptions();
