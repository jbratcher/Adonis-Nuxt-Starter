export default function({ store, error }) {
  if (!store.state.authUser) {
    this.$auth.redirect("/login");
  }
}
