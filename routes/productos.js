const express = require('express')
const router = express.Router()

let productos = []

router.get('/', (req, res) => {
    res.send({ productos })
})
router.get('/:id', (req, res) => {
    const {id} = req.params;
    
    if(productos.length<id){
        res.status(403).send({error: true, msg: "Producto no encontrado"})
    }else{
        res.send(productos[id-1]);
    }
})

router.post('/', (req, res) => {
    const contador = productos.length;
    const { title, price, file } = req.body;
    productos.push({
        id : contador,
        title,
        price,
        file
    })
    res.send({
        Agregado: {
            contador,
            title,
            price,
            file
        }
    })
    res.status(200).send('Producto Agregado')
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, price } = req.body;
    const anterior = productos[id - 1];

    productos[id - 1] = {
        id: id - 1,
        title,
        price
    }
    const actualizado = productos[id - 1]
    res.send({
        actualizado,
        nuevo: {
            anterior
        }
    })

})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos[id - 1];
    productos = productos.filter((e) => e !== productos[id - 1])

    res.send({
        eliminado: producto
    })
})

module.exports = router