import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    console.log("Listing Created Successfully");
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
