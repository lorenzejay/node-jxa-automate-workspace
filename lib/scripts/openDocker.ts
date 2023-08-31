import '@jxa/global-type'
import { run } from '@jxa/run'

// return new ope app windowId
export const openDocker = async () => {
  return await run(() => {
    try {
      const docker = Application('Docker')
      if (docker.running()) {
        docker.activate()
      } else {
        docker.launch()
        docker.activate()
      }
    } catch (error) {
      console.log('docker not running...')
    }
  })
}
