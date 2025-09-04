import { useCallback, useEffect, useState } from 'react'
import { useTimeStore } from '../../store/getTimeStore'

import styles from './styles.module.scss'
import { Alert, Button } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

type clockProps = {
  clockClick: () => void
  nightModeOn: boolean
}

const Clock = ({ clockClick, nightModeOn }: clockProps) => {
  const { time, updateTime, getSunTime } = useTimeStore()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  updateTime()

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
          setHasPermission(result.state === 'granted')
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
        className={`${styles.clockContainer} ${nightModeOn && styles.night}`}
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
