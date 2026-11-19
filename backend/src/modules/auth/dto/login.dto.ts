import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  /** The temporary code returned by WeChat `wx.login`. */
  @IsString()
  @IsNotEmpty()
  code!: string;
}
