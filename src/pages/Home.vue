<template>
  <b-container fluid="">
    <b-row>
      <b-col cols="12">
        <pk-slide
          v-model="page"
        >
          <pk-slide-page
            name="hoge"
            title="テキストベースのタイトル"
          >
            ページ１
          </pk-slide-page>

          <pk-slide-page name="foo">
            <template #title>
              <v-fa icon="plane" /> タイトル～～～！！
            </template>
            　ページ２
          </pk-slide-page>

          <pk-slide-page name="fuga">
            <table>
              <thead>
              <tr>
                <th>名前</th>
                <th>能力</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>博麗霊夢</td>
                <td>空を飛べる程度の能力</td>
              </tr>
              <tr>
                <td>霧雨魔理沙</td>
                <td>魔法を使う程度の能力</td>
              </tr>
              <tr>
                <td>十六夜咲夜</td>
                <td>時を止める程度の能力</td>
              </tr>
              </tbody>
            </table>
          </pk-slide-page>

        </pk-slide>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import PkInput from '@/components/Form/PkInput.vue'
import PkDialog from '@/components/PkDialog.vue'
import { PkSlide, PkSlidePage } from '@/components/Slide'

export default {
  name: 'Home',
  components: {
    PkInput,
    PkDialog,
    PkSlide,
    PkSlidePage
  },
  data () {
    return {
      page: "hoge",
      inputText: "",
      showDialog: false,
      position: "standard",
      seamless: false,
      options: [
        { text: '中央', value: 'standard' },
        { text: '上', value: 'top' },
        { text: '下', value: 'bottom' },
        { text: '左', value: 'left' },
        { text: '右', value: 'right' },
      ]
    }
  }
}
</script>
