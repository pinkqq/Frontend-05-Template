var assert = require("assert");
import { add, mul } from "../add";
describe("add function testing", () => {
  it("1+2 should be 3", () => {
    assert.equal(add(1, 2), 3);
  });
  it("3*4 should be 12", () => {
    assert.equal(mul(3, 4), 12);
  });
});
