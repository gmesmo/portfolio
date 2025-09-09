import { useEffect, useState } from 'react'

import { Alert } from '@mui/material'

import Clock from '../Clock'
import FolderIcons from '../FolderIcons'
import Window from '../Window'
import LocationPermissionButton from '../LocationPermissionButton'

import styles from './styles.module.scss'
import Waves from './Waves'
import { useTimeStore } from '../../store/getTimeStore'

const Desktop = () => {
  const [isAlertOn, setIsAlertOn] = useState(false)
  const {
    isNight,
    renderDaytime,
    setRenderDaytime,
    checkGeolocationPermission,
    getSunTime,
    permissionStatus,
    requestLocationPermission
  } = useTimeStore()

  useEffect(() => {
    if (isAlertOn) {
      setTimeout(() => {
        setIsAlertOn(false)
      }, 3000)
    }
  }, [isAlertOn])

  useEffect(() => {
    // Verifica o status da permissão ao carregar
    checkGeolocationPermission()
  }, [checkGeolocationPermission])

  useEffect(() => {
    // Inicializa com valores padrão sempre
    getSunTime()

    // Se a permissão já foi concedida, tenta obter a localização real
    if (permissionStatus === 'granted') {
      requestLocationPermission()
    }
  }, [permissionStatus, getSunTime, requestLocationPermission])

  const nightValue = isNight()

  useEffect(() => {
    setRenderDaytime(nightValue)
  }, [nightValue, setRenderDaytime])

  const handleClockClick = () => {
    if (renderDaytime === isNight()) {
      setRenderDaytime(!isNight())
    } else {
      setRenderDaytime(isNight())
    }
  }

  return (
    <section
      id='desktop'
      className={`${styles.desktop} ${renderDaytime ? styles.night : ''}`}
    >
      {isAlertOn && (
        <Alert
          onClose={() => setIsAlertOn(false)}
          severity='warning'
          className={styles.alert}
        >
          Número máximo de janelas atingido!
        </Alert>
      )}

      <FolderIcons setAlertOn={setIsAlertOn} />
      <LocationPermissionButton className={styles.locationButton} />
      <Clock
        clockClick={() => handleClockClick()}
        nightModeOn={renderDaytime}
      />
      <Window />
      <Waves night={renderDaytime} />
    </section>
  )
}

export default Desktop
