import { Text, Box, Card, CardBody, CardHeader, Heading, HStack, Center, Button, VStack, Spacer } from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { Loading } from "../components/Loading";
import { InnerHTML } from "../components/InnerHTML";
import { GithubIcon, QiitaIcon, XIcon } from "../components/atoms/SnsIcons";


export const UserCard: FC = () => {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const { isUserLoading, user, getUser } = useGetUser();

  useEffect(() => getUser(id!), [getUser, id]);

  if(isUserLoading || user === undefined) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <>
      <Box h="100vh" display='flex' justifyContent='center' alignItems='center' bg='gray.100'>
        <VStack w="80vw">
          <Card maxH="80vh" w="100%">
            <CardHeader>
              <Heading as="h1" size="lg" data-testid="name">
                {user?.name}
              </Heading>
            </CardHeader>
            <CardBody>
              <Box>
                <Heading as="h2" size="sm">
                  自己紹介
                </Heading>
                <Box data-testid="desc">
                  <InnerHTML text={user?.description}/>
                </Box>
              </Box>

              <Box>
                <Heading as="h2" mt={3} size="sm">
                  好きな技術
                </Heading>
                <Box>
                  {user?.skills_name.map((skill, index) => (
                    <Text data-testid="skill" key={index}> 
                      {skill}
                    </Text>
                  ))}
                </Box>
              </Box>
              <Box>
                <Center>
                  <HStack spacing={5} mt={5}>
                    {user.github_id && (
                      <GithubIcon id={user.github_id}/>
                    )}
                    {user.qiita_id && (
                      <QiitaIcon id={user.qiita_id} />
                    )}
                    {user.x_id && (
                      <XIcon id={user.x_id} />
                    )}
                  </HStack>
                </Center>
                
              </Box>
            </CardBody>
          </Card>
          <Spacer h="10px"></Spacer>
          <Button w="100%" backgroundColor="blue" color="white"
            onClick={() => navigate('/')}
            data-testid="return-button"
          >
            戻る
          </Button>
        </VStack>
      </Box>
    </>
  );
};