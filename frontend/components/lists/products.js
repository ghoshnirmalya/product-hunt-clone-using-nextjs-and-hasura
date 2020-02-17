import React from "react";
import { Grid, Box } from "@chakra-ui/core";

const ProductsList = () => {
  return (
    <Box
      w="100%"
      h="100vh"
      p={4}
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="800px" p={8} bg="gray.50" borderRadius="sm">
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)"
          ]}
          gap={8}
        >
          <Box w="100%" h={24} bg="#764ABC" rounded="md" />
          <Box w="100%" h={24} bg="#764ABC" rounded="md" />
          <Box w="100%" h={24} bg="#764ABC" rounded="md" />
          <Box w="100%" h={24} bg="#764ABC" rounded="md" />
          <Box w="100%" h={24} bg="#764ABC" rounded="md" />
          <Box w="100%" h={24} bg="#764ABC" rounded="md" />
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductsList;
