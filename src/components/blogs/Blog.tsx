import { FunctionComponent } from "react";
import { formatDate } from "src/lib/functions";
import ReactHtmlParser from "react-html-parser";
interface IBlogProps {
  blog: {
    id: string;
    title: string;
    content: string;
    date: Date;
    author: {
      name: string;
      id: string;
    };
  };
}
const Blog: FunctionComponent<IBlogProps> = ({ blog }) => {
  const { title, content, date, author } = blog;
  console.log(author);
  return (
    <div>
      <h1>{ReactHtmlParser(title)}</h1>
      <h4>
        {formatDate(date.toString())} written by {author.name}
      </h4>
    </div>
  );
};

export default Blog;
