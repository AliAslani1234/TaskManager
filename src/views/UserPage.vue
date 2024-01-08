<template>

  <section style="background-color: #eee;">
  <div class="container py-5">
<!-- Modal -->
  <Modal :id="id" :userName ="userInfo.name" />
  <AddSubUserModal  :id="id"/>
  <TaskModal :id="id"/>
    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img v-if="userInfo.image != '' " :src="`http://localhost:3000/${userInfo.image}`" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;height:150px; margin-left:30px;">
              
            <img v-else :src="baseImage" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;height:150px; margin-left:30px;">

              <label for="fileInput" class="add-image-icon">
              <Icon type="button" icon="flat-color-icons:add-image" width="34" />
              </label>  
            <input type="file" id="fileInput"  style="display: none;" accept="image/*" @change="handleFileSelect" />
 
            <h5 class="my-3">{{userInfo.name}} {{userInfo.lastName}}</h5>
            <p class="text-muted mb-1">Full Stack Developer</p>
            <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
            <div class="d-flex justify-content-center mb-2">
              <button type="button" class="btn btn-primary">Follow</button>
              <button type="button" class="btn btn-outline-primary ms-1">Message</button>
            </div>
          </div>
        </div>
            <button v-if="clientRole === 'admin'" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddSubUserModal" style="margin-bottom: 4px; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center;">
            +
           </button>
          <div class="card mb-4 mb-lg-0">
            <div class="card-body p-0" style="height: 200px; overflow:auto;">
              <ul class="list-group list-group-flush rounded-3">
                <li v-for="sub in subs" :key="sub.id" class="li list-group-item d-flex justify-content-between align-items-center p-3">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-globe fa-lg text-warning"></i>
                    <div style="margin-right: 20px;">
                      <Icon v-if="clientRole === 'admin'" @click="deleteSub(sub.name , sub.lastName , sub._id)" icon="uiw:user-delete" color="red" type="button" />
                    </div>
                    <div>
                      <Icon v-if="clientRole === 'admin'" @click="subUserPage(sub._id)" icon="emojione:information" color="blue" type="button"/>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="mb-0">{{sub.name}} {{sub.lastName}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-8">
               <p class="text-muted mb-0">{{userInfo.name}} {{userInfo.lastName}}</p>
              </div>
              <div class="col-sm-1">
                 <Icon 
                icon="ei:pencil" color="gray" width="30" class="edit-icon"
                type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                />
              </div>
             </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-8">
                <p class="text-muted mb-0">example@example.com</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phone</p>
              </div>
              <div class="col-sm-8">
                <p class="text-muted mb-0">{{userInfo.phoneNumber}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Role</p>
              </div>
              <div class="col-sm-8">
                <p class="text-muted mb-0">{{userInfo.role}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-4 mb-md-0">
            <Icon v-if="clientRole === 'admin'"  type="button" icon="iconoir:plus" width="20" style="margin-left:380px; margin-top:10px"
            data-bs-toggle="modal" data-bs-target="#TaskModal" 
            />  
            <p class="mb-4" style="margin-left: 20px; margin-top: 20px;">
              <span class="text-primary font-italic me-1">assignment</span> Project Status
            </p>
              <div class="card-body" v-for="task in tasks" :key="task._id">
                <p class="mb-1" style="font-size: .77rem;">{{task.name}}</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 70%" aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
          
                <Icon v-if="clientRole === 'admin'" @click="deleteTask(task._id ,  task.name)" icon="basil:cross-outline" type="button" color="red" class="delete-task"  width="20"/>
                <Icon @click="taskPage(task._id )" type="button" icon="mdi-light:arrow-right" width="20" class="dots-icon" />

              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-4 mb-md-0">
              <div class="card-body">
                <p class="mb-4"><span class="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p class="mb-1" style="font-size: .77rem;">Web Design</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 89%" aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
                <div class="progress rounded" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
                <div class="progress rounded mb-2" style="height: 5px;">
                  <div class="progress-bar" role="progressbar" style="width: 66%" aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
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
import TaskModal from "../components/Modal/TaskModal.vue"
import AddSubUserModal from "../components/Modal/AddSubUserModal.vue"
import Modal from "../components/Modal/Modal.vue"
import { useStore } from 'vuex';
import { onMounted, ref } from 'vue'
import { useRoute , useRouter } from 'vue-router'
import axios from 'axios'
import { Icon } from '@iconify/vue';
import swal from 'sweetalert'

export default {
  components: {Icon , Modal , AddSubUserModal , TaskModal},
  setup(){
    const baseImage = ref("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" )
    const fileInputRef = ref(null);
    const router = useRouter()
    const subs = ref([])
    const tasks = ref([])
    const route = useRoute()
    const store = useStore()
    const clientRole = ref(store.state.userRole)
    const id = ref(route.params.id)
    const userInfo = ref({
      name : "",
      lastName : "",
      phoneNumber  : "",
      role : "", 
      image : ""
    })

    const subUserPage = (id)=>{
      router.push({name : "User" , params : {id}})
      .then(()=>{
        location.reload()
      })
    }

    const deleteSub = (name ,lastName , subId )=>{
      swal({
        icon : 'warning',
        title : `می خواهید ${name} ${lastName} را حذف کنید؟`,
        text : `توجه داشته باشید که با حذف کردن ${name} ${lastName} درواقع اورا از زیر مجموعه ${userInfo.value.name} ${userInfo.value.lastName} در می آورید و این کاربر همچنان در لیست کاربر های شرکت حضور دارد`,
        buttons : ["خیر" , "بله"]
      })
      .then((Result)=>{
        if(Result){
          axios.delete(`http://localhost:3000/api/v1/users/${id.value}/subusers/${subId}`)
          .then((res)=>{
            swal({
              icon : "success",
              text : res.data.msg
            })
            .then(()=>{
              location.reload()
            })
          })
          .catch((err)=>{
            swal({
              icon : "error",
              text : err.response.data.msg
            })
          })
        }
      })
    }

    const taskPage = (taskId)=>{
      const userId = id.value
      router.push({name : "Task" , params : {taskId, userId}})
    }

    const deleteTask = (id , name)=>{
      swal({
        icon : "warning" ,
        title : `مطمعن هستید که می خواهید ${name} را حذف کنید ؟`,
        buttons : ["منصرف شدم" , "بله"]
      })
      .then((Result)=>{
        if(Result){
          axios.post(`http://localhost:3000/api/v1/users/task/delete/${id}`)
          .then((res)=>{
            swal({
              icon : 'success',
              title : res.data.msg
            })
            .then(()=>{
              location.reload()
            })
            .catch((err)=>{
              swal({
                icon : "error",
                title : err.response.data.msg
              })
            })
          })
        }
      })
    }

    const handleFileSelect = async (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

      if (files.length > 0) {
        const selectedFile = files[0];
        console.log("Selected file:", selectedFile);

        const fd =  new FormData()
        fd.append("image" , selectedFile)
        fd.append("name" , userInfo.value.name)
        fd.append("lastName" , userInfo.value.lastName)
        fd.append("phoneNumber" , userInfo.value.phoneNumber)
        try {
            const editProfile = await axios.post(`http://localhost:3000/api/v1/users/update/${id.value}`, fd, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res)=>{
            swal({
              icon : "success",
              title : "عکس با موفقیت اضافه شد"
            })
            .then(()=>{
              if(clientRole.value === 'admin'){
                store.dispatch('setUserImage' , {image : res.data.user.image})
              }
            })
            .finally(()=>{
              location.reload()
            })
          })
        } catch (error) {
          console.log(error)
        }
 
      }
    };
    
    onMounted(()=>{
      
      axios.get(`http://localhost:3000/api/v1/users/${id.value}`)
      .then((res)=>{
        userInfo.value.name = res.data.user.name
        userInfo.value.lastName = res.data.user.lastName
        userInfo.value.phoneNumber = res.data.user.phoneNumber
        userInfo.value.role = res.data.user.role
        userInfo.value.image = res.data.user.image
        subs.value = res.data.user.subs
        tasks.value = res.data.user.tasks
      })
       .catch((err)=>{
        console.log(err)
       })
    })
    return {
      id,
      userInfo,
      subs,
      subUserPage,
      deleteSub,
      tasks,
      taskPage,
      deleteTask,
      fileInputRef,
      handleFileSelect,
      baseImage,
      clientRole
    }
  }
}
</script>

<style>
.subs{
  padding: 3px;
}
.dots-icon{
  position: relative;
  bottom: 50px;
  left: 350px;
}
.delete-task{
  position: relative;
  bottom: 49px;
  left: 340px;
}
.add-image-icon{
  position: relative;
  top: 70px;
  right: 20px;
}
</style>