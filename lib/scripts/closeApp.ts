import '@jxa/global-type'
import { run } from '@jxa/run'

export const closeApp = async (app: string) => {
  return await run((app) => {
    const appToClose = Application(app)
    if (appToClose.running()) {
      appToClose.quit()
    }
  }, app)
}
