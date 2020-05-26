// global rules for form validation
export default {
  data() {
    return {
      checkboxRules: [
        v => !!v || 'This field is required',
        v => (v && v.length <= 144) || 'Name must be less than 144 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      shortTextRules: [
        v => !!v || 'This field is required',
        v => (v && v.length <= 144) || 'Name must be less than 144 characters'
      ],
      textRules: [
        v => !!v || 'This field is required',
        v => (v && v.length <= 300) || 'Name must be less than 300 characters'
      ],
      longTextRules: [
        v => !!v || 'This field is required',
        v => (v && v.length <= 1000) || 'Name must be less than 3000 characters'
      ],
      urlRules: [
        v => !!v || 'Url is required',
        v =>
          /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
            v
          ) || 'URL must be valid'
      ],
      affirmation: ['Yes', 'No']
    }
  }
}
