import { Server } from "../../app/Server/Server";
import { LoginHandler } from "../../app/Handlers/LoginHandler";
import { Authorizer } from "../../app/Authorization/Authorizer";
import { UsersDBAccess } from "../../app/Data/UsersDBAccess";
import { DataHandler } from "../../app/Handlers/DataHandler";

jest.mock("../../app/Handlers/LoginHandler");
jest.mock("../../app/Handlers/DataHandler");
jest.mock("../../app/Authorization/Authorizer");

const requestMock = {
  url: "",
};
const responseMock = {
  end: jest.fn(),
};
const listenMock = {
  listen: jest.fn(),
};

jest.mock("http", () => ({
  createServer: (cb: any) => {
    cb(requestMock, responseMock);
    return listenMock;
  },
}));

describe("Server test suite", () => {
  it("should create server on port 8080", () => {
    new Server().startServer();
    expect(listenMock.listen).toBeCalledWith(8080);
    expect(responseMock.end).toBeCalled();
  });
  it("should handle login requests", () => {
    requestMock.url = "http://localhost:8080/login";
    new Server().startServer();
    const handleRequestSpy = jest.spyOn(
      LoginHandler.prototype,
      "handleRequest"
    );
    expect(handleRequestSpy).toBeCalled();
    expect(LoginHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer)
    );
  });

  it("should handle data requests", () => {
    requestMock.url = "http://localhost:8080/users";
    new Server().startServer();
    expect(DataHandler).toBeCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer),
      expect.any(UsersDBAccess)
    );
    const handleRequestSpy = jest.spyOn(DataHandler.prototype, "handleRequest");
    expect(handleRequestSpy).toBeCalled();
  });
});
