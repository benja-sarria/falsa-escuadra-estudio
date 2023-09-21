import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 13,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 95deg,var(--falsa-escuadra-white) 0%,var(--falsa-escuadra-blue-light) 50%,var(--falsa-escuadra-blue) 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 95deg, var(--falsa-escuadra-white) 0%,var(--falsa-escuadra-blue-light) 50%,var(--falsa-escuadra-blue) 100%)",
            color: "var(--falsa-escuadra-white)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 2,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: "transparent",
    border: "3px solid var(--falsa-escuadra-white)",
    zIndex: 1,
    color: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",

    ...(ownerState.active && {
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {}),
}));

function ColorlibStepIcon(props: StepIconProps, steps: number) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {};
    for (let i = 0; i <= steps; i++) {
        icons[i] = <strong>{`${i}`}</strong>;
    }

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

export const FormStepperComponent = ({ steps }: { steps: string[] }) => {
    return (
        <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={3}
                connector={<ColorlibConnector />}
                color="white"
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            StepIconComponent={(props) => {
                                const icons = ColorlibStepIcon(
                                    props,
                                    steps.length
                                );
                                return icons;
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
};
