import { FC } from "react";

interface IEditCmtsProps {
  setIsEditComment: (isEditComment: boolean) => void;
  isEditComment: boolean;
  setMenu: (setMenu: boolean) => void;
}

const EditCmts: FC<IEditCmtsProps> = ({
  setIsEditComment,
  isEditComment,
  setMenu,
}) => {
  return (
    <div className="comments-hidden-menu">
      <div
        onClick={() => {
          setIsEditComment(!isEditComment);
          setMenu(false);
        }}
      >
        Edit
      </div>
    </div>
  );
};

export default EditCmts;
