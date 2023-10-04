var express = require("express");
var mysql = require("mysql");
var cors = require("cors");
var bodyparser = require("body-parser");
var app = express();
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

app.use(cors({ header: { "Access-Control-Allow-Origin": "*" } }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
//{origin: "http://localhost:8100"}
app.use(bodyparser.json());

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.listen("3004", () => {
  console.log("server is running....");
});

// mysql database connection
const db = mysql.createConnection({
  user: "benixags_vital14",
  host: "localhost",
  password: "fnW*,jE_%hXl",
  database: "benixags_versatilekills",
});

// check db connection
db.connect((err) => {
  if (err) throw err;
  else {
    console.log("database connected ....");
  }
});

app.get("/", (req, res) => {
  // check db connection
  res.json({ message: "OKAY" });
});

//liste de profession
app.get("/infos", (req, res) => {
  //res.send("offset is set to " + off +" "+ lim);
  db.query("SELECT * FROM profession", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//liste des profiles
app.get("/infosprofile", (req, res) => {
  //  SELECT * FROM `profile` WHERE `username` <> '' and `a_propos_de_moi` <> '';
  db.query(
    "SELECT a_propos_de_moi,adresse,cost_job,creation_date,email,id,nom,number,profession,professionId,profileImg,update_date,username,ville FROM profile WHERE username <> '' and a_propos_de_moi <> ''",
    (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//aleatoire profiles
app.get("/aleatoire_infosprofile", (req, res) => {
  //  SELECT * FROM `profile` WHERE `username` <> '' and `a_propos_de_moi` <> '';
  db.query(
    "SELECT a_propos_de_moi,adresse,cost_job,creation_date,email,id,nom,number,profession,professionId,profileImg,update_date,username,ville FROM profile WHERE username <> '' and a_propos_de_moi <> '' order by rand() limit 1",
    (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//registration
app.post("/register", (req, res) => {
  const password = req.body.password;
  const profession = req.body.profession;
  const professionId = req.body.professionId;
  const email = req.body.email;
  const ville = req.body.ville;
  db.query("SELECT * FROM profile WHERE email = ?", email, (err, result) => {
    if (result.length > 0) {
      res.json({
        regist: false,
        message: "Ce utilisateur existe déjà !",
      });
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }

        db.query(
          "INSERT INTO profile (email, profession, professionId, password, ville) VALUES (?,?,?,?,?)",
          [email, profession, professionId, hash, ville],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.json({
                regist: true,
                message: "Création réussie!",
              });
              //  res.send("Values Inserted");
            }
          }
        );
      });
    }
  });
});
//login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM profile WHERE email = ?", email, (err, result) => {
    if (err) {
      //   console.log(err);
      res.send({ err: err });
    }
    //   res.send(result);
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const id = result[0].id;
          const token = jwt.sign(
            { id },
            "jwtSecret"
            /*, {
                expiresIn: 6000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,
              }*/
          );
          req.session.user = result;

          // res.send(result);
          res.json({
            auth: true,
            token: token,
            id: result[0].id,
            email: result[0].email,
            profileImg: result[0].profileImg,
            professionId: result[0].professionId,
            nom: result[0].nom,
          });
        } else {
          // res.send({ message: "Mauvaise combinaison"})
          res.json({ auth: false, message: "Mauvaise combinaison" });
        }
      });
    } else {
      res.json({ auth: false, message: "L'utilisateur n'existe pas" });
      // res.send({ message: "L'utilisateur n'existe pas"});
    }
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("Nous avons besoin du token, donnez le nous prochainement!");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Connexion expirée" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
//vérifier le token
app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Vous etes authentifier");
});

app.put("/changepassword", async (req, res) => {
  const { oldPassword, newPassword, username, type } = req.body;

  if (type == "admin") {
    db.query(
      "SELECT * FROM sellers WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          //   console.log(err);
          res.send({ err: err });
        }
        //   res.send(result);
        if (result.length > 0) {
          bcrypt
            .compare(oldPassword, result[0].password)
            .then(async (match) => {
              if (!match) {
                res.json({ error: "Wrong Password Entered!" });
              } else {
                bcrypt.hash(newPassword, 10).then((hash) => {
                  db.query(
                    "UPDATE sellers SET password = ? WHERE username = ?",
                    [hash, username],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        // console.log('succes');
                        // res.send(result);
                        res.json("SUCCESS");
                      }
                    }
                  );
                });
              }
            });
        }
        //   else {
        //       res.json({auth: false, message: "L'utilisateur n'existe pas" });
        //       // res.send({ message: "L'utilisateur n'existe pas"});
        //   }
      }
    );
  } else if (type == "clients") {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          //   console.log(err);
          res.send({ err: err });
        }
        //   res.send(result);
        if (result.length > 0) {
          bcrypt
            .compare(oldPassword, result[0].password)
            .then(async (match) => {
              if (!match) {
                res.json({ error: "Wrong Password Entered!" });
              } else {
                bcrypt.hash(newPassword, 10).then((hash) => {
                  db.query(
                    "UPDATE users SET password = ? WHERE username = ?",
                    [hash, username],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        // console.log('succes');
                        // res.send(result);
                        res.json("SUCCESS");
                      }
                    }
                  );
                });
              }
            });
        }
        //   else {
        //       res.json({auth: false, message: "L'utilisateur n'existe pas" });
        //       // res.send({ message: "L'utilisateur n'existe pas"});
        //   }
      }
    );
  }
});
//données d'un profile
app.post("/profileInfos", (req, res) => {
  const id = req.body.userId;

  db.query("SELECT * FROM profile WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //res.send(result[0]);
      res.json({
        a_propos_de_moi: result[0].a_propos_de_moi,
        adresse: result[0].adresse,
        cost_job: result[0].cost_job,
        creation_date: result[0].creation_date,
        email: result[0].email,
        id: result[0].id,
        nom: result[0].nom,
        number: result[0].number,
        profession: result[0].profession,
        professionId: result[0].professionId,
        profileImg: result[0].profileImg,
        update_date: result[0].update_date,
        username: result[0].username,
        ville: result[0].ville,
      });
    }
  });
});
//services offert par un profile
app.post("/profileServices", (req, res) => {
  const id = req.body.userId;

  db.query("SELECT * FROM services WHERE id_profile = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//profile similaires
app.post("/profileSimilar", (req, res) => {
  const professionId = req.body.professionId;
  db.query(
    "SELECT id, email, username, profileImg, ville, professionId FROM profile WHERE professionId = ? and username <> '' and a_propos_de_moi <> ''",
    professionId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/majimgprofil/:id", async (req, res) => {
  const id = req.params.id;
  // const stat = req.params.stat;
  // 'avatar' is the name of our file input field in the HTML form
  let upload = multer({ storage: storage }).single("avatar");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields

    if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    let classifiedsadd = { profileImg: req.file.filename };

    //	const sql = "UPDATE products SET picture2 = ? WHERE id = 47";
    const sql = "UPDATE profile SET ? WHERE id = ?";
    db.query(sql, [classifiedsadd, id], (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: 1 });
        //  res.send("suc");
      }
      //	res.json({ success: 1 }) ;
      //   res.send(id+"");
    });
  });

  //res.send(id+"");
});
app.put("/addimgprofil/:id", async (req, res) => {
  const id = req.params.id;
  // const stat = req.params.stat;
  // 'avatar' is the name of our file input field in the HTML form
  let upload = multer({ storage: storage }).single("avatar");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields

    if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    let classifiedsadd = { profileImg: "uploads/" + req.file.filename };

    //	const sql = "UPDATE products SET picture2 = ? WHERE id = 47";
    const sql = "INSERT INTO galerie (id_profile, image) VALUES (?,?)";
    db.query(sql, [id, "uploads/" + req.file.filename], (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: 1 });
        //  res.send("suc");
      }
      //	res.json({ success: 1 }) ;
      //   res.send(id+"");
    });
  });

  //res.send(id+"");
});

// suppression img galerie profile
app.post("/deleteimg_galerie", (req, res) => {
  const id = req.body.id;
  const nameimg = req.body.nameimg;
  db.query("DELETE FROM galerie WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //supprimer img
      fs.unlink(nameimg, (err) => {
        if (err) {
          console.error(err);
          return;
        } else {
          res.send("succes");
        }

        //file removed
      });
    }
  });
  //res.send(" "+id+"fgf");
});
//recupe all image from userprofile
app.post("/getprofileimage", (req, res) => {
  const id = req.body.id;

  db.query("SELECT * FROM galerie WHERE id_profile = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//maj a propos
app.put("/aboutUpdate/:id/:about", async (req, res) => {
  const id = req.params.id;
  const a_propos_de_moi = req.params.about;

  db.query(
    "UPDATE profile SET a_propos_de_moi = ? WHERE id = ?",
    [a_propos_de_moi, id],
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        //res.json({ success: 1 });
        db.query("SELECT * FROM profile WHERE id = ?", id, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            //res.send(result[0]);
            res.json({
              a_propos_de_moi: result[0].a_propos_de_moi,
              adresse: result[0].adresse,
              cost_job: result[0].cost_job,
              creation_date: result[0].creation_date,
              email: result[0].email,
              id: result[0].id,
              nom: result[0].nom,
              number: result[0].number,
              profession: result[0].profession,
              professionId: result[0].professionId,
              profileImg: result[0].profileImg,
              update_date: result[0].update_date,
              username: result[0].username,
              ville: result[0].ville,
              success: 1,
            });
          }
        });
      }
    }
  );
});
//maj profile
app.put(
  "/profileUpdate/:id/:nom/:profession/:ProfessionId/:numero/:adresse",
  async (req, res) => {
    const id = req.params.id;
    const nom = req.params.nom;
    const profession = req.params.profession;
    const professionId = req.params.ProfessionId;
    const number = req.params.numero;
    const adresse = req.params.adresse;

    db.query(
      "UPDATE profile SET nom = ?, profession = ?, professionId = ?, number = ?, adresse = ? WHERE id = ?",
      [nom, profession, professionId, number, adresse, id],
      (err, results) => {
        if (err) {
          res.send(err);
        } else {
          //res.json({ success: 1 });
          db.query("SELECT * FROM profile WHERE id = ?", id, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              //res.send(result[0]);
              res.json({
                a_propos_de_moi: result[0].a_propos_de_moi,
                adresse: result[0].adresse,
                cost_job: result[0].cost_job,
                creation_date: result[0].creation_date,
                email: result[0].email,
                id: result[0].id,
                nom: result[0].nom,
                number: result[0].number,
                profession: result[0].profession,
                professionId: result[0].professionId,
                profileImg: result[0].profileImg,
                update_date: result[0].update_date,
                username: result[0].username,
                ville: result[0].ville,
                success: 1,
              });
            }
          });
        }
      }
    );
  }
);
//ajout service
app.post("/addService", (req, res) => {
  const id_profile = req.body.idprofile;
  const nom = req.body.nom;
  const description = req.body.descriptio;

  db.query(
    "INSERT INTO services (nom, description, id_profile) VALUES (?,?,?)",
    [nom, description, id_profile],
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        //res.json({ success: 1 });
        db.query(
          "SELECT * FROM services WHERE id_profile = ?",
          id_profile,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});
//editer service
app.put("/editService/:id/:nom/:descriptio/:idprofile", async (req, res) => {
  const id = req.params.id;
  const nom = req.params.nom;
  const description = req.params.descriptio;
  const id_profile = req.params.idprofile;

  db.query(
    "UPDATE services SET nom = ?, description = ? WHERE id = ?",
    [nom, description, id],
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        //res.json({ success: 1 });
        db.query(
          "SELECT * FROM services WHERE id_profile = ?",
          id_profile,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});
//suppression service
app.post("/deleteService", (req, res) => {
  const id = req.body.id;
  const id_profile = req.body.userId;

  db.query("DELETE FROM services WHERE id = ?", id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      //res.json({ success: 1 });
      db.query(
        "SELECT * FROM services WHERE id_profile = ?",
        id_profile,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  });
});
/***************************************************************  LVC test ******************************************************************************************************** */
//registration lvc admin
app.post("/registerLvcAdmin", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  db.query(
    "SELECT * FROM lvc_admin WHERE username = ?",
    username,
    (err, result) => {
      if (result.length > 0) {
        res.json({
          regist: false,
          message: "Ce utilisateur existe déjà !",
        });
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }

          db.query(
            "INSERT INTO lvc_admin (username, password) VALUES (?,?)",
            [username, hash],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.json({
                  regist: true,
                  message: "Création réussie!",
                });
                //  res.send("Values Inserted");
              }
            }
          );
        });
      }
    }
  );
});
//login lvc admin
app.post("/loginLvcAdmin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM lvc_admin WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        //   console.log(err);
        res.send({ err: err });
      }
      //   res.send(result);
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign(
              { id },
              "jwtSecret"
              /*, {
                expiresIn: 6000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,
              }*/
            );
            req.session.user = result;

            // res.send(result);
            res.json({
              auth: true,
              token: token,
              id: result[0].id,
              username: result[0].username,
            });
          } else {
            // res.send({ message: "Mauvaise combinaison"})
            res.json({ auth: false, message: "Mauvaise combinaison" });
          }
        });
      } else {
        res.json({ auth: false, message: "L'utilisateur n'existe pas" });
        // res.send({ message: "L'utilisateur n'existe pas"});
      }
    }
  );
});

const verifyJWTLVC = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("Nous avons besoin du token, donnez le nous prochainement!");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Connexion expirée" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
//vérifier le token
app.get("/isUserAuthLVC", verifyJWTLVC, (req, res) => {
  res.send("Vous etes authentifier");
});

//registration lvc client
app.post("/registerLvcClient", (req, res) => {
  const nom = req.body.nom;
  const numero = req.body.numero;
  const privilege = req.body.privilege;
  const type_membre = req.body.type_membre;
  const domain_activity = req.body.domain_activity;

  db.query(
    "SELECT * FROM lvc_client WHERE numero = ?",
    numero,
    (err, result) => {
      if (result.length > 0) {
        res.json({
          regist: false,
          message: "Ce utilisateur existe déjà !",
        });
      } else {
        db.query(
          "INSERT INTO lvc_client (nom, numero, privilege, type_membre, domain_activity) VALUES (?,?,?,?,?)",
          [nom, numero, privilege, type_membre, domain_activity],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.json({
                regist: true,
                message: "Création réussie!",
              });
              //  res.send("Values Inserted");
            }
          }
        );
      }
    }
  );
});
//login lvc admin
app.post("/loginLvcClient", (req, res) => {
  const numero = req.body.numero;

  db.query(
    "SELECT * FROM lvc_client WHERE numero = ?",
    numero,
    (err, result) => {
      if (err) {
        //   console.log(err);
        res.send({ err: err });
      }
      //   res.send(result);
      if (result.length > 0) {
        const id = result[0].id;
        const token = jwt.sign(
          { id },
          "jwtSecret"
          /*, {
                expiresIn: 6000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,
              }*/
        );
        req.session.user = result;

        // res.send(result);
        res.json({
          auth: true,
          token: token,
          userInfos: result[0],
        });
      } else {
        res.json({ auth: false, message: "L'utilisateur n'existe pas" });
        // res.send({ message: "L'utilisateur n'existe pas"});
      }
    }
  );
});
//vérifier si lvc client existe
app.post("/existLvcClient", (req, res) => {
  const numero = req.body.numero;

  db.query(
    "SELECT * FROM lvc_client WHERE numero = ?",
    numero,
    (err, result) => {
      if (err) {
        //   console.log(err);
        res.send({ err: err });
      }
      //   res.send(result);
      if (result.length > 0) {
        res.send("L'utilisateur existe");
      } else {
        res.send("L'utilisateur n'existe pas");
      }
    }
  );
});
//récupérer la liste des clients
app.post("/recupAllLvcClient", (req, res) => {
  db.query("SELECT * FROM lvc_client", (err, result) => {
    if (err) {
      console.log(err);
      // res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});
