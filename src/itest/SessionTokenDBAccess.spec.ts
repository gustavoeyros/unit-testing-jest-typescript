import { SessionTokenDBAccess } from "../app/Authorization/SessionTokenDBAccess";
import { SessionToken } from "../app/Models/ServerModels";
describe("SessionTokenDBAccess itest suite", () => {
  let sessionTokenDBAccess: SessionTokenDBAccess;
  let someSessionToken: SessionToken;
  const randomString = Math.random().toString(36).substring(7);

  beforeAll(() => {
    sessionTokenDBAccess = new SessionTokenDBAccess();
    someSessionToken = {
      accessRights: [1, 2, 3],
      expirationTime: new Date(),
      tokenId: "someTokenId" + randomString,
      userName: "someUserName",
      valid: true,
    };
  });
  it("store and retrieve SessionToken", async () => {
    await sessionTokenDBAccess.storeSessionToken(someSessionToken);
    const resultToken = await sessionTokenDBAccess.getToken(
      someSessionToken.tokenId
    );
    expect(resultToken).toMatchObject(someSessionToken);
  });
  it("delete sessionToken", async () => {
    await sessionTokenDBAccess.deleteToken(someSessionToken.tokenId);
    const resultToken = await sessionTokenDBAccess.getToken(
      someSessionToken.tokenId
    );
    expect(resultToken).toBeUndefined();
  });

  it("delete missing sessionToken throws error", async () => {
    try {
      await sessionTokenDBAccess.deleteToken(someSessionToken.tokenId);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message", "SessionToken not deleted!");
    }
  });
});
