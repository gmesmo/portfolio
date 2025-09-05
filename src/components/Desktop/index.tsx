import { useEffect, useState } from 'react'

import { Alert } from '@mui/material'

import Clock from '../Clock'
import FolderIcons from '../FolderIcons'
import Window from '../Window'

import styles from './styles.module.scss'
import Waves from './Waves'
import { useTimeStore } from '../../store/getTimeStore'

/**
 * Renders the main desktop interface, including folder icons, a clock, windows, and background waves.
 *
 * @component
 * @returns {JSX.Element} The rendered desktop section.
 *
 * @remarks
 * - Integrates with a time store to manage day/night mode.
 * - Displays an alert when the maximum number of windows is reached.
 * - Allows toggling between day and night modes via the clock.
 *
 * @internalremarks
 * - Uses `useState` for alert visibility.
 * - Uses `useEffect` to synchronize day/night mode and alert timeout.
 *
 * @example
 * ```tsx
 * <Desktop />
 * ```
 */
const Desktop = () => {
  const [isAlertOn, setIsAlertOn] = useState(false)
  const { isNight, renderDaytime, setRenderDaytime } = useTimeStore()

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
