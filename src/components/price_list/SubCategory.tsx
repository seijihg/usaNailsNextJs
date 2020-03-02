import { FunctionComponent } from "react";
import Service from "./Service";

interface ISubProps {
  category: any;
}

const SubCategory: FunctionComponent<ISubProps> = ({ category }) => {
  const { name, prices } = category.node;

  return (
    <div className="sub-category">
      <h2>_ {name}</h2>
      <ul>
        {prices?.nodes.map((price: any) => {
          return <Service key={price.id} {...price} />;
        })}
      </ul>
    </div>
  );
};

export default SubCategory;
