import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-creadential.dot';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    /**
     *
     */
    constructor(private authService :AuthService) {
        
        
    }
    @Post('/signup')
    signUp (
        @Body(ValidationPipe) authCredentialDto :AuthCredentialDto
    ) :Promise<void> {
       return this.authService.signUp(authCredentialDto)
    }

    @Post('/signin')
    signIn (@Body(ValidationPipe) authCredentialDto :AuthCredentialDto) 
    :Promise <{accessToken :string}> {
         return this.authService.signIn(authCredentialDto)
    }

}
