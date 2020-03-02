import { FunctionComponent } from "react";

interface IServiceProps {
  title: string;
  price: number;
  serviceName: string;
  id: string;
}

const Service: FunctionComponent<IServiceProps> = ({ serviceName, price }) => {
  return (
    <li>
      <h3>{serviceName}</h3>
      <div className="price-dot-line"></div>
      <h3>{price}£</h3>
    </li>
  );
};

export default Service;
