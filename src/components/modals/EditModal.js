import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { db } from "../../utils/db/firebaseConfig";
import styled from "styled-components";

const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 355,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function EditModal({
    openEditModal,
    setOpenEditModal,
    targetBusiness,
    setOpenSnackBar,
    setAlertMsg,
    setBusinesses,
}) {
    console.log("Target Business: ", targetBusiness);

    const [newClientInfo, setNewClientInfo] = useState();

    const handleChange = (event) => {
        const name = event.target.name;
        setNewClientInfo({
            ...newClientInfo,
            [name]: event.target.value,
        });
    };

    const handleCloseEditModal = () => setOpenEditModal(false);

    const handleSubmit = () => {
        db.collection("businesses")
            .doc(targetBusiness.businessId)
            .update(newClientInfo)
            .then(() => {
                setBusinesses((prevState) => {
                    return prevState.map((business) => {
                        var temp = Object.assign({}, business);

                        if (business.businessId === targetBusiness.businessId) {
                            console.log("Pre Temp: ", temp);
                            temp = { ...temp, ...newClientInfo };
                            console.log("Post Temp: ", temp);
                        }

                        return temp;
                    });
                });

                setAlertMsg({
                    message: `Successfully Updated Business Info`,
                    severity: "success",
                });

                setOpenSnackBar(true);
            })
            .catch((error) => {
                setAlertMsg({
                    message: "Error Updating Business Info",
                    severity: "error",
                });

                setOpenSnackBar(true);

                console.log("Error updating Text Page Url: ", error);
            });

        setOpenEditModal(false);
    };

    useEffect(() => {
        if (targetBusiness) {
            setNewClientInfo({
                businessName: targetBusiness.businessName,
                businessCell: targetBusiness.businessCell,
                website: targetBusiness.website,
                logoUrl: targetBusiness.logoUrl,
                backBtnColor: targetBusiness.backBtnColor,
                navBarColor: targetBusiness.navBarColor,
            });
        }
        return () => {
            setNewClientInfo(null);
        };
    }, [targetBusiness]);

    console.log("New Client INfo: ", newClientInfo);

    return (
        <Modal
            open={openEditModal}
            onClose={handleCloseEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <InputWrapper>
                    <h3 style={{ marginBottom: "35px" }}>
                        Edit Business Details
                    </h3>

                    <TextField
                        className="input"
                        label="Business Name"
                        type="text"
                        name="businessName"
                        placeholder="Enter New Business Name"
                        value={newClientInfo?.businessName}
                        onChange={handleChange}
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextField
                        className="input"
                        label="Receiver of Text Message"
                        type="tel"
                        name="businessCell"
                        placeholder="Receiver of Text Message"
                        value={newClientInfo?.businessCell}
                        inputProps={{ maxLength: 10 }}
                        onChange={handleChange}
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextField
                        className="input"
                        label="New Website Address"
                        type="text"
                        name="website"
                        placeholder="Enter Client Website Address"
                        value={newClientInfo?.website}
                        onChange={handleChange}
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextField
                        className="input"
                        label="URL of Logo"
                        type="text"
                        name="logoUrl"
                        placeholder="Enter Logo URL"
                        value={newClientInfo?.logoUrl}
                        onChange={handleChange}
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextField
                        className="input"
                        label="Back Button Hex Code"
                        type="text"
                        name="backBtnColor"
                        placeholder="Enter Customer Name"
                        value={newClientInfo?.backBtnColor}
                        onChange={handleChange}
                    />
                </InputWrapper>
                <InputWrapper>
                    <TextField
                        className="input"
                        label="Nav Bar Color Hex Code"
                        type="text"
                        name="navBarColor"
                        placeholder="Enter Nav Bar Color Hex Code"
                        value={newClientInfo?.navBarColor}
                        onChange={handleChange}
                    />
                </InputWrapper>

                <ButtonGroup>
                    <EditButton onClick={handleSubmit}>Submit</EditButton>
                    <CancelButton onClick={handleCloseEditModal}>
                        Cancel
                    </CancelButton>
                </ButtonGroup>
            </Box>
        </Modal>
    );
}

export default EditModal;

const ButtonGroup = styled.div`
    display: "flex";
    flex-direction: row;
    justify-content: "space-around";
    align-items: "center";
    margin-top: "15px";
`;

const Button = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #fcfcfc;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin-top: 20px;
`;

const EditButton = styled(Button)`
    background: #68cb61;
`;

const CancelButton = styled(Button)`
    background: #bb3133;
`;

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;
