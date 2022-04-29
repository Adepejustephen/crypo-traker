import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../../config/api";
import { CryptoState } from "../../../CryptoContext";

 export function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {

    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
    
  };
  useEffect(() => {
    fetchTrendingCoins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

 

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0
    return (
      <Link to={`/coin/${coin.id}`} key={coin.id} className="carousel__item">
        <img src={coin?.image} alt={coin.name} height="80" />
        <span className="coin_icon">
          {coin?.symbol}
          &nbsp;{" "}
          <span
            className="profit__percent"
            style={{ color: profit ? "#58CD08 " : "red" }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>

        <span>
          {symbol}{numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  
  return <div className="carousel">
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      autoPlay
      disableDotsControls
      disableButtonsControls
      items={items}
    responsive={responsive}
    />
  </div>;
};

export default Carousel;
