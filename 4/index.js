const http = require('http');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbConnection = require('./connection/database');
const uploadFile = require('./middlewares/uploadFile');
const { release } = require('os');

app.set('view engine', 'hbs');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  session(
    {
      cookie: {
        maxAge: 1000 * 60 * 60 * 2,
      },
      store: new session.MemoryStore(),
      resave: false,
      saveUninitialized: true,
      secret: 'SangatRahasia',
    }
  )
);

app.use(function(req,res,next){
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

hbs.registerPartials(__dirname + '/views/partials');

var pathFile = 'http://localhost:3000/uploads/';


app.get('/', function(request,response) {

    const title = 'Provinsi';

    const query = `SELECT * FROM provinsi_tb`;
  
    dbConnection.getConnection(function (err,conn) {
      if (err) throw err;
      conn.query(query, function (err, results) {
        if (err) throw err;
        const provinsi = [];

          for (var result of results) {
            provinsi.push({
              id: result.id,
              nama: result.nama,
              photo: pathFile + result.photo,
              tanggal: result.diresmikan,
            });
          }
  
        response.render('index', {
          title,
          provinsi,
        });
      });
    });
});


app.get('/addProvinsi', function(request,response) {
  const title = 'Add Provinsi';
  response.render('addProvinsi', {
    title,

  });
});

app.post('/addProvinsi', uploadFile('image') ,function(request,response) {
  var {nama, tanggal} = request.body;
  var image = '';

  if (request.file){
    image = request.file.filename;
  }

  if (nama == '' ||  image == ''  || tanggal == '') {
    request.session.message = {
      type: 'danger',
      message: 'Please insert all field!',
    };
    return response.redirect('/addProvinsi');
  }
    const query = `INSERT INTO provinsi_tb (nama, photo, diresmikan) VALUES ("${nama}", "${image}","${tanggal}")`;
    dbConnection.getConnection(function(err,conn){
      if(err) throw err;
        conn.query(query,function(err,result) {
          if (err) throw err;

          request.session.message = {
            type: 'success',
            message: 'Add artis has success',
          };

          response.redirect('/addProvinsi');
        });

        conn.release();
     });
});

app.get('/addKabupaten', function(request,response) {
  const title = 'AddKabuupaten';
  const query = `SELECT id, nama FROM provinsi_tb`;

  dbConnection.getConnection(function (err,conn) {
    if (err) throw err;
    conn.query(query, function (err, results) {
      if (err) throw err;
      const provinsi = [];

      for (var result of results) {
        provinsi.push({
          id: result.id,
          nama: result.nama,
        });
      }

      response.render('addKabupaten', {
        title,
        
        provinsi,
      });
    });
  });
});

app.post('/addKabupaten', uploadFile('image') ,function(request,response) {
  var {nama, tanggal} = request.body;
  var image = '';

  if (request.file){
    image = request.file.filename;
  }

  if (nama == '' ||  image == ''  || tanggal == '') {
    request.session.message = {
      type: 'danger',
      message: 'Please insert all field!',
    };
    return response.redirect('/addKabupaten');
  }
    const query = `INSERT INTO kabupaten_tb (nama, photo, diresmikan) VALUES ("${nama}", "${image}","${tanggal}")`;
    dbConnection.getConnection(function(err,conn){
      if(err) throw err;
        conn.query(query,function(err,result) {
          if (err) throw err;

          request.session.message = {
            type: 'success',
            message: 'Add artis has success',
          };

          response.redirect('/addKabupaten');
        });

        conn.release();
     });
});

app.get('/deleteKabupaten/:id', function(request,response) {
  const id = request.params.id;

  const query = `DELETE FROM kabupaten_tb WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query(query,function(err,result) {
      if (err) throw err;

      response.redirect('/');
    });

    conn.release();
  });
  
});

app.get('/detail/:id', function(request,response) {
  const title = 'Detail';
  const id = request.params.id;
  const query = `SELECT * FROM provinsi_tb WHERE id = ${id}`;
  
  dbConnection.getConnection(function (err,conn) {
    if (err) throw err;
    conn.query(query, function (err, results) {
      if (err) throw err;
      const provinsi = [];

        for (var result of results) {
          provinsi.push({
            id: result.id,
            nama: result.nama,
            photo: pathFile + result.photo,
            tanggal: result.diresmikan,
          });
        }

      response.render('detail', {
        title,
        provinsi,
      });
    });
  });
});

app.get('/edit/:id', function(request,response) {
  const title = 'Edit';
  const id = request.params.id;

  const query = `SELECT * FROM provinsi_tb WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
      conn.query(query,function(err,results) {
        if (err) throw err;

        const provinsi = {
          ...results[0],
          photo: pathFile + results[0].photo,
        };

        response.render('edit', {
          title,
          provinsi,
        });
      });

      conn.release();
   });
});

app.post('/edit', uploadFile('image'), function(request,response) {
  const {id, nama, tanggal, oldCover} = request.body;

  var image = oldCover.replace(pathFile, '');
  if (request.file) {
    image = request.file.filename;
  }

  const query = `UPDATE provinsi_tb SET photo = "${image}", nama = "${nama}", diresmikan = "${tanggal}" WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
      conn.query(query,function(err,results) {
        if (err) throw err;

        response.redirect(`/detail/${id}`);
      });

      conn.release();
   });
});

app.get('/editMusic/:id', function(request,response) {
  const title = 'Edit Music';
  const id = request.params.id;

  const query = `SELECT * FROM tb_music WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
      conn.query(query,function(err,results) {
        if (err) throw err;

        const music = {
          ...results[0],
          cover_music: pathFile + results[0].cover_music,
        };

        response.render('editMusic', {
          title,
          isLogin: request.session.isLogin,
          music,
        });
      });

      conn.release();
   });
});

app.post('/editMusic', uploadFile('image'), function(request,response) {
  const {id, title, music, oldCover} = request.body;

  var image = oldCover.replace(pathFile, '');
  if (request.file) {
    image = request.file.filename;
  }

  const query = `UPDATE tb_music SET cover_music = "${image}", title = "${title}", music = "${music}" WHERE id = ${id}`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
      conn.query(query,function(err,results) {
        if (err) throw err;

        response.redirect(`/detailMusic/${id}`);
      });

      conn.release();
   });
});

app.get('/detailMusic/:id', function(request,response) {
  const title = 'Detail Music';
  const id = request.params.id;

  const query = `SELECT * FROM tb_music WHERE id = ${id}`;

  dbConnection.getConnection(function (err,conn) {
    if (err) throw err;
    conn.query(query, function (err, results) {
      if (err) throw err;
      const music = {
        id: results[0].id,
        title: results[0].title,
        music: results[0].music,
        cover_music: pathFile + results[0].cover_music,
        // artis_id: results[0].id,
      };

      response.render('detailMusic', {
        title,
        isLogin: request.session.isLogin,
        music,
      });
    });
  });

});


const port = 3000;
const server = http.createServer(app);
server.listen(port);
console.debug(`Server listening on port ${port}`);

// app.get('/artis', function(request,response) {
//   const title = 'Artis';

//   const query = `SELECT * FROM tb_artis`;

//   dbConnection.getConnection(function (err,conn) {
//     if (err) throw err;
//     conn.query(query, function (err, results) {
//       if (err) throw err;
//       const artis = [];

//       for (var result of results) {
//         artis.push({
//           id: result.id,
//           name: result.name,
//           start_career: result.start_career,
//           photo: pathFile + result.photo,
//           about: result.about,
//         });
//       }

//       response.render('artis', {
//         title,
//         isLogin: request.session.isLogin,
//         artis,
//       });
//     });
//   });
// });
