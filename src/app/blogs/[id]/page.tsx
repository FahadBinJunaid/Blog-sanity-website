'use client';

import React, { useEffect, useState } from "react";
import { createClient } from "next-sanity";
import { useParams } from "next/navigation";
import Image from "next/image";

let projectid = process.env.NEXT_PUBLIC_SANITY_PROJECTID;
let dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const client = createClient({
  projectId: projectid,
  dataset: dataset,
  apiVersion: "2022-03-07",
  useCdn: false,
});

interface Author {
  _id: string;
  name: string;
  about: string;
  image?: { asset: { url: string } };
}

interface Blog {
  _id: string;
  title: string;
  content: any[];
  blogimage?: { asset: { url: string } };
  createdAt: string;
  author: { author: { _ref: string } };
}

async function fetchBlogById(id: string): Promise<Blog | null> {
  const query = `*[_type == "blog" && _id == $id][0]{
    _id,
    title,
    content,
    createdAt,
    blogimage {
      asset -> { url }
    },
    author {
      author {
        _ref
      }
    }
  }`;
  return client.fetch(query, { id });
}

async function fetchAuthorById(authorId: string): Promise<Author | null> {
  const authorQuery = `*[_type == "author" && _id == $authorId][0]{
    _id,
    name,
    about,
    image {
      asset -> { url }
    }
  }`;
  return client.fetch(authorQuery, { authorId });
}

export default function BlogPage() {
  const { id } = useParams();
  const blogId = Array.isArray(id) ? id[0] : id;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    if (blogId) {
      setLoading(true);
      fetchBlogById(blogId)
        .then((blogData) => {
          setBlog(blogData);
          if (blogData?.author?.author?._ref) {
            fetchAuthorById(blogData.author.author._ref).then(setAuthor);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [blogId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prevComments) => [...prevComments, newComment.trim()]);
      setNewComment("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-blue-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-red-100">
        <p className="text-lg font-semibold text-gray-700">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-6 py-12">
        {/* Blog Header Image */}
        {blog.blogimage?.asset?.url && (
          <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={blog.blogimage.asset.url}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        )}

        {/* Blog Title and Meta */}
        <div className="mt-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900">{blog.title}</h1>
          <p className="mt-4 text-md text-gray-600">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Blog Content */}
        <div className="mt-8 prose prose-xl prose-indigo mx-auto">
          {blog.content.map((block: any, index: number) => {
            if (block._type === "image" && block.asset?.url) {
              return (
                <div key={index} className="my-6">
                  <Image
                    src={block.asset.url}
                    alt={block.alt || "Blog image"}
                    width={1200}
                    height={800}
                    className="rounded-xl"
                  />
                </div>
              );
            }
            if (block._type === "block") {
              return (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {block.children.map((child: any) => child.text).join(" ")}
                </p>
              );
            }
            return null;
          })}
        </div>

        {/* Author Info */}
        {author && (
          <div className="mt-12 flex items-center border-t pt-6">
            <img
              src={author.image?.asset?.url || "/default-author.jpg"}
              alt={author.name}
              className="w-16 h-16 rounded-full object-cover shadow-md"
            />
            <div className="ml-4">
              <p className="text-lg font-bold text-gray-800">{author.name}</p>
              <p className="text-sm text-gray-600">{author.about}</p>
            </div>
          </div>
        )}

        {/* Comment Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800">Comments</h2>
          {/* Comment Input and Button */}
          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4"
              placeholder="Write your comment here..."
            />
            <button
              onClick={handleAddComment}
              className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Comment
            </button>
          </div>

          {/* Display Comments */}
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mt-4 border border-gray-200"
              >
                {comment}
              </div>
            ))
          ) : (
            <p className="text-gray-600 mt-10">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}