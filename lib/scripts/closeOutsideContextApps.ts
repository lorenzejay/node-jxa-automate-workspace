import '@jxa/global-type'
import { run } from '@jxa/run'

export const closeOutsideContextApps = async (apps: string[]) => {
  return await run((apps: string[]) => {
    try {
      const appList = Application('System Events')
        .processes.whose({ backgroundOnly: false })
        .displayedName()

      for (var i = 0; i < appList.length; i++) {
        var appName = appList[i]
        if (!apps.includes(appName)) {
          // Close the application
          Application(appName).quit()
        }
      }
    } catch (error) {
      console.log('error:', error)
      throw new Error(error?.message ? error.message : error)
    }
  }, apps)
}
