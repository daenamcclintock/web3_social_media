const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const POST_TXT = "Hey"
const POST_IMG = "ipfs://bafybeidlkqhddsjrdue7y3dy27pu5d7ydyemcls4z24szlyik3we7vqvam/nft-image.png"

const addPost = async () => {
    const webThreeSocial = await ethers.getContract("WebThreeSocial")
    const transaction = await webThreeSocial.addPost(POST_TXT, POST_IMG, { value: ethers.utils.parseEther("1") })
    await transaction.wait(1)
      .then(() => {
        console.log(`Post Added by: ${transaction.from}`)
      })
    if (network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}


addPost()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
