import Layout from "src/components/Layout";
import { NextPageContext, NextPage } from "next";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import ReactHtmlParser from "react-html-parser";
import { dateToReadableTextDate } from "src/lib/functions";

const newOrBlogQuery = gql`
  query($id: ID!) {
    post(id: $id, idType: SLUG) {
      date
      content
      title
      id
    }
  }
`;

interface INewsAndBlogsProps {
  query: any;
}

const newsAndBlogs: NextPage<INewsAndBlogsProps> = ({ query }) => {
  const { loading, error, data } = useQuery(newOrBlogQuery, {
    variables: { id: query.slug }
  });
  const { post } = data || {};
  const { title, date, content } = post || {};

  return (
    <Layout>
      <div
        className={
          "main-new-blog-page news-and-blogs-wp-format" +
          (loading ? "loader" : "")
        }
      >
        {loading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            <h3>{dateToReadableTextDate(date?.toString())}</h3>
            <h1>{ReactHtmlParser(title)}</h1>
            <div className="new-content">{ReactHtmlParser(content)}</div>
          </>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;

  return { props: { query } };
};

export default newsAndBlogs;
