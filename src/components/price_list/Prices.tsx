import { FunctionComponent } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Price from "./Price";

interface IPrice {
  node: {
    id: string;
    title: string;
    date: Date;
    price: {
      price: number;
    };
  };
}

const getPriceList = gql`
  {
    categories {
      edges {
        node {
          name
          id
          posts {
            edges {
              node {
                date
                title
                id
                price {
                  price
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Prices: FunctionComponent = () => {
  const { loading, error, data: priceList } = useQuery(getPriceList);
  return (
    <>
      <h1>PRICE LIST</h1>
      <h2>NAIL EXTENSIONS</h2>
      <h3>ACRYLIC</h3>
      <h3>POWEDER GEL</h3>
      <h3>PINK AND WHITE / GLITTER TIPS / OMBRE</h3>
      <h3>DIPPING POWDER (SNS, OPI, GELISH)</h3>
      <h3>UV GET POLISH (SHELLAC, OPI, GELISH)</h3>
      <h2>MANICURE & PEDICURE</h2>
      <h3>MANICURE</h3>
      <h3>LUXURY SPA PEDICURE</h3>
      <h2>NAIL DESIGN & OTHER SERVICES</h2>
      <h2>WAXING</h2>
      <ul>
        {priceList?.categories.edges[2].node.posts.edges.map(
          (price: IPrice) => (
            <Price key={price.node.id} price={price.node} />
          )
        )}
      </ul>
    </>
  );
};

export default Prices;
