import { io, Socket } from 'socket.io-client';
import { HttpClient } from '../../http-client';
import { getDefaultHeaders } from '../../../utils/headers';

export class Message extends HttpClient {
  private socket: Socket | null = null;

  connectToWebSocket(token: string, tenantId: string) {
    this.socket = io('ws://localhost:3030', {
      auth: { token, tenantId },
    });
    this.socket.on('connect', () => console.log('WebSocket connected'));
    this.socket.on('connect_error', (err) =>
      console.error('WebSocket error:', err.message),
    );
    return this.socket;
  }

  sendMessage(senderId: string, receiverId: string, content: string) {
    if (this.socket) {
      this.socket.emit('sendMessage', { senderId, receiverId, content });
    }
  }

  onNewMessage(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.on('newMessage', (message) => callback(message));
    }
  }

  disconnectWebSocket() {
    if (this.socket) this.socket.disconnect();
  }

  getMessages(id1: string, id2: string) {
    return this.request({
      path: `/message/${id1}/${id2}`,
      method: 'GET',
      headers: getDefaultHeaders(),
    });
  }
}
