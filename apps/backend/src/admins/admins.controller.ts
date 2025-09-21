import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Admins")
@Controller("admins")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new admin" })
  @ApiResponse({ status: 201, description: "Admin created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

    @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({ status: 200, description: "Admins retrieved successfully" })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.adminsService.findAll(page, limit);
  }

  @Get(":email")
  @ApiOperation({ summary: "Get admin by email" })
  @ApiResponse({ status: 200, description: "Admin retrieved successfully" })
  @ApiResponse({ status: 404, description: "Admin not found" })
  findOne(@Param("email") email: string) {
    return this.adminsService.findByEmail(email);
  }

  @Patch(":email")
  @ApiOperation({ summary: "Update admin by email" })
  @ApiResponse({ status: 200, description: "Admin updated successfully" })
  @ApiResponse({ status: 404, description: "Admin not found" })
  update(
    @Param("email") email: string,
    @Body() updateAdminDto: Partial<CreateAdminDto>,
  ) {
    return this.adminsService.updateByEmail(email, updateAdminDto);
  }

  @Delete(":email")
  @ApiOperation({ summary: "Delete admin by email" })
  @ApiResponse({ status: 200, description: "Admin deleted successfully" })
  @ApiResponse({ status: 404, description: "Admin not found" })
  remove(@Param("email") email: string) {
    return this.adminsService.removeByEmail(email);
  }
}
