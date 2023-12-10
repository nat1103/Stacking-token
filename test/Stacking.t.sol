// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {Test} from "forge-std/Test.sol";
import {Stacking} from "../contracts/Stacking.sol";

contract CounterTest is Test {
    Stacking stacking;
    uint256 constant NUMBER_TOKENS = 1e18 * 10e9 ;

    address admin = address(0x256554);
    address user1 = address(0x123456);
    address user2 = address(0x546656);

    /** 
        * @notice Prepare the environment for a stake
        * @param user The user that will stake
        * @param amount The amount to stake
     */
    function prepareAndStake(address user, uint256 amount) internal {
        vm.prank(admin);
        stacking.transfer(user, amount);

        vm.startPrank(user);
        stacking.approve(address(stacking), amount);
        stacking.stake(amount);
    }

    /**
        * @notice Set up the environment for the tests
     */
    function setUp() public {
        vm.prank(admin);
        stacking = new Stacking(NUMBER_TOKENS);
        vm.prank(admin);
        stacking.transfer(address(stacking), NUMBER_TOKENS/2);
    }

    /**
        * @notice Test the stake function
     */
    function testStake() public {
        uint256 amount = 150000;
        prepareAndStake(user1, amount);
        (uint256 _amount , uint256 timestamp) = stacking.stakes(user1);
        assertEq(_amount , amount);
    }

    /**
        * @notice Test the unstake function
        It should revert if the user tries to unstake before 7 days
     */
    function testUnStakeIfInsufficientTimeElapsed() public {
        uint256 amount = 100e18;
        prepareAndStake(user1,amount);

        vm.startPrank(user1);

        vm.expectRevert("You can't unstake yet");
        stacking.unstake();
    }

    /**
        * @notice Test the unstake function
        It should revert if the user doesn't have any tokens to unstake
     */
    function testUnStakeIfNotAmount() public {
        uint256 amount = 100e18;
        vm.prank(user2);
        vm.warp(block.timestamp + 8 days);
        vm.expectRevert("You don't have any tokens to unstake");
        stacking.unstake();

    }

    /**
        * @notice Test the unstake function
        It should transfer the tokens back to the user
     */
    function testUnStake() public {
        uint256 amount = 15000; 
        prepareAndStake(user1, amount);
        vm.warp(block.timestamp + 8 days);
        uint256 reward = stacking.calculateReward(user1);
        stacking.unstake();
        assertEq(stacking.balanceOf(user1), amount + reward);
    }

    /**
        * @notice Test the unstake function
        It should transfer the tokens back to the user if the user unstakes after 365 days
     */
    function testUnStakeMoreThan365Days() public {
        uint256 amount = 15000; 
        prepareAndStake(user1, amount);
        vm.warp(block.timestamp + 365 days);
        uint256 reward = stacking.calculateReward(user1);
        stacking.unstake();
        assertEq(stacking.balanceOf(user1), amount + reward);
    }

    /**
        * @notice Test the unstake function
        It should transfer the tokens back to the user if the user unstakes after 180 days
     */

    function testUnStakeMoreThan180Days() public {
        uint256 amount = 15000; 
        prepareAndStake(user1, amount);
        vm.warp(block.timestamp + 180 days);
        uint256 reward = stacking.calculateReward(user1);
        stacking.unstake();
        assertEq(stacking.balanceOf(user1), amount + reward);
    }

    /**
        * @notice Test the unstake function
        It should transfer the tokens back to the user if the user unstakes after 90 days
     */

    function testUnStakeMoreThan90Days() public {
        uint256 amount = 15000; 
        prepareAndStake(user1, amount);
        vm.warp(block.timestamp + 90 days);
        uint256 reward = stacking.calculateReward(user1);
        stacking.unstake();
        assertEq(stacking.balanceOf(user1), amount + reward);
    }

    /**
        * @notice Test the calculateReward function
        It should return the correct amount of tokens
     */
    function testCalculateReward() public {
        uint256 amount = 1000 ;
        prepareAndStake(user1, amount);
        vm.warp(block.timestamp + 8 days);

        uint256 reward = stacking.calculateReward(user1);
        assertEq(reward, 21);
        assertEq(reward, (amount * 8 * 8 days) / (100 * 30 days));
    }

    /**
        * @notice If the totalSupply is less than the amount to unstake, it should transfer the totalSupply
     */

    function testUnstakeIfTotalSupplyLessThanAmount() public {
        uint256 amount = stacking.balanceOf(admin);
        prepareAndStake(user1, amount);
        vm.warp(block.timestamp + 500000 days);
        stacking.unstake();
        assertEq(stacking.balanceOf(user1), NUMBER_TOKENS);
        assertEq(stacking.balanceOf(address(stacking)), 0);
    }

}
