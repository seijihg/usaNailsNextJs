import { FunctionComponent } from "react";
import { dateToReadableTextDate } from "src/lib/functions";

interface INewProps {
  post: {
    id: string;
    title: string;
    content: string;
    date: Date;
  };
}
const New: FunctionComponent<INewProps> = ({ post }) => {
  const { title, content, date } = post;
  return (
    <>
      <h1>{title}</h1>
      <h4>{dateToReadableTextDate(date.toString())}</h4>
      <div
        className="new-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default New;
