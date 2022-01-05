<template>
  <div class="container">
    <div class="card card-container">
    <h1 class="login">Login</h1>
    <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
    <p id="profile-name" class="profile-name-card"></p>
    <form class="form-signin">
    <span id="reauth-email" class="reauth-email"></span>
    <input type="text" id="inputUsername" placeholder="Username" v-model="username" />
    <input type="password" id="inputPassword" placeholder="Password" v-model="password" />
    <button class="btn btn-lg btn-primary btn-block btn-signin" @click="login" type="submit">Sign in</button>
    <button class="btn btn-lg btn-primary btn-block btn-signin"  onclick="location.href='http://localhost:8080/#/Host'">Continue as host</button>
    </form>
    </div>
  </div>

</template>
<script>


export default {
  data() {
    return {
      username: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    login() {
      /*
      if(this.username === "admin1" && this.password==="123456"){
        this.$store.state.userLogged = true;
        this.$router.push('./Todos');

      }else{
        alert("Incorrect login or password");
      }
      */
      for (let i = 0; i < this.$store.state.users.length; i++) {
        if (this.username === this.$store.state.users[i].username && this.password === this.$store.state.users[i].password) {
          this.$store.state.userLogged = true;
          this.$router.push('./Todos');
        }

      }
      if(!this.$store.state.userLogged){
        alert("Incorrect login or password");

      }



    }
  }
};
</script>


<style>

/*
body,html{
  height: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgb(251, 252, 233), rgb(251, 252, 233));
  background-image: rgb(0, 252, 254);
}

*/

.login{
  padding-left: 85px;
  padding-bottom: 50px;
}

.card-container.card {
  max-width: 350px;
  padding: 40px 40px;
}

.btn {
  font-weight: 700;
  height: 36px;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

/*
 * Card component
 */
.card {
  background-color: #F7F7F7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

/*
 * Form styles
 */
.profile-name-card {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0 0;
  min-height: 1em;
}

.reauth-email {
  display: block;
  color: #404040;
  line-height: 2;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin #inputUsername,
.form-signin #inputPassword {
  direction: ltr;
  height: 44px;
  font-size: 16px;
}

.form-signin,
.form-signin input[type=password],
.form-signin input[type=text],
.form-signin button {
  width: 100%;
  display: block;
  margin-bottom: 10px;
  z-index: 1;
  position: relative;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin:focus {
  border-color: rgb(104, 145, 162);
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {
  background-color: rgb(104, 145, 162);
  padding: 0px;
  font-weight: 700;
  font-size: 14px;
  height: 36px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  border: none;
  -o-transition: all 0.218s;
  -moz-transition: all 0.218s;
  -webkit-transition: all 0.218s;
  transition: all 0.218s;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
  background-color: rgb(12, 97, 33);
}
</style>