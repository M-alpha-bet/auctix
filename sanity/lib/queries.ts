import { defineQuery } from "next-sanity";

export const LOTS_QUERY =
  defineQuery(`*[_type == "lot" && defined(slug.current) && !defined($search) || lotName match $search || category match $search || seller->name match $search ] | order(_createdAt desc) {
  _id,
  seller -> { 
    _id, name, image, email 
  },
  lotImage1, 
  description,
  lotName, 
  bidEndTime, 
  category,
  slug,
  highestBid,
}`);

export const LOT_BY_ID_QUERY = defineQuery(`*[_type == "lot" && _id == $_id][0]{
  _id,
  seller -> { 
    _id, name, image, email 
  },
  dimension,
  lotImage1, 
  lotImage2,
  lotImage3,
  lotImage4,
  description,
  lotName, 
  bidEndTime,
  highestBid,
  considerations,
  material,
  finish,
  category,
  slug,
  origin,
  includes,
}`);

// Write seller fetch query
export const SELLER_BY_ID_QUERY =
  defineQuery(`*[_type == "seller" && id == $id][0]{
    _id,
    name,
    image,
    username,
    email,
    bio 
}`);

export const SELLER_PAGE_BY_ID_QUERY =
  defineQuery(`*[_type == "seller" && _id == $id][0]{
    _id,
    name,
    image,
    username,
    email,
    bio 
}`);

export const HIGHEST_BID_QUERY =
  defineQuery(`*[_type == "lot" && _id == $id][0]{
  _id, highestBid
}`);

export const LOTS_BY_SELLER_QUERY =
  defineQuery(`*[_type == "lot" && seller._ref == $_id] | order(_createdAt desc) {
  _id,
  seller -> { 
    _id, name, image, email 
  },
  lotImage1, 
  description,
  lotName, 
  bidEndTime, 
  category,
  slug,
  highestBid,
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  select[]->{
    _id,
    _createdAt,
    lotName,
    slug,
    seller->{
      _id,
      name,
      slug,
      image,
      bio
    },
    dimension,
    lotImage1, 
    lotImage2,
    lotImage3,
    lotImage4,
    description,
    bidEndTime,
    highestBid,
    considerations,
    material,
    finish,
    category,
    slug,
    origin,
    includes, 
  }
}`);
