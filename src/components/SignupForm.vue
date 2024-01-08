<template>
  <div class="wrapper">
    <h1>Sign Up</h1>
    <form>
      <input type="text" placeholder="name" v-model="name" required>
      <p v-if="Object.keys(errors).length">{{errors.name}}</p>
      <input type="text" placeholder="lastName" v-model="lastName">
       <p v-if="Object.keys(errors).length">{{errors.lastName}}</p>
      <input type="text" placeholder="phoneNumber" v-model="phoneNumber">
      <p v-if="Object.keys(errors).length">{{errors.phoneNumber}}</p>
       <select  class="form-select custom-select"  v-model="role">
         <option value="user" >user</option>
         <option value="admin">admin</option>
      </select>
       <input type="password" placeholder="password" v-model="password">
       <p v-if="Object.keys(errors).length">{{errors.password}}</p>
    </form>
    <div class="terms">
      <input type="checkbox" >
      <label>I agree to these <a href="/Terms-Conditions">terms and conditions</a></label>
      <p v-if="Object.keys(errors).length">{{ errors.agree }}</p>
      <button @click="signUp()">Sign up</button>
    </div>
    <div class="member">
      already have an account?? <a href="/authentication/login">Login here</a>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import axios from "axios";
import swal from 'sweetalert';
import SignupValidationSchema from '../validation/SignupValidationSchema';
import { ref } from 'vue';
import {useRouter , useRoute} from "vue-router"
export default {
  name: "SignupForm",
  setup() {
    const role = ref("user")
    const store = useStore();
    const router = useRouter()
    const phoneNumber = ref("")
    const lastName = ref("");
    const name = ref("")
    const password = ref("")
    const errors = ref({});

    const signUp = () => {
      
      const data = {
        name : name.value , 
        lastName : lastName.value , 
        phoneNumber : phoneNumber.value,
        password : password.value,
        role : role.value
      };

      SignupValidationSchema
        .validate(data, { abortEarly: false })
        .then(() => {
          // Reset errors on successful validation
          errors.value = {};

          // Proceed with the login request
          axios
            .post('http://localhost:3000/api/v1/Auth/signUp', data, {
              withCredentials: true,
            })
            .then((res) => {
                
               const authToken = res.data.token
                 store.dispatch('auth/signUp', res.data.user);
                 store.dispatch('jwt/setAuthToken', authToken);
                 console.log(res);
              swal({
                icon: "success",
                text: res.data.message,
              }).then(()=>{
                 router.push({ name: "Home" });
              })
            })
            .catch((err) => {
              console.log(err);
              swal({
                icon: "warning",
              });
            });
        })
       .catch((validationErrors) => {
  // Handle validation errors
        const formattedErrors = {};
        validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
        });

  // Update errors ref to trigger reactivity
      errors.value = formattedErrors;
      });
    };

    return {
      signUp,
      lastName,
      password,
      name,
      phoneNumber,
      errors,
      role
    };
  },
};
</script>


<style scoped>
.wrapper {
  width: 330px;
  padding: 2rem 1rem;
  margin: 50px auto;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #07001f;
  margin-bottom: 1.2rem;
}

form input {
  width: 92%;
  outline: none;
  border: 1px solid #fff;
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 20px;
  background: #e4e4e4;
}

.custom-select {
  width: 150px; 
  position: relative;
  left: 11px;
  height: 48px;
  outline: none;
  border: 1px solid #fff;
  padding: 12px 10px;
  border-radius: 20px;
  background: #e4e4e4;
  color: #636363;
  margin-bottom: 20px;
  text-align: center;
}

button {
  font-size: 1rem;
  margin-top: 1.8rem;
  padding: 10px 0;
  border-radius: 20px;
  outline: none;
  border: none;
  width: 92%;
  color: #fff;
  background: rgb(17, 107, 143);
  cursor: pointer;
}

button:hover {
  background: rgba(17, 107, 143, 0.877);
}

input:focus {
  border: 1px solid rgb(192, 192, 192);
}

.terms {
  margin-top: 0.2rem;
}

.terms input {
  height: 1em;
  width: 1em;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 6px;
}

.terms label {
  font-size: 0.7rem;
}

.terms a {
  color: rgb(17, 107, 143);
  font-weight: 700;
  text-decoration: none;
}

.member {
  font-size: 0.8rem;
  margin-top: 1.4rem;
  color: #636363;
}

.member a {
  color: rgb(17, 107, 143);
  text-decoration: none;
  font-weight: 700;
}
p{
  color: rgb(231, 115, 115);
  font-size: 0.9rem;
  position: relative;
}
</style>
