import React, { useState } from "react";

import styled from "styled-components";

function ToolTip(props) {
    let timeOut;

    const [active, setActive] = useState(false);

    const showTip = () => {
        setActive(true);

        timeOut = setTimeout(() => {
            setActive(false);
        }, props.delay || 1000);
    };

    // const hideTip = () => {
    //     clearInterval(timeOut);

    //     setActive(false);
    // };

    return (
        <Container
            // When to show the tooltip
            onClick={showTip}
            // onMouseLeave={hideTip}
        >
            {/* Wrapping */}
            {props.children}
            {active && (
                <TooltipTip
                    className={`Tooltip-Tip ${props.direction || "top"}`}
                >
                    {/* Content */}
                    {props.content}
                </TooltipTip>
            )}
        </Container>
    );
}

export default ToolTip;

/* Wrapping */
const Container = styled.div`
    display: inline-block;
    position: relative;
`;
/* Absolute positioning */
const TooltipTip = styled.div`
    position: absolute;
    border-radius: 4px;
    left: 0%;
    transform: translateX(-10%);
    padding: 6px;
    color: #fcfefb;
    background: #37434f;
    font-size: 14px;
    font-family: sans-serif;
    line-height: 1;
    z-index: 100;
    white-space: nowrap;

    ::before {
        content: " ";
        left: 50%;
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-width: 6px;
        margin-left: 6px * -1;

        top: 30px * -1;

        /* top: 100%; */
        border-top-color: #37434f;
    }
`;
