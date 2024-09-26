import { Box } from "@chakra-ui/react";
import { FC } from "react"
import { FaGithub,  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiQiita } from "react-icons/si";

type Props = {
  id: string;
}

export const QiitaIcon:FC<Props> = props => {
  const { id } = props
  return (
    <Box data-testid="qiita">
      <a href={`https://qiita.com/${id}`}>
        <SiQiita size="3rem"/>
      </a>
    </Box>
  )
}

export const GithubIcon:FC<Props> = props => {
  const { id } = props
  return (
    <Box data-testid="github">
      <a href={`https://github.com/${id}`}>
        <FaGithub  size="3rem"/>
      </a>
    </Box>
  )
}

export const XIcon:FC<Props> = props => {
  const { id } = props
  return (
    <Box data-testid="X">
      <a href={`https://x.com/${id}`}>
        <FaXTwitter  size="3rem"/>
      </a>
    </Box>
  )
}