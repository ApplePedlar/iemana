<template lang="pug">
  .top
    h1 いえでまなぼう！
    .about 無料学習動画リンク集

    v-app
      v-container
        v-select.mx-5(
          v-model="schoolYear"
          :items="schoolYears"
          :label="schoolYear === '小学1年' ? 'がくねん' : '学年'"
          outlined)
        .d-flex.align-end.flex-column.mr-2
          button(@click.stop="filterDialog = true")
            v-icon(size="medium")
              | mdi-filter
            span.filter-label 教材シリーズフィルタ設定
          v-dialog(v-model="filterDialog" max-width="400px")
            v-card(v-if="filterDialog")
              v-toolbar.mb-10(dark color="primary")
                v-btn(icon dark @click="filterDialog = false")
                  v-icon mdi-close
                v-toolbar-title 教材シリーズフィルタ設定
              v-checkbox.mx-5(v-for="series in Object.keys(seriesFilter)" :key="series" :label="series" v-model="seriesFilter[series]")

      v-data-table.table(
        :headers="tableHeaders",
        :hide-default-footer="true",
        :items="tableData",
        :items-per-page="-1",
        :mobile-breakpoint="0")
        template(v-slot:item.info="{ item }")
          v-icon(@click.stop="showInfoDialog(item)")
            | mdi-information-outline
        template(v-slot:item.thumbnail="{ item }")
          img.thumbnail(v-if="getThumbnailUrl(item)" :src="getThumbnailUrl(item)" @click="playVideo(item)" onerror="this.src = 'nothumbnail.png';")
          v-icon(v-else @click="playVideo(item)")
            | mdi-information-outline
        template(v-slot:item.タイトル="{ item }")
          a.watch(@click="playVideo(item)") {{ item["タイトル"] }}
        template(v-slot:item.understanding="{ item }")
          button.understanding-icon(@click="showUnderstandingDialog(item)") {{ getStars(item) }}

      v-dialog(v-model="infoDialog" max-width="600px")
        v-card(v-if="itemForInfoDialog")
          v-toolbar.mb-5(dark color="primary")
            v-btn(icon dark @click="infoDialog = false")
              v-icon mdi-close
            v-toolbar-title {{ itemForInfoDialog["タイトル"] }}
          img.info(v-if="getThumbnailUrl(itemForInfoDialog)" :src="getThumbnailUrl(itemForInfoDialog)" onerror="this.src = 'nothumbnail.png';")
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
          v-card-text(v-for="(d, index) in understandingIconText" :key="index")
            v-btn.ml-10(min-width=260 @click="setUnderstanding(5 - index)")
              span.understanding-icon {{d.icon}}
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
        { text: "詳細", value: "info", width: 10 },
        { text: "サムネイル", value: "thumbnail", width: 10 },
        { text: "科目", value: "科目", class: "subject" },
        { text: "タイトル", value: "タイトル" },
        { text: "理解度", value: "understanding", class: "understanding" }
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
      ],
      seriesFilter: {},
      filterDialog: false
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
        this.loadFilteringSetting()
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
      this.tableData = this.tmData.filter(d =>
        this.isTargetContent(d)
        && (!d['言語'] || d['言語'].indexOf('日本語') >= 0)
        && (d["教材種別"] === "動画" || d["URL"].indexOf("youtu") >= 0)
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
        "図画工作": "ずこう",
        "社会": "しゃかい",
        "音楽": "おんがく",
        "体育": "たいいく"
      }

      this.tableData.map(d => {
        let kana = kanjiKanaMap[d['科目'].trim()]
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
    },
    loadFilteringSetting () {
      const seriesSet = new Set()

      this.tmData.forEach(d => {
        seriesSet.add(d["教材シリーズ名"])
      })

      seriesSet.forEach(series => {
        // プログラミング関連はオプトイン
        if (series.indexOf("プログラミング") >= 0 || series.indexOf("PCN") >= 0) {
          this.seriesFilter[series] = false
        } else {
          this.seriesFilter[series] = true
        }
        let filterSetting = window.localStorage.getItem("series-filter-" + series)
        if (filterSetting != null) {
          this.seriesFilter[series] = filterSetting === "true"
        }
      })
    },
    isTargetContent (content) {
      let target = content["対象"]
      let genre = content["科目"]

      // filter
      if (!this.seriesFilter[content["教材シリーズ名"]]) {
        return false
      }

      if (target.indexOf(this.schoolYear) >= 0) {
        return true
      }

      if (
        this.schoolYear.startsWith("小学") && (target === "小学生" || target === "小中学生")
        || this.schoolYear.startsWith("中学") && (target === "中学生" || target === "中高生")
        || this.schoolYear.startsWith("高校") && (target === "高校生" || target === "中高生")) {
        return true
      }
    },
    getThumbnailUrl (content) {
      let youtubeId = this.getYoutubeId(content.URL)
      if (youtubeId) {
        return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
      }
      return "./nothumbnail.png"
    },
    getYoutubeId (url) {
      // 以下のパターンに対応。
      // https://youtu.be/ididididid
      // https://www.youtube.com/embed/ididididid
      // https://www.youtube.com/watch?v=ididididid
      // https://www.youtube.com/watch?v=ididididid&feature=youtu.be
      let regexpArr = [
        /https:\/\/youtu\.be\/([0-9a-zA-Z_\-]+)/,
        /https:\/\/www\.youtube\.com\/(?:embed\/|watch\?v=)([0-9a-zA-Z_\-]+)/
      ]
      for (let i = 0; i < regexpArr.length; i++) {
        let result = regexpArr[i].exec(url)
        if (result) {
          return result[1]
        }
      }
    }
  },
  watch: {
    schoolYear () {
      window.localStorage.setItem("schoolYear", this.schoolYear)
      this.makeTableData()
    },
    filterDialog () {
      if (!this.filterDialog) {
        Object.keys(this.seriesFilter).forEach(key => {
          window.localStorage.setItem("series-filter-" + key, this.seriesFilter[key])
        })
        this.makeTableData()
      }
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
    width: 800px
    margin: 10px auto 30px
    border: 1px silver solid
    th, td
      &.subject
        width: 90px
      @media(max-width:600px)
        padding: 0 3px
        &.subject
          width: 62px
        &.understanding
          width: 45px
    .thumbnail
      display: block
      margin: 5px auto
      width: 80px
    .watch
      color: blue
  img.info
    display: block
    margin: 0 auto
  .credit, .links
    font-size: 12px
    .project-home, .data-source, .link
      margin-left: 20px
  .understanding-icon
    font-size: 20px
  .filter-label
    font-size: 14px
</style>
