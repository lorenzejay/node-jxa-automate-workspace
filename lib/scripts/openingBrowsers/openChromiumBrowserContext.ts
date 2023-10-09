import '@jxa/global-type'
import { run } from '@jxa/run'
import { openArcContext as openArcContextStringified } from './openArcContext'

interface ContextProps {
  tabs?: string[]
  browser: 'Google Chrome' | 'Brave Browser' | 'Arc'
  spaceName?: string
}

// currently supports [Brave Browser, Google Chrome, Arc]
export const openChromiumBrowser = async (context: ContextProps) => {
  return await run(
    (context: ContextProps) => {
      const { tabs, browser: browserSelected } = context

      try {
        const browser = Application(browserSelected)
        browser.includeStandardAdditions = true

        if (!browser.running()) {
          browser.launch()
          browser.activate()
        } else {
          browser.activate()
        }
        delay(1)

        if (browserSelected === 'Arc') {
          const windowsAmount = browser.windows.length
          if (windowsAmount < 1) {
            const newWindow = browser.Window()
            browser.windows.push(newWindow)
          }

          const windowAdded = browser.windows[0]
          if (!context.spaceName) {
            if (tabs) {
              for (let l = 0; l < tabs.length; l++) {
                const link = tabs[l]
                windowAdded.tabs.push(
                  new browser.Tab({
                    url: link,
                  })
                )
              }
            }
            return
          }

          const windowAddedSpaces = windowAdded.spaces
          delay(0.5)
          if (!windowAddedSpaces) throw new Error('No spaces in Arc')
          for (let i = 0; i < windowAddedSpaces.length; i++) {
            const spaceName = windowAddedSpaces[i].name()
            console.log('spaceName', spaceName)
            if (spaceName == context?.spaceName) {
              const currentSpace = windowAddedSpaces[i]
              if (currentSpace.tabs.length == 0) {
                currentSpace.tabs.push(
                  new browser.Tab({ url: 'https://google.com' })
                )
              }
              delay(0.3)
              // now we should have tabs
              if (tabs) {
                for (let l = 0; l < tabs.length; l++) {
                  const link = tabs[l]
                  currentSpace.tabs.push(
                    new browser.Tab({
                      url: link,
                    })
                  )
                }
              }
              return currentSpace.focus()
            }
            delay(0.3)
          }
        }
        // brave and chrome logic under
        if (!browser.running()) {
          browser.launch()
          browser.activate()
        } else {
          browser.activate()
        }
        delay(1)

        const newWindow = browser.Window()
        delay(0.5)
        newWindow.make()
        if (tabs) {
          for (let i = 0; i < tabs.length; i++) {
            // set the url for the tab
            newWindow.tabs[i].url = tabs[i]
            // check to see if we have a next tab
            if (tabs[i + 1] !== undefined) {
              // create a new tab and push it to the window
              newWindow.tabs.push(new browser.Tab())
            }
          }
        }
      } catch (error) {
        console.log(error)
        console.log(`${browserSelected} is not running...`)
      }
    },
    context,
    openArcContextStringified.toString()
  )
}

// usage example -
// openChromiumBrowser({
//   tabs: [
//     'https://github.com',
//     'https://www.npmjs.com/package/node-jxa-workspace-automation',
//   ],
//   browser: 'Arc',
//   // spaceName: 'Stateful',
// })
