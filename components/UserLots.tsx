import { client } from "@/sanity/lib/client";
import { LOTS_BY_SELLER_QUERY } from "@/sanity/lib/queries";
import React from "react";
import AuctixCard, { LotTypeCard } from "./AuctixCard";

export default async function UserLots({ id }: { id: string }) {
  const lots = await client.fetch(LOTS_BY_SELLER_QUERY, {
    _id: id,
  });

  return (
    <div>
      <ul className="auctix_card_container mt-7">
        {lots.length > 0 ? (
          lots.map((lot: LotTypeCard) => (
            <AuctixCard key={lot?._id} lot={lot} />
          ))
        ) : (
          <p>No lots found</p>
        )}
      </ul>
    </div>
  );
}
