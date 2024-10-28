// pages/api/listings.js
import { Listing } from "@/models/Listing";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'POST') {
    const { address, coordinates, createdBy } = req.body;

    if (!address || !coordinates || !createdBy) {
      return res.status(400).json({ message: "Address, coordinates, and createdBy are required." });
    }

    try {
      const listingDoc = await Listing.create({
        address,
        coordinates,
        createdBy,
      });
      res.status(201).json(listingDoc); // Return 201 for created
    } catch (error) {
      console.error("Error adding listing:", error);
      res.status(500).json({ message: "Error adding listing", error });
    }
  }

  // PUT: Update an existing listing by ID
  if (method === 'PUT') {
    const { address, coordinates, _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "Listing ID is required." });
    }

    try {
      const listingDoc = await Listing.updateOne({ _id }, { address, coordinates });
      res.status(200).json(listingDoc);
    } catch (error) {
      console.error("Error updating listing:", error);
      res.status(500).json({ message: "Error updating listing", error });
    }
  }
}
