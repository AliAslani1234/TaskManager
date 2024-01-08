<template>
  <section class="vh-100" style="background-color: #eee;">
    <EditTaskModal :taskId="taskId" :userId="userId"/>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card mb-5" style="border-radius: 15px;">
            <div class="card-body p-4">
              <h3 class="mb-3">{{taskInfo.name}}</h3>
              <p class="small mb-0">
                <i class="far fa-star fa-lg"></i> <span class="mx-2">|</span> Created by
                <strong>MDBootstrap</strong> on 11 April , 2021
              </p>
              <hr class="my-4">
              <div class="d-flex justify-content-start align-items-center">
                <p class="mb-0 text-uppercase"><i class="fas fa-cog me-2"></i><span @click="description()" type="button" class="text-muted small">Description</span></p>
                <Icon @click="description()" type="button" icon="arcticons:simple-clipboard-editor" color="dark" width="21" />
                <p v-if="clientRole === 'admin'" class="mb-0 text-uppercase"><i class="fas fa-link ms-4 me-2"></i> <span type="button" class="text-muted small">edit task</span></p>
                <Icon 
                 data-bs-toggle="modal" data-bs-target="#EditTaskModal" 
                 type="button"  icon="tabler:edit" color="gray" width="21" />
                <p class="mb-0 text-uppercase"><i class="fas fa-ellipsis-h ms-4 me-2"></i> <span class="text-muted small" style="margin-left: 40px;">{{userInfo.name}} {{userInfo.lastName}}</span>
                  <span class="ms-3 me-4">|</span></p>
                <a href="#!">
                  <img v-if="userInfo.image != ''" :src="`http://localhost:3000/${userInfo.image}`"
                  class="img-fluid rounded-circle me-3" width="35">


                  <img v-else :src="baseImage" alt="avatar"
                    class="img-fluid rounded-circle me-3" width="35">
                    
                </a>
                
              </div>
            </div>
          </div>

          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-4">
              <h3 class="mb-3">Company Culture</h3>
              <p>{{taskInfo.deadLine}}</p>
              <p class="small mb-0">
                <i class="fas fa-star fa-lg text-warning"></i> <span class="mx-2">|</span> Public <span class="mx-2">|</span> Updated by
                <strong>MDBootstrap</strong> on 11 April , 2021
              </p>
              <hr class="my-4">
              <!-- Progress bar added here -->
              <div class="progress my-3">
                <div class="progress-bar bg-success" role="progressbar" :style="{ width: cultureProgress + '%' }"
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <!-- End of Progress bar -->
              <div class="d-flex justify-content-start align-items-center">
                <p class="mb-0 text-uppercase"><i class="fas fa-cog me-2"></i> <span class="text-muted small">settings</span></p>
                <p class="mb-0 text-uppercase"><i class="fas fa-link ms-4 me-2"></i> <span class="text-muted small">program link</span></p>
                <p class="mb-0 text-uppercase"><i class="fas fa-ellipsis-h ms-4 me-2"></i> <span class="text-muted small">program link</span>
                  <span class="ms-3 me-4">|</span></p>
                <a href="#!">
                  <img v-if="userInfo.image != ''" :src="`http://localhost:3000/${userInfo.image}`"
                  class="img-fluid rounded-circle me-3" width="35">


                  <img v-else :src="baseImage" alt="avatar"
                    class="img-fluid rounded-circle me-3" width="35">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>




<script>
import {useStore} from "vuex"
import EditTaskModal from "../components/Modal/EditTaskModal.vue"
import { Icon } from '@iconify/vue';
import { useRoute } from "vue-router";
import { onMounted, ref } from 'vue';
import axios from 'axios';
import swal from 'sweetalert';





export default {
  components: {
    Icon,
    EditTaskModal
  },
  setup() {
    const store = useStore()
    const clientRole = ref(store.state.userRole)
    const baseImage = ref("https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp")
    const route = useRoute();
    const cultureProgress = ref(100);
    const userId = ref(route.params.userId);
    const taskId = ref(route.params.taskId);
    const taskInfo = ref({
      name: "",
      note: "",
      completed: false
    });
    const taskDeadline = ref({
      month: null,
      week: null,
      day: null,
      hour: null
    });

    const calculateDeadline = () => {
      const monthMin = taskDeadline.value.month * 43200;
      const weekMin = taskDeadline.value.week * 1080;
      const dayMin = taskDeadline.value.day * 1440;
      const hourMin = taskDeadline.value.hour * 60;

      const time = (monthMin + weekMin + dayMin + hourMin)/100 * 60 * 1000;

      return time;
    };

    const description = ()=>{
      swal({
        icon : "info",
        text : taskInfo.value.note
      })
    }
  // const time = calculateDeadline()

let number = 1

const runCode = () => {
  if(cultureProgress.value !== -4 ) {
if(number === 1) {
cultureProgress.value = cultureProgress.value + 4;
  }
  number ++;

  console.log("time");
  const nextInterval = calculateDeadline();
  cultureProgress.value--;
  console.log("cultureProgress.value" , cultureProgress.value)
  setTimeout(runCode, nextInterval);
  }
  else if(cultureProgress.value === 4){
    swal({
      icon : "error",
      text : "تمومه"
      
    })
  }
};


    



    const userInfo = ref({
      name: "",
      lastName: "",
      image : ""
    });

 

    onMounted(() => {
      console.log("image" , userInfo.value.image)
      runCode()
      userId.value = route.params.userId;
      taskId.value = route.params.taskId;
      axios.get(`http://localhost:3000/api/v1/users/${userId.value}/task/${taskId.value}`)
        .then((res) => {
          taskInfo.value.name = res.data.task.name;
          taskInfo.value.completed = res.data.task.completed;
          taskInfo.value.note = res.data.task.note
          taskDeadline.value.month = res.data.task.deadline[0];
          taskDeadline.value.week = res.data.task.deadline[1];
          taskDeadline.value.day = res.data.task.deadline[2];
          taskDeadline.value.hour = res.data.task.deadline[3];
 
          console.log(calculateDeadline());
          return axios.get(`http://localhost:3000/api/v1/users/${userId.value}`)
            .then((res) => {
              console.log(res);
              userInfo.value.name = res.data.user.name;
              userInfo.value.lastName = res.data.user.lastName;
              userInfo.value.image = res.data.user.image
            });
        })
        .catch((error) => {
          console.error(error);
        });
    });


    return {
      cultureProgress,
      userId,
      taskId,
      taskInfo,
      userInfo,
      taskDeadline,
      description,
      baseImage,
      clientRole
    };
  }
};
</script>

<style>

</style>
