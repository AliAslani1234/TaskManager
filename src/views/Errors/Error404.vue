<template>
  <div id="container">
    <div class="content">
        <h2>404</h2>
        <h4>opps! page not found </h4>
        <p>the page you were looking for doesnt exist.you may have mystyped the address or the page may have moved.</p>
        <a v-show="clientRole === 'admin'" href="/home">Back to Home</a>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    setup(){
        const store = useStore()
        const clientRole = store.state.userRole

        return {
            clientRole
        }
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}
body {
    background: linear-gradient(45deg,#8500ff,#5acaff);
}
#container {
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #151729;
    border-radius: 10px;
    box-shadow: 0 15px 30px rgba(0,0,0,0.5);
}
h2 {
    color: white;
}
h4 {
    color: rgb(105, 99, 99);
}

p {
    color: rgb(105, 99, 99);
}

a{
    text-decoration: none;
}
</style>