import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/core";
import { parseCookies } from "nookies";
import { useMutation } from "graphql-hooks";
import { withRouter } from "next/router";

export const insertProductMutation = `
  mutation ($name: bpchar!, $description: bpchar!, $maker_id: uuid!) {
    insert_product(objects: {description: $description, name: $name, maker_id: $maker_id}) {
      returning {
        id
        name
      }
    }
  }
`;

const AddNewProductForm = ({ router }) => {
  const [insertProduct] = useMutation(insertProductMutation);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const maker_id = parseCookies()["X-Hasura-User-Id"];

  const handleSubmit = async e => {
    e.preventDefault();

    await insertProduct({
      variables: {
        name,
        description,
        maker_id
      }
    });

    setName("");
    setDescription("");

    router.push("/products");
  };

  return (
    <Box
      w="100%"
      minH="100vh"
      p={4}
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="500px" p={8} bg="gray.50" rounded="md">
        <FormControl mb={8}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            id="name"
            aria-describedby="john"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={8}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            type="text"
            id="description"
            aria-describedby="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button bg="#764ABC" color="white" onClick={handleSubmit}>
            Save
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default withRouter(AddNewProductForm);
