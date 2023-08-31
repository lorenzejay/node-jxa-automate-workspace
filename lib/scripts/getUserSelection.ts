import '@jxa/global-type'
import { run } from '@jxa/run'
import {WorkspaceContext} from '../types/types'
export async function getUserSelection(appContexts: WorkspaceContext[]): Promise<WorkspaceContext> {
  return await run((appContexts:  WorkspaceContext[]) => {
    const app = Application.currentApplication()
    app.includeStandardAdditions = true
    const options = appContexts.map((context) => context.title)
    // @ts-ignore
    const chosenButton: string[] = app.chooseFromList(options, {
      withPrompt: 'Select workspace:',
      defaultItems: options[0],
    })
    console.log('typeof', typeof chosenButton)
    chosenButton[0] ? chosenButton[0] : null
    // @ts-ignore
    return appContexts.find((context) => context.title == chosenButton)
  }, appContexts)
}
