"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Lot, Seller } from "@/sanity/types";
import { formatDate, formatNumber } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

export type LotTypeCard = Omit<Lot, "seller"> & { seller?: Seller };

gsap.registerPlugin(ScrollTrigger);

export default function AuctixCard({ lot }: { lot: LotTypeCard }) {
  const cardRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 50%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert(); // Clean up animation context on unmount
  }, []);

  return (
    <li ref={cardRef} className="auctix_card">
      <div className="flex_between">
        <span className="text_span_small">
          Bid Ends: {formatDate(lot.bidEndTime as string)}
        </span>
        <span className="text_span_small">
          Highest Bid:{" "}
          <span className="font-bold">
            N{formatNumber(lot.highestBid as number)}
          </span>
        </span>
      </div>
      <div className="flex_between py-3 gap-5">
        <div>
          <Link
            href={`/seller/${lot?.seller?._id}`}
            className="text-base leading-5"
          >
            @{lot?.seller?.name}
          </Link>
          <Link
            href={`/lots/details/${lot._id}`}
            className="line-clamp-1 text_span_large leading-5"
          >
            {lot.lotName}
          </Link>
        </div>
        <div>
          <Link href={`/seller/${lot?.seller?._id}`}>
            <Image
              src={lot?.seller?.image as string}
              alt={lot?.seller?.name as string}
              className="profile_img"
              width={55}
              height={55}
            />
          </Link>
        </div>
      </div>
      <Link
        href={`/lots/details/${lot._id}`}
        className="line-clamp-1 text_span_des"
      >
        {lot.description}
      </Link>
      <img
        src={urlFor(lot?.lotImage1 as SanityImageSource).url()}
        alt="lotImage1"
        className="lot_card_image my-3"
      />
      <div className="flex_between pt-5 px-2">
        <Link
          href={`/?query=${lot.category?.toLowerCase()}`}
          className="text_category"
        >
          {lot.category}
        </Link>
        <Link href={`/lots/details/${lot._id}`}>
          <Button>View Lot</Button>
        </Link>
      </div>
    </li>
  );
}
