import { useEffect, useState } from 'react'

import { Alert } from '@mui/material'

import Clock from '../Clock'
import FolderIcons from '../FolderIcons'
import Window from '../Window'

import styles from './styles.module.scss'
import Waves from './Waves'
import { useTimeStore } from '../../store/getTimeStore'

const Desktop = () => {
  const [isAlertOn, setIsAlertOn] = useState(false)
  const { isNight } = useTimeStore()
  const [renderDaytime, setRenderDaytime] = useState(isNight())

  useEffect(() => {
    if (isAlertOn) {
      setTimeout(() => {
        setIsAlertOn(false)
      }, 3000)
    }
  }, [isAlertOn])

  const nightValue = isNight()

  useEffect(() => {
    setRenderDaytime(nightValue)
  }, [nightValue])

  const handleClockClick = () => {
    if (renderDaytime === isNight()) {
      setRenderDaytime(!isNight())
    } else {
      setRenderDaytime(isNight())
    }
  }

  return (
    <section
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
