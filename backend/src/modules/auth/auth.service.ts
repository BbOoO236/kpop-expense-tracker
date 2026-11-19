import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';

interface Code2SessionResponse {
  openid?: string;
  session_key?: string;
  unionid?: string;
  errcode?: number;
  errmsg?: string;
}

export interface LoginResult {
  token: string;
  user: { id: string; nickname: string | null; avatar: string | null };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Exchange a WeChat `wx.login` code for a signed bearer token, creating the
   * user on first login (per the WeChat Platform-First constitution principle).
   */
  async login(code: string): Promise<LoginResult> {
    const openid = await this.exchangeCode(code);

    let user = await this.users.findOne({ where: { openid } });
    if (!user) {
      user = await this.users.save(this.users.create({ openid }));
    }

    const token = await this.jwt.signAsync({
      sub: user.id,
      openid: user.openid,
    });

    return {
      token,
      user: { id: user.id, nickname: user.nickname, avatar: user.avatar },
    };
  }

  /** Call WeChat `code2session` and return the user's `openid`. */
  private async exchangeCode(code: string): Promise<string> {
    const appid = this.config.get<string>('WECHAT_APPID');
    const secret = this.config.get<string>('WECHAT_SECRET');

    const url = `https://api.weixin.qq.com/sns/jscode2session?${new URLSearchParams(
      {
        appid: appid ?? '',
        secret: secret ?? '',
        js_code: code,
        grant_type: 'authorization_code',
      },
    )}`;

    const res = await fetch(url);
    const data = (await res.json()) as Code2SessionResponse;

    if (!data.openid) {
      throw new UnauthorizedException(
        `WeChat login failed: ${data.errcode ?? 'unknown'} ${data.errmsg ?? ''}`.trim(),
      );
    }

    return data.openid;
  }
}
