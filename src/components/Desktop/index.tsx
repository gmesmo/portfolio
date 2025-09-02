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
  const [forceNight, setForceNight] = useState(false)

  const { time, sunset, sunrise } = useTimeStore()

  useEffect(() => {
    if (isAlertOn) {
      setTimeout(() => {
        setIsAlertOn(false)
      }, 3000)
    }
  }, [isAlertOn])

  const handleClockClick = () => {
    setForceNight(!forceNight)
  }

  let isNight = (time > sunset! && time < sunrise!) || forceNight

  return (
    <section className={`${styles.desktop} ${isNight ? styles.night : ''}`}>
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
      <Clock clockClick={() => handleClockClick()} />
      <Window />
      <Waves night={isNight} />
    </section>
  )
}

export default Desktop
