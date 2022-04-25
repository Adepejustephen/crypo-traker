import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { css } from "@emotion/react";
import GridLoader from "react-spinners/GridLoader";
// import ClipLoader from "react-spinners/ClipLoader";
// import { BallBeat } from "react-pure-loaders";

const Table = () => {
  const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
  const { currency } = CryptoState();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);
    
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
  return (
    <div>
      {loading ? (
        <GridLoader
          color={color}
          loading={loading}
          css={override}
          size={20}
        />
      ) : (
        //   <BallBeat color={"#123abc"} loading={true} />
        <div>hello</div>
      )}
    </div>
  );
};

export default Table;
