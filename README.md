## Workspace Automation Scripts

Automating workspaces with node.js + applescript (jxa)

## Tech

1. JXA
2. Node.js

## Use these apps to help you trigger your script

1. LaunchControl
2. Mac Script Editor
3. Shortcuts

# Step 1. Open your code editor at a new project. We will create a node.js script

```sh
  npm i -y
```

```sh
  touch index.js
```

```sh
 npm i node-jxa-workspace-automation
```

## Now in index.js copy and paste this example

```js
import { openChromiumBrowser } from 'node-jxa-workspace-automation'

const openMarketingInMyBrowsers = async () => {
  try {
    await openChromiumBrowser({
      tabs: ['https://hubspot.com', 'https://semrush.com'],
      browser: 'Google Chrome',
    })
  } catch (error) {
    throw new Error(error?.message || 'Something went wrong')
  }
}
openMarketingInMyBrowsers()
```

## Run your automation

### You might see permissions to run, select allow then run it again. Running it twice should only occur one time.

```sh
 node index.js
```

### If you want to to open a dev environment locally on VS Code

```ts
import {
  openTerminalInFilepath,
  getUserSelection,
  openApp,
  openArcContext,
  openDocker,
  openChromiumBrowser,
} from 'node-jxa-workspace-automation'

const contextName = {
  title: 'Context Name',
  description: 'Full Stack App',
  applications: [
    'Arc',
    'Terminal',
    'Insomnia',
    'DBeaver',
    'Docker',
    'Postgres',
  ],
  workspacePaths: [
    '<Enter file path to open in VSCODE>',
    '<Enter a second file path to open in VSCODE>',
  ],
  browserLinks: ['https://github.com'],
  workspaceCommands: ['npm run dev'],
  spaceName: '<your name>',
  spaceId: 'space name', // if you're using Arc
  usesDocker: true,
}

const context2 = {
  title: 'Company 2',
  description: 'next.js app',
  workspacePaths: ['<workspace path>'],
  workspaceCommands: ['npm run dev'],
  applications: ['Google Chrome', 'Terminal'],
  spaceName: '<space2>',
  browserLinks: [
    'https://runme.dev',
    'https://stateful.com',
    'http://localhost:3001',
  ],
  usesDocker: false,
}

const contextSelections = [contextName, context2Name]

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
      } else if (app == 'Google Chrome') {
        await openChromiumBrowser({
          tabs: selectedWorkspace.browserLinks,
          browser: app,
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
    throw new Error('Something went wrong')
  }
}

automateWorkspace()
```

Features

1. Open / Close Apps
2. Opens apps associated to workspace
3. Open project in code editor
4. Populate common workspace browser tabs to browser

## How you can make calling this easy

1. Make it a shortcut
2. Search then Select `Run Shell Script`

```sh
/Users/<User>/.nvm/versions/node/v18.16.0/bin/node <paste filepath to this script>
```

Notes:
Depending if you've installed node directly or with nvm you need to point to it.

[applescript docs](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_error_codes.html#//apple_ref/doc/uid/TP40000983-CH220-SW5)
