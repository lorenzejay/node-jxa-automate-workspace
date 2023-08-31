import '@jxa/global-type'
import { run } from '@jxa/run'

// activate only works if app is running
// if app not running launch then activate

export const openApp = async (app: string) => {
  return await run((app) => {
    try {
      const application = Application(app)
      application.includeStandardAdditions = true
      delay(0.3)
      if (application.running()) {
        application.activate()
      } else {
        application.launch()
        delay(0.3)
        application.activate()
      }
    } catch (error) {
      console.log(`${app} not running...`)
    }
  }, app)
}
