import { FC } from "react"

type Props = {
  text: string;
}

export const InnerHTML:FC<Props> = props => {
  const { text } = props
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text
      }}
    />
  )
}