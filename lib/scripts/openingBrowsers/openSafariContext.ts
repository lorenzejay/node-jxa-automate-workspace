import '@jxa/global-type'
import { run } from '@jxa/run'


interface ContextProps {
  tabs?: string[]
}

export const openSafariContext = async (context:ContextProps) => {
  return await run((context: ContextProps) => {
    const { tabs } = context 
    
    try {
      const safari = Application('Safari')
      safari.includeStandardAdditions = true

      if (!safari.running()) {
        safari.launch()
        safari.activate()
      }  else {
        safari.activate()

      }
      delay(1)
      safari.documents.push(new safari.Document({}))
      const firstMostDocument = safari.windows[0].currentTab()

      delay(2)

      
      if(tabs){
        for(let i=0; i < tabs.length; i++){
          safari.doJavaScript(`window.open("${tabs[i]}");`, { in: firstMostDocument });
          delay(1)
        }
      }
    } catch (error) {
      console.log(error)
      console.log(`Safari is not running...`)
    }
  }, context)
}

// usage example - 
openSafariContext({ tabs: ['https://github.com', 'https://www.npmjs.com/package/node-jxa-workspace-automation']})

