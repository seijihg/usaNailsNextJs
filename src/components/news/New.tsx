import { FunctionComponent } from "react";
import { dateToReadableTextDate } from "src/lib/functions";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

interface INewProps {
  newsList: any;
  fullVersion?: boolean;
}

const New: FunctionComponent<INewProps> = ({ newsList, fullVersion }) => {
  console.log(newsList);
  const content = fullVersion
    ? newsList.content
    : newsList.content.slice(0, 300) +
      (newsList.content.length > 300 ? " ..." : "");
  return (
    <>
      <Link href={`/news_blogs/${newsList.slug}`}>
        <a>
          <h1>{ReactHtmlParser(newsList.title)}</h1>
        </a>
      </Link>

      <h4>{dateToReadableTextDate(newsList.date.toString())}</h4>
      <div className="new-content">{ReactHtmlParser(content)}</div>
      {fullVersion
        ? ""
        : newsList.content.length > 300 && (
            <p className="read-more">...read more</p>
          )}
    </>
  );
};

export default New;
