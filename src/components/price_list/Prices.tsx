import { FunctionComponent } from "react";
import Category from "./Category";
import { pricesData } from "src/data/prices";

const Prices: FunctionComponent = () => {
  return (
    <>
      <h1>PRICE LIST</h1>
      {pricesData.map((cat) => {
        return <Category key={cat.id} category={cat} />;
      })}
    </>
  );
};

export default Prices;
