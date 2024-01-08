
<template>
  <section  style="background-color: #eee;">
  <div class="container py-5 h-100" >
    <div class="row"  >
      <div class="col-md-12 col-xl-4 mb-4" v-for="user in users" :key="user._id" >
        <div class="card" style="border-radius: 15px;" >
          <div class="card-body text-center">
            <div class="mt-3 mb-4">
              <img v-if="user.image != ''"   :src="`http://localhost:3000/${user.image}`"
                class="rounded-circle img-fluid" style="width: 100px; height:100px;" />
                <img v-else :src="baseImage"
                class="rounded-circle img-fluid" style="width: 100px; height:100px;" />
            </div>
            <h4 class="mb-2" >{{user.name}} {{user.lastName}}</h4>
            <p class="text-muted mb-4">@Programmer <span class="mx-2">|</span> <a
                href="#!">mdbootstrap.com</a></p>
            <div class="mb-4 pb-2">
              <!-- <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-facebook-f fa-lg"></i>
              </button> -->
              <button type="button" class="btn btn-outline-danger btn-floating">
                 <Icon type="button" @click="deleteUser(user._id , user.name , user.lastName)" icon="uiw:user-delete" ></Icon>
              </button>
              <!-- <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-skype fa-lg"></i>
              </button> -->
            </div>
            <button @click="userPage(user._id)" type="button" class="btn btn-primary btn-rounded btn-lg">
              User Page
            </button>
            <div class="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <p class="mb-2 h5">{{user.tasks.length}}</p>
                <p class="text-muted mb-0">Number of Tasks</p>
              </div>
              <div class="px-3">
                <p class="mb-2 h5">{{user.subs.length}}</p>
                <p class="text-muted mb-0">Number of Subs</p>
              </div>
              <div>
                <p class="mb-2 h5">{{user.role}}</p>
                <p class="text-muted mb-0">Role</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

</template>



  


<script>
import { useStore } from 'vuex';
import { Icon } from '@iconify/vue';
import Swal from 'sweetalert';
import axios from "axios"
import { onMounted, ref } from 'vue'
import swal from 'sweetalert';
import { useRoute , useRouter } from 'vue-router'
import { computed } from 'vue';
export default {
  name: "Home" ,
  components: {Icon},
  setup(){
    const baseImage = ref("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp")
    const store = useStore();
    const users = ref([])
    const route = useRoute()
    const router = useRouter()
    const userPage = (id)=>{
      router.push({name :"User" , params : {id} })
    }
    const deleteUser = (id , userName , lastName)=>{
      Swal({
         text: `آیا می خواهید ${userName} ${lastName} را حذف کنید؟`,
         icon: "warning",
        buttons: ["منصرف شدم!", "بله"],
      })
      .then((result)=>{
        if(result) {
         swal({
          text:`برای حذف  ${userName} ${lastName} نام او را در فیلد زیر وارد نمایید` ,
          content: "input",
         })
         .then((name)=>{
           console.log(userName + lastName)
            console.log(name)
          if(!name || name !== `${userName} ${lastName}`){
             swal({
              text : `نامی که وارد کردید هم خوانی ندارد` ,
              dangerMode: true,
            })
          }
          else {
               axios.post(`http://localhost:3000/api/v1/users/${id}`)
               .then((res)=>{
                swal({
                  text : res.data.msg,
                  icon : "success"
                }).then(()=>{
                    window.location.reload();
                })
                .catch((error)=>{
                  swal({
                    text : error.response.statusText  ,
                     dangerMode: true,
                  })
                })
               })
          }



         })
        }
      })
    }
   
    const userRole = computed(() => store.state.access.userRole);

    onMounted(()=>{
     axios.get("http://localhost:3000/api/v1/users" )
     .then((res)=>{
      console.log(store.state.tokenId)
      users.value = res.data.users
      console.log(res.data.users)
      console.log(store.state.userImage)
       
     })
     .catch((err)=>{
      console.log(err)
     })
    })
    

    return {
      users ,
      deleteUser,
      userPage,
      baseImage,
      userRole
    }
  }
}
</script>

<style scoped>
.phone-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.phoneIcon {
  margin-right: 10px;
}
.deleteIcon {
  position: relative;
  left: 250px;
  bottom: 50px;
  width: 30px;
  text-align: center;
  color: red;
}
.img{
  background-color: red;
  width: 287px;
  height: 200px;
}
.body {
  background-color:#6d5050 ;
}
</style>