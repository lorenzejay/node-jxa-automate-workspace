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
  spaceName: string;
  links: string[]
}
export interface TerminalContext {
  filePaths: string[];
  commands: string[]
  usesDocker: boolean
}