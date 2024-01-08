<template>
<AddSubUserModalVue/>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/home">Home</a>
        </li>
        <li class="nav-item">
          <a v-show="clientRole === 'admin'" class="nav-link"  >
            <button class="add-btn" data-bs-toggle="modal" data-bs-target="#AddUserModal">Add++</button>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li @click="logOut" class="nav-item">
          <a class="nav-link " href="#" tabindex="-1" aria-disabled="true">Logout</a>
        </li>
      </ul>
    </div>
    <div @click="clientPage(clientId)"  @mouseleave="resetIcon" @mouseover="icon" class="profile">
      <img v-show="!clientImage" class="profile-image" :src="baseImage">
      <img v-show="clientImage"  class="profile-image" :src="`http://localhost:3000/${clientImage}`">
      <div class="user-icon">
        <Icon v-show="showIcon" icon="eva:log-in-fill" width="34" />
        <Icon v-show="!showIcon"  type="button" icon="ep:user" width="30" />
      </div>  
    </div>
  </div>
</nav>
  <router-view/>
</template>

<script>
import {useRouter} from "vue-router"
import { Icon } from '@iconify/vue';
import {useStore} from "vuex"
import AddSubUserModalVue from '@/components/Modal/AddUserModal.vue'
import { ref } from 'vue'
import swal from 'sweetalert';
import { Button } from 'bootstrap';
export default {
components : {AddSubUserModalVue , Icon,},
name : "Main" ,
setup(){
  const baseImage = ref("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp")
  const store = useStore()
  const router = useRouter()
  const clientRole = store.state.userRole
  const clientImage = store.state.userImage
  const clientId = store.state.userId
  const showIcon = ref(false)
  const icon = ()=>{
    showIcon.value = true
  }
  const resetIcon = ()=>{
    showIcon.value = false
  }
  const clientPage = (id)=>{
    router.push({name : "User" , params : {id}})
  }
  const logOut = ()=>{
    swal({
      icon : 'warning' ,
      title : 'می خواهید خارج شوید؟'
    })
    .then(()=>{
      store.dispatch('cleareTokenId')
    })
    .then(()=>{
      location.reload()
    })
    
  }
  return {
    clientRole,
    baseImage,
    clientImage,
    icon,
    showIcon,
    resetIcon,
    clientId,
    clientPage,
    logOut,

  }
}
}
</script>

<style scoped> 
  .add-btn{
    border-radius: 4px;
    background-color: white;
    border: 1px solid grey;
  }
  .add-btn:hover { 
  border: 1px solid black;
  transition: 0.3s;
  }

  .profile {
    border: 1px solid rgb(235, 225, 225);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 41px ;
    width: 100px;
    position: relative;
    right: 40px;
    background-color: #ECEDFF;
    cursor: pointer;
  }

  .profile:hover .user-icon {
   margin-left: 10px;
   transition: 0.3s;
  }

  .profile-image{
     width: 40px;
     height: 40px;
     margin-bottom: 5px;
     border-radius: 20px;
     margin-left: 58px;
  }
  .user-icon {
    position: relative;
    bottom: 40px;
    left: 6px;
  }
</style>