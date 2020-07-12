import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-creadential.dot';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    /**
     *
     */
    constructor(
        @InjectRepository(UserRepository)
        private userRepository :UserRepository,
        private jwtService : JwtService
        ) {
           
    }
    signUp(authCredentialDto:AuthCredentialDto) : Promise <void> {
           return this.userRepository.signUp(authCredentialDto)
    }

    async signIn (authCredentialDto:AuthCredentialDto) :Promise <{accessToken:string}> {
        const username =await this.userRepository.ValidatePassword(authCredentialDto)
        if(!username) {
            throw new UnauthorizedException('invalid credentials')
        }
        const payload :JwtPayload = {username};
        const accessToken =await this.jwtService.sign(payload);
        return {accessToken} 
    }
}
