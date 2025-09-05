import emailjs from 'emailjs-com'
import { env } from '../env'

export const sendEmail = async (form: HTMLFormElement) => {
  try {
    const result = await emailjs.sendForm(
      env.service_id,
      env.template_id,
      form,
      env.public_key
    )

    return { success: true, message: result.text || 'Enviado com sucesso' }
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.text ||
        error?.message ||
        JSON.stringify(error) ||
        'Erro desconhecido'
    }
  }
}
