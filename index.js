const express = require('express')
const app = express()
const multer = require("multer");
const PORT = 8080
const server = app.listen(PORT, ()=> console.log(`server listen on PORT ${PORT}`))
server.on('error',err => console.log(`Error: ${err}`))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/uploads'))


// CONFIGURADO MULTER
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb ) =>{
        const filename = `${Date.now()}-${file.originalname}`
        cb(null,filename)
    }
})
// EJECUCION PARA TABAJAR LOCALMENTE EL MULTER
const upload = multer({storage: myStorage})


app.post('/uploadfile', upload.single('myFile'),(req,res)=>{
    const file = req.file
    console.log(file)
    if(!file){
        return res.status(404).send('Error subiendo archivos')
    }
    res.status(200).json({
        status:'Archivo subido correctamente! ',
        link:__dirname + '/uploads/'+file.filename
    })
})





const routerProductos = require('./routes/productos.js')
app.use('/api/productos',routerProductos)

