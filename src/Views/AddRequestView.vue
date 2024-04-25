<template>
    <div class="main">
    
    <h1> Add a customer support request</h1>
    <form>
        <label for="description">Request description:</label>
        <textarea name="description" rows="4" cols="50" v-model="requestDescription"></textarea>
        <label for="deadline">Request deadline:</label>
        <vuedatepicker  id="datepicker" name="deadline" v-model="requestDeadline"></vuedatepicker>
      
        <button class="add-request" @click.prevent="submitForm" :disabled="!requestDescription || !requestDeadline">Add request</button>
        
      </form>

    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
export default {
  name: "AddRequestView",
  components: { 
    'vuedatepicker': VueDatePicker
  },
    
  data() {
    return {
      requestDescription: "",
      requestDeadline: null,
    };
  },
  methods: {
    submitForm() {
    this.addRequest();
    this.requestDescription = "";
    this.requestDeadline = null;
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
      .then((response) => response.json()) 
      .then((data) => {
        console.log(data); 
        this.fetchRequests();
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
    
  },
  mounted() {
    console.log("mounted");
  },
};

</script>

<style scoped>
form {
    margin: 20px auto 10px;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 100px;

}
form textarea {
    background-color: #f7f7f7;
    border: 1px solid #eee;
    margin-bottom: 15px;
    width: 100%;
    padding: 10px;
  
}
form button {
    padding: 10px 20px;
    margin-top: 20px;
    color: black;
    border-radius: 20px;
    width: 100px;
    text-align: center;
    background-color: rgb(96, 154, 230, 0.25);

}
form button:disabled {
  opacity: 0.4;
  cursor: no-drop;
}

</style>