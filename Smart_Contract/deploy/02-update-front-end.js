const {
    frontEndContractsFile,
    // frontEndContractsFile2,
    frontEndAbiLocation,
    // frontEndAbiLocation2,
} = require("../helper-hardhat-config")
require("dotenv").config()
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const webThreeSocial = await ethers.getContract("WebThreeSocial")
    fs.writeFileSync(
        `${frontEndAbiLocation}WebThreeSocial.json`,
        webThreeSocial.interface.format(ethers.utils.FormatTypes.json)
    )
    // fs.writeFileSync(
    //     `${frontEndAbiLocation2}NftMarketplace.json`,
    //     nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
    // )
}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const webThreeSocial = await ethers.getContract("WebThreeSocial")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["WebThreeSocial"].includes(webThreeSocial.address)) {
            contractAddresses[chainId]["WebThreeSocial"].push(webThreeSocial.address)
        }
    } else {
        contractAddresses[chainId] = { WebThreeSocial: [webThreeSocial.address] }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
    // fs.writeFileSync(frontEndContractsFile2, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]