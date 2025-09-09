import { Box, Button, Portal, Tab, Tooltip, Typography } from '@mui/material'

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
import CloseIcon from '@mui/icons-material/Close'

import { useTimeStore } from '../../store/getTimeStore'
import styles from './styles.module.scss'

import efood from '../../assets/images/efood.png'
import hotelsereia from '../../assets/images/hotelsereia.png'
import t20poderes from '../../assets/images/t20-poderes.png'
import { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { isMobile } from '../../utils/screen'

const projects: Project[] = [
  {
    name: 'EBAC Projeto 6',
    link: 'https://efood-gmesmo.vercel.app/',
    description:
      'Este projeto é uma plataforma de delivery de alimentos que permite a gestão de restaurantes e seus cardápios. Desenvolvido com React, TypeScript, Styled Components e Formik, a aplicação oferece uma experiência intuitiva para a exploração de restaurantes, visualização de detalhes e gerenciamento de pedidos, integrando-se a uma API para dados dinâmicos.',
    image: efood,
    github: 'https://github.com/gmesmo/ebac_projeto_6',
    resources: [
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
        name: 'API',
        icon: AiFillApi
      }
    ]
  },
  {
    name: 'Hotel Sereia',
    link: 'https://hotelsereia.com.br',
    description:
      'Desenvolvido como um projeto freelance, o website do Hotel Sereia oferece uma experiência digital completa para os hóspedes, apresentando a estrutura, serviços e belezas naturais do hotel. Construído com Vite, TypeScript, CSS Modules e I18Next, o site garante performance, escalabilidade e suporte a múltiplos idiomas, refletindo a qualidade e o conforto do empreendimento.',
    image: hotelsereia,
    github: 'https://github.com/gmesmo/hotel-sereia-ts',
    resources: [
      {
        name: 'Vite',
        icon: SiVite
      },
      {
        name: 'Typescript',
        icon: BiLogoTypescript
      },
      {
        name: 'CSS Modules',
        icon: SiCssmodules
      },
      {
        name: 'I18Next',
        icon: SiI18Next
      }
    ]
  },
  {
    name: 'T20 Poderes',
    link: 'https://t20-poderes.vercel.app/',
    description:
      'Este projeto foi desenvolvido como um hobby para auxiliar jogadores e mestres de RPG de mesa, especificamente para o sistema Tormenta20. Com o objetivo de facilitar o acesso a informações oficiais de poderes e habilidades, a plataforma oferece uma interface intuitiva para consulta rápida. Construído com React, TypeScript e CSS Modules, o site garante uma experiência de usuário fluida e eficiente, tornando a gestão de regras e a criação de personagens mais acessíveis.',
    image: t20poderes,
    github: 'https://github.com/gmesmo/t20-poderes',
    resources: [
      {
        name: 'React',
        icon: FaReact
      },
      {
        name: 'Typescript',
        icon: BiLogoTypescript
      },
      {
        name: 'CSS Modules',
        icon: SiCssmodules
      }
    ]
  }
]

const Projects = () => {
  const { renderDaytime } = useTimeStore()
  const [value, setValue] = useState(0)

  const [iframe, setIframe] = useState({
    name: '',
    link: ''
  })
  const [showIframe, setShowIframe] = useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleClick = (name: string, link: string, iframe: boolean) => {
    if (iframe && !isMobile()) {
      setIframe({ name, link })
      setShowIframe(true)
      return
    } else {
      window.open(link, '_blank')
    }
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <TabContext value={value}>
        <TabList
          orientation='vertical'
          textColor={!renderDaytime ? 'primary' : 'secondary'}
          indicatorColor={!renderDaytime ? 'primary' : 'secondary'}
          onChange={handleChange}
          aria-label='Projetos'
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {projects.map((project, index) => (
            <Tab key={index} label={project.name} value={index} />
          ))}
        </TabList>
        <Box
          sx={{
            width: '80%',
            fullHeight: '100%'
          }}
        >
          {projects.map((project, i) => (
            <TabPanel key={i} value={i}>
              <Box className={styles.projectHeader}>
                <Typography variant='h5'>{project.name}</Typography>
                <div className={styles.resources}>
                  {project.resources.map((resource) => {
                    const Icon = resource.icon

                    return (
                      <Tooltip
                        title={resource.name}
                        key={resource.name}
                        placement='bottom'
                        arrow
                      >
                        <Icon size={28} />
                      </Tooltip>
                    )
                  })}
                </div>
                <div className={styles.imageGroup}>
                  <img src={project.image} alt={project.name} />
                  <div>
                    <Button
                      variant='contained'
                      sx={{ width: '50%' }}
                      onClick={() =>
                        handleClick(project.name, project.github, false)
                      }
                    >
                      GitHub
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ width: '50%' }}
                      onClick={() =>
                        handleClick(project.name, project.link, true)
                      }
                    >
                      Visualizar
                    </Button>
                  </div>
                </div>
              </Box>
              <Typography
                variant='body1'
                sx={{ mt: 2, textAlign: 'justify', textIndent: '2rem' }}
              >
                {project.description}
              </Typography>
            </TabPanel>
          ))}
        </Box>
      </TabContext>
      {showIframe && (
        <>
          <Portal container={document.getElementById('desktop')}>
            <div className={styles.overlay}>
              <div className={styles.iframeHeader}>
                <h2>{iframe.name}</h2>
                <Button
                  onClick={() => setShowIframe(false)}
                  sx={{ minWidth: '30px', padding: 0, color: '#fff' }}
                >
                  <CloseIcon />
                </Button>
              </div>
            </div>
            <iframe src={iframe.link} title={'Iframe'} />
          </Portal>
        </>
      )}
    </Box>
  )
}

export default Projects
