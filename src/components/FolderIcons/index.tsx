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

const FolderIcons = () => {
  const { windows, addWindow } = useWindowStore()

  const clickHandler = (code: number) => {
    const position = {
      x: 250 + 25 * windows.length,
      y: 100 + 25 * windows.length
    }
    const size = { width: 400, height: 300 }

    if (windows.length < 10) {
      addWindow(folderIcons[code], position, size)
    } else {
      alert('Número máximo de pastas atingido!')
    }

    console.log(windows)
  }

  return (
    <>
      {folderIcons.map((folder, index) => (
        <div
          key={folder.id}
          className={styles.folder}
          onClick={() => clickHandler(index)}
        >
          {folder.icon}
          <p>{folder.name}</p>
        </div>
      ))}
    </>
  )
}

export default FolderIcons
