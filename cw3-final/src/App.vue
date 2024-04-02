<template>
    <div id="app">
      <div v-if="!isLoading">
        <section id="search-bar">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <h2>TheWayTo Education</h2>
              </div>
              <div class="col-md-7">
                <input class="form-control" type="search" placeholder="Search" aria-label="Search" v-on:keyup="searchLessons" v-model="searchTxt">
              </div>
              <div class="col-md-2 cart">
                <button class="btn btn-1 btn-info" v-bind:disabled="(cartItems.length <= 0)" v-on:click="updateShowProduct">
                  <p class="fa fa-shopping-cart mt-2" style="color: white;"></p> 
                  <span style="color: white">{{cartCount()}}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
  
        <section id="navigation">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <p>Home / Store</p>
              </div>
            </div>
          </div>
        </section>
  
        <section v-if="showProduct && lessons !== null" id="product">
          <Lessons :lessons="lessons" v-on:addLesson="addLessonToCart"></Lessons>
        </section>
  
        <section v-else id="check-out">
          <Checkout :cartItems="cartItems" v-on:removeLesson="removeLessonFromCart" v-on:checkOut="checkOut"></Checkout>
        </section>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </template>
  <script>
  import Lessons from './components/Lessons.vue'
  import Checkout from './components/Checkout.vue'
  
  export default {
    name: 'App',
    components: {
      Lessons,
      Checkout
    },
  data() {
  return {
    isLoading: true, // Add this line
    initialLessons: [],
    searchTxt: '',
    cartItems: [],
    showProduct: true,
    // other data properties...
  };
},

  methods: {
    addLessonToCart: function (addedLesson) {
          
            const lessonIndex = this.lessons.findIndex(lesson => lesson._id === addedLesson._id);
                this.lessons[lessonIndex].space -= 1;       
                this.addToCart( addedLesson);
             
        },
        
        updateShowProduct: function () {
            this.showProduct = !this.showProduct;
        },
        addToCart: function (lesson) {
            const itemIndex = this.cartItems.findIndex(item => item.lesson._id === lesson._id);
            if (itemIndex != -1) {
                this.cartItems[itemIndex].space += 1;
            } else {
                this.cartItems.push({space: 1, lesson: lesson });
            }
        },
        removeLessonFromCart: function (index) {
            this.cartItems[index].space = this.cartItems[index].space - 1;
            const lessonIndex = this.lessons.findIndex(lesson => lesson._id === this.cartItems[index].lesson._id);
            if (lessonIndex != -1) {
                this.lessons[lessonIndex].space += 1;
            }
            if (this.cartItems[index].space == 0) {
                this.cartItems.splice(index, 1);
            }

            if(this.cartItems.length == 0){
              this.showProduct = true;
            }

            console.log(this.cartItems);


        },
        cartCount: function(){
            let cartQuantity = 0;
            for (let index = 0; index < this.cartItems.length; index++) {
                cartQuantity += this.cartItems[index].space;
                
            }
            return cartQuantity;
        },
        searchLessons: function () {
    if (!this.searchTxt.trim()) {
        this.lessons = this.initialLessons; // Load all lessons if search text is empty
        return;
    }
    this.lessons = this.initialLessons.filter(lesson => 
        lesson.subject.toLowerCase().includes(this.searchTxt.toLowerCase()) ||
        lesson.location.toLowerCase().includes(this.searchTxt.toLowerCase())
    );
},
checkOut: function (checkOutName, checkOutNumber) {
    // Here, you might simulate a checkout process, e.g., validating input and then clearing the cart.
    console.log(`Checkout by ${checkOutName} with number ${checkOutNumber}`);
    this.cartItems = []; // Clear cart
    this.showProduct = true;
    this.$swal({
        title: "Check out successful",
        text: "Your order has been submitted",
        icon: "success",
    });
},
        fetchLesson: function (_id) {
            const lessonIndex = this.lessons.findIndex(lesson => lesson._id === _id);
            if (lessonIndex == -1) {
                return;
            }
            return this.lessons[lessonIndex];
        }
       
    },
    
    created() {
  fetch('/lesson.json')
    .then(response => response.json())
    .then(data => {
      this.initialLessons = data;
      this.lessons = data;
      this.isLoading = false; // add this line
    });
}}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
