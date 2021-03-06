<template>
    <div>
        <div class="sample__player line">
            <div class="line__wave" id="line__wave0">
                <audio
                    @durationchange='onDurationChangeListener'
                    @timeupdate='onTimeUpdateListener'
                    @ended='onEndedListener'
                    ref="audio"
                    :src="getCurrentSample.samplepath" autoplay>
                    Your browser does not support the <code>audio</code> element.
                </audio>
                <div id="waveform__wrapper" class="waveform__wrapper" ref="waveform"></div>
                <div class="seek__progress" ref="progress"></div>
                <div class="seek__clickarea"></div>
            </div>
        </div>
        <div class="sample__info">
            <h3>
                {{getCurrentSample.device.vendor }} - {{getCurrentSample.device.model }}
                <span class="amount">({{getCurrentSample.device.patchSetName }})</span>
            </h3>
            <h1>
                <span class="amount">{{getCurrentSample.displayname }}</span> {{getCurrentSample.patchname}}
            </h1>
            <p v-if="getCurrentSample.categories.length">
                categories: {{getCurrentSample.categories.join(', ') }}
            </p>
            <p v-if="getCurrentSample.creator">
                <span class="amount">
                    created by {{getCurrentSample.creator}}
                </span>
            </p>
            <p>
                <span class="btn" v-on:click="confirmSend">send to synth</span>&nbsp;
                <span class="btn" v-on:click="replay">play again</span>
            </p>
        </div>
    </div>
</template>
<script>
import  { mapGetters } from 'vuex'
export default {
  name: 'Player',
  data: function(){
    return {
      sampleId: String,
      currentSample: {
        devicePrefix: '',
        uniqueIdentifier: '',
        patchname: '',
        displayname: '',
        msb: null,
        lsb: null,
        programchange: null,
        samplepath: '',
        categories: [],
        creator: '',
        duration: 0,
        digitakt: {
          bank: '',
          sbnk: '',
          programchange: ''
        },
        wavPeaks: [],
        device: {
          uniquePrefix: '',
          vendor: '',
          model: '',
          color: '',
          yearOfConstruction: 0,
          patchSetName: '',
          midiChannel: 0
        }
      },
      waveformSettings: {
        waveColor: '#FF9C01',
        barWidth: 1,
        barGap: 0.2,
        mirrored: 1,
        colors: {
            orange: '#FF9C01',
            green: 'rgb(59,187,47)',
            red: '#FF5050',
            blue: '#5487F4',
            yellow: '#EFFE4B',
            pink: '#F8289E',
            cyan: '#00E5E5',
            violet: '#9932CC',

            /* @see https://www.donaufischer.com/java/farbnamen.htm */
            lawngreen: '#7CFC00',
            darkgoldenrod: '#B8860B',
            grey: '#808080',
            teal: '#008080',
            firebrick: '#B22222',
            darkorange: '#FF8C00',
            darkblue: '#00008B',
            dodgerblue: '#1E90FF'

        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'triggerLoadSample',
      'getCurrentSample',
    ])
  },
  methods: {

    onDurationChangeListener() {
        this.$refs.progress.style.transition = 'none'
        this.$refs.progress.style.width = '0'
        this.drawWaveform(
            this.$refs.waveform,
            this.getCurrentSample.wavPeaks,
            this.waveformSettings.colors[ this.getCurrentSample.device.color ]
        )
    },
    confirmSend() {
        // console.log("TODO: bank select + send program change to synthesizer")
    },
    replay() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
    },
    onEndedListener() {
        if(typeof this.$refs.progress === 'undefined') {
            return;
        }
        this.$refs.progress.style.width = 0
    },
    
    onTimeUpdateListener(event) {
        if(typeof this.$refs.progress === 'undefined') {
            return;
        }
        /* TODO proper usage of transitions to have a smooth progress bar */
        this.$refs.progress.style.transition = 'width 200ms linear'
        this.$refs.progress.style.width = event.target.currentTime/event.target.duration*100+'%'
    },

    /* stolen from https://github.com/othmar52/temp-jam/blob/master/jamSplitter/webStemPlayer/data/stemplayer/js/stemplayer.js */
    /* TODO refacture */
    drawWaveform(targetElement, peakData, color) {
        targetElement.innerHTML = '';
        this.waveformSettings.canvas = document.createElement('canvas'),
        this.waveformSettings.context = this.waveformSettings.canvas.getContext('2d');
        this.waveformSettings.canvas.width = targetElement.offsetWidth;
        this.waveformSettings.canvas.height = targetElement.offsetHeight;
        this.waveformSettings.waveColor = color;

        let len = Math.floor(peakData.length / this.waveformSettings.canvas.width);
        let maxVal = this.getMaxVal(peakData);
        if(maxVal === 0) {
            // draw at least a one pixel line for 100% silence files
            maxVal = 1;
        }
        for (let j = 0; j < this.waveformSettings.canvas.width; j += this.waveformSettings.barWidth) {
            this.drawBar(
                j,
                (this.bufferMeasure(Math.floor(j * (peakData.length / this.waveformSettings.canvas.width)), len, peakData) * maxVal/10)
                *
                (this.waveformSettings.canvas.height / maxVal)
                +
                1
            );
        }
        targetElement.appendChild(this.waveformSettings.canvas);
    },

    getMaxVal(inputArray) {
        let max = 0;
        for(let i=0; i<inputArray.length; i++) {
            max = (inputArray[i] > max) ? inputArray[i] : max;
        }
        return max;
    },

    bufferMeasure(position, length, data) {
        let sum = 0.0;
        for (let i = position; i <= (position + length) - 1; i++) {
            sum += Math.pow(data[i], 2);
        }
        return Math.sqrt(sum / data.length);
    },

    drawBar(i, h) {
        this.waveformSettings.context.fillStyle = this.waveformSettings.waveColor;
        let w = this.waveformSettings.barWidth;
        if (this.waveformSettings.barGap !== 0) {
            w *= Math.abs(1 - this.waveformSettings.barGap);
        }
        let x = i + (w / 2);
        let y = this.waveformSettings.canvas.height - h;

        if(this.waveformSettings.mirrored === 1) {
            y /=2;
        }
        this.waveformSettings.context.fillRect(x, y, w, h);
    }
  }
}
</script>
<style>
.sample__player {
    width: 100%;
    height: 100px;
}

canvas {
    position: relative;
    top: 10%;
    height: 80%;
    width: 100%;
}
.line .line__wave .seek__clickarea {
    position: absolute;
    height: 100%;
    width: 100%;
}
.line .line__wave .seek__progress {
    background-color: rgba(0, 0, 0, 0.8);
    border-right: 1px solid white;
    position: absolute;
    width: 0;
    height: 100%;
}

.line .line__wave .waveform__wrapper {
    width: calc(100% - 1px);
    height: 100px;
    position: relative;
}
.line .line__wave {
    background-color: #0a1a2d;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    position: relative;
}

.line .line__wave .seek__progress {
    background-color: rgba(0, 0, 0, 0.8);
    border-right: 1px solid white;
    position: absolute;
    width: 0;
    height: 100%;
}

</style>
