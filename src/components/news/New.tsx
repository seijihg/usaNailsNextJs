import { FunctionComponent } from "react";
import { dateToReadableTextDate } from "src/lib/functions";
import ReactHtmlParser from "react-html-parser";

interface INewProps {
  newsList: any;
  fullVersion?: boolean;
}

const New: FunctionComponent<INewProps> = ({ newsList, fullVersion }) => {
  const content = fullVersion
    ? newsList.content
    : newsList.content.slice(0, 200) +
      (newsList.content.length > 200 ? " ..." : "");
  return (
    <>
      <h1>{ReactHtmlParser(newsList.title)}</h1>
      <h4>{dateToReadableTextDate(newsList.date.toString())}</h4>
      <div className="new-content">{ReactHtmlParser(content)}</div>
      {fullVersion
        ? ""
        : newsList.content.length > 200 && (
            <p className="read-more">...read more</p>
          )}
    </>
  );
};

export default New;
