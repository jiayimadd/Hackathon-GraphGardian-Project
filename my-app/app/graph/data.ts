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
      description: "generate consumer'savailable credits",
    },
  },
  {
    id: "credit_job/AvailableCredit",
    parentNode: "credit_job",
    data: {
      label: "AvailableCredit",
      description: "Configuration of available credit for each cx",
    },
  },
  {
    id: "delivery_fee_job",
    data: {
      label: "delivery_fee_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/DeliveryFeeJobCreator.kt",
      description: "generate delivery fee for each cart",
    },
  },
  {
    id: "delivery_fee_job/DeliveryFee",
    parentNode: "delivery_fee_job",
    data: {
      label: "DeliveryFee",
      description: "Original delivery fee",
    },
  },
  {
    id: "delivery_fee_job/ExtraSosDeliveryFee",
    parentNode: "delivery_fee_job",
    data: {
      label: "ExtraSosDeliveryFee",
      description: "Original delivery fee",
    },
  },
  {
    id: "delivery_option_job",
    data: {
      label: "delivery_option_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/DeliveryOptionJobCreator.kt",
      description:
        "collect quotes based on different delivery option and added into preview orderQuote (option selected)",
    },
  },
  {
    id: "delivery_option_job/PriorityFee",
    parentNode: "delivery_option_job",
    data: {
      label: "PriorityFee",
      description: "Priority fee amount",
    },
  },
  {
    id: "delivery_option_job/DeliveryTrainsDiscountConfigVar",
    parentNode: "delivery_option_job",
    data: {
      label: "DeliveryTrainsDiscountConfigVar",
      description: "configuration for no rush delivery",
    },
  },
  {
    id: "delivery_option_quote_job",
    data: {
      label: "delivery_option_quote_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/DeliveryOptionQuoteJobCreator.kt",
      description:
        "generate quotes based on different delivery option (option not selected)",
    },
  },
  {
    id: "delivery_option_quote_job/DeliveryOptionQuoteVar",
    parentNode: "delivery_option_quote_job",
    data: {
      label: "DeliveryOptionQuoteVar",
      description: "configuration of each delivery option",
    },
  },
  {
    id: "eligible_subscription_job",
    data: {
      label: "eligible_subscription_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/EligibleSubscriptionJobCreator.kt",
      description:
        "generate potential subscription discount and upsell the dashpass plan to consumers",
    },
  },
  {
    id: "eligible_subscription_job/EligibleSubscriptionDiscount",
    parentNode: "eligible_subscription_job",
    data: {
      label: "EligibleSubscriptionDiscount",
      description:
        "Discount configuration on subscription with cx, mx, plan criterions",
    },
  },
  {
    id: "eligible_subscription_job/TrulyFreeDeliveryExperimentEligibleServiceFeeRate",
    parentNode: "eligible_subscription_job",
    data: {
      label: "TrulyFreeDeliveryExperimentEligibleServiceFeeRate",
      description:
        "This is the service rate used tor DP upsells. It tells consumer what the service rate when the consumer is eligbie for truly free delivery",
    },
  },
  {
    id: "generic_fee_job",
    data: {
      label: "generic_fee_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/GenericFeeJobCreator.kt",
      description: "generate fees required by government or by law",
    },
  },
  {
    id: "generic_fee_job/GenericFees",
    parentNode: "generic_fee_job",
    data: {
      label: "GenericFees",
      description: "fees required by government or by law",
    },
  },
  {
    id: "generic_fee_job/LegislativeFeeVar",
    parentNode: "generic_fee_job",
    data: {
      label: "LegislativeFeeVar",
      description: "fees required by government or by law",
    },
  },
  {
    id: "min_order_fee_job",
    data: {
      label: "min_order_fee_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/MinOrderFeeJobCreator.kt",
      description: "generate configuration for min order fee",
    },
  },
  {
    id: "min_order_fee_job/MinOrderSubtotalSetting",
    parentNode: "min_order_fee_job",
    data: {
      label: "MinOrderSubtotalSetting",
      description: "The subtotal threshold for min order fee",
    },
  },
  {
    id: "min_order_fee_job/MinOrderFeeSetting",
    parentNode: "min_order_fee_job",
    data: {
      label: "MinOrderFeeSetting",
      description:
        "Sub market level min order fee. And this value is adjusted by service fee min.",
    },
  },
  {
    id: "recurring_delivery_discount_job",
    data: {
      label: "recurring_delivery_discount_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/RecurringDeliveryDiscountJobCreator.kt",
      description: "generate discount percentage if it is recurring delivery",
    },
  },
  {
    id: "recurring_delivery_discount_job/RecurringDeliveryDiscountVar",
    parentNode: "recurring_delivery_discount_job",
    data: {
      label: "RecurringDeliveryDiscountVar",
      description: "Recurring delivery discounts for subtotal",
    },
  },
  {
    id: "service_fee_job",
    data: {
      label: "service_fee_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/ServiceFeeJobCreator.kt",
      description: "generate service rate for each mx",
    },
  },
  {
    id: "service_fee_job/ServiceRate",
    parentNode: "service_fee_job",
    data: {
      label: "ServiceRate",
      description: "Service rate percentage",
    },
  },
  {
    id: "subscription_job",
    data: {
      label: "subscription_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/SubscriptionJobCreator.kt",
      description:
        "generate subscription discount based on current subscription plan",
    },
  },
  {
    id: "subscription_job/SubscriptionDiscount",
    parentNode: "subscription_job",
    data: {
      label: "SubscriptionDiscount",
      description:
        "This includes subscription's discount details, such as dp users' delivery fee and service fee",
    },
  },
  {
    id: "subscription_job/SubscriptionDetail",
    parentNode: "subscription_job",
    data: {
      label: "SubscriptionDetail",
      description:
        "This includes the details about s subscription plan, such as subscription id.",
    },
  },
  {
    id: "subscription_job/TrulyFreeDeliveryExperimentServiceFeeRate",
    parentNode: "subscription_job",
    data: {
      label: "TrulyFreeDeliveryExperimentServiceFeeRate",
      description:
        "This is the service rate when the consumer is eligible for truly free delivery.",
    },
  },
  {
    id: "subtotal_job",
    data: {
      label: "subtotal_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/SubtotalJobCreator.kt",
      description: "generate subtotal for each cart",
    },
  },
  {
    id: "subtotal_job/Subtotal",
    parentNode: "subtotal_job",
    data: {
      label: "Subtotal",
      description: "This the original cart subtotal.",
    },
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
    parentNode: "delivery_option_quote_collector_job",
    data: {
      label: "NoRushDeliveryOptionDiscountQuoteVar",
      description: "Discount amount value for no rush delivery option",
    },
  },
  {
    id: "delivery_option_quote_collector_job/ScheduleDeliveryOptionDiscountQuoteVar",
    parentNode: "delivery_option_quote_collector_job",
    data: {
      label: "ScheduleDeliveryOptionDiscountQuoteVar",
      description: "Scheduled delivery discounts",
    },
  },
  {
    id: "min_order_fee_collector_job",
    data: {
      label: "min_order_fee_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/MinOrderFeeCollectorJobCreator.kt",
      description: "collect min order fee based on subtotal and configuration",
    },
  },
  {
    id: "min_order_fee_collector_job/MinOrderFee",
    parentNode: "min_order_fee_collector_job",
    data: {
      label: "MinOrderFee",
      description:
        "Small order fee. This is a charge to consumer when the subtotal is below a threshold",
    },
  },
  {
    id: "min_order_fee_collector_job/MinOrderSubtotal",
    parentNode: "min_order_fee_collector_job",
    data: {
      label: "MinOrderSubtotal",
      description: "The subtotal threshold for min order fee",
    },
  },
  {
    id: "min_order_fee_collector_job/MinOrderAdditionalSubtotal",
    parentNode: "min_order_fee_collector_job",
    data: {
      label: "MinOrderAdditionalSubtotal",
      description: "Add this amount to avoid min order fee.",
    },
  },
  {
    id: "service_fee_collector_job",
    data: {
      label: "service_fee_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/ServiceFeeCollectorJobCreator.kt",
      description: "collect service fee bsed on subtotal and service rate",
    },
  },
  {
    id: "service_fee_collector_job/ServiceFee",
    parentNode: "service_fee_collector_job",
    data: {
      label: "ServiceFee",
      description:
        "Service fee. This var includes the adjustment by service fee min",
    },
  },
  {
    id: "train_discount_collector_job",
    data: {
      label: "train_discount_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/TrainDiscountCollectorJobCreator.kt",
      description: "generates delivery train discount amount based on subtotal",
    },
  },
  {
    id: "train_discount_collector_job/DeliveryTrainsDiscountAmountVar",
    parentNode: "train_discount_collector_job",
    data: {
      label: "DeliveryTrainsDiscountAmountVar",
      description: "final discount amount and info for no rush delivery",
    },
  },
  {
    id: "bundle_fee_discount_collector_job",
    data: {
      label: "bundle_fee_discount_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/BundleFeeDiscountCollectorJobCreator.kt",
      description:
        "collects post checkout bundle order specific fee discount amount",
    },
  },
  {
    id: "bundle_fee_discount_collector_job/BundleDiscountDeliveryFeeDiscountAmountVar",
    parentNode: "bundle_fee_discount_collector_job",
    data: {
      label: "BundleDiscountDeliveryFeeDiscountAmountVar",
      description: "Delivery fee discount amount for bundle cart",
    },
  },
  {
    id: "bundle_fee_discount_collector_job/BundleDiscountSmallOrderFeeDiscountAmountVar",
    parentNode: "bundle_fee_discount_collector_job",
    data: {
      label: "BundleDiscountSmallOrderFeeDiscountAmountVar",
      description: "Small order fee discount amount for bundle cart",
    },
  },
  {
    id: "eligible_subscription_collector_job",
    data: {
      label: "eligible_subscription_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/EligibleSubscriptionCollectorJobCreator.kt",
      description: "generates eligible subscription discounted fees and rates",
    },
  },
  {
    id: "eligible_subscription_collector_job/EligibleSubscriptionDiscountedServiceRate",
    parentNode: "eligible_subscription_collector_job",
    data: {
      label: "EligibleSubscriptionDiscountedServiceRate",
      description:
        "Service rate discount amount introduced by eligible subscription",
    },
  },
  {
    id: "eligible_subscription_collector_job/EligibleSubscriptionDiscountedServiceFee",
    parentNode: "eligible_subscription_collector_job",
    data: {
      label: "EligibleSubscriptionDiscountedServiceFee",
      description:
        "Service fee discount amount introduced by eligible subscription",
    },
  },
  {
    id: "eligible_subscription_collector_job/EligibleSubscriptionDiscountedDeliveryFee",
    parentNode: "eligible_subscription_collector_job",
    data: {
      label: "EligibleSubscriptionDiscountedDeliveryFee",
      description: "Original delivery fee",
    },
  },
  {
    id: "subscription_collector_job",
    data: {
      label: "subscription_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/SubscriptionCollectorJobCreator.kt",
      description: "collect subscription payment method",
    },
  },
  {
    id: "subscription_collector_job/SubscriptionAdditionalSubtotal",
    parentNode: "subscription_collector_job",
    data: {
      label: "SubscriptionAdditionalSubtotal",
      description:
        "This is used for upsells. Add $X to get Dashpass discounts.",
    },
  },
  {
    id: "subscription_collector_job/SubscriptionBenefitsApplied",
    parentNode: "subscription_collector_job",
    data: {
      label: "SubscriptionBenefitsApplied",
      description: "It indicates whether DashPass discounts is applied.",
    },
  },
  {
    id: "subscription_collector_job/SubscriptionDiscountedDeliveryFee",
    parentNode: "subscription_collector_job",
    data: {
      label: "SubscriptionDiscountedDeliveryFee",
      description: "Original delivery fee",
    },
  },
  {
    id: "subscription_collector_job/SubscriptionDiscountedServiceFee",
    parentNode: "subscription_collector_job",
    data: {
      label: "SubscriptionDiscountedServiceFee",
      description:
        "Service fee. This var includes the adjustment by service fee min",
    },
  },
  {
    id: "subscription_collector_job/SubscriptionDiscountedServiceRate",
    parentNode: "subscription_collector_job",
    data: {
      label: "SubscriptionDiscountedServiceRate",
      description: "Service rate percentage",
    },
  },
  {
    id: "subscription_collector_job/SubscriptionDiscountFlatRate",
    parentNode: "subscription_collector_job",
    data: {
      label: "SubscriptionDiscountFlatRate",
      description: "This is the flat rate for lunch pass users.",
    },
  },
  {
    id: "subscription_collector_job/TrulyFreeDeliveryExperimentServiceFee",
    parentNode: "subscription_collector_job",
    data: {
      label: "TrulyFreeDeliveryExperimentServiceFee",
      description:
        "Service fee. This var includes the adjustment by service fee min",
    },
  },
  {
    id: "subscription_collector_job/DummyAdjustment",
    parentNode: "subscription_collector_job",
    data: {
      label: "DummyAdjustment",
      description: "Dummy Adjust for payment method",
    },
  },
  {
    id: "promotion_collector_job",
    data: {
      label: "promotion_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/PromotionCollectorJobCreator.kt",
      description: "collects promotions, validates and generates discount info",
    },
  },
  {
    id: "promotion_collector_job/AppliedPromotion",
    parentNode: "promotion_collector_job",
    data: {
      label: "AppliedPromotion",
      description:
        "Discounts retrieved from Promotion service after filtering and mapping",
    },
  },
  {
    id: "promotion_discount_collector_job",
    data: {
      label: "promotion_discount_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/PromotionDiscountCollectorJobCreator.kt",
      description:
        "generates promotion subtotal, discounts by fees, and itemized promotion results",
    },
  },
  {
    id: "promotion_discount_collector_job/ExpandedRangeFee",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "ExpandedRangeFee",
      description: "Expanded range fee discount breakdowns for meal plans.",
    },
  },
  {
    id: "promotion_discount_collector_job/ItemLevelPromotion",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "ItemLevelPromotion",
      description: "best itemLevel promotion discount",
    },
  },
  {
    id: "promotion_discount_collector_job/LunchpassPromotion",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "LunchpassPromotion",
      description: "best lunch pass promotion discount",
    },
  },
  {
    id: "promotion_discount_collector_job/PostMerchantDiscountedSubtotalVar",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PostMerchantDiscountedSubtotalVar",
      description:
        "Post merchant promotion subtotal and fee information for tax calculation",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionAdditionalDiscountPercentMaxValue",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionAdditionalDiscountPercentMaxValue",
      description: "Promotion max discount amount",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionAdditionalFlatValueSaving",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionAdditionalFlatValueSaving",
      description: "Promotion flat amount discount",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionAdditionalPercentageSaving",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionAdditionalPercentageSaving",
      description: "Promotion percentage discount value",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionAdditionalSubtotal",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionAdditionalSubtotal",
      description: "Additional subtotal needed to be qualified for promotion",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionCreditsback",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionCreditsback",
      description: "Best credits back promotion discount",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionDeliveryFeeDiscount",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionDeliveryFeeDiscount",
      description: "Best delivery fee promotion discount",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionMinSubtotal",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionMinSubtotal",
      description: "Promotion minimum subtotal requirements",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionServiceFeeDiscount",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionServiceFeeDiscount",
      description: "best service fee promotion discount",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionSmallOrderFeeDiscount",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionSmallOrderFeeDiscount",
      description: "best small order fee promotion discount",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionValueDiscount",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionValueDiscount",
      description: "best subtotal level promotion discount",
    },
  },
  {
    id: "promotion_discount_collector_job/StackableItemLevelPromotion",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "StackableItemLevelPromotion",
      description: "best itemLevel promotion discount",
    },
  },
  {
    id: "promotion_discount_collector_job/NudgePromotionVar",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "NudgePromotionVar",
      description: "Nudge promotion adjustments",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionStackableDeliveryFeeDiscount",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionStackableDeliveryFeeDiscount",
      description: "total of all stackable delivery fee discount",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionPriorityFeeDiscount",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionPriorityFeeDiscount",
      description: "Priority fee promotion discount adjustment",
    },
  },
  {
    id: "promotion_discount_collector_job/PromotionNudgeTotalDiscountAmount",
    parentNode: "promotion_discount_collector_job",
    data: {
      label: "PromotionNudgeTotalDiscountAmount",
      description:
        "Promotion total save discount amount for nearby free delivery + discounted service fee with minimum subtotal",
    },
  },
  {
    id: "discount_collector_job",
    data: {
      label: "discount_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/DiscountCollectorJobCreator.kt",
      description: "collects final discount context and breakdowns",
    },
  },
  {
    id: "discount_collector_job/DiscountBreakdownCreditsBack",
    parentNode: "discount_collector_job",
    data: {
      label: "DiscountBreakdownCreditsBack",
      description: "final discount context for creditsBack",
    },
  },
  {
    id: "discount_collector_job/DiscountBreakdownDeliveryFee",
    parentNode: "discount_collector_job",
    data: {
      label: "DiscountBreakdownDeliveryFee",
      description: "Original delivery fee",
    },
  },
  {
    id: "discount_collector_job/DiscountBreakdownExpandedRangeFee",
    parentNode: "discount_collector_job",
    data: {
      label: "DiscountBreakdownExpandedRangeFee",
      description: "final discount context for expanded range fee",
    },
  },
  {
    id: "discount_collector_job/DiscountBreakdownItemPrice",
    parentNode: "discount_collector_job",
    data: {
      label: "DiscountBreakdownItemPrice",
      description: "final discount context for Item Price",
    },
  },
  {
    id: "discount_collector_job/DiscountBreakdownLunchpassVar",
    parentNode: "discount_collector_job",
    data: {
      label: "DiscountBreakdownLunchpassVar",
      description: "final discount context for lunch pass",
    },
  },
  {
    id: "discount_collector_job/DiscountBreakdownServiceFeeVar",
    parentNode: "discount_collector_job",
    data: {
      label: "DiscountBreakdownServiceFeeVar",
      description: "final discount context for service fee",
    },
  },
  {
    id: "discount_collector_job/DiscountBreakdownSmallOrderFee",
    parentNode: "discount_collector_job",
    data: {
      label: "DiscountBreakdownSmallOrderFee",
      description: "final discount context for small order fee",
    },
  },
  {
    id: "discount_collector_job/DiscountBreakdownSubtotal",
    parentNode: "discount_collector_job",
    data: {
      label: "DiscountBreakdownSubtotal",
      description: "final discount context for subtotal",
    },
  },
  {
    id: "discount_collector_job/DiscountContext",
    parentNode: "discount_collector_job",
    data: {
      label: "DiscountContext",
      description: "final discount context for all applicable discount",
    },
  },
  {
    id: "discount_collector_job/TotalDeliveryFeeDiscount",
    parentNode: "discount_collector_job",
    data: {
      label: "TotalDeliveryFeeDiscount",
      description: "This is the total amount for delivery fee discounts.",
    },
  },
  {
    id: "discount_collector_job/DiscountBreakdownPriorityFee",
    parentNode: "discount_collector_job",
    data: {
      label: "DiscountBreakdownPriorityFee",
      description: "final discount context for priority fee",
    },
  },
  {
    id: "estimated_tax_collector_job",
    data: {
      label: "estimated_tax_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/EstimatedTaxCollectorJobCreator.kt",
      description: "collects tax breakdowns per category",
    },
  },
  {
    id: "estimated_tax_collector_job/DeliveryFeeTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "DeliveryFeeTax",
      description: "Tax for final delivery fee",
    },
  },
  {
    id: "estimated_tax_collector_job/EstimateTaxResponse",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "EstimateTaxResponse",
      description:
        "Estimated tax response payload for group order split bill usage",
    },
  },
  {
    id: "estimated_tax_collector_job/FeesTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "FeesTax",
      description: "Fees tax from tax response",
    },
  },
  {
    id: "estimated_tax_collector_job/GenericFeesTaxVar",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "GenericFeesTaxVar",
      description: "tax of generic fee",
    },
  },
  {
    id: "estimated_tax_collector_job/LegislativeFeeTaxVar",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "LegislativeFeeTaxVar",
      description: "tax of legislative fee",
    },
  },
  {
    id: "estimated_tax_collector_job/MarketplaceFacilitator",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "MarketplaceFacilitator",
      description: "Tax Mpf adjustment",
    },
  },
  {
    id: "estimated_tax_collector_job/PriorityFeeTaxVar",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "PriorityFeeTaxVar",
      description: "Priority fee tax",
    },
  },
  {
    id: "estimated_tax_collector_job/ServiceFeeTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "ServiceFeeTax",
      description: "Service fee tax",
    },
  },
  {
    id: "estimated_tax_collector_job/SmallOrderFeeTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SmallOrderFeeTax",
      description: "Tax for small order fee.",
    },
  },
  {
    id: "estimated_tax_collector_job/StoreTaxRate",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "StoreTaxRate",
      description: "Store level tax rate",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionDeliveryFeeTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionDeliveryFeeTax",
      description: "Tax for final delivery fee",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionFeesTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionFeesTax",
      description: "Fees tax from tax response",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionIds",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionIds",
      description:
        "The transaction ids for subtransactions. Subtransaction is used when the order includes alcohol.",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionLegislativeFeeTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionLegislativeFeeTax",
      description:
        "Legislative fee's tax in sub transaction. Subtransaction is used when the order includes alcohol.",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionPriorityFeeTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionPriorityFeeTax",
      description:
        "Priority fee's tax in sub transaction. Subtransaction is used when the order includes alcohol.",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionServiceFeeTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionServiceFeeTax",
      description: "Service fee tax",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionSmallOrderFeeTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionSmallOrderFeeTax",
      description: "Tax for small order fee.",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionStoreTaxRate",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionStoreTaxRate",
      description: "Store level tax rate",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionSubtotalTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionSubtotalTax",
      description: "Tax for cart subtotal",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionTax",
      description:
        "The total tax for sub transactions. Subtransaction is used when the order includes alcohol.",
    },
  },
  {
    id: "estimated_tax_collector_job/SubTransactionTaxDetails",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubTransactionTaxDetails",
      description:
        "All tax related information for sub transaction. Subtransaction is used when the order includes alcohol.",
    },
  },
  {
    id: "estimated_tax_collector_job/SubtotalTax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "SubtotalTax",
      description: "Tax for cart subtotal",
    },
  },
  {
    id: "estimated_tax_collector_job/Tax",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "Tax",
      description: "This is the default subtotal tax.",
    },
  },
  {
    id: "estimated_tax_collector_job/TaxDetails",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "TaxDetails",
      description: "Tax breakdown's snapshot",
    },
  },
  {
    id: "estimated_tax_collector_job/TaxMetadataVar",
    parentNode: "estimated_tax_collector_job",
    data: {
      label: "TaxMetadataVar",
      description:
        "Tax information about item breakdown and payment breakdown.",
    },
  },
  {
    id: "loyalty_points_collector_job",
    data: {
      label: "loyalty_points_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/LoyaltyPointsCollectorJobCreator.kt",
      description: "collects Loyalty point info",
    },
  },
  {
    id: "loyalty_points_collector_job/DDLoyaltyPoints",
    parentNode: "loyalty_points_collector_job",
    data: {
      label: "DDLoyaltyPoints",
      description: "Doordash loyalty points",
    },
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
    parentNode: "merchant_tip_suggestions_collector_job",
    data: {
      label: "MerchantTipSuggestions",
      description: "Merchant tip suggestion in amount",
    },
  },
  {
    id: "total_before_credits_applied_collector_job",
    data: {
      label: "total_before_credits_applied_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/TotalBeforeCreditsAppliedCollectorJobCreator.kt",
      description:
        "collects final fee amounts and eligible total with criterias",
    },
  },
  {
    id: "total_before_credits_applied_collector_job/EligibleTotalBeforeCreditsApplied",
    parentNode: "total_before_credits_applied_collector_job",
    data: {
      label: "EligibleTotalBeforeCreditsApplied",
      description: "Eligible total amount before credits applied",
    },
  },
  {
    id: "total_before_credits_applied_collector_job/EligibleTotalBeforeTipApplied",
    parentNode: "total_before_credits_applied_collector_job",
    data: {
      label: "EligibleTotalBeforeTipApplied",
      description: "Eligible total amount before tip applied",
    },
  },
  {
    id: "total_before_credits_applied_collector_job/FinalDeliveryFee",
    parentNode: "total_before_credits_applied_collector_job",
    data: {
      label: "FinalDeliveryFee",
      description: "Original delivery fee",
    },
  },
  {
    id: "total_before_credits_applied_collector_job/FinalMinOrderFee",
    parentNode: "total_before_credits_applied_collector_job",
    data: {
      label: "FinalMinOrderFee",
      description:
        "FinalMinOrderFee is what is charged to the consumer. Minimum Order Fee (Small Order Fee) is charged when the subtotal of an order is below a certain threshold.",
    },
  },
  {
    id: "total_before_credits_applied_collector_job/FinalPriorityFee",
    parentNode: "total_before_credits_applied_collector_job",
    data: {
      label: "FinalPriorityFee",
      description:
        "FinalPriorityFee is what is charged to the consumer for express delivery.",
    },
  },
  {
    id: "total_before_credits_applied_collector_job/FinalServiceFee",
    parentNode: "total_before_credits_applied_collector_job",
    data: {
      label: "FinalServiceFee",
      description:
        "FinalServiceFee is what is charged to the consumer. This fee includes any service fee related discounts.",
    },
  },
  {
    id: "total_before_credits_applied_collector_job/TotalBeforeCreditsApplied",
    parentNode: "total_before_credits_applied_collector_job",
    data: {
      label: "TotalBeforeCreditsApplied",
      description:
        "This is the total charge for an order, before pricing services can apply any eligible credit balance on the consumers order.",
    },
  },
  {
    id: "total_before_credits_applied_collector_job/TotalBeforeDiscountApplied",
    parentNode: "total_before_credits_applied_collector_job",
    data: {
      label: "TotalBeforeDiscountApplied",
      description:
        "This is the original total charge for an order before any discounts applied.",
    },
  },
  {
    id: "total_before_credits_applied_collector_job/TotalNotAppliedCredit",
    parentNode: "total_before_credits_applied_collector_job",
    data: {
      label: "TotalNotAppliedCredit",
      description: "This is the subtotal we cannot use credits to apply",
    },
  },
  {
    id: "credit_collector_job",
    data: {
      label: "credit_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/CreditCollectorJobCreator.kt",
      description: "collects applicable and applied credits",
    },
  },
  {
    id: "credit_collector_job/CreditsApplicableBeforeTip",
    parentNode: "credit_collector_job",
    data: {
      label: "CreditsApplicableBeforeTip",
      description: "How much credit is applied in order cart quote in total",
    },
  },
  {
    id: "credit_collector_job/ReferralCreditsApplied",
    parentNode: "credit_collector_job",
    data: {
      label: "ReferralCreditsApplied",
      description: "Credits for Referral",
    },
  },
  {
    id: "credit_collector_job/TotalCreditsApplied",
    parentNode: "credit_collector_job",
    data: {
      label: "TotalCreditsApplied",
      description:
        "This is the total credits available to apply for consumers.",
    },
  },
  {
    id: "reward_points_collector_job",
    data: {
      label: "reward_points_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/RewardPointsCollectorJobCreator.kt",
      description: "calculates available reward points applied amount",
    },
  },
  {
    id: "reward_points_collector_job/AvailableRewardPoints",
    parentNode: "reward_points_collector_job",
    data: {
      label: "AvailableRewardPoints",
      description: "Final reward points that cx applies",
    },
  },
  {
    id: "total_collector_job",
    data: {
      label: "total_collector_job",
      codeLink:
        "https://github.com/doordash/consumer-pricing/blob/master/src/main/kotlin/com/doordash/consumerpricing/pricingworkflow/component/common/TotalCollectorJobCreator.kt",
      description:
        "collects and calculates total related results with different criterias",
    },
  },
  {
    id: "total_collector_job/EligibleTotal",
    parentNode: "total_collector_job",
    data: {
      label: "EligibleTotal",
      description:
        "Eligible total amount after credits, tips, rewards, refunds, etc.",
    },
  },
  {
    id: "total_collector_job/Total",
    parentNode: "total_collector_job",
    data: {
      label: "Total",
      description: "This is the total charge for an order.",
    },
  },
  {
    id: "total_collector_job/TotalBeforeTip",
    parentNode: "total_collector_job",
    data: {
      label: "TotalBeforeTip",
      description: "This is total charge without tips for customers.",
    },
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
    parentNode: "dasher_tip_suggestions_collector_job",
    data: {
      label: "DasherTipSuggestions",
      description: "Suggestions tip amount for dasher",
    },
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
      "delivery_option_job/DeliveryTrainsDiscountConfigVar",
      "delivery_option_job/PriorityFee",
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
      "min_order_fee_collector_job/MinOrderAdditionalSubtotal",
      "min_order_fee_collector_job/MinOrderSubtotal",
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
      "eligible_subscription_collector_job/EligibleSubscriptionDiscountedDeliveryFee",
      "eligible_subscription_collector_job/EligibleSubscriptionDiscountedServiceFee",
      "eligible_subscription_collector_job/EligibleSubscriptionDiscountedServiceRate",
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
      "subscription_collector_job/DummyAdjustment",
      "subscription_collector_job/SubscriptionAdditionalSubtotal",
      "subscription_collector_job/SubscriptionBenefitsApplied",
      "subscription_collector_job/SubscriptionDiscountFlatRate",
      "subscription_collector_job/SubscriptionDiscountedDeliveryFee",
      "subscription_collector_job/SubscriptionDiscountedServiceFee",
      "subscription_collector_job/SubscriptionDiscountedServiceRate",
      "subscription_collector_job/TrulyFreeDeliveryExperimentServiceFee",
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
      "promotion_discount_collector_job/PostMerchantDiscountedSubtotalVar",
      "promotion_discount_collector_job/PromotionAdditionalPercentageSaving",
      "promotion_discount_collector_job/PromotionAdditionalFlatValueSaving",
      "promotion_discount_collector_job/PromotionAdditionalDiscountPercentMaxValue",
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
      "discount_collector_job/DiscountBreakdownLunchpassVar",
      "discount_collector_job/DiscountBreakdownDeliveryFee",
      "discount_collector_job/DiscountBreakdownExpandedRangeFee",
      "discount_collector_job/DiscountBreakdownServiceFeeVar",
      "discount_collector_job/DiscountBreakdownSmallOrderFee",
      "discount_collector_job/DiscountBreakdownSubtotal",
      "discount_collector_job/TotalDeliveryFeeDiscount",
      "discount_collector_job/DiscountBreakdownPriorityFee",
      "discount_collector_job/DiscountContext",
      "discount_collector_job/DiscountBreakdownItemPrice",
      "discount_collector_job/DiscountBreakdownCreditsBack",
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
      "estimated_tax_collector_job/EstimateTaxResponse",
      "estimated_tax_collector_job/FeesTax",
      "estimated_tax_collector_job/GenericFeesTaxVar",
      "estimated_tax_collector_job/LegislativeFeeTaxVar",
      "estimated_tax_collector_job/MarketplaceFacilitator",
      "estimated_tax_collector_job/PriorityFeeTaxVar",
      "estimated_tax_collector_job/ServiceFeeTax",
      "estimated_tax_collector_job/SmallOrderFeeTax",
      "estimated_tax_collector_job/SubTransactionDeliveryFeeTax",
      "estimated_tax_collector_job/SubTransactionFeesTax",
      "estimated_tax_collector_job/SubTransactionIds",
      "estimated_tax_collector_job/SubTransactionLegislativeFeeTax",
      "estimated_tax_collector_job/SubTransactionPriorityFeeTax",
      "estimated_tax_collector_job/SubTransactionServiceFeeTax",
      "estimated_tax_collector_job/SubTransactionSmallOrderFeeTax",
      "estimated_tax_collector_job/SubTransactionStoreTaxRate",
      "estimated_tax_collector_job/SubTransactionSubtotalTax",
      "estimated_tax_collector_job/DeliveryFeeTax",
      "estimated_tax_collector_job/SubTransactionTax",
      "estimated_tax_collector_job/SubTransactionTaxDetails",
      "estimated_tax_collector_job/Tax",
      "estimated_tax_collector_job/StoreTaxRate",
      "estimated_tax_collector_job/SubtotalTax",
      "estimated_tax_collector_job/TaxMetadataVar",
      "estimated_tax_collector_job/TaxDetails",
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
      "total_before_credits_applied_collector_job/EligibleTotalBeforeTipApplied",
      "total_before_credits_applied_collector_job/FinalDeliveryFee",
      "total_before_credits_applied_collector_job/FinalMinOrderFee",
      "total_before_credits_applied_collector_job/FinalPriorityFee",
      "total_before_credits_applied_collector_job/FinalServiceFee",
      "total_before_credits_applied_collector_job/TotalBeforeDiscountApplied",
      "total_before_credits_applied_collector_job/TotalBeforeCreditsApplied",
      "total_before_credits_applied_collector_job/EligibleTotalBeforeCreditsApplied",
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
      "credit_collector_job/TotalCreditsApplied",
      "credit_collector_job/ReferralCreditsApplied",
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
      "total_collector_job/Total",
      "total_collector_job/TotalBeforeTip",
      "total_collector_job/EligibleTotal",
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
