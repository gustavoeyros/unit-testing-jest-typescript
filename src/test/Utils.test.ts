import { Utils } from "../app/Utils";

describe("Utils test suite", () => {
  it("first test", () => {
    const result = Utils.toUpperCase("abc");
    expect(result).toBe("ABC");
  });

  it("parse simple URL", () => {
    const parsedUrl = Utils.parseUrl("http://localhost:8080/signup");
    expect(parsedUrl.href).toBe("http://localhost:8080/signup");
    expect(parsedUrl.port).toBe("8080");
    expect(parsedUrl.protocol).toBe("http:");
    expect(parsedUrl.query).toEqual({});
  });

  it("parse URL with query", () => {
    const parsedUrl = Utils.parseUrl(
      "http://localhost:8080/signup?user=user&password=pass"
    );
    const expectedQuery = {
      user: "user",
      password: "pass",
    };
    expect(parsedUrl.query).toEqual(expectedQuery);
  });

  it("test invalid URL", () => {
    function expectError() {
      Utils.parseUrl("");
    }
    expect(expectError).toThrowError("Empty url");
  });
  it("test invalid URL with arrow function", () => {
    expect(() => {
      Utils.parseUrl("");
    }).toThrow("Empty url");
  });

  it("test invalid URL with try catch", () => {
    try {
      Utils.parseUrl("");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message", "Empty url");
    }
  });
});
