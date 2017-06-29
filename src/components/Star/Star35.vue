<template>
  <ul>
    <li><img src="./star24on@2x.png" alt=""></li>
    <li><img src="./star24on@2x.png" alt=""></li>
    <li><img src="./star24on@2x.png" alt=""></li>
    <li><img src="./star24half@2x.png" alt=""></li>
    <li><img src="./star24off@2x.png" alt=""></li>
  </ul>
</template>

<script>
export default {
  data(){
    return{
      score:4.2,
    }
  },
  computed:{
    srcs(){
      let arr = [];
      if(this.score%1==0){
        for(let i=0;i<5;i++){
          if(i<this.score){
            arr.push('./star24on@2x.png');
          }else{
            arr.push('./star24off@2x.png');
          }
        }
      }else{
        let sc = Math.floor( this.score );
        for( let i=0;i<5;i++ ){
          if(i<sc){
            arr.push('\./star24on@2x.png');
          }else if(i==sc){
            arr.push('\./star24half@2x.png');
          }else{
            arr.push('\./star24off@2x.png');
          }
        }
      }
      return arr;
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';
  ul{
    .w(376);
    display:flex;
    justify-content:space-between;
    margin:0 auto;
    li{
      .w(40);

      img{
        width:100%;
      }
    }
  }
</style>
