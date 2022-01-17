import React from "react";
import Image from "next/image";
import styles from "../styles/Main.module.css";
import config from "../dest-config.json";

const CountryMain = ({ country, setCountry }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.topText}>
          Beautiful Places of{" "}
          <span className={styles.countryName}>
            {config[country].displayName}
          </span>
        </div>
        <button
          className={styles.setupButton}
          onClick={() => {
            setCountry("canada");
          }}
        >
          Search Accomodation
        </button>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <Image src={require("../icons/chevron-right.svg")} />
        </div>
        <ul className={styles.placesSlider}>
          {Object.keys(config[country].provinces).map((i) => (
            <li className={styles.listItem} key={i}>
              <div>{config[country].provinces[i].displayName}</div>
              <div>
                <Image
                  src={`${config[country].provinces[i].image}512x256`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CountryMain;
