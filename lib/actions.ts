"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";

export const updateHighestBid = async (
  id: string,
  highestBid: number,
  formData: FormData
) => {
  const bid = formData.get("bidAmount");
  const email = formData.get("email");

  const session = await auth();

  if (!session) return "Please login to submit a bid";

  if (!bid) return "Please enter a bid amount";

  if (!email) return "Please enter your email";

  if (Number(bid) > highestBid) {
    await writeClient
      .patch(id)
      .set({ highestBid: Number(bid) })
      .commit();

    return "Your bid of N" + bid + " has been submitted";
  }
};

const uploadImage = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const blob = new Blob([buffer], { type: file.type });

  const asset = await writeClient.assets.upload("image", blob, {
    filename: file.name,
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
};

export const createLot = async (
  state: any,
  form: FormData,
  bidEndTime: Date
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Please login to create a lot",
      status: "ERROR",
    });

  const {
    lotName,
    description,
    considerations,
    category,
    origin,
    material,
    dimension,
    highestBid,
    finish,
    includes,
    lotImage1,
    lotImage2,
    lotImage3,
    lotImage4,
  } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "bidEndTime")
  );

  const slug = slugify(lotName as string, { lower: true, strict: true });

  const lotImage1File = lotImage1 ? await uploadImage(lotImage1 as File) : null;
  const lotImage2File = lotImage2 ? await uploadImage(lotImage2 as File) : null;
  const lotImage3File = lotImage3 ? await uploadImage(lotImage3 as File) : null;
  const lotImage4File = lotImage4 ? await uploadImage(lotImage4 as File) : null;

  try {
    const lot = {
      lotName,
      slug: {
        _type: slug,
        current: slug,
      },
      seller: {
        _type: "reference",
        _ref: session?.id,
      },
      description,
      bidEndTime,
      considerations,
      category,
      highestBid: 1000000,
      origin,
      material,
      dimension,
      finish,
      includes,
      lotImage1: lotImage1File,
      lotImage2: lotImage2File,
      lotImage3: lotImage3File,
      lotImage4: lotImage4File,
    };

    const result = await writeClient.create({ _type: "lot", ...lot });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
