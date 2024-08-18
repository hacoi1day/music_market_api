import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/utils/hash';
import { LoginDto } from './dto/Login.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { ForgotPasswordDto } from './dto/ForgotPassword.dto';
import { randomBytes } from 'crypto';
import { ResetPasswordDto } from './dto/ResetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async register(registerDto: RegisterDto) {
    // check email
    const check = await this.userRepo.count({
      email: registerDto.email,
    });
    if (check) {
      throw new BadRequestException(`Email ${registerDto.email} exists`);
    }

    const password = await hashPassword(registerDto.password);
    registerDto.password = password;

    const user = this.userRepo.create(registerDto);
    await this.em.flush();
    if (!user) {
      throw new InternalServerErrorException('Register failed');
    }
    return {
      message: 'Register success',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepo.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new NotFoundException(`Email ${loginDto.email} not found`);
    }

    const isMatch = await comparePassword(loginDto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password incorrect');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }

  async profile(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      id,
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.userRepo.findOne({
      email,
    });

    if (!user) {
      throw new NotFoundException(`Email ${email} not found`);
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour expiration

    wrap(user).assign({
      resetToken,
      resetTokenExpiration,
    });
    await this.em.flush();

    const link = `Token: ${resetToken}`; // will update to link when have UI
    await this.mailerService.sendMail(email, 'Reset Password', link);

    return {
      message: 'Sent mail reset password',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    const user = await this.userRepo.findOne({
      resetToken: token,
    });

    if (!user || user.resetTokenExpiration < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    const password = await hashPassword(newPassword);
    wrap(user).assign({
      password,
      resetToken: null,
      resetTokenExpiration: null,
    });
    await this.em.flush();

    return {
      message: 'Reset password success',
    };
  }
}
