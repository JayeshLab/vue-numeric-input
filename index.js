var app = new Vue({
    el : '#app',
    data: {
       item: 0,
    },
    methods:{
    	incre(){
    		this.item+=1;
    	},
    	decre(){
    		this.item-=1;
    	}
    }
});