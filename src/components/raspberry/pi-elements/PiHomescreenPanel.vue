<template>
  <div class="pi-homescreen-panel d-flex flex-wrap justify-content-center">

    <div v-for="(entry, index) in elements" :key="index">
        <div class="text-center">
          <div class="row">
            <a class="homescreen-link" :href="'http://' + rpi.justIpAddress + entry['url']" target="_blank">
              <img class="img-circle" :src="picPath + entry['image']" :alt="entry['label']"
              :width="imageSize" :height="imageSize">
            </a>
          </div>
          <p>
            <span>{{ entry['label'] }}</span>
          </p>
        </div>
    </div>

  </div>
</template>

<script>

  var rpiPort = ':8888'

  export default {
    name: 'pi-homescreen-panel',
    props: ['rpi'],
    data () {
      return {
        picPath: '/static/gogo-img/',
        imageSize: 64,
        // gogodPort: ':8888',
        elements: [
          {
            'url': rpiPort + '/screen/index.html',
            'image': 'gogo_display.png',
            'label': 'Display',
            'color': '#2196f3',
            'icon': 'mdi-hardware-desktop-windows'
          },
          {
            'url': ':8889/filemanager/dialog.php?fldr=/',
            'image': 'gogo_filemanager.png',
            'label': 'File Manager',
            'color': '#795548',
            'icon': 'mdi-file-folder'
          },
          {
            'url': rpiPort + '/www/datalogging/',
            'image': 'gogo_data_log.png',
            'label': 'Data Logging',
            'color': '#2e7d32',
            'icon': 'mdi-action-assessment'
          },
          // {
          //   'url': '/www/soundrecorder/',
          //   'image': 'gogo_sound_recorder.png',
          //   'label': 'Sound Recording',
          //   'color': '#f44336',
          //   'icon': 'mdi-av-mic'
          // },
          {
            'url': rpiPort + '/www/webui/',
            'image': 'gogo_html.png',
            'label': 'Web UI',
            'color': '#283593',
            'icon': 'mdi-editor-insert-drive-file'
          },
          // {
          //   'url': this.gogodPort+'/www/SpeechRecognition/',
          //   'image': 'gogo_speech_recognition.png',
          //   'label': 'Speech Recognition',
          //   'color': '#38515f',
          //   'icon': 'mdi-av-hearing'
          // },
          {
            'url': rpiPort + '/www/addons/',
            'image': 'gogo_addons.png',
            'label': 'Add-ons',
            'color': '#ff9642',
            'icon': 'mdi-action-extension'
          },
          {
            'url': rpiPort + '/www/setting.html',
            'image': 'gogo_setting.png',
            'label': 'Settings',
            'color': '#386ed0',
            'icon': 'mdi-setting'
          }
        ]
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/breakpoints";

  .homescreen-link {
    min-width: 150px;
    text-align: center;
  }
  
</style>
