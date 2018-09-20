<template>
    <div class="container">
        <div v-for="(item,index) in voiceCode" :key="index" class="groundF">{{item}}</div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                voiceCode: []
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .container 
        display flex
        justify-content center
        background-color black
        .groundF
            margin 0 auto 
            font-size 60px
            -webkit-background-clip text
            -webkit-text-fill-color rgba(255,255,255,.1)
            background-image url("./assets/image/test.png")
            background-position 58% 10%
            :nth-child(1)
                transition: background-position 1.5s linear 0s;
            :nth-child(2)
                transition: background-position 1.5s linear 1.5s;
            :nth-child(3)
                transition: background-position 1.5s linear 3s;
            :nth-child(4)
                transition: background-position 1.5s linear 4.5s;
</style>
