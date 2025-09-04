import { FormEvent, useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Alert, Button, ButtonGroup, TextField } from '@mui/material'

import { sendEmail } from '../../utils/sendEmail'
import styles from './styles.module.scss'
import { useTimeStore } from '../../store/getTimeStore'

const Contact = () => {
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
            aria-label='lab API tabs example'
            className={styles.buttons}
            centered
          >
            <Tab label='Chame no e-mail' value='1' />
            <Tab label='ou Whatsapp' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Email />
        </TabPanel>
        <TabPanel value='2'>
          <Whats />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

const Email = () => {
  const [emailState, setEmailState] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const response = await sendEmail(form)

    if (response.success) {
      setEmailState('enviado')
      form.reset()
    } else {
      setEmailState('erro')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' name='user_name' placeholder='Seu nome' required />
        <input type='email' name='reply_to' placeholder='Seu email' required />
        <textarea name='message' placeholder='Sua mensagem' required />
        <button type='submit'>Enviar</button>
      </form>
      {emailState === 'enviado' ? (
        <Alert severity='success'>Email enviado com sucesso</Alert>
      ) : (
        emailState === 'erro' && (
          <Alert severity='error'>Erro ao enviar email</Alert>
        )
      )}
    </>
  )
}

const Whats = () => {
  const [message, setMessage] = useState('Olá, estou vindo do site!')
  const { renderDaytime } = useTimeStore()

  const openNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div>
      <ButtonGroup fullWidth={true}>
        <TextField
          color={!renderDaytime ? 'primary' : 'secondary'}
          id='whats'
          name='number'
          label='Sua mensagem'
          variant='outlined'
          required
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          className={styles.whats}
        />
        <Button
          variant='contained'
          color={!renderDaytime ? 'primary' : 'secondary'}
          sx={{ width: 150 }}
          onClick={() =>
            openNewTab(`https://wa.me/5551989161212?text=${message}`)
          }
        >
          Enviar
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Contact
