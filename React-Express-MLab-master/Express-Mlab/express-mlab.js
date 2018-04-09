const express = require('express');
const app     = express();
const cors    = require('cors');
const bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://rizkifirdaus:12345@ds131989.mlab.com:31989/pegawai';

MongoClient.connect(url, function(err, db) {
    console.log("Terhubung ke MLab");
});

app.use(cors());
app.use(bodyParser.json());

app.get('/data', (req, res)=>{
    MongoClient.connect(url, (err, db)=>{
        var collection = db.collection('data-pegawai')
        collection.find({}).toArray((err, docs)=>{
            console.log(docs);
            res.send(docs);
        });
    });
});

app.post('/data', (req, res)=>{
    MongoClient.connect(url, (err, db)=>{
        var data = {nama:req.body.nama, usia:req.body.usia, alamat:req.body.alamat};
        var collection = db.collection('data-pegawai');
        collection.insert(data, (err, result)=>{
            console.log(result);
            res.send(result);
        });
    });
});

app.listen(3300, ()=>{
    console.log('Server @Port 3300')
});