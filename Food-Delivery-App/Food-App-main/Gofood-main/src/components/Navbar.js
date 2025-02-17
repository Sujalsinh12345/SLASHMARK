/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar(props) {

    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ 
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", 
                    position: "fixed", 
                    zIndex: "10", 
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    padding: "12px 0"
                }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ 
                      color: "#FC8019", 
                      fontWeight: "700",
                      fontSize: "24px",
                      letterSpacing: "-0.5px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      {/* <img 
                        src= "/lasan.jpg" 
                        alt="Gwissy Logo" 
                        style={{ height: "32px" }}
                      /> */}
                      Gwissy
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link 
                                  className="nav-link" 
                                  aria-current="page" 
                                  to="/" 
                                  style={{ 
                                    color: "#2E3333",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    padding: "8px 12px",
                                    borderRadius: "4px",
                                    transition: "all 0.2s ease",
                                    ':hover': {
                                      backgroundColor: "#FC801910"
                                    }
                                  }}
                                >
                                  Home
                                </Link>
                            </li>
                            {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link 
                                  className="nav-link" 
                                  aria-current="page" 
                                  to="/myorder" 
                                  style={{ 
                                    color: "#2E3333",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    padding: "8px 12px",
                                    borderRadius: "4px",
                                    transition: "all 0.2s ease",
                                    ':hover': {
                                      backgroundColor: "#FC801910"
                                    }
                                  }}
                                >
                                  My Orders
                                </Link>
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="btn mx-1" to="/login" style={{ 
                                    backgroundColor: "#FC8019", 
                                    color: "#FFFFFF",
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    fontWeight: "600"
                                }}>Login</Link>
                                <Link className="btn mx-1" to="/signup" style={{ 
                                    backgroundColor: "#FFFFFF", 
                                    color: "#FC8019",
                                    border: "1px solid #FC8019",
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    fontWeight: "600"
                                }}>Signup</Link>
                            </form> :
                            <div>

                                <div 
                                  className="btn mx-2" 
                                  onClick={loadCart} 
                                  style={{ 
                                    backgroundColor: "#FFFFFF", 
                                    color: "#FC8019",
                                    border: "1px solid #FC8019",
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    fontWeight: "600",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    transition: "all 0.2s ease",
                                    ':hover': {
                                      backgroundColor: "#FC8019",
                                      color: "#FFFFFF"
                                    }
                                  }}
                                >
                                    <Badge color="secondary" badgeContent={items.length} overlap="rectangular">
                                        <ShoppingCartIcon style={{ color: "#FC8019" }} />
                                    </Badge>
                                    Cart
                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                                <button onClick={handleLogout} className="btn" style={{ 
                                    backgroundColor: "#FFFFFF", 
                                    color: "#FC8019",
                                    border: "1px solid #FC8019",
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    fontWeight: "600",
                                    marginLeft: "8px"
                                }}>Logout</button></div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
