<template>
  <div>
    Thanksページ
    <HeadComp>
      送信ありがとうございました。
    </HeadComp>
  </div>
</template>

<script>
import HeadComp from '@/components/modules/HeadComp'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'thanks',
  components: {
    HeadComp
  }
}
</script>
