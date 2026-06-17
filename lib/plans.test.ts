import { describe, it, expect } from "vitest";
import { getPlan, computeOrder } from "./plans";

describe("getPlan", () => {
  it("คืน plan ที่รู้จัก", () => {
    expect(getPlan("early-bird")?.unitAmount).toBe(299000);
  });
  it("คืน null สำหรับ plan ที่ไม่รู้จัก", () => {
    expect(getPlan("nope")).toBeNull();
  });
});

describe("computeOrder", () => {
  it("early-bird 1 คน = 299000 สตางค์", () => {
    expect(computeOrder("early-bird", 1).amountTotal).toBe(299000);
  });
  it("group 2 คน = 518000 สตางค์", () => {
    expect(computeOrder("group", 2).amountTotal).toBe(518000);
  });
  it("group ต่ำกว่า min (1) โยน error", () => {
    expect(() => computeOrder("group", 1)).toThrow();
  });
  it("private เกิน max โยน error", () => {
    expect(() => computeOrder("private", 2)).toThrow();
  });
  it("plan ไม่รู้จักโยน error", () => {
    expect(() => computeOrder("nope", 1)).toThrow();
  });
  it("qty ไม่ใช่จำนวนเต็มบวกโยน error", () => {
    expect(() => computeOrder("early-bird", 0)).toThrow();
  });
});
