const net = require('net')

let Users = []

const server = net.createServer()

//comienza la conexion
server.on('connection', (socket) => {
    let username;
    let name = false;
    let userExist=false;

    console.log("Conexion exitosa!")

    socket.on('data', data =>{ //funcion con alcance global

        if (!name) {
            username = data.toString().trim()
            Users.forEach((user) => {
                if(user.username === username){
                    userExist = true
                }
            })
            if (userExist) {
                socket.write("Cliente repetido, saliendo...")
                socket.end()
            }
            Users.push({username, socket})
            name = true
        }
        broadcast(data, socket)
    })

    socket.on('close', ()=>{ //el cliente se ha ido
        console.log('Comunicacion finalizada')
    })

    socket.on('error', (err)=>{ //se ha perdido la conexion
        console.log('Error de conexion')
    })
})

server.listen(2000, '127.0.0.1' ,()=> {
    console.log('servidor escuchando en el puerto', server.address().port)
})

const broadcast = (message, send) => {
      Users.forEach((socket) => {
        if(socket.socket !== send){
            socket.socket.write(message);
        }
      });
}

