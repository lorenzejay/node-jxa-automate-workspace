## Workspace Automation Scripts

Automating workspaces with node.js + applescript

```sh
 npm i node-jxa-workspace-automation
```

## Tech

1. JXA
2. Node.js

## Use these apps to help you trigger your script

3. LaunchControl
4. Mac Script Editor
5. Shortcuts

Here is an example use:

```js
import '@jxa/global-type'
import { contextSelections } from './defaultContexts/context.js'
import {
  getUserSelection,
  openApp,
  openArcContext,
  openDocker,
  openTerminalInFilepath,
} from 'node-jxa-workspace-automation'

const automateWorkspace = async () => {
  try {
    const selectedWorkspace = await getUserSelection(contextSelections)
    if (!selectedWorkspace) return 'no selected apps'
    for (let app of selectedWorkspace.applications) {
      if (app == 'Docker') {
        await openDocker()
      } else if (app == 'Terminal') {
        await openTerminalInFilepath({
          filePaths: selectedWorkspace.workspacePaths,
          commands: selectedWorkspace.workspaceCommands,
          usesDocker: selectedWorkspace.usesDocker,
        })
      } else if (app == 'Arc') {
        await openArcContext({
          links: selectedWorkspace.browserLinks,
          spaceName: selectedWorkspace.spaceName,
        })
      } else {
        await openApp(app)
      }
    }
  } catch (error) {
    throw new Error(error?.message || 'Something went wrong')
  }
}

automateWorkspace()
```

Features

1. Open / Close Apps
2. Opens apps associated to workspace
3. Open project in code editor
4. Populate common workspace browser tabs to browser

## Resources:

[applescript docs](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_error_codes.html#//apple_ref/doc/uid/TP40000983-CH220-SW5)
