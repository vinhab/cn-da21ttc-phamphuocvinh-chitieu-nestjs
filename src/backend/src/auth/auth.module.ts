import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.register({secret:'f6a8f98bde37ffb2a746b8df70b2cc45e8b44c2a4b97430981c7bfcf28a254a9', signOptions: {expiresIn: '30m'}})],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
