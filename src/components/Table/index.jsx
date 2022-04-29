import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../Banner/Carousel";


const CurrencyTable = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();

  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);


  function handleSearch() {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  }

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    overflow: hidden;
  `;
  return (
    <div className="table">
      <h4 className="title">Cryptocurrency Prices by Market Cap</h4>
      <input
        id="outlined-basic"
        placeholder="Search a crptocurrency..."
        className="input"
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer>
        {loading ? (
          <HashLoader
            color={"orange"}
            loading={loading}
            css={override}
            size={40}
          />
        ) : (
          //   <BallBeat color={"#123abc"} loading={true} />
          <Table>
            <TableHead style={{ backgroundColor: "#eebc1d" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h >= 0;
                  return (
                    <TableRow
                      key={row.id}
                      onClick={() => {
                        navigate(`/coins/${row.id}`);
                      }}
                    >
                      <TableCell
                        component={"th"}
                        scope="row"
                        align="left"
                        styles={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="30"
                          styles={{ marginButtom: 10 }}
                        />
                        <div className="table__text">
                          <span>{row.symbol}</span>
                          <span>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align={"right"}>
                        <span className="text_white">
                          {symbol}
                          {numberWithCommas(row?.current_price.toFixed(2))}
                        </span>
                      </TableCell>
                      <TableCell
                        align={"right"}
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align={"right"}>
                        <span className="text_white">
                          {symbol}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination
        count={(handleSearch()?.length / 10).toFixed(0)}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop:40,
        }}
        // classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
      {/* <Pagination
        count={(handleSearch()?.length / 10).toFixed(0)}
        variant="outlined"
      /> */}
    </div>
  );
};

export default CurrencyTable;
