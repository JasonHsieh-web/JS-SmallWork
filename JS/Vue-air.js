
Vue.component('card',{
    props:['area'],
    template: '#area',
    computed:{
        statusColor:function(){
            switch(this.area.Status){
                case '良好': {
                    return '';
                    break;
                }
                case '普通': {
                    return 'status-aqi2';
                    break;
                }
                case '對敏感族群不健康': {
                    return 'status-aqi3';
                    break;
                }
                case '對所有族群不健康': {
                    return 'status-aqi4';
                    break;
                }
                case '非常不健康': {
                    return 'status-aqi5';
                    break;
                }
                case '危害': {
                    return 'status-aqi6';
                    break;
                }
            }
        },
    },
    methods:{
        fullStar: function (){
            this.$emit('event',this.area)
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
      data: [],
      location: [],
      //接收stared裡的值並轉為陣列儲存
      stared: JSON.parse(localStorage.getItem('stared'))||[],
      filter: '',
    },
    created() {
        this.getData();
      },
    // 請在此撰寫 JavaScript
    methods: {
      getData: function() {
        const vm = this;
        const api = 'https://script.google.com/macros/s/AKfycbz-o5lFxgO2Vv_ma2Pu8fvgS0e4zhp4AUghYu06lxTpIZkoo9bm/exec?url=http://opendata2.epa.gov.tw/AQI.json';    
        // 使用 jQuery ajax
        $.get(api).then(function(response) {
            vm.data = response;
            //console.log(response);            
        let country =vm.data.map(function(item){
            return item.County  //重組一個只有城市的陣列
        })
         // console.log(country);
        vm.location = country.filter(function(item,index,arr){
            return arr.indexOf(item) === index //filter會回傳結果為true的值
           //indexOf會找尋陣列中第一個被找到的"索引"
            // ===index 就可以比對每個城市第一個位置然後回傳出來
        })
              })
    },
     changeStar: function(notice){
         //點擊星星觸發changeStar
        const vm = this;
        let index = vm.stared.findIndex( function (item){
            return notice.SiteName === item;   
            //找尋stared裡面有沒有 SiteName 有的話回傳索引位置 
        });
        if(index == -1){
            this.stared.push(notice.SiteName);
            //沒有這個值就把他push進去，顯示關注城市
        }else{
            vm.stared.splice(index,1);
            //有這個值了就把他刪掉
        }
        //設置key，並把值轉成字串
        localStorage.setItem('stared',JSON.stringify(vm.stared));

    }
   

    },

    computed: {
        filterData : function (){
            const vm = this;
            if(vm.filter == ''){
                return vm.data.filter(function(item){  
                    return vm.stared.indexOf(item.SiteName) === -1
                    //找stared[]有沒有data.SiteName沒有會回傳-1
                    //再比對-1 === -1 true就把這回傳這個item

                })
            }else{
                return vm.data.filter(function(item){
                    if(item.County == vm.filter){
                    return vm.stared.indexOf(item.SiteName) === -1;  
                    }
                })
            }
            
        },
        staredData : function() {
            const vm = this;
            //filter會回傳結果為true的值
            return vm.data.filter(function(item,index,arr){
            return (vm.stared.indexOf(item.SiteName) > -1)  
            //找尋stared的值，有值會回傳索引位置
            })
        }
    },
    
  });
