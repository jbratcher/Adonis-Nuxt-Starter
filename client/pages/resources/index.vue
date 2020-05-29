<template>
  <v-container>
    <v-row>
      <v-col>
        <template v-if="resources">
          <v-card>
            <h1>All Resources</h1>

            <!-- CRUD Table -->
            <template>
              <v-data-table
                :headers="headers"
                :items="resources"
                sort-by="id"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>Resources List</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2" v-on="on"
                          >New Item</v-btn
                        >
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItem.name"
                                  label="Name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItem.quantity"
                                  label="Quantity"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close"
                            >Cancel</v-btn
                          >
                          <v-btn color="blue darken-1" text @click="save"
                            >Save</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)">
                    mdi-delete
                  </v-icon>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
              </v-data-table>
            </template>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Resource",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "Name", value: "name" },
        { text: "Quantity", value: "quantity" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        quantity: 0
      },
      defaultItem: {
        name: "",
        quantity: 0
      }
    };
  },
  computed: {
    ...mapState("resource", ["resources"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.fetchResources();
    this.initialize();
  },
  methods: {
    ...mapActions("resource", [
      "createResource",
      "deleteResource",
      "fetchResources",
      "updateResource"
    ]),
    ...mapMutations("resource", [
      "editResourceInResourcesArray",
      "removeResourceFromResources"
    ]),
    initialize() {
      this.fetchResources();
    },
    editItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.resources.indexOf(item);
      if (confirm("Are you sure you want to delete this item?")) {
        this.deleteResource(item);
        this.removeResourceFromResources(index);
      }
    },
    // close edit dialog
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    // create a new item
    create() {},
    // save edit from dialog
    save() {
      if (this.editedIndex === -1) {
        this.createResource({
          name: this.editedItem.name,
          quantity: this.editedItem.quantity
        });
      } else {
        this.editResourceInResourcesArray({
          editedResource: this.editedItem,
          index: this.editedIndex
        });
        this.updateResource(this.editedItem);
      }

      this.close();
    }
  }
};
</script>

<style lang="scss"></style>
