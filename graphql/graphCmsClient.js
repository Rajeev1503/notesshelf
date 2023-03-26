import { GraphQLClient } from "graphql-request";

export const graphCmsReadOnly = new GraphQLClient(
    "https://ap-south-1.cdn.hygraph.com/content/cleof833q18ns01udb6rxcwl0/master"
  );
  
export const graphCmsReadAndWrite = new GraphQLClient(
    "https://api-ap-south-1.hygraph.com/v2/cleof833q18ns01udb6rxcwl0/master",
    {
      headers: {
      authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`
    },
  }
  );