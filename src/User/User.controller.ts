import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './User.service';
import { UpdateUserDto } from './CreateUser.Dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get()
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
