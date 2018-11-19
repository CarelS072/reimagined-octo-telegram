const path = require('path')
const express = require('express')
require ('donenv/config')


const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

module.exports = server
