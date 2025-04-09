import SearchForm from "@/components/SearchForm";
import AuctixCard, { LotTypeCard } from "@/components/AuctixCard";
import { LOTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import AnimatedText from "@/components/ui/animated-text";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: lots } = await sanityFetch({ query: LOTS_QUERY, params });

  return (
    <>
      <section className="pink_container pattern min-h-[530px]">
        <AnimatedText
          text="Welcome to AUCTIX"
          className="dark_bg_container heading !text-[42px] md:text-5xl font-bold mb-4"
        />

        <AnimatedText
          text={`Experience thrilling, time-based auctions. Whether you’re clearing out rare collectibles, selling high-demand gadgets, or bidding on hidden gems. Auctix makes the experience fast, fair, and fun.`}
          className="sub_heading text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        />
        <SearchForm query={query} />
      </section>

      <section className="px-5 md:px-20">
        <p className="text_p_heading mt-8">
          {query ? `Search results for "${query}"` : "All startups"}
        </p>
        <ul className="auctix_card_container mt-5">
          {lots?.length > 0
            ? lots.map((lot: LotTypeCard) => (
                <AuctixCard key={lot?._id} lot={lot} />
              ))
            : "No results found"}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
