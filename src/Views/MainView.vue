<template>

    <div class="main">
    
    <h1>Customer support requests</h1>
      <form>
        <label for="description">Request description:</label>
        <textarea name="description" rows="4" cols="50" v-model="requestDescription"></textarea>
        <label for="deadline">Request deadline:</label>
        <vuedatepicker  name="deadline" v-model="requestDeadline"></vuedatepicker>
      
        <button class="add-request" @click.prevent="addRequest" :disabled="!requestDescription || !requestDeadline">Add task</button>
        
      </form>
      
        <div class="requests-list" v-for="(request, index) in requests" :key="index"> 
        <div class="request-box" >
        <p>{{ request.description }}</p>
        <p>Deadline: {{ formatDate(request.resolutionDeadline) }}</p>
        
        </div>
        <div class="done" @click="deleteTask(index)">Done</div>
        </div> 
        
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "MainView",
  components: { 
    'vuedatepicker': VueDatePicker
  },
    
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
        .then((data) => {
        console.log(data); 
        this.requests = data;
        })
        .catch((err) => console.log(err.message));
    },
    addRequest() {
      var data = {
        Description: this.requestDescription,
        ResolutionDeadline:  new Date(this.requestDeadline.getTime() - (this.requestDeadline.getTimezoneOffset() * 60000)).toISOString().slice(0, -1)// remove 'Z'
        
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
        this.fetchPosts();
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('de-DE', options).format(date);
    },
  },
  mounted() {
    this.fetchPosts();
    console.log("mounted");
  },
};
 

</script>

<style scoped>



* {
  box-sizing: border-box;
}
h1{
  color: #21b813;
}
.main {
  text-align: center;
}
form {
  margin: 20px auto 10px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: left;

}
form textarea {
  background-color: #f7f7f7;
  border: 1px solid #eee;
  margin-bottom: 15px;

  padding: 10px;
  
}
form button {
  width: 90px;
  height: 46px;
  padding: 10px;
  background-color: #2196f3;
  color: #fff;
  border-color: transparent;
  cursor: pointer;
  float: left;
  margin-left: 5px;
  font-size: 16px;
  border-radius: 20px;
}
form button:disabled {
  opacity: 0.4;
  cursor: no-drop;
}
.requests-list {
  width: 500px;
  margin: 0 auto;
  display: flex;
}
.request-box {
  background-color: rgba(139, 195, 74, 0.25);
  padding: 15px;
  text-align: left;
  margin-bottom: 15px;
  margin-right: 5px;
  width: calc(100% - 86px);
  cursor: pointer;
  float: left;
}
.done {
  float: right;
  width: 80px;
  background-color: #cc372c;
  color: #fff;
  border-color: transparent;
  padding: 1px 10px;
  cursor: pointer;
  height: 48px;
  line-height: 51px;
  border-radius: 20px;
}

.done:hover {
    background-color: #6e1812;
}


</style>
