import { FC } from "react";

interface IEditCmtsProps {
  setIsEditComment: (isEditComment: boolean) => void;
  isEditComment: boolean;
}

const EditCmts: FC<IEditCmtsProps> = ({ setIsEditComment, isEditComment }) => {
  return (
    <div className="comments-hidden-menu">
      <ul>
        <li onClick={() => setIsEditComment(!isEditComment)}>Edit</li>
      </ul>
    </div>
  );
};

export default EditCmts;
