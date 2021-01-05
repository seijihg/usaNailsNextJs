import { FC, useState } from "react";
import { millisToMinutesAndSeconds } from "src/lib/functions";
import EditCmts from "./EditCmts";
import { Field, Formik, Form } from "formik";
import { updateComment } from "src/lib/apis/comments";
import Cookies from "js-cookie";

interface ICommentProps {
  id: string;
  content: string;
  updatedAt: string;
  loggedIn: boolean;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const PostBlogComment: FC<ICommentProps> = ({
  user,
  updatedAt,
  content,
  id,
  loggedIn,
}) => {
  const fullName =
    (user.firstName ? user.firstName : "") +
    " " +
    (user.lastName ? user.lastName : "");
  const nickName = user.email.split("@")[0];
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
                  const token = Cookies.get("token");
                  const res = await updateComment(values.comment, id, token);
                  // need to refresh all comments and update need to be logged in to edit comments
                  setIsEditComment(false);
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
        {loggedIn && (
          <>
            <div className="comment-bg" onClick={() => setMenu(!menu)}></div>
            {menu && (
              <EditCmts
                setIsEditComment={setIsEditComment}
                isEditComment={isEditComment}
              />
            )}
          </>
        )}
      </div>

      <p>
        <span>&#183;{` ${millisToMinutesAndSeconds(diffTime)}`}</span>
      </p>
    </>
  );
};

export default PostBlogComment;
