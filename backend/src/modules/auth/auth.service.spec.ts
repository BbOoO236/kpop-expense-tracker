import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service.js';
import { User } from './user.entity.js';

describe('AuthService', () => {
  let service: AuthService;

  const usersRepo = {
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
  };

  const jwt = { signAsync: vi.fn() };

  const config = {
    get: vi.fn((key: string) =>
      key === 'WECHAT_APPID' ? 'test-appid' : 'test-secret',
    ),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: usersRepo },
        { provide: JwtService, useValue: jwt },
        { provide: ConfigService, useValue: config },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe('login', () => {
    it('creates a new user and issues a token on first login', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          json: () => Promise.resolve({ openid: 'openid-1', session_key: 'sk' }),
        }),
      );

      usersRepo.findOne.mockResolvedValue(null);
      usersRepo.create.mockReturnValue({ openid: 'openid-1' });
      usersRepo.save.mockResolvedValue({
        id: 'uuid-1',
        openid: 'openid-1',
        nickname: null,
        avatar: null,
      });
      jwt.signAsync.mockResolvedValue('signed-token');

      const result = await service.login('wx-code');

      expect(result.token).toBe('signed-token');
      expect(result.user).toEqual({ id: 'uuid-1', nickname: null, avatar: null });
      expect(usersRepo.create).toHaveBeenCalledWith({ openid: 'openid-1' });
      expect(usersRepo.save).toHaveBeenCalledTimes(1);
      expect(jwt.signAsync).toHaveBeenCalledWith({
        sub: 'uuid-1',
        openid: 'openid-1',
      });
    });

    it('reuses an existing user without creating a duplicate', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          json: () => Promise.resolve({ openid: 'openid-1' }),
        }),
      );

      usersRepo.findOne.mockResolvedValue({
        id: 'uuid-1',
        openid: 'openid-1',
        nickname: 'KpopFan',
        avatar: 'http://avatar',
      });
      jwt.signAsync.mockResolvedValue('signed-token');

      const result = await service.login('wx-code');

      expect(usersRepo.create).not.toHaveBeenCalled();
      expect(usersRepo.save).not.toHaveBeenCalled();
      expect(result.user.nickname).toBe('KpopFan');
    });

    it('throws UnauthorizedException when code2session returns no openid', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          json: () => Promise.resolve({ errcode: 40029, errmsg: 'invalid code' }),
        }),
      );

      await expect(service.login('bad-code')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
