import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options:{
        host: "localhost",
        port: 6379
      }
    });
  }

  async register(dto: RegisterDto) {
    // Simulate DB user creation
    const newUser = {
      id: Date.now(),
      ...dto,
    };

    // Emit user.created event
    await this.client.emit('user.created', {
      email: newUser.email,
      username: newUser.username,
    });

    return { message: 'User registered', user: newUser };
  }
}
