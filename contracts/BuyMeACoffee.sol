// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BuyMeACoffee {

    //event whenever a new memo is created
   event NewMemo(
       address indexed from,
       uint256  timestamp,
       string name,
       string message,
   );

   // struct of the memo
   struct Memo{
       address from;
       uint256 timestamp;
       string name;
       string message;
   }

   //list of memos received from friends
   Memo[] memos;

   //address of the contract deployer
    address payable owner;

    //deploy logic
    constructor(){
        owner = payable(msg.sender);
    }

    /// @notice buys a coffee for contract owner
    /// @dev Explain to a developer any extra details
    /// @param Documents name of the coffee buyer & a nice message
    /// @return Documents the return variables of a contract’s function state variable
    /// @inheritdoc	Copies all missing tags from the base function (must be followed by the contract name)
    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "you haven't entered an amount yet");

        //adds memo to storage
        memos.push(Memo(
            msg.sender;
            block.timestamp;
            _name;
            _message
        ));

        // emits a large event when a new memo is created
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        )
    }

    /// @notice send the balance to the owner
    /// @dev Explain to a developer any extra details
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// @return Documents the return variables of a contract’s function state variable
    function withdrawTips(type name) public {
        require(owner.send(address(this).balance));
        require(msg.sender = owner, "cannot transfer funds as you are not the owner of the funds")

    }

    /// @notice retrieve the list of donors
    /// @dev Explain to a developer any extra details
    /// @param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// @return Documents the return variables of a contract’s function state variable
    function getMemos(type name) public view returns(Memo[] memory) {
        return memos;
    }
}
