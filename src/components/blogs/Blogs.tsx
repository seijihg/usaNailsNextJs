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
    slug: string;
    author: {
      name: string;
      id: string;
    };
  };
}

const getBlogsQuery = gql`
  query($id: ID!) {
    category(id: $id) {
      name
      posts {
        edges {
          node {
            date
            title
            content
            id
            slug
            author {
              name
              id
            }
          }
        }
      }
    }
  }
`;

const Blogs: FunctionComponent = () => {
  const { loading, error, data: blogsData } = useQuery(getBlogsQuery, {
    variables: { id: "Y2F0ZWdvcnk6Mw==" }
  });
  return (
    <>
      <h1 className="latest-blogs">LATEST BLOGS</h1>
      {blogsData?.category.posts.edges.slice(0, 10).map((blog: IBlogs) => (
        <Blog key={blog.node.id} blog={blog.node} />
      ))}
    </>
  );
};

export default Blogs;
