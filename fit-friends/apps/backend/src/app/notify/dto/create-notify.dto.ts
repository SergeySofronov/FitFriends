export class CreateNotifyDto {
  public notifiedUserId: number;
  public notifyingUserId?: number;
  public text: string;
  public isChecked: boolean;
}
