import { create } from 'zustand'

type TimeState = {
  time: Date
  sunset: Date | null
  sunrise: Date | null
  renderDaytime: boolean
  updateTime: () => void
  getTimezone: (timezone: string) => string
  getSunTime: (latitude?: number, longitude?: number) => Promise<void>
  isNight: () => boolean
  setRenderDaytime: (value: boolean) => void
}

/**
 * Zustand store hook for managing time-related state and utilities.
 *
 * @property {Date} time - The current time.
 * @property {Date | null} sunset - The sunset time, if available.
 * @property {Date | null} sunrise - The sunrise time, if available.
 *
 * @method updateTime - Updates the `time` state to the current date every second.
 * @returns {void}
 *
 * @method getTimezone - Returns a formatted time string for a given timezone.
 * @param {string} timezone - The IANA timezone string (e.g., "America/New_York").
 * @returns {string} - The formatted time string for the specified timezone.
 *
 * @method getSunTime - Fetches and sets the sunrise and sunset times based on latitude and longitude.
 * If latitude and longitude are not provided, defaults to 6:00 AM for sunrise and 6:00 PM for sunset.
 * @param {number} [latitude] - The latitude coordinate.
 * @param {number} [longitude] - The longitude coordinate.
 * @returns {Promise<void>} - Resolves when the sunrise and sunset times are updated.
 */
const timeStore = create<TimeState>((set, get) => ({
  renderDaytime: false,
  time: new Date(),
  // define sunset e sunrise com valores padrão
  // caso o usuário não tenha permitido a localização
  sunset: new Date(new Date().setHours(18, 0, 0, 0)), // Padrão: 18:00 do dia atual
  sunrise: new Date(new Date().setHours(6, 0, 0, 0)), // Padrão: 06:00 do dia atual

  updateTime: () => {
    // Atualiza o tempo a cada minuto
    setTimeout(() => set({ time: new Date() }), 60000)
  },

  getTimezone: (timezone: string) =>
    new Date().toLocaleTimeString('en-US', { timeZone: timezone }),

  getSunTime: async (latitude?: number, longitude?: number) => {
    try {
      const { time } = get()
      let sunsetDate: Date
      let sunriseDate: Date

      if (latitude && longitude) {
        console.log('latitude e longitude', latitude, longitude)
        const res = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
        )
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

        console.log(`${sunsetDate} - ${sunriseDate}`)
      }

      set({ sunset: sunsetDate, sunrise: sunriseDate })
    } catch (error) {
      console.error(error)
    }
  },

  isNight: () => {
    const { time, sunset, sunrise, getSunTime } = get()

    if (sunset === null || sunrise === null) {
      getSunTime()
      return false // Retorna false temporariamente enquanto aguarda o getSunTime
    }

    // A noite é quando o tempo atual é maior que o pôr do sol OU menor que o nascer do sol (no caso de passar meia-noite)
    return time > sunset! || time < sunrise!
  },

  setRenderDaytime: (value: boolean) => {
    set({ renderDaytime: value })
  }
}))

export const useTimeStore = timeStore
