import { NextPageContext, NextPage } from "next";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import ReactHtmlParser from "react-html-parser";
import { dateToReadableTextDate } from "src/lib/functions";
import { Formik, Form, Field } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import * as Yup from "yup";
import { getPostComments, addComment } from "src/lib/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/lib/UserContext";
import Cookies from "js-cookie";
import PostBlogComment from "src/components/news_blogs_pages/PostBlogComments";

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
  getPost: any;
}

const validationSchema = Yup.object({
  comment: Yup.string().min(5, "Comments must be at least 5 characters"),
});

const newsAndBlogs: NextPage<INewsAndBlogsProps> = ({ query, getPost }) => {
  const { loading, error, data } = useQuery(newOrBlogQuery, {
    variables: { id: query.slug },
  });
  const { post } = data || {};
  const { title, date, content } = post || {};
  const { user } = useContext<any>(UserContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (getPost) {
      setComments(getPost.comments);
    }
  }, [getPost]);
  return (
    <>
      <div className={"main-new-blog-page news-and-blogs-wp-format"}>
        {loading ? (
          <div className="loader">
            <div className="loaderBar"></div>
          </div>
        ) : (
          <>
            <h3>{dateToReadableTextDate(date?.toString())}</h3>
            <h1>{ReactHtmlParser(title)}</h1>
            <div className="new-content">{ReactHtmlParser(content)}</div>
            <h2>Comments:</h2>
            <Formik
              initialValues={{ comment: "" }}
              onSubmit={(data, { setSubmitting, resetForm }) => {
                if (!user) {
                  setSubmitting(false);
                  return;
                }
                const token = Cookies.get("token");
                addComment(
                  { content: data.comment, id_post: query.slug },
                  token
                )
                  .then((res) => {
                    getPostComments(query.slug)
                      .then((res) => setComments(res.comments))
                      .catch(console.log);
                    resetForm();
                    setSubmitting(false);
                  })
                  .catch((err) => console.log(err));
              }}
              validationSchema={validationSchema}
            >
              {({ values, errors, isSubmitting }) => {
                return (
                  <Form>
                    <Field
                      name="comment"
                      type="input"
                      required
                      placeholder="Write a comment..."
                    />
                    {errors.comment && (
                      <p className="error">{errors.comment}</p>
                    )}
                  </Form>
                );
              }}
            </Formik>
            {comments.map((comment: any) => (
              <PostBlogComment
                key={comment.id}
                content={comment.content}
                updatedAt={comment.updatedAt}
                email={comment.user.email}
                firstName={comment.fistName}
                lastName={comment.lastName}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const getPost = await getPostComments(query?.slug as string);

  return { props: { query, getPost } };
};

export default newsAndBlogs;
