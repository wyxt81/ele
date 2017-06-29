<template>
  <ul>
    <li><img src="./star24on@2x.png" alt=""></li>
    <li><img src="./star24on@2x.png" alt=""></li>
    <li><img src="./star24off@2x.png" alt=""></li>
    <li><img src="./star24off@2x.png" alt=""></li>
    <li><img src="./star24off@2x.png" alt=""></li>
  </ul>
</template>

<script>
export default {
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
