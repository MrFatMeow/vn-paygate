### vn-paygate Version 1
- First version only support OnePay payment
- Hope you like that!


```markdown
# OnePay Payment Integration

This guide demonstrates how to use the `OnepayPaymentService` class from the `vn-paymentgate` library to create a payment URL and handle IPN (Instant Payment Notification) from OnePay.

## Installation

Ensure that you have installed the `vn-paymentgate` library:

```bash
npm install vn-paymentgate
```

## Importing the Service

Import the `OnepayPaymentService` class from the `vn-paymentgate` library in your project:

```typescript
import { OnepayPaymentService } from 'vn-paymentgate';
```

## Environment Configuration

To use the `OnepayPaymentService`, you must configure the following environment variables:

```env
VPC_VERSION=
VPC_COMMAND=
AGAIN_LINK=
VPC_RETURN_URL=
VPC_LOCALE=
VPC_ACCESS_CODE=
VPC_MERCHANT=
VPC_PAYMENT_CLIENT_URL=
VPC_SECURE_SECRET=
```

If you want to config promotion
```
  VPC_PROMOTION_LIST=string
  VPC_THEME=string
```

Set these variables in your `.env` file or directly in your environment.

## Creating a Payment URL

Use the `createPaymentUrl` function to generate a payment URL. This function requires two parameters:

### 1. `PaymentRequest` Interface

The `PaymentRequest` interface contains the following properties:

- `ipClient: string;` - The IP address of the client.
- `merchTxnRef: string;` - The merchant transaction reference.
- `orderInfo: string;` - Information about the order.
- `title: string;` - The title of the transaction.
- `amount: number;` - The amount to be paid.

### 2. `customParams: Record<\`user_${string}\`, any>`

An object containing custom parameters that need to be sent to OnePay and will be returned when OnePay sends back data.

### Example Usage

```typescript
import { OnepayPaymentService } from 'vn-paymentgate';

const paymentRequest: PaymentRequest = {
  ipClient: '192.168.1.1',
  merchTxnRef: 'MTX123456789',
  orderInfo: 'Payment for Order #1234',
  title: 'Order #1234',
  amount: 100000, // in VND
};

const customParams = {
  user_email: 'customer@example.com',
  user_phone: '0123456789',
};

const paymentUrl = OnepayPaymentService.createPaymentUrl(paymentRequest, customParams);

console.log(paymentUrl);
```

### Method Signature

```typescript
static createPaymentUrl(
  { ipClient, merchTxnRef, orderInfo, title, amount }: PaymentRequest,
  customParams: Record<UserParamType, any> = {}
): string
```

## Handling IPN (Instant Payment Notification)

The `ipn` function is used to handle the parameters returned by OnePay after the payment process. Ensure that your server correctly handles the IPN data.

```typescript
import { OnepayPaymentService } from 'vn-paymentgate';

// Example IPN data received from OnePay
const ipnData = {
  vpc_TxnResponseCode: '0',
  vpc_TransactionNo: '1234567890',
  vpc_OrderInfo: 'Payment for Order #1234',
  // other parameters...
};

export interface IpnResponse {
  isValid: boolean;
  code: string | null;
  responseData?: Record<string, string>;
}

const isValid = OnepayPaymentService.ipn(ipnData);

if (ipnResponse.isValid) {
  console.log('IPN data is valid.');
  console.log('Response Data:', ipnResponse.responseData);
} else {
  console.log('IPN data is invalid.');
  console.log('Error Code:', ipnResponse.code);
}
```

## Conclusion

This documentation provides an overview of how to integrate OnePay with your Node.js application using the `vn-paymentgate` library. For more details, refer to the library's official documentation.
```