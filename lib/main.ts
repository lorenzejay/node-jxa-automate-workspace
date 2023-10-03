import { openTerminalInFilepath } from './scripts/openTerminalContext'
import { openApp } from './scripts/openApp'
import { openArcContext, openChromiumBrowser, openSafariContext } from './scripts/openingBrowsers/browserScripts'
import { openDocker } from './scripts/openDocker'
import { getUserSelection } from './scripts/getUserSelection'
import { closeApp } from './scripts/closeApp'
import { openItermContext, runItermAndFireCommand } from './scripts/itermWindowArrangementAutomation'

export {
  openTerminalInFilepath,
  openApp,
  openDocker,
  openArcContext,
  getUserSelection,
  closeApp,
  openChromiumBrowser,
  openSafariContext,
  openItermContext,
  runItermAndFireCommand
}

