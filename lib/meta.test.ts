import { describe, it, expect } from "vitest";
import { hashField, normalizePhone } from "./meta";

describe("hashField", () => {
  it("hash sha256 ของค่า lowercase+trim (ค่าคงที่)", () => {
    // sha256("test@example.com")
    expect(hashField("  Test@Example.com ")).toBe(
      "973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b"
    );
  });
});

describe("normalizePhone", () => {
  it("เบอร์ไทย 0 นำหน้า → 66", () => {
    expect(normalizePhone("095-385-4906")).toBe("66953854906");
  });
  it("มี +66 อยู่แล้ว คงเดิม (เหลือเลข)", () => {
    expect(normalizePhone("+66 95 385 4906")).toBe("66953854906");
  });
});
