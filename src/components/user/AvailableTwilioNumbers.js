import { useState } from "react";
import Button from "@mui/material/Button";

import styled from "styled-components";
import {
    Box,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import axios from "axios";

const AvailableTwilioNumbers = ({ newClientInfo, setNewClientInfo }) => {
    const [areaCode, setAreaCode] = useState("");
    const [twilioNumbers, setTwilioNumbers] = useState("");
    const [selectedNumber, setSelectedNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setSelectedNumber(event.target.value);
    };

    const handleNumberSearch = (event) => {
        if (areaCode !== "") {
            setLoading(true);

            axios
                .post(
                    "https://us-central1-local-worx.cloudfunctions.net/handleTwilioRequests/available-numbers",
                    {
                        areaCode: areaCode,
                    }
                )
                .then((response) => {
                    console.log("twilio numbers: ", response.data);

                    setTwilioNumbers(response.data);

                    setLoading(false);
                })
                .catch((error) => {
                    console.log("error getting twilio numbers: ", error);

                    setLoading(false);
                });
        } else {
            alert("Area Code is Empty");
        }
    };

    const saveTwilioNumber = () => {
        if (selectedNumber !== "") {
            setLoading(true);

            axios
                .post(
                    "https://us-central1-local-worx.cloudfunctions.net/handleTwilioRequests/available-numbers",
                    {
                        twilioNumber: selectedNumber,
                    }
                )
                .then((response) => {
                    console.log("twilio numbers: ", response.data);

                    setTwilioNumbers(response.data);

                    setLoading(false);
                })
                .catch((error) => {
                    console.log("error getting twilio numbers: ", error);

                    setLoading(false);
                });
        } else {
            alert("Select a Phone Number");
        }
    };

    return (
        <Container>
            <InputWrapper>
                <TextField
                    error={!areaCode}
                    required
                    className="input"
                    label="Area Code"
                    type="text"
                    name="areaCode"
                    placeholder="Area Code"
                    value={areaCode}
                    onChange={(e) => setAreaCode(e.target.value)}
                />
            </InputWrapper>
            <Button onClick={handleNumberSearch}>
                Search Numbers{" "}
                {loading && (
                    <CircularProgress
                        style={{
                            marginLeft: "10px",
                            width: "20px",
                            height: "auto",
                        }}
                    />
                )}
            </Button>

            {twilioNumbers && (
                <Box sx={{ minWidth: 120, maxHeight: 350 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Numbers
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue=""
                            value={selectedNumber}
                            label="Numbers"
                            onChange={handleChange}
                        >
                            {twilioNumbers?.map((number) => (
                                <MenuItem
                                    key={number.phoneNumber}
                                    value={number.phoneNumber}
                                >
                                    {number.friendlyName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            )}
        </Container>
    );
};

export default AvailableTwilioNumbers;

const InputWrapper = styled.div`
    width: 10.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    > .MuiFormControl-root {
        width: 100%;

        > label {
            font-size: var(--p-font);
            font-family: inherit;
        }

        > .MuiInputBase-root {
            > input {
                font-family: inherit;
                text-align: center;
                font-size: var(--p-font);
            }
        }
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;
