<template lang="pug">
  .top
    h1 いえでまなぼう！
    .about 無料学習動画リンク集

    v-app
      v-select(
        v-model="schoolYear"
        :items="schoolYears"
        :label="schoolYear === '小学1年' ? 'がくねん' : '学年'"
        outlined)
      
      v-data-table.table(
        :headers="tableHeaders",
        :items="tableData",
        :items-per-page="100",
        :hide-default-footer="true",
        :mobile-breakpoint="0")
        template(v-slot:item.actions="{ item }")
          button.watch(@click="playVideo(item)") みる

    .credit
      | Credit
      .project-home APP: 
        a(href="https://creativecommons.org/licenses/by/4.0/deed.ja" target="_new") CC BY
        | &nbsp;
        a(href="https://twitter.com/ApplePedlar") @ApplePedlar
        | &nbsp;/&nbsp;
        a(href="https://github.com/ApplePedlar/iemana" target="_new") iemana(src on GitHub)
      .data-source DATA: 
        a(href="https://creativecommons.org/licenses/by/4.0/deed.ja" target="_new") CC BY
        | &nbsp;
        a(href="https://fukuno.jig.jp/2820" target="_new") 「fukuno.jig.jp 時間割ガチャ - 教材オープンデータあつめ始めました」

</template>

<script>

import axios from "axios"

export default {
  data () {
    return {
      sourceUrl: "https://code4fukui.github.io/timetable/data/funs.json",
      schoolYear: "小学1年",
      schoolYears: [ {text:"いちねんせい", value: "小学1年"}, "小学2年", "小学3年", "小学4年", "小学5年", "小学6年", "中学1年", "中学2年", "中学3年", "高校1年", "高校2年", "高校3年", "大人"],
      sortBy: 'totalPatients',
      sortDesc: true,
      tableHeaders: [
        { text: "教材シリーズ名", value: "教材シリーズ名" },
        { text: "タイトル", value: "タイトル" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      tmData: [],// tm = Teaching material
      tableData: []
    }
  },
  mounted () {
    document.querySelector("meta[name='viewport']").setAttribute("content", "width=800")
    axios
      .get(this.sourceUrl)
      .then(response => {
        this.tmData = response.data
        this.makeTableData()
      })
  },
  methods: {
    playVideo (item) {
      window.open(item.URL)
    },
    makeTableData () {
      this.tableData = this.tmData.filter(d => d["対象"] === this.schoolYear && (!d['言語'] || d['言語'].indexOf('日本語') >= 0))
    }
  },
  watch: {
    schoolYear () {
      this.makeTableData()
    }
  }
}
</script>

<style lang="sass">
.top
  max-width: 800px
  margin: 30px auto
  h1
    font-size: 30px
    background-color: green
    color: white
    height: 80px
    text-align: center
    padding-top: 20px
  .about
    margin: 20px
  .table
    max-width: 800px
    margin: 30px auto
    border: 1px silver solid
    .watch
      color: blue
  .credit, .links
    font-size: 12px
    .project-home, .data-source, .link
      margin-left: 20px

</style>
