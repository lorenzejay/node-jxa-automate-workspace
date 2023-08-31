## Workspace Automation Scipts

Automating workspaces with node.js + applescript

## Tech

1. JXA
2. Node.js

## Use these apps to help you trigger your script

3. LaunchControl
4. Mac Script Editor
5. Shortcuts

Here is an example use:

```js
import { contextSelections } from './context-examples.js'
import { openTerminalInFilepath } from '../lib/scripts/openTerminalContext.js'
import { openApp } from '../lib/scripts/openApp.js'
import { openArcContext } from '../lib/scripts/openArcContext.js'
import { openDocker } from '../lib/scripts/openDocker.js'
import { getUserSelection } from '../lib/scripts/getUserSelection.js'

const automateWorkspace = async () => {
  try {
    const selectedWorkspace = await getUserSelection(contextSelections)
    if (!selectedWorkspace) return 'no selected apps'
    for (let app of selectedWorkspace.applications) {
      if (app == 'Docker') {
        await openDocker('Docker')
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

- not needed for ARC

## Resources:

[applescript docs](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_error_codes.html#//apple_ref/doc/uid/TP40000983-CH220-SW5)
