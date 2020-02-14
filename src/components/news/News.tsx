import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FunctionComponent } from "react";
import New from "./New";

interface IPost {
  node: {
    id: string;
    title: string;
    content: string;
    date: Date;
  };
}

const getNewsQuery = gql`
  {
    categories {
      edges {
        node {
          name
          id
          posts {
            edges {
              node {
                date
                title
                content
              }
            }
          }
        }
      }
    }
  }
`;

const News: FunctionComponent = () => {
  const { loading, error, data: newsData } = useQuery(getNewsQuery);
  console.log(newsData);
  return (
    <>
      {newsData?.categories.edges[1].node.posts.edges
        .slice(0, 3)
        .map((post: IPost) => (
          <New key={post.node.id} post={post.node} />
        ))}
    </>
  );
};

export default News;
