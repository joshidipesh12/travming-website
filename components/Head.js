import React, {useEffect} from 'react';
import Head from 'next/head';
import {useDispatch, useSelector} from 'react-redux';
import {getHotelImages} from '../store/hotels';
import {getNearbyImages} from '../store/explore';

function HeadTag({title}) {
  const dispatch = useDispatch();
  const hotelImages = useSelector(state => state.hotel.images);
  const nearbyImages = useSelector(state => state.explore.images);

  useEffect(() => {
    if (!hotelImages.length) dispatch(getHotelImages());
    if (!nearbyImages.length) dispatch(getNearbyImages());
  }, []);

  return (
    <Head>
      <title>TravMing - Round the World, Just A Few Clicks to Go ✈️</title>
      <meta
        property="og:title"
        content="TravMing - Round the World, Just A Few Clicks to Go ✈️"
      />
      <meta name="description" content="Round the World, Just A Few Clicks" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#86989A" />
      <meta
        property="og:image"
        content="https://travming.vercel.app/desktop_ss.png"
      />
      <meta property="og:url" content="https://travming.vercel.app" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <link rel="manifest" href="/manifest.json"></link>
      <link rel="apple-touch-icon" href="/icons/icon.png" />
      <link rel="icon" href="/icons/favicon.ico" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}

export default HeadTag;
