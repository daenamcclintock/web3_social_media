const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Web3 Social Unit Tests", () => {
        let webThreeSocial, webThreeSocialContract
        const POST_TXT = "Hey"
        const POST_IMG = "ipfs://bafybeidlkqhddsjrdue7y3dy27pu5d7ydyemcls4z24szlyik3we7vqvam/nft-image.png"

        beforeEach(async () => {
            accounts = await ethers.getSigners() // could also do with getNamedAccounts
            deployer = accounts[0]
            await deployments.fixture(["all"])
            webThreeSocialContract = await ethers.getContract("WebThreeSocial")
            webThreeSocial = webThreeSocialContract.connect(deployer)
        })

        describe("addPost", () => {
            it("reverts if 1 ether is not added", async () => {
                const error = "Please submit 1 ether"
                await expect(
                    webThreeSocial.addPost(POST_TXT, POST_IMG)
                ).to.be.revertedWith(error)
            })

            it("emits an event and creates a post", async () => {
                expect(await webThreeSocial.addPost(
                    POST_TXT, POST_IMG, { value: ethers.utils.parseEther("1") })).to.emit(
                        "postCreated"
                )
            })
        })
    })