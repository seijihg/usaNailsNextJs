import { FunctionComponent, useState } from "react";
import SubCategory from "./SubCategory";
import AnimateHeight from "react-animate-height";

interface ICategoryProps {
  category: any;
}

const Category: FunctionComponent<ICategoryProps> = ({ category }) => {
  const [categoryHeight, setCategoryHeight] = useState<boolean>(false);
  const { edges: subCategories } = category.children;
  return (
    <div>
      <h2
        className="category"
        onClick={() => setCategoryHeight(!categoryHeight)}
      >
        {category.name.toUpperCase()}
      </h2>
      <AnimateHeight duration={500} height={categoryHeight ? "auto" : 0}>
        {subCategories.map((sub: any) => {
          return <SubCategory key={sub.node.id} category={sub} />;
        })}
      </AnimateHeight>
    </div>
  );
};

export default Category;
