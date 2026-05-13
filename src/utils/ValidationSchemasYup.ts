import * as Yup from "yup";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

export const validationSchemaStaff = Yup.object().shape({
  matricule: Yup.string()
    .min(4, "Le matricule doit contenir au moins 4 caractères")
    .max(8, "Le matricule doit contenir 8 caractères maximum")
    .required("Ce champ est obligatoire"),
  nom: Yup.string()
    .min(3, "Un nom doit contenir au moins 3 caractères")
    .required("Ce champ est obligatoire"),
  prenom: Yup.string()
    .min(3, "Un prénom doit contenir au moins 3 caractères")
    .required("Ce champ est obligatoire"),

  email: Yup.string()
    .required("Ce champ est obligatoire")
    .matches(emailRegex, "Veuillez entrer une adresse e-mail valide"),

  niveau: Yup.string()
    .oneOf(["L1", "L2", "L3", "M1", "M2"], "Veuillez choisir un niveau valide")
    .required("Ce champ est obligatoire"),

  parcours: Yup.string()
    .oneOf(
      ["IG", "GBD", "ASR", "GID", "OCC"],
      "Veuillez choisir un parcours valide"
    )
    .required("Ce champ est obligatoire")
    .test(
      "niveau-parcours",
      "Seuls les niveaux M1 et M2 peuvent être dans les parcours OCC et GID",
      function (value) {
        const { niveau } = this.parent;
        if (
          (value === "OCC" || value === "GID") &&
          niveau !== "M1" &&
          niveau !== "M2"
        ) {
          return false;
        }
        return true;
      }
    ),

  mdp: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Mot de passe est requis"),
  photo: Yup.string(),
  statut: Yup.string()
    .oneOf(["délégué", "organisateur"], "Veuillez choisir le statut")
    .required("Ce champ est obligatoire"),
});
export const validationSchemaParticipant = Yup.object().shape({
  nom: Yup.string()
    .min(3, "Un nom doit contenir au moins 3 caractères")
    .required("Ce champ est obligatoire"),
  prenom: Yup.string()
    .min(3, "Un prénom doit contenir au moins 3 caractères")
    .required("Ce champ est obligatoire"),

  email: Yup.string()
    .required("Ce champ est obligatoire")
    .matches(emailRegex, "Veuillez entrer une adresse e-mail valide"),

  niveau: Yup.string()
    .oneOf(["L1", "L2", "L3", "M1", "M2"], "Veuillez choisir un niveau valide")
    .required("Ce champ est obligatoire"),

  parcours: Yup.string()
    .oneOf(
      ["IG", "GBD", "ASR", "GID", "OCC"],
      "Veuillez choisir un parcours valide"
    )
    .required("Ce champ est obligatoire")
    .test(
      "niveau-parcours",
      "Seuls les niveaux M1 et M2 peuvent être dans les parcours OCC et GID",
      function (value) {
        const { niveau } = this.parent;
        if (
          (value === "OCC" || value === "GID") &&
          niveau !== "M1" &&
          niveau !== "M2"
        ) {
          return false;
        }
        return true;
      }
    ),

  photo: Yup.string().required("La photo est requise"),
});
