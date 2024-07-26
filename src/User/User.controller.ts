import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './User.service';
import { UpdateUserDto } from './CreateUser.Dto';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Req()req,@Param('id') id: string) {
    const user=req.user
    const idUser =user.sub 
    return this.userService.getUsersById(id, idUser);
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
