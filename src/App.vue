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
        template(v-slot:item.info="{ item }")
          v-icon(@click.stop="showInfoDialog(item)")
            | mdi-information-outline
        template(v-slot:item.タイトル="{ item }")
          button.watch(@click="playVideo(item)") {{ item["タイトル"] }}

      v-dialog(v-model="infoDialog" max-width="600px")
        v-card(v-if="itemForInfoDialog")
          v-card-title
            span {{ itemForInfoDialog["タイトル"] }}
          template(v-for="key in Object.keys(itemForInfoDialog)")
            v-card-text(v-if="itemForInfoDialog[key]")
              | {{ key }}: 
              template(v-if="key.indexOf('URL') >= 0")
                a(:href="itemForInfoDialog[key]" target="_blank") {{ itemForInfoDialog[key] }}
              template(v-else)
                | {{ itemForInfoDialog[key] }}


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
      tableHeaders: [
        { text: "詳細", value: "info" },
        { text: "科目", value: "科目", width: 90 },
        { text: "タイトル", value: "タイトル" }
      ],
      tmData: [],// tm = Teaching material
      tableData: [],
      infoDialog: false,
      itemForInfoDialog: null
    }
  },
  mounted () {
    document.querySelector("meta[name='viewport']").setAttribute("content", "width=600")
    this.loadState()

    axios
      .get(this.sourceUrl)
      .then(response => {
        this.tmData = response.data
        this.makeTableData()
      })
  },
  methods: {
    loadState () {
      let schoolYear = window.localStorage.getItem("schoolYear")
      this.schoolYears.forEach(sy => {
        if (schoolYear === sy || schoolYear === sy.value) {
          this.schoolYear = schoolYear
        }
      })
    },
    playVideo (item) {
      window.open(item.URL)
    },
    makeTableData () {
      this.tableData = this.tmData.filter(d => d["対象"] === this.schoolYear && (!d['言語'] || d['言語'].indexOf('日本語') >= 0))
      if (this.schoolYear === "小学1年") {
        this.conversionToKana()
      }
    },
    conversionToKana () {
      const kanjiKanaMap = {
        "国語": "こくご",
        "算数": "さんすう",
        "生活": "せいかつ",
        "図工": "ずこう",
        "音楽": "おんがく",
      }

      this.tableData.map(d => {
        let kana = kanjiKanaMap[d['科目']]
        if (kana) {
          d['科目'] = kana
        }
      })
    },
    showInfoDialog (item) {
      this.itemForInfoDialog = item
      this.infoDialog = true
    }
  },
  watch: {
    schoolYear () {
      window.localStorage.setItem("schoolYear", this.schoolYear)
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
