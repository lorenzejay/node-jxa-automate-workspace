import '@jxa/global-type'
import { run } from '@jxa/run'
import { ItermWindowSplit, TerminalContext } from '../types/types'

// session is the terminal currentSession (current no defined types for this)
function runItermAndFireCommand(
  session: any,
  workspaceDetails: TerminalContext
) {
  if (!session) return
  if (!workspaceDetails) return
  const { filePath, command, opensVSCode, usesDocker } = workspaceDetails

  session.write({ text: `cd "${filePath}"`, newline: true })
  delay(0.5)
  if (usesDocker) {
    session.write({ text: 'docker compose up -d', newline: true })
  }
  delay(0.5)
  if (opensVSCode) {
    session.write({ text: 'code .', newline: true })
  }
  if (command) {
    session.write({ text: `${command}`, newline: true })
  }
  delay(0.5)
}

export async function openItermContext(context: ItermWindowSplit) {
  await run(
    (context: ItermWindowSplit, runItermAndFireCommandFunc) => {
      const { workspaces, useSplitPanes } = context
      const runItermAndFireCommand = new Function(
        'return ' + runItermAndFireCommandFunc
      )()

      const app = Application('Iterm')
      app.includeStandardAdditions = true
      let window

      // always create a new window
      window = app.createWindowWithDefaultProfile()

      delay(0.5)

      if (!window) throw new Error('No terminal window')

      let firstSession = window.currentTab().currentSession()

      runItermAndFireCommand(firstSession, {
        filePath: workspaces[0].filePath,
        command: workspaces[0].command,
        opensVSCode: workspaces[0].opensVSCode,
        usesDocker: workspaces[0].usesDocker,
      })
      delay(0.5)
      if (workspaces) {
        for (let i = 1; i < workspaces.length; i++) {
          let newSession
          if (useSplitPanes) {
            newSession = window
              .currentTab()
              .currentSession()
              .splitVerticallyWithDefaultProfile()
          } else {
            newSession = app
              .createWindowWithDefaultProfile()
              .currentTab()
              .currentSession()
          }
          delay(0.5)
          if (!newSession) return new Error('No new session made')
          runItermAndFireCommand(newSession, {
            filePath: workspaces[i].filePath,
            command: workspaces[i].command,
            opensVSCode: workspaces[i].opensVSCode,
            usesDocker: workspaces[i].usesDocker,
          })
        }
      }
      delay(0.5)
      app.activate()
    },
    context,
    runItermAndFireCommand.toString()
  )
}
