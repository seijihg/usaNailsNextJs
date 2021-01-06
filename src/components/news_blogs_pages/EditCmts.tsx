import { FC } from "react";

interface IEditCmtsProps {
  setIsEditComment: (isEditComment: boolean) => void;
  isEditComment: boolean;
}

const EditCmts: FC<IEditCmtsProps> = ({ setIsEditComment, isEditComment }) => {
  return (
    <div className="comments-hidden-menu">
      <div onClick={() => setIsEditComment(!isEditComment)}>Edit</div>
    </div>
  );
};

export default EditCmts;
