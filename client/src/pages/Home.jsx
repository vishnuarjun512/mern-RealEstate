import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingCard";
import "swiper/css/bundle";

const Home = () => {
  const [offersListings, setOfferListings] = useState([]);
  const [salesListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListings = async (stringQuery, func) => {
      try {
        const res = await fetch(`/api/listing/get?${stringQuery}&limit=4`);
        const data = await res.json();
        func(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings("offer=true", setOfferListings);
    fetchListings("type=rent", setRentListings);
    fetchListings("type=sale", setSaleListings);
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col justify-center py-28 px-10 gap-6 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold">
          Find you next <span className="text-slate-400">perfect </span>place{" "}
          <br />
          with ease
        </h1>
        <div className="mt-5 text-xs sm:text-sm md:text-base">
          We will help you to find your new comfortable home to live, fast and
          easy.
          <br />
          Check out out Wide range of properties for you to choose from
        </div>
        <Link
          to={`/search`}
          className="cursor-pointer sm:text-lg text-xs text-blue-800 hover:underline"
        >
          <div>Lets get started, Shall we ... ?</div>
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offersListings &&
          offersListings.length > 0 &&
          offersListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: `cover`,
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offersListings && offersListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offersListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem
                  className="w-[330px]"
                  listing={listing}
                  key={listing._id}
                />
              ))}
            </div>
          </div>
        )}
        {salesListings && salesListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {salesListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
