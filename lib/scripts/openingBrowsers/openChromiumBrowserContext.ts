import '@jxa/global-type'
import { run } from '@jxa/run'


interface ContextProps {
  tabs?: string[]
  browser: 'Google Chrome' | 'Brave Browser'
}

// currently supports [Brave Browser, browser] 
export const openChromiumBrowser = async (context:ContextProps) => {
  return await run((context: ContextProps) => {
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

      const newWindow = browser.Window()
      delay(0.5)
      newWindow.make()

      if(tabs){
        for(let i=0; i < tabs.length; i++){
          // set the url for the tab
          newWindow.tabs[i].url = tabs[i];
          // check to see if we have a next tab
          if(tabs[i + 1] !== undefined){
            // create a new tab and push it to the window
            newWindow.tabs.push(new browser.Tab());
          }
        }
      }
    } catch (error) {
      console.log(error)
      console.log(`Google browser is not running...`)
    }
  }, context)
}

// usage example - openChromiumBrowser({tabs: ['https://github.com', 'https://www.npmjs.com/package/node-jxa-workspace-automation'], browser: 'Brave Browser'})
