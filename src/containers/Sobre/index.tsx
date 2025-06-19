import Paragrafo from '../../components/Paragrafo'
import Title from '../../components/Title'
import { GithubSecao } from './styles'

const Sobre = () => {
  return (
    <section>
      <Title fontSize={16}>Sobre mim</Title>
      <Paragrafo tipo="principal">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
        neque, ipsum officia aspernatur eveniet quo sunt! Saepe, quaerat.
        Numquam officia voluptatum officiis voluptas iste nostrum laboriosam
        quisquam eos hic incidunt.
      </Paragrafo>
      <GithubSecao>
        <img src="https://github-readme-stats.vercel.app/api?username=gmesmo&show_icons=true&theme=midnight-purple" />
        <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=gmesmo&layput=compact&langs_count=16&theme=midnight-purple" />
      </GithubSecao>
    </section>
  )
}

export default Sobre
