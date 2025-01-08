import { Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, 
        private readonly userService: UserService
    ) {};

    // Xac thuc
    async validateUser(username: string, password: string) : Promise<any> {
        const user = await this.userService.findByUsername(username);
        console.log('Found user:', user);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }

        return null;
    }

    // Dang nhap & tao token
    async login(user: any) {
        const payload = {username: user.username, sub: user.id};
        
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: any) {
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu
    
        await this.userService.createUser({
          ...createUserDto,
        });
    
        return { message: 'Đăng ký thành công!' };
      }
}
