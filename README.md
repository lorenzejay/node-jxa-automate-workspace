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

In your package.json file include `"type": "module"` to use import syntax

```sh
  touch index.js
```

```sh
 npm i node-jxa-workspace-automation
```

## Now in index.js copy and paste this example

```js
import { openChromiumBrowser } from 'node-jxa-workspace-automation'

openChromiumBrowser({
  tabs: ['https://hubspot.com', 'https://semrush.com'],
  browser: 'Google Chrome',
})
```

## Run your automation

### You might see permissions to run, select allow then run it again. Running it twice should only occur one time.

```sh
 node index.js
```

### If you want to run terminal processes with Iterm

```ts
import { openItermContext } from 'node-jxa-workspace-automation'

const contexts: ItermWindowSplit = {
  useSplitPanes: true,
  workspaces: [
    {
      filePath: '<your filepath>',
      command: 'npm run start:dev',
      usesDocker: true,
      opensVSCode: true, // works if you have VS Code `code .` enabled
    },
    {
      filePath: '<your filepath>',
      command: 'npm run start',
    },
  ],
}

//RUN
const spawnWorkspace = async () => {
  return await openItermContext(contexts)
}
spawnWorkspace()
```

Features

1. Open / Close Apps
2. Opens apps associated to workspace
3. Open project in code editor
4. Populate common workspace browser tabs to browser
5. Quit all apps except for passed list of apps

## How you can make calling this easy

1. Make it a shortcut
2. Search then Select `Run Shell Script`

```sh
/Users/<User>/.nvm/versions/node/v18.16.0/bin/node <paste filepath to this script>
```

Notes:
Depending if you've installed node directly or with nvm you need to point to it.

[applescript docs](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_error_codes.html#//apple_ref/doc/uid/TP40000983-CH220-SW5)

## License

This project is available under the [Fair Source License](https://fair.io/?a#license) and can be used for free for individual use.

### For Individual Users

- Individual users are permitted to use the software for free.
- Review the [LICENSE](./license) file for detailed information on the permissions and limitations.

### For Commercial Use

- Businesses and other commercial entities are required to purchase a commercial license for use.
- The use of this software without a commercial license in a commercial setting is not permitted under the Fair Source License.

**Please review the [LICENSE](./license) file in this repository for full details on permissions and restrictions.**
