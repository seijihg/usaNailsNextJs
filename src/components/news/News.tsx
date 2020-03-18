import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FunctionComponent, useState, useEffect } from "react";
import New from "./New";

const getNewsQuery = gql`
  query($id: ID!) {
    category(id: $id) {
      name
      id
      posts {
        edges {
          node {
            id
            title
            content
            date
            slug
          }
        }
      }
    }
  }
`;

const News: FunctionComponent = () => {
  const { loading, error, data: newsData } = useQuery(getNewsQuery, {
    variables: { id: "Y2F0ZWdvcnk6Mg==" }
  });
  const [news, setNews] = useState([]);
  useEffect(() => {
    setNews(newsData?.category.posts.edges.slice(0, 5));
  }, [newsData]);

  return (
    <>
      <h1 className="latest-news">LATEST NEWS</h1>
      {news?.map((elem: any) => {
        return <New key={elem.node.id} newsList={elem.node} />;
      })}
    </>
  );
};

export default News;
