import { FunctionComponent } from "react";
import { formatDate } from "src/lib/functions";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";
interface IBlogProps {
  blog: {
    id: string;
    title: string;
    content: string;
    date: Date;
    slug: string;
    author: {
      name: string;
      id: string;
    };
  };
}
const Blog: FunctionComponent<IBlogProps> = ({ blog }) => {
  const { title, content, date, author, slug } = blog;

  return (
    <div>
      <Link href={`/news_blogs/${slug}`}>
        <a>
          <h1>{ReactHtmlParser(title)}</h1>
        </a>
      </Link>
      <h4>
        {formatDate(date.toString())} written by {author.name}
      </h4>
    </div>
  );
};

export default Blog;
