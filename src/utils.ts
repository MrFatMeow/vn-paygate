import * as crypto from "crypto";
const urlRegExp = /https?:\/\/.*/;
export { urlRegExp };

export function toUpperCase(s = "") {
  if (typeof s !== "string") {
    throw new Error("toUpperCase:param must be string");
  }

  return s.toUpperCase();
}

export function pack(data: any, encoding: any = "hex") {
  return Buffer.from(data, encoding);
}

export function hashHmac(algorithm: any, data: any, secret: any) {
  const hmac = crypto.createHmac(algorithm, secret);
  hmac.update(data);

  return hmac.digest("hex");
}

export function to2DigitNumber(number: any) {
  if (isNaN(number)) {
    throw new Error("to2DigitNumber:param must be a number");
  }
  if (!number) {
    return "00";
  }

  return `0${number}`.substr(-2, 2);
}

export function createMd5Hash(data: any) {
  return crypto.createHash("md5").update(data).digest("hex");
}
