pragma solidity ^0.8.23;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Stacking is ERC20 {

    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }
    
    mapping(address => Stake) public stakes;
    
    constructor(uint256 initialSupply) ERC20("FalzarMoney", "FMY") {
        _mint(msg.sender, initialSupply);
    }

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    function calculateReward(address _account) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - stakes[_account].timestamp;
        uint256 amount = stakes[_account].amount;
        uint256 bonus = 8;
        if(timeElapsed > 365 days) {
            bonus = 20;
        } else if(timeElapsed > 180 days) {
            bonus = 15;
        } else if(timeElapsed > 90 days) {
            bonus = 12;
        }
        uint256 reward = (amount * bonus * timeElapsed) / (100 * 30 days);
        return reward;
    }
    /**
        * @notice Stake tokens
        * @param _amount The amount to stake
     */
    function stake(uint256 _amount) public {
        this.transferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender].amount += _amount;
        stakes[msg.sender].timestamp = block.timestamp;
        emit Staked(msg.sender, _amount);
    }

    /**
        * @notice Unstake tokens after 7 days
    */
    
    function unstake() public {
        uint256 total = calculateReward(msg.sender) + stakes[msg.sender].amount;
        uint256 _amount = stakes[msg.sender].amount;
        require(stakes[msg.sender].timestamp + 7 days < block.timestamp, "You can't unstake yet");
        require(_amount > 0, "You don't have any tokens to unstake");

        if(balanceOf(address(this)) < total) {
            total = balanceOf(address(this));
        }
        this.transfer(msg.sender, total);
        stakes[msg.sender].amount = 0;

        emit Unstaked(msg.sender,total);
    }
}