import { expect, assert } from "chai"
import { ethers } from "hardhat"
import { SimpleStorage } from "../typechain-types"

describe("SimpleStorage", () => {
  let simpleStorage: SimpleStorage
  beforeEach(async () => {
    const simpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
    )
    simpleStorage = await simpleStorageFactory.deploy()
  })

  describe("Deployment", () => {
    it("should start with a favourtie number 0", async () => {
      const currentValue = await simpleStorage.retrieve();
      assert.equal(currentValue.toString(), "0");
    })

    it("should update when we call store", async () => {
      const txRes = await simpleStorage.store(7);
      txRes.wait(1);
      const currentValue = await simpleStorage.retrieve();
      expect(currentValue.toString()).equal("7");
    })
  })
})
