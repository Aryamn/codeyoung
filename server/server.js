const http = require('http');
const express = require("express");
const app = require('./app');
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(PORT,()=>console.log("running server"))

