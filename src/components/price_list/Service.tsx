import { FunctionComponent } from "react";

interface IServiceProps {
  service: any;
}

const Service: FunctionComponent<IServiceProps> = ({ service }) => {
  const { title, Price } = service;
  return (
    <li>
      <h3>{title}</h3>
      <div className="price-dot-line"></div>
      <h3>{Price.price}£</h3>
    </li>
  );
};

export default Service;
