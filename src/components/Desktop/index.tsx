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
  const { time, sunset, sunrise } = useTimeStore()

  useEffect(() => {
    if (isAlertOn) {
      setTimeout(() => {
        setIsAlertOn(false)
      }, 3000)
    }
  }, [isAlertOn])

  return (
    <section
      className={`${styles.desktop}   ${
        time > sunset! || time < sunrise! ? styles.night : ''
      }`}
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
      <Clock />
      <Window />
      <Waves night={time > sunset! || time < sunrise!} />
    </section>
  )
}
export default Desktop
