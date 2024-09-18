import { Center, Spinner } from "@chakra-ui/react";
import { FC } from "react";

export const Loading: FC = () => {
  return (
    <>
      <Center>
        <Spinner></Spinner>
      </Center>
    </>
  );
};