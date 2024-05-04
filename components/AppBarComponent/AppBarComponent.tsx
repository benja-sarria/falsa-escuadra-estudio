"use client";
import * as React from "react";
import { signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import { Session } from "next-auth";
import { AutoAdjustImgComponent } from "../AutoAdjustImgComponent/AutoAdjustImgComponent";
import { AnimatedNavbarLogoComponent } from "../AnimatedNavbarLogoComponent/AnimatedNavbarLogoComponent";

import styles from "@/components/AppBarComponent/AppBarComponent.module.scss";
import { ClickAwayListener } from "@mui/material";

const pages = ["Products", "Pricing", "Blog"];
const settings = [
    { name: "Profile", action: () => {} },
    { name: "Account", action: () => {} },
    { name: "Dashboard", action: () => {} },
    { name: "Logout", action: signOut },
];

function AppBarComponent({
    session,

    open,
}: {
    session: Session | null;

    open: Boolean;
}) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const [openedSearch, setOpenedSearch] = React.useState<boolean>(false);

    const searchInputRef = React.useRef(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    React.useEffect(() => {}, [openedSearch]);

    return (
        <AppBar
            position="fixed"
            sx={{
                background: "var(--falsa-escuadra-black)",
                padding: ".5rem 2rem",
                filter: "brightness(1.2)",
                maxHeight: "5rem",
            }}
            className={styles["app-bar-container"]}
        >
            <Container
                maxWidth={"xl"}
                sx={{
                    transition: "all 400ms ease-out",
                    paddingLeft: open ? "12rem !important" : "revert",
                }}
            >
                <Toolbar disableGutters>
                    <AnimatedNavbarLogoComponent
                        variants={["light"]}
                        animatedId="navbar"
                    />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    ></Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: "flex",
                            alignItems: "center",
                            columnGap: "2rem",
                        }}
                    >
                        <ClickAwayListener
                            onClickAway={() => {
                                setOpenedSearch(false);
                                if (searchInputRef.current) {
                                    (
                                        searchInputRef.current as HTMLElement
                                    ).blur();
                                }
                            }}
                        >
                            <div
                                className={`${styles["search-box-menu"]}${
                                    openedSearch
                                        ? ` ${styles["active-search-box"]}`
                                        : ""
                                }${
                                    !openedSearch &&
                                    searchInputRef.current &&
                                    (
                                        searchInputRef.current as unknown as HTMLFormElement
                                    ).value !== ""
                                        ? ` ${styles["has-value"]}`
                                        : ""
                                }`}
                                onClick={
                                    !openedSearch
                                        ? () => {
                                              setOpenedSearch(true);
                                              if (searchInputRef.current) {
                                                  (
                                                      searchInputRef.current as HTMLElement
                                                  ).focus();
                                              }
                                          }
                                        : () => {}
                                }
                            >
                                <label htmlFor="">
                                    Búsqueda
                                    <input type="text" ref={searchInputRef} />
                                </label>
                                <SearchIcon
                                    id="search-icon"
                                    onClick={
                                        !openedSearch
                                            ? () => {
                                                  setOpenedSearch(true);
                                                  if (searchInputRef.current) {
                                                      (
                                                          searchInputRef.current as HTMLElement
                                                      ).focus();
                                                  }
                                              }
                                            : () => {}
                                    }
                                />
                            </div>
                        </ClickAwayListener>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt={
                                        session &&
                                        session.user &&
                                        session?.user.name
                                            ? `${session.user.name}`
                                            : "Remy Sharp"
                                    }
                                    src={
                                        session &&
                                        session.user &&
                                        session?.user.image
                                            ? `${session.user.image}`
                                            : "/img.png"
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    onClick={() => {
                                        setting.action();
                                    }}
                                >
                                    <Typography textAlign="center">
                                        {setting.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppBarComponent;
