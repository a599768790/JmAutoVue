<template>
    <div>
        <van-button @click="show1"></van-button>
    
        <van-popup v-model="show" :overlay="false">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="onCancel"
                @confirm="onConfirm"
            />
        </van-popup>

        <!-- <van-popup
            v-model="show2"
            position="bottom"
        >
            <van-picker
                show-toolbar
                
                :columns="columns"
                @cancel="onCancel"
                @confirm="onConfirm"
            />
        </van-popup> -->
    </div>
</template>

<script>

export default {
    data() {
        return {
        show: false,
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
        }
    },
    methods:{
        show1 () {
            this.show = true;
        },
        onConfirm(value, index) {
        // alert(`当前值：${value}, 当前索引：${index}`);
        this.show = false;
        },
        onCancel() {
        alert('取消');
        }
    }
//   data() {
//     return {
//       columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
//     }
//   },
//   methods: {
//     onConfirm(value, index) {
//       alert(`当前值：${value}, 当前索引：${index}`);
//     },
//     onCancel() {
//       alert('取消');
//     }
//   }
};



</script>