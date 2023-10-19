// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {
    constructor() ERC721("StarNotaryToken", "SNT") {}

    struct Star {
        string name;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;
    uint256[] public starsForSaleList;


    function lookUpTokenIdToStarInfo(uint256 _tokenId) public view returns (string memory) {
        return tokenIdToStarInfo[_tokenId].name;
    }

     function getStarsForSale() public view returns (uint256[] memory) {
        return starsForSaleList;
    }

    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
        address owner1 = ownerOf(_tokenId1);
        address owner2 = ownerOf(_tokenId2);

        require(owner1 == msg.sender || owner2 == msg.sender, "You can only exchange your own Stars");

        _transfer(owner1, owner2, _tokenId1);
        _transfer(owner2, owner1, _tokenId2);
    }

    function transferStar(address _to, uint256 _tokenId) public {
        address owner = ownerOf(_tokenId);
        require(owner == msg.sender, "You can only transfer your own Star");
        _transfer(owner, _to, _tokenId);
    }

    function createStar(string memory _name, uint256 _tokenId) public {
        Star memory newStar = Star(_name);
        tokenIdToStarInfo[_tokenId] = newStar;
        _mint(msg.sender, _tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        address ownerAddress = ownerOf(_tokenId);
        require(ownerAddress == msg.sender, "You can't sell the Star you don't own");
        starsForSale[_tokenId] = _price;
        starsForSaleList.push(_tokenId);
    }
    
    function buyStar(uint256 _tokenId) public payable {
        uint256 starCost = starsForSale[_tokenId];
        require(starCost > 0, "The Star should be up for sale");
        address ownerAddress = ownerOf(_tokenId);
        require(msg.value >= starCost, "Insufficient funds to buy the Star");

        // Transfer the Ether to the owner
        (bool success, ) = payable(ownerAddress).call{value: starCost}("");
        require(success, "Transfer to owner failed");

        // Transfer the Star to the buyer
        _transfer(ownerAddress, msg.sender, _tokenId);
        starsForSale[_tokenId] = 0;
    }
}