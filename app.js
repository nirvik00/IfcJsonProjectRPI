const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');


require('dotenv').config();
app.use(cors());

require("./models/DataEntity");
const DataEntity = mongoose.model('DataEntity');

process.env.PWD = process.cwd();
app.use('/static', express.static(process.env.PWD + '/static'));

/* -- DB--*/
// connect to remote db during prod or local db
if(process.env.NODE_ENV==='production'){
    const MONGODB_URI = "mongodb+srv://ns:root@cluster0.wwegb.mongodb.net/IFCJSON?retryWrites=true&w=majority";
}else{
    const MONGODB_URI = "mongodb://localhost:27017/IFCJSON";
}

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error in mongodb connections"));

db.on('connected', () => {
    console.log('DB connection established...');
});

db.on('disconnected', () => {
    console.log('DB connection closed...');
});


/* -- middleware templating engine--*/
app.engine('handlebars', exhbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* -- routes -- */
app.get('/', (req, res) => {
    DataEntity.find({})
        .sort({ date: 'desc' })
        .then(dataEntity => {
            for (keys in dataEntity) {
                var obj = dataEntity[keys];
                console.log(keys, obj.filename);
            }
            res.render('index', { encodedJSON: encodeURIComponent(JSON.stringify(dataEntity)) })
        })
        .catch((err) => {
            console.log("error occured");
            res.render('index');
        })
});


app.get('/display/:id', (req, res) => {
    DataEntity.findOne({ _id: req.params.id })
        .then(dataEntity => {
            res.render('display', { encodedJson: encodeURIComponent(JSON.stringify(dataEntity)), id: req.params.id })
        });
});

app.get('/display', (req, res) => {
    res.render('display');
})

app.post('/upload', (req, res, next) => {
    // res.redirect('/');
    try{
        const fileContents = req.body.fileContents;
        const fileName = req.body.file;
    
        var jsonObj = JSON.parse(fileContents);
        for (keys in jsonObj) {
            var obj = jsonObj[keys];
            console.log(obj);
        }
    
        console.log(fileName, typeof (jsonObj));
    
        const jsonStr = {
            filename: fileName,
            // data: JSON.stringify(jsonObj)
            data: jsonObj
        };
        new DataEntity(jsonStr)
        .save()
        .then(() => {
            console.log("data posted to db, goto index");
            res.redirect('/');
        })
        .catch(err => { res.redirect('/') });
    }
    catch(Exception){
        res.redirect('/')
    }

    
});

app.delete('/del/:id', (req, res) => {
    DataEntity.remove({ _id: req.params.id })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log('error deleting the entry');
            res.redirect('/');
        })
});

/* -- set port and listen -- */
const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log('server started on port ' + port);
});