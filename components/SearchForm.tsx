import React from "react";
import Form from "next/form";
import SearchReset from "./SearchReset";
import { Search } from "lucide-react";
import { motion } from "motion/react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="flex items-center gap-2 border-2 search_form"
    >
      <input
        name="query"
        defaultValue=""
        className="outline-none font-medium text-gray-800"
        placeholder="Search startups"
      />
      <div className="gap-2 flex items-center">
        {query && <SearchReset />}
        <button className="search_icon" type="submit">
          <Search className="size-5 text-white" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
