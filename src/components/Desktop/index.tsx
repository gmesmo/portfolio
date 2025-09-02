import { useEffect, useState } from 'react'

import { Alert } from '@mui/material'

import Clock from '../Clock'
import FolderIcons from '../FolderIcons'
import Window from '../Window'

import styles from './styles.module.scss'
import Waves from './Waves'

const Desktop = () => {
  const [isAlertOn, setIsAlertOn] = useState(false)

  useEffect(() => {
    if (isAlertOn) {
      setTimeout(() => {
        setIsAlertOn(false)
      }, 3000)
    }
  }, [isAlertOn])

  return (
    <section className={styles.desktop}>
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
      <Waves />
    </section>
  )
}
export default Desktop
