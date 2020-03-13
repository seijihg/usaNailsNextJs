import Layout from "src/components/Layout";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useState, useEffect } from "react";
import NewsBlogs from "src/components/news_blogs_pages/NewsBlogs";

const getNewsQuery = gql`
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
  const { loading, error, data: newsData } = useQuery(getNewsQuery, {
    variables: { id: "Y2F0ZWdvcnk6Mg==" }
  });
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(newsData?.category.posts.nodes.slice(0, 5));
  }, [newsData]);

  return (
    <Layout>
      <div className="sub-page-news">
        <NewsBlogs data={news} type="News" />
      </div>
    </Layout>
  );
};

export default News;
