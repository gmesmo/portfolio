import { FormEvent, useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Alert, Button, ButtonGroup, Input, TextField } from '@mui/material'

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
            aria-label='Opções de contato'
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

/**
 * Email component renders a contact form for users to send an email.
 *
 * - Uses `useTimeStore` to determine the current daytime and adjust input colors accordingly.
 * - Handles form submission asynchronously via `sendEmail`.
 * - Displays a success or error alert based on the result of the email sending operation.
 *
 * @returns {JSX.Element} The rendered contact form and status alerts.
 */

const Email = () => {
  const [emailState, setEmailState] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { renderDaytime } = useTimeStore()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setEmailState('')

    const form = e.currentTarget
    const response = await sendEmail(form)

    if (response.success) {
      setEmailState('enviado')
      form.reset()
    } else {
      setEmailState('erro')
    }

    setIsLoading(false)
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* ✅ Nome do remetente - campo obrigatório */}
        <Input
          type='text'
          name='from_name' // ← Nome padrão do EmailJS
          placeholder='Seu nome'
          color={!renderDaytime ? 'primary' : 'secondary'}
          required
        />

        {/* ✅ Email do remetente - para resposta */}
        <Input
          type='email'
          name='from_email' // ← Nome padrão do EmailJS
          placeholder='Seu email'
          color={!renderDaytime ? 'primary' : 'secondary'}
          required
        />

        {/* ✅ Assunto do email (opcional mas recomendado) */}
        <Input
          type='text'
          name='subject'
          placeholder='Assunto'
          color={!renderDaytime ? 'primary' : 'secondary'}
        />

        {/* ✅ Mensagem */}
        <TextField
          name='message'
          label='Sua mensagem'
          variant='filled'
          multiline
          rows={4}
          color={!renderDaytime ? 'primary' : 'secondary'}
          required
        />

        {/* ✅ Campos adicionais úteis (ocultos) */}
        <input
          type='hidden'
          name='to_name'
          value='Destinatário' // ← Substitua pelo nome do destinatário
        />

        <input
          type='hidden'
          name='reply_to'
          value='' // ← Será preenchido automaticamente com from_email
        />

        <Button
          variant='contained'
          fullWidth={true}
          type='submit'
          color={!renderDaytime ? 'primary' : 'secondary'}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>

      {emailState === 'enviado' ? (
        <Alert severity='success' onClose={() => setEmailState('')}>
          Email enviado com sucesso!
        </Alert>
      ) : (
        emailState === 'erro' && (
          <Alert severity='error' onClose={() => setEmailState('')}>
            Erro ao enviar email. Tente novamente.
          </Alert>
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
    <div className={styles.whatsContainer}>
      <ButtonGroup fullWidth={true}>
        <TextField
          color={!renderDaytime ? 'primary' : 'secondary'}
          id='whats'
          name='message'
          label='Sua mensagem'
          variant='filled'
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
