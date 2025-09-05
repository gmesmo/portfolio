import PersonIcon from '@mui/icons-material/Person'
import CodeIcon from '@mui/icons-material/Code'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'

import styles from './styles.module.scss'
import { useWindowStore } from '../../store/windowStore'

const folderIcons: Folder[] = [
  { id: '1', name: 'SOBRE MIM', icon: <PersonIcon /> },
  { id: '2', name: 'PROJETOS', icon: <CodeIcon /> },
  { id: '3', name: 'CONTATO', icon: <AlternateEmailIcon /> }
]

type FolderIconsProps = {
  setAlertOn: (value: boolean) => void
}

/**
 * Renders a list of folder icons that can be clicked to open new windows.
 * Limits the number of open windows to 10; shows an alert if the limit is reached.
 * Displays a counter on each folder icon indicating the number of open windows of that type.
 *
 * @param setAlertOn - Function to toggle the alert state when the window limit is reached.
 */
const FolderIcons = ({ setAlertOn }: FolderIconsProps) => {
  const { windows, addWindow } = useWindowStore()

  const clickHandler = (code: number) => {
    const position = {
      x: 250 + 25 * windows.length,
      y: 100 + 25 * windows.length
    }
    const size = { width: 850, height: 700 }

    if (windows.length < 10) {
      addWindow(folderIcons[code], position, size)
    } else {
      setAlertOn(true)
    }
  }

  return (
    <div className={styles.folderContainer}>
      {folderIcons.map((folder, index) => (
        <div
          key={folder.id}
          className={`${styles.folder} ${styles.glass}`}
          onClick={() => clickHandler(index)}
        >
          {folder.icon}
          <p>{folder.name}</p>
          {windows.filter((win) => win.winType === folder.id).length > 0 && (
            <span className={styles.counter}>
              {windows.filter((win) => win.winType === folder.id).length}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default FolderIcons
