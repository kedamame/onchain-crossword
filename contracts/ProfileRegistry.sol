// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title ProfileRegistry
/// @notice Stores Aura Card profile preferences on Base chain
contract ProfileRegistry {
    struct Profile {
        string[] favoriteArtists; // up to 5 artists
        string themeColor;        // hex color e.g. "#7c3aed"
        string frameStyle;        // "minimal" | "glow" | "neon" | "crystal"
        uint256 updatedAt;
    }

    mapping(address => Profile) private _profiles;

    event ProfileUpdated(
        address indexed user,
        string themeColor,
        string frameStyle,
        uint256 updatedAt
    );

    error TooManyArtists();
    error ArtistNameTooLong();
    error InvalidColor();

    function setProfile(
        string[] calldata favoriteArtists,
        string calldata themeColor,
        string calldata frameStyle
    ) external {
        if (favoriteArtists.length > 5) revert TooManyArtists();
        for (uint256 i = 0; i < favoriteArtists.length; i++) {
            if (bytes(favoriteArtists[i]).length > 50) revert ArtistNameTooLong();
        }
        if (bytes(themeColor).length > 7) revert InvalidColor();

        Profile storage p = _profiles[msg.sender];
        delete p.favoriteArtists;
        for (uint256 i = 0; i < favoriteArtists.length; i++) {
            p.favoriteArtists.push(favoriteArtists[i]);
        }
        p.themeColor = themeColor;
        p.frameStyle = frameStyle;
        p.updatedAt = block.timestamp;

        emit ProfileUpdated(msg.sender, themeColor, frameStyle, block.timestamp);
    }

    function getProfile(address user)
        external
        view
        returns (
            string[] memory favoriteArtists,
            string memory themeColor,
            string memory frameStyle,
            uint256 updatedAt
        )
    {
        Profile storage p = _profiles[user];
        return (p.favoriteArtists, p.themeColor, p.frameStyle, p.updatedAt);
    }

    function hasProfile(address user) external view returns (bool) {
        return _profiles[user].updatedAt > 0;
    }
}
