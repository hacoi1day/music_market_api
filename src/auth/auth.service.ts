import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/utils/hash';
import { LoginDto } from './dto/Login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
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
}
