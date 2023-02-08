const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cd = $('.cd')
const cdWidth = cd.offsetWidth
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')

const app = {
    currentIndexSong: 0,
    isPlaying: false,
    songs: [
        {
          name: "Querry",
          singer: "QNT x TRUNG TRẦN ft RPT MCK",
          path: "../../assets/music/querry.mp3",
          image: "../../assets/img/querry.jpg",
        },
        {
          name: "Bộ tộc cùng già",
          singer: "Thiện Hưng",
          path: "../../assets/music/bo-toc-cung-gia.mp3",
          image: "../../assets/img/bo-toc-cung-gia.jpg",
        },
        {
          name: "Tình yêu bát cơm rang",
          singer: "Thiện Hưng",
          path: "../../assets/music/tinh-yeu-bat-com-rang.mp3",
          image: "../../assets/img/tinh-yeu-bat-com-rang.jpg",
        },
        {
          name: "Mong một ngày anh nhớ đến em",
          singer: "Huỳnh James x Pjnboys",
          path: "../../assets/music/mong-mot-ngay-em-nho-den-anh.mp3",
          image: "../../assets/img/mong-mot-ngay-em-nho-den-anh.jpg",
        },
        {
          name: "Mặt mộc",
          singer: "Phạm Nguyên Ngọc x VAnh",
          path: "../../assets/music/mat-moc.mp3",
          image: "../../assets/img/mat-moc.jpg",
        },
        {
          name: "Chìm sâu",
          singer: "MCK",
          path: "../../assets/music/chim-sau.mp3",
          image: "../../assets/img/chim-sau.jpg",
        },
        {
          name: "Cứ chill thôi",
          singer: "Chillies x Suni Hạ Linh x Rhymastic",
          path: "../../assets/music/mat-moc.mp3",
          image: "../../assets/img/mat-moc.jpg",
        },
        {
          name: "Muốn nói với em",
          singer: "Kiều Minh Tuấn x Lê Chi",
          path: "../../assets/music/muon-noi-voi-em.mp3",
          image: "../../assets/img/muon-noi-voi-em.jpg",
        },
        {
          name: "Thằng điên",
          singer: "JustaTee x Phương Ly",
          path: "../../assets/music/thang-dien.mp3",
          image: "../../assets/img/thang-dien.jpg",
        },
        {
          name: "Đã lỡ yêu em nhiều",
          singer: "JustaTee",
          path: "../../assets/music/da-lo-yeu-em-nhieu.mp3",
          image: "../../assets/img/da-lo-yeu-em-nhieu.jpg",
        },
    ],
    handleEvents() {
        const _this = this
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        const cdThumbAnimate = cdThumb.animate([
          { transform: 'rotate(360deg)'}
        ], {
          duration: 10000,
          iterations: Infinity
        })
        cdThumbAnimate.pause()

        // when click play button
        playBtn.onclick = () => {
            this.isPlaying ? audio.pause() : audio.play()
        }

        // when song is playing
        audio.onplay = () => {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // when song is pause
        audio.onpause = () => {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // progress value changes when song is playing
        audio.ontimeupdate = () => {
          if (audio.duration) {
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
            progress.value = progressPercent
          }
        }

        // when change progress 
        progress.onchange = (e) => {
          const seekTime = audio.duration / 100 * e.target.value
          audio.currentTime = seekTime
        }

        // next song
        nextBtn.onclick = () => {
          _this.nextSong()
          audio.play()
        }

        // Prev song
        prevBtn.onclick = () => {
          _this.prevSong()
          audio.play()
        }
        
    },
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndexSong]
            }
        })
    },
    loadCurrentSong() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    render() {
        var htmls = this.songs.map(song => {
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    nextSong() {
      this.currentIndexSong++
      if (this.currentIndexSong >= this.songs.length) {
        this.currentIndexSong = 0
      }
      this.loadCurrentSong()
    },
    prevSong() {
      this.currentIndexSong--
      if (this.currentIndexSong < 0) {
        this.currentIndexSong = this.songs.length - 1
      }
      this.loadCurrentSong()
    },
    start() {
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
    }
}

app.start()