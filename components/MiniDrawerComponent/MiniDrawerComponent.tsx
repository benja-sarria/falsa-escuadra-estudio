"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MailIcon from "@mui/icons-material/Mail";
import { Session } from "next-auth";
import AppBarComponent from "../AppBarComponent/AppBarComponent";
import { AdminSectionType } from "@/types/adminSectionTypes";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

import styles from "@/components/MiniDrawerComponent/MiniDrawerComponent.module.scss";

import {
    selectActiveSection,
    resetActiveSection,
    AvailableSectionsType,
} from "@/redux/features/admin-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { AdminFrameComponent } from "../AdminFrameComponent/AdminFrameComponent";
import { Tooltip } from "@mui/material";
import { FormStepperContainer } from "@/containers/FormStepperContainer/FormStepperContainer";
import { ProductsSectionContainer } from "@/containers/ProductsSectionContainer/ProductsSectionContainer";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function MiniDrawerComponent({
    session,
    enabledSections,
    children,
}: {
    session: Session | null;
    enabledSections: AdminSectionType;
    children: React.ReactNode;
}) {
    const section = useAppSelector((state) => state.activeSection.value);
    const theme = useTheme();
    const highlightRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState(section);

    const dispatch = useDispatch<AppDispatch>();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (highlightRef.current) {
            switch (enabledSections.indexOf(section as any)) {
                case 0:
                    (highlightRef.current as HTMLElement).style.top = "4%";
                    break;

                case 1:
                    (highlightRef.current as HTMLElement).style.top = "27%";

                    break;

                case 2:
                    (highlightRef.current as HTMLElement).style.top = "50%";

                    break;
                case 3:
                    (highlightRef.current as HTMLElement).style.top = "73%";
                    break;
                default:
                    (highlightRef.current as HTMLElement).style.top = "4%";
                    break;
            }
        }
    }, [section]);

    React.useEffect(() => {
        const activeSection = sessionStorage.getItem(
            "currentSection"
        ) as AvailableSectionsType;
        if (activeSection) {
            dispatch(selectActiveSection(activeSection));
        }
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
            }}
            className={styles["admin-container"]}
        >
            <CssBaseline />

            <Drawer
                variant="permanent"
                open={open}
                id="asdasd"
                sx={{
                    ".MuiDrawer-paperAnchorLeft": {
                        backgroundColor:
                            "var(--falsa-escuadra-black) !important",
                    },
                }}
            >
                <DrawerHeader
                    sx={{
                        backgroundColor: "var(--falsa-escuadra-grey)",
                    }}
                >
                    <ListItemText
                        primary={"Administrar"}
                        sx={{
                            opacity: open ? 0.6 : 0,
                            color: "var(--falsa-escuadra-white)",
                            padding: "0rem .5rem",
                            span: { fontWeight: "600 !important" },
                        }}
                    />
                    {open ? (
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon
                                sx={{
                                    color: "var(--falsa-escuadra-white)",
                                    minHeight: "4rem",
                                }}
                            />
                        </IconButton>
                    ) : (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                color: "var(--falsa-escuadra-white)",
                                minHeight: "4.8rem",
                                ...(open ? { display: "none" } : {}),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    {/*  <IconButton onClick={handleDrawerClose}>
                       
                        {theme.direction === "rtl" ? (
                           
                        ) : (
                          
                            
                        )}
                    </IconButton> */}
                </DrawerHeader>
                <Divider />
                <List
                    sx={{
                        backgroundColor: "var(--falsa-escuadra-black)",
                        borderColor: "var(--falsa-escuadra-black)",
                        position: "relative",
                    }}
                >
                    {enabledSections.map((text, index) => (
                        <ListItem
                            key={text}
                            disablePadding
                            sx={{
                                display: "block",
                                zIndex: 2,
                                transition: "all 400ms ease-out",
                                "&:hover": {
                                    animationName: "tiltSelect",
                                    animationIterationCount: "infinite",
                                    animationDuration: "1.2s",
                                },
                            }}
                            onClick={() => {
                                sessionStorage.setItem("currentSection", text);
                                dispatch(selectActiveSection(text));
                            }}
                        >
                            <Tooltip
                                title={
                                    open
                                        ? ""
                                        : text === "products"
                                        ? "Productos"
                                        : text === "dashboard"
                                        ? "Inicio"
                                        : text === "users"
                                        ? "Usuarios"
                                        : text === "profile"
                                        ? "Perfil"
                                        : "placeholder"
                                }
                                placement="left"
                                arrow
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                            color: "var(--falsa-escuadra-white)",
                                        }}
                                    >
                                        {text === "products" ? (
                                            <CarpenterIcon />
                                        ) : text === "dashboard" ? (
                                            <DashboardIcon />
                                        ) : text === "users" ? (
                                            <PeopleAltIcon />
                                        ) : text === "profile" ? (
                                            <FingerprintIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            text === "products"
                                                ? "Productos"
                                                : text === "dashboard"
                                                ? "Inicio"
                                                : text === "users"
                                                ? "Usuarios"
                                                : text === "profile"
                                                ? "Perfil"
                                                : "placeholder"
                                        }
                                        sx={{
                                            opacity: open ? 1 : 0,
                                            color: "var(--falsa-escuadra-white)",
                                        }}
                                    />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    ))}
                    <div
                        className={`${styles["selected-section-highlight"]}`}
                        ref={highlightRef}
                    ></div>
                </List>
                <Divider />
            </Drawer>
            <Box
                component="main"
                id="admin-main-content"
                sx={{
                    flexGrow: 1,
                    padding: "6rem 3rem 2rem 2rem",
                    position: "relative",
                    backgroundColor: "var(--falsa-escuadra-blue-dark)",
                    minHeight: "100vh",
                    maxHeight: "100vh",
                    overflow: "hidden",
                }}
            >
                <AppBarComponent session={session} open={open} />
                <AdminFrameComponent section={section} open={open}>
                    {children}
                </AdminFrameComponent>
            </Box>
        </Box>
    );
}
