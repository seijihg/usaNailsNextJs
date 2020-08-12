import { FC, useState } from "react";
import { millisToMinutesAndSeconds } from "src/lib/functions";
import EditCmts from "./EditCmts";
import { Field, Formik, Form } from "formik";
import { updateComment } from "src/lib/apis/comments";

interface ICommentProps {
  commentId: string;
  content: string;
  updatedAt: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

const PostBlogComment: FC<ICommentProps> = ({
  commentId,
  content,
  updatedAt,
  email,
  firstName,
  lastName,
}) => {
  const fullName =
    (firstName ? firstName : "") + " " + (lastName ? lastName : "");
  const nickName = email.split("@")[0];
  const diffTime = Math.abs(Date.now() - Date.parse(updatedAt));
  const [menu, setMenu] = useState<boolean>(false);
  const [isEditComment, setIsEditComment] = useState<boolean>(false);

  return (
    <>
      <div className="comment-flex">
        <div className="comment-tab">
          <h3>{fullName === " " ? nickName : fullName}</h3>
          <div>
            {isEditComment ? (
              <Formik
                initialValues={{ comment: content }}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true);
                  const res = await updateComment(values.comment, commentId);
                  // need to refresh all comments and update need to be logged in to edit comments
                  console.log(res);
                }}
              >
                {({ values, errors, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Field name="comment" type="input" required />
                  </Form>
                )}
              </Formik>
            ) : (
              <p>{content}</p>
            )}
          </div>
        </div>
        <div className="comment-bg" onClick={() => setMenu(!menu)}></div>
        {menu && (
          <EditCmts
            setIsEditComment={setIsEditComment}
            isEditComment={isEditComment}
          />
        )}
      </div>

      <p>
        <span>&#183;{` ${millisToMinutesAndSeconds(diffTime)}`}</span>
      </p>
    </>
  );
};

export default PostBlogComment;
