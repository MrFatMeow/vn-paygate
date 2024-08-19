import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  vpcVersion: process.env.VPC_VERSION || "",
  vpcCommand: process.env.VPC_COMMAND || "",
  againLink: process.env.AGAIN_LINK || "",
  vpcReturnUrl: process.env.VPC_RETURN_URL || "",
  vpcLocale: process.env.VPC_LOCALE || "",
  vpcAccessCode: process.env.VPC_ACCESS_CODE || "",
  vpcMerchant: process.env.VPC_MERCHANT || "",
  vpcPaymentClientUrl: process.env.VPC_PAYMENT_CLIENT_URL || "",
  vpcSecureSecret: process.env.VPC_SECURE_SECRET || "",
  vpcPromotionList: process.env.VPC_PROMOTION_LIST || null,
  vpcTheme: process.env.VPC_THEME || null,
  vpcCallbackURL: process.env.VPC_CALLBACK_URL || null
};


