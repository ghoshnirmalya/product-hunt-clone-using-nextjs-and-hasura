import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input
} from "@chakra-ui/core";
import { setCookie } from "nookies";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch("http://localhost:3030/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        confirmPassword
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const data = await response.json();

    if (response.status !== 200) {
      setError("Something went wrong! Please try again.");
    } else {
      setCookie({}, "X-Hasura-User-Id", data.id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });

      setCookie({}, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
    }
  };

  const errorsNode = () => {
    if (!error) return false;

    return (
      <Alert status="error" mb={8} rounded="md" variant="left-accent">
        <AlertIcon />
        {error}
      </Alert>
    );
  };

  return (
    <Box
      w="100%"
      h="100vh"
      p={4}
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="500px" p={8} bg="gray.50" rounded="md">
        {errorsNode()}
        <FormControl mb={8}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            id="username"
            aria-describedby="john"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mb={8}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            aria-describedby="*****"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl mb={8}>
          <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
          <Input
            type="password"
            id="confirm-password"
            aria-describedby="*****"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {!!confirmPassword && confirmPassword !== password && (
            <FormHelperText id="confirm-password">
              Passwords do not match
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <Button bg="#764ABC" color="white" onClick={handleSubmit}>
            Sign Up
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SignUpForm;
