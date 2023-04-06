import { useState } from "react";

import { useHistory } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { auth } from "../utils/db/firebaseConfig";
import styled from "styled-components";

function NavBar({ user }) {
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleRedirect = (path) => {
        history.push(path);
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        auth.signOut();

        history.push("/login");
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container>
            <LogoWrapper onClick={() => history.push("/demo")}>
                <img className="logo" src="/logo.png" alt="logo" />
            </LogoWrapper>
            <NavbarBody>
                <Button onClick={() => history.push("/demo/text")}>
                    Text Demo
                </Button>
                <Button
                    onClick={() =>
                        handleRedirect(`/demo/business/add/${user.userId}`)
                    }
                >
                    Add Business
                </Button>
                <Button
                    onClick={() =>
                        handleRedirect(`/demo/clients/all/${user.userId}`)
                    }
                >
                    My Clients
                </Button>
                <SignOutButton
                    onClick={handleSignOut}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSignOut();
                        }
                    }}
                >
                    Sign Out
                </SignOutButton>
            </NavbarBody>
            <MenuWrapper onClick={handleClick}>
                <MenuIcon sx={{ fontSize: "2rem" }} />
            </MenuWrapper>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={() => handleRedirect("/demo/text")}>
                    Text Demo
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleRedirect(`/demo/business/add/${user.userId}`)
                    }
                >
                    Add Business
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleRedirect(`/demo/clients/all/${user.userId}`)
                    }
                >
                    My Clients
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
        </Container>
    );
}

export default NavBar;

const MenuWrapper = styled.div`
    color: #bcc0bc;
    width: 50px;

    @media (min-width: 600px) {
        display: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Button = styled.div`
    text-align: center;
    width: fit-content;
    font-size: small;
    margin-left: 10px;
    // background-color: #bcc0bc;
    color: #78787a;
    border: 1px solid #bcc0bc;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
`;
const SignOutButton = styled(Button)`
    color: #c90404;
`;

const NavbarBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const LogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    z-index: 1;
    width: 100%;
    height: 75px;
    color: #ffffff;
    padding: 10px;
    display: flex;
    padding: 0px 20px;

    justify-content: space-between;
    // background-color: $primary;
    // background-color: #3674b3;
    // background-color: #00a4d9;
    background-color: #0095ce;
    position: fixed;
    top: 0;
    box-shadow: 0 1px 6px -2px #000;
    z-index: 1;
`;
