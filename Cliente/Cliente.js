const net = require('net')
let color = require('colors')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const sendLine = new Promise (respuesta=>{
    let line = readline.question('\nAgregue su nombre de usuario: ', name =>{
        respuesta(name)
    })
    
})

sendLine.then(name =>{
    const socket = net.connect({port: 2000, host: '127.0.0.1' })

    socket.on('connect', (data)=>{
        socket.write(color.cyan("Servidor dice: ") + name + " ingreso al servidor")
    })

    readline.on('line', data =>{
        socket.write(color.red(name) + ': ' + color.yellow(data))
    })

    socket.on ( 'data', data => {
        console.log(color.magenta(data.toString()));
    });

    socket.on('end',() =>{
        socket.write(color.cyan('Servidor dice: ')+'El usuario salio')
        process.exit()
    })

})

