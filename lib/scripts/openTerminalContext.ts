import '@jxa/global-type'
import { run } from '@jxa/run'
import { TerminalProcess } from '../types/types'

export const openTerminalInFilepath = async (context: TerminalProcess) => {
  return await run((context: TerminalProcess) => {
    const { filePath, command, usesDocker, opensCodeEditor, } = context
    const terminal = Application('Terminal')

    terminal.includeStandardAdditions = true

    if(terminal.running()){
      terminal.launch()
    } 
    delay(1)

    const window = terminal.windows[0]
    if(!window) throw new Error('No terminal window')
    console.log('terminal.Tab());', typeof window.tabs)
    window.tabs().push(terminal.Tab());
    delay(1)

    const tabIndex = window.tabs.length - 1
    const triggerIn = window.tabs[tabIndex]
    delay(0.5)
    if(filePath){
      terminal.doScript(`cd "/${filePath}"`, {
        in: triggerIn,
      })
    }

    delay(0.5)
    if(usesDocker){
      terminal.doScript(`docker compose up -d`, {
        in: triggerIn
      })
    }

    delay(0.5)
    if (opensCodeEditor){
      terminal.doScript(`code .`, {
        in: triggerIn,
      })
    }

    delay(0.5)
    terminal.doScript(`${command}`, {
      in: triggerIn,
    })
  }, context)
}

const contexts: TerminalProcess[] = [
  {
    filePath:'Users/lorenzejay/Documents/Uplift Digital Solutions/clients/unifai/Unifai-surveygen',
    command: 'npm run start:dev',
    usesDocker: true,
    opensCodeEditor: false
  },
  {
    filePath: 'Users/lorenzejay/Documents/Uplift Digital Solutions/clients/unifai/surveygen-frontend',
    command: 'npm run start',
    usesDocker: false,
    opensCodeEditor: true
  }
]

const spawnWorkspace =  async () => {

  for (const context of contexts){
    // console.log('context', context)
    await openTerminalInFilepath({
      filePath: context.filePath,
      command: context.command,
      opensCodeEditor: context.opensCodeEditor,
      usesDocker: context.usesDocker
    })
  }
}

spawnWorkspace()