import CloseIcon from '@mui/icons-material/Close'
import { Rnd as Draggable } from 'react-rnd'

import { useWindowStore } from '../../store/windowStore'
import styles from './styles.module.scss'
import stylesIcon from '../FolderIcons/styles.module.scss'
import WinContent from './WinContent'
import { getValueFromPerc } from '../../utils/screen'

/**
 * Renders a list of draggable window components based on the current state from `useWindowStore`.
 *
 * Each window can be selected, dragged, or closed. The component manages window selection,
 * drag position updates, and removal through corresponding handlers.
 *
 * @returns {JSX.Element} A fragment containing all active draggable windows.
 *
 * @remarks
 * - Uses the `Draggable` component to allow window movement.
 * - Window position and size are controlled via state.
 * - The window's z-index is determined by its order in the array.
 * - Clicking or touching a window selects it and brings it to the front.
 * - The close button removes the window from the state.
 */
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
          onTouchStart={() => clickHandler(index)}
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
