<?php header('Content-Type: text/html; charset=utf-8');
$db = mysqli_connect('localhost', 'benixags_vital14', 'fnW*,jE_%hXl', 'benixags_versatilekills');
$db->set_charset("utf8");
if (!$db) {
    echo " database not connected";
} else {
    //	echo " database  connected";
}
//Response object structure
$response = new stdClass;
$response->status = null;
$response->message = null;

//Uploading File
$destination_dir = "uploads/";

$base_filename = basename($_FILES["file"]["name"]);
//new
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$numero = $_POST['numero'];
$whatsapp = $_POST['whatsapp'];
$profil_img = $_POST['profil_img'];
$privilege = $_POST['privilege'];
$email = $_POST['email'];
$localisation = $_POST['localisation'];
$lieu_activite = $_POST['lieu_activite'];
$pays = $_POST['pays'];
$annee_experience = $_POST['annee_experience'];
$domain_activity = $_POST['domain_activity'];
$age = $_POST['age'];
$niveau_etude = $_POST['niveau_etude'];
$specialite = $_POST['specialite'];
$civilite = $_POST['civilite'];
$request_modif = $_POST['request_modif'];
$request_publish = $_POST['request_publish']; 
//$des = $_POST['des'];
//$email=basename($_FILES["file"]["name"]);

//------
$temp = explode(".", $base_filename);
$target_file = $destination_dir . round(microtime(true)) . '.' . end($temp);
//$target_file = round(microtime(true)) . '.' . end($temp);
$path = $target_file;
//$base_filename = basename($_FILES["file"]["name"]);
//$target_file = $destination_dir . $base_filename;


if ($nbrphot == 2) {
    if (isset($_FILES["file"])) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            //  $sql = "SELECT name FROM person WHERE name = '$name' ";

            $sql = "SELECT name FROM products WHERE name='$name'";
            $result = $db->query($sql);
            if ($result->num_rows > 0) {
                // echo "$name";
                $donne3;
                $donne1;
                $donne2;
                $donne4;
                $idreup;
                $sqlh = "SELECT id,name,picture1,picture2,picture3,picture4 FROM products WHERE name='$name'";
                $resulta = $db->query($sqlh);
                if ($resulta->num_rows > 0) {
                    // echo "$name";
                    // output data of each row
                    while ($row = $resulta->fetch_assoc()) {
                        //$donne1 = $row["picture1"];
                        $donne2 = $row["picture2"];
                        $donne3 = $row["picture3"];
                        $donne4 = $row["picture4"];
                        $idreup = $row["id"];
                        //echo "id: " . $row["id"]. "<br>";
                    }
                    if (($donne2 == null) && ($donne3 == null) && ($donne4 == null)) {
                        //echo "trouver" . "<br>";
                        $sqla = "UPDATE products SET picture2='$path' WHERE id='$idreup' ";
                        if ($db->query($sqla) === TRUE) {
                            // echo "Deuxième image inserer avec succès";
                            echo "success";
                        } else {
                            echo "tucce";
                        }
                    } else {
                        echo "inserer";
                    }
                } else {
                    echo "Les données de ce produit n'ont pu ètre récupérer";
                }
            } else {
                //echo "0 results";
                $sqlm = "SELECT id FROM category WHERE nom='$cate'";
                $resultm = $db->query($sqlm);
                if ($resultm->num_rows > 0) {
                    // output data of each row
                    while ($row = $resultm->fetch_assoc()) {
                        //echo "id: " . $row["id"] . "<br>";
                        $idcat = $row["id"];
                        // echo $idrat;
                    }
                    $sqli = "INSERT INTO products (name, description, category_id, price, cost, stock, like_number, total_sold, picture1, mode_livraison, disponibilite) VALUES ('$name', '$descip', '$idcat', '$price', '$cost', '$stock', $like, $sold, '$path', '$mode_livraison', '$disponibilite')";
                    if ($db->query($sqli) === TRUE) {
                        // echo "Produit creer avec succès.Veillez ajouter les trois images restantes pour ce produit";
                        echo "succ";
                    } else {
                        echo "tucc";
                    }
                } else {
                    echo "0 results";
                }
            }
        } else {
        }
    } else {
    }
}


if ($nbrphot == 3) {
    if (isset($_FILES["file"])) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            //  $sql = "SELECT name FROM person WHERE name = '$name' ";

            $sql = "SELECT name FROM products WHERE name='$name'";
            $result = $db->query($sql);
            if ($result->num_rows > 0) {
                // echo "$name";
                $donne3;
                $donne1;
                $donne2;
                $donne4;
                $idreup;
                $sqlh = "SELECT id,name,picture1,picture2,picture3,picture4 FROM products WHERE name='$name'";
                $resulta = $db->query($sqlh);
                if ($resulta->num_rows > 0) {
                    // echo "$name";
                    // output data of each row
                    while ($row = $resulta->fetch_assoc()) {
                        //$donne1 = $row["picture1"];
                        $donne2 = $row["picture2"];
                        $donne3 = $row["picture3"];
                        $donne4 = $row["picture4"];
                        $idreup = $row["id"];
                        //echo "id: " . $row["id"]. "<br>";
                    }
                    if ((($donne2 == null) || ($donne3 == null)) && ($donne4 == null)) {
                        //echo "trouver" . "<br>";
                        if (($donne2 == null) && ($donne3 == null)) {
                            $sqla = "UPDATE products SET picture2='$path' WHERE id='$idreup' ";
                            if ($db->query($sqla) === TRUE) {
                                // echo "Deuxième image inserer avec succès";
                                echo "succe";
                            } else {
                                echo "tucce";
                            }
                        } else {

                            if (($donne3 == null) && ($donne4 == null)) {
                                $sqlb = "UPDATE products SET picture3='$path' WHERE id='$idreup' ";
                                if ($db->query($sqlb) === TRUE) {
                                    // echo "Troisième image inserer avec succès";
                                    echo "success";
                                } else {
                                    echo "tucces";
                                }
                            }
                        }
                    } else {
                        echo "inserer";
                    }
                } else {
                    echo "Les données de ce produit n'ont pu ètre récupérer";
                }

                // echo "users trouver";
            } else {
                //echo "0 results";
                $sqlm = "SELECT id FROM category WHERE nom='$cate'";
                $resultm = $db->query($sqlm);
                if ($resultm->num_rows > 0) {
                    // output data of each row
                    while ($row = $resultm->fetch_assoc()) {
                        //echo "id: " . $row["id"] . "<br>";
                        $idcat = $row["id"];
                        // echo $idrat;
                    }
                    $sqli = "INSERT INTO products (name, description, category_id, price, cost, stock, like_number, total_sold, picture1, mode_livraison, disponibilite) VALUES ('$name', '$descip', '$idcat', '$price', '$cost', '$stock', $like, $sold, '$path', '$mode_livraison', '$disponibilite')";
                    if ($db->query($sqli) === TRUE) {
                        // echo "Produit creer avec succès.Veillez ajouter les trois images restantes pour ce produit";
                        echo "succ";
                    } else {
                        echo "tucc";
                    }
                } else {
                    echo "0 results";
                }
            }
        } else {
        }
    } else {
    }
}


if ($nbrphot == 4) {
    if (isset($_FILES["file"])) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            //  $sql = "SELECT name FROM person WHERE name = '$name' ";

            $sql = "SELECT name FROM products WHERE name='$name'";
            $result = $db->query($sql);
            if ($result->num_rows > 0) {
                // echo "$name";
                $donne3;
                $donne1;
                $donne2;
                $donne4;
                $idreup;
                $sqlh = "SELECT id,name,picture1,picture2,picture3,picture4 FROM products WHERE name='$name'";
                $resulta = $db->query($sqlh);
                if ($resulta->num_rows > 0) {
                    // echo "$name";
                    // output data of each row
                    while ($row = $resulta->fetch_assoc()) {
                        //$donne1 = $row["picture1"];
                        $donne2 = $row["picture2"];
                        $donne3 = $row["picture3"];
                        $donne4 = $row["picture4"];
                        $idreup = $row["id"];
                        //echo "id: " . $row["id"]. "<br>";
                    }
                    if ((($donne2 == null) || ($donne4 == null)) && ($donne3 == null)) {
                        //echo "trouver" . "<br>";
                        if (($donne2 == null) && ($donne3 == null)) {
                            $sqla = "UPDATE products SET picture2='$path' WHERE id='$idreup' ";
                            if ($db->query($sqla) === TRUE) {
                                // echo "Deuxième image inserer avec succès";
                                echo "succe";
                            } else {
                                echo "tucce";
                            }
                        } else {

                            if (($donne3 == null) && ($donne4 == null)) {
                                $sqlb = "UPDATE products SET picture4='$path' WHERE id='$idreup' ";
                                if ($db->query($sqlb) === TRUE) {
                                    // echo "Troisième image inserer avec succès";
                                    echo "success";
                                } else {
                                    echo "tucces";
                                }
                            }
                        }
                    } else {
                        echo "inserer";
                    }
                } else {
                    echo "Les données de ce produit n'ont pu ètre récupérer";
                }
            } else {
                //echo "0 results";
                $sqlm = "SELECT id FROM category WHERE nom='$cate'";
                $resultm = $db->query($sqlm);
                if ($resultm->num_rows > 0) {
                    // output data of each row
                    while ($row = $resultm->fetch_assoc()) {
                        //echo "id: " . $row["id"] . "<br>";
                        $idcat = $row["id"];
                        // echo $idrat;
                    }
                    $sqli = "INSERT INTO products (name, description, category_id, price, cost, stock, like_number, total_sold, picture1, mode_livraison, disponibilite) VALUES ('$name', '$descip', '$idcat', '$price', '$cost', '$stock', $like, $sold, '$path', '$mode_livraison', '$disponibilite')";
                    if ($db->query($sqli) === TRUE) {
                        // echo "Produit creer avec succès.Veillez ajouter les trois images restantes pour ce produit";
                        echo "succ";
                    } else {
                        echo "tucc";
                    }
                } else {
                    echo "0 results";
                }
            }
        } else {
        }
    } else {
    }
}


if ($nbrphot == 5) {
    if (isset($_FILES["file"])) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            //  $sql = "SELECT name FROM person WHERE name = '$name' ";

            $sql = "SELECT name FROM products WHERE name='$name'";
            $result = $db->query($sql);
            if ($result->num_rows > 0) {
                // echo "$name";
                $donne3;
                $donne1;
                $donne2;
                $donne4;
                $idreup;
                $sqlh = "SELECT id,name,picture1,picture2,picture3,picture4 FROM products WHERE name='$name'";
                $resulta = $db->query($sqlh);
                if ($resulta->num_rows > 0) {
                    // echo "$name";
                    // output data of each row
                    while ($row = $resulta->fetch_assoc()) {
                        //$donne1 = $row["picture1"];
                        $donne2 = $row["picture2"];
                        $donne3 = $row["picture3"];
                        $donne4 = $row["picture4"];
                        $idreup = $row["id"];
                        //echo "id: " . $row["id"]. "<br>";
                    }
                    if (($donne2 == null) || ($donne3 == null) || ($donne4 == null)) {
                        //echo "trouver" . "<br>";
                        if ($donne2 == null) {
                            $sqla = "UPDATE products SET picture2='$path' WHERE id='$idreup' ";
                            if ($db->query($sqla) === TRUE) {
                                // echo "Deuxième image inserer avec succès";
                                echo "succe";
                            } else {
                                echo "tucce";
                            }
                        } else {

                            if ($donne3 == null) {
                                $sqlb = "UPDATE products SET picture3='$path' WHERE id='$idreup' ";
                                if ($db->query($sqlb) === TRUE) {
                                    // echo "Troisième image inserer avec succès";
                                    echo "succes";
                                } else {
                                    echo "tucces";
                                }
                            } else {

                                if ($donne4 == null) {
                                    $sqlc = "UPDATE products SET picture4='$path' WHERE id='$idreup' ";
                                    if ($db->query($sqlc) === TRUE) {
                                        //  echo "Quatrième image inserer avec succès";
                                        echo "success";
                                    } else {
                                        echo "Article créer seulement avec trois image " . $db->error;
                                    }
                                } else {
                                }
                            }
                        }
                    } else {
                        echo "inserer";
                    }
                } else {
                    echo "Les données de ce produit n'ont pu ètre récupérer";
                    //echo "$name";
                }

                // echo "users trouver";
            } else {
                //echo "0 results";
                $sqlm = "SELECT id FROM category WHERE nom='$cate'";
                $resultm = $db->query($sqlm);
                if ($resultm->num_rows > 0) {
                    // output data of each row
                    while ($row = $resultm->fetch_assoc()) {
                        //echo "id: " . $row["id"] . "<br>";
                        $idcat = $row["id"];
                        // echo $idrat;
                    }
                    $sqli = "INSERT INTO products (name, description, category_id, price, cost, stock, like_number, total_sold, picture1, mode_livraison, disponibilite) VALUES ('$name', '$descip', '$idcat', '$price', '$cost', '$stock', $like, $sold, '$path', '$mode_livraison', '$disponibilite')";
                    if ($db->query($sqli) === TRUE) {
                        // echo "Produit creer avec succès.Veillez ajouter les trois images restantes pour ce produit";
                        echo "succ";
                    } else {
                        echo "tucc";
                    }
                } else {
                    echo "0 results";
                }
            }
        } else {
        }
    } else {
    }
}


// header('Content-type: application/json');
// echo json_encode($response);
