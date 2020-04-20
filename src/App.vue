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
        template(v-slot:item.understanding="{ item }")
          button.understanding(@click="showUnderstandingDialog(item)") {{ getStars(item) }}

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
      v-dialog(v-model="understandingDialog" max-width="400px")
        v-card(v-if="itemForUnderstandingDialog")
          v-card-title
            span {{ itemForUnderstandingDialog["タイトル"] }}
          v-card-text どうでしたか？
          v-card-text(v-for="(d, index) in understandingIconText")
            v-btn.ml-10(min-width=260 @click="setUnderstanding(5 - index)")
              span.understanding {{d.icon}}
              | {{d.text}}

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
        { text: "タイトル", value: "タイトル" },
        { text: "理解度", value: "understanding", width: 70 }
      ],
      tmData: [],// tm = Teaching material
      tableData: [],
      infoDialog: false,
      itemForInfoDialog: null,
      understandingDialog: false,
      itemForUnderstandingDialog: null,
      understandingIconText: [
        { "icon": "💯", "text": "よくわかった" },
        { "icon": "😄", "text": "だいたいわかった" },
        { "icon": "😑", "text": "はんぶんくらいわかった" },
        { "icon": "😥", "text": "あまりわからなかった" },
        { "icon": "😨", "text": "ぜんぜんわからん" },
        { "icon": "🙈", "text": "まだみてない" }
      ]
    }
  },
  mounted () {
    document.querySelector("meta[name='viewport']").setAttribute("content", "width=500")
    this.loadSchoolYear()

    axios
      .get(this.sourceUrl)
      .then(response => {
        this.tmData = response.data
        this.loadUnderstanding()
        this.makeTableData()
      })
  },
  methods: {
    loadSchoolYear () {
      let schoolYear = window.localStorage.getItem("schoolYear")
      this.schoolYears.forEach(sy => {
        if (schoolYear === sy || schoolYear === sy.value) {
          this.schoolYear = schoolYear
        }
      })
    },
    playVideo (item) {
      window.open(item.URL)
      this.showUnderstandingDialog(item)
    },
    makeTableData () {
      this.tableData = this.tmData.filter(
        d => d["対象"].indexOf(this.schoolYear) >= 0
        && (!d['言語'] || d['言語'].indexOf('日本語') >= 0)
        && d["教材種別"] === "動画"
        && !d["URL"].endsWith(".pdf"))
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
    },
    getStars (item) {
      let understanding = item.understanding || 0
      return this.understandingIconText[5 - (item.understanding || 0)].icon
    },
    showUnderstandingDialog (item) {
      this.itemForUnderstandingDialog = item
      this.understandingDialog = true
    },
    setUnderstanding (understanding) {
      this.itemForUnderstandingDialog.understanding = understanding
      this.understandingDialog = false
      window.localStorage.setItem("understanding-" + this.itemForUnderstandingDialog.URL, understanding)
      this.makeTableData()
    },
    loadUnderstanding () {
      this.tmData.forEach(d => {
        d.understanding = window.localStorage.getItem("understanding-" + d.URL)
      })
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
  .understanding
    font-size: 20px

</style>
