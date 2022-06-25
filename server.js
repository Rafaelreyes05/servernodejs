console.clear()
const express = require('express')
const fs = require('fs')

const app = express ()
const PORT = 8080


class Container{
    constructor(name){
        this.name = name
    }

    getAll(){
        let data = fs.readFileSync(this.name,'utf-8')
        let productos = JSON.parse (data)
        return productos
    }

    getRandom(){
        let productos = this.getAll()
        let number = Math.floor(Math.random() * productos.length)+1
        console.log(number)
        let productoRamdom = productos.find(producto=>producto.id===number)
        console.log(productoRamdom)
        return productoRamdom
    }
}

const archivo = new Container ('productos.txt')

app.get('/productos',(req,res)=>{
    console.log('Bienvenido!!')
    res.send('Bienvenido!!')
})


app.get('/productos',(req,res)=>{
    console.log('Todos los productos')
    let productos = archivo.getAll()
    res.send(productos)
})

app.get('/productoramdom',(req,res)=>{
    console.log('Producto random')
    let producto = archivo.getRandom()
    res.send(producto)
})

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})