import '@jxa/global-type'
import { run } from '@jxa/run'
import { TerminalContext } from '../types/types'
interface TerminalWorkspaceContext {
  useNewTab: boolean // run the next workspace at a new tab otherwise create a new window
  workspaces: TerminalContext[]
}
export function runTerminalCommand(
  terminal: any,
  command: string,
  location?: string
) {
  if (location) {
    terminal.doScript(command, { in: location })
  } else {
    terminal.doScript(command)
  }
}
export const openTerminalContext = async (
  context: TerminalWorkspaceContext
) => {
  return await run(
    (context: TerminalWorkspaceContext, runTerminalCommand) => {
      const { workspaces, useNewTab } = context

      const useTerminalAndRunCommand: (
        terminal: any,
        command: string,
        location?: string
      ) => void = new Function('return ' + runTerminalCommand)()

      const terminal = Application('Terminal')
      const system = Application('System Events')
      terminal.includeStandardAdditions = true

      // always run a new script and bring to the front
      terminal.doScript()
      terminal.activate()
      delay(1)

      const window = terminal.windows[0]
      if (!window) throw new Error('No terminal window')

      delay(0.5)
      if (workspaces) {
        for (let i = 0; i < workspaces.length; i++) {
          const { filePath, command, opensVSCode, usesDocker } = workspaces[i]
          if (i === 0) {
            if (filePath) {
              useTerminalAndRunCommand(
                terminal,
                `cd "${workspaces[i].filePath}"`,
                window
              )
              delay(0.5)
              if (usesDocker) {
                const Docker = Application('Docker')
                Docker.launch()
                delay(1)
                useTerminalAndRunCommand(
                  terminal,
                  'docker compose up -d',
                  window
                )
              }
              delay(0.5)
              if (opensVSCode) {
                useTerminalAndRunCommand(terminal, 'code .', window)
              }
              delay(0.5)
            }
            delay(0.5)
            if (command) {
              useTerminalAndRunCommand(terminal, command, window)
            }
            delay(0.5)
          } else {
            if (useNewTab) {
              console.log('run new tab')
              delay(0.5)
              if (window.frontmost()) {
                console.log('window.frontmost', window.frontmost())
                system.keystroke('t', { using: ['command down'] })
                delay(0.5)
              } else {
                throw new Error(
                  'Window could not open a new tab since it was no longer in the forefront'
                )
              }
            } else {
              terminal.doScript()
            }

            delay(1)
            if (filePath) {
              useTerminalAndRunCommand(
                terminal,
                `cd "${workspaces[i].filePath}"`,
                window
              )
              delay(0.5)
              if (usesDocker) {
                const Docker = Application('Docker')
                Docker.launch()
                delay(1)
                useTerminalAndRunCommand(
                  terminal,
                  'docker compose up -d',
                  window
                )
              }
              delay(0.5)
              if (opensVSCode) {
                useTerminalAndRunCommand(terminal, 'code .', window)
              }
              delay(0.5)
            }
            delay(0.5)
            if (command) {
              useTerminalAndRunCommand(terminal, command, window)
            }
            delay(0.5)
          }
        }
      }

      delay(0.5)
    },
    context,
    runTerminalCommand.toString()
  )
}

const workspaces: TerminalContext[] = [
  {
    filePath:
      '/Users/lorenzejay/Documents/Uplift Digital Solutions/clients/unifai/Unifai-surveygen',
    command: 'npm run start:dev',
    usesDocker: true,
  },
]

const context: TerminalWorkspaceContext = {
  useNewTab: true,
  workspaces,
}

const spawnWorkspace = async () => {
  await openTerminalContext(context)
}

spawnWorkspace()
