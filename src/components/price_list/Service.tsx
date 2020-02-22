import { FunctionComponent } from "react";

interface IServiceProps {
  service: any;
}

const Service: FunctionComponent<IServiceProps> = ({ service }) => {
  const { serviceName, price } = service.service;
  return (
    <li>
      <h3>{serviceName}</h3>
      <div className="price-dot-line"></div>
      <h3>{price}£</h3>
    </li>
  );
};

export default Service;
