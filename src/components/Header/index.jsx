// import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { CryptoState } from '../../CryptoContext';



const Header = () => {
  const { currency, setCurrency } = CryptoState();
  

  return (
    <header className="header">
      <div className="logo">
        <Link to={"/"}>
          <span>
            Rate<span className="dot">.24</span>
          </span>
        </Link>
      </div>
      <div className="select">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // variant="outlined"
          // style={{
          //   width: 100,
          //   height: 40,
          // }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"NGN"}>NGN</MenuItem>
          <MenuItem value={"EUR"}>EUR</MenuItem>
          <MenuItem value={"GBP"}>GBP</MenuItem>
        </Select>
      </div>
    </header>
  );
}

export default Header