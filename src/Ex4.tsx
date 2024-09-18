import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Ex4Router } from "./Ex4Router";

export const Ex4: FC = () => {
  return (
    <>
      <ChakraProvider>
        <Ex4Router />
      </ChakraProvider>
    </>
  );
};