import { Server } from "ssh2"

new Server({
    // TODO: Add host keys
    hostKeys: []
}, (client) => {

})
// TODO: Listen on env variables, and set port and url ahead of time
.listen(0, '127.0.0.1', function() {
  console.log('Listening on port ' + 0);
});