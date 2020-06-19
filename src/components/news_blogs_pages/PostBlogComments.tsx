import { FC } from "react";

interface ICommentProps {
  content: string;
  updatedAt: Date;
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

  return (
    <div className="comment-tab">
      <h3>{fullName === " " ? nickName : fullName}</h3>
      <p>{content}</p>
    </div>
  );
};

export default PostBlogComment;
