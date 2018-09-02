<template>
  <b-container class="bv-example-row">
    <div class="row">
      <div class="col-md-12">
        <b-form-group label="Animate">
          <b-form-radio-group v-model="animate" :options="animates">
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Type menu">
          <b-form-radio-group v-model="type" :options="types">
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Circle">
          <b-form-radio-group v-model="circle" :options="circles">
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Mask">
          <b-form-radio-group v-model="mask" :options="masks">
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Btn">
          <b-form-radio-group v-model="btn" :options="btns">
          </b-form-radio-group>
        </b-form-group>

        <button class="btn" @click="subtype = !subtype">Toggle</button>
      </div>
    </div>
    

    <circle-menu :class="classType" :btn="btn" :circle="circle" :type="type" :animate="`animated ${animate}`" :number="4" :mask='mask' :colors="[ 'rgb(23, 151, 172)', '#FFE26F', '#F3825F', '#F19584', '#F19584' ]">
      <a slot="item_1" class="fa fa-twitter fa-lg" herf="#" ></a>
      <a slot="item_2" class="fa fa-weixin fa-lg" herf="#" ></a>
      <a slot="item_3" class="fa fa-weibo fa-lg" herf="#" ></a>
      <a slot="item_4" class="fa fa-github fa-lg" herf="#" ></a>
      <a slot="item_5" class="fa fa-github fa-lg" herf="#" ></a>
    </circle-menu>

  </b-container>
</template>

<script>
import CircleMenu from 'vue-circle-menu'

export default {
  components: {
    CircleMenu
  },
  data () {
    return {
      animate: 'rubberBand',
      type: 'middle-around',
      circle: true,
      btn: true,
      mask: 'none',
      masks: ['black', 'white', 'none'],
      types: ['middle-around', 'middle', 'right', 'left', 'top', 'bottom'],
      animates: ['rubberBand', 'jello', 'swing', 'flash', 'bounce', 'flip', 'zoomIn', 'slideInUp', 'none'],
      circles: [true, false],
      btns: [true, false],
      subtype: true,
    }
  },
  computed: {
    classType() {
      return this.subtype ? this.type : this.type + '-subtype'
    }
  },
}
</script>

<style scoped>
  @import '../assets/sass/animate.scss';

  .bottom {
    position: fixed;
    right: 5px;
    top: 60px;
  }
  .bottom-subtype {
    position: fixed;
    left: 5px;
    top: 60px;
  }
  .middle {
    position: fixed;
    left: 50%;
    bottom: 0;
  }
  .middle-subtype {
    position: fixed;
    left: 50%;
    top: 5px;
    z-index: 1200;
  }
  .left {
    position: fixed;
    left: 5px;
    bottom: 0;
  }
  .left-subtype {
    position: fixed;
    left: 5px;
    top: 60px;
  }
  .right {
    position: fixed;
    right: 5px;
    bottom: 0;
  }
  .right-subtype {
    position: fixed;
    right: 5px;
    top: 60px;
  }
  .top {
    position: fixed;
    right: 5px;
    bottom: 0;
  }
  .top-subtype {
    position: fixed;
    left: 5px;
    bottom: 0;
  }
  .middle-around {
    position: fixed;
    bottom: 0;
    right: 90px;
  }
  .middle-around-subtype {
    position: fixed;
    bottom: 0;
    left: 90px;
  }
</style>
