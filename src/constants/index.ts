export const SHOPIFY = "shopify";
export const WORDPRESS = "wordpress";
export const AMAZON = "amazon";
export const UNICOMMERCE = "unicommerce";
export const EASYECOM = "easyecom";
export const SHIPWAY = "shipway";

export const STORE_TYPES = {
  SHOPIFY,
  UNICOMMERCE,
  EASYECOM,
  WORDPRESS,
  AMAZON,
  SHIPWAY,
};

export const instructionLink = {
  [SHOPIFY]:
    "https://wherehouse.notion.site/How-to-integrate-Shopify-783473d2105d40e18baa1156bbfebcd3",
  [UNICOMMERCE]:
    "https://docs.google.com/document/d/1SZufQJUhZmTww9UZXfDjstHpefsOV6bN1yoFegSfFjc/edit?usp=sharing",
  [EASYECOM]:
    "https://docs.google.com/document/d/1Pvfr8cgSnTXVun3ctP5ShNBiwPiHnSsbBhpXu5_axEY/edit?usp=sharing",
  [WORDPRESS]:
    "https://wherehouse.notion.site/How-to-integrate-WooCommerce-80bff4d5b84547a18db15c1e29b1ccf3",
};

export const STORE_LOGOS = {
  [SHOPIFY]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/assets/integration/marketplaces/Shopify.png",
  [UNICOMMERCE]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/random-imgs/unicommerce.webp",
  [EASYECOM]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/assets/integration/marketplaces/EasyEcom.png",
  [WORDPRESS]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/assets/integration/marketplaces/Wordpress.png",
  [AMAZON]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/assets/integration/marketplaces/Amazon.jpeg",
  [SHIPWAY]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/shipway_logo.png",
};

export const SHOP_TYPE = Object.freeze({
  SHOPIFY: "shopify",
  WORDPRESS: "wordpress",
  ECWID: "ecwid",
  MANUAL: "manual", // to handle manual orders
  MANUAL_FBW: "manual FBW",
  UNICOMMERCE: "unicommerce",
  EASYECOM: "easyecom",
  SHIPWAY: "shipway",
});

export const PAYMENT_METHOD = Object.freeze({
  COD: "COD",
  PREPAID: "prepaid",
});

export const STATUS = Object.freeze({
  ACTIVE: 1,
  INACTIVE: 0,
});

export const EVENT_TYPE = Object.freeze({
  CREATE: "create",
});

export const ORDER_STATUS = Object.freeze({
  PLACED: "PLACED",
  PROCESSED: "PROCESSED",
  READY_TO_SHIP: "READY_TO_SHIP",
  PICKED_UP: "PICKED_UP",
  SHIPPED: "SHIPPED",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  IN_TRANSIT: "IN_TRANSIT",
  UNDELIVERED: "UNDELIVERED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  RTO_AVAILABLE: "RTO_AVAILABLE",
  RTO_IN_TRANSIT: "RTO_IN_TRANSIT",
  RTO_OUT_FOR_DELIVERY: "RTO_OUT_FOR_DELIVERY",
  RTO_DELIVERED: "RTO_DELIVERED",
  RTO_UNDELIVERED: "RTO_UNDELIVERED",
  RTS_PROCCESSING: "RTS_PROCCESSING",
  RTS_FAILED: "RTS_FAILED",
  RTO_PROCESSED: "RTO_PROCESSED",
  DTO_PLACED: "DTO_PLACED",
  DTO_IN_TRANSIT: "DTO_IN_TRANSIT",
  DTO_OUT_FOR_DELIVERY: "DTO_OUT_FOR_DELIVERY",
  DTO_DELIVERED: "DTO_DELIVERED",
  DTO_UNDELIVERED: "DTO_UNDELIVERED",
  DTO_PROCESSED: "DTO_PROCESSED",
  DTO_CANCELLED: "DTO_CANCELLED",
  UNSERVICEABLE: "UNSERVICEABLE",
  LOST: "LOST",
  PACKED: "PACKED",
});

export const FulfillmentProviders = Object.freeze({
  XPREESSBEES: "xpressbees",
  DTDCAIR: "DTDCAir",
  DTDSURFACE: "DTDCSurface",
  DELHIVERY: "delhivery",
  DELHIVERYEXPRESS: "delhiveryexpress",
  DELHIVERYSURFACE: "delhiverysurface",
  PICKRR: "pickrr",
  WHEREHOUSE_LIGHTNING: "WherehouseLightning",
  GOSWIFT: "goswift",
  DRIVERSHAAB: "drivershaab",
  DUNZO: "dunzo",
  SHIPROCKET: "shipRocket",
  SHIPWAY: "shipway",
  SHYPLITELITE: "shypliteLite",
  SHYPLITESURFACE: "shypliteSurface",
  SHYPLITEAIR: "shypliteAir",
  CLICKPOST: "clickPost",
  SHREE_MARUTI_COURIER_SURFACE: "shreeMarutiCourierSurface",
  SHREE_MARUTI_COURIER_AIR: "shreeMarutiCourierAir",
  BLUEDART: "blueDart",
  BLOWHORN: "blowHorn",
});

export const FulfillmentProviderLogos = Object.freeze({
  [FulfillmentProviders.XPREESSBEES]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/xbees_logo.png",
  [FulfillmentProviders.DTDCAIR]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/dtdc_logo.png",
  [FulfillmentProviders.DTDSURFACE]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/dtdc_logo.png",
  [FulfillmentProviders.DELHIVERY]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/delhivery_logo.jpeg",
  [FulfillmentProviders.DELHIVERYEXPRESS]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/delhivery_logo.jpeg",
  [FulfillmentProviders.DELHIVERYSURFACE]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/delhivery_logo.jpeg",
  [FulfillmentProviders.PICKRR]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/pickrr_logo.png",
  [FulfillmentProviders.WHEREHOUSE_LIGHTNING]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/wherehouse_logo.png",
  [FulfillmentProviders.GOSWIFT]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/logo/6319812d9f736686faf31912_Logo.svg",
  [FulfillmentProviders.DRIVERSHAAB]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/drivershaab_logo.png",
  [FulfillmentProviders.DUNZO]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/dunzo_logo.png",
  [FulfillmentProviders.SHIPROCKET]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/shiprocket_logo.png",
  [FulfillmentProviders.SHIPWAY]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/shipway_logo.png",
  [FulfillmentProviders.SHYPLITELITE]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/random-imgs/shyplite.jpg",
  [FulfillmentProviders.SHYPLITESURFACE]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/random-imgs/shyplite.jpg",
  [FulfillmentProviders.SHYPLITEAIR]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/random-imgs/shyplite.jpg",
  [FulfillmentProviders.CLICKPOST]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/random-imgs/ClickPost-logo-blue.webp",
  [FulfillmentProviders.SHREE_MARUTI_COURIER_AIR]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/assets/ShreeMaruti.jpeg",
  [FulfillmentProviders.SHREE_MARUTI_COURIER_SURFACE]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/assets/ShreeMaruti.jpeg",
  [FulfillmentProviders.BLUEDART]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/blue-dart-express-limited-logos-idb_RdmsSv.png",
  [FulfillmentProviders.BLOWHORN]:
    "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/3pl_logos/blowhorn_logo.png",
});

export const EAuthMode = Object.freeze({
  PHONE: "phone",
  EMAIL: "email",
});

export const OtpPurpose = Object.freeze({
  SIGNUP_PHONE_OTP: "signupPhoneOtp",
  SIGNUP_EMAIL_OTP: "signupEmailOtp",
  FORGOT_PASSWORD_OTP: "forgotPasswordOtp",
});

export const RegexValidation = Object.freeze({
  EMAIL: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
  PHONE: "[6-9]{1}[0-9]{9}",
});

export const hyperLocalPartners = ["dunzo", "WherehouseLightning"];

export const supportImgUrl =
  "https://wherehouse-prod-content.s3.ap-south-1.amazonaws.com/assets/support.jpg";

export const colorName = {
  primary: "pc",
  secondary: "sc",
  background: "bg",
  headerFont: "hf",
  button: "bc",
};
export const defaultPageConfig = {
  current: 1,
  pageSize: 10,
  sortField: "createdAt",
  sortOrder: "DESC",
};

export const IQueueNames = {
  BULK_RTS: "rts-queue",
  BULK_SYNC: "common-queue",
};

export const ILocalStorageID = {
  BULK_RTS: "BULK_RTS_BATCH_ID_",
  BULK_SYNC: "BULK_SYNC_BATCH_ID_",
};

export const CODRemittanceStatus = {
  PROCESSING: "processing",
  DUE: "due",
  PAID: "paid",
};
