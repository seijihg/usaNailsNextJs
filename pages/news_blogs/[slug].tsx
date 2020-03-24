import { NextPageContext, NextPage } from "next";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import ReactHtmlParser from "react-html-parser";
import { dateToReadableTextDate } from "src/lib/functions";
import LoadingIndicator from "../../src/components/LoadingIndicator";
import { Formik, Form, useField, FieldConfig } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import * as Yup from "yup";
import { FunctionComponent } from "react";

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

const validationSchema = Yup.object({
  comment: Yup.string().required()
});

const MyCommentField: FunctionComponent<FieldConfig & {
  placeholder: string;
  minRows: number;
  maxRows: number;
}> = ({ placeholder, minRows, maxRows, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <>
      <TextareaAutosize
        {...field}
        placeholder={placeholder}
        minRows={10}
        maxRows={15}
      />
      <div className="errors">{errorText}</div>
    </>
  );
};

const newsAndBlogs: NextPage<INewsAndBlogsProps> = ({ query }) => {
  const { loading, error, data } = useQuery(newOrBlogQuery, {
    variables: { id: query.slug }
  });
  const { post } = data || {};
  const { title, date, content } = post || {};

  return (
    <>
      <div
        className={
          "main-new-blog-page news-and-blogs-wp-format" +
          (loading ? "loader" : "")
        }
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <h3>{dateToReadableTextDate(date?.toString())}</h3>
            <h1>{ReactHtmlParser(title)}</h1>
            <div className="new-content">{ReactHtmlParser(content)}</div>
            <h2>Comments:</h2>
            <Formik
              initialValues={{ comment: "" }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                console.log("submit", data);

                setSubmitting(false);
              }}
              validationSchema={validationSchema}
            >
              {({ values, errors, isSubmitting }) => {
                return (
                  <Form>
                    <MyCommentField
                      name="comment"
                      type="input"
                      placeholder="Enter Message"
                      minRows={10}
                      maxRows={15}
                    />
                    <button disabled={isSubmitting} type="submit">
                      SUBMIT
                    </button>
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;

  return { props: { query } };
};

export default newsAndBlogs;
