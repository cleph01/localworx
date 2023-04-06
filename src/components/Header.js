import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ArrowBackIosNew, AttachFile, MoreVert } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";

import styled from "styled-components";
import { auth } from "../utils/db/firebaseConfig";
import { connect } from "react-redux";

const Header = ({ user }) => {
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
            <Avatar
                src={user.photoURL}
                referrerPolicy="no-referrer"
                onClick={() => auth.signOut()}
                style={{ pointer: "cursor" }}
            />

            <HeaderInformation>
                <h3>{user.displayName || user.email}</h3>
            </HeaderInformation>
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
                <MenuItem onClick={() => history.push()}>Profile</MenuItem>
                <MenuItem onClick={() => history.push("/hub")}>
                    My account
                </MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </HeaderContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        message: state.message.message,
    };
};

export default connect(mapStateToProps, {})(Header);

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

const HeaderInformation = styled.div`
    margin-left: 1.5rem;
    flex: 1;

    > h3 {
        font-size: 1.4rem;
        margin-bottom: 0.3rem;
    }

    > p {
        font-size: 1.4rem;
        color: #ccc;
        margin: 0;
    }
`;
