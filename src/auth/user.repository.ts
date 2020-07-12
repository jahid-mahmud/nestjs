import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-creadential.dot";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp (authCreadentialDto :AuthCredentialDto) :Promise<void> {
        const {username,password} =authCreadentialDto;
        const salt = await bcrypt.genSalt()
        const user =new User();
        user.username=username;
        user.password=await this.hashPassword(password,salt);
        user.salt =salt
        try {
            await user.save()
        } catch(error) {
            console.log(error)
          if(error.code === '23505') {
              //23505 is sent by typeorm for duplicate value in same same column
              throw new ConflictException('username already exists')
          }
          else {
              throw new InternalServerErrorException()
          }
        }      
    }

    private async hashPassword (password :string ,salt:string) :Promise<string> {
        return bcrypt.hash(password,salt)
    }

    async ValidatePassword (authCredentialDto :AuthCredentialDto) :Promise <string> {
       const {username ,password} = authCredentialDto;
       const user = await this.findOne({username})
       if(user && await user.validatePassword(password)) {
           return user.username
       }
       else {
           return null
       }
    }
}