import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Injectable()
export class AdminAuthGuard extends JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const activate = super.canActivate(context);
    if (typeof activate === "boolean") {
      return activate ? this.validateAdmin(context) : false;
    }
    return (activate as Promise<boolean>).then((res) =>
      res ? this.validateAdmin(context) : false,
    );
  }

  validateAdmin(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role === "admin") {
      return true;
    }
    throw new UnauthorizedException("Admin access required");
  }
}
