import { FunctionComponent, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Category from "./Category";

export const getCategoriesQuery = gql`
  query($id: ID!) {
    category(id: $id) {
      name
      children {
        nodes {
          id
          name
          children {
            edges {
              node {
                id
                name
                posts {
                  edges {
                    node {
                      id
                      title
                      service {
                        price
                        serviceName
                      }
                    }
                  }
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
  const {
    loading: loadingCategories,
    error: errorCategories,
    data: priceCategories
  } = useQuery(getCategoriesQuery, {
    variables: { id: "Y2F0ZWdvcnk6NA==" }
  });

  const [mainCats, setMainCats] = useState([]);

  useEffect(() => {
    setMainCats(priceCategories?.category.children.nodes);
  }, [priceCategories]);

  return (
    <>
      <h1>PRICE LIST</h1>
      {mainCats?.map((cat: any) => {
        return <Category key={cat.id} category={cat} />;
      })}
    </>
  );
};

export default Prices;
