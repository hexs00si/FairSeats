require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.0", // Change to your Solidity version
    networks: {
        ganache: {
            url: "http://127.0.0.1:7545", // Ganache default URL
            accounts: [
                "0x03d1c20bfe91d2be250cb7d985e45b196bd08952d7b89d04b2462e5a3232d5da", // Example private key
                "0xe18cd52c219547ad534d11044cce77d36f49aab13d1b87b2a0f690858d944c9e" // Another valid private key
                // Add more private keys if needed
            ]
        }
    }
};
