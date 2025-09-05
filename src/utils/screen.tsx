// Verifica se a tela é mobile
export function isMobile(width = window.innerWidth): boolean {
  return width < 768
}

// Verifica se é tablet
export function isTablet(width = window.innerWidth): boolean {
  return width >= 767 && width <= 1024
}

// Verifica se é desktop
export function isDesktop(width = window.innerWidth): boolean {
  return width > 1023
}

export function getValueFromPerc(position: position): { x: number; y: number } {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  if (typeof position.x === 'string') {
    position.x = (Number(position.x.replace('%', '')) / 100) * screenWidth
  }
  if (typeof position.y === 'string') {
    position.y = (Number(position.y.replace('%', '')) / 100) * screenHeight
  } else {
    position.x = Number(position.x)
    position.y = Number(position.y)
  }

  return { x: Number(position.x), y: Number(position.y) }
}

export function setPosition(position: position): { x: number; y: number } {
  const screenWidth = window.innerWidth
  const pos = getValueFromPerc(position)

  if (isMobile()) {
    position.x = screenWidth / 3 < pos.x ? 10 : pos.x
    position.y = pos.y + 140
  } else if (isTablet()) {
    position.x = screenWidth / 2 < pos.x ? 170 : pos.x - 50
    position.y = pos.y + 120
  } else if (isDesktop()) {
    position.x = screenWidth / 2 < pos.x ? 850 : pos.x
    position.y = pos.y
  }

  return getValueFromPerc(position)
}

export function setSize(size: size): size {
  const screenWidth = window.innerWidth

  if (isMobile()) {
    size.width = screenWidth - 20
    size.height = 500
  }
  if (isTablet()) {
    size.width = screenWidth / 1.5
    size.height = 500
  }

  return size
}
