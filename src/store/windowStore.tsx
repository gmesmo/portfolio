import { create } from 'zustand'

import PersonIcon from '@mui/icons-material/Person'
import { setPosition, setSize } from '../utils/screen'

/**
 * Zustand store hook for managing opened windows in the portfolio application.
 *
 * @remarks
 * This store provides state and actions for handling window operations such as adding,
 * removing, dragging, and selecting windows. Each window contains metadata including
 * position, size, icon, and selection state.
 *
 * @returns
 * Zustand store with the following state and actions:
 * - `windows`: Array of currently opened windows.
 * - `addWindow(folder, position, size)`: Adds a new window for the given folder, deselects others, and selects the new window.
 * - `removeWindow(id)`: Removes the window with the specified ID.
 * - `dragWindow(id, position)`: Updates the position of the window with the specified ID and selects it, deselecting others.
 * - `selectWindow(id)`: Selects the window with the specified ID, deselects others, and moves it to the top (end of array).
 */
export const useWindowStore = create<openedWindows>((set) => ({
  windows: [
    {
      winType: '1',
      id: crypto.randomUUID(),
      name: 'SOBRE MIM',
      icon: <PersonIcon />,
      position: setPosition({ x: '55%', y: '11%' }),
      size: setSize(),
      selected: true
    }
  ],

  addWindow: (
    folder: Folder,
    position: { x: number | string; y: number | string },
    size: { width: number; height: number }
  ) => {
    // Desmarca todas as outras janelas
    set((state) => ({
      windows: state.windows.map((window) => ({
        ...window,
        selected: false
      }))
    }))

    set((state) => ({
      windows: [
        ...state.windows,
        {
          winType: folder.id,
          id: crypto.randomUUID(),
          name: folder.name,
          icon: folder.icon,
          position: setPosition(position),
          size: setSize(),
          selected: true
        }
      ]
    }))
  },

  removeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id)
    })),

  dragWindow: (id, position) =>
    set((state) => ({
      windows: state.windows.find((window) => window.id === id)
        ? state.windows.map((window) =>
            window.id === id
              ? { ...window, position: position, selected: true }
              : { ...window, selected: false }
          )
        : state.windows
    })),

  selectWindow: (id: string) =>
    set((state) => {
      const selectedWindow = state.windows.find((w) => w.id === id)
      if (!selectedWindow) return state

      // Remove o selecionado da lista e desmarca os outros
      const otherWindows = state.windows
        .filter((w) => w.id !== id)
        .map((w) => ({ ...w, selected: false }))

      // Recoloca o selecionado no final
      return {
        windows: [...otherWindows, { ...selectedWindow, selected: true }]
      }
    })
}))
