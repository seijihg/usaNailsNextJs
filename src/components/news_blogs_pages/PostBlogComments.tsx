import { FC } from "react";
import { millisToMinutesAndSeconds } from "src/lib/functions";

interface ICommentProps {
  content: string;
  updatedAt: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

const PostBlogComment: FC<ICommentProps> = ({
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

  return (
    <>
      <div className="comment-tab">
        <h3>{fullName === " " ? nickName : fullName}</h3>
        <p>{content}</p>
      </div>
      <p>
        <span>&#183;{` ${millisToMinutesAndSeconds(diffTime)}`}</span>
      </p>
    </>
  );
};

export default PostBlogComment;
