import '@jxa/global-type'
import { run } from '@jxa/run'
import { TerminalContext } from '../types/types'

export const openTerminalInFilepath = async (context: TerminalContext) => {
  return await run((context: TerminalContext) => {
    const { filePaths, commands, usesDocker } = context
    const terminal = Application('Terminal')
    terminal.includeStandardAdditions = true

    delay(0.5)

    // create the terminal windows so we can specify which window to run the command in
    for (let i = 0; i < filePaths.length; i++) {
      terminal.doScript()
      delay(0.5)
    }

    for (let i = 0; i < filePaths.length; i++) {
      const window = terminal.windows[i]
      terminal.doScript(`cd "/${filePaths[i]}"`, {
        in: window,
      })
      delay(0.5)
      if (usesDocker && i === 0) {
        terminal.doScript(`docker compose up -d`, {
          in: window,

        })
        delay(0.5)
      }

      terminal.doScript(`code .`, {
        in: window,
      })
      delay(0.5)

      terminal.doScript(`${commands[i]}`, {
        in: window,
      })
    }
  }, context)
}
