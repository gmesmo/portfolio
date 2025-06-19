import Paragrafo from '../Paragrafo'
import Title from '../Title'
import { Card, LinkBotao } from './styles'

const Projeto = () => {
  return (
    <Card>
      <Title>Projeto Lista de Tarefas</Title>
      <Paragrafo tipo="secundario">Lista de tarefas feita com VueJS</Paragrafo>
      <LinkBotao href="https://github.com/gmesmo/lista-de-tarefas">
        Visualizar
      </LinkBotao>
    </Card>
  )
}

export default Projeto
