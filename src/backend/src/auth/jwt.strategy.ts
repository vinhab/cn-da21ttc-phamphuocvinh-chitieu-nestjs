import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy JWT từ header Authorization
      ignoreExpiration: false, // Không bỏ qua thời gian hết hạn
      secretOrKey: 'f6a8f98bde37ffb2a746b8df70b2cc45e8b44c2a4b97430981c7bfcf28a254a9', // Khóa bí mật JWT (nên lưu trong biến môi trường)
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }; // Trả về thông tin user
  }
}
