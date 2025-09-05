import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'

import { useTimeStore } from '../../store/getTimeStore'

const Projects = () => {
  const [value, setValue] = useState('1')
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
            <Tab label='EBAC Projeto 6' value='1' />
            <Tab label='Hotel Sereia' value='3' />
            <Tab label='T20 Poderes' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <p>Projeto 6</p>
        </TabPanel>
        <TabPanel value='2'>
          <p>T20 Poderes</p>
        </TabPanel>
        <TabPanel value='3'>
          <p>Hotel Sereia</p>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Projects
