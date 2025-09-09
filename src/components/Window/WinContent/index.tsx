import { isMobile } from '../../../utils/screen'
import Contact from '../../Contact'
import Projects from '../../Projects'
import styles from './styles.module.scss'

import { FaReact } from 'react-icons/fa'
import { BiLogoTypescript } from 'react-icons/bi'
import {
  SiStyledcomponents,
  SiFormik,
  SiVite,
  SiCssmodules,
  SiI18Next
} from 'react-icons/si'
import { AiFillApi } from 'react-icons/ai'
import { Tooltip } from '@mui/material'

type WinContentProps = {
  winName: string
}

const techs: Resource[] = [
  {
    name: 'React',
    icon: FaReact
  },
  {
    name: 'Typescript',
    icon: BiLogoTypescript
  },
  {
    name: 'Styled Components',
    icon: SiStyledcomponents
  },
  {
    name: 'Formik',
    icon: SiFormik
  },
  {
    name: 'Vite',
    icon: SiVite
  },
  {
    name: 'CSS Modules',
    icon: SiCssmodules
  },
  {
    name: 'i18next',
    icon: SiI18Next
  }
]

const WinContent = ({ winName }: WinContentProps) => {
  return (
    <div className={styles.content}>
      {winName === 'SOBRE MIM' && <About />}
      {winName === 'PROJETOS' && <Projects />}
      {winName === 'CONTATO' && <Contact />}
    </div>
  )
}

/**
 * Componente About exibe informações sobre Guilherme Machado, incluindo nome, cargo,
 * foto de perfil e uma breve descrição de sua experiência profissional e objetivos de carreira.
 *
 * @returns {JSX.Element} Um bloco de conteúdo com informações pessoais e profissionais.
 */
const About = () => {
  return (
    <div className={styles.about}>
      <div className={`${styles.heading} ${isMobile() && styles.mobile}`}>
        <span>
          <p>Guilherme Machado</p>
          <p>Desenvolvedor Front-end</p>
        </span>
        <div className={styles.avatarWrapper}>
          <img src='https://github.com/gmesmo.png' alt='Guilherme Machado' />
        </div>
      </div>
      <div className={styles.techs}>
        <p>Tecnologias</p>
        <div className={styles.techsList}>
          {techs.map((tech) => {
            const TechIcon = tech.icon

            return (
              <Tooltip title={tech.name} key={tech.name}>
                <TechIcon size={30} />
              </Tooltip>
            )
          })}
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
    </div>
  )
}

export default WinContent
