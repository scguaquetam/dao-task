import { NextApiRequest, NextApiResponse } from "next";
import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/login";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      if (req.body.type === "login") {
        return await login(req, res);
      }
    }
  } catch (error) {
    console.log("Error is ", error);
    res.status(500).json({ message: "error fetching" });
  }
}
async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('22');
    const response = await client.mutate({
      mutation: LOGIN,
      variables: {
        loginInput: {
          address: req.body.address,
        },
      },
    });
    console.log('33');
    console.log(response.data);
    if (response) {
      res.status(200).json({ message: "User Found", data: response.data });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error finding user" });
  }
}
