import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useState, useEffect } from "react";
import NewsBlogs from "src/components/news_blogs_pages/NewsBlogs";

const getBlogsQuery = gql`
  query($id: ID!) {
    category(id: $id) {
      name
      id
      posts {
        nodes {
          id
          title
          content
          date
          slug
        }
      }
    }
  }
`;

const News = () => {
  const { loading, error, data: blogsData } = useQuery(getBlogsQuery, {
    variables: { id: "Y2F0ZWdvcnk6Mw==" },
  });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(blogsData?.category.posts.nodes.slice(0, 5));
  }, [blogsData]);

  return (
    <div className="sub-page-blogs">
      {loading ? (
        <div className="loader">
          <div className="loaderBar"></div>
        </div>
      ) : (
        <NewsBlogs data={blogs} type="Blogs" />
      )}
    </div>
  );
};

export default News;
