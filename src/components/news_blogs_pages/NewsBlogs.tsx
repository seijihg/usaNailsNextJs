import New from "../news/New";
import Title from "./Title";
import { FunctionComponent } from "react";

interface IDataProps {
  data: any;
  type: string;
}

const NewsBlogs: FunctionComponent<IDataProps> = ({ data, type }) => {
  return (
    <>
      <div className="left-column">
        <h1 className="left-h1">{type} List</h1>
        <div className="news-and-blogs-wp-format">
          {data?.map((elem: any) => {
            return <New key={elem.id} newsList={elem} fullVersion={true} />;
          })}
        </div>
      </div>

      <div className="right-column">
        <h1 className="right-h1">Recent {type}</h1>
        <ul>
          {data?.map((elem: any) => (
            <Title
              key={elem.id}
              title={elem.title}
              slug={elem.slug}
              date={elem.date}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default NewsBlogs;
