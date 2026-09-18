/**
 * Somnia (chainId 5031) uses SOMI as its native gas token and tracks USDC.e.
 * Without a DefiLlama slug, `coinId` in lib/wallet/asset-prices.ts returns null,
 * the assets never reach the price request, their `usdValue` stays null, and the
 * wallet reports a $0 total with the holdings pushed into the unpriced bucket.
 */
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { DEFILLAMA_CHAIN_SLUGS } from "@/lib/scan/price/defillama";

const SOMNIA = 5031;
const SOMNIA_TESTNET = 50_312;

describe("Somnia asset pricing", () => {
  it("has a DefiLlama chain slug so its SOMI and USDC.e get priced", () => {
    expect(DEFILLAMA_CHAIN_SLUGS[SOMNIA]).toBe("somnia");
  });

  it("leaves Shannon Testnet unslugged - testnet assets are dropped before the price request", () => {
    expect(DEFILLAMA_CHAIN_SLUGS[SOMNIA_TESTNET]).toBeUndefined();
  });
});
