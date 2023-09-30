import { Dayjs } from 'dayjs';

export class Token {
  constructor(
    public readonly token: string,
    public readonly expires: Dayjs
  ) {

  }
}
