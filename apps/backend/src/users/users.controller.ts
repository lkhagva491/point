import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Users")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

    @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Users retrieved successfully" })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.findAll(page, limit);
  }

  @Get(":email")
  @ApiOperation({ summary: "Get user by email" })
  @ApiResponse({ status: 200, description: "User retrieved successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  findOne(@Param("email") email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(":email")
  @ApiOperation({ summary: "Update user by email" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  update(
    @Param("email") email: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ) {
    return this.usersService.updateByEmail(email, updateUserDto);
  }

  @Patch(":email/password")
  @ApiOperation({ summary: "Change user password by email" })
  @ApiResponse({ status: 200, description: "Password changed successfully" })
  @ApiResponse({
    status: 400,
    description: "Invalid current password or passwords do not match",
  })
  @ApiResponse({ status: 404, description: "User not found" })
  async changePassword(
    @Param("email") email: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: any,
  ) {
    // Ensure the user is changing their own password or is an admin
    if (req.user.userType !== "admin" && req.user.email !== email) {
      throw new UnauthorizedException("You can only change your own password.");
    }
    return this.usersService.changePassword(email, changePasswordDto);
  }

  @Delete(":email")
  @ApiOperation({ summary: "Delete user by email" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  remove(@Param("email") email: string) {
    return this.usersService.removeByEmail(email);
  }
}
