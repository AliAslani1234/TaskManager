<template>
<div class="modal fade" id="TaskModal" tabindex="-1" role="dialog" aria-labelledby="TaskModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        
          <div class="wrapper">
            <h1>Add Task</h1>
                <form>
                <input v-model="taskName" type="text" placeholder="name">
                <textarea autocomplete="off" v-model="taskNote" placeholder="Your Text Here"></textarea>
                <form class="multi-range-field my-5 pb-5">
                 <label>month</label>
                <input v-model="multiRange3" autocomplete="off" id="multi3" class="multi-range" type="range" max="3" />
                <p>{{multiRange3}}</p>
                </form>
                <form class="multi-range-field my-5 pb-5">
                <label>weak</label>
                <input v-model="multiRange4" id="multi4" class="multi-range" type="range" max="4"/>
                <p>{{multiRange4}}</p>
                </form>
                <form class="multi-range-field my-5 pb-5">
                 <label>day</label>
                <input v-model="multiRange5" id="multi5" class="multi-range" type="range" max="30"/>
                <p>{{multiRange5}}</p>
                </form>
                <form class="multi-range-field my-5 pb-5">
                <label>hour</label>
                <input v-model="multiRange6" id="multi6" class="multi-range" type="range" max="6"/>
                <p>{{multiRange6}}</p>
                </form>
                </form>
                <div class="terms">
                <button @click="addTask()">Add</button>
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
import { ref , toRefs} from 'vue';
import {useRouter , useRoute} from "vue-router"



export default {
  name: "TaskModal",
  props :["id" ],
  setup(props) {
  const {id} =toRefs(props)
  const taskName = ref("")
  const taskNote = ref("")
  const multiRange3 = ref(0)
  const multiRange4 = ref(0)
  const multiRange5 = ref(0)
  const multiRange6 = ref(0)

 

  const addTask = ()=>{
    swal({
        icon : "warning" ,
        title : "آیا می خواهید تسک را به ثبت برسانید؟",
        buttons : ["خیر" , "بله"]
    })
    .then((Result)=>{
        const data = {
            name : taskName.value,
            note : taskNote.value,
            completed : false ,
            deadline : [multiRange3.value , multiRange4.value, multiRange5.value , multiRange6.value ]
        }
        if(Result){
            axios.post(`http://localhost:3000/api/v1/users/${id.value}/tasks` , data)
            .then((res)=>{
                console.log(res)
            })
            .then(()=>{
              swal({
                icon : "success" ,
                title : "تسک با موفقیت اضافه شد"
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


    return {
        multiRange3,
        multiRange4,
        multiRange5,
        multiRange6,
        addTask,
        taskName,
        taskNote
    };
  },
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
