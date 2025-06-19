import Avatar from '../../components/Avatar'
import Paragrafo from '../../components/Paragrafo'
import Title from '../../components/Title'

import { Descricao, BotaoTema, SidebarContainer } from './styles'

const Sidebar = () => {
  return (
    <aside>
      <SidebarContainer>
        <Avatar />
        <Title fontSize={20}>Guilherme Machado</Title>
        <Paragrafo tipo="secundario" fontSize={16}>
          gmesmo
        </Paragrafo>
        <Descricao tipo="principal" fontSize={12}>
          Desenvolvedor Front-End
        </Descricao>
        <BotaoTema>Trocar Tema</BotaoTema>
      </SidebarContainer>
    </aside>
  )
}

export default Sidebar
