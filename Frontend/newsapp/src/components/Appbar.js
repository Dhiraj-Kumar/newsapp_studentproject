import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import logo from "../images/logo.png";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Moment from "moment";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import InstagramIcon from "@mui/icons-material/Instagram";
import morning from "../images/sun.png";
import afternoon from "../images/sunrise.png";
import evening from "../images/moon.png";
import night from "../images/sleeping.png";
import config from './config'
import LockResetIcon from "@mui/icons-material/LockReset";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const drawerWidth = 270;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  color: "black",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#D7EDE9",
  "&:hover": {
    backgroundColor: "#A3D0F7",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "80%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Appbar(props) {
  const fn=localStorage.getItem('fn')
  const ln=localStorage.getItem('ln')
  const name = fn + " " + ln
  const loginby = localStorage.getItem('loginby')
  let loginCheck = true; 
  if(loginby==='google'){
    loginCheck = false;
  }
  let navigate = useNavigate();
  const [searching, setSearching] = useState("");
  const [auth, setAuth] = useState(false);
  
  const isauth = () => {
    // console.log(auth)
    axios
      .post(`${config.auth}/isAuthenticated`, {
        headers: document.cookie,
      })
      .then(({ data }) => {
        console.log("data is", data.isAuthenticated);
        setAuth(data.isAuthenticated);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    isauth();
  }, []);

  const logout = async() => {
     if(loginby==='google'){
      let allCookies = document.cookie.split(";");
      console.log(document.cookie)
      for (let i = 0; i < allCookies.length; i++) {
      document.cookie =
        allCookies[i] + "=;expires=" + new Date(0).toUTCString();
      }
      localStorage.clear();
      const url = `${config.auth}/google/logout`;
			const { data } = await axios.get(url, { withCredentials: true }) 
      navigate(0);
     }
     if(loginby==='authdb'){
      let allCookies = document.cookie.split(";");
      for (let i = 0; i < allCookies.length; i++) {
      document.cookie =
        allCookies[i] + "=;expires=" + new Date(0).toUTCString();
      }
      localStorage.clear();
      navigate(0);
     }
    
  };


  const changeP=()=>{
    navigate('/changepassword')
  }
  var day = new Date();
  var timewish = day.getHours();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div
      style={{
        backgroundColor: "#004262",
        color: "white",
        height: "100vh",
      }}
    >
      <div className="container d-flex justify-content-center align-items-center flex-column mt-1">
        <img src={logo} alt="logo" width={65} height={65} />
        <h2 className="dash-head mb-4">Newsly</h2>
        {timewish > 4 && timewish < 12 ? (
          <h5 className="dash-wish dash-name">
            <img src={morning} width={35} height={35} alt="wish" /> Good Morning
          </h5>
        ) : timewish >= 12 && timewish < 16 ? (
          <h5 className="dash-wish dash-name">
            <img src={afternoon} width={35} height={35} alt="wish" /> Good
            Afternoon
          </h5>
        ) : timewish >= 16 && timewish < 19 ? (
          <h5 className="dash-wish dash-name">
            <img src={evening} width={35} height={35} alt="wish" /> Good Evening
          </h5>
        ) : (
          <h5 className="dash-wish dash-name">
            <img src={night} width={35} height={35} alt="wish" /> Good Night
          </h5>
        )}
        <h4 className="dash-name mb-4">{(auth)? name : "Guest"}</h4>

        <h5>{Moment().format("dddd")}</h5>
        <h6>{Moment().format("LLL")}</h6>
      </div>

      <div className="list mt-3 fw-bold   ">
        <ul
          style={{
            backgroundColor: "#004262",
            height: "55vh",
            listStyle: "none",
          }}
        >
          <li>
            <NavLink
              className="btn dash-list"
              activeclassname="active-link"
              to="/dashboardpage"
            >
              <i className="fa-solid fa-house-user"></i> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="btn dash-list"
              activeclassname="active-link"
              to="/favoritespage"
            >
              <i className="fa-solid fa-heart"></i> Favourites
            </NavLink>
          </li>
          <li>
            <NavLink
              className="btn dash-list"
              activeclassname="active-link"
              to="/businessnews"
            >
              <i className="fa-solid fa-briefcase"></i> Business
            </NavLink>
          </li>
          <li>
            <NavLink
              className="btn dash-list"
              activeclassname="active-link"
              to="/sportsnews"
            >
              <i className="fa-solid fa-baseball-bat-ball"></i> Sports
            </NavLink>
          </li>
          <li>
            <NavLink
              className="btn dash-list"
              activeclassname="active-link"
              to="/sciencenews"
            >
              <i className="fa-solid fa-flask-vial"></i> Science
            </NavLink>
          </li>
          <li>
            <NavLink
              className="btn dash-list"
              activeclassname="active-link"
              to="/technologynews"
            >
              <i className="fa-solid fa-robot"></i> Technology
            </NavLink>
          </li>
          <li>
            <NavLink
              className="btn dash-list"
              activeclassname="active-link"
              to="/healthnews"
            >
              <i className="fa-solid fa-heart-pulse"></i> Health
            </NavLink>
          </li>
          <li>
            <NavLink
              className="btn dash-list"
              activeclassname="active-link"
              to="/generalnews"
            >
              <i className="fa-solid fa-newspaper"></i> General
            </NavLink>
          </li>
          <li>
            <NavLink
              className="btn dash-list"
              activeclassname="active-link"
              to="/entertainmentnews"
            >
              <i className="fa-solid fa-gamepad"></i> Entertainment
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );



  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {auth ? (
        <div>
        {loginCheck ? (
          <div>
          <MenuItem>
            <LockResetIcon style={{ color: "#004262", fontSize: "1.4rem" }} />
            <p
              className="text-dark fw-bold mt-2 "
              style={{ cursor: "pointer", fontSize: "1rem" }}
              onClick={changeP.bind(this)}
            >
              &nbsp; Change Password
            </p>
          </MenuItem>
          </div>
        ): (<div> </div>) }
          
          <MenuItem>
            <i
              className="fa-solid fa-right-from-bracket"
              style={{ color: "#004262", fontSize: "1.2rem" }}
              onClick={logout.bind(this)}
            ></i>
            <p
              className="text-dark fw-bold mt-2 "
              style={{ cursor: "pointer", fontSize: "1rem" }}
              onClick={logout.bind(this)}
            >
            &nbsp; Sign Out
            </p>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            
              <i
                className="fa-solid fa-right-to-bracket"
                style={{ color: "#004262", fontSize: "1.1rem" }}
                onClick={() => {
                  navigate("/loginpage");
                }}
              ></i>

              <p
                className="text-dark fw-bold mt-2 "
                style={{ cursor: "pointer", fontSize: "1rem" }}
                onClick={() => {
                  navigate("/loginpage");
                }}
              >
              &nbsp; Sign In
              </p>
          
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <a
            href="https://www.facebook.com/bbcnews"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon style={{ color: "#004262" }} />
          </a>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <a
            href="https://www.instagram.com/BBC/"
            rel="noreferrer"
            target="_blank"
          >
            {" "}
            <InstagramIcon style={{ color: "#004262" }} />
          </a>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <a href="https://twitter.com/BBC" rel="noreferrer" target="_blank">
            {" "}
            <TwitterIcon style={{ color: "#004262" }} />
          </a>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ManageAccountsIcon style={{ color: "#004262" }} />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              onChange={(e) => {
                setSearching(e.target.value);
              }}
            />
          </Search>
          <Link to={`/searching/${searching}`} className="btn btn-secondary">
            Search
          </Link>


       
         
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit">
              <a
                href="https://www.facebook.com/bbcnews"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon style={{ color: "#004262" }} />
              </a>
            </IconButton>
            <IconButton size="large" color="inherit">
              <a
                href="https://www.instagram.com/BBC/"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <InstagramIcon style={{ color: "#004262" }} />
              </a>
            </IconButton>
            <IconButton size="large" color="inherit">
              <a
                href="https://twitter.com/BBC"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <TwitterIcon style={{ color: "#004262" }} />
              </a>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <ManageAccountsIcon style={{ color: "#004262" }} />
            </IconButton>

          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ color: "black", marginRight: "2rem" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "100%",
              borderRadius: "0 7px 7px 0",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Appbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Appbar;
