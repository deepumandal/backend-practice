import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  @EventPattern('user.created')
  handleUserCreated(@Payload() data: any) {
    this.logger.log(`📨 New user created: ${JSON.stringify(data)}`);
    // Imagine sending a welcome email here
  }
}
