// global rules for form validation
export default {
  data() {
    return {
      checkboxRules: [
        v => !!v || "This field is required",
        v => (v && v.length <= 144) || "Name must be less than 144 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      longTextRules: [
        v => !!v || "This field is required",
        v => (v && v.length <= 1000) || "Name must be less than 3000 characters"
      ],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 50) || "Name must be less than 50 characters"
      ],
      profileImageRules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Profile image size should be less than 2 MB!"
      ],
      shortTextRules: [
        v => !!v || "This field is required",
        v => (v && v.length <= 144) || "Name must be less than 144 characters"
      ],
      textRules: [
        v => !!v || "This field is required",
        v => (v && v.length <= 300) || "Name must be less than 300 characters"
      ],
      urlRules: [
        v => !!v || "Url is required",
        v =>
          /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
            v
          ) || "URL must be valid"
      ],
      affirmation: ["Yes", "No"]
    };
  }
};
