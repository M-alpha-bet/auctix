import AuctixCard, { LotTypeCard } from "@/components/AuctixCard";
import BidForLotButton from "@/components/BidForLotButton";
import { formatDate, formatNumber } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { LOT_BY_ID_QUERY, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { notFound } from "next/navigation";
import React from "react";
import type { Metadata } from "next";
import SplitTextEntrance from "@/components/ui/SplitText";

export const experimental_ppr = true;

export default async function page({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const id = (await params)._id;

  const [lot, { select: rareLots }] = await Promise.all([
    client.fetch(LOT_BY_ID_QUERY, { _id: id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!lot) return notFound();

  return (
    <>
      <section className="pink_container pattern min-h-[400px]">
        <div className="tag">
          <h2 className="tag_tri">{formatDate(lot.bidEndTime as string)}</h2>
        </div>
        <SplitTextEntrance
          text={lot.lotName}
          className="dark_bg_container heading"
        />
      </section>

      <section className="mx-10 md:mx-20 mt-10 md:flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={lot.seller.image}
            alt="seller image"
            className="profile_img h-[55px] w-[55px]"
          />
          <div>
            <p className="text_span_medium">{lot.seller.name}</p>
            <p>@{lot.seller.email}</p>
          </div>
        </div>
        <div className="md:pt-0 pt-6">
          <p>Category</p>
          <p className="text_span_large">{lot.category}</p>
        </div>
      </section>
      <section className="w-[95%] mt-12 mx-auto border border-gray-300 rounded-lg">
        <div className="md:px-4 md:py-28 py-12 md:flex items-stretch">
          {/* Left Content */}
          <div className="md:w-[60%] px-5 md:space-y-20 space-y-16 md:flex md:flex-col justify-between">
            <div>
              <h2 className="font-bold uppercase md:text-3xl text-2xl">
                {lot.lotName}
              </h2>
              <p className="text_span_des pt-2 md:pt-6 md:pr-10">
                {lot.description}
              </p>
            </div>

            <div className="md:flex_between items-start flex w-full gap-8 md:pr-10">
              <div className="w-[50%]">
                <p className="text_span_medium border-t pt-2 border-gray-300">
                  Origin
                </p>
                <p className="md:text-base text-[14px] font-light">
                  {lot.origin}
                </p>
              </div>
              <div className="w-[50%]">
                <p className="text_span_medium border-t pt-2 border-gray-300">
                  Material
                </p>
                <p className="md:text-base text-[14px] font-light">
                  {lot.material}
                </p>
              </div>
            </div>

            <div className="md:flex_between items-start flex w-full gap-8 md:pr-10">
              <div className="w-[50%]">
                <p className="text_span_medium border-t pt-2 border-gray-300">
                  Dimensions
                </p>
                <p className="md:text-base text-[14px] font-light">
                  {lot.dimension}
                </p>
              </div>
              <div className="w-[50%]">
                <p className="text_span_medium border-t pt-2 border-gray-300">
                  Finish
                </p>
                <p className="md:text-base text-[14px] font-light">
                  {lot.finish}
                </p>
              </div>
            </div>

            <div className="md:flex_between items-start flex w-full gap-8 md:pr-10">
              <div className="w-[50%]">
                <p className="text_span_medium border-t pt-2 border-gray-300">
                  Includes
                </p>
                <p className="md:text-base text-[14px] font-light">
                  {lot.includes}
                </p>
              </div>
              <div className="w-[50%]">
                <p className="text_span_medium border-t pt-2 border-gray-300">
                  Considerations
                </p>
                <p className="md:text-base text-[14px] font-light">
                  {lot.considerations}
                </p>
              </div>
            </div>
          </div>

          {/* Right (Images) */}
          <div className="md:w-[40%] h-full flex mt-10">
            <div className="grid grid-cols-2 gap-5 w-full h-full">
              <img
                className="w-full h-full object-cover"
                src={urlFor(lot.lotImage1 as SanityImageSource).url()}
                alt="lotImage1"
              />
              <img
                className="w-full h-full object-cover"
                src={urlFor(lot.lotImage2 as SanityImageSource).url()}
                alt="lotImage2"
              />
              <img
                className="w-full h-full object-cover"
                src={urlFor(lot.lotImage3 as SanityImageSource).url()}
                alt="lotImage3"
              />
              <img
                className="w-full h-full object-cover"
                src={urlFor(lot.lotImage4 as SanityImageSource).url()}
                alt="lotImage4"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:w-[30%] w-[70%] mx-auto space-y-4">
          <BidForLotButton
            bidEndTime={formatDate(lot.bidEndTime as string)}
            id={lot._id}
            highestBid={lot.highestBid}
          />
          <div className="text_category py-10 w-full text-center mb-10">
            Highest Bid:{" "}
            <span className="font-medium">N{formatNumber(lot.highestBid)}</span>
          </div>
        </div>
      </section>
      {rareLots?.length > 0 && (
        <div className="max-w-4xl mt-20 w-[95%] mx-auto">
          <p className="font-semibold text-[30px]">Most Anticipated</p>

          <ul className="mt-7 card_grid-sm">
            {rareLots.map((lot: LotTypeCard) => (
              <AuctixCard key={lot?._id} lot={lot} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ _id: string }>;
}): Promise<Metadata> {
  const id = (await params)._id;

  const lot = await client.fetch(LOT_BY_ID_QUERY, { _id: id });

  return {
    title: lot.lotName,
    description: lot.description,
  };
}
