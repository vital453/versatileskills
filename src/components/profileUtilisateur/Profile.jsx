/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Axios from "axios";
import { dateParser1, isEmpty } from "../Utils";
import { BsCameraFill } from "react-icons/bs";
import * as imageConversion from "image-conversion";
import { FaWhatsapp } from "react-icons/fa";
import { setimage_profile } from "../../feature/profileUser.slice";

const Profile = () => {
  const user = useSelector((t) => t.auth.user);
  const allprofession = useSelector((t) => t.profession.profession);
  const [userData, setuserData] = useState([]);
  const [userServices, setuserServices] = useState([]);
  const [profileSimilar, setprofileSimilar] = useState([]);
  let { userId, professionId } = useParams();
  const [messerr, setMesserr] = useState("debut");
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);
  const [message, setmessage] = useState(
    "La taille des images doit être inférieure à 1Mo"
  );
  //a propos infos
  const [nom, setnom] = useState("");
  const [ifnom, setIfnom] = useState(false);
  const [numero, setnumero] = useState(0);
  const [ifnumero, setIfnumero] = useState(false);
  const [ifnumeroValid, setIfnumeroValid] = useState(false);
  const [adresse, setadresse] = useState("");
  const [ifadresse, setIfadresse] = useState(false);
  const [aboutUpd, setaboutUpd] = useState(false);
  //profile card infos
  const [username, setusername] = useState("");
  const [ifusername, setIfusername] = useState("");
  const [about, setabout] = useState("");
  const [ifabout, setifabout] = useState("");
  const [profession, setprofession] = useState("");
  const [ifprofession, setIfprofession] = useState(false);
  const [ProfessionId, setprofessionId] = useState(professionId);
  //service
  const [serviceName, setserviceName] = useState("");
  const [serviceNameEdit, setserviceNameEdit] = useState("");
  const [ifserviceName, setIfserviceName] = useState("");
  const [serviceDescrip, setserviceDescrip] = useState("");
  const [serviceDescripEdit, setserviceDescripEdit] = useState("");
  const [ifserviceDescrip, setIfserviceDescrip] = useState("");
  const [serviceAddSuccess, setserviceAddSuccess] = useState(false);
  const [serviceEditSuccess, setserviceEditSuccess] = useState(false);
  const [serviceDeleteSuccess, setserviceDeleteSuccess] = useState(false);
  const [serviceEditId, setserviceEditId] = useState(0);
  const [serviceMsg, setserviceMsg] = useState("");
  const [serviceDeleteId, setserviceDeleteId] = useState(0);

  const [loader, setLoad] = useState(false);
  const [loader1, setLoad1] = useState(false);

  const dispatch = useDispatch();

  const imageprofile = useSelector((state) => state.profileUser.image_profiles);

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [userInfo1, setuserInfo1] = useState({
    file: [],
    filepreview: null,
  });

  const getProfile = () => {
    Axios.post("https://backend-skills.versatileskills.space/profileInfos", {
      userId,
    }).then((res) => {
      // console.log(res.data);
      setuserData(res.data);
      if (user.auth) {
        if (user.userId === parseInt(userId)) {
          setnom(res.data.nom);
          setnumero(res.data.number);
          setadresse(res.data.adresse);
          setusername(res.data.username);
          setprofession(res.data.profession);
          setabout(res.data.a_propos_de_moi);
        }
      }
    });
  };

  //delete image galerie
  const deleteimg_galerie = (id, nameimg) => {
    setLoad1(true);
    Axios.post(
      "https://backend-skills.versatileskills.space/deleteimg_galerie",
      {
        id: id,
        nameimg: nameimg,
      }
    ).then((res) => {
      setLoad1(false);
      getallimage_profile();
    });
  };
  const getProfileServices = () => {
    Axios.post("https://backend-skills.versatileskills.space/profileServices", {
      userId,
    }).then((res) => {
      // console.log(res.data);
      setuserServices(res.data);
    });
  };
  const getProfileSimilar = () => {
    Axios.post("https://backend-skills.versatileskills.space/profileSimilar", {
      professionId,
    }).then((res) => {
      // console.log(res.data);
      setprofileSimilar(res.data);
    });
  };
  // changement de photos de profile

  const handleInputChange = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      if (parseInt(event.target.files[0].size) > 4000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 4Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          30
        );
        const myFile = new File(
          [event.target.files[0]],
          event.target.files[0].name,
          {
            type: event.target.files[0].type,
          }
        );
        // const myFile = new File([res], event.target.files[0].name, {
        //   type: res.type,
        // });
        setLoad(true);
        const formdata = new FormData();
        formdata.append("avatar", myFile);
        Axios.put(
          `https://backend-skills.versatileskills.space/majimgprofil/${user.userId}`,
          formdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        ).then((res) => {
          // then print response status
          console.warn(res);
          if (res.data.success === 1) {
            setLoad(false);
            setuserInfo({
              ...userInfo,
              file: myFile,
              filepreview: URL.createObjectURL(myFile),
            });
          } else {
            setMesserr(
              "Image non pris en charge dans la base de donnée.Veillez réessayer"
            );
          }
        });
      }
    }
  };
  const handleadd_image = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      if (parseInt(event.target.files[0].size) > 4000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 4Mo");
      } else {
        // const res = await imageConversion.compressAccurately(
        //   event.target.files[0],
        //   30
        // );
        const myFile = new File(
          [event.target.files[0]],
          event.target.files[0].name,
          {
            type: event.target.files[0].type,
          }
        );
        setLoad1(true);
        const formdata = new FormData();
        formdata.append("avatar", myFile);
        Axios.put(
          `https://backend-skills.versatileskills.space/addimgprofil/${user.userId}`,
          formdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        ).then((res) => {
          // then print response status
          console.warn(res);
          if (res.data.success === 1) {
            setLoad1(false);
            getallimage_profile();
            // setuserInfo({
            //   ...userInfo,
            //   file: myFile,
            //   filepreview: URL.createObjectURL(myFile),
            // });
          } else {
            setMesserr(
              "Image non pris en charge dans la base de donnée.Veillez réessayer"
            );
          }
        });
      }
    }
  };

  //maj a propos
  const aboutUpdate = () => {
    const closeModal = document.getElementById("aboutUpdateClose");
    if (!about) {
      setifabout(true);
      setTimeout(() => {
        setifabout(false);
      }, [4000]);
    } else {
      setifabout(false);
    }

    if (about) {
      Axios.put(
        `https://backend-skills.versatileskills.space/aboutUpdate/${user.userId}/${about}`
      ).then((res) => {
        if (res.data.success === 1) {
          setuserData(res.data);
          closeModal.click();
          // setabout(res.data.a_propos_de_moi);
          setaboutUpd(true);
          setTimeout(() => {
            setaboutUpd(false);
          }, [4000]);
        }
      });
    }
  };
  //maj profile
  const profileUpdate = () => {
    const closeModal = document.getElementById("profileUpdateClose");
    if (!nom) {
      setIfnom(true);
      setTimeout(() => {
        setIfnom(false);
      }, [4000]);
    } else {
      setIfnom(false);
    }
    if (isEmpty(numero)) {
      setIfnumero(true);
      setTimeout(() => {
        setIfnumero(false);
      }, [4000]);
    } else {
      setIfnumero(false);
    }
    if (!adresse) {
      setIfadresse(true);
      setTimeout(() => {
        setIfadresse(false);
      }, [4000]);
    } else {
      setIfadresse(false);
    }

    if (!profession) {
      setIfprofession(true);
      setTimeout(() => {
        setIfprofession(false);
      }, [4000]);
    } else {
      setIfprofession(false);
    }

    if (/((229)|(00229))[0-9]{8}/.test(numero)) {
      setIfnumeroValid(false);
      if (profession && nom && adresse && numero) {
        Axios.put(
          `https://backend-skills.versatileskills.space/profileUpdate/${user.userId}/${nom}/${profession}/${ProfessionId}/${numero}/${adresse}`
        ).then((res) => {
          if (res.data.success === 1) {
            setuserData(res.data);
            closeModal.click();
            // setnom(res.data.nom);
            // setnumero(res.data.number);
            // setadresse(res.data.adresse);
            // setabout(res.data.a_propos_de_moi);
            setaboutUpd(true);
            setTimeout(() => {
              setaboutUpd(false);
            }, [4000]);
            if (ProfessionId !== professionId) {
              window.location.href = `/profile/${userId}/${ProfessionId}`;
            }
          }
        });
      }
    }
  };
  //ajout de service
  const ajoutService = () => {
    if (!serviceName) {
      setIfserviceName(true);
      setTimeout(() => {
        setIfserviceName(false);
      }, [4000]);
    } else {
      setIfserviceName(false);
    }
    if (!serviceDescrip) {
      setIfserviceDescrip(true);
      setTimeout(() => {
        setIfserviceDescrip(false);
      }, [4000]);
    } else {
      setIfserviceDescrip(false);
    }

    if (serviceName && serviceDescrip) {
      Axios.post("https://backend-skills.versatileskills.space/addService", {
        nom: serviceName,
        descriptio: serviceDescrip,
        idprofile: user.userId,
      }).then((res) => {
        setuserServices(res.data);
        setserviceDescrip("");
        setserviceName("");
        setserviceAddSuccess(true);
        setTimeout(() => {
          setserviceAddSuccess(false);
        }, [4000]);
      });
    }
  };
  //editer un service
  const editService = () => {
    const closeModal = document.getElementById("serviceEditClose");
    if (!serviceName) {
      setIfserviceName(true);
      setTimeout(() => {
        setIfserviceName(false);
      }, [4000]);
    } else {
      setIfserviceName(false);
    }
    if (!serviceDescrip) {
      setIfserviceDescrip(true);
      setTimeout(() => {
        setIfserviceDescrip(false);
      }, [4000]);
    } else {
      setIfserviceDescrip(false);
    }

    if (
      serviceName &&
      serviceDescrip &&
      (serviceName !== serviceNameEdit || serviceDescrip !== serviceDescripEdit)
    ) {
      setserviceMsg("Service édité avec succès !");
      Axios.put(
        `https://backend-skills.versatileskills.space/editService/${serviceEditId}/${serviceName}/${serviceDescrip}/${user.userId}`
      ).then((res) => {
        setuserServices(res.data);
        closeModal.click();
        setserviceEditSuccess(true);
        setTimeout(() => {
          setserviceEditSuccess(false);
        }, [4000]);
        // window.location.href = `/profile/${userId}/${professionId}`;
      });
    } else {
      setserviceMsg("Aucune modification !");
      closeModal.click();
      setserviceEditSuccess(true);
      setTimeout(() => {
        setserviceEditSuccess(false);
      }, [4000]);
    }
  };
  //supprimer un service
  const deleteService = () => {
    setserviceMsg("Service supprimer avec succès !");
    const closeModal = document.getElementById("serviceDeleteClose");
    Axios.post("https://backend-skills.versatileskills.space/deleteService", {
      id: serviceDeleteId,
      userId: user.userId,
    }).then((res) => {
      setuserServices(res.data);
      closeModal.click();
      setserviceDeleteSuccess(true);
      setTimeout(() => {
        setserviceDeleteSuccess(false);
      }, [4000]);
      // window.location.href = `/profile/${userId}/${professionId}`;
    });
  };

  // get all image from profile selected
  const getallimage_profile = () => {
    console.log("idprofile" + userId);
    Axios.post("https://backend-skills.versatileskills.space/getprofileimage", {
      id: userId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(setimage_profile(ret.data));
    });
  };
  useEffect(() => {
    // console.log(userId);
    getProfile();
    getProfileServices();
    getProfileSimilar();
  }, []);
  useEffect(() => {
    getallimage_profile();
  }, []);
  useEffect(() => {
    // console.log(userId);
    getProfile();
  }, [user]);

  return (
    <div className="bg-background1">
      <div className="flex max-lg:flex-wrap gap-4 bg-background1 p-10">
        {/* ********************************************************* section gauche ************************************ */}
        <div className="w-full lg:w-3/4 bg-background1 flex flex-col gap-2 space-y-4">
          {/* Profile infos */}
          <div
            className="drop-shadow-lg rounded-xl bg-white max-md:flex max-md:flex-col max-md:gap-20"
            style={{ minheight: "500px" }}
          >
            <div
              className="w-full rounded-xl relative"
              style={{ height: "200px" }}
            >
              <img
                src="/abg.jpg"
                alt=""
                className="w-full h-full rounded-lg object-cover"
              />
              <div className="absolute left-6 top-28">
                {userData.profileImg === "" ? (
                  <div className="flex items-center justify-center relative">
                    {userInfo.filepreview != null ? (
                      loader === true ? (
                        <img
                          src="/gitload.gif"
                          alt=""
                          className="w-44 h-44 rounded-full object-cover"
                        />
                      ) : (
                        <img
                          src={userInfo.filepreview}
                          alt=""
                          className="w-44 h-44 rounded-full object-fill"
                        />
                      )
                    ) : loader === true ? (
                      <img
                        src="/gitload.gif"
                        alt=""
                        className="w-44 h-44 rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src="/man.png"
                        alt=""
                        className="w-44 h-44 rounded-full object-fill"
                      />
                    )}
                    {user.auth && user.userId === parseInt(userId) && (
                      <div className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center absolute left-32 top-32">
                        <label for="file" className="">
                          <BsCameraFill className="text-xl text-white" />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            id="file"
                            name="upload_file"
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center relative">
                    <img
                      className="rounded-full w-44 h-44 object-cover"
                      src={`https://backend-skills.versatileskills.space/uploads/${userData.profileImg}`}
                    />
                    {user.auth && user.userId === parseInt(userId) && (
                      <div className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center absolute left-32 top-32 ">
                        <label for="file" className="">
                          <BsCameraFill className="text-xl text-white" />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            id="file"
                            name="upload_file"
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between p-3 lg:p-8">
              <div className="md:ml-52">
                <div className="text-2xl text-black font-semibold mb-2">
                  <span className="">
                    {userData.nom ? userData.nom : "Nom (A définir)"}
                  </span>
                </div>
                <div className="text-base text-gray-400 mb-2">
                  <span className="text-black">Email: </span>
                  <span className="">
                    {userData.email === "" ? "aucun mail" : userData.email}
                  </span>
                </div>
                <div className="text-base text-gray-400 mb-2">
                  <span className="text-black">Numeros whatsapp:</span>
                  <span className="">
                    {userData.number === ""
                      ? " +229 xxxxxxx"
                      : " +" + userData.number}
                  </span>
                </div>
                <div className="text-base text-gray-400 mb-2">
                  <span className="text-black">Adresse: </span>
                  <span className="">
                    {userData.email === "" ? "aucun mail" : userData.email}
                  </span>
                </div>
                <div className="text-base text-gray-400 mb-2">
                  <span className="text-black">Profession: </span>
                  <span className="">
                    {userData.profession === ""
                      ? "aucun profession"
                      : userData.profession}
                  </span>
                </div>
                <div className="w-full">
                  <ul className="w-full bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Membre depuis</span>
                      <span className="ml-auto">
                        {dateParser1(userData.creation_date)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {user.auth && user.userId === parseInt(userId) && (
                <div
                  className="h-12 w-12 cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#profileUpdate"
                >
                  <img
                    src="/edit(1).png"
                    // src={`https://backend-skills.versatileskills.space/uploads/${val.profileImg}`}

                    className="h-12 w-12 object-cover"
                    alt=""
                  />
                </div>
              )}
              {/* <div className="bg-blue-500 px-2 py-1 rounded-lg flex items-center h-10 text-white text-lg"><FaWhatsapp/>&nbsp;&nbsp;Contactez-moi</div> */}
            </div>
          </div>

          {/* *********************************** Début toast de mise à jour **************************************** */}
          {aboutUpd && (
            <div
              id="toast-success"
              className="flex items-center  fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">
                Profile mis à jour !
              </div>
              <button
                onClick={() => setaboutUpd(false)}
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-success"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}
          {/* ************************************ Fin toast de mise à jour ***************************************** */}

          {/* ***********************************<!-- Profile Card update Modal -->******************************************** */}
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="profileUpdate"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
                    id="exampleModalLabel"
                  >
                    Profile
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="profileUpdateClose"
                    // onClick={() => {
                    //   setusername("");
                    //   setprofession("");
                    //   setprofessionId(professionId);
                    // }}
                  ></button>
                </div>
                {/* *********************************************** Body ****************************** */}
                <div className="modal-body relative p-4">
                  <div>
                    <input
                      type="text"
                      className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                      placeholder="Votre nom"
                      value={nom}
                      onChange={(e) => setnom(e.target.value)}
                      required
                    />
                    {ifnom && (
                      <div className="empty_full">
                        Veuillez entrez votre nom
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <input
                      type="number"
                      className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                      placeholder="Votre numéro"
                      value={numero}
                      onChange={(e) => setnumero(e.target.value)}
                      required
                    />
                    {ifnumero && (
                      <div className="empty_full">
                        Veuillez entrez votre numéro
                      </div>
                    )}
                    {ifnumeroValid && (
                      <div className="empty_full">
                        Veuillez entrez un numéro valid
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <input
                      type="text"
                      className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                      placeholder="Votre adresse"
                      value={adresse}
                      onChange={(e) => setadresse(e.target.value)}
                    />
                    {ifadresse && (
                      <div className="empty_full">
                        Veuillez entrez votre adresse
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <label htmlFor="profession">Profession</label>
                    <select
                      name="profession"
                      id="profession"
                      onChange={(e) => {
                        setprofession(e.target.value);
                        setprofessionId(
                          allprofession.find((t) => t.nom === e.target.value).id
                        );
                      }}
                      className="form-select"
                      // defaultValue={profession}
                      value={profession}
                    >
                      <option value="">Votre profession</option>
                      {allprofession[0] &&
                        allprofession.map((val) => {
                          return (
                            <option value={val.nom} key={val.id}>
                              {val.nom}
                            </option>
                          );
                        })}
                    </select>
                    {ifprofession && (
                      <div className="empty_full">
                        Veuillez choisir votre profession !
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                    // onClick={() => {
                    //   setusername("");
                    //   setprofession("");
                    //   setprofessionId(professionId);
                    // }}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    onClick={profileUpdate}
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Profile infos fin */}

          {/* Section about us */}
          <div
            className="drop-shadow-lg rounded-xl bg-white p-4"
            style={{ height: "500px" }}
          >
            <div className="text-xl text-black flex justify-between items-center">
              <span>À propos de nous</span>
              {user.auth && user.userId === parseInt(userId) && (
                <div
                  className="h-12 w-12 cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#aboutUpdate"
                >
                  <img
                    src="/edit(1).png"
                    // src={`https://backend-skills.versatileskills.space/uploads/${val.profileImg}`}

                    className="h-12 w-12 object-cover"
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="text-base text-gray-600 mt-3 pp">
              <p className="ppp">
                {userData.a_propos_de_moi ? (
                  userData.a_propos_de_moi
                ) : (
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                    id vero obcaecati tenetur, odit omnis eius necessitatibus!
                    Alias qui, dolorem vero quia non error vitae dolores at
                    autem reiciendis neque dolore ratione? Voluptatem impedit
                    necessitatibus repudiandae officia, voluptates rem,
                    aspernatur sequi consectetur id dicta quisquam, nostrum
                    maiores? Unde, repellendus blanditiis. Assumenda deserunt
                    esse itaque nesciunt, sed neque impedit quas deleniti, illo
                    ipsa adipisci excepturi a quidem. Labore, ipsa
                    exercitationem molestias cum laboriosam sed non aut magni
                    natus impedit voluptatem quis assumenda soluta inventore
                    cumque rerum pariatur. Beatae ex iste minima dolorem error
                    nihil, ad iure explicabo corrupti nisi ratione commodi
                    molestiae facilis distinctio velit corporis autem vel. Eum
                    et placeat fugiat cupiditate cum. In quisquam voluptatum
                    quod, suscipit, facere mollitia tempore consequatur sint
                    repudiandae aliquam culpa nisi? Et aut esse distinctio odio
                    temporibus iure fugiat doloribus architecto dolores, quos
                    earum ratione perferendis, incidunt eaque eveniet inventore
                    hic non quidem at quas ad natus. Quae, beatae impedit
                    corporis labore illum reprehenderit error atque. Beatae non
                    earum sunt debitis aut tempore accusantium qui explicabo
                    saepe illo magnam impedit laudantium repellat dignissimos
                    praesentium assumenda, quam voluptate minima dolor voluptas
                    eaque necessitatibus vero optio? Consectetur aspernatur
                    aliquid cum. Sunt atque reiciendis corporis ipsum magni
                    voluptatum assumenda. Suscipit aspernatur cupiditate
                    accusantium facere, nulla iusto dicta officiis, hic, sed
                    enim adipisci ex? Vitae, officia quibusdam. Quisquam cumque
                    nisi explicabo voluptatem veniam consequatur repellat
                    dolores illum enim, aliquid sed rerum eos tenetur
                    repellendus libero laborum. Voluptates ab esse molestias
                    saepe veritatis nostrum velit neque alias tempore dolores
                    est voluptatibus voluptatem cum nesciunt, repellendus magni
                    consectetur. Placeat illo quos at consequuntur vero ut nulla
                    debitis! Pariatur, vitae. Quod, ipsum quia. Enim, sint! Sed
                    laborum temporibus soluta voluptate impedit provident odit,
                    doloribus fugiat reprehenderit ad itaque quo sit rem iste
                    fugit magnam nulla natus pariatur maxime illum? Magni ab
                    error, eum harum perspiciatis perferendis. Obcaecati
                    asperiores sit libero nesciunt dolorum recusandae nostrum,
                    iste, magni error rem dicta quae id minus voluptatem facere
                    esse sunt odit totam! Dolores, atque voluptatem perspiciatis
                    officiis excepturi molestiae voluptates aperiam repellat nam
                    ea earum, cum, hic eveniet nostrum beatae eaque sed vero
                    illum non! Earum unde nemo expedita voluptates, doloribus
                    molestiae fugiat eius vero excepturi sint officiis quos,
                    illo dolore quam veniam praesentium! Accusamus minima sunt
                    cumque voluptas nam laborum dolore, culpa ab velit vero
                    dolores quia vitae similique odit voluptates eaque
                    necessitatibus amet vel, qui temporibus itaque sed. Error
                    mollitia iure assumenda nostrum
                  </>
                )}
              </p>
            </div>
          </div>
          {/* ************************************************* début toast de mise à jour about ********************************* */}
          {/* {aboutUpd && (
              <div
                id="toast-success"
                className="flex items-center  fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">Profile mis à jour !</div>
                <button
                  onClick={() => setaboutUpd(false)}
                  className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-success"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            )} */}
          {/* ************************************************* fin toast de mise à jour about ********************************* */}
          {/* <!-- About update Modal --> */}
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="aboutUpdate"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
                    id="exampleModalLabel"
                  >
                    A propos
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="aboutUpdateClose"
                  ></button>
                </div>
                {/* *********************************************** Body ****************************** */}
                <div className="modal-body relative p-4">
                  <div className="">
                    {/* <label htmlFor="about">À propos de vous</label> */}
                    <textarea
                      type="text"
                      className="form-input w-full h-60 resize-none px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                      placeholder="Je suis developpeur ...."
                      value={about}
                      onChange={(e) => setabout(e.target.value)}
                      required
                      id="about"
                    />
                    {ifabout && (
                      <div className="empty_full">
                        Veuillez entrez une description de vous !
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setnom("");
                      setnumero(0);
                      setadresse("");
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    onClick={aboutUpdate}
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* end section about us  */}
        </div>

        {/* ********************************************************* section droite ********************************** */}
        <div className="w-full lg:w-1/4 bg-background1 flex max-lg:justify-center flex-col gap-4">
          {" "}
          {/* section profile similaire */}
          <div className="">
            <div className="drop-shadow-lg rounded-xl bg-white ">
              {/* <!-- Profile similaire card --> */}
              <div className="flex flex-col gap-2 p-4">
                <span className="text-base font-semibold mb-2">
                  Profiles Similaires
                </span>
                {!isEmpty(profileSimilar) ? (
                  <>
                    {profileSimilar
                      .filter((t) =>
                        user.auth
                          ? t.id !== parseInt(userId) && t.id !== user.userId
                          : t.id !== parseInt(userId)
                      )
                      .map((val) => (
                        <div className="flex gap-2" key={val.id}>
                          <div className="h-10 w-10 rounded-full">
                            {val.profileImg === "" ? (
                              <img
                                className="h-10 w-10 rounded-full mx-auto"
                                src="/man.png"
                                alt="Photo_profile"
                              />
                            ) : (
                              <img
                                className="h-10 w-10 rounded-full mx-auto"
                                src={`https://backend-skills.versatileskills.space/uploads/${val.profileImg}`}
                                alt="Photo_profile"
                              />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <div className="text-base text-black ">
                              <span className="">
                                {val.username === ""
                                  ? "aucun nom"
                                  : val.username}
                              </span>
                            </div>
                            <div className="text-base text-gray-400">
                              <span className="">
                                {val.email === "" ? "aucun mail" : val.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <div>Pas de profile similaire</div>
                )}
              </div>
              {/* <!-- End of Profile similaire card --> */}
            </div>
          </div>
          {/* section service  */}
          <div className="">
            <div className="drop-shadow-lg rounded-xl bg-white ">
              <div className="w-full flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold mb-2">
                    Mes services
                  </span>
                  {user.auth && user.userId === parseInt(userId) && (
                    <div
                      className="h-8 w-8 cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#ajoutService"
                    >
                      <img
                        src="/add(2).png"
                        // src={`https://backend-skills.versatileskills.space/uploads/${val.profileImg}`}

                        className="h-8 w-8 object-cover"
                        alt=""
                      />
                    </div>
                  )}
                </div>
                {!isEmpty(userServices) ? (
                  <ul className="w-full list-inside space-y-2 flex flex-col">
                    {userServices.map((val) => (
                      <li
                        className="w-full flex justify-between items-center"
                        key={val.id}
                      >
                        <div className="flex flex-col w-2/3">
                          <div className="text-teal-600">{val.nom}</div>
                          <div className="text-gray-500 text-sm">
                            {val.description}
                          </div>
                        </div>
                        {user.auth && user.userId === parseInt(userId) && (
                          <div className="flex justify-center space-x-4 w-1/3 ml-6">
                            <img
                              src="/edit.png"
                              className="w-7 h-7 cursor-pointer"
                              alt="Editer un service"
                              data-bs-toggle="modal"
                              data-bs-target="#editService"
                              onClick={() => {
                                setserviceName(val.nom);
                                setserviceNameEdit(val.nom);
                                setserviceDescrip(val.description);
                                setserviceDescripEdit(val.description);
                                setserviceEditId(val.id);
                              }}
                            />
                            <img
                              src="/trash.png"
                              className="w-7 h-7 cursor-pointer"
                              alt="Ajouter un service"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteService"
                              onClick={() => setserviceDeleteId(val.id)}
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="">
                    <div className="flex justify-center">
                      <img
                        src="/boite-vide.png"
                        className="w-12 h-12"
                        alt="Ajouter un service"
                      />
                    </div>
                    <h4 className="flex justify-center">Aucun service</h4>
                  </div>
                )}
              </div>
            </div>

            {/* ***********************************<!-- Ajout de service Modal -->******************************************** */}
            <div
              className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
              id="ajoutService"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              {/* ************************************************* début toast service ajouté ******************************************** */}
              {serviceAddSuccess && (
                <div
                  id="toast-success"
                  className="flex items-center  fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                  role="alert"
                >
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Check icon</span>
                  </div>
                  <div className="ml-3 text-sm font-normal">
                    Service ajouter !
                  </div>
                  <button
                    onClick={() => setserviceAddSuccess(false)}
                    className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    data-dismiss-target="#toast-success"
                    aria-label="Close"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
              {/* ************************************************* fin toast service ajouté ******************************************** */}

              <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                  <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <h5
                      className="text-xl font-medium leading-normal text-gray-800"
                      id="exampleModalLabel"
                    >
                      Ajout de service
                    </h5>
                    <button
                      type="button"
                      className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setserviceName("");
                        setserviceDescrip("");
                      }}
                    ></button>
                  </div>
                  {/* *********************************************** Body ****************************** */}
                  <div className="modal-body relative p-4">
                    <div>
                      <label htmlFor="serviceName">Nom du service</label>
                      <input
                        type="text"
                        className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                        placeholder="Service"
                        value={serviceName}
                        onChange={(e) => setserviceName(e.target.value)}
                        required
                        id="serviceName"
                      />
                      {ifserviceName && (
                        <div className="empty_full">
                          Veuillez entrez le nom du service !
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="serviceDescrip">Description</label>
                      <textarea
                        className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                        value={serviceDescrip}
                        onChange={(e) => setserviceDescrip(e.target.value)}
                        placeholder="Décrire le service"
                        required
                        id="serviceDescrip"
                      />
                      {/* <input
                        type="text"
                        className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                        placeholder="Décrivez votre service"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        required
                        id="serviceDescrip"
                      /> */}
                      {ifserviceDescrip && (
                        <div className="empty_full">
                          Veuillez décrire votre service !
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setserviceName("");
                        setserviceDescrip("");
                      }}
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      onClick={ajoutService}
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ************************************** Début Edition service toast ************************************************* */}
            {serviceEditSuccess && (
              <div
                id="toast-success"
                className="flex items-center  fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">{serviceMsg}</div>
                <button
                  onClick={() => setserviceEditSuccess(false)}
                  className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-success"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
            {/* ************************************** Fin Edition service toast ************************************************* */}

            {/* ***********************************<!-- Edition de service Modal -->******************************************** */}
            <div
              className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
              id="editService"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                  <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <h5
                      className="text-xl font-medium leading-normal text-gray-800"
                      id="exampleModalLabel"
                    >
                      Edition de service
                    </h5>
                    <button
                      type="button"
                      className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="serviceEditClose"
                      onClick={() => {
                        setserviceName("");
                        setserviceNameEdit("");
                        setserviceDescrip("");
                        setserviceDescripEdit("");
                        setserviceEditId(0);
                      }}
                    ></button>
                  </div>
                  {/* *********************************************** Body ****************************** */}
                  <div className="modal-body relative p-4">
                    <div>
                      <label htmlFor="serviceName">Nom du service</label>
                      <input
                        type="text"
                        className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                        placeholder="Service"
                        value={serviceName}
                        onChange={(e) => setserviceName(e.target.value)}
                        required
                        id="serviceName"
                      />
                      {ifserviceName && (
                        <div className="empty_full">
                          Veuillez entrez le nom du service !
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="serviceDescrip">Description</label>
                      <textarea
                        className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                        value={serviceDescrip}
                        onChange={(e) => setserviceDescrip(e.target.value)}
                        placeholder="Décrire le service"
                        required
                        id="serviceDescrip"
                      />
                      {ifserviceDescrip && (
                        <div className="empty_full">
                          Veuillez décrire votre service !
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setserviceName("");
                        setserviceNameEdit("");
                        setserviceDescrip("");
                        setserviceDescripEdit("");
                        setserviceEditId(0);
                      }}
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      onClick={editService}
                    >
                      Editer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ************************************** Début suppression service toast **************************************** */}
            {serviceDeleteSuccess && (
              <div
                id="toast-success"
                className="flex items-center  fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">{serviceMsg}</div>
                <button
                  onClick={() => setserviceDeleteSuccess(false)}
                  className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-success"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
            {/* ************************************** Fin suppression service toast **************************************** */}

            {/* ***********************************<!-- Suppression de service Modal -->******************************************** */}
            <div
              className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
              id="deleteService"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                  {/* *********************************************** Body ****************************** */}
                  <div className="modal-body relative p-4">
                    <h4>Voulez-vous vraiment supprimer ce service ?</h4>
                  </div>
                  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-center p-4 border-t border-gray-200 rounded-b-md">
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                      data-bs-dismiss="modal"
                      id="serviceDeleteClose"
                      onClick={() => {
                        setserviceDeleteId(0);
                      }}
                    >
                      Non
                    </button>
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      onClick={deleteService}
                    >
                      Oui
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End service --> */}
          {/* Section galerie */}
          <div className="">
            <div className="drop-shadow-lg rounded-xl bg-white ">
              <div className="w-full flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold mb-2">Galerie</span>
                  {user.auth &&
                    user.userId === parseInt(userId) &&
                    (loader1 === true ? (
                      <img
                        src="/gitload.gif"
                        alt=""
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 cursor-pointer">
                        <label htmlFor="files" className="cursor-pointer">
                          <img
                            src="/add(2).png"
                            // src={`https://backend-skills.versatileskills.space/uploads/${val.profileImg}`}
                            // onClick={()=>{

                            // }}
                            className="h-8 w-8 object-cover"
                            alt=""
                          />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            id="files"
                            name="upload_file"
                            onChange={handleadd_image}
                          />
                        </label>
                      </div>
                    ))}
                </div>

                <div className="container px-2 py-2 mx-auto">
                  {!isEmpty(imageprofile) ? (
                    <div className="flex flex-wrap w-full hdm">
                      {imageprofile.map((val) => {
                        return (
                          <div
                            className="max-sm:w-full max-md:h-52 max-lg:w-1/2 max-lg:h-64 h-40 w-full"
                            key={val.id}
                          >
                            <div className="w-full h-full p-1 md:p-2 relative">
                              <img
                                alt="gallery"
                                className="block object-cover object-center w-full h-full rounded-lg"
                                src={`https://backend-skills.versatileskills.space/${val.image}`}
                              />
                              {user.auth &&
                                user.userId === parseInt(userId) && (
                                  <img
                                    src="/trash.png"
                                    className="w-4 h-4 cursor-pointer absolute top-2 right-2"
                                    alt="galerie"
                                    onClick={() => {
                                      deleteimg_galerie(val.id, val.image);
                                    }}
                                  />
                                )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <div className="text-black text-base">
                        <span>
                          Aucune image dans la galerie pour ce profile
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
