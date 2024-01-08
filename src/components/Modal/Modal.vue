<template>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
          <div class="wrapper">
    <h1>edit user</h1>
    <form>
      <input type="text" v-model="name" placeholder="name">
      <input type="text" v-model="lastName" placeholder="lastName">
      <input type="text" v-model="phoneNumber" placeholder="phonenumber">
       <select  class="form-select custom-select" v-model="role" aria-placeholder="role">
         <option value="user" >user</option>
         <option value="admin">admin</option>
       </select>
    </form>
  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button @click="editUser()" type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script> 
import { onMounted, ref , toRefs  } from 'vue'
import axios from 'axios'
import swal from 'sweetalert'
export default {
    name : "Modal",
    props :["id" , "userName"],
    setup(props){
      
      const {id , userName} =toRefs(props)
      const name = ref("")
      const lastName = ref("")
      const phoneNumber = ref("")
      const role = ref("")
      const editUser = ()=>{
        console.log(id.value)
        swal({
          icon : "info",
          text : `تغییرات برای ${userName.value} ذخیره شود؟`,
          buttons : ["منصرف شدم","بله"]
        })
        .then((result)=>{
          if(result){
            const data = {
              name : name.value ,
              lastName : lastName.value ,
              phoneNumber : phoneNumber.value,
              role : role.value
            }
            axios.post(`http://localhost:3000/api/v1/users/update/${id.value}`, data)
            .then((res)=>{
              console.log(res)
              swal({
                icon : "success",
                text : res.data.msg

              })
              .then(()=>{
               
              })
            })
            .catch((err)=>{
              console.log(err)
              swal({
                icon : "error" ,
                text : err.response.data.msg
              })
            })
          }
        })
      }
      
   
      return {
        name,
        lastName,
        phoneNumber,
        role,
        editUser
      }
    }

   
}
</script>

<style scoped>
  .wrapper{
  width: 330px;
    padding: 2rem 1rem;
    margin: 50px auto;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 20px 35px rgba(0,0,0,0.1);
}

h1{
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
button:hover{
  background: rgba(17, 107, 143, 0.877);
}
input:focus{
  border: 1px solid rgb(192, 192, 192);
}
.terms{
  margin-top: 0.2rem;

}
.terms input{
  height: 1em;
  width: 1em;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 6px;
}
.terms label {
  font-size: 0.7rem;
}
.terms a{
  color: rgb(17,107,143);
  font-weight: 700;
  text-decoration: none;
}
.member{
  font-size: 0.8rem;
  margin-top: 1.4rem;
  color: #636363;
}
.member a{
  color: rgb(17,107,143);
  text-decoration: none;
  font-weight: 700;
}
</style>