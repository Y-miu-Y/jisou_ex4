import { Box, VStack, Spacer, Heading, Card, CardBody, Button, FormControl, FormLabel, Input, Text, FormErrorMessage } from "@chakra-ui/react";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type UserSearch = {
  id: string;
}

export const SearchUser: FC = () => {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<UserSearch>();

  const onSubmit:SubmitHandler<UserSearch> = (data) => {
    navigate(`cards/${data.id}`)
    return false;
  } 

  return (
    <>
      <Box justifyContent='center' height="100vh" alignItems='center' bg='gray.100'>
        <VStack h="100%" justifyContent="center">
          <Spacer h={50}></Spacer>
          <Heading as="h1" size="lg" data-testid="title">
            デジタル名刺アプリ
          </Heading>
          <Card  w="80vw">
            <CardBody>
            <Box maxWidth="400px" margin="auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <VStack spacing={5}>
                    <FormControl isInvalid={!!errors.id}>
                      <FormLabel htmlFor="id">ID</FormLabel>
                      <Input id="id" borderWidth="2px" borderColor="black"
                        data-testid="id"
                        {...register('id', {
                          required: 'IDを入力してください'
                        })}
                      />
                      <FormErrorMessage data-testid="id-err">
                        {errors.id && errors.id.message}
                      </FormErrorMessage>
                    </FormControl>

                    <Button w="100%" type="submit" backgroundColor="coral" color="white" data-testid="submit">検索</Button>
                    
                  </VStack>
                </form>
              </Box>
            </CardBody>
          </Card>
          <Button
            onClick={() => navigate('/cards/register')}
            data-testid="register"
            w='80vw'
          >
            新規登録はこちら
          </Button>
          <Spacer h="sm"></Spacer>
        </VStack>
      </Box>
    </>
  );
};