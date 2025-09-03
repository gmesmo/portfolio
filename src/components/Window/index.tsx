import CloseIcon from '@mui/icons-material/Close'
import { Rnd as Draggable } from 'react-rnd'

import { useWindowStore } from '../../store/windowStore'
import styles from './styles.module.scss'
import stylesIcon from '../FolderIcons/styles.module.scss'
import WinContent from './WinContent'
import { getValueFromPerc } from '../../utils/screen'

const Window = () => {
  const { windows, removeWindow, dragWindow, selectWindow } = useWindowStore()

  const dragHandler = (e: any, data: any, index: number) => {
    dragWindow(windows[index].id, { x: data.x, y: data.y })
  }

  const clickHandler = (index: number) => {
    selectWindow(windows[index].id)
  }

  return (
    <>
      {windows.map((window, index) => (
        <Draggable
          key={index}
          className={`${styles.rnd} ${window.selected ? styles.selected : ''} ${
            stylesIcon.glass
          }`}
          dragHandleClassName={styles.titleBar}
          size={{ width: window.size.width, height: window.size.height }}
          position={getValueFromPerc({
            x: window.position.x,
            y: window.position.y
          })}
          onClick={() => clickHandler(index)}
          onDrag={(e, data) => dragHandler(e, data, index)}
          enableResizing={false}
        >
          <div
            className={styles.window}
            style={{
              zIndex: index + 15
            }}
          >
            <div className={styles.titleBar}>
              <div className={styles.titleBarText}>
                {window.icon} {window.name}
              </div>

              <button
                aria-label='Close'
                onClick={() => removeWindow(window.id)}
                onTouchStart={() => removeWindow(window.id)}
              >
                <CloseIcon />
              </button>
            </div>

            <WinContent winName={window.name} />
          </div>
        </Draggable>
      ))}
    </>
  )
}

export default Window
