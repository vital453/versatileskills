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
const storagelvc = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./lvcpic");
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
  user: "verswllw_vital",
  host: "localhost",
  password: ".(*xg;MVNu^^",
  database: "verswllw_skills",
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
//récupérer la liste des profession soumises
app.get("/get_temp_profession", (req, res) => {
  db.query("SELECT * FROM temp_profession", (err, result) => {
    if (err) {
      console.log(err);
      // res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

//ajouter une nouvelle profession
app.post("/addtempprofe", (req, res) => {
  const nom = req.body.nom;
  const description = req.body.description;

  db.query(
    "INSERT INTO temp_profession (nom, description) VALUES (?,?)",
    [nom, description],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Création réussie !");
        //  res.send("Values Inserted");
      }
    }
  );
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
              profil_img: result[0].profil_img,
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
  const prenom = req.body.prenom;
  const numero = req.body.numero;
  const whatsapp = req.body.whatsapp;
  const privilege = req.body.privilege;
  const email = req.body.email;
  const localisation = req.body.localisation;
  const lieu_activite = req.body.lieu_activite;
  const annee_experience = req.body.annee_experience;
  const domain_activity = req.body.domain_activity;
  const age = req.body.age;
  const niveau_etude = req.body.niveau_etude;
  const specialite = req.body.specialite;
  const civilite = req.body.civilite;
  const pays = req.body.pays;

  // const type_membre = req.body.type_membre;

  db.query(
    "SELECT * FROM lvc_client WHERE numero = ?",
    numero,
    (err, result) => {
      if (result.length > 0) {
        res.send("Ce utilisateur existe déjà !");
      } else {
        db.query(
          "INSERT INTO lvc_client (nom, prenom, numero, whatsapp, privilege, email, localisation, lieu_activite, pays, annee_experience, domain_activity, age, niveau_etude, specialite, civilite) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            nom,
            prenom,
            numero,
            whatsapp,
            privilege,
            email,
            localisation,
            lieu_activite,
            pays,
            annee_experience,
            domain_activity,
            age,
            niveau_etude,
            specialite,
            civilite,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Création réussie !");
              //  res.send("Values Inserted");
            }
          }
        );
      }
    }
  );
});
//registration lvc entreprise
app.post("/registerLvcEntreprise", (req, res) => {
  const raison_sociale = req.body.raison_sociale;
  const domaine_activite_entrp = req.body.domaine_activite_entrp;
  const adresse = req.body.adresse;
  const postal = req.body.postal;
  const num_representant = req.body.num_representant;
  const email_entrp = req.body.email_entrp;
  const nom_resp_hierarchique = req.body.nom_resp_hierarchique;
  const fonction_resp_hierarchique = req.body.fonction_resp_hierarchique;
  const email_resp_hierarchique = req.body.email_resp_hierarchique;
  const ville = req.body.ville;
  const pays = req.body.pays;

  // const type_membre = req.body.type_membre;

  db.query(
    "SELECT * FROM lvc_entreprise WHERE email_entrp = ?",
    email_entrp,
    (err, result) => {
      if (result.length > 0) {
        res.send("Ce utilisateur existe déjà !");
      } else {
        db.query(
          "INSERT INTO lvc_entreprise (raison_sociale, domaine_activite_entrp, adresse, postal, num_representant, email_entrp, nom_resp_hierarchique, fonction_resp_hierarchique, email_resp_hierarchique, ville, pays) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
          [
            raison_sociale,
            domaine_activite_entrp,
            adresse,
            postal,
            num_representant,
            email_entrp,
            nom_resp_hierarchique,
            fonction_resp_hierarchique,
            email_resp_hierarchique,
            ville,
            pays,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Création réussie !");
              //  res.send("Values Inserted");
            }
          }
        );
      }
    }
  );
});
//login lvc client
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
          type_membre: "particulier",
        });
      } else {
        // res.json({ auth: false, message: "L'utilisateur n'existe pas" });
        // res.send({ message: "L'utilisateur n'existe pas"});
        db.query(
          "SELECT * FROM lvc_entreprise WHERE num_representant = ?",
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
                type_membre: "entreprise",
              });
            } else {
              res.json({ auth: false, message: "pas trouver" });
              // res.send({ message: "L'utilisateur n'existe pas"});
            }
          }
        );
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
        res.send("trouver");
      } else {
        // res.send("L'utilisateur n'existe pas");
        db.query(
          "SELECT * FROM lvc_entreprise  WHERE num_representant = ?",
          numero,
          (err, result) => {
            if (err) {
              //   console.log(err);
              res.send({ err: err });
            }
            //   res.send(result);
            if (result.length > 0) {
              res.send("trouver");
            } else {
              res.send("pas trouver");
            }
          }
        );
      }
    }
  );
});

//récupérer la liste des clients
app.get("/recupAllLvcClient", (req, res) => {
  db.query("SELECT * FROM lvc_client", (err, result) => {
    if (err) {
      console.log(err);
      // res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});
//récupérer la liste des entreprise
app.get("/recupAllLvcEntreprise", (req, res) => {
  db.query("SELECT * FROM lvc_entreprise", (err, result) => {
    if (err) {
      console.log(err);
      // res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});
//update lvc client(membre)
app.post("/updateLvcMembre", (req, res) => {
  const id = req.body.id_membre;
  const nom = req.body.nom_modif;
  const prenom = req.body.prenom_modif;
  const numero = req.body.numero_modif;
  const whatsapp = req.body.whatsapp_modif;
  const privilege = req.body.privilege_modif;
  const email = req.body.email_modif;
  const localisation = req.body.localisation_modif;
  const lieu_activite = req.body.lieu_activite_modif;
  const annee_experience = req.body.annee_experience_modif;
  const domain_activity = req.body.domainActivity_modif;
  const age = req.body.age_modif;
  const niveau_etude = req.body.niveau_etude_modif;
  const specialite = req.body.specialite_modif;
  const civilite = req.body.civilite_modif;
  const pays = req.body.pays_client_modif;

  db.query(
    "UPDATE lvc_client SET nom = ?, prenom = ?, numero = ?, whatsapp = ?, privilege = ?, email = ?, localisation = ?, lieu_activite = ?, pays = ?, annee_experience = ?, domain_activity = ?, age = ?, niveau_etude = ?, specialite = ?, civilite = ? WHERE id = ?",
    [
      nom,
      prenom,
      numero,
      whatsapp,
      privilege,
      email,
      localisation,
      lieu_activite,
      pays,
      annee_experience,
      domain_activity,
      age,
      niveau_etude,
      specialite,
      civilite,
      id,
    ],
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Mis à jour réussie !");
        // res.json({ success: 1 });
      }
    }
  );
});
//update lvc entreprise
app.post("/updateLvcEntreprise", (req, res) => {
  const id = req.body.id_entreprise;
  const raison_sociale = req.body.raison_sociale_modif;
  const domaine_activite_entrp = req.body.domaine_activite_entrp_modif;
  const adresse = req.body.adresse_modif;
  const postal = req.body.postal_modif;
  const num_representant = req.body.num_representant_modif;
  const email_entrp = req.body.email_entrp_modif;
  const nom_resp_hierarchique = req.body.nom_resp_hierarchique_modif;
  const fonction_resp_hierarchique = req.body.fonction_resp_hierarchique_modif;
  const email_resp_hierarchique = req.body.email_resp_hierarchique_modif;
  const ville = req.body.ville_modif;
  const pays = req.body.pays_modif;

  db.query(
    "UPDATE lvc_entreprise SET raison_sociale = ?, domaine_activite_entrp = ?, adresse = ?, postal = ?, num_representant = ?, email_entrp = ?, nom_resp_hierarchique = ?, fonction_resp_hierarchique = ?, email_resp_hierarchique = ?, ville = ?, pays = ? WHERE id = ?",
    [
      raison_sociale,
      domaine_activite_entrp,
      adresse,
      postal,
      num_representant,
      email_entrp,
      nom_resp_hierarchique,
      fonction_resp_hierarchique,
      email_resp_hierarchique,
      ville,
      pays,
      id,
    ],
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Mis à jour réussie !");
        // res.json({ success: 1 });
      }
    }
  );
});
//suppression lvc client(membre)
app.post("/deleteLvcClient", (req, res) => {
  const id = req.body.id;

  db.query("DELETE FROM lvc_client WHERE id = ?", id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ success: 1 });
    }
  });
});
//suppression lvc entreprise
app.post("/deleteLvcEntreprise", (req, res) => {
  const id = req.body.id;

  db.query("DELETE FROM lvc_entreprise WHERE id = ?", id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ success: 1 });
    }
  });
});
/*ajout de publication admin*/
app.post("/ajout_pub_admin", (req, res) => {
  const id_admin = req.body.id_admin;
  const titre = req.body.titre;
  const message = req.body.message;

  db.query(
    "INSERT INTO lvc_publication_admin (id_admin, titre, message) VALUES (?,?,?)",
    [id_admin, titre, message],
    (err, result) => {
      if (err) {
        // console.log(err);
        res.send("Erreur d'ajout");
      } else {
        // res.send(result);
        db.query(
          "SELECT id FROM lvc_publication_admin WHERE message = ?",
          [message],
          (err, result) => {
            if (err) {
              // console.log(err);
              res.send("Erreur d'obtention id publication");
            } else {
              res.send(result[0]);
            }
          }
        );
      }
    }
  );
});
/* envoi d'image de publication admin */
app.put("/ajout_pub_admin_image/:id", async (req, res) => {
  const id = req.params.id;
  let upload = multer({ storage: storagelvc }).single("avatar");

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
    let classifiedsadd = {
      image:
        "https://backend-versatilekills.benindigital.com/lvcpic/" +
        req.file.filename,
    };

    db.query(
      "UPDATE lvc_publication_admin SET ? WHERE id = ?",
      [classifiedsadd, id],
      (err, result) => {
        if (err) {
          // console.log(err);
          fs.unlink("lvcpic/" + req.file.filename, (err) => {
            if (err) {
              console.error(err);
              return;
            }

            //file removed
          });
          res.send("Erreur d'envoi image");
        } else {
          res.send("Pic inserted");
        }
      }
    );
  });
});
//récupérer la liste des publications admin
app.get("/recup_pubs_admin", (req, res) => {
  db.query("SELECT * FROM lvc_publication_admin", (err, result) => {
    if (err) {
      console.log(err);
      // res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});
//récupérer la liste des admin
app.get("/recup_liste_admin", (req, res) => {
  db.query("SELECT id, username, profil_img FROM lvc_admin", (err, result) => {
    if (err) {
      console.log(err);
      // res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});
/*modification d'une publication admin*/
app.post("/modif_pub_admin", (req, res) => {
  const id = req.body.id_publication;
  const titre = req.body.titre;
  const message = req.body.message;

  db.query(
    "UPDATE lvc_publication_admin SET titre = ?, message = ? WHERE id = ?",
    [titre, message, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Maj succès");
      }
    }
  );
});
/* mise à jour d'image de publication admin et suppression de l'ancienne image de la base de données */
app.put("/modif_pub_admin_image/:id", async (req, res) => {
  const id = req.params.id;
  let upload = multer({ storage: storagelvc }).single("avatar");

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
    let classifiedsadd = {
      image:
        "https://backend-versatilekills.benindigital.com/lvcpic/" +
        req.file.filename,
    };

    db.query(
      "UPDATE lvc_publication_admin SET ? WHERE id = ?",
      [classifiedsadd, id],
      (err, result) => {
        if (err) {
          // console.log(err);
          fs.unlink("lvcpic/" + req.file.filename, (err) => {
            if (err) {
              console.error(err);
              return;
            }

            //file removed
          });
          res.send("Erreur d'envoi image");
        } else {
          res.send("Image mise à jour succès");
        }
      }
    );
  });
});
/* suppression de l'image précédente de la publication après la mise à jour de celle-ci */
app.post("/delete_img_after_maj", (req, res) => {
  const last_img = req.body.last_img;

  fs.unlink(last_img.slice(48), (err) => {
    if (err) {
      console.error(err);
      return;
    }

    //file removed
  });
});
//suppression d'une publication admin
app.post("/delete_pub_admin", (req, res) => {
  const id = req.body.id;

  db.query(
    "DELETE FROM lvc_publication_admin WHERE id = ?",
    id,
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: 1 });
      }
    }
  );
});
//choix de la publication admin à afficher
app.post("/activer_publication", (req, res) => {
  const id = req.body.id;
  let affiche = 1;

  db.query(
    "UPDATE lvc_publication_admin SET affiche = ? WHERE id = ?",
    [affiche, id],
    (err, results) => {
      if (err) {
        // res.send(err);
        res.send("Erreur");
      } else {
        res.json({ success: 1 });
      }
    }
  );
});
//ne plus afficher la publication
app.post("/desactiver_publication", (req, res) => {
  const id = req.body.id;
  let affiche = 0;

  db.query(
    "UPDATE lvc_publication_admin SET affiche = ? WHERE id = ?",
    [affiche, id],
    (err, results) => {
      if (err) {
        // res.send(err);
        res.send("Erreur");
      } else {
        res.json({ success: 1 });
      }
    }
  );
});
//récupérer la liste des publications des membres
app.get("/recup_liste_publication_membre", (req, res) => {
  db.query(
    "SELECT * FROM lvc_publication_membre ORDER BY id DESC",
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});
//mettre à jour le statut d'une publication membre
app.post("/maj_publication_statut", (req, res) => {
  const id = req.body.id;
  const statut = req.body.statut;

  db.query(
    "UPDATE lvc_publication_membre SET statut = ? WHERE id = ?",
    [statut, id],
    (err, results) => {
      if (err) {
        // res.send(err);
        res.send("Erreur lors de la maj");
      } else {
        res.json({ success: 1 });
      }
    }
  );
});
//récupérer la liste de modification de profil particulier soumis
app.get("/liste_modification_particulier", (req, res) => {
  db.query("SELECT * FROM lvc_modification_client", (err, result) => {
    if (err) {
      console.log(err);
      // res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});
//récupérer la liste de modification de profil entreprise soumis
app.get("/liste_modification_entreprise", (req, res) => {
  db.query("SELECT * FROM lvc_modification_entreprise", (err, result) => {
    if (err) {
      console.log(err);
      // res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});
//récupérer la liste des derniers profils
app.get("/recentsprofils", (req, res) => {
  db.query(
    "SELECT * FROM lvc_client ORDER BY id DESC LIMIT 10",
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//récupérer la liste des dernier profil entreprise
app.get("/recentsprofils_enterprise", (req, res) => {
  db.query(
    "SELECT * FROM lvc_entreprise ORDER BY id DESC LIMIT 10",
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});
//changement de statut d'un profil particulier soumis et mise à jour si statut = accepte du profil de ce particulier
app.post("/maj_profil_soumis_particulier", (req, res) => {
  const id = req.body.id;
  const id_particulier = req.body.id_particulier;
  const statut = req.body.statut;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const numero = req.body.numero;
  const whatsapp = req.body.whatsapp;
  const privilege = req.body.privilege;
  const email = req.body.email;
  const localisation = req.body.localisation;
  const lieu_activite = req.body.lieu_activite;
  const annee_experience = req.body.annee_experience;
  const domain_activity = req.body.domain_activity;
  const age = req.body.age;
  const niveau_etude = req.body.niveau_etude;
  const specialite = req.body.specialite;
  const civilite = req.body.civilite;
  const pays = req.body.pays;
  const profil_img = req.body.profil_img;

  if (statut == "accepte") {
    db.query(
      "UPDATE lvc_client SET nom = ?, prenom = ?, numero = ?, whatsapp = ?, privilege = ?, email = ?, localisation = ?, lieu_activite = ?, pays = ?, annee_experience = ?, domain_activity = ?, age = ?, niveau_etude = ?, specialite = ?, civilite = ?, profil_img = ? WHERE id = ?",
      [
        nom,
        prenom,
        numero,
        whatsapp,
        privilege,
        email,
        localisation,
        lieu_activite,
        pays,
        annee_experience,
        domain_activity,
        age,
        niveau_etude,
        specialite,
        civilite,
        profil_img,
        id_particulier,
      ],
      (err, results) => {
        if (err) {
          // res.send(err);
          res.send("Erreur lors de la maj du profil");
        } else {
          db.query(
            "UPDATE lvc_modification_client SET statut = ? WHERE id = ?",
            [statut, id],
            (err, results) => {
              if (err) {
                // res.send(err);
                res.send("Erreur lors de la maj");
              } else {
                res.json({ success: 1 });
              }
            }
          );
        }
      }
    );
  } else if (statut == "rejete") {
    db.query(
      "UPDATE lvc_modification_client SET statut = ? WHERE id = ?",
      [statut, id],
      (err, results) => {
        if (err) {
          // res.send(err);
          res.send("Erreur lors de la maj");
        } else {
          res.json({ success: 1 });
        }
      }
    );
  }
});
//changement de statut d'un profil entreprise soumis et mise à jour si statut=accepte du profil de cette entreprise
app.post("/maj_profil_soumis_entreprise", (req, res) => {
  const id = req.body.id;
  const id_entreprise = req.body.id_entreprise;
  const statut = req.body.statut;
  const raison_sociale = req.body.raison_sociale;
  const domaine_activite_entrp = req.body.domaine_activite_entrp;
  const adresse = req.body.adresse;
  const postal = req.body.postal;
  const num_representant = req.body.num_representant;
  const email_entrp = req.body.email_entrp;
  const nom_resp_hierarchique = req.body.nom_resp_hierarchique;
  const fonction_resp_hierarchique = req.body.fonction_resp_hierarchique;
  const email_resp_hierarchique = req.body.email_resp_hierarchique;
  const ville = req.body.ville;
  const pays = req.body.pays;
  const profil_img = req.body.profil_img;

  if (statut == "accepte") {
    db.query(
      "UPDATE lvc_entreprise SET raison_sociale = ?, domaine_activite_entrp = ?, adresse = ?, postal = ?, num_representant = ?, email_entrp = ?, nom_resp_hierarchique = ?, fonction_resp_hierarchique = ?, email_resp_hierarchique = ?, ville = ?, pays = ?, profil_img = ? WHERE id = ?",
      [
        raison_sociale,
        domaine_activite_entrp,
        adresse,
        postal,
        num_representant,
        email_entrp,
        nom_resp_hierarchique,
        fonction_resp_hierarchique,
        email_resp_hierarchique,
        ville,
        pays,
        profil_img,
        id_entreprise,
      ],
      (err, results) => {
        if (err) {
          // res.send(err);
          res.send("Erreur lors de la maj du profil");
        } else {
          db.query(
            "UPDATE lvc_modification_entreprise SET statut = ? WHERE id = ?",
            [statut, id],
            (err, results) => {
              if (err) {
                // res.send(err);
                res.send("Erreur lors de la maj");
              } else {
                res.json({ success: 1 });
              }
            }
          );
        }
      }
    );
  } else if (statut == "rejete") {
    db.query(
      "UPDATE lvc_modification_entreprise SET statut = ? WHERE id = ?",
      [statut, id],
      (err, results) => {
        if (err) {
          // res.send(err);
          res.send("Erreur lors de la maj");
        } else {
          res.json({ success: 1 });
        }
      }
    );
  }
});

/*soumissions utilisateur client pour la modification de son profils*/
app.post("/modif_soumissions_client", (req, res) => {
  const id = req.body.id;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const numero = req.body.numero;
  const whatsapp = req.body.whatsapp;
  const profil_img = req.body.profil_img;
  const privilege = req.body.privilege;
  const email = req.body.email;
  const localisation = req.body.localisation;
  const lieu_activite = req.body.lieu_activite;
  const pays = req.body.pays;
  const annee_experience = req.body.annee_experience;
  const domain_activity = req.body.domain_activity;
  const age = req.body.age;
  const niveau_etude = req.body.niveau_etude;
  const specialite = req.body.specialite;
  const civilite = req.body.civilite;
  const status = "soumis";

  db.query(
    "SELECT * FROM lvc_modification_client WHERE id_client = ? and statut = ?",
    [id, status],
    (err, result) => {
      if (result.length > 0) {
        res.send("octopus");
      } else {
        db.query(
          "INSERT INTO lvc_modification_client (id_client , nom , prenom , numero , whatsapp , profil_img , privilege , email , localisation , lieu_activite , pays , annee_experience , domainActivity , age , niveau_etude , specialite , civilite) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            id,
            nom,
            prenom,
            numero,
            whatsapp,
            profil_img,
            privilege,
            email,
            localisation,
            lieu_activite,
            pays,
            annee_experience,
            domain_activity,
            age,
            niveau_etude,
            specialite,
            civilite,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              //res.send("suc");
              db.query(
                "SELECT  MAX(id) AS id FROM lvc_modification_client ",
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send(String(result[0].id));
                    // res.json({ id: result, message: "modif soumis avec succès" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});
/* add image to data soumis by client */

app.put("/addimgsoumis_client/:id", async (req, res) => {
  const id = req.params.id;
  let upload = multer({ storage: storagelvc }).single("avatar");

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
    let classifiedsadd = {
      profil_img: "lvcpic/" + req.file.filename,
    };

    db.query(
      "UPDATE lvc_modification_client SET ? WHERE id = ?",
      [classifiedsadd, id],
      (err, result) => {
        if (err) {
          // console.log(err);
          fs.unlink("lvcpic/" + req.file.filename, (err) => {
            if (err) {
              console.error(err);
              return;
            }

            //file removed
          });
          res.send("Erreur d'envoi image");
        } else {
          res.send("modif soumis avec succès");
        }
      }
    );
  });
});

/*soumissions utilisateur client entreprise pour la modification de son profils*/
app.post("/modif_soumissions_entreprise", (req, res) => {
  const id = req.body.id;
  const raison_sociale = req.body.raison_sociale;
  const domaine_activite_entrp = req.body.domaine_activite_entrp;
  const adresse = req.body.adresse;
  const postal = req.body.postal;
  const profil_img = req.body.profil_img;
  const num_representant = req.body.num_representant;
  const email_entrp = req.body.email_entrp;
  const nom_resp_hierarchique = req.body.nom_resp_hierarchique;
  const fonction_resp_hierarchique = req.body.fonction_resp_hierarchique;
  const email_resp_hierarchique = req.body.email_resp_hierarchique;
  const ville = req.body.ville;
  const pays = req.body.pays;
  const status = "soumis";

  db.query(
    "SELECT * FROM lvc_modification_entreprise WHERE id_entreprise = ? and statut = ?",
    [id, status],
    (err, result) => {
      if (result.length > 0) {
        res.send("octopus");
      } else {
        db.query(
          "INSERT INTO lvc_modification_entreprise (id_entreprise, raison_sociale , domaine_activite_entrp , adresse , postal , profil_img , num_representant , email_entrp , nom_resp_hierarchique , fonction_resp_hierarchique , email_resp_hierarchique , ville , pays) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            id,
            raison_sociale,
            domaine_activite_entrp,
            adresse,
            postal,
            profil_img,
            num_representant,
            email_entrp,
            nom_resp_hierarchique,
            fonction_resp_hierarchique,
            email_resp_hierarchique,
            ville,
            pays,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              //res.send("suc");
              db.query(
                "SELECT  MAX(id) AS id FROM lvc_modification_entreprise ",
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    // res.send(result);
                    res.send(String(result[0].id));

                    // res.json({ id: result, message: "modif soumis avec succès" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});
/* add image to data soumis by client entreprise */

app.put("/addimgsoumis_entreprise/:id", async (req, res) => {
  const id = req.params.id;
  let upload = multer({ storage: storagelvc }).single("avatar");

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
    let classifiedsadd = {
      profil_img: "lvcpic/" + req.file.filename,
    };

    db.query(
      "UPDATE lvc_modification_entreprise SET ? WHERE id = ?",
      [classifiedsadd, id],
      (err, result) => {
        if (err) {
          // console.log(err);
          fs.unlink("lvcpic/" + req.file.filename, (err) => {
            if (err) {
              console.error(err);
              return;
            }

            //file removed
          });
          res.send("Erreur d'envoi image");
        } else {
          res.send("modif soumis avec succès");
        }
      }
    );
  });
});

//récupérer la liste des soumissions d'un client
app.post("/recup_soumission_client", (req, res) => {
  const id = req.body.id;
  const statut = "accepte";

  db.query(
    "SELECT * FROM lvc_modification_client WHERE id_client = ? and statut = ?",
    [id, statut],
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//récupérer la liste des soumissions d'un client entreprise
app.post("/recup_soumission_client_entreprise", (req, res) => {
  const id = req.body.id;
  const statut = "accepte";

  db.query(
    "SELECT * FROM lvc_modification_entreprise WHERE id_entreprise = ? and statut = ?",
    [id, statut],
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});
//récupérer la liste des soumissions de client
app.get("/recup_all_soumission_client", (req, res) => {
  const statut = "accepte";

  db.query(
    "SELECT * FROM lvc_modification_client WHERE statut = ? ORDER BY id DESC",
    statut,
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});
//récupérer la liste des soumissions des entreprise
app.get("/recup_all_soumission_client_entreprise", (req, res) => {
  const statut = "accepte";

  db.query(
    "SELECT * FROM lvc_modification_entreprise WHERE statut = ? ORDER BY id DESC",
    statut,
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//récupérer la liste des publication d'un client
app.post("/recup_pub_membre", (req, res) => {
  const id = req.body.id;
  const type_membre = req.body.type_membre;
  const statut = "accepte";

  db.query(
    "SELECT * FROM lvc_publication_membre WHERE id_membre = ? and type_membre = ? and statut = ? ORDER BY id DESC",
    [id, type_membre, statut],
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});
//récupérer la liste des soumissions d'un client entreprise
app.get("/recup_all_pub_membre", (req, res) => {
  const statut = "accepte";

  db.query(
    "SELECT * FROM lvc_publication_membre WHERE statut = ? ORDER BY id DESC",
    statut,
    (err, result) => {
      if (err) {
        console.log(err);
        // res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//add publication membre
app.post("/add_publication_membre", (req, res) => {
  const id = req.body.id;
  const type_membre = req.body.type_membre;
  const message = req.body.message;
  const status = "soumis";

  db.query(
    "SELECT * FROM lvc_publication_membre WHERE id_membre = ? and statut = ?",
    [id, status],
    (err, result) => {
      if (result.length > 0) {
        res.send("octopus");
      } else {
        db.query(
          "INSERT INTO lvc_publication_membre (type_membre , message, id_membre) VALUES (?,?,?)",
          [type_membre, message, id],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              //res.send("suc");
              db.query(
                "SELECT  MAX(id) AS id FROM lvc_publication_membre ",
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send(String(result[0].id));

                    // res.json({ id: result, message: "modif soumis avec succès" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});
/* add image to data soumis by client */

app.put("/addimgpublication_membre/:id/:sync", async (req, res) => {
  const id = req.params.id;
  const sync = req.params.sync;
  let upload = multer({ storage: storagelvc }).single("avatar");

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
    let classifiedsadd = {
      image: "lvcpic/" + req.file.filename,
    };
    if (sync == 1) {
      classifiedsadd = {
        image: "lvcpic/" + req.file.filename,
      };
    }
    if (sync == 2) {
      classifiedsadd = {
        video: "lvcpic/" + req.file.filename,
      };
    }
    db.query(
      "UPDATE lvc_publication_membre SET ? WHERE id = ?",
      [classifiedsadd, id],
      (err, result) => {
        if (err) {
          // console.log(err);
          fs.unlink("lvcpic/" + req.file.filename, (err) => {
            if (err) {
              console.error(err);
              return;
            }

            //file removed
          });
          res.send("Erreur d'envoi image");
        } else {
          res.send("publication soumis avec succès");
        }
      }
    );
  });
});

//add commentaire for a member
app.post("/add_comment", (req, res) => {
  const id_membre1 = req.body.id_membre1;
  const id_membre2 = req.body.id_membre2;
  const type_membre2 = req.body.type_membre2;
  const type_membre1 = req.body.type_membre1;
  const commentaire = req.body.commentaire;
  const profil_img1 = req.body.profil_img1;
  const nom_membre1 = req.body.nom_membre1;
  const email_membre1 = req.body.email_membre1;

  db.query(
    "INSERT INTO commentaire (type_membre1, type_membre2 , commentaire , id_membre1 , id_membre2, profil_img1, nom_membre1, email_membre1) VALUES (?,?,?,?,?,?,?,?)",
    [
      type_membre1,
      type_membre2,
      commentaire,
      id_membre1,
      id_membre2,
      profil_img1,
      nom_membre1,
      email_membre1,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("succès");
      }
    }
  );
});

//update commentaire for a member
app.post("/update_comment", (req, res) => {
  const id = req.body.id;
  const id_membre2 = req.body.id_membre2;
  const commentaire = req.body.commentaire;

  db.query(
    "UPDATE commentaire SET commentaire = ? WHERE id = ? and id_membre2 = ?",
    [commentaire, id, id_membre2],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("succès");
      }
    }
  );
});

//delete commentaire for a member
app.post("/delete_comment", (req, res) => {
  const id = req.body.id;
  const id_membre2 = req.body.id_membre2;

  db.query(
    "DELETE FROM commentaire WHERE id = ? and id_membre2 = ?",
    [id, id_membre2],
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        // res.json({ success: 1 });
        res.send("succès");
      }
    }
  );
});

//recuperer la liste des commentaire d'un membre
app.post("/recup_comment", (req, res) => {
  // const id_membre1 = req.body.id_membre1;
  const id_membre2 = req.body.id_membre2;
  const type_membre2 = req.body.type_membre2;
  db.query(
    "SELECT * FROM commentaire WHERE id_membre2 = ? and type_membre2 = ? ORDER BY id DESC",
    [id_membre2, type_membre2],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/recup_all_commenter", (req, res) => {
  // const id_membre1 = req.body.id_membre1;
  const id_membre2 = req.body.id_membre2;
  const type_membre2 = req.body.type_membre2;
  db.query(
    "SELECT * FROM commentaire WHERE id_membre2 = ? and type_membre2 = ? ORDER BY id DESC",
    [id_membre2, type_membre2],
    (err, result) => {
      res.send(String(result.length));
    }
  );
});

//add note for a member
app.post("/add_note", (req, res) => {
  const id_membre1 = req.body.id_membre1;
  const id_membre2 = req.body.id_membre2;
  const type_membre2 = req.body.type_membre2;
  const note_actuel = req.body.note_actuel;
  let note_ante_global = 0;
  // let note_post_global = 0;
  let total_membre_note = 0;
  let somme_note = 0;
  let note_pref = 0;

  if (type_membre2 == "particulier") {
    db.query(
      "SELECT * FROM note WHERE id_membre1 = ? and id_membre2 = ? and type_membre2 = ?",
      [id_membre1, id_membre2, type_membre2],
      (err, result) => {
        if (result.length > 0) {
          db.query(
            "UPDATE note SET note_actuel = ? WHERE id_membre1 = ? and id_membre2 = ? and type_membre2 = ?",
            [note_actuel, id_membre1, id_membre2, type_membre2],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query(
                  "SELECT * FROM lvc_client WHERE id = ?",
                  [id_membre2],
                  (err, result) => {
                    note_ante_global = parseInt(result[0].note_global);
                    db.query(
                      "SELECT * FROM note WHERE id_membre2 = ?",
                      [id_membre2],
                      (err, result) => {
                        total_membre_note = parseInt(result.length);
                        db.query(
                          "SELECT SUM(note_actuel) as note_actuel FROM note WHERE id_membre2 = ?",
                          [id_membre2],
                          (err, result) => {
                            somme_note = parseInt(result[0].note_actuel);
                            note_pref = somme_note / total_membre_note;
                            db.query(
                              "UPDATE note SET note_ante_global = ?, note_post_global = ? WHERE id_membre1 = ? and id_membre2 = ?  and type_membre2 = ?",
                              [
                                note_ante_global,
                                note_pref,
                                id_membre1,
                                id_membre2,
                                type_membre2,
                              ],
                              (err, result) => {
                                db.query(
                                  "UPDATE lvc_client SET note_global = ? WHERE id = ?",
                                  [note_pref, id_membre2],
                                  (err, result) => {
                                    res.send("succès");
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            }
          );
        } else {
          db.query(
            "INSERT INTO note (id_membre1 , id_membre2 , type_membre2 , note_actuel) VALUES (?,?,?,?)",
            [id_membre1, id_membre2, type_membre2, note_actuel],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query(
                  "SELECT * FROM lvc_client WHERE id = ?",
                  [id_membre2],
                  (err, result) => {
                    note_ante_global = parseInt(result[0].note_global);
                    db.query(
                      "SELECT * FROM note WHERE id_membre2 = ?",
                      [id_membre2],
                      (err, result) => {
                        total_membre_note = parseInt(result.length);
                        db.query(
                          "SELECT SUM(note_actuel) as note_actuel FROM note WHERE id_membre2 = ?",
                          [id_membre2],
                          (err, result) => {
                            somme_note = parseInt(result[0].note_actuel);
                            note_pref = somme_note / total_membre_note;
                            db.query(
                              "UPDATE note SET note_ante_global = ?, note_post_global = ? WHERE id_membre1 = ? and id_membre2 = ? and type_membre2 = ?",
                              [
                                note_ante_global,
                                note_pref,
                                id_membre1,
                                id_membre2,
                                type_membre2,
                              ],
                              (err, result) => {
                                db.query(
                                  "UPDATE lvc_client SET note_global = ? WHERE id = ?",
                                  [note_pref, id_membre2],
                                  (err, result) => {
                                    res.send("succès");
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            }
          );
        }
      }
    );
  } else if (type_membre2 == "entreprise") {
    db.query(
      "SELECT * FROM note WHERE id_membre1 = ? and id_membre2 = ? and type_membre2 = ?",
      [id_membre1, id_membre2, type_membre2],
      (err, result) => {
        if (result.length > 0) {
          db.query(
            "UPDATE note SET note_actuel = ? WHERE id_membre1 = ? and id_membre2 = ? and type_membre2 = ?",
            [note_actuel, id_membre1, id_membre2, type_membre2],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query(
                  "SELECT * FROM lvc_entreprise WHERE id = ?",
                  [id_membre2],
                  (err, result) => {
                    note_ante_global = parseInt(result[0].note_global);
                    db.query(
                      "SELECT * FROM note WHERE id_membre2 = ?",
                      [id_membre2],
                      (err, result) => {
                        total_membre_note = parseInt(result.length);
                        db.query(
                          "SELECT SUM(note_actuel) as note_actuel FROM note WHERE id_membre2 = ?",
                          [id_membre2],
                          (err, result) => {
                            somme_note = parseInt(result[0].note_actuel);
                            note_pref = somme_note / total_membre_note;
                            db.query(
                              "UPDATE note SET note_ante_global = ?, note_post_global = ? WHERE id_membre1 = ? and id_membre2 = ? and type_membre2 = ?",
                              [
                                note_ante_global,
                                note_pref,
                                id_membre1,
                                id_membre2,
                                type_membre2,
                              ],
                              (err, result) => {
                                db.query(
                                  "UPDATE lvc_entreprise SET note_global = ? WHERE id = ?",
                                  [note_pref, id_membre2],
                                  (err, result) => {
                                    res.send("succès");
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            }
          );
        } else {
          db.query(
            "INSERT INTO note (id_membre1 , id_membre2 , type_membre2 , note_actuel) VALUES (?,?,?,?)",
            [id_membre1, id_membre2, type_membre2, note_actuel],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query(
                  "SELECT * FROM lvc_entreprise WHERE id = ?",
                  [id_membre2],
                  (err, result) => {
                    note_ante_global = parseInt(result[0].note_global);
                    db.query(
                      "SELECT * FROM note WHERE id_membre2 = ?",
                      [id_membre2],
                      (err, result) => {
                        total_membre_note = parseInt(result.length);
                        db.query(
                          "SELECT SUM(note_actuel) as note_actuel FROM note WHERE id_membre2 = ?",
                          [id_membre2],
                          (err, result) => {
                            somme_note = parseInt(result[0].note_actuel);
                            note_pref = somme_note / total_membre_note;
                            db.query(
                              "UPDATE note SET note_ante_global = ?, note_post_global = ? WHERE id_membre1 = ? and id_membre2 = ?  and type_membre2 = ?",
                              [
                                note_ante_global,
                                note_pref,
                                id_membre1,
                                id_membre2,
                                type_membre2,
                              ],
                              (err, result) => {
                                db.query(
                                  "UPDATE lvc_entreprise SET note_global = ? WHERE id = ?",
                                  [note_pref, id_membre2],
                                  (err, result) => {
                                    res.send("succès");
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            }
          );
        }
      }
    );
  }
});

//recuperer le nombre de votant pour un membre
app.post("/recup_all_votant", (req, res) => {
  // const id_membre1 = req.body.id_membre1;
  const id_membre2 = req.body.id_membre2;
  const type_membre2 = req.body.type_membre2;
  const note_global = 0;
  const nombre_votant = 0;
  db.query(
    "SELECT * FROM note WHERE id_membre2 = ? and type_membre2 = ?",
    [id_membre2, type_membre2],
    (err, result) => {
      // nombre_votant = parseInt(result.length);
      // res.send(nombre_votant);
      if (type_membre2 === "particulier") {
        db.query(
          "SELECT note_global FROM lvc_client WHERE id = ?",
          [id_membre2],
          (err, result1) => {
            // note_global = parseInt(result[0].note_global);
            res.json({
              nombre_votant: result.length,
              note_global: result1[0].note_global,
            });
            // res.send(result);
          }
        );
      } else if (type_membre2 === "entreprise") {
        db.query(
          "SELECT note_global FROM lvc_entreprise WHERE id = ?",
          [id_membre2],
          (err, result1) => {
            // note_global = parseInt(result[0].note_global);
            res.json({
              nombre_votant: result.length,
              note_global: result1[0].note_global,
            });
            // res.send(result);
          }
        );
      }
    }
  );
});

//recuperer la derniere note pour un membre
app.post("/recup_last_note", (req, res) => {
  // const id_membre1 = req.body.id_membre1;
  const id_membre2 = req.body.id_membre2;
  const id_membre1 = req.body.id_membre1;
  const type_membre2 = req.body.type_membre2;
  db.query(
    "SELECT * FROM note WHERE id_membre1 = ? and id_membre2 = ? and type_membre2 = ?",
    [id_membre1, id_membre2, type_membre2],
    (err, result) => {
      if (result.length > 0) {
        db.query(
          "SELECT note_actuel FROM note WHERE id_membre2 = ? and type_membre2 = ? and id_membre1 = ?",
          [id_membre2, type_membre2, id_membre1],
          (err, result) => {
            // nombre_votant = parseInt(result.length);
            res.send(String(result[0].note_actuel));
          }
        );
      } else {
        // res.json({ note_actuel: 0 });
        res.send(String(0));
      }
    }
  );
});

//maj lvc admin informations
app.post("/update_admin_infos", (req, res) => {
  const username = req.body.username;
  const id = req.body.id;

  db.query(
    "UPDATE lvc_admin SET username = ? WHERE id = ?",
    [username, id],
    (err, result) => {
      if (err) {
        res.send("Maj erreur");
      } else {
        res.send("Maj succès");
      }
    }
  );
});
//obtenir les infos d'un lvc admin
app.post("/lvc_admin_info", (req, res) => {
  const id = req.body.id;

  db.query("SELECT * FROM lvc_admin WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        username: result[0].username,
        profil_img: result[0].profil_img,
      });
    }
  });
});
/* mise à jour photo profil admin et suppression de l'ancienne image de la base de données */
app.put("/update_admin_image/:id", async (req, res) => {
  const id = req.params.id;
  let upload = multer({ storage: storagelvc }).single("avatar");

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
    let classifiedsadd = {
      profil_img:
        "https://backend-versatilekills.benindigital.com/lvcpic/" +
        req.file.filename,
    };

    db.query(
      "UPDATE lvc_admin SET ? WHERE id = ?",
      [classifiedsadd, id],
      (err, result) => {
        if (err) {
          // console.log(err);
          fs.unlink("lvcpic/" + req.file.filename, (err) => {
            if (err) {
              console.error(err);
              return;
            }

            //file removed
          });
          res.send("Erreur d'envoi image");
        } else {
          res.send("Image mise à jour succès");
        }
      }
    );
  });
});
//modification de mot de passe admin
app.post("/lvc_admin_changepassword", async (req, res) => {
  const { oldPassword, newPassword, id } = req.body;

  db.query("SELECT * FROM lvc_admin WHERE id = ?", id, (err, result) => {
    if (err) {
      //   console.log(err);
      res.send({ err: err });
    }
    //   res.send(result);
    if (result.length > 0) {
      bcrypt.compare(oldPassword, result[0].password).then(async (match) => {
        if (!match) {
          res.json({ error: "Wrong Password Entered!" });
        } else {
          bcrypt.hash(newPassword, 10).then((hash) => {
            db.query(
              "UPDATE lvc_admin SET password = ? WHERE id = ?",
              [hash, id],
              (err, result) => {
                if (err) {
                  res.send("erreur");
                } else {
                  res.send("succès");
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
  });
});
//récupérer les images slidantes
app.get("/recup_lvc_img_silde", (req, res) => {
  db.query("SELECT * FROM lvc_img_slide", (err, result) => {
    if (err) {
      res.send("Erreur de recup");
    } else {
      res.send(result);
    }
  });
});
/* envoi d'image slidante */
app.put("/ajout_img_slide/:imgIndex", async (req, res) => {
  const imgIndex = req.params.imgIndex;
  let upload = multer({ storage: storagelvc }).single("avatar");

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

    let classifiedsadd = { image1: req.file.filename };

    if (imgIndex == 1) {
      classifiedsadd = {
        image1:
          "https://backend-versatilekills.benindigital.com/lvcpic/" +
          req.file.filename,
      };
    }
    if (imgIndex == 2) {
      classifiedsadd = {
        image2:
          "https://backend-versatilekills.benindigital.com/lvcpic/" +
          req.file.filename,
      };
    }
    if (imgIndex == 3) {
      classifiedsadd = {
        image3:
          "https://backend-versatilekills.benindigital.com/lvcpic/" +
          req.file.filename,
      };
    }
    if (imgIndex == 4) {
      classifiedsadd = {
        image4:
          "https://backend-versatilekills.benindigital.com/lvcpic/" +
          req.file.filename,
      };
    }
    if (imgIndex == 5) {
      classifiedsadd = {
        image5:
          "https://backend-versatilekills.benindigital.com/lvcpic/" +
          req.file.filename,
      };
    }

    db.query("SELECT * FROM lvc_img_slide", (err, result) => {
      if (err) {
        fs.unlink("lvcpic/" + req.file.filename, (err) => {
          if (err) {
            console.error(err);
            return;
          }

          //file removed
        });
        res.send("Erreur d'envoi image");
      } else {
        if (result.length > 0) {
          db.query(
            "UPDATE lvc_img_slide SET ? WHERE id = ?",
            [classifiedsadd, 1],
            (err, result) => {
              if (err) {
                // console.log(err);
                fs.unlink("lvcpic/" + req.file.filename, (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }

                  //file removed
                });
                res.send("Erreur d'envoi image update");
              } else {
                res.send("Image ajout succès");
              }
            }
          );
        } else {
          if (imgIndex == 1) {
            db.query(
              "INSERT INTO lvc_img_slide (image1) VALUES (?)",
              [
                "https://backend-versatilekills.benindigital.com/lvcpic/" +
                  req.file.filename,
              ],
              (err, result) => {
                if (err) {
                  // console.log(err);
                  fs.unlink("lvcpic/" + req.file.filename, (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }

                    //file removed
                  });
                  res.send("Erreur d'envoi image");
                } else {
                  res.send("Image ajout succès");
                }
              }
            );
          }
          if (imgIndex == 2) {
            db.query(
              "INSERT INTO lvc_img_slide (image2) VALUES (?)",
              [
                "https://backend-versatilekills.benindigital.com/lvcpic/" +
                  req.file.filename,
              ],
              (err, result) => {
                if (err) {
                  // console.log(err);
                  fs.unlink("lvcpic/" + req.file.filename, (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }

                    //file removed
                  });
                  res.send("Erreur d'envoi image");
                } else {
                  res.send("Image ajout succès");
                }
              }
            );
          }
          if (imgIndex == 3) {
            db.query(
              "INSERT INTO lvc_img_slide (image3) VALUES (?)",
              [
                "https://backend-versatilekills.benindigital.com/lvcpic/" +
                  req.file.filename,
              ],
              (err, result) => {
                if (err) {
                  // console.log(err);
                  fs.unlink("lvcpic/" + req.file.filename, (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }

                    //file removed
                  });
                  res.send("Erreur d'envoi image");
                } else {
                  res.send("Image ajout succès");
                }
              }
            );
          }
          if (imgIndex == 4) {
            db.query(
              "INSERT INTO lvc_img_slide (image4) VALUES (?)",
              [
                "https://backend-versatilekills.benindigital.com/lvcpic/" +
                  req.file.filename,
              ],
              (err, result) => {
                if (err) {
                  // console.log(err);
                  fs.unlink("lvcpic/" + req.file.filename, (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }

                    //file removed
                  });
                  res.send("Erreur d'envoi image");
                } else {
                  res.send("Image ajout succès");
                }
              }
            );
          }
          if (imgIndex == 5) {
            db.query(
              "INSERT INTO lvc_img_slide (image5) VALUES (?)",
              [
                "https://backend-versatilekills.benindigital.com/lvcpic/" +
                  req.file.filename,
              ],
              (err, result) => {
                if (err) {
                  // console.log(err);
                  fs.unlink("lvcpic/" + req.file.filename, (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }

                    //file removed
                  });
                  res.send("Erreur d'envoi image");
                } else {
                  res.send("Image ajout succès");
                }
              }
            );
          }
        }
      }
    });
  });
});
