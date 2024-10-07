const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const TicketBooking = await hre.ethers.getContractFactory("TicketBooking");
    
    // Deploy the contract
    const ticketBooking = await TicketBooking.deploy();
    await ticketBooking.deployed();
    
    // Log the deployed contract address
    console.log("TicketBooking deployed to:", ticketBooking.address);
}

// Execute the main function
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
