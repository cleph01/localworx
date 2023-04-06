import { useState } from "react";

import { useParams, useHistory } from "react-router-dom";
import { ArrowBackIosNew, AttachFile, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";

import styled from "styled-components";
import { doc } from "firebase/firestore";
import { db } from "../../utils/db/firebaseConfig";

import { useDocument } from "react-firebase-hooks/firestore";
import Recipient from "./Recipient";

const Header = ({ openChatScreen, setOpenChatScreen }) => {
    const { businessId, chatId } = useParams();

    const history = useHistory();

    const handleRedirect = (path) => {
        history.push(path);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <HeaderContainer>
            {openChatScreen && (
                <ArrowBackIosNew
                    onClick={() => setOpenChatScreen((prev) => !prev)}
                    sx={{}}
                />
            )}
            <Recipient chatId={chatId} />
            <HeaderIcons>
                <IconButton onClick={handleMenuClick}>
                    <MoreVert />
                </IconButton>
            </HeaderIcons>
            {/* MUI Menu */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "menu-button",
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </HeaderContainer>
    );
};

export default Header;

const HeaderIcons = styled.div`
    > .MuiButtonBase-root > .MuiSvgIcon-root {
        font-size: var(--icon-font-size);
    }
`;

const HeaderContainer = styled.div`
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 100;
    display: flex;
    padding: 1.1rem;
    height: 8rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid whitesmoke;

    > .MuiSvgIcon-root[data-testid="ArrowBackIosNewIcon"] {
        font-size: 1.5rem;
        /* display: block;*/

        // hides back arrow in big screens
        @media (min-width: 420px) {
            display: none;
        }
    }
`;
