import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner
} from "@chakra-ui/core";
import { useManualQuery, useMutation } from "graphql-hooks";
import { withRouter } from "next/router";

export const singleProductQuery = `
  query ($id: uuid!){
    product_by_pk (id: $id) {
      id
      name
      description
      created_at
    }
  }
`;

export const updateProductMutation = `
  mutation ($name: bpchar!, $description: bpchar!, $productId: uuid!) {
    update_product(where: {id: {_eq: $productId}}, _set: {name: $name, description: $description}) {
      returning {
        id
        name
        description
      }
    }
  }
`;

const EditProductForm = ({ router }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fetchProduct, { loading, error }] = useManualQuery(singleProductQuery);
  const [updateProduct] = useMutation(updateProductMutation);

  useEffect(() => {
    const fetchProductThenSomething = async () => {
      const product = await fetchProduct({
        skipCache: true,
        variables: {
          id: router.query.productId
        }
      });

      setName(product.data.product_by_pk.name);
      setDescription(product.data.product_by_pk.description);
    };

    fetchProductThenSomething();
  }, []);

  if (loading) {
    return (
      <Box
        w="100%"
        minH="100vh"
        d="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        w="100%"
        minH="100vh"
        d="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Alert status="error" variant="left-accent">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      </Box>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();

    await updateProduct({
      variables: {
        name,
        description,
        productId: router.query.productId
      }
    });
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

export default withRouter(EditProductForm);
