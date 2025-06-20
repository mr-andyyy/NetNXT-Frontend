// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';

interface Blog {
  slug: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

// Dummy blog data
const dummyBlogs: Blog[] = [
  {
    slug: 'first-blog',
    title: 'First Blog Post',
    author: 'Anand',
    date: '2025-06-18',
    content: '<p>This is the content of the first blog post.</p>',
  },
  {
    slug: 'second-blog',
    title: 'Second Blog Post',
    author: 'Anand',
    date: '2025-06-17',
    content: '<p>This is the content of the second blog post.</p>',
  },
];

// Static generation for each blog
export async function generateStaticParams() {
  return dummyBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// The dynamic page component
export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = dummyBlogs.find((b) => b.slug === params.slug);

  if (!blog) return notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-2">
        By {blog.author} | {new Date(blog.date).toLocaleDateString()}
      </p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
