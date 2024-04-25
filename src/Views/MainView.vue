<template>

    <div class="main">
    
    <h1>Customer support requests</h1>
      
        <div class="requests-list" v-for="(request, index) in requests" :key="index"> 
        <div class="request-box" :class="isSoonOrPassedDeadline(request.resolutionDeadline) ? 'red' : 'blue'">
        <p id="description">{{ request.description }}</p>
        <p id="deadline" >Deadline: {{ formatDate(request.resolutionDeadline) }}</p>
        
        </div>
        <div class="done" @click="markAsResolved(request.id)">Done</div>
        </div> 
        
    </div>
</template>

<script>
export default {
  name: "MainView",
    
  data() {
    return {
      requests: [],
    };
  },
  methods: {
    fetchRequests() {
      fetch(`http://localhost:5077/SupportRequest`)
        .then((response) => response.json())
        .then((data) => {
        console.log(data); 
        this.requests = data;
        })
        .catch((err) => console.log(err.message));
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('de-DE', options).format(date);
    },
    markAsResolved(requestId) {
      fetch(`http://localhost:5077/SupportRequest/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        this.fetchRequests();
      })
        .catch((e) => {
          console.log(e);
        });
    },
    isSoonOrPassedDeadline(deadline) {
      const date = new Date(deadline);
      console.log(date);
      const now = new Date();
      const oneHourInMs = 60 * 60 * 1000;
      var result = date < now || (date - now <= oneHourInMs);
      console.log(result);
      return result;
    },
  },
  mounted() {
    this.fetchRequests();
    console.log("mounted");
  },
};
 

</script>

<style scoped>
.requests-list {
  width: 500px;
  margin: 0 auto;
  display: flex;
}
.request-box {
  padding: 15px;
  text-align: left;
  margin-bottom: 15px;
  margin-right: 5px;
  width: 100%;
  border-radius: 20px;
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
  border-radius: 20px;
  text-align: center; 
  line-height: 47px;
}
.red {
  background-color: #c35149;
}
.blue{
  background-color: rgba(96, 154, 230, 0.25);
}
.done:hover {
    background-color: #6e1812;
}


</style>
