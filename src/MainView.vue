<template>

    <div class="main">
    
    <h1>Customer support requests</h1>
      <form>
        <label for="description">Request description:</label>
        <input name="description" type="text" v-model="requestDescription"/>
        <label for="deadline">Request deadline:</label>
        <vuedatepicker  name="deadline" v-model="requestDeadline"></vuedatepicker>
        <!-- ".prevent" is used to prevent reloading the page when the button is clicked-->
        <!-- :disabled="!taskDesc" to disable the "Add Task" button if there is no text entered -->
        <button class="add-request" @click.prevent="addRequest" :disabled="!requestDescription || !requestDeadline">Add task</button>
        
      </form>
      
        <div class="requests-list" v-for="(request, index) in requests" :key="index"> 
        <div class="request" >{{ request.description }}</div>
        <div class="done" @click="deleteTask(index)">Done</div>
        </div> 
        
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "MainView",
  components: { VueDatePicker },
    
  data() {
    return {
      requests: [],
      requestDescription: "",
      requestDeadline: null,
    };
  },
  methods: {
    fetchPosts() {
      fetch(`http://localhost:5077/SupportRequest`)
        .then((response) => response.json())
        .then((data) => (this.posts = data))
        .catch((err) => console.log(err.message));
    },
    addRequest() {
      var data = {
        description: this.requestDescription,
        deadline: this.requestDeadline,
      };
      fetch("http://localhost:5077/SupportRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  },
  mounted() {
    this.fetchPosts();
    console.log("mounted");
  },
};
 

</script>