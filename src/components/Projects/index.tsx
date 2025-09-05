import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Chip, Tab, Typography } from '@mui/material'

import { useTimeStore } from '../../store/getTimeStore'

type Project = {
  name: string
  link: string
  description: string
  image: string
  github: string
  resources: string[]
}

const projects: Project[] = [
  {
    name: 'EBAC Projeto 6',
    link: 'https://ebac-projeto6.vercel.app/',
    description: 'Projeto 6 - EBAC',
    image: '/images/ebac-projeto6.png',
    github: 'https://github.com/gmesmo/ebac-projeto6',
    resources: ['React', 'Typescript', 'Styled Components', 'React Router']
  },
  {
    name: 'Hotel Sereia',
    link: 'https://hotel-sereia.vercel.app/',
    description: 'Hotel Sereia',
    image: '/images/hotel-sereia.png',
    github: 'https://github.com/gmesmo/hotel-sereia',
    resources: []
  },
  {
    name: 'T20 Poderes',
    link: 'https://t20-poderes.vercel.app/',
    description: 'T20 Poderes',
    image: '/images/t20-poderes.png',
    github: 'https://github.com/gmesmo/t20-poderes',
    resources: []
  }
]

const Projects = () => {
  const [value, setValue] = useState('0')
  const { renderDaytime } = useTimeStore()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            textColor={!renderDaytime ? 'primary' : 'secondary'}
            indicatorColor={!renderDaytime ? 'primary' : 'secondary'}
            onChange={handleChange}
            aria-label='Projetos'
            centered
          >
            <Tab label='EBAC Projeto 6' value='0' />
            <Tab label='Hotel Sereia' value='1' />
            <Tab label='T20 Poderes' value='2' />
          </TabList>
        </Box>
        {projects.map((project, index) => (
          <TabPanel key={index} value={index.toString()}>
            <Typography variant='h6' align='center'>
              {project.name}
            </Typography>
            <Typography variant='body2' align='center'>
              {project.resources.map((resource, index) => (
                <Chip
                  key={index}
                  label={resource}
                  color={!renderDaytime ? 'primary' : 'secondary'}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Typography>
            <img
              src={project.image}
              alt={`Imagem do projeto ${project.name}`}
            />
            <p>{project.description}</p>
            <a href={project.link} target='_blank' rel='noreferrer'>
              Acessar
            </a>
            <a href={project.github} target='_blank' rel='noreferrer'>
              GitHub
            </a>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}

export default Projects
