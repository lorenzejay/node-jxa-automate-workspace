import '@jxa/global-type'
import { run } from '@jxa/run'

interface VSCodeContext{
  filepath: string
}

export const openVSCodeInPath = async (context:VSCodeContext) => {
  return await run((context: VSCodeContext) => {
    const { filepath } = context
    const terminal = Application('Terminal')
    terminal.includeStandardAdditions = true

    delay(0.5)
    terminal.doScript()
    terminal.doScript(`code "/${filepath}"`)
    
  }, context)
}

openVSCodeInPath({filepath: "Users/lorenzejay/Documents/Uplift Digital Solutions/clients/unifai/Unifai-surveygen"})