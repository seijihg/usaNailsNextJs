import { FunctionComponent } from "react";
import Service from "./Service";

interface ISubProps {
  category: any;
}

const SubCategory: FunctionComponent<ISubProps> = ({ category }) => {
  const { name, posts } = category.node;

  return (
    <div className="sub-category">
      <h2>_ {name}</h2>
      <ul>
        {posts?.edges.map((post: any) => {
          return <Service key={post.node.id} service={post.node} />;
        })}
      </ul>
    </div>
  );
};

export default SubCategory;
