import { Text, Box, Card, CardBody, CardHeader, Heading, HStack, Center } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { Loading } from "../components/Loading";
import { InnerHTML } from "../components/InnerHTML";
import { GithubIcon, QiitaIcon, XIcon } from "../components/atoms/SnsIcons";


export const UserCard: FC = () => {
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
        <Card maxH="80vh" w="80vw">
          <CardHeader>
            <Heading as="h1" size="lg">
              {user?.name}
            </Heading>
          </CardHeader>
          <CardBody>
            <Box>
              <Heading as="h2" size="sm">
                自己紹介
              </Heading>
              <Box>
                <InnerHTML text={user?.description}/>
              </Box>
            </Box>

            <Box>
              <Heading as="h2" mt={3} size="sm">
                好きな技術
              </Heading>
              <Box>
                {user?.skills_name.map((skill) => (
                  <>
                    <Text>
                      {skill}
                    </Text>
                  </>
                ))}
              </Box>
            </Box>
            <Box>
              <Center>
                <HStack spacing={5} mt={5}>
                  {user.github_id && (
                    <GithubIcon id={user.github_id} />
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
      </Box>
    </>
  );
};