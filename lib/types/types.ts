export interface WorkspaceContext  {
    id: number,
    title: string,
    description?: string,
    applications: string[],
    workspacePaths: string[],
    browserLinks: string[],
    workspaceCommands: string[], // should match the length of workspacePaths
    spaceName: string,
    spaceId?: string,
    usesDocker: boolean,
}

export interface ArcContextTypes {
  spaceName?: string;
  links?: string[]
}
export interface TerminalContext {
  filePaths: string[];
  commands: string[]
  usesDocker: boolean
}

// mac terminal
export interface TerminalProcess {
  filePath: string,
  command?: string,
  opensCodeEditor: boolean,
  usesDocker?: boolean

}


export interface ITerminalProcess extends TerminalProcess{
  windowArrangementName?: string
  combineTabs?: boolean
  tabs?: number
}
export interface ITerminalTabs {
  workspace: TerminalContext
  windowArrangementName?: string
  combineTabs?: boolean
  tabs?: number
  opensCodeEditor?: boolean,

}

export interface ItermContext {
  filePath: string;
  command: string;
  usesDocker: boolean
  opensVSCode: boolean
}

export interface ItermWindowSplit {
  workspaces: ItermContext[]
  useSplitPanes: boolean
  // runItermAndFireCommandFunc: string
}