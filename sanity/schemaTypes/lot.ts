import { defineField, defineType } from "sanity";

export const lot = defineType({
  name: "lot",
  title: "Lot",
  type: "document",
  fields: [
    defineField({
      name: "lotName",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "lotName",
      },
    }),
    defineField({
      name: "seller",
      type: "reference",
      to: { type: "seller" },
    }),
    defineField({
      name: "bidEndTime",
      type: "date",
    }),
    defineField({
      name: "highestBid",
      type: "number",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "lotImage1",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lotImage2",
      type: "image",
    }),
    defineField({
      name: "lotImage3",
      type: "image",
    }),
    defineField({
      name: "lotImage4",
      type: "image",
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (Rule) =>
        Rule.min(1).max(100).required().error("Please add a category"),
    }),
    defineField({
      name: "considerations",
      type: "string",
    }),
    defineField({
      name: "origin",
      type: "string",
    }),
    defineField({
      name: "material",
      type: "string",
    }),
    defineField({
      name: "dimension",
      type: "string",
    }),
    defineField({
      name: "finish",
      type: "string",
    }),
    defineField({
      name: "includes",
      type: "string",
    }),
  ],
});
