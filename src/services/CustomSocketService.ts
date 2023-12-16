import {IO, Nsp, Socket, SocketService, SocketSession} from "@tsed/socketio";
import * as SocketIO from "socket.io";
interface Client {
    socket: SocketIO.Socket;
    id: string;
  }
@SocketService("socket")
export class CustomSocketService {
    @Nsp nsp: SocketIO.Namespace;
    private clients: Map<string, SocketIO.Socket> = new Map();
  @Nsp("/")
  nspOther: SocketIO.Namespace; 

  constructor(@IO() private io: SocketIO.Server) {}
  setIo(io:SocketIO.Server){
    this.io=io;
  }
  $onNamespaceInit(nsp: SocketIO.Namespace) {}
  $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
    console.log("hi");
    socket.on("setId", (id: string) => {
        console.log(id);
        this.clients.set(id, socket);
        
    });
  }
  $onDisconnect(@Socket socket: SocketIO.Socket) {
    this.clients.forEach((sockett, id) =>{
        if(socket.id==sockett.id){
            this.clients.delete(id);
            console.log(`${id} has disconnected`);
        }
    });
  }

  sendEventToClient(id: string, data: any) {
    let client = this.clients.get(id);
    if (client) {
      client.emit(id, data);
      return id;
    }
    else return this.clients.size;
  }
}
