import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FunctionComponent } from "react";
import Blog from "./Blog";

interface IBlogs {
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

const Blogs: FunctionComponent = () => {
  const { loading, error, data: blogsData } = useQuery(getNewsQuery);
  return (
    <>
      <h1>LATEST BLOGS</h1>
      {blogsData?.categories.edges[0].node.posts.edges.map((blog: IBlogs) => (
        <Blog key={blog.node.id} blog={blog.node} />
      ))}
    </>
  );
};

export default Blogs;
