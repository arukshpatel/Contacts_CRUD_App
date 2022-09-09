const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
                                              firstName: {
                                                  type: String,
                                                  required: true
                                              },
                                              lastName: {
                                                  type: String,
                                                  required: true
                                              },
                                              phoneNumber: {
                                                  type: Number,
                                                  required: true,
                                              },
                                          })

const Contact = mongoose.model("ContactInfo", ContactSchema)
module.exports = Contact