type Folder = {
  id: string
  name: string
  icon: JSX.Element
}

interface AppWindow extends Folder {
  position: { x: number; y: number }
  size: { width: number; height: number }
  selected?: boolean
}

interface openedWindows {
  windows: AppWindow[]
  addWindow: (
    folder: Folder,
    position: { x: number; y: number },
    size: { width: number; height: number }
  ) => void
  removeWindow: (id: string) => void
  dragWindow: (id: string, position: { x: number; y: number }) => void
  selectWindow: (id: string) => void
}
