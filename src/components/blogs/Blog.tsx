import { FunctionComponent } from "react";
import { formatDate } from "src/lib/functions";
interface IBlogProps {
  blog: {
    id: string;
    title: string;
    content: string;
    date: Date;
  };
}
const Blog: FunctionComponent<IBlogProps> = ({ blog }) => {
  const { title, content, date } = blog;
  return (
    <>
      <h1>{title}</h1>
      <h4>{formatDate(date.toString())}</h4>
    </>
  );
};

export default Blog;
