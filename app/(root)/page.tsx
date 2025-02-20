
import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard, {StartupTypeCard } from "@/components/Stratupcard";

import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";



export default async function Home({searchParams} : {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query; 

    const params = { search: query || null}

    const session = await auth();
   
  const {data:posts} = await sanityFetch({query: STARTUPS_QUERY, params});
  console.log(JSON.stringify(posts, null, 2));

  
  return (
    <>
    <section className="pink_container">
      <h1 className="heading"> Pitch your Startup, <br/> Connect with Enterpreneurs</h1> 

      <p className="sub-heading !max-w-3xl" >
        Submit Idea, Viote on Pitches, and Get Noticed in Virtual Competitions.
      </p>

    <SearchForm  query={query} />
       </section>


<section className="section_container">

<p className="text-30-semibold">
  {query ? `Search Results for ${query}` : "All Startups"}
</p>

<ul className="mt-7 card_grid">
{posts?.length > 0 ? (
  posts.map((post: StartupTypeCard, index:number) => (
    <StartupCard key={post?._id} post={post}/>
  ))
) : (
  <p className="no-results">No stratup found</p>
)}
</ul>
</section>


<SanityLive />
</>
  );
}
