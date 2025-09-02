import { create } from 'zustand'

type TimeState = {
  time: Date
  updateTime: () => void
  getTimezone: (timezone: string) => string
  sunset: Date | null
  sunrise: Date | null
  getSunTime: (latitude?: number, longitude?: number) => Promise<void>
}

/**
 * Zustand store hook for managing time-related state and utilities.
 *
 * @property {Date} time - The current time.
 * @property {Date | null} sunset - The sunset time, if available.
 * @property {Date | null} sunrise - The sunrise time, if available.
 *
 * @method updateTime - Updates the `time` state to the current date every second.
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
export const useTimeStore = create<TimeState>((set) => ({
  time: new Date(),
  sunset: null,
  sunrise: null,

  updateTime: () => {
    setTimeout(() => set({ time: new Date() }), 1000)
  },

  getTimezone: (timezone: string) =>
    new Date().toLocaleTimeString('en-US', { timeZone: timezone }),

  getSunTime: async (latitude?: number, longitude?: number) => {
    try {
      const { time } = useTimeStore.getState()
      let sunsetDate: Date
      let sunriseDate: Date

      if (latitude && longitude) {
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
      }

      set({ sunset: sunsetDate, sunrise: sunriseDate })
    } catch (error) {
      console.error(error)
    }
  }
}))
