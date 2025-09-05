import React, { useState } from 'react'
import { Button, Alert } from '@mui/material'
import { useTimeStore } from '../../store/getTimeStore'

interface LocationPermissionButtonProps {
  className?: string
}

const LocationPermissionButton: React.FC<LocationPermissionButtonProps> = ({
  className
}) => {
  const { permissionStatus, requestLocationPermission } = useTimeStore()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleRequestPermission = async () => {
    try {
      const success = await requestLocationPermission()

      if (!success) {
        setAlertMessage(
          'Não foi possível obter a localização. Usando horários padrão.'
        )
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 5000)
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error)
      setAlertMessage('Erro ao solicitar permissão de localização.')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 5000)
    }
  }

  // Não mostra o botão se a permissão já foi concedida ou se não está disponível
  if (permissionStatus === 'granted' || permissionStatus === 'unavailable') {
    return null
  }

  return (
    <>
      {showAlert && (
        <Alert
          severity='info'
          onClose={() => setShowAlert(false)}
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999
          }}
        >
          {alertMessage}
        </Alert>
      )}

      <Button
        variant='contained'
        color='primary'
        onClick={handleRequestPermission}
        className={className}
        size='small'
        style={{
          position: 'fixed',
          top: '20px',
          right: '50%',
          zIndex: 9999,
          transform: 'translateX(50%)'
        }}
      >
        Permitir Localização
      </Button>
    </>
  )
}

export default LocationPermissionButton
