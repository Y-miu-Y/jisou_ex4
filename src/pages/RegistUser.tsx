import { Box, Card, CardBody,  Heading, VStack, Spacer, FormControl, FormLabel, Input, Textarea, Select, Text, Button, FormErrorMessage } from "@chakra-ui/react"
import { FC, Fragment, useEffect } from "react"
import { useGetSkills } from "../hooks/useGetSkills";
import { useAddUser, UserInput } from "../hooks/useAddUser";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const RegistUser:FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<UserInput>();

  const { skills, getSkills } = useGetSkills();

  const { addUser, isRequestLoading } = useAddUser();

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  const onSubmit: SubmitHandler<UserInput> = (data) => {
    addUser(data)
    .then(() => {
      navigate('/');
    });

    return false;
  }

  return (
    <>
      <Box justifyContent='center' height="100%" alignItems='center' bg='gray.100'>
        <VStack>
          <Spacer h={50}></Spacer>
          <Heading as="h1" size="lg">
            名刺新規登録
          </Heading>
          <Card h="80%" w="80vw">
            <CardBody>
              <Box maxWidth="400px" margin="auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <VStack spacing={5}>
                    <FormControl isInvalid={!!errors.user_id}>
                      <FormLabel htmlFor="user_id">好きな英単語 *</FormLabel>
                      <Input id="user_id" borderWidth="2px" borderColor="black" placeholder="coffee"
                        {...register('user_id', {
                          required : '必須項目です',
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: '英語文字列のみです'
                          }
                        })}
                      />
                      <FormErrorMessage>
                        {errors.user_id && errors.user_id.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.name}>
                      <FormLabel htmlFor="name">お名前 *</FormLabel>
                      <Input id="name" borderWidth="2px" borderColor="black"
                      {...register('name', {
                        required : '必須項目です'
                        }
                      )}
                      />
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.description}>
                      <FormLabel htmlFor="description">自己紹介 *</FormLabel>
                      <Textarea id="description" borderWidth="2px" borderColor="black" resize="none" 
                        placeholder="<h1>HTMLタグも使えます</h1>"
                        {...register('description', {
                          required : '必須項目です'
                          }
                        )}
                      />
                      <FormErrorMessage>
                        {errors.description && errors.description.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.skills_id}>
                      <FormLabel htmlFor="skills_id">好きな技術 * </FormLabel>
                      <Select id="skills_id" borderWidth="2px" borderColor="black" defaultValue=""
                        {...register('skills_id', {
                            required : '必須項目です'
                        })}
                      >
                        <option disabled value="">Select Option</option>
                        {skills.map((skill) => (
                          <Fragment key={skill.id}>
                            <option value={skill.id} >{skill.name}</option>
                          </Fragment>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {errors.skills_id && errors.skills_id.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="github_id">Github ID</FormLabel>
                      <Input id="github_id" borderWidth="2px" borderColor="black" />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="qiita_id">Qiita ID</FormLabel>
                      <Input id="qiita_id" borderWidth="2px" borderColor="black" />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="x_id">X ID</FormLabel>
                      <Input id="x_id" borderWidth="2px" borderColor="black" />
                    </FormControl>

                    <Text as="p" w="100%">*は必須項目です</Text>

                    <Button w="100%" type="submit" backgroundColor="blue" color="white">登録</Button>
                    
                  </VStack>
                </form>
              </Box>
            </CardBody>
          </Card>
          <Spacer h="sm"></Spacer>
        </VStack>
      </Box>
    </>
  )
}