import FolderIcons from '../FolderIcons'
import Window from '../Window'
import styles from './styles.module.scss'

const Desktop = () => {
  return (
    <section className={styles.desktop}>
      <FolderIcons />
      <Window />
    </section>
  )
}
export default Desktop
