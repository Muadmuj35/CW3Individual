<template>

      <div class="container">
                <div class="row">
                    <div class="col-md-2">
                        <div class="dropdown show drop-down-1">
                            <p>Sort by</p>
                            <select class="btn select-btn-1 btn-info dropdown-toggle" style="width: 100%"  v-model="attribute">
                                <option v-for="(sortAttribute, key) in sortAttributes" :key="sortAttribute" v-bind:value="sortAttribute">{{ key }}</option>
                            </select>

                        </div>

                        <div class="dropdown show drop-down-2">
                            <select class="btn select-btn-2 btn-info dropdown-toggle" style="width: 100%" v-model="order">
                                <option v-for="(sortOrder, key) in sortOrders" :key="sortOrder" v-bind:value="sortOrder">{{ key }}</option>
                            </select>
                        </div>
                    </div>
                   <div class="col-md-10">
                      
                        <div v-if="(lessons.length > 0)" class="row grid-1">

                            
                            <div v-for="(lesson) in sortedLessons" :key="lesson._id" class="col-md-4" style="margin-bottom: 20px;">
                                <div class="col-md-12 subject-1">
                                    <div class="row">
                                        <div class="col-md-6 subject-box">
                                            <P>Subject: {{lesson.topic}}<br> Location: {{lesson.location}}<br> Price: <span>&#163;{{lesson.price}}</span><br>
                                                Spaces: {{lesson.space}} <br>  Icon: <span v-bind:class="lesson.icon"></span></P>
                                                
                                               
                                        </div>
                                        <div class="col-md-6">
                                            <img v-bind:src="`${lesson.image}`" alt="" style="width: 100px; height: 100px; margin-top: 20px">
                                        </div>
                                    </div>
                                    <button v-bind:disabled="(lesson.space <= 0)" v-on:click="addLesson(lesson)" type="button" class="btn btn-1 btn-info" style="width: 100%">Add to
                                        Cart</button>
                                </div>
                            </div>
                            

                           

                        </div>
                        <div v-else class="row grid-1">
                            <p style="margin: auto;">No result found</p>
                        </div>
                    </div>
                </div>

            </div>
    
</template>

<script>

export default {
    name: 'Lessons',
    props: ['lessons'],
    
    methods: {
        addLesson: function (lesson) {
             this.$emit('addLesson', lesson);
        },
    },
    data() {
        return {
           
        order: 'asc',
        attribute: 'subject',
        sortOrders: {
            Ascending: 'asc',
            Descending: 'desc'
        },
        sortAttributes: {
            Subject: 'subject',
            Location: 'location',
            Price: 'price',
            Spaces: 'spaces'
        },
        }
    },
    computed: {
        sortedLessons() {
            function compareSubjectAsc(a, b) {
                if (a.topic > b.topic) return 1;
                if (a.topic < b.topic) return -1;
                return 0;
            }
            function compareSubjectDesc(a, b) {
                if (a.topic > b.topic) return -1;
                if (a.topic < b.topic) return 1;
                return 0;
            }

            function compareLocationAsc(a, b) {
                if (a.location > b.location) return 1;
                if (a.location < b.location) return -1;
                return 0;
            }
            function compareLocationDesc(a, b) {
                if (a.location > b.location) return -1;
                if (a.location < b.location) return 1;
                return 0;
            }

            function comparePriceAsc(a, b) {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            }
            function comparePriceDesc(a, b) {
                if (a.price > b.price) return -1;
                if (a.price < b.price) return 1;
                return 0;
            }

            function compareSpacesAsc(a, b) {
                if (a.space > b.space) return 1;
                if (a.space < b.space) return -1;
                return 0;
            }
            function compareSpacesDesc(a, b) {
                if (a.space > b.space) return -1;
                if (a.space < b.space) return 1;
                return 0;
            }

            let lessonsCopy = this.lessons.slice();

if (this.order == "asc") {
  if (this.attribute == "subject") {
    return lessonsCopy.sort(compareSubjectAsc);
  } else if (this.attribute == "location") {
    return lessonsCopy.sort(compareLocationAsc);
  } else if (this.attribute == "price") {
    return lessonsCopy.sort(comparePriceAsc);
  } else {
    return lessonsCopy.sort(compareSpacesAsc);
  }
} else {
  if (this.attribute == "subject") {
    return lessonsCopy.sort(compareSubjectDesc);
  } else if (this.attribute == "location") {
    return lessonsCopy.sort(compareLocationDesc);
  } else if (this.attribute == "price") {
    return lessonsCopy.sort(comparePriceDesc);
  } else {
    return lessonsCopy.sort(compareSpacesDesc);
  }
}
}
},
}
</script>
