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

// mac terminal
export interface TerminalContext {
  filePath: string,
  command?: string,
  opensVSCode?: boolean,
  usesDocker?: boolean
}


export interface ItermWindowSplit {
  workspaces: TerminalContext[]
  useSplitPanes: boolean
}