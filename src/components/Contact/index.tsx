import { FormEvent } from 'react'
import { sendEmail } from '../../utils/sendEmail'

const Contact = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const response = await sendEmail(form)

    if (response.success) {
      alert('✅ Mensagem enviada com sucesso!')
      form.reset()
    } else {
      alert('❌ ' + response.message)
      console.error(response)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='user_name' placeholder='Seu nome' required />
      <input type='email' name='reply_to' placeholder='Seu email' required />
      <textarea name='message' placeholder='Sua mensagem' required />
      <button type='submit'>Enviar</button>
    </form>
  )
}

export default Contact
