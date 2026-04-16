// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title CrosswordStreak
/// @notice Records daily Onchain Crossword completion streaks.
///         One record per player per day (UTC). Consecutive days extend the streak.
/// @dev Deploy on Base. Day 0 = 2026-01-01 00:00:00 UTC (matches frontend dayNumber).
contract CrosswordStreak {
    /// @dev 2026-01-01 00:00:00 UTC in Unix seconds
    uint256 private constant DAY_ORIGIN = 1767225600;

    /// @notice Current streak length for each player
    mapping(address => uint256) public streak;

    /// @notice Day number (0-indexed from DAY_ORIGIN) of the last recorded completion
    mapping(address => uint256) public lastDay;

    event Recorded(address indexed player, uint256 day, uint256 newStreak);

    error AlreadyRecordedToday();
    error TooEarly();

    /// @notice Record today's puzzle completion.
    ///         - Consecutive day from last record → extends streak
    ///         - Non-consecutive → resets streak to 1
    ///         - Same day as last record → reverts
    function record() external {
        if (block.timestamp < DAY_ORIGIN) revert TooEarly();

        uint256 today = (block.timestamp - DAY_ORIGIN) / 1 days;
        uint256 s = streak[msg.sender];
        uint256 last = lastDay[msg.sender];

        // Already recorded today (s > 0 guards against the fresh-account day-0 edge case)
        if (s > 0 && last == today) revert AlreadyRecordedToday();

        // Extend streak if consecutive, otherwise reset to 1
        uint256 newStreak = (s > 0 && last + 1 == today) ? s + 1 : 1;

        streak[msg.sender] = newStreak;
        lastDay[msg.sender] = today;

        emit Recorded(msg.sender, today, newStreak);
    }

    /// @notice Read streak and last completed day for any player
    function getStreak(address player)
        external
        view
        returns (uint256 currentStreak, uint256 lastCompletedDay)
    {
        return (streak[player], lastDay[player]);
    }
}
