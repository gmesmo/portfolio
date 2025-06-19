import { Title as TituloEstilo } from './styles'

export type Props = {
  children: string
  fontSize?: number
}

const Title = (props: Props) => {
  return <TituloEstilo fontSize={props.fontSize}>{props.children}</TituloEstilo>
}

export default Title
