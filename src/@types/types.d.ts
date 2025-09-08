type position = { x: number | string; y: number | string }
type size = { width: number; height: number }

type Folder = {
  id: string
  name: string
  icon: JSX.Element
}

interface AppWindow extends Folder {
  winType: string
  position: { x: number | string; y: number | string }
  size: size
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

type Resource = {
  name: string
  icon: ReactNode
}

type Project = {
  name: string
  link: string
  description: string
  image: string
  github: string
  resources: Resource[]
}
