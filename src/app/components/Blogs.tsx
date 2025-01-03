import Link from "next/link";

interface Author {
    name: string;
    about: string;
    image: { asset: { url: string } };
}

interface Blog {
    _id: string;
    title: string;
    content: any[];
    createdAt: string;
    blogimage: { asset: { url: string } };
    author: Author | null;
}

interface BlogsProps {
    blogs: Blog[];
}

export default function Blogs({ blogs }: BlogsProps) {
    return (
        <div className="bg-gradient-to-b from-indigo-100 to-white py-20">
            <div className="mx-auto max-w-6xl px-4 lg:px-10">
                <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-12">Featured Blogs</h2>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <article
                            key={blog._id}
                            className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Blog Image */}
                            <Link href={`/blogs/${blog._id}`}>
                                <img
                                    src={blog.blogimage?.asset?.url || '/default-image.jpg'}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>

                            <div className="p-5 flex flex-col justify-between flex-grow">
                                {/* Title and Date */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        <Link href={`/blogs/${blog._id}`}>
                                            {blog.title}
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-2">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Author Details */}
                                {blog.author && (
                                    <div className="mt-4 flex items-center">
                                        <img
                                            src={blog.author.image.asset.url || '/default-author.jpg'}
                                            alt={blog.author.name}
                                            className="w-10 h-10 rounded-full object-cover shadow-sm"
                                        />
                                        <div className="ml-3">
                                            <p className="text-sm font-semibold text-gray-700">{blog.author.name}</p>
                                            <p className="text-sm text-gray-500">{blog.author.about}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}