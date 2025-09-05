import { create } from 'zustand'
import {
  checkGeolocationPermission,
  requestGeolocationPermission,
  markGeolocationUsage,
  type GeolocationPermissionState
} from '../utils/geolocation'

type TimeState = {
  time: Date
  sunset: Date | null
  sunrise: Date | null
  renderDaytime: boolean
  isLoading: boolean
  permissionStatus: GeolocationPermissionState
  updateTime: () => void
  stopUpdateTime: () => void
  getTimezone: (timezone: string) => string
  getSunTime: (latitude?: number, longitude?: number) => Promise<void>
  checkGeolocationPermission: () => Promise<void>
  requestLocationPermission: () => Promise<boolean>
  isNight: () => boolean
  setRenderDaytime: (value: boolean) => void
}

const timeStore = create<TimeState>((set, get) => {
  let timeInterval: NodeJS.Timeout | null = null

  return {
    renderDaytime: false,
    time: new Date(),
    isLoading: false,
    permissionStatus: 'prompt', // Estado inicial da permissão
    sunset: new Date(new Date().setHours(18, 0, 0, 0)),
    sunrise: new Date(new Date().setHours(6, 0, 0, 0)),

    updateTime: () => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
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

    checkGeolocationPermission: async () => {
      const status = await checkGeolocationPermission()
      set({ permissionStatus: status })
    },

    requestLocationPermission: async () => {
      const result = await requestGeolocationPermission()
      if (result.success && result.position) {
        markGeolocationUsage()
        await get().getSunTime(
          result.position.coords.latitude,
          result.position.coords.longitude
        )
        await get().checkGeolocationPermission()
        return true
      }
      await get().checkGeolocationPermission()
      return false
    },

    getSunTime: async (latitude?: number, longitude?: number) => {
      const { isLoading } = get()

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
          // Usa valores padrão
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
        console.error('Erro ao obter horários do sol:', error)
        set({ isLoading: false })
      }
    },

    isNight: () => {
      const { time, sunset, sunrise } = get()

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

      return time > sunset || time < sunrise
    },

    setRenderDaytime: (value: boolean) => {
      set({ renderDaytime: value })
    }
  }
})

export const useTimeStore = timeStore
