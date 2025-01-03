import { createClient } from "next-sanity";
import Blogs from "./components/Blogs";
import Hero from "./components/Hero";

let projectid = process.env.NEXT_PUBLIC_SANITY_PROJECTID;
let dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const client = createClient({
    projectId: projectid,
    dataset: dataset,
    apiVersion: "2022-03-07",
    useCdn: false,
});

async function fetchBlogs() {
    const query = `*[_type == "blog"]{
        _id,
        title,
        content,
        createdAt,
        blogimage {
            asset -> {
                url
            }
        },
        author -> {
        name,
        about,
        image {
            asset -> {
                url
            }
        }
        },
    } | order(createdAt desc)`;
    return await client.fetch(query);
}

export default async function Home() {
    const blogs = await fetchBlogs();
    return (
        <>
            <Hero />
            <Blogs blogs={blogs} />
        </>
    );
}