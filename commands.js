exports.cmds = [
  {
    name: "register",
    run: (args) => {
      let rtrn = "";
      firebase.auth().createUserWithEmailAndPassword(args[0], args[1]).catch((error) => {console.log(error); rtrn = "oopsie poopsie dare wuz an error contacc ewi da coda pweez"});
      if (rtrn.length == 0) {
        rtrn = "u created an account gj"
      }
      return rtrn;
    }
  }
];
