"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ContactFormStageType } from "@/types/contactFormTypes";
import { useDispatch } from "react-redux";
import { setStage } from "@/redux/features/website/contact-form-state-slice";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 13,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: `linear-gradient(to right, var(--falsa-escuadra-white), var(--falsa-escuadra-grey-mid-250))`,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "var(--falsa-escuadra-white)",
            color: "var(--falsa-escuadra-white)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 2,
        border: 0,
        backgroundColor: "var(--falsa-escuadra-grey-mid-250)",
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: "transparent",
    border: "3px solid rgba(255, 255, 255, 0.45)",
    zIndex: 1,
    color: "rgba(255, 255, 255, 0.55)",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 400ms ease-out",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,0)",

    "&:hover": {
        color: "#fff",
        border: "3px solid var(--falsa-escuadra-white)",
    },
    ...(ownerState.active && {
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
        color: "#fff",
        border: "3px solid var(--falsa-escuadra-white)",
    }),
    ...(ownerState.completed && {
        color: "#fff",
        border: "3px solid var(--falsa-escuadra-white)",
    }),
}));

function ColorlibStepIcon(
    props: StepIconProps,
    steps: number,
    clickHandler: (selectedStep: ContactFormStageType) => void,
    step: ContactFormStageType
) {
    const { active, completed, className } = props;

    const internalClickHandler = React.useCallback(() => {
        clickHandler(step as ContactFormStageType);
    }, []);

    const icons: { [index: string]: React.ReactElement } = {};
    for (let i = 0; i <= steps; i++) {
        icons[i] = <strong>{`${i}`}</strong>;
    }

    return (
        <button
            onClick={internalClickHandler}
            type="button"
            aria-label={`stage ${steps}`}
            style={{
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                padding: "none",
                borderRadius: "100%",
            }}
        >
            <ColorlibStepIconRoot
                ownerState={{ completed, active }}
                className={className}
            >
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        </button>
    );
}

export const FormStepperComponent = () => {
    const steps: ContactFormStageType[] = [1, 2, 3, 4, 5, 6];
    const currentStep = useAppSelector(
        (state) => state.contactFormState.value.stage
    );

    const dispatch = useDispatch<AppDispatch>();

    const clickHandler = (selectedStep: ContactFormStageType) => {
        dispatch(setStage(selectedStep));
    };
    return (
        <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={currentStep - 1}
                connector={<ColorlibConnector />}
                color="white"
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            StepIconComponent={(props) => {
                                const icons = ColorlibStepIcon(
                                    props,
                                    steps.length,
                                    clickHandler,
                                    label
                                );
                                return icons;
                            }}
                        ></StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
};
