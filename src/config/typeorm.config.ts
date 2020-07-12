import {TypeOrmModuleOptions} from '@nestjs/typeorm'
export const typeOrmConfig : TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'ggwp1010',
    database:'taskmanagement',
    entities:[__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize:true
}

// export const typeOrmConfig : TypeOrmModuleOptions = {
//     type:'mongodb',
//     host:'localhost',
//     port:27017,
//     username:'jahid',
//     password:'ggwp1010',
//     database:'taskmanagement',
//     entities:[__dirname + "/../**/*.entity{.ts,.js}"],
//     synchronize:true,
//     useUnifiedTopology :true
// }