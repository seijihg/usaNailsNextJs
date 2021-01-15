import { FC, useState } from "react";
import CSS from "csstype";
import { deleteComment } from "src/lib/apis/comments";
import Cookies from "js-cookie";
import { getPostComments } from "src/lib/api";

interface IEditCmtsProps {
  setIsEditComment: (isEditComment: boolean) => void;
  isEditComment: boolean;
  setMenu: (setMenu: boolean) => void;
  cmtId: string;
  setComments: (cmts: any) => void;
  query: { slug: string };
}

const styleMouse: CSS.Properties = {
  color: "#fafafa",
  margin: 0,
  padding: ".5rem",
  borderRadius: "5px",
  cursor: "pointer",
};

const styleMouseOver: CSS.Properties = {
  background: "gray",
};

const EditCmts: FC<IEditCmtsProps> = ({
  setIsEditComment,
  isEditComment,
  setMenu,
  cmtId,
  query,
  setComments,
}) => {
  const [mouseOver, setMouseOver] = useState<{
    edit: boolean;
    delete: boolean;
  }>({
    edit: false,
    delete: false,
  });
  console.log(cmtId);
  return (
    <div className="comments-hidden-menu">
      <div
        style={
          mouseOver.edit
            ? Object.assign({}, styleMouse, styleMouseOver)
            : styleMouse
        }
        onMouseOver={() => setMouseOver({ ...mouseOver, edit: true })}
        onMouseOut={() => setMouseOver({ ...mouseOver, edit: false })}
        onClick={() => {
          setIsEditComment(!isEditComment);
          setMenu(false);
        }}
      >
        Edit
      </div>
      <div
        style={
          mouseOver.delete
            ? Object.assign({}, styleMouse, styleMouseOver)
            : styleMouse
        }
        onMouseOver={() => setMouseOver({ ...mouseOver, delete: true })}
        onMouseOut={() => setMouseOver({ ...mouseOver, delete: false })}
        onClick={async () => {
          const token = Cookies.get("token");
          await deleteComment(cmtId, token);

          // Refreshing comments after deleting.
          const getCmtsRes = await getPostComments(query.slug, location.host);
          setComments(getCmtsRes.comments);
        }}
      >
        Delete
      </div>
    </div>
  );
};

export default EditCmts;
