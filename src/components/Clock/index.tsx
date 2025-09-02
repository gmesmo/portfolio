import { useEffect } from 'react'
import { useTimeStore } from '../../store/getTimeStore'

import styles from './styles.module.scss'

const Clock = () => {
  const { time, updateTime, getSunTime } = useTimeStore()

  updateTime()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        getSunTime(pos.coords.latitude, pos.coords.longitude)
      },
      () => {
        getSunTime()
      }
    )
  }, [getSunTime])

  return (
    <div className={styles.clock}>
      {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
    </div>
  )
}

export default Clock
