const express = require("express");
const db = require("./data/hubs-model.js");
const server = express();

server.listen(4000, () => {
    console.log("listening on port 4000");
});

//to apply json method to every request
server.use(express.json())

//HTTP Method
//URI : scheme://host_name:port/path?parameter_List
//https://www.google.com/some/document?with_paramater

server.get("/", (req, res) => {
    res.send("hello world");
});

//Read
server.get("/hubs", (req, res) => {
    db.find()
        .then(hubs => {
            res.status(200).json({
                hubs
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        });
});

//Create
server.post("/hubs", (req, res) => {
    const hubInfo = req.body;
    db.add(hubInfo)
        .then(hub => {
            res.status(201).json({
                success: true,
                hub
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        });
});

//DELETE /hubs/5
server.delete("hubs/:id", (req, res) => {
    const {
        id
    } = req.params
    db.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end()
            } else {
                res.status(404).json({
                    success: false,
                    message: 'ID not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        });
});

server.put("/hubs/:id", (req, res) => {
    const {
        id
    } = req.params
    const changes = req.body
    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(204).json({
                    success: true,
                    updated
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'ID not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        });
});

server.patch("/hubs/:id", (req, res) => {});