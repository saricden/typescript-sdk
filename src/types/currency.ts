/**
 * Currency metadata.
 * @public
 */
import { z } from "zod";
import {
  CurrencySchema,
  CurrencyValueSchema,
} from "../schema/contracts/common/currency";
import { PriceSchema } from "../schema/shared";

/**
 * @public
 */
export type Currency = z.infer<typeof CurrencySchema>;

export interface NativeToken extends Currency {
  wrapped: {
    address: string;
    name: string;
    symbol: string;
  };
}

/**
 * Currency metadata & value.
 * @public
 */
export type CurrencyValue = z.infer<typeof CurrencyValueSchema>;

/**
 * Represents a currency price already formatted. ie. "1" for 1 ether.
 * @public
 */
export type Price = z.input<typeof PriceSchema>;
