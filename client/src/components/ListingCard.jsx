import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-[220px] sm:h-[320px] w-full object-cover hover:scale-105 transition-scale duration-300"
          src={listing.imageUrls[0]}
          alt="Image Url Listing"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-xl text-slate-700 font-semibold truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="text-green-600 h-4 w-4" />
            <p className="text-sm text-gray-600 truncate">{listing.address}</p>
          </div>

          <p className="line-clamp-2 text-sm text-gray-600">
            {listing.description}
          </p>
          <p className="text-slate-500">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" ? "/ month" : ""}
          </p>
          <div className="text-slate-700 flex gap-3">
            <div className="font-bold text-xs">
              {listing.bedrooms} {listing.bedrooms > 1 ? `beds` : `bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms} {listing.bathrooms > 1 ? `baths` : `bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
