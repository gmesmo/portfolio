import { isMobile } from '../../../utils/screen'
import Contact from '../../Contact'
import styles from './styles.module.scss'

type WinContentProps = {
  winName: string
}

const WinContent = ({ winName }: WinContentProps) => {
  return (
    <div className={styles.content}>
      {winName === 'SOBRE MIM' && <About />}
      {winName === 'PROJETOS' && <Projects />}
      {winName === 'CONTATO' && <Contact />}
    </div>
  )
}

const About = () => {
  return (
    <>
      <div className={`${styles.heading} ${isMobile() && styles.mobile}`}>
        <span>
          <p>Guilherme Machado</p>
          <p>Desenvolvedor Front-end</p>
        </span>
        <div className={styles.avatarWrapper}>
          <img src='https://github.com/gmesmo.png' alt='Guilherme Machado' />
        </div>
      </div>
      <div className={styles.text}>
        <p>
          Sou profissional de tecnologia com experiência em Suporte Técnico na
          Onsite Tecnologia, onde atuo auxiliando clientes em sistemas de gestão
          e vendas, desenvolvendo relatórios em SQL e realizando análises de
          dados para identificar e solucionar inconsistências. Essa vivência
          consolidou minhas habilidades técnicas e de resolução de problemas,
          fundamentais para o ambiente de TI.
        </p>
        <br />
        <p>
          Atualmente estou em transição para a área de desenvolvimento, cursando
          Formação Fullstack em Java pela EBAC e aprofundando meus estudos em
          front-end com React.js, Redux.js e consumo de APIs. Tenho como
          objetivo criar interfaces modernas, responsivas e voltadas para a
          experiência do usuário, contribuindo para projetos que agreguem valor
          real às equipes e organizações.
        </p>
      </div>
    </>
  )
}

const Projects = () => {
  return <div>Projects</div>
}

export default WinContent
