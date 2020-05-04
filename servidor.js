const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/html'));

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.listen(process.env.PORT || 3000,() => {
    console.log(`Rodando ${process.env.PORT || 3000}`);
});