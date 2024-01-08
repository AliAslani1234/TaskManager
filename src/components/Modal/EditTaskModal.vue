<template>
<div class="modal fade" id="EditTaskModal" tabindex="-1" role="dialog" aria-labelledby="TaskModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        
          <div class="wrapper">
            <h1>Edit Task</h1>
                <form>
                <input v-model="taskInfo.name" type="text" placeholder="name">
                <textarea autocomplete="off" v-model="taskInfo.note" placeholder="Your Text Here"></textarea>
                <form class="multi-range-field my-5 pb-5">
                 <label>month</label>
                <input v-model="taskDeadline.month" autocomplete="off" id="multi3" class="multi-range" type="range" max="3" />
                <p>{{taskDeadline.month}}</p>
                </form>
                <form class="multi-range-field my-5 pb-5">
                <label>weak</label>
                <input v-model="taskDeadline.weak" id="multi4" class="multi-range" type="range" max="4"/>
                <p>{{taskDeadline.weak}}</p>
                </form>
                <form class="multi-range-field my-5 pb-5">
                 <label>day</label>
                <input v-model="taskDeadline.day" id="multi5" class="multi-range" type="range" max="30"/>
                <p>{{taskDeadline.day}}</p>
                </form>
                <form class="multi-range-field my-5 pb-5">
                <label>hour</label>
                <input v-model="taskDeadline.hour" id="multi6" class="multi-range" type="range" max="6"/>
                <p>{{taskDeadline.hour}}</p>
                </form>
                </form>
                <div class="terms">
                <button @click="editTask()">Edit</button>
                </div>
            </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import swal from 'sweetalert';
import { onMounted, ref , toRefs} from 'vue';
import {useRouter , useRoute} from "vue-router"



export default {
  name: "EditTaskModal",
  props :["taskId" , "userId"],
  setup(props) {
  const {taskId , userId} =toRefs(props)
  const taskInfo = ref({
    name : "",
    note : ""
  })
  const taskDeadline = ref({
    month : null,
    weak : null,
    day:null,
    hour : null
  })
  const editTask = ()=>{
    swal({
        icon : "warning" ,
        title : `می خواهید تسک را ورایش کنید؟`,
        buttons : ["منصرف شدم" , "بله"]
    })
    .then((Result)=>{
        
        if(Result){
              const data = {
                name : taskInfo.value.name,
                note : taskInfo.value.note,
                completed : false,
                deadline : [
                  taskDeadline.value.month
                 , taskDeadline.value.weak
                  ,taskDeadline.value.day
                  ,taskDeadline.value.hour
                       ]
              }
            axios.post(`http://localhost:3000/api/v1/users/task/${taskId.value}` , data )
            .then((res)=>{
                swal({
                  icon : 'success',
                  title : "تسک با موفقیت ویرایش گردید"
                })
                .then(()=>{
                  location.reload()
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    })
  }

 onMounted(()=>{
  
    axios.get(`http://localhost:3000/api/v1/users/${userId.value}/task/${taskId.value}`)
    .then((res)=>{
        taskInfo.value.name = res.data.task.name
        taskInfo.value.note = res.data.task.note
        taskDeadline.value.month = res.data.task.deadline[0]
        taskDeadline.value.weak = res.data.task.deadline[1]
        taskDeadline.value.day = res.data.task.deadline[2]
        taskDeadline.value.hour = res.data.task.deadline[3]
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
 })


  return {
    editTask,
    taskInfo,
    taskDeadline
  }

  }
}

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
form textarea {
  width: 92%;
  height: 130px;
  outline: none;
  border: 1px solid #fff;
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 20px;
  background: #e4e4e4;
}
form.multi-range-field input[type="range"] {
  width: 92%;
  padding: 0;
}


</style>
