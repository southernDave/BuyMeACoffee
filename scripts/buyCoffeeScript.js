// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

//returns the balance of the given address
async function getBalance(address){
  const balanceBigInt = await hre.waffle.provider.getBalance(address)
  return hre.ethers.utils.formatEther(balanceBigInt)
}

//logs the ether balances for a list of addresses
async function printBalances(addresses){
  let idx = 0
  for(const address of addresses) {
    console.log(`Address ${idx} balance:`, await getBalance(address));
    idx ++
  }
}

//logs the memos stored on chain from coffee purchases
async function printMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp
    const tipper = memo.name
    const tipperAddress = memo.from
    const message = memo.message
    console.log(`At ${timestamp}, ${tipper}, ${tipperAddress}, ${message}`);
  }
}

async function main() {
  //get example contracts
  const [owner, tipper1, tipper2, tipper3] = await hre.ethers.getSigners();

  //get the contract to deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee")
  const buyMeACoffee = await BuyMeACoffee.deploy()
  await buyMeACoffee.deployed()
  console.log("BuyMeACoffee deployed to", buyMeACoffee.address);

  //deploy the contract

  //check the balance before purchase
  const addresses = [owner.address, tipper1.address, buyMeACoffee.address]
  console.log("*****start*******");
  await printBalances(addresses)

  //buy the owner a few coffee

  //check balances after the coffee is purchased

  //withdraw funds

  //chexk balances after the withdrawal

  //read all the memos left for the owner
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
