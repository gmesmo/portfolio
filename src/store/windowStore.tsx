import { create } from 'zustand'

export const useWindowStore = create<openedWindows>((set) => ({
  windows: [],

  addWindow: (
    folder: Folder,
    position: { x: number; y: number },
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
          id: crypto.randomUUID(),
          name: folder.name,
          icon: folder.icon,
          position,
          size,
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
