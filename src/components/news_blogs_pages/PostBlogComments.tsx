import { FC, useEffect, useState } from "react";
import { millisToMinutesAndSeconds } from "src/lib/functions";
import EditCmts from "./EditCmts";
import { Field, Formik, Form } from "formik";
import { updateComment } from "src/lib/apis/comments";
import Cookies from "js-cookie";
import CSS from "csstype";
import { getPostComments } from "src/lib/api";

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
  userId: number;
  setComments: (cmts: any) => void;
  query: { slug: string };
}

const cancelStyle: CSS.Properties = {
  cursor: "pointer",
  color: "#99525d",
};

const PostBlogComment: FC<ICommentProps> = ({
  user,
  updatedAt,
  content,
  id,
  loggedIn,
  userId,
  query,
  setComments,
}) => {
  const fullName =
    (user.firstName ? user.firstName : "") +
    " " +
    (user.lastName ? user.lastName : "");
  const nickName = user.email.split("@")[0];
  const diffTime = Math.abs(Date.now() - Date.parse(updatedAt));
  const [menu, setMenu] = useState<boolean>(false);
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [sameUserCmt, setSameUserCmt] = useState<boolean>(false);

  useEffect(() => {
    const loggedUserId = userId;
    const cmtUserId = user.id;

    setSameUserCmt(loggedUserId === cmtUserId ? true : false);
  }, [userId]);

  return (
    <>
      <div className="comment-flex">
        <div className="comment-tab" onClick={() => setMenu(false)}>
          <h3>{fullName === " " ? nickName : fullName}</h3>
          <div>
            {isEditComment ? (
              <Formik
                initialValues={{ comment: content }}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true);
                  const token = Cookies.get("token");
                  const res = await updateComment(values.comment, id, token);

                  // Refreshing comments after editing.
                  const getCmtsRes = await getPostComments(
                    query.slug,
                    location.host
                  );
                  setComments(getCmtsRes.comments);

                  setIsEditComment(false);
                  console.log(res);
                }}
              >
                {({ values, errors, handleSubmit }) => (
                  <Form
                    style={{ marginBottom: ".5rem" }}
                    onSubmit={handleSubmit}
                    onKeyDown={(e) => {
                      if (e.keyCode === 27) {
                        setIsEditComment(false);
                        console.log("You pressed the escape key!");
                      }
                    }}
                  >
                    <Field name="comment" type="input" required />
                  </Form>
                )}
              </Formik>
            ) : (
              <p>{content}</p>
            )}
          </div>
          {isEditComment && (
            <p style={{ margin: "0" }}>
              Press Esc to{" "}
              <span style={cancelStyle} onClick={() => setIsEditComment(false)}>
                cancel
              </span>
              .
            </p>
          )}
        </div>
        {loggedIn && sameUserCmt && (
          <>
            <div className="comment-bg-top" onClick={() => setMenu(!menu)}>
              <div className="comment-bg"></div>
            </div>
            {menu && (
              <EditCmts
                setIsEditComment={setIsEditComment}
                isEditComment={isEditComment}
                setMenu={setMenu}
                cmtId={id}
                setComments={setComments}
                query={query}
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
