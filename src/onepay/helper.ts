import { hashHmac, pack } from "../utils";

export class OnepayService {
  public hashAllFields(
    fields: Record<string, string>,
    secretKey: string
  ): string {
    let buf: string[] = [];

    Object.keys(fields)
      .sort()
      .forEach((key) => {
        const value = fields[key];
        if (
          value.length > 0 &&
          (key.startsWith("vpc_") || key.startsWith("user_"))
        ) {
          buf.push(`${key}=${value}`);
        }
      });
    try {
      const secureHashResult = hashHmac(
        "SHA256",
        buf.join("&"),
        pack(secretKey)
      );
      return secureHashResult;
    } catch (error) {
      console.error(error);
      return "";
    }
  }
}
