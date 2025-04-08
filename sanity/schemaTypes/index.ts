import { type SchemaTypeDefinition } from "sanity";
import { seller } from "./seller";
import { lot } from "./lot";
import { playlist } from "./playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [seller, lot, playlist],
};
