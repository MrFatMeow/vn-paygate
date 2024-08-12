import { config } from "./config";
import { OnepayService } from "./helper";
import {
  IpnResponse,
  IpnResponseCode,
  PaymentRequest,
  UserParamType,
} from "./types";

export class OnepayPaymentService {
  static createPaymentUrl(
    { ipClient, merchTxnRef, orderInfo, title, amount }: PaymentRequest,
    customParams: Record<UserParamType, any> = {}
  ): string {
    const fields: Record<string, string> = {
      vpc_Merchant: config.vpcMerchant,
      vpc_AccessCode: config.vpcAccessCode,
      virtualPaymentClientURL: config.vpcPaymentClientUrl,
      vpc_Version: config.vpcVersion,
      vpc_Command: config.vpcCommand,
      AgainLink: config.againLink,
      vpc_ReturnURL: config.vpcReturnUrl,
      vpc_Locale: config.vpcLocale,
      vpc_TicketNo: ipClient,
      vpc_MerchTxnRef: merchTxnRef,
      vpc_OrderInfo: orderInfo,
      Title: title,
    };

    if (config.vpcPromotionList) {
      fields.vpc_Promotion_List = config.vpcPromotionList;
    }

    if (config.vpcTheme) {
      fields.vpc_Theme = config.vpcTheme;
    }

    fields.vpc_Amount = amount.toString();
    const vpcURL = fields.virtualPaymentClientURL as string;
    delete fields.virtualPaymentClientURL;

    Object.keys(customParams).forEach((customField: any) => {
      fields[customField] = customParams[customField];
    });

    const sv = new OnepayService();
    const secureHash = sv.hashAllFields(fields, config.vpcSecureSecret);
    fields.vpc_SecureHash = secureHash.toUpperCase();

    const buf = new URLSearchParams(fields as any).toString();
    const fullUrl = `${vpcURL}?${buf}`;

    return fullUrl;
  }

  static ipn(requestParams: any): IpnResponse {
    const keys = Object.keys(requestParams).filter(
      (key: string) => key.startsWith("vpc_") || key.startsWith("user_")
    );
    const hasResponseCode =
      keys.includes("vpc_SecureHash") &&
      keys.includes("vpc_TxnResponseCode") &&
      requestParams["vpc_TxnResponseCode"] !== "No Value Returned";
    if (!hasResponseCode) {
      return {
        isValid: false,
        code: IpnResponseCode.NO_TXN_RESPONSE,
      };
    }
    const vpcSecureHash = requestParams("vpc_SecureHash");
    const exceptHashFields = ["vpc_SecureHash"];
    const responseFields: Record<string, string> = {};
    const hashFields = keys.filter(
      (field: string) => !exceptHashFields.includes(field)
    );
    hashFields.forEach((field: string) => {
      responseFields[field] = requestParams[field];
    });
    const onepayService = new OnepayService();
    const secureHashFromParams = onepayService.hashAllFields(
      responseFields,
      config.vpcSecureSecret
    );

    if (secureHashFromParams !== vpcSecureHash) {
      return {
        isValid: false,
        code: IpnResponseCode.INVALID_HASH,
      };
    }

    return {
      isValid: true,
      code: null,
      responseData: responseFields,
    };
  }
}
