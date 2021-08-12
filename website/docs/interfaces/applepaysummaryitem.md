---
title: ApplePaySummaryItem
---

An object that defines a line item in a payment request.

## Properties

### amount

- Type: `string`

The line item amount.

### label

- Type: `string`

The name of the line item (ex.: product name).

### type

- Type: `pending` | `final`

Whether or not the line item represents a known final cost or an estimated or unknown cost.

#### Default

        
 `undefined`
