const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorageContract", function () {
    // let simpleStorageFactory
    // let simpleStorage
    let simpleStorageFactory, simpleStorage

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory(
            "SimpleStorageContract"
        )
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with favourite number 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // expect
        // assert
        // these two packages come from chai library
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("should update when we call store", async function () {
        const expectedValue = "77"
        const updateValue = await simpleStorage.store(expectedValue)
        await updateValue.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("should update when we call addPeople", async function () {
        const expectedFirstValue = "Usman"
        const expectedSecondValue = "99"

        const updateValue = await simpleStorage.addPeople(
            expectedFirstValue,
            expectedSecondValue
        )
        await updateValue.wait(1)

        // const currentValue = await simpleStorage.nameTofavNumber[
        //     expectedFirstValue
        // ]

        const currentValue = await simpleStorage.getPersonFavNumber(
            expectedFirstValue
        )
        assert.equal(currentValue.toString(), expectedSecondValue)
    })
})
