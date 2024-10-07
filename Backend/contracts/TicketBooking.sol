// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketBooking {
    struct Ticket {
        uint id;
        address owner;
        uint price;
        bool isAvailable;
    }

    mapping(uint => Ticket) public tickets;
    uint public ticketCount;

    event TicketCreated(uint id, address owner, uint price);
    event TicketPurchased(uint id, address buyer);

    function createTicket(uint price) public {
        ticketCount++;
        tickets[ticketCount] = Ticket(ticketCount, msg.sender, price, true);
        emit TicketCreated(ticketCount, msg.sender, price);
    }

    function purchaseTicket(uint id) public payable {
        require(tickets[id].isAvailable, "Ticket is not available");
        require(msg.value == tickets[id].price, "Incorrect price");

        tickets[id].owner = msg.sender;
        tickets[id].isAvailable = false;

        emit TicketPurchased(id, msg.sender);
    }

    function getTicket(uint id) public view returns (Ticket memory) {
        return tickets[id];
    }
}
