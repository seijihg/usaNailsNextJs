import { FunctionComponent } from "react";

interface IPriceProps {
  price: {
    id: string;
    title: string;
    date: Date;
    price: {
      price: number;
    };
  };
}

const Price: FunctionComponent<IPriceProps> = ({ price }) => {
  return (
    <>
      <li>
        <h3>_ {price.title}</h3>
        <div className="price-dot-line"></div>
        <h3>{price.price.price}£</h3>
      </li>
    </>
  );
};

export default Price;
