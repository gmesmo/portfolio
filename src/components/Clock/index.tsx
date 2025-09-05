import { useCallback, useEffect, useState } from 'react'
import { useTimeStore } from '../../store/getTimeStore'

import styles from './styles.module.scss'
import { Alert, Button } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { isMobile } from '../../utils/screen'

type clockProps = {
  clockClick: () => void
  nightModeOn: boolean
}

/**
 * Clock component that displays the current time and toggles between day and night modes
 * based on the user's geolocation and permissions.
 *
 * - Requests geolocation permission to determine sunrise/sunset times for day/night mode.
 * - Shows a warning alert if geolocation permission is denied, allowing the user to retry.
 * - Updates the displayed time every second using a timer from the `useTimeStore` hook.
 * - Cleans up the timer on component unmount.
 * - Renders icons for dark and light modes, and applies appropriate styles.
 *
 * @param clockClick - Callback function triggered when the clock is clicked.
 * @param nightModeOn - Boolean indicating if night mode is currently active.
 */
const Clock = ({ clockClick, nightModeOn }: clockProps) => {
  const { time, updateTime, stopUpdateTime, getSunTime } = useTimeStore()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  const locationPermission = useCallback(() => {
    // Pega posição atual
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        getSunTime(pos.coords.latitude, pos.coords.longitude)
      },
      () => {
        getSunTime()
      }
    )
  }, [getSunTime])

  // ✅ Inicia o timer apenas uma vez quando o componente monta
  useEffect(() => {
    updateTime() // Inicia o timer de atualização

    // Cleanup: para o timer quando o componente desmonta
    return () => {
      stopUpdateTime()
    }
  }, [updateTime, stopUpdateTime])

  useEffect(() => {
    // Checa permissão de geolocalização
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          setHasPermission(true)
          locationPermission()
        } else {
          setHasPermission(false)
        }

        // também escuta mudanças (se o usuário alterar nas configs)
        result.onchange = () => {
          const newState = result.state === 'granted'
          setHasPermission(newState)

          // Se permissão foi concedida, busca localização
          if (newState) {
            locationPermission()
          }
        }
      })
    }
  }, [locationPermission])

  return (
    <>
      {hasPermission === false && (
        <Alert
          onClose={() => setHasPermission(null)}
          severity='warning'
          className={styles.alert}
        >
          Esse site usa sua localização para alternar entre o modo dia e noite.
          <Button
            color='inherit'
            size='small'
            onClick={() => locationPermission()}
            sx={{ ml: 2 }}
          >
            PERMITIR
          </Button>
        </Alert>
      )}
      <div
        className={`${styles.clockContainer} ${nightModeOn && styles.night} ${
          isMobile() && styles.mobile
        }`}
      >
        <p className={styles.clock} onClick={() => clockClick()}>
          {time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        <DarkModeIcon className={`${styles.icon} ${styles.moon}`} />
        <LightModeIcon className={`${styles.icon} ${styles.sun}`} />
      </div>
    </>
  )
}

export default Clock
