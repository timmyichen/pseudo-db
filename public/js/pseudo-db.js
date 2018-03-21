/* global $ */
var pdb = {
  upload: (secret, data) => {
    $.post(`http://pseudo-db.herokuapp.com/upload/${secret}`, data)
      .then(res => {
        console.log("Successfully uploaded data with secret", secret);
      },
      err => {
        console.log("error: ", err);
      });
  },
  download: (secret) => {
    return new Promise((resolve, reject) => {
      $.get(`http://pseudo-db.herokuapp.com/upload/${secret}`)
        .then(res => {
          resolve(res);
        },
        err => {
          console.log("error: ", err);
          reject(err);
        })
    });
  }
}