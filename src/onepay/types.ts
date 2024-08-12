export interface IpnResponse {
  isValid: boolean;
  code: string | null;
  responseData?: Record<string, string>;
}

export enum IpnResponseCode {
  INVALID_HASH = "INVALID_HASH",
  NO_TXN_RESPONSE = "NO_TXN_RESPONSE",
}

export interface PaymentRequest {
  ipClient: string;
  merchTxnRef: string;
  orderInfo: string;
  title: string;
  amount: number;
}

export type UserParamType = `user_${string}`;
