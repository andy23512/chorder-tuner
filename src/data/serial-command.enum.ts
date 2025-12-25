// Reference: https://docs.charachorder.com/SerialAPI.html
export enum SerialCommand {
  Id = 'ID',
  Version = 'VERSION',
  GetKeyMap = 'VAR B3',
}

export type SerialCommandArgMap = {
  [SerialCommand.Id]: [];
  [SerialCommand.Version]: [];
  [SerialCommand.GetKeyMap]: [string, string];
};
