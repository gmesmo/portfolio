import { create } from 'zustand'

type TimeState = {
  time: Date
  sunset: Date | null
  sunrise: Date | null
  renderDaytime: boolean
  isLoading: boolean // Nova propriedade para controlar loading
  updateTime: () => void
  stopUpdateTime: () => void // Nova função para parar o timer
  getTimezone: (timezone: string) => string
  getSunTime: (latitude?: number, longitude?: number) => Promise<void>
  isNight: () => boolean
  setRenderDaytime: (value: boolean) => void
}

/**
 * Zustand store hook for managing time-related state and utilities.
 */
const timeStore = create<TimeState>((set, get) => {
  let timeInterval: NodeJS.Timeout | null = null

  return {
    renderDaytime: false,
    time: new Date(),
    isLoading: false,
    // define sunset e sunrise com valores padrão
    sunset: new Date(new Date().setHours(18, 0, 0, 0)),
    sunrise: new Date(new Date().setHours(6, 0, 0, 0)),

    updateTime: () => {
      // Para qualquer timer anterior
      if (timeInterval) {
        clearInterval(timeInterval)
      }

      // Inicia novo timer que atualiza a cada minuto
      timeInterval = setInterval(() => {
        set({ time: new Date() })
      }, 60000)
    },

    stopUpdateTime: () => {
      if (timeInterval) {
        clearInterval(timeInterval)
        timeInterval = null
      }
    },

    getTimezone: (timezone: string) =>
      new Date().toLocaleTimeString('en-US', { timeZone: timezone }),

    getSunTime: async (latitude?: number, longitude?: number) => {
      const { isLoading } = get()

      // Evita múltiplas chamadas simultâneas
      if (isLoading) {
        return
      }

      set({ isLoading: true })

      try {
        const { time } = get()
        let sunsetDate: Date
        let sunriseDate: Date

        if (latitude && longitude) {
          const res = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
          )

          if (!res.ok) {
            throw new Error(`API Error: ${res.status}`)
          }

          const data = await res.json()
          sunsetDate = new Date(data.results.sunset)
          sunriseDate = new Date(data.results.sunrise)
        } else {
          sunsetDate = new Date(
            time.getFullYear(),
            time.getMonth(),
            time.getDate(),
            18,
            0,
            0,
            0
          )
          sunriseDate = new Date(
            time.getFullYear(),
            time.getMonth(),
            time.getDate(),
            6,
            0,
            0
          )
        }

        set({
          sunset: sunsetDate,
          sunrise: sunriseDate,
          isLoading: false
        })
      } catch (error) {
        set({ isLoading: false })
      }
    },

    isNight: () => {
      const { time, sunset, sunrise } = get()

      // Se não temos os horários do sol, assumimos valores padrão
      // Não chamamos getSunTime aqui para evitar loops
      if (sunset === null || sunrise === null) {
        const defaultSunset = new Date(
          time.getFullYear(),
          time.getMonth(),
          time.getDate(),
          18,
          0,
          0,
          0
        )
        const defaultSunrise = new Date(
          time.getFullYear(),
          time.getMonth(),
          time.getDate(),
          6,
          0,
          0,
          0
        )
        return time > defaultSunset || time < defaultSunrise
      }

      // A noite é quando o tempo atual é maior que o pôr do sol OU menor que o nascer do sol
      return time > sunset || time < sunrise
    },

    setRenderDaytime: (value: boolean) => {
      set({ renderDaytime: value })
    }
  }
})

export const useTimeStore = timeStore
