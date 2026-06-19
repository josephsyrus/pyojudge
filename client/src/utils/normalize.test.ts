import { describe, it, expect } from "vitest";
import { normalizeOutput, outputsMatch, stripPyodidePaths } from "./normalize";

describe("normalizeOutput", () => {
  it("trims leading and trailing whitespace", () => {
    expect(normalizeOutput("  hello  ")).toBe("hello");
  });

  it("converts CRLF to LF", () => {
    expect(normalizeOutput("a\r\nb")).toBe("a\nb");
  });

  it("converts old Mac CR to LF", () => {
    expect(normalizeOutput("a\rb")).toBe("a\nb");
  });

  it("strips trailing whitespace from each line", () => {
    expect(normalizeOutput("hello   \nworld  ")).toBe("hello\nworld");
  });

  it("trims surrounding blank lines", () => {
    expect(normalizeOutput("\n\nhello\n\n")).toBe("hello");
  });

  it("preserves blank lines in the middle", () => {
    expect(normalizeOutput("a\n\nb")).toBe("a\n\nb");
  });

  it("handles empty string", () => {
    expect(normalizeOutput("")).toBe("");
  });
});

describe("outputsMatch", () => {
  it("matches identical strings", () => {
    expect(outputsMatch("hello", "hello")).toBe(true);
  });

  it("matches after normalizing whitespace differences", () => {
    expect(outputsMatch("hello  ", "  hello")).toBe(true);
  });

  it("matches Python bool True", () => {
    expect(outputsMatch("True", "True")).toBe(true);
  });

  it("matches Python bool False", () => {
    expect(outputsMatch("False", "False")).toBe(true);
  });

  it("matches integer output", () => {
    expect(outputsMatch("42", "42")).toBe(true);
  });

  it("matches list output", () => {
    expect(outputsMatch("[0, 1]", "[0, 1]")).toBe(true);
  });

  it("matches list with json.dumps output (double quotes)", () => {
    expect(outputsMatch('["hello"]', '["hello"]')).toBe(true);
  });

  it("does not match different values", () => {
    expect(outputsMatch("1", "2")).toBe(false);
  });

  it("does not match True vs False", () => {
    expect(outputsMatch("True", "False")).toBe(false);
  });
});

describe("stripPyodidePaths", () => {
  it('removes File "/lib/python..." path prefix', () => {
    const msg = 'File "/lib/python3.11/foo.py", line 5, in bar\nValueError: oops';
    expect(stripPyodidePaths(msg)).not.toContain("/lib/python");
  });

  it("removes /home/pyodide path references in parentheses", () => {
    const msg = "SyntaxError: invalid syntax (/home/pyodide/user.py)";
    expect(stripPyodidePaths(msg)).not.toContain("/home/pyodide");
  });

  it("leaves normal error messages untouched", () => {
    expect(stripPyodidePaths("NameError: name x is not defined")).toBe(
      "NameError: name x is not defined",
    );
  });
});
