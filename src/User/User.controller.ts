import { Body, Controller, Delete, Get, Param, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './User.service';
import { UpdateUserDto } from './CreateUser.Dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserMiddleware } from 'src/Middleware/user.middleware';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  //@UseGuards(RolesGuard)
  //@UseInterceptors(UserMiddleware)
  getUserById(@Param('id') id: string) {
    return this.userService.getUsersById(id);
  }

  @Put()
  updateUser(@Body() user: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(user, id);
  }

  @Delete()
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
