import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

// Blog posts data - matching Blog.tsx structure
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-file-rti-online-complete-step-by-step-guide',
    title: 'How to File RTI Online: A Complete Step-by-Step Guide',
    excerpt: 'Learn how to file RTI applications online with our comprehensive guide. We cover everything from drafting your query to tracking your application.',
    author: 'FileMyRTI Team',
    date: '2025-01-15',
    category: 'Guide',
    readTime: '5 min read',
    featured: true
  },
  {
    id: '2',
    slug: 'understanding-rti-act-2005-rights-and-responsibilities',
    title: 'Understanding the RTI Act 2005: Your Rights and Responsibilities',
    excerpt: 'Get a clear understanding of the Right to Information Act 2005, your rights as a citizen, and how to exercise them effectively.',
    author: 'FileMyRTI Team',
    date: '2025-01-12',
    category: 'Legal',
    readTime: '7 min read',
    featured: true
  },
  {
    id: '3',
    slug: 'top-10-rti-success-stories-citizens-bring-transparency',
    title: 'Top 10 RTI Success Stories: How Citizens Used RTI to Bring Transparency',
    excerpt: 'Discover inspiring stories of citizens who used RTI to expose corruption, improve public services, and bring accountability to government.',
    author: 'FileMyRTI Team',
    date: '2025-01-10',
    category: 'Success Stories',
    readTime: '8 min read'
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const KarnatakaGuidesSection: React.FC = () => {
  // Get first 3 featured posts, or first 3 posts if not enough featured
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);
  const displayPosts = featuredPosts.length >= 3 ? featuredPosts : blogPosts.slice(0, 3);

  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16 bg-primary-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-[32px] md:text-[36px] font-semibold text-gray-900">
            GET INSPIRED, ENLIGHTENED & EMPOWERED
          </h2>
          <div className="mx-auto h-1 w-24 bg-yellow-500"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full whitespace-nowrap">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs" aria-label="Reading time">{post.readTime}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3rem]">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                    <span>{post.author}</span>
                    <span aria-hidden="true">•</span>
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors whitespace-nowrap ml-4"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

