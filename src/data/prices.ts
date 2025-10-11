// Static price list data
// Update this file with your actual price data

export interface Price {
  id: string;
  title: string;
  price: string;
  serviceName: string;
}

export interface SubCategory {
  id: string;
  name: string;
  prices: Price[];
}

export interface MainCategory {
  id: string;
  name: string;
  children: SubCategory[];
}

export const pricesData: MainCategory[] = [
  {
    id: "1",
    name: "Manicure & Pedicure",
    children: [
      {
        id: "1-1",
        name: "Basic Services",
        prices: [
          {
            id: "p1",
            title: "Classic Manicure",
            price: "£25",
            serviceName: "Manicure"
          },
          {
            id: "p2",
            title: "Gel Manicure",
            price: "£35",
            serviceName: "Manicure"
          },
          {
            id: "p3",
            title: "Classic Pedicure",
            price: "£30",
            serviceName: "Pedicure"
          },
          {
            id: "p4",
            title: "Gel Pedicure",
            price: "£40",
            serviceName: "Pedicure"
          }
        ]
      },
      {
        id: "1-2",
        name: "Premium Services",
        prices: [
          {
            id: "p5",
            title: "Luxury Manicure",
            price: "£45",
            serviceName: "Manicure"
          },
          {
            id: "p6",
            title: "Luxury Pedicure",
            price: "£50",
            serviceName: "Pedicure"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Nail Extensions",
    children: [
      {
        id: "2-1",
        name: "Extensions",
        prices: [
          {
            id: "p7",
            title: "Acrylic Full Set",
            price: "£45",
            serviceName: "Extensions"
          },
          {
            id: "p8",
            title: "Gel Extensions Full Set",
            price: "£55",
            serviceName: "Extensions"
          },
          {
            id: "p9",
            title: "Infill",
            price: "£35",
            serviceName: "Extensions"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Nail Art & Designs",
    children: [
      {
        id: "3-1",
        name: "Art Services",
        prices: [
          {
            id: "p10",
            title: "Simple Design (per nail)",
            price: "£3",
            serviceName: "Nail Art"
          },
          {
            id: "p11",
            title: "Complex Design (per nail)",
            price: "£5",
            serviceName: "Nail Art"
          },
          {
            id: "p12",
            title: "Full Set Designs",
            price: "£40+",
            serviceName: "Nail Art"
          }
        ]
      }
    ]
  }
];
