import { formatCurrency, rgb } from "./utils/helper";

// Test RGB to Hex (Logic test)
test("Test RGB to Hex (Logic test)", () => {
  const results1 = rgb(255, 255, 255);
  const results2 = rgb(255, 255, 300);
  const results3 = rgb(0, 0, 0);
  const results4 = rgb(148, 0, 211);

  expect(results1).toBe("FFFFFF");
  expect(results2).toBe("FFFFFF");
  expect(results3).toBe("000000");
  expect(results4).toBe("9400D3");
});

// Test format the "Balance"
test("Test format currency with integer number", () => {
  const num1 = formatCurrency(1000, "$");
  const num2 = formatCurrency(10, "$");
  expect(num1).toBe("$1,000");
  expect(num2).toBe("$10");
});

test("Test format currency with float number", () => {
  const num = formatCurrency(1000.05, "$");
  expect(num).toBe("$1,000.05");
});

test("Test format currency with float number", () => {
  const num = formatCurrency(-110, "$");
  expect(num).toBeFalsy();
});

// test("Test format currency with string", () => {
//   const num1 = formatCurrency("ádasd.05", "$");
//   const num2 = formatCurrency("100.05", "$");
//   const num3 = formatCurrency("100 - 0.05", "$");

//   expect(num1).toBeFalsy();
//   expect(num2).toBeFalsy();
//   expect(num3).toBeFalsy();
// });
