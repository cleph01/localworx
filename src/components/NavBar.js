import styled from "styled-components";

function NavBar({ businessInfo }) {
    return (
        <Container style={{ backgroundColor: businessInfo.navBarColor }}>
            <LogoWrapper>
                <Logo src={businessInfo.logoUrl} alt="logo" />
            </LogoWrapper>
            <NavbarBody>
                <div className="nav__btn">
                    <a
                        href={businessInfo.website}
                        style={{
                            color: businessInfo.backBtnColor,
                            fontWeight: "700",
                        }}
                    >
                        Go Back
                    </a>
                </div>
            </NavbarBody>
        </Container>
    );
}

export default NavBar;

const Logo = styled.img`
    width: 75px;
    height: auto;
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
    background-color: #0095ce;
    position: fixed;
    top: 0;
    box-shadow: 0 1px 6px -2px #000;
    z-index: 1;
`;
