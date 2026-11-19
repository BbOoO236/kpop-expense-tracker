import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter.js';
import { AuthController } from '../src/modules/auth/auth.controller.js';
import { AuthService } from '../src/modules/auth/auth.service.js';
import { User } from '../src/modules/auth/user.entity.js';

describe('Auth (integration)', () => {
  let app: INestApplication<App>;

  const usersRepo = {
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: usersRepo },
        {
          provide: JwtService,
          useValue: { signAsync: vi.fn().mockResolvedValue('signed-token') },
        },
        {
          provide: ConfigService,
          useValue: {
            get: vi.fn((k: string) =>
              k === 'WECHAT_APPID' ? 'appid' : 'secret',
            ),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    vi.unstubAllGlobals();
  });

  describe('POST /api/v1/auth/login', () => {
    it('rejects a missing code with 400 and an array message', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({})
        .expect(400);

      expect(res.body.statusCode).toBe(400);
      expect(Array.isArray(res.body.message)).toBe(true);
    });

    it('rejects a non-string code with 400', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ code: 123 })
        .expect(400);
    });

    it('returns 200 with token and user on a valid code', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          json: () => Promise.resolve({ openid: 'openid-1' }),
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

      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ code: 'valid-code' })
        .expect(200);

      expect(res.body.token).toBe('signed-token');
      expect(res.body.user).toEqual({
        id: 'uuid-1',
        nickname: null,
        avatar: null,
      });
    });

    it('returns 401 when WeChat rejects the code', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          json: () => Promise.resolve({ errcode: 40029, errmsg: 'invalid code' }),
        }),
      );

      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ code: 'bad-code' })
        .expect(401);

      expect(res.body.statusCode).toBe(401);
      expect(res.body.message).toBe('WeChat login failed: 40029 invalid code');
    });
  });
});
