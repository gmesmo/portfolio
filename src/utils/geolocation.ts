/**
 * Utilitário para gerenciar permissões de geolocalização de forma robusta
 */

export type GeolocationPermissionState = 'granted' | 'denied' | 'prompt' | 'unavailable'

/**
 * Verifica o status atual da permissão de geolocalização
 * Funciona mesmo em navegadores que não suportam a API Permissions
 */
export const checkGeolocationPermission = async (): Promise<GeolocationPermissionState> => {
  // Verifica se a geolocalização está disponível
  if (!navigator.geolocation) {
    return 'unavailable'
  }

  // Tenta usar a API Permissions se disponível
  if ('permissions' in navigator && 'query' in navigator.permissions) {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' })
      return permission.state as GeolocationPermissionState
    } catch (error) {
      console.warn('Erro ao verificar permissão via API Permissions:', error)
    }
  }

  // Fallback: tenta detectar o status através de uma chamada rápida
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve('prompt') // Se demorou muito, provavelmente é prompt
    }, 100)

    navigator.geolocation.getCurrentPosition(
      () => {
        clearTimeout(timeoutId)
        resolve('granted')
      },
      (error) => {
        clearTimeout(timeoutId)
        if (error.code === error.PERMISSION_DENIED) {
          resolve('denied')
        } else {
          resolve('prompt')
        }
      },
      { timeout: 50, maximumAge: Infinity }
    )
  })
}

/**
 * Solicita permissão de geolocalização de forma controlada
 */
export const requestGeolocationPermission = (): Promise<{
  success: boolean
  position?: GeolocationPosition
  error?: GeolocationPositionError
}> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ success: false })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({ success: true, position })
      },
      (error) => {
        resolve({ success: false, error })
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 600000 // 10 minutos
      }
    )
  })
}

/**
 * Verifica se a geolocalização foi usada recentemente (baseado no localStorage)
 */
export const hasRecentGeolocationUsage = (): boolean => {
  try {
    const lastUsed = localStorage.getItem('geolocation_last_used')
    if (!lastUsed) return false
    
    const lastUsedTime = new Date(lastUsed).getTime()
    const now = new Date().getTime()
    const oneDay = 24 * 60 * 60 * 1000 // 24 horas em ms
    
    return (now - lastUsedTime) < oneDay
  } catch {
    return false
  }
}

/**
 * Marca que a geolocalização foi usada recentemente
 */
export const markGeolocationUsage = (): void => {
  try {
    localStorage.setItem('geolocation_last_used', new Date().toISOString())
  } catch {
    // Ignora erros de localStorage
  }
}

