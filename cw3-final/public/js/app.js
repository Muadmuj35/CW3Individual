let store = new Vue({
    el: '#app',
    data: {
        lessons: [],
        cartItems: [],
        showProduct: true,
        searchTxt: '',
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
        checkOutName: '',
        checkOutNumber: '',
        cannotCheckOut: true
    },
    created() {
        fetch('/lesson.json')
            .then(response => response.json())
            .then(data => {
                this.lessons = data;
            });
    },
    methods: {
        addLessonToCart: function (_id) {
            const lessonIndex = this.lessons.findIndex(lesson => lesson._id === _id);
            if (lessonIndex != -1) {
                this.lessons[lessonIndex].space -= 1;
                this.addToCart(_id);
            }
        },
        addToCart: function (_id) {
            const lessonIndex = this.lessons.findIndex(lesson => lesson._id === _id);
            if (lessonIndex != -1) {
                // Create a new object with the same properties as the lesson
                const lessonCopy = { ...this.lessons[lessonIndex] };
                // Use Vue.set to ensure reactivity
                this.$set(this.cartItems, this.cartItems.length, lessonCopy);
            }
        },
        updateShowProduct: function () {
            this.showProduct = !this.showProduct;
        },
    }
});