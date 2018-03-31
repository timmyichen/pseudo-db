/* global $ */
var pdb = {
  upload: (secret, data) => {
    $.post(`https://pseudo-db.herokuapp.com/api/upload/${secret}`, { data })
      .then(res => {
        console.log("Successfully uploaded data with secret", secret);
      },
      err => {
        console.log("error: ", err);
      });
  },
  download: (secret) => {
    return new Promise((resolve, reject) => {
      $.get(`https://pseudo-db.herokuapp.com/api/download/${secret}`)
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