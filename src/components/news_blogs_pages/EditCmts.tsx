import { FC, useState } from "react";
import CSS from "csstype";

interface IEditCmtsProps {
  setIsEditComment: (isEditComment: boolean) => void;
  isEditComment: boolean;
  setMenu: (setMenu: boolean) => void;
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
}) => {
  const [mouseOver, setMouseOver] = useState<{
    edit: boolean;
    delete: boolean;
  }>({
    edit: false,
    delete: false,
  });

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
      >
        Delete
      </div>
    </div>
  );
};

export default EditCmts;
