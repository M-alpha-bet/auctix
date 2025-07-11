import { auth } from "@/auth";
import UserLots from "@/components/UserLots";
import { client } from "@/sanity/lib/client";
import { SELLER_PAGE_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import React, { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";

export default async function SellersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);

  const session = await auth();

  const user = await client.fetch(SELLER_PAGE_BY_ID_QUERY, {
    id: id as string,
  });

  if (!user) return;
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h1 className="line-clamp-1 text-center text-black font-bold text-2xl uppercase">
              {user?.name}
            </h1>
          </div>
          <Image
            src={user.image}
            alt={user.name}
            width={200}
            height={200}
            className="profile_image"
          />
          <div className="text-[20px] text-center text-[#fffaf5] mt-5">
            <p>{`@${user.username}`}</p>
          </div>
          <p className="text-[15px] text-center text-[#fffaf5] mt-1">
            {user.bio}
          </p>
        </div>

        <div className="flex-1 flex-col flex lg:-mt-5">
          <p className="text-[25px] font-bold">
            {session?.id === id ? "My" : "All"} Lots
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<div>Loading...</div>}>
              <UserLots id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;

  const user = await client.fetch(SELLER_PAGE_BY_ID_QUERY, {
    id: id,
  });

  return {
    title: user.name,
    description: user.bio,
  };
}
